/**
 * 방문자 카운터 Worker
 *
 * GET /  →  { today: 오늘 방문자 수, total: 누적 방문자 수 }
 *
 * 같은 사람이 새로고침해도 하루 한 번만 집계한다.
 * 방문자를 구분할 때 IP를 그대로 저장하지 않고 SHA-256 해시로 바꿔 쓰며,
 * 그 해시 기록도 24시간 뒤 자동 삭제(TTL)되므로 개인정보가 남지 않는다.
 */

const ALLOWED_ORIGINS = [
  'https://oswdev.cloud',
  'https://www.oswdev.cloud',
  'https://myinfomationhome.pages.dev',
  'http://localhost:3000',
];

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
  };
}

/** 한국 시간(KST) 기준 오늘 날짜 — 'YYYY-MM-DD' */
function todayKST() {
  const kst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

/** 방문자 식별용 해시 (IP + UA + 날짜) — 원본은 저장하지 않음 */
async function visitorHash(request, day) {
  const ip = request.headers.get('CF-Connecting-IP') || '';
  const ua = request.headers.get('User-Agent') || '';
  const buf = new TextEncoder().encode(`${ip}|${ua}|${day}`);
  const digest = await crypto.subtle.digest('SHA-256', buf);
  return [...new Uint8Array(digest)].slice(0, 12)
    .map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const headers = corsHeaders(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    const day = todayKST();
    const dayKey = `count:${day}`;
    const totalKey = 'count:total';

    // 이미 오늘 집계된 방문자인지 확인
    const seenKey = `seen:${day}:${await visitorHash(request, day)}`;
    const isNew = (await env.VISITS.get(seenKey)) === null;

    let today = parseInt((await env.VISITS.get(dayKey)) || '0', 10);
    let total = parseInt((await env.VISITS.get(totalKey)) || '0', 10);

    if (isNew) {
      today += 1;
      total += 1;
      await Promise.all([
        env.VISITS.put(dayKey, String(today), { expirationTtl: 60 * 60 * 24 * 90 }),
        env.VISITS.put(totalKey, String(total)),
        // 방문 기록은 24시간 뒤 자동 삭제 → 다음 날이면 다시 집계됨
        env.VISITS.put(seenKey, '1', { expirationTtl: 60 * 60 * 24 }),
      ]);
    }

    return new Response(JSON.stringify({ today, total }), { headers });
  },
};
