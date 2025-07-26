import * as React from "react";
const SVGComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    viewBox="0 0 50 43"
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.844 35.034c-2.212.75-3.594 1.801-3.594 2.966 0 2.278 5.261 4.125 11.75 4.125S36.75 40.278 36.75 38c0-1.202-1.474-2.28-3.811-3.034"
    />
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" stroke="#000">
      <path d="M39.5 15.5C39.5 7.492 33.008 1 25 1S10.5 7.492 10.5 15.5c0 8.009 10.106 22.408 14.5 22.408 4.063 0 14.5-14.399 14.5-22.408" />
      <circle cx={25} cy={17.901} r={5.932} />
    </g>
  </svg>
);
export default SVGComponent;
