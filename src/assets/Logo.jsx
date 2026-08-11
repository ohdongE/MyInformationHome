import React from 'react';

function Logo() {
  return (
    <svg
      width="70"
      height="70"
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* OSW Text */}
      <text
        x="35"
        y="22"
        fontSize="18"
        fontWeight="900"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#000"
        fontFamily="Arial, sans-serif"
        letterSpacing="2"
      >
        OSW
      </text>

      {/* Line separator */}
      <line x1="12" y1="35" x2="58" y2="35" stroke="#000" strokeWidth="2" />

      {/* DEV Text */}
      <text
        x="35"
        y="55"
        fontSize="18"
        fontWeight="900"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#000"
        fontFamily="Arial, sans-serif"
        letterSpacing="1"
      >
        DEV
      </text>
    </svg>
  );
}

export default Logo;
