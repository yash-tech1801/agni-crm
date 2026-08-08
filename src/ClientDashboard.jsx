import React from "react";
import "./ClientDashboard.css";
import DashboardSidebar from "./components/dashboard/DashboardSidebar";
import DashboardHeader from "./components/dashboard/DashboardHeader";
import MoreServicesPage from "./pages/MoreServicesPage";
import EligibilityPage from "./pages/EligibilityPage";

/* ── Icon registry ── */
const dashboardIcons = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
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
      <path d="M10 12v2h4v-2" />
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
  more: (
    <>
      <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  moon: <path d="M20.5 15.6A8.5 8.5 0 0 1 8.4 3.5 8.5 8.5 0 1 0 20.5 15.6Z" />,
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
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M6 21v-1a6 6 0 0 1 12 0v1" />
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
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {dashboardIcons[name]}
    </svg>
  );
}

/* ── Data ── */
const services = [
  {
    name: "Certificate",
    description: "Issue and manage verified digital certificates.",
    icon: "CE",
    tone: "certificate",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    name: "IT Support",
    description: "Get technology & infra support for your business.",
    icon: "IT",
    tone: "it",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    name: "Marketing",
    description: "Plan campaigns and amplify your brand.",
    icon: "MK",
    tone: "marketing",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
];

const navItems = [
  ["dashboard", "Dashboard"],
  ["eligibility", "Eligibility"],
  ["briefcase", "Deals"],
  ["receipt", "Invoices"],
  ["addScheme", "More Services"],
];

const activeSchemes = [
  {
    name: "Corporate Health Shield",
    detail: "48 members covered",
    cover: "Rs. 10L",
    policyNumber: "CHS-2026-048",
    status: "Active",
    startDate: "14 June 2026",
    renewalDate: "14 June 2027",
    premium: "Rs. 42,000 / year",
    benefits: [
      "Cashless hospitalisation",
      "Family coverage",
      "Annual health check-up",
      "24/7 claim support",
    ],
  },
];

const recentActivity = [
  { title: "Renewal reminder sent", detail: "Family Floater Policy renews in 3 days", time: "2m ago", color: "#f5576c" },
  { title: "Payment received", detail: "Premium ₹42,000 for Corporate Health Shield", time: "1h ago", color: "#43e97b" },
  { title: "Document uploaded", detail: "Income proof submitted successfully", time: "3h ago", color: "#667eea" },
  { title: "Scheme approved", detail: "Business Protection Plan is now active", time: "1d ago", color: "#f093fb" },
];

const quickStats = [
  { label: "Active Plans", value: "3", icon: "shield", color: "#667eea", bg: "rgba(102,126,234,0.12)" },
  { label: "Pending Docs", value: "2", icon: "file", color: "#f5576c", bg: "rgba(245,87,108,0.12)" },
  { label: "Next Renewal", value: "3 days", icon: "clock", color: "#f093fb", bg: "rgba(240,147,251,0.12)" },
  { label: "Total Cover", value: "₹40L", icon: "sparkle", color: "#43e97b", bg: "rgba(67,233,123,0.12)" },
];

/* ── Mini-Components ── */

function StatCard({ stat, index }) {
  return (
    <article className="cd-stat-card" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="cd-stat-icon" style={{ background: stat.bg, color: stat.color }}>
        <DashboardIcon name={stat.icon} size={20} />
      </div>
      <div className="cd-stat-info">
        <span className="cd-stat-value">{stat.value}</span>
        <span className="cd-stat-label">{stat.label}</span>
      </div>
    </article>
  );
}

function SchemeCard({ scheme, onView }) {
  return (
    <article className="cd-scheme-card">
      <div className="cd-scheme-glow" />
      <div className="cd-scheme-content">
        <div className="cd-scheme-top">
          <span className="cd-scheme-badge">
            <DashboardIcon name="check" size={11} /> Active
          </span>
          <span className="cd-scheme-members">{scheme.detail}</span>
        </div>
        <h3>{scheme.name}</h3>
        <p className="cd-scheme-desc">
          Comprehensive health cover for your workforce and their families.
        </p>
        <div className="cd-scheme-meta">
          <div>
            <span>Cover</span>
            <strong>{scheme.cover}</strong>
          </div>
          <div>
            <span>Premium</span>
            <strong>{scheme.premium}</strong>
          </div>
          <div>
            <span>Renewal</span>
            <strong>{scheme.renewalDate}</strong>
          </div>
        </div>
        <button className="cd-scheme-view-btn" onClick={() => onView(scheme)}>
          View details <DashboardIcon name="arrow" size={15} />
        </button>
      </div>
    </article>
  );
}

function ServiceCard({ service, onOpen }) {
  return (
    <article className="cd-service-card">
      <div className="cd-service-icon-wrap" style={{ background: service.gradient }}>
        {service.icon}
      </div>
      <div className="cd-service-info">
        <h3>{service.name}</h3>
        <p>{service.description}</p>
      </div>
      <button className="cd-service-btn" onClick={onOpen}>
        <DashboardIcon name="arrow" size={16} />
      </button>
    </article>
  );
}

function ApplicationTracker() {
  const steps = [
    { name: "Payment", done: true },
    { name: "Agreement", done: true },
    { name: "Reports", done: false },
    { name: "Application", done: false },
    { name: "Approval", done: false },
  ];
  const completed = steps.filter((s) => s.done).length;
  const percent = Math.round((completed / steps.length) * 100);

  return (
    <section className="cd-tracker">
      <div className="cd-tracker-header">
        <div>
          <span className="cd-kicker">APPLICATION PROGRESS</span>
          <h2>Application tracker</h2>
        </div>
        <div className="cd-tracker-percent">
          <svg viewBox="0 0 36 36" className="cd-tracker-ring">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(102,126,234,0.15)"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="url(#trackerGrad)"
              strokeWidth="3"
              strokeDasharray={`${percent}, 100`}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="trackerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="100%" stopColor="#f093fb" />
              </linearGradient>
            </defs>
          </svg>
          <span>{percent}%</span>
        </div>
      </div>
      <div className="cd-tracker-steps">
        {steps.map((step, idx) => (
          <div
            className={`cd-tracker-step ${step.done ? "done" : ""}`}
            key={step.name}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="cd-step-dot">
              {step.done ? <DashboardIcon name="check" size={12} /> : <span>{idx + 1}</span>}
            </div>
            <div className="cd-step-info">
              <strong>{step.name}</strong>
              <small>{step.done ? "Completed" : "Pending"}</small>
            </div>
            {idx < steps.length - 1 && <div className={`cd-step-line ${step.done ? "done" : ""}`} />}
          </div>
        ))}
      </div>
    </section>
  );
}

function ActivityFeed() {
  return (
    <section className="cd-activity">
      <div className="cd-activity-header">
        <span className="cd-kicker">RECENT ACTIVITY</span>
        <h2>What's happening</h2>
      </div>
      <div className="cd-activity-list">
        {recentActivity.map((item, idx) => (
          <div className="cd-activity-row" key={item.title} style={{ animationDelay: `${idx * 0.06}s` }}>
            <span className="cd-activity-dot" style={{ background: item.color }} />
            <div className="cd-activity-info">
              <strong>{item.title}</strong>
              <small>{item.detail}</small>
            </div>
            <time>{item.time}</time>
          </div>
        ))}
      </div>
    </section>
  );
}

function DocumentChecklist() {
  const submitted = ["Identity proof", "Address proof"];
  const pending = ["Income proof", "Bank statement"];
  return (
    <article className="cd-documents">
      <div className="cd-documents-header">
        <DashboardIcon name="file" size={18} />
        <h3>Document checklist</h3>
      </div>
      <div className="cd-doc-section">
        <span className="cd-doc-badge submitted">Submitted</span>
        <ul>
          {submitted.map((doc) => (
            <li key={doc}>
              <DashboardIcon name="check" size={14} />
              {doc}
            </li>
          ))}
        </ul>
      </div>
      <div className="cd-doc-section">
        <span className="cd-doc-badge pending">Pending</span>
        <ul>
          {pending.map((doc) => (
            <li key={doc} className="pending">
              <DashboardIcon name="clock" size={14} />
              {doc}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ContactCard() {
  return (
    <article className="cd-contact">
      <div className="cd-contact-avatar">
        <span>K</span>
      </div>
      <div className="cd-contact-info">
        <span className="cd-kicker">YOUR CONTACT PERSON</span>
        <h3>Kansish</h3>
        <a href="tel:+919876543210" className="cd-contact-phone">
          <DashboardIcon name="phone" size={14} />
          +91 98765 43210
        </a>
      </div>
    </article>
  );
}

/* ── Main Component ── */
export default function Dashboard({ onSignOut }) {
  const [activeNav, setActiveNav] = React.useState("Dashboard");
  const [dark, setDark] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [schemeQuery, setSchemeQuery] = React.useState("");
  const [submittedQuery, setSubmittedQuery] = React.useState("");
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [selectedScheme, setSelectedScheme] = React.useState(null);

  const matchingSchemes = activeSchemes.filter((scheme) =>
    scheme.name.toLowerCase().includes(submittedQuery.trim().toLowerCase()),
  );

  // Close popovers on outside click
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
        {/* Header */}
        <header className="cd-header">
          <div className="cd-header-left">
            <div className="cd-company-pill">
              <div className="cd-company-avatar">AI</div>
              <div>
                <h1>Acme Industries Pvt. Ltd.</h1>
                <span className="cd-company-role">Enterprise Client</span>
              </div>
            </div>
          </div>

          <div className="cd-header-actions">
            {searchOpen ? (
              <div className="cd-search-field">
                <form
                  id="scheme-search"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSubmittedQuery(schemeQuery);
                  }}
                >
                  <input
                    autoFocus
                    value={schemeQuery}
                    onChange={(event) => setSchemeQuery(event.target.value)}
                    placeholder="Search schemes..."
                    aria-label="Search schemes"
                  />
                </form>
                <button
                  type="submit"
                  form="scheme-search"
                  className="cd-search-btn"
                  aria-label="Run search"
                >
                  <DashboardIcon name="search" size={16} />
                </button>
              </div>
            ) : (
              <button
                className="cd-icon-btn"
                onClick={() => setSearchOpen(true)}
                aria-label="Search schemes"
              >
                <DashboardIcon name="search" size={17} />
              </button>
            )}

            <div className="cd-popover-wrap" onClick={(e) => e.stopPropagation()}>
              <button
                className="cd-icon-btn cd-bell-btn"
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setProfileOpen(false);
                }}
                aria-label="Notifications"
              >
                <DashboardIcon name="bell" size={17} />
                <i className="cd-notif-dot" />
              </button>
              {notificationsOpen && (
                <section className="cd-popover cd-notif-popover" aria-label="Notifications">
                  <header>
                    <h2>Notifications</h2>
                    <span className="cd-notif-count">3 new</span>
                  </header>
                  <article>
                    <i className="cd-notice-dot" style={{ background: "#f5576c" }} />
                    <div>
                      <strong>Renewal due soon</strong>
                      <p>Family Floater Policy renews in 3 days.</p>
                    </div>
                  </article>
                  <article>
                    <i className="cd-notice-dot" style={{ background: "#667eea" }} />
                    <div>
                      <strong>New scheme added</strong>
                      <p>Corporate Health Shield is now active.</p>
                    </div>
                  </article>
                  <article>
                    <i className="cd-notice-dot" style={{ background: "#43e97b" }} />
                    <div>
                      <strong>Payment received</strong>
                      <p>Premium payment was received today.</p>
                    </div>
                  </article>
                </section>
              )}
            </div>

            <div className="cd-popover-wrap" onClick={(e) => e.stopPropagation()}>
              <button
                className="cd-profile-btn"
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotificationsOpen(false);
                }}
                aria-label="Open profile"
              >
                DS
              </button>
              {profileOpen && (
                <section className="cd-popover cd-profile-popover" aria-label="Profile options">
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
                    className="cd-logout-option"
                    type="button"
                    onClick={onSignOut}
                  >
                    Logout
                  </button>
                </section>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        {activeNav === "More Services" ? (
          <MoreServicesPage />
        ) : activeNav === "Eligibility" ? (
          <EligibilityPage />
        ) : (
          <div className="cd-layout">
            {/* Main column */}
            <div className="cd-main">
              {/* Welcome bar */}
              <section className="cd-welcome">
                <div className="cd-welcome-orb cd-orb-1" />
                <div className="cd-welcome-orb cd-orb-2" />
                <div className="cd-welcome-content">
                  <div>
                    <span className="cd-kicker">WELCOME BACK</span>
                    <h2>Good afternoon, <em>Acme Industries</em></h2>
                    <p>Track your schemes, documents, and business coverage in one place.</p>
                  </div>
                  <div className="cd-welcome-stats">
                    {quickStats.map((stat, idx) => (
                      <StatCard key={stat.label} stat={stat} index={idx} />
                    ))}
                  </div>
                </div>
              </section>

              {/* Active schemes */}
              <section className="cd-schemes-section">
                <div className="cd-section-header">
                  <div>
                    <span className="cd-kicker">YOUR COVERAGE</span>
                    <h2>Active schemes</h2>
                  </div>
                  <span className="cd-count-badge">{matchingSchemes.length} active</span>
                </div>
                <div className="cd-schemes-grid">
                  {matchingSchemes.map((scheme) => (
                    <SchemeCard
                      key={scheme.name}
                      scheme={scheme}
                      onView={setSelectedScheme}
                    />
                  ))}
                  {matchingSchemes.length === 0 && (
                    <p className="cd-no-results">
                      No schemes match "{submittedQuery}".
                    </p>
                  )}
                </div>
              </section>

              {/* Application tracker */}
              <ApplicationTracker />

              {/* Bottom grid */}
              <div className="cd-bottom-grid">
                <DocumentChecklist />
                <ContactCard />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="cd-sidebar">
              <ActivityFeed />

              <section className="cd-services-aside">
                <span className="cd-kicker">EXPLORE</span>
                <h2>More Services</h2>
                {services.map((service) => (
                  <ServiceCard
                    key={service.name}
                    service={service}
                    onOpen={() => setActiveNav("More Services")}
                  />
                ))}
              </section>
            </aside>
          </div>
        )}
      </section>

      {/* Scheme details modal */}
      {selectedScheme && (
        <div
          className="cd-modal-backdrop"
          role="presentation"
          onMouseDown={() => setSelectedScheme(null)}
        >
          <section
            className="cd-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="scheme-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="cd-modal-close"
              onClick={() => setSelectedScheme(null)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="cd-modal-badge-row">
              <span className="cd-scheme-badge">
                <DashboardIcon name="check" size={11} /> {selectedScheme.status}
              </span>
            </div>
            <h2 id="scheme-modal-title">{selectedScheme.name}</h2>
            <p className="cd-modal-desc">
              Comprehensive health cover designed for your workforce and their families.
            </p>
            <div className="cd-modal-grid">
              <div>
                <span>Policy number</span>
                <strong>{selectedScheme.policyNumber}</strong>
              </div>
              <div>
                <span>Active from</span>
                <strong>{selectedScheme.startDate}</strong>
              </div>
              <div>
                <span>Renewal</span>
                <strong>{selectedScheme.renewalDate}</strong>
              </div>
              <div>
                <span>Premium</span>
                <strong>{selectedScheme.premium}</strong>
              </div>
              <div>
                <span>Sum insured</span>
                <strong>{selectedScheme.cover}</strong>
              </div>
              <div>
                <span>Members</span>
                <strong>{selectedScheme.detail}</strong>
              </div>
            </div>
            {selectedScheme.benefits && (
              <div className="cd-modal-benefits">
                <h3>Benefits included</h3>
                <ul>
                  {selectedScheme.benefits.map((b) => (
                    <li key={b}>
                      <DashboardIcon name="check" size={14} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>
      )}

      {/* Change password modal */}
      {changePasswordOpen && (
        <div
          className="cd-modal-backdrop"
          role="presentation"
          onMouseDown={() => setChangePasswordOpen(false)}
        >
          <section
            className="cd-modal cd-modal-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="change-password-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="cd-modal-close"
              onClick={() => setChangePasswordOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 id="change-password-title">Change password</h2>
            <p className="cd-modal-desc">
              Enter your new password and confirm it below.
            </p>
            <form
              className="cd-password-form"
              onSubmit={(event) => {
                event.preventDefault();
                if (newPassword !== confirmPassword) {
                  setPasswordError("Passwords do not match.");
                  return;
                }
                setPasswordError("");
                setChangePasswordOpen(false);
                setNewPassword("");
                setConfirmPassword("");
              }}
            >
              <label>
                New password
                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  required
                />
              </label>
              <label>
                Confirm new password
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
              </label>
              {passwordError && <p className="cd-form-error">{passwordError}</p>}
              <button type="submit" className="cd-submit-btn">
                Update password
              </button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
