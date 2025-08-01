import * as React from "react";

const SVGComponent = (props) => (
  <svg
    width={800}
    height={800}
    viewBox="0 0 1024 1024"
    className="icon"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M725.333 192C635.733 192 556.8 236.8 512 307.2 467.2 236.8 388.267 192 298.667 192c-140.8 0-256 115.2-256 256C42.667 701.867 512 960 512 960s469.333-256 469.333-512c0-140.8-115.2-256-256-256"
      fill="#F44336"
    />
  </svg>
);
export default SVGComponent;
