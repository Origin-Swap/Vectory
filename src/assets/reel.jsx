import * as React from "react";

const SVGComponent = (props) => (
  <svg
    width={800}
    height={800}
    viewBox="0 0 20 20"
    fill="none"
    className="fill-black dark:fill-white"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 2v14h18V2zm1 1h16v12H3zM0 4v14h18v-1H1V4zm4 0v1h1V4zm13 0v1h1V4zM8 5.117v7.766l.758-.453L14.473 9zm1 1.768L12.525 9 9 11.115zM4 7v1h1V7zm13 0v1h1V7zM4 10v1h1v-1zm13 0v1h1v-1zM4 13v1h1v-1zm13 0v1h1v-1z"
      className="fill-black dark:fill-white"
    />
  </svg>
);

export default SVGComponent;
