import React from "react";
import Icon from "../../components/Icon";
import RevenueSummaryCard from "../../components/RevenueSummaryCard";
import PerformanceChart from "../../components/PerformanceChart";
import SimpleModal from "../../components/SimpleModal";
import KpiCard from "../../components/KpiCard";
import Modal from "../../components/Modal";
import EditForm from "../../components/EditForm";
import ConfirmDialog from "../../components/ConfirmDialog";
import TopPerformerLeaderboard from "../../components/TopPerformerLeaderboard";

const navItems = [
  { icon: "dashboard", label: "Dashboard" },
  { icon: "clients", label: "Clients" },
  { icon: "team", label: "Employees" },
  { icon: "revenue", label: "Revenue" },
  { icon: "reports", label: "Reports" },
];

const kpiCards = [
  { label: "Total Regional Managers", value: "7", trend: "+3%", description: "Managers across region", accent: "#9a74e9", slug: "regional-managers" },
  { label: "Total Employees", value: "124", trend: "+6%", description: "Staff at branch", accent: "#4e7cff", slug: "employees" },
  { label: "Active Clients", value: "248", trend: "+8%", description: "Currently active", accent: "#44bfb0", slug: "clients" },
  { label: "Pending Requests", value: "12", trend: "-2%", description: "Awaiting action", accent: "#f2aa38", slug: "requests" },
  { label: "Applications Running", value: "34", trend: "+5%", description: "In-flight applications", accent: "#6d60fa", slug: "applications" },
  { label: "Branch Revenue", value: "₹278.8k", trend: "+22%", description: "This month", accent: "#f97316", slug: "branch-revenue" },
  { label: "Today's Follow-ups", value: "18", trend: "+4%", description: "Scheduled today", accent: "#60a5fa", slug: "followups" },
  { label: "Pending Approvals", value: "5", trend: "-1%", description: "Needs manager approval", accent: "#fb7185", slug: "approvals" },
];

export default function BranchManagerDashboard({ onSignOut, userEmail }) {
  const [activeNav, setActiveNav] = React.useState("Dashboard");
  const [dark, setDark] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activityAutoScrollPaused, setActivityAutoScrollPaused] = React.useState(false);
  const activityScrollTimer = React.useRef(null);
  const activityListRef = React.useRef(null);

  React.useEffect(() => {
    const list = activityListRef.current;
    if (!list) return undefined;

    const intervalId = window.setInterval(() => {
      if (activityAutoScrollPaused || !list) return;
      const maxScroll = list.scrollHeight - list.clientHeight;
      if (maxScroll <= 0) return;
      const nextScrollTop = Math.min(list.scrollTop + 86, maxScroll);
      if (list.scrollTop >= maxScroll - 2) {
        list.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        list.scrollTo({ top: nextScrollTop, behavior: 'smooth' });
      }
    }, 2600);

    return () => window.clearInterval(intervalId);
  }, [activityAutoScrollPaused]);

  React.useEffect(() => {
    return () => {
      if (activityScrollTimer.current) {
        window.clearTimeout(activityScrollTimer.current);
      }
    };
  }, []);

  function handleActivityListScroll() {
    if (activityScrollTimer.current) {
      window.clearTimeout(activityScrollTimer.current);
    }

    setActivityAutoScrollPaused(true);
    activityScrollTimer.current = window.setTimeout(() => {
      setActivityAutoScrollPaused(false);
      activityScrollTimer.current = null;
    }, 3000);
  }

  const salesPersonName = React.useMemo(() => {
    if (!userEmail) return "Branch Manager";
    const raw = userEmail.split("@")[0];
    const parts = raw.split(/[^a-zA-Z0-9]+/).filter(Boolean);
    return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(" ");
  }, [userEmail]);

  return (
    <main className={`owner-dashboard branch-manager-dashboard ${dark ? "dashboard-dark" : ""}`}>
      <aside className="client-sidebar">
        <div className="client-brand">
          <span className="client-brand-mark">BM</span>
          <span>
            Agni<span>CRM</span>
          </span>
        </div>

        <nav aria-label="Branch manager navigation">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={activeNav === item.label ? "selected" : ""}
              onClick={() => setActiveNav(item.label)}
              type="button"
            >
              <Icon name={item.icon} size={18} />
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
              onClick={() => setDark(!dark)}
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

      <section className="dashboard-content">
        <header className="dashboard-top sales-dashboard-top">
          <div>
            <p className="dashboard-eyebrow">Branch manager workspace</p>
            <h1>Hello, {salesPersonName}</h1>
          </div>
          <div className="top-actions">
            {searchOpen ? (
              <div className="search-field">
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search clients, leads, or deals"
                />
                <button type="button" onClick={() => setSearchOpen(false)}>
                  <Icon name="search" size={16} />
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => setSearchOpen(true)}>
                <Icon name="search" size={16} />
              </button>
            )}

            <button className="profile" type="button">
              BM
            </button>
            <span className="role-badge">Branch Manager</span>
          </div>
        </header>

        <section>
          <div className="kpi-activity-row" style={{ display: 'flex', gap: 18, alignItems: 'stretch', width: '100%' }}>
            <div className="scheme-grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', flex: '2 1 0%', minWidth: 0 }}>
              {kpiCards.map((card) => (
                <KpiCard key={card.label} card={card} />
              ))}
            </div>

            <aside className="sidebar-widgets" style={{ flex: '1 1 0%', minWidth: 300, display: 'flex' }}>
              <section className="activity-panel" style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Recent activity</p>
                    <h2>What's happening</h2>
                  </div>
                </div>
                <div
                  ref={activityListRef}
                  className="activity-list notifications-scroll"
                  onScroll={handleActivityListScroll}
                  style={{ overflowY: 'auto', paddingRight: 2, flex: 1 }}
                >
                  <div className="activity-row">
                    <span className="activity-mark" style={{ background: '#9a74e9' }} />
                    <div>
                      <strong>New assignment</strong>
                      <small>New client assigned to branch</small>
                    </div>
                    <Icon name="arrowUp" size={16} />
                  </div>
                </div>
              </section>
            </aside>
          </div>

          <div className="dashboard-layout" style={{ marginTop: 18, gridTemplateColumns: '1fr' }}>
            <div className="dashboard-main">
              <div className="analytics-card" style={{ padding: 20 }}>
                <div className="panel-header" style={{ marginBottom: 18 }}>
                  <div>
                    <h2>Branch overview</h2>
                    <p>Key metrics and branch health.</p>
                  </div>
                </div>
                <PerformanceChart />
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
