import * as React from 'react';
import type { SVGProps } from 'react';

const Cart = ({ fill = 'currentColor', ...props }: SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: fill }}
        {...props}
        data-oid="6mwvj49"
    >
        <path
            d="M7 8H4L2 21H22L20.0966 11.1023M7 8C7 8 7.5 2 11.5 2C13.5506 2 14.6813 3.57683 15.2965 5.11378M7 8H13.6429M15.2965 5.11378L18 5.5L21 10.5L20.0966 11.1023M15.2965 5.11378L14.5 5L13.6429 8M13.6429 8L13.5 8.5L16.5 13.5L20.0966 11.1023"
            stroke="currentColor"
            strokeWidth={1.8}
            data-oid="cs74lqn"
        />
    </svg>
);

export default Cart;
