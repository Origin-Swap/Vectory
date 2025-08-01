import * as React from "react";
const SVGComponent = (props) => (
  <svg
    width={800}
    height={800}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth={3}
    stroke="black"
    fill="black"
    {...props}
  >
    <path d="M51.61 25.21 33.2 11.4a2 2 0 0 0-2.4 0L12.39 25.21a2 2 0 0 0-.8 1.6v26.64a2 2 0 0 0 2 2H25a2 2 0 0 0 2-2V45a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v8.45a2 2 0 0 0 2 2h10.41a2 2 0 0 0 2-2V26.81a2 2 0 0 0-.8-1.6Z" />
  </svg>
);
export default SVGComponent;
