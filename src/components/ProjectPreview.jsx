import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../i18n/LanguageContext';
import '../styles/components/ProjectPreview.css';

/**
 * 이미지 갤러리 모달.
 *
 * 다른 프로젝트에 추가하려면 data/projects.js 항목에 screenshots 배열만 넣으면 된다.
 *   screenshots: [{ src: '/assets/screenshots/...', caption: 'captionKey' }]
 * caption은 translations의 projects.captions 키를 쓰고, 키가 없으면 문자열 그대로 출력한다.
 */
function ProjectPreview({ title, screenshots, onClose }) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);

  const total = screenshots.length;
  const current = screenshots[index];

  const showPrev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const showNext = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    },
    [onClose, showPrev, showNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // 스크롤 컨테이너는 body가 아니라 .App이므로 그쪽을 잠근다
    const scroller = document.querySelector('.App');
    const previous = scroller ? scroller.style.overflowY : '';
    if (scroller) scroller.style.overflowY = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (scroller) scroller.style.overflowY = previous;
    };
  }, [handleKeyDown]);

  const caption = t.projects.captions[current.caption] || current.caption;

  // 카드에는 hover 시 transform이 걸린다. transform은 position:fixed의 기준을
  // 뷰포트가 아닌 그 요소로 바꾸므로, 모달은 반드시 카드 밖(body)에서 렌더링한다.
  return createPortal(
    <div className="preview-overlay" onClick={onClose}>
      <div className="preview-window" onClick={(e) => e.stopPropagation()}>
        <div className="preview-header">
          <span className="preview-title">{title}</span>
          <button className="preview-close" aria-label={t.projects.previewClose} onClick={onClose}>
            ×
          </button>
        </div>

        <div className="preview-body">
          {total > 1 && (
            <button className="preview-nav" aria-label={t.projects.previewPrev} onClick={showPrev}>
              ‹
            </button>
          )}

          <div className="preview-stage">
            <img src={current.src} alt={caption} />
          </div>

          {total > 1 && (
            <button className="preview-nav" aria-label={t.projects.previewNext} onClick={showNext}>
              ›
            </button>
          )}
        </div>

        <div className="preview-footer">
          <p className="preview-caption">{caption}</p>
          {total > 1 && (
            <span className="preview-counter">
              {index + 1} / {total}
            </span>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ProjectPreview;
