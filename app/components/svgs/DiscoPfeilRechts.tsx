import * as React from "react";
import type { SVGProps } from "react";

const DiscoPfeilRechts = ({ width = 24, height = 24, fill = "white", ...props }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      >
<path d="M8.58984 16.58L13.1698 12L8.58984 7.41L9.99984 6L15.9998 12L9.99984 18L8.58984 16.58Z"
 fill="currentColor"/>

</svg>
)

export default DiscoPfeilRechts
