import React from "react";
import "./ClientDashboard.css";
import DashboardSidebar from "./components/dashboard/DashboardSidebar";
import ActivityStatusBar from "./components/dashboard/ActivityStatusBar";
import MoreServicesPage from "./pages/MoreServicesPage";
import EligibilityPage from "./pages/EligibilityPage";
import DealsPage from "./pages/DealsPage";
import InvoicesPage from "./pages/InvoicesPage";

/* ── Icon Registry ── */
const dashboardIcons = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  clients: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20c.5-3.2 2.5-5 5.5-5s5 1.8 5.5 5" />
      <path d="M16 6.5a3 3 0 0 1 0 5" />
      <path d="M17.5 15.2c1.8.5 2.8 2 3 4.3" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
      <path d="M3 12h18" />
    </>
  ),
  eligibility: (
    <>
      <path d="M12 3 14.1 5l2.9-.2.8 2.8 2.4 1.7-1.1 2.7.3 2.9-2.7 1.1-1.7 2.4-2.7-1.1-2.7 1.1-1.7-2.4-2.7-1.1.3-2.9-1.1-2.7 2.4-1.7.8-2.8 2.9.2L12 3Z" />
      <path d="m8.7 12 2.1 2.1 4.6-4.6" />
    </>
  ),
  addScheme: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19V5M4 19h16" />
      <path d="m7 15 4-4 3 2 5-6" />
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
      <path d="M18 10a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 22h4" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  check: (
    <>
      <path d="M20 6 9 17l-5-5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3s-7 2-7 7v5l7 5 7-5V10c0-5-7-7-7-7Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </>
  ),
  file: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
    </>
  ),
  phone: (
    <>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.15 2.15m8.5 8.5 2.15 2.15M18.4 5.6l-2.15 2.15m-8.5 8.5-2.15 2.15" />
    </>
  ),
};

function DashboardIcon({ name, size = 19 }) {
  return (
    <svg
      className="dashboard-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {dashboardIcons[name]}
    </svg>
  );
}

/* ── Data Arrays ── */
const navItems = [
  ["dashboard", "Dashboard"],
  ["eligibility", "Eligibility"],
  ["briefcase", "Deals"],
  ["receipt", "Invoices"],
  ["addScheme", "More Services"],
];

const executiveMetrics = [
  { label: "Active Coverage", value: "₹5.0 Cr", icon: "shield", color: "#4e7cff", bg: "rgba(78, 124, 255, 0.12)" },
  { label: "Active Services", value: "4 Plans", icon: "briefcase", color: "#9a74e9", bg: "rgba(154, 116, 233, 0.12)" },
  { label: "Compliance Score", value: "94%", icon: "file", color: "#44bfb0", bg: "rgba(68, 191, 176, 0.12)" },
  { label: "Next Renewal", value: "14 Jun 2027", icon: "clock", color: "#f2aa38", bg: "rgba(242, 170, 56, 0.12)" },
];

const activeSchemesData = [
  {
    id: 1,
    name: "Corporate Health Shield",
    tag: "Health & Benefit",
    cover: "₹10,00,000",
    policyNumber: "CHS-2026-048",
    status: "Active",
    startDate: "14 June 2026",
    renewalDate: "14 June 2027",
    premium: "₹42,000 / year",
    detail: "48 members covered across all branches with cashless hospitalization.",
  },
  {
    id: 2,
    name: "Enterprise IT Infra Shield",
    tag: "IT & Security",
    cover: "24/7 Monitoring",
    policyNumber: "ITS-2026-102",
    status: "Active",
    startDate: "01 March 2026",
    renewalDate: "01 March 2027",
    premium: "₹85,000 / year",
    detail: "Cloud infra management, automated backups, and 99.9% uptime SLA.",
  },
  {
    id: 3,
    name: "Brand Growth Suite",
    tag: "Marketing",
    cover: "Full Spectrum",
    policyNumber: "MKS-2026-309",
    status: "Active",
    startDate: "20 May 2026",
    renewalDate: "20 May 2027",
    premium: "₹60,000 / year",
    detail: "Digital ad campaign management, SEO optimization, and brand assets.",
  },
  {
    id: 4,
    name: "Mudra Export Certification",
    tag: "Compliance",
    cover: "Verified Seal",
    policyNumber: "MEC-2026-881",
    status: "Active",
    startDate: "15 Jan 2026",
    renewalDate: "15 Jan 2027",
    premium: "₹1,20,000 / year",
    detail: "Official trade certification verified for international commerce.",
  },
];

const pipelineSteps = [
  { name: "Submission", done: true, date: "10 Aug" },
  { name: "Doc Audit", done: true, date: "10 Aug" },
  { name: "Manager Review", done: true, date: "10 Aug" },
  { name: "Agreement", done: false, date: "Pending" },
  { name: "Final Approval", done: false, date: "Pending" },
];

const documentVaultData = [
  { name: "Incorporation Certificate", status: "verified", date: "10 Jan 2026" },
  { name: "GSTIN Verification Proof", status: "verified", date: "12 Jan 2026" },
  { name: "Annual Financial Statement", status: "pending", date: "Awaiting Upload" },
  { name: "Director ID Proof", status: "verified", date: "15 Jan 2026" },
];

const chartPoints = [
  { month: "Jan", val: 32 },
  { month: "Feb", val: 45 },
  { month: "Mar", val: 68 },
  { month: "Apr", val: 54 },
  { month: "May", val: 82 },
  { month: "Jun", val: 95 },
  { month: "Jul", val: 88 },
  { month: "Aug", val: 110 },
];

/* ── MAIN DASHBOARD COMPONENT ── */
export default function Dashboard({ onSignOut }) {
  const [activeNav, setActiveNav] = React.useState("Dashboard");
  const [dark, setDark] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [schemeQuery, setSchemeQuery] = React.useState("");
  const [submittedQuery, setSubmittedQuery] = React.useState("");
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [notifFilter, setNotifFilter] = React.useState("all");
  const [unreadNotifCount, setUnreadNotifCount] = React.useState(3);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [selectedScheme, setSelectedScheme] = React.useState(null);

  // Quick Action Modals
  const [newRequestOpen, setNewRequestOpen] = React.useState(false);
  const [supportOpen, setSupportOpen] = React.useState(false);
  const [requestService, setRequestService] = React.useState("Certificate");
  const [requestNotes, setRequestNotes] = React.useState("");
  const [requestSubmitted, setRequestSubmitted] = React.useState(false);

  // Live Client Milestone Progress (syncable with Admin updates)
  const clientCompletedSteps = React.useMemo(() => {
    try {
      const saved = localStorage.getItem("agni_branch_clients");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const found = parsed[0];
          if (found && Array.isArray(found.completedSteps)) {
            return found.completedSteps;
          }
        }
      }
    } catch (e) {
      console.warn("Error reading branch clients", e);
    }
    return ["Submission", "Doc Audit", "Manager Review"];
  }, []);

  const clientProgressPercent = Math.min(100, Math.max(0, clientCompletedSteps.length * 20));

  const filteredSchemes = activeSchemesData.filter((scheme) =>
    scheme.name.toLowerCase().includes(submittedQuery.trim().toLowerCase()) ||
    scheme.tag.toLowerCase().includes(submittedQuery.trim().toLowerCase())
  );

  const notificationsList = [
    { id: 1, type: "alerts", tone: "#e08061", title: "Renewal due soon", detail: "Corporate Health Shield renews in 12 days.", time: "2m ago" },
    { id: 2, type: "alerts", tone: "#4e7cff", title: "New scheme active", detail: "Enterprise IT Infra Shield is now fully operational.", time: "1h ago" },
    { id: 3, type: "payments", tone: "#44bfb0", title: "Payment cleared", detail: "Invoice payment ₹42,000 received.", time: "3h ago" },
  ];

  const filteredNotifications = notificationsList.filter(n => notifFilter === "all" || n.type === notifFilter);

  // Popover Outside Click Listener
  React.useEffect(() => {
    function handleClick() {
      setNotificationsOpen(false);
      setProfileOpen(false);
    }
    if (notificationsOpen || profileOpen) {
      window.addEventListener("click", handleClick);
      return () => window.removeEventListener("click", handleClick);
    }
  }, [notificationsOpen, profileOpen]);

  function handleCreateRequest(e) {
    e.preventDefault();
    setRequestSubmitted(true);
    setTimeout(() => {
      setRequestSubmitted(false);
      setNewRequestOpen(false);
      setRequestNotes("");
    }, 1800);
  }

  return (
    <main className={`client-dashboard cd-redesign ${dark ? "dashboard-dark" : ""}`}>
      <DashboardSidebar
        navItems={navItems}
        activeNav={activeNav}
        onNavChange={setActiveNav}
        dark={dark}
        onToggleDark={() => setDark((value) => !value)}
        onSignOut={onSignOut}
        IconComponent={DashboardIcon}
        brandMark="A"
        navLabel="Client dashboard navigation"
      />

      <section className="dashboard-content">
        {/* ── COMMAND HEADER ── */}
        <header className="cd-header">
          <div className="cd-header-left">
            <div className="cd-company-pill">
              <div className="cd-company-avatar-wrap">
                <div className="cd-company-avatar">AI</div>
                <span className="cd-online-dot" title="Account Active" />
              </div>
              <div className="cd-company-details">
                <h1>Acme Industries Pvt. Ltd.</h1>
                <div className="cd-company-submeta">
                  <span className="cd-meta-badge id-badge">ID: CLI-2026-8942</span>
                  <span className="cd-meta-badge tier-badge">Enterprise Client</span>
                  <span className="cd-meta-badge mgr-badge">Manager: Kansish</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cd-header-center">
            <div className="cd-date-pill">
              <DashboardIcon name="clock" size={14} />
              <span>Mon, 10 Aug 2026</span>
            </div>
          </div>

          <div className="cd-header-actions">
            {/* Quick Action: New Request */}
            <button
              type="button"
              className="cd-action-btn-primary"
              onClick={() => setNewRequestOpen(true)}
            >
              <DashboardIcon name="addScheme" size={16} />
              <span>New Request</span>
            </button>

            {/* Search Input */}
            {searchOpen ? (
              <div className="cd-search-field">
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSubmittedQuery(schemeQuery);
                  }}
                >
                  <input
                    autoFocus
                    value={schemeQuery}
                    onChange={(event) => {
                      setSchemeQuery(event.target.value);
                      setSubmittedQuery(event.target.value);
                    }}
                    placeholder="Search schemes or tags..."
                    aria-label="Search"
                  />
                </form>
                <button
                  type="button"
                  className="cd-search-close-btn"
                  onClick={() => {
                    setSchemeQuery("");
                    setSubmittedQuery("");
                    setSearchOpen(false);
                  }}
                  title="Close Search"
                >
                  ×
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="cd-icon-btn"
                onClick={() => setSearchOpen(true)}
                title="Search Schemes"
              >
                <DashboardIcon name="search" size={17} />
              </button>
            )}

            {/* Notifications Popover */}
            <div className="cd-popover-wrap" onClick={(e) => e.stopPropagation()}>
              <button
                className="cd-icon-btn cd-bell-btn"
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setProfileOpen(false);
                }}
                title="Notifications"
              >
                <DashboardIcon name="bell" size={17} />
                {unreadNotifCount > 0 && <i className="cd-notif-dot" />}
              </button>
              {notificationsOpen && (
                <section className="cd-popover cd-notif-popover">
                  <header className="cd-notif-popover-header">
                    <h2>Notifications</h2>
                    {unreadNotifCount > 0 && (
                      <button
                        type="button"
                        className="cd-mark-read-btn"
                        onClick={() => setUnreadNotifCount(0)}
                      >
                        Clear unread
                      </button>
                    )}
                  </header>
                  <div className="cd-notif-tabs">
                    <button
                      type="button"
                      className={`cd-notif-tab ${notifFilter === "all" ? "active" : ""}`}
                      onClick={() => setNotifFilter("all")}
                    >
                      All
                    </button>
                    <button
                      type="button"
                      className={`cd-notif-tab ${notifFilter === "alerts" ? "active" : ""}`}
                      onClick={() => setNotifFilter("alerts")}
                    >
                      Alerts
                    </button>
                    <button
                      type="button"
                      className={`cd-notif-tab ${notifFilter === "payments" ? "active" : ""}`}
                      onClick={() => setNotifFilter("payments")}
                    >
                      Payments
                    </button>
                  </div>
                  <div className="cd-notif-list">
                    {filteredNotifications.map((notice) => (
                      <article key={notice.id}>
                        <i className="cd-notice-dot" style={{ background: notice.tone }} />
                        <div>
                          <strong>{notice.title}</strong>
                          <p>{notice.detail}</p>
                          <time>{notice.time}</time>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Profile Popover */}
            <div className="cd-popover-wrap" onClick={(e) => e.stopPropagation()}>
              <button
                className="cd-profile-btn"
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotificationsOpen(false);
                }}
                title="Profile"
              >
                DS
              </button>
              {profileOpen && (
                <section className="cd-popover cd-profile-popover">
                  <div className="cd-profile-header">
                    <div className="cd-profile-avatar">DS</div>
                    <div>
                      <strong>Devika Shah</strong>
                      <span className="cd-profile-email">contact@acme.com</span>
                    </div>
                  </div>
                  <div className="cd-profile-menu">
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        setChangePasswordOpen(true);
                      }}
                    >
                      Change password
                    </button>
                    <button
                      type="button"
                      onClick={() => setDark((prev) => !prev)}
                    >
                      {dark ? "Switch to Light" : "Switch to Dark"}
                    </button>
                    <button
                      className="cd-logout-option"
                      type="button"
                      onClick={onSignOut}
                    >
                      Logout
                    </button>
                  </div>
                </section>
              )}
            </div>
          </div>
        </header>

        {/* ── PAGE ROUTING CONTENT ── */}
        {activeNav === "More Services" ? (
          <MoreServicesPage />
        ) : activeNav === "Eligibility" ? (
          <EligibilityPage />
        ) : activeNav === "Deals" ? (
          <DealsPage />
        ) : activeNav === "Invoices" ? (
          <InvoicesPage />
        ) : (
          <>
            {/* ── HERO BANNER & METRICS RIBBON ── */}
            <section className="cd-hero-banner">
              <div className="cd-orb-mesh-1" />
              <div className="cd-orb-mesh-2" />
              <div className="cd-hero-content">
                <div className="cd-hero-greeting">
                  <div>
                    <span className="cd-kicker">EXECUTIVE WORKSPACE</span>
                    <h2>Welcome back, <em>Acme Industries</em></h2>
                    <p>Track your active coverage, service status, and support pipelines in real time.</p>
                  </div>
                  <div className="cd-quick-status-pill">
                    <i className="cd-pulse-green" />
                    <span>Account Active</span>
                  </div>
                </div>

                <div className="cd-metrics-grid">
                  {executiveMetrics.map((item, idx) => (
                    <article
                      key={item.label}
                      className="cd-metric-card"
                      style={{ animationDelay: `${idx * 0.08}s` }}
                    >
                      <div className="cd-metric-icon-box" style={{ background: item.bg, color: item.color }}>
                        <DashboardIcon name={item.icon} size={22} />
                      </div>
                      <div className="cd-metric-info">
                        <span className="cd-metric-value">{item.value}</span>
                        <span className="cd-metric-label">{item.label}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* ── MAIN DASHBOARD GRID ── */}
            <div className="cd-main-layout">
              {/* LEFT COLUMN */}
              <div className="cd-left-column">
                {/* Live Application Progress Pipeline Tracker */}
                <section className="cd-section-card cd-tracker-section">
                  <div className="cd-section-head">
                    <div>
                      <span className="cd-kicker">APPLICATION STATUS</span>
                      <h2>Active Service Pipeline</h2>
                    </div>
                    <div className="cd-tracker-ring-wrap">
                      <div className="cd-tracker-ring">
                        <svg viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="rgba(78, 124, 255, 0.15)"
                            strokeWidth="3.5"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#4e7cff"
                            strokeWidth="3.5"
                            strokeDasharray={`${clientProgressPercent}, 100`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="cd-tracker-percent-text">{clientProgressPercent}%</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <ActivityStatusBar
                      completedSteps={clientCompletedSteps}
                      progress={clientProgressPercent}
                      interactive={false}
                      stepDates={{
                        Submission: "10 Aug",
                        "Doc Audit": "12 Aug",
                        "Manager Review": "14 Aug",
                        Agreement: "Pending",
                        "Final Approval": "Pending",
                      }}
                    />
                  </div>
                </section>

                {/* Active Services Showcase Grid */}
                <section className="cd-section-card cd-schemes-section">
                  <div className="cd-section-head">
                    <div>
                      <span className="cd-kicker">COVERAGE PORTFOLIO</span>
                      <h2>Active Schemes & Plans</h2>
                    </div>
                    <span className="cd-pill-badge">{filteredSchemes.length} Active Plans</span>
                  </div>

                  <div className="cd-schemes-cards-grid">
                    {filteredSchemes.map((scheme) => (
                      <article key={scheme.id} className="cd-scheme-card-box">
                        <div className="cd-scheme-top-glow" />
                        <div className="cd-scheme-card-body">
                          <div className="cd-scheme-card-head">
                            <span className="cd-badge-active">
                              <DashboardIcon name="check" size={12} /> {scheme.status}
                            </span>
                            <span className="cd-scheme-tag">{scheme.tag}</span>
                          </div>
                          <h3>{scheme.name}</h3>
                          <p>{scheme.detail}</p>
                          <div className="cd-scheme-meta-box">
                            <div>
                              <span>Sum Insured Cover</span>
                              <strong>{scheme.cover}</strong>
                            </div>
                            <div>
                              <span>Next Renewal</span>
                              <strong>{scheme.renewalDate}</strong>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="cd-scheme-btn-outline"
                            onClick={() => setSelectedScheme(scheme)}
                          >
                            <span>Inspect Policy & Benefits</span>
                            <DashboardIcon name="arrow" size={15} />
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              </div>

              {/* RIGHT COLUMN */}
              <div className="cd-right-column">
                {/* Document Vault Widget */}
                <section className="cd-section-card cd-doc-vault-section">
                  <div className="cd-section-head">
                    <div>
                      <span className="cd-kicker">COMPLIANCE</span>
                      <h2>Document Vault</h2>
                    </div>
                  </div>
                  <div className="cd-doc-vault-list">
                    {documentVaultData.map((doc) => (
                      <div key={doc.name} className="cd-doc-item">
                        <div className="cd-doc-item-left">
                          <div
                            className="cd-doc-icon"
                            style={{
                              background: doc.status === "verified" ? "rgba(68, 191, 176, 0.12)" : "rgba(242, 170, 56, 0.12)",
                              color: doc.status === "verified" ? "#44bfb0" : "#f2aa38"
                            }}
                          >
                            <DashboardIcon name="file" size={16} />
                          </div>
                          <div className="cd-doc-info">
                            <strong>{doc.name}</strong>
                            <small>{doc.date}</small>
                          </div>
                        </div>
                        <span className={`cd-doc-status-badge ${doc.status}`}>
                          {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Account Manager & Sales Lead Contact Widget */}
                <section className="cd-section-card cd-manager-section">
                  <div className="cd-section-head" style={{ marginBottom: 16 }}>
                    <div>
                      <span className="cd-kicker">YOUR DEDICATED TEAM</span>
                      <h2 style={{ fontSize: 20 }}>Account Leadership</h2>
                    </div>
                  </div>

                  <div className="cd-manager-card">
                    <div className="cd-manager-profile-row">
                      <div className="cd-manager-avatar">K</div>
                      <div className="cd-manager-details">
                        <h3>Kansish</h3>
                        <p className="cd-manager-role">Enterprise Account Lead</p>
                      </div>
                    </div>

                    <div className="cd-sales-rep-chip">
                      <div className="cd-sales-avatar-sm">M</div>
                      <div>
                        <strong>Mia Ross</strong>
                        <small>Assigned Sales Representative</small>
                      </div>
                    </div>

                    <div className="cd-manager-actions">
                      <a href="tel:+919876543210" className="cd-call-btn">
                        <DashboardIcon name="phone" size={14} /> Call Manager
                      </a>
                      <button
                        type="button"
                        className="cd-email-btn"
                        onClick={() => setNewRequestOpen(true)}
                      >
                        Contact Leads
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </>
        )}
      </section>

      {/* ── SCHEME DETAILS INSPECTION MODAL ── */}
      {selectedScheme && (
        <div className="cd-modal-backdrop" onMouseDown={() => setSelectedScheme(null)}>
          <section
            className="cd-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="cd-modal-close"
              onClick={() => setSelectedScheme(null)}
            >
              ×
            </button>
            <span className="cd-badge-active" style={{ marginBottom: 12 }}>
              <DashboardIcon name="check" size={11} /> {selectedScheme.status}
            </span>
            <h2>{selectedScheme.name}</h2>
            <p className="cd-modal-desc">{selectedScheme.detail}</p>
            <div className="cd-scheme-meta-box" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <div>
                <span>Policy Number</span>
                <strong>{selectedScheme.policyNumber}</strong>
              </div>
              <div>
                <span>Start Date</span>
                <strong>{selectedScheme.startDate}</strong>
              </div>
              <div>
                <span>Renewal Date</span>
                <strong>{selectedScheme.renewalDate}</strong>
              </div>
              <div>
                <span>Annual Premium</span>
                <strong>{selectedScheme.premium}</strong>
              </div>
              <div>
                <span>Coverage Limit</span>
                <strong>{selectedScheme.cover}</strong>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ── CREATE SERVICE REQUEST MODAL ── */}
      {newRequestOpen && (
        <div className="cd-modal-backdrop" onMouseDown={() => setNewRequestOpen(false)}>
          <section
            className="cd-modal cd-modal-request"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="cd-modal-top-glow" />
            <button
              type="button"
              className="cd-modal-close"
              onClick={() => setNewRequestOpen(false)}
            >
              ×
            </button>

            <span className="cd-kicker" style={{ marginBottom: 4, display: 'inline-block' }}>DIRECT SALES DISPATCH</span>
            <h2>Request New Service</h2>
            <p className="cd-modal-desc">
              Submit your requirements. This request will be routed directly to your assigned sales lead, <strong>Mia Ross</strong>.
            </p>

            {requestSubmitted ? (
              <div className="cd-request-success">
                <div className="cd-request-success-icon">
                  <DashboardIcon name="check" size={28} />
                </div>
                <h3>Request Dispatched Successfully!</h3>
                <p>Notification sent to <strong>Mia Ross</strong> (Senior Sales Lead). She will contact your account within 2 business hours.</p>
                <button
                  type="button"
                  className="cd-submit-btn cd-submit-btn-glow"
                  onClick={() => {
                    setRequestSubmitted(false);
                    setNewRequestOpen(false);
                  }}
                  style={{ marginTop: 12, width: '100%' }}
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreateRequest} className="cd-modal-form">
                <div className="cd-modal-assigned-card">
                  <div className="cd-sales-avatar-sm" style={{ width: 36, height: 36, fontSize: 14 }}>M</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: 13, color: 'var(--cd-ink)' }}>Mia Ross</strong>
                      <span className="cd-badge-active" style={{ fontSize: 10, padding: '2px 8px' }}>Assigned Lead</span>
                    </div>
                    <small style={{ fontSize: 11, color: 'var(--cd-muted)', display: 'block' }}>Senior Sales Lead • Account Lead: Kansish</small>
                  </div>
                </div>

                <div className="cd-form-group">
                  <label className="cd-form-label">Service Category</label>
                  <select
                    value={requestService}
                    onChange={(e) => setRequestService(e.target.value)}
                    className="cd-modal-select"
                  >
                    <option value="Certificate">Certificate Verification & Licensing</option>
                    <option value="IT Support">IT Infrastructure & Security Audit</option>
                    <option value="Marketing">Digital Brand Growth & PR Campaign</option>
                    <option value="Insurance">Corporate Group Health Shield</option>
                  </select>
                </div>

                <div className="cd-form-group">
                  <label className="cd-form-label">Requirements & Specific Details</label>
                  <textarea
                    rows={4}
                    value={requestNotes}
                    onChange={(e) => setRequestNotes(e.target.value)}
                    placeholder="Describe your headcount size, timeline, or scope specifications..."
                    className="cd-modal-textarea"
                    required
                  />
                </div>

                <button type="submit" className="cd-submit-btn cd-submit-btn-glow">
                  <span>Dispatch Request to Mia Ross</span>
                  <DashboardIcon name="arrow" size={16} />
                </button>
              </form>
            )}
          </section>
        </div>
      )}

      {/* ── HELP & SUPPORT MODAL ── */}
      {supportOpen && (
        <div className="cd-modal-backdrop" onMouseDown={() => setSupportOpen(false)}>
          <section
            className="cd-modal cd-modal-sm"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="cd-modal-close"
              onClick={() => setSupportOpen(false)}
            >
              ×
            </button>
            <h2>Help & Support Desk</h2>
            <p className="cd-modal-desc">
              Need assistance? Connect with your dedicated Account Manager.
            </p>
            <div className="cd-manager-card">
              <div className="cd-manager-avatar">K</div>
              <div className="cd-manager-details">
                <h3>Kansish</h3>
                <p className="cd-manager-role">Enterprise Account Lead</p>
              </div>
              <div className="cd-manager-actions">
                <a href="tel:+919876543210" className="cd-call-btn">
                  <DashboardIcon name="phone" size={14} /> Call Manager
                </a>
                <a href="mailto:support@agnicrm.com" className="cd-email-btn">
                  Email Support
                </a>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
