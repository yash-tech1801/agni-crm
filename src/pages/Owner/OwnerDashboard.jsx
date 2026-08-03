import React from "react";

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

function Icon({ name, size = 18, className }) {
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

const navItems = [
  { icon: "dashboard", label: "Dashboard" },
  { icon: "overview", label: "Overview" },
  { icon: "clients", label: "Clients" },
  { icon: "managers", label: "Managers" },
  { icon: "team", label: "Sales Team" },
  { icon: "leads", label: "Leads" },
  { icon: "revenue", label: "Revenue" },
  { icon: "reports", label: "Reports" },
  { icon: "settings", label: "Settings" },
];

const kpiCards = [
  {
    label: "Total Clients",
    value: "248",
    trend: "+18%",
    description: "New this month",
    accent: "#9a74e9",
  },
  {
    label: "Total Managers",
    value: "42",
    trend: "+8%",
    description: "Team expansion",
    accent: "#4e7cff",
  },
  {
    label: "Sales Persons",
    value: "124",
    trend: "+12%",
    description: "Active sellers",
    accent: "#44bfb0",
  },
  {
    label: "Monthly Revenue",
    value: "₹278.8k",
    trend: "+22%",
    description: "Compared to last month",
    accent: "#f2aa38",
  },
  {
    label: "Active Projects",
    value: "18",
    trend: "+5%",
    description: "Live initiatives",
    accent: "#4e7cff",
  },
  {
    label: "Conversion Rate",
    value: "74%",
    trend: "+9%",
    description: "Qualified leads",
    accent: "#6d60fa",
  },
];

const managers = [
  { name: "Ariana Lee", score: "92%", detail: "Client growth +14%" },
  { name: "Eli Brooks", score: "86%", detail: "Process efficiency" },
];

const sellers = [
  { name: "Mia Ross", score: "89%", detail: "Lead conversion" },
  { name: "Noah Kim", score: "83%", detail: "Revenue uplift" },
];

const activities = [
  {
    title: "New client added",
    detail: "A new retail account joined the pipeline.",
    time: "Just now",
    tone: "#9a74e9",
  },
  {
    title: "Lead assigned",
    detail: "4 fresh leads were routed to the sales team.",
    time: "1 hr ago",
    tone: "#4e7cff",
  },
  {
    title: "Revenue received",
    detail: "Invoice payment recorded for Q3 services.",
    time: "3 hrs ago",
    tone: "#44bfb0",
  },
  {
    title: "Manager activity",
    detail: "Ariana updated the client onboarding status.",
    time: "6 hrs ago",
    tone: "#f2aa38",
  },
];

const notifications = [
  {
    title: "Approval request",
    detail: "Project budget increase pending review.",
    issuer: "Samuel Park",
  },
  {
    title: "Team message",
    detail: "Sales team reached 82% of monthly goal.",
    issuer: "Mia Ross",
  },
  {
    title: "Policy alert",
    detail: "Renewal reminders sent to 12 clients.",
    issuer: "System",
  },
];

function RevenueSparkline() {
  return (
    <svg viewBox="0 0 240 64" aria-hidden="true" className="sparkline-chart">
      <path d="M12 42 C42 34 70 22 98 26 C126 30 154 18 182 24 C210 30 228 18 236 14" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="12" cy="42" r="4" fill="#fff" />
      <circle cx="98" cy="26" r="4" fill="#fff" />
      <circle cx="236" cy="14" r="4" fill="#fff" />
    </svg>
  );
}

function RevenueChart() {
  return (
    <svg viewBox="0 0 300 140" className="dashboard-chart" aria-hidden="true">
      <defs>
        <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#9a74e9" stopOpacity=".65" />
          <stop offset="100%" stopColor="#9a74e9" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M10 118 L40 78 L70 84 L100 60 L130 68 L160 40 L190 52 L220 36 L250 48 L280 28" fill="none" stroke="#9a74e9" strokeWidth="3" strokeLinecap="round" />
      <path d="M10 118 L40 78 L70 84 L100 60 L130 68 L160 40 L190 52 L220 36 L250 48 L280 28 L280 140 L10 140Z" fill="url(#revenueGradient)" />
      <g fill="none" stroke="rgba(33, 37, 53, .12)" strokeWidth="1">
        <line x1="10" y1="40" x2="280" y2="40" />
        <line x1="10" y1="70" x2="280" y2="70" />
        <line x1="10" y1="100" x2="280" y2="100" />
      </g>
      <g fill="#7d79a8" fontSize="10">
        <text x="10" y="132">Jan</text>
        <text x="70" y="132">Feb</text>
        <text x="130" y="132">Mar</text>
        <text x="190" y="132">Apr</text>
        <text x="250" y="132">May</text>
      </g>
    </svg>
  );
}

function LeadChart() {
  return (
    <svg viewBox="0 0 300 140" className="dashboard-chart" aria-hidden="true">
      <defs>
        <linearGradient id="leadGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#44bfb0" stopOpacity=".55" />
          <stop offset="100%" stopColor="#44bfb0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="22" y="68" width="30" height="46" rx="10" fill="#d3f8f3" />
      <rect x="84" y="50" width="30" height="64" rx="10" fill="#d3f8f3" />
      <rect x="146" y="82" width="30" height="32" rx="10" fill="#d3f8f3" />
      <rect x="208" y="36" width="30" height="78" rx="10" fill="#d3f8f3" />
      <rect x="270" y="58" width="30" height="56" rx="10" fill="#d3f8f3" />
      <path d="M37 68 C52 54 72 54 87 68 C102 84 122 84 137 68 C152 52 172 52 187 68 C202 84 222 84 237 68" fill="none" stroke="#44bfb0" strokeWidth="3" strokeLinecap="round" />
      <g fill="#7d79a8" fontSize="10">
        <text x="22" y="132">Mon</text>
        <text x="84" y="132">Tue</text>
        <text x="146" y="132">Wed</text>
        <text x="208" y="132">Thu</text>
        <text x="270" y="132">Fri</text>
      </g>
    </svg>
  );
}

export default function OwnerDashboard({ onSignOut, userEmail }) {
  const [activeNav, setActiveNav] = React.useState("Dashboard");
  const [dark, setDark] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const ownerName = React.useMemo(() => {
    if (!userEmail) return "Owner";
    const raw = userEmail.split("@")[0];
    const parts = raw.split(/[\.\-_\s]+/).filter(Boolean);
    return parts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  }, [userEmail]);

  return (
    <main className={`owner-dashboard ${dark ? "dashboard-dark" : ""}`}>
      <aside className="client-sidebar">
        <div className="client-brand">
          <span className="client-brand-mark">A</span>
          <span>
            Agni<span>CRM</span>
          </span>
        </div>

        <nav aria-label="Owner dashboard navigation">
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
        <header className="dashboard-top owner-dashboard-top">
          <div>
            <p className="dashboard-eyebrow">Owner workspace</p>
            <h1>Hello, {ownerName}</h1>
            <p className="dashboard-copy">
              Track revenue, top performers, and client activity in one place.
            </p>
          </div>

          <div className="top-actions owner-top-actions">
            {searchOpen ? (
              <div className="search-field">
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search reports, clients or teams"
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
            <button className="notification" type="button">
              <Icon name="bell" size={16} />
              <i />
            </button>
            <button className="profile" type="button">
              JB
            </button>
            <span className="role-badge">Owner</span>
          </div>
        </header>

        <div className="owner-dashboard-layout">
          <div className="dashboard-main">
            <section className="kpi-grid">
              {kpiCards.map((card) => (
                <article className="kpi-card" key={card.label}>
                  <div className="kpi-card-header">
                    <span>{card.label}</span>
                    <span className="metric-chip" style={{ background: card.accent + "20", color: card.accent }}>
                      {card.trend}
                    </span>
                  </div>
                  <h2>{card.value}</h2>
                  <p>{card.description}</p>
                </article>
              ))}
            </section>

            <section className="revenue-panel">
              <div className="revenue-summary">
                <p className="eyebrow">Revenue overview</p>
                <h2>₹96,421.50</h2>
                <p className="revenue-copy">Current revenue with growth across pending and monthly segments.</p>
                <div className="revenue-breakdown">
                  <div>
                    <span>Monthly revenue</span>
                    <strong>₹28,900</strong>
                  </div>
                  <div>
                    <span>Pending revenue</span>
                    <strong>₹12,070</strong>
                  </div>
                  <div>
                    <span>Growth</span>
                    <strong>+14.6%</strong>
                  </div>
                </div>
              </div>
              <div className="revenue-chart-panel">
                <div className="revenue-chip">
                  <Icon name="arrowUp" size={14} />
                  <span>Revenue trend</span>
                </div>
                <RevenueSparkline />
              </div>
            </section>

            <div className="dashboard-split">
              <section className="performance-panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Team performance</p>
                    <h2>Top performers</h2>
                  </div>
                  <button type="button">See all</button>
                </div>
                <div className="performance-lists">
                  <div>
                    <h3>Top Managers</h3>
                    {managers.map((item) => (
                      <div className="performance-item" key={item.name}>
                        <div>
                          <strong>{item.name}</strong>
                          <small>{item.detail}</small>
                        </div>
                        <span>{item.score}</span>
                        <div className="progress-bar">
                          <span style={{ width: item.score }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3>Top Sales Persons</h3>
                    {sellers.map((item) => (
                      <div className="performance-item" key={item.name}>
                        <div>
                          <strong>{item.name}</strong>
                          <small>{item.detail}</small>
                        </div>
                        <span>{item.score}</span>
                        <div className="progress-bar">
                          <span style={{ width: item.score }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <div className="analytics-grid">
                <article className="analytics-card">
                  <div className="panel-header">
                    <div>
                      <p className="eyebrow">Revenue analytics</p>
                      <h2>Monthly revenue</h2>
                    </div>
                  </div>
                  <RevenueChart />
                </article>

                <article className="analytics-card">
                  <div className="panel-header">
                    <div>
                      <p className="eyebrow">Conversion insights</p>
                      <h2>Lead conversion</h2>
                    </div>
                  </div>
                  <LeadChart />
                </article>
              </div>
            </div>
          </div>

          <aside className="owner-sidebar-widgets">
            <section className="activity-panel">
              <div className="panel-header">
                <div>
                  <p className="eyebrow">Recent activity</p>
                  <h2>What's happening</h2>
                </div>
                <button type="button">Filter</button>
              </div>
              <div className="activity-list">
                {activities.map((activity) => (
                  <div className="activity-row" key={activity.title}>
                    <span className="activity-mark" style={{ background: activity.tone }} />
                    <div>
                      <strong>{activity.title}</strong>
                      <small>{activity.detail}</small>
                    </div>
                    <time>{activity.time}</time>
                  </div>
                ))}
              </div>
            </section>

            <section className="notification-panel">
              <div className="panel-header">
                <div>
                  <p className="eyebrow">Notifications</p>
                  <h2>Team updates</h2>
                </div>
                <button type="button">Clear</button>
              </div>
              <div className="notification-list">
                {notifications.map((notice) => (
                  <div className="notification-row" key={notice.title}>
                    <div className="notification-avatar">{notice.issuer.slice(0, 2).toUpperCase()}</div>
                    <div>
                      <strong>{notice.title}</strong>
                      <small>{notice.detail}</small>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
