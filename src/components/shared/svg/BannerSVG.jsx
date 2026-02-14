import React from "react";

const BannerSVG = () => {
  return (
    <div class="wave-wrapper">
      <svg
        className="banner-svg"
        viewBox="-10 0 220 30"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stop-color="#10b981" />
            <stop offset="95%" stop-color="#10b981" />
          </linearGradient>

          <pattern
            id="wave"
            x="0"
            y="0"
            width="120"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              id="wavePath"
              d="M-40 14.5 Q-30 12.5 -20 14.5 T0 14.5 T20 14.5 T40 14.5 T60 14.5 T80 14.5 T100 14.5 T120 14.5 V40 H-40z"
              fill="url(#gradient)"
            >
              <animateTransform
                attributeName="transform"
                begin="0s"
                dur="2.5s"
                type="translate"
                from="0,0"
                to="40,0"
                repeatCount="indefinite"
              />
            </path>
          </pattern>
        </defs>

        <text
          text-anchor="middle"
          x="100"
          y="22"
          font-size="20"
          font-family="sans-serif"
          font-weight="bold"
          fill="url(#gradient)"
          fill-opacity="0.1"
        >
          CARE YOU DESERVE
        </text>

        <text
          text-anchor="middle"
          x="100"
          y="22"
          font-size="20"
          font-family="sans-serif"
          font-weight="bold"
          fill="url(#wave)"
          fill-opacity="0.7"
        >
          CARE YOU DESERVE
        </text>
      </svg>
    </div>
  );
};

export default BannerSVG;
