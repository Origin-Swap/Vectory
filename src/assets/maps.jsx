import * as React from "react";
const SVGComponent = (props) => (
  <svg
    width={800}
    height={800}
    viewBox="0 0 192 192"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={12}
      d="M95.997 22a58.9 58.9 0 0 0-32.772 9.985 59.17 59.17 0 0 0-21.728 26.56 59.4 59.4 0 0 0-3.368 34.191 59.27 59.27 0 0 0 16.125 30.312c10.688 10.722 35.841 26.232 37.33 42.525.223 2.434 1.987 4.427 4.413 4.427s4.196-1.993 4.413-4.427c1.488-16.293 26.622-31.777 37.304-42.492a59.27 59.27 0 0 0 16.151-30.313 59.4 59.4 0 0 0-3.354-34.205 59.2 59.2 0 0 0-21.73-26.574A58.9 58.9 0 0 0 95.997 22"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={12}
      d="M95.997 101.6a20.8 20.8 0 0 1-14.708-6.092 20.8 20.8 0 1 1 14.708 6.092"
    />
  </svg>
);
export default SVGComponent;
