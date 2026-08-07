import React from "react";

const DashboardHeader = React.forwardRef(function DashboardHeader(
  {
    eyebrow,
    title,
    copy,
    className = "",
    children,
  },
  ref,
) {
  return (
    <header ref={ref} className={`dashboard-top ${className}`.trim()}>
      <div>
        {eyebrow && <p className="dashboard-eyebrow">{eyebrow}</p>}
        {title && <h1>{title}</h1>}
        {copy && <p className="dashboard-copy">{copy}</p>}
      </div>

      {children}
    </header>
  );
});

export default DashboardHeader;
