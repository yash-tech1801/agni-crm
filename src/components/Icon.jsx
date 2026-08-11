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
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  managers: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  team: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  employees: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  branches: (
    <>
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </>
  ),
  roles: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </>
  ),
  calendarToday: (
    <>
      <rect x="4" y="6" width="16" height="14" rx="3" />
      <path d="M4 10h16" />
      <path d="M8 3v6" />
      <path d="M16 3v6" />
    </>
  ),
  calendarWeek: (
    <>
      <rect x="4" y="6" width="16" height="14" rx="3" />
      <path d="M4 10h16" />
      <path d="M8 3v6" />
      <path d="M16 3v6" />
      <path d="M8 14h2" />
      <path d="M12 14h2" />
      <path d="M16 14h2" />
    </>
  ),
  wallet: (
    <>
      <path d="M4 8h16v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8Z" />
      <path d="M4 10h16" />
      <circle cx="16" cy="14" r="1.5" />
    </>
  ),
  reports: (
    <>
      <path d="M6 20V8l6-4 6 4v12H6z" />
      <path d="M10 12h4M10 16h4" />
    </>
  ),
  requests: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
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
  invoice: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="12" y1="9" x2="8" y2="9" />
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
