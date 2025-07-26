import * as React from "react";

const SVGComponent = (props) => (
  <svg
    width={800}
    height={800}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M20 15.293V5.5A1.5 1.5 0 0 0 18.5 4h-13A1.5 1.5 0 0 0 4 5.5v6.793l3.146-3.147a.5.5 0 0 1 .708 0l5.646 5.647 2.646-2.647a.5.5 0 0 1 .708 0zm0 1.414-3.5-3.5-2.646 2.647a.5.5 0 0 1-.708 0L7.5 10.207l-3.5 3.5V18.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5zM3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5zM15 6h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1m0 1v2h2V7z" />
  </svg>
);
export default SVGComponent;
