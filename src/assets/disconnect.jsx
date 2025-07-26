import * as React from "react";
const SVGComponent = (props) => (
  <svg
    width={800}
    height={800}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}
  >
    <g fill="#000">
      <path d="M1 8a6 6 0 0 1 8.514-5.45.75.75 0 0 1-.629 1.363 4.5 4.5 0 1 0 0 8.175.75.75 0 1 1 .63 1.361A6 6 0 0 1 1 8" />
      <path d="M11.245 4.695a.75.75 0 0 0-.05 1.06l1.36 1.495H6.75a.75.75 0 0 0 0 1.5h5.805l-1.36 1.495a.75.75 0 0 0 1.11 1.01l2.5-2.75a.75.75 0 0 0-.002-1.012l-2.498-2.748a.75.75 0 0 0-1.06-.05" />
    </g>
  </svg>
);
export default SVGComponent;
