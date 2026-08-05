import React from 'react';

const ownerIcons = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  overview: (
    <>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </>
  ),
  clients: (
    <>
      <circle cx="8" cy="9" r="3" />
      <path d="M4 20c1.5-3.5 4-5 6.5-5s5 1.5 6.5 5" />
      <circle cx="17" cy="8" r="3" />
    </>
  ),
  managers: (
    <>
      <path d="M8 14c-2 0-4 1-4 3v1h12v-1c0-2-2-3-4-3" />
      <circle cx="8" cy="7" r="3" />
      <path d="M17 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </>
  ),
  team: (
    <>
      <path d="M5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <path d="M8 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
      <path d="M17 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
    </>
  ),
  leads: (
    <>
      <circle cx="12" cy="12" r="6" />
      <path d="M12 6v6h6" />
    </>
  ),
  revenue: (
    <>
      <path d="M4 7h16v10H4z" />
      <path d="M8 10h8M8 14h5" />
    </>
  ),
  reports: (
    <>
      <path d="M6 20V8l6-4 6 4v12H6z" />
      <path d="M10 12h4M10 16h4" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.5 1.5M16.2 16.2l1.5 1.5M6.3 17.7l1.5-1.5M16.2 7.8l1.5-1.5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m16 16 4 4" />
    </>
  ),
  bell: (
    <>
      <path d="M5 16h14" />
      <path d="M8 16V11a4 4 0 0 1 8 0v5" />
      <path d="M12 20a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Z" />
    </>
  ),
  moon: (
    <>
      <path d="M12 3c-4.97 0-9 4.03-9 9 0 4.97 4.03 9 9 9 2.78 0 5.28-1.18 7.08-3.08C18.82 17.28 20 14.78 20 12c0-4.97-4.03-9-9-9Z" />
    </>
  ),
  arrowUp: (
    <>
      <path d="M12 18V8" />
      <path d="m8 12 4-4 4 4" />
    </>
  ),
};

export default function Icon({ name, size = 18, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ownerIcons[name]}
    </svg>
  );
}

