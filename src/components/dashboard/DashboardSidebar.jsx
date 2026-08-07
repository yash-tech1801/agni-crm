import React from "react";
import Icon from "../Icon";

export default function DashboardSidebar({
  navItems = [],
  activeNav,
  onNavChange,
  dark,
  onToggleDark,
  onSignOut,
  IconComponent = Icon,
  navLabel = "Dashboard navigation",
  brandMark,
  brandName,
}) {
  const items = navItems.map((item) => {
    if (Array.isArray(item)) {
      const [icon, label] = item;
      return { icon, label };
    }
    return item;
  });

  return (
    <aside className="client-sidebar">
      <div className="client-brand">
        {brandMark && <span className="client-brand-mark">{brandMark}</span>}
        <span>
          {brandName ?? (
            <>
              Agni<span>CRM</span>
            </>
          )}
        </span>
      </div>

      <nav aria-label={navLabel}>
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            className={activeNav === item.label ? "selected" : ""}
            onClick={() => onNavChange(item.label)}
          >
            <IconComponent name={item.icon} size={18} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="theme-toggle">
          <span>
            <Icon name="moon" size={15} /> Dark mode
          </span>
          <button
            className={dark ? "on" : ""}
            onClick={onToggleDark}
            type="button"
            aria-label="Toggle dark mode"
          >
            <i />
          </button>
        </div>
        <button className="sign-out" type="button" onClick={onSignOut}>
          Sign out
        </button>
      </div>
    </aside>
  );
}
