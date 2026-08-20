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
      <div className="dashboard-header-text">
        {eyebrow && (
          <div className="dashboard-eyebrow-wrap">
            <span className="dashboard-header-live-pulse" />
            <p className="dashboard-eyebrow">{eyebrow}</p>
          </div>
        )}
        {title && <h1 className="dashboard-header-title">{title}</h1>}
        {copy && <p className="dashboard-copy">{copy}</p>}
      </div>

      {children}
    </header>
  );
});

export default DashboardHeader;
