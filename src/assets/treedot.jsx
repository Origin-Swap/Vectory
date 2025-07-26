import * as React from "react";
const SVGComponent = (props) => (
  <svg
    width={800}
    height={800}
    viewBox="0 0 32 32"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M13 16c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3m0 10c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3m0-20c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3" />
  </svg>
);
export default SVGComponent;
