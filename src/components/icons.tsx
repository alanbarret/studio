import type { SVGProps } from 'react';

export const Icons = {
  logo: ({ className, ...props }: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
    >
        <path d="m1-4 4 4" />
        <path d="M9 20-3.5 8.5a5.5 5.5 0 0 1 1.2-8.3l.1-.1a5.5 5.5 0 0 1 8.1.2l5.5 6.5" />
        <path d="M12.5 11.5 8 20" />
        <path d="m5 13 8.5-10" />
        <path d="M21.5 11.5a5.5 5.5 0 0 1-5.5 5.5" />
        <path d="M23 22a2.5 2.5 0 0 0-3-4" />
        <path d="M20 16a2.5 2.5 0 0 0-4-3" />
    </svg>
  ),
};
