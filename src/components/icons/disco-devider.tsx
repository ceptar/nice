import * as React from 'react';
import type { SVGProps } from 'react';

const DiscoDevider = ({ fill = 'currentColor', ...props }: SVGProps<SVGSVGElement>) => (
<svg
width={27} 
height={39}
viewBox="0 0 27 39"
fill="currentColor"
xmlns="http://www.w3.org/2000/svg"
style={{ color: fill }}

{...props}
>
<path 
d="M1.52891 0H0.929932V38L9.47161 38L10.4435 23.1098L2.22702 24.3453L1.52891 0Z"
/>
<path 
d="M15.9299 14.3634L26.0049 12.1676L16.6588 38L27 38V0L19.3749 4.43841e-07L15.9299 14.3634Z"
/>
</svg>


);

export default DiscoDevider;
