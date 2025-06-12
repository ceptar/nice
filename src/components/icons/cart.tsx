import * as React from 'react';
import type { SVGProps } from 'react';

const Cart = ({ fill = 'currentColor', ...props }: SVGProps<SVGSVGElement>) => (

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
 fill="currentColor"
     {...props}
      viewBox="0 0 24 24">
        <path d="M22 23.7803H2.9707L3.83594 6.2207H21.1348L22 23.7803ZM4.5459 22.2803H20.4248L19.707 7.7207H5.26367L4.5459 22.2803Z" fill="currentColor"/>
<path d="M16.0598 5.55176C16.0598 4.60365 15.6834 3.69385 15.0129 3.02344C14.3844 2.39496 13.5459 2.02426 12.6624 1.98047L12.4856 1.97656C11.5375 1.97656 10.6277 2.35303 9.95728 3.02344C9.28686 3.69385 8.9104 4.60365 8.9104 5.55176V10.1494H7.4104V5.55176C7.4104 4.20583 7.94501 2.91461 8.89673 1.96289C9.84844 1.01118 11.1397 0.476563 12.4856 0.476562L12.7366 0.482422C13.9909 0.54457 15.1812 1.07066 16.0735 1.96289C17.0252 2.91461 17.5598 4.20583 17.5598 5.55176V10.1494H16.0598V5.55176Z" fill="currentColor"/>

</svg>);









/* 
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
 */


export default Cart;
