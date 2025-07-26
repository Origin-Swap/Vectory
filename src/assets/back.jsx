import * as React from "react";
const SVGComponent = (props) => (
  <svg
    width={800}
    height={800}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m4.707 16 3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708.708L4.707 15H18.5a1.5 1.5 0 0 0 1.5-1.5v-6A1.5 1.5 0 0 0 18.5 6h-15a.5.5 0 0 1 0-1h15A2.5 2.5 0 0 1 21 7.5v6a2.5 2.5 0 0 1-2.5 2.5z" />
  </svg>
);
export default SVGComponent;
