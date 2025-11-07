import type { SVGProps } from 'react';

export const Icons = {
  logo: ({ className, ...props }: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M5 12-2 22" />
      <path d="M2 12h20" />
      <path d="m21 12-1.4 4.5" />
      <path d="m15 12-1 4" />
      <path d="m9 12-1 4" />
      <path d="M17.5 12a5.5 5.5 0 1 0-11 0" />
    </svg>
  ),
};
