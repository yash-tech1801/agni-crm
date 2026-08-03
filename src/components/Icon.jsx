import React from "react";

const Icon = ({ name, size = 20, stroke = 1.9 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  const icons = {
    bolt: (
      <>
        <path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    eye: (
      <>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    eyeOff: (
      <>
        <path d="m3 3 18 18" />
        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
        <path d="M9.9 4.2A10.5 10.5 0 0 1 12 4c6.5 0 10 8 10 8a18 18 0 0 1-3.4 4.1" />
        <path d="M6.6 6.6C3.7 8.5 2 12 2 12s3.5 8 10 8a9.7 9.7 0 0 0 3.4-.6" />
      </>
    ),
    google: (
      <>
        <path
          d="M21.35 12.24c0-.71-.06-1.22-.2-1.75H12v3.3h5.37a4.6 4.6 0 0 1-2 3.02v2.14h3.12c1.82-1.68 2.86-4.16 2.86-6.71Z"
          fill="currentColor"
          stroke="none"
        />
        <path
          d="M12 21.7c2.62 0 4.82-.86 6.43-2.34l-3.12-2.14c-.86.58-1.97.92-3.31.92-2.52 0-4.66-1.7-5.42-4v2.2H3.36A9.7 9.7 0 0 0 12 21.7Z"
          fill="currentColor"
          stroke="none"
        />
        <path
          d="M6.58 14.14a5.8 5.8 0 0 1 0-3.7V8.25H3.36a9.7 9.7 0 0 0 0 8.18l3.22-2.29Z"
          fill="currentColor"
          stroke="none"
        />
        <path
          d="M12 6.55c1.45 0 2.75.5 3.77 1.48l2.83-2.77C16.82 3.6 14.62 2.3 12 2.3a9.7 9.7 0 0 0-8.64 5.95l3.22 2.2c.76-2.3 2.9-3.9 5.42-3.9Z"
          fill="currentColor"
          stroke="none"
        />
      </>
    ),
  };
  return <svg {...common}>{icons[name]}</svg>;
};

export default Icon;
