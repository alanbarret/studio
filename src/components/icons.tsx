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
      <path d="M12 20a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Z" />
      <path d="M19 17H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
      <path d="M19 7V5H5v2" />
      <path d="M5 17v-3h14v3" />
    </svg>
  ),
};
