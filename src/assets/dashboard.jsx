import * as React from "react";

const SVGComponent = (props) => (
  <svg
    width={800}
    height={800}
    viewBox="0 0 24 24"
    fill="none"
    className="fill-black dark:fill-white"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 2a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm0-2h3a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3m11 16h7a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-7a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3m0 2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1zM3 11h3a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3m0 2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1zM21 0a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-7a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3zm-8 3v8a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1"
      className="fill-black dark:fill-white"
    />
  </svg>
);
export default SVGComponent;
