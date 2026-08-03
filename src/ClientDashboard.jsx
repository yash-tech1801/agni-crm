import React from "react";
import MoreServicesPage from "./pages/MoreServicesPage";
import EligibilityPage from "./pages/EligibilityPage";

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

const services = [
  {
    name: "Certificate",
    description: "Issue and manage client certificates.",
    icon: "CE",
    tone: "certificate",
  },
  {
    name: "IT",
    description: "Get technology support for your business.",
    icon: "IT",
    tone: "it",
  },
  {
    name: "Marketing",
    description: "Plan campaigns and grow your reach.",
    icon: "MK",
    tone: "marketing",
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

function SchemeCard({ scheme, onView }) {
  return (
    <article className="scheme-card">
      <div>
        <span className="scheme-status">Active scheme</span>
        <h3>{scheme.name}</h3>
      </div>
      <div className="scheme-bottom">
        <button
          onClick={() => onView(scheme)}
          aria-label={`View ${scheme.name}`}
        >
          <DashboardIcon name="arrow" size={17} />
        </button>
      </div>
    </article>
  );
}

function ServiceCard({ service, onOpen }) {
  return (
    <article className="service-card">
      <span className={`service-icon ${service.tone}`}>{service.icon}</span>
      <div>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
      </div>
      <button onClick={onOpen}>
        Explore <DashboardIcon name="arrow" size={15} />
      </button>
    </article>
  );
}

function ApplicationTracker() {
  const steps = ["Payment", "Agreement", "Reports", "Application", "Approval"];
  return (
    <section className="application-tracker">
      <div className="tracker-header">
        <div>
          <h2>Application tracker</h2>
          <p>Each completed step contributes 20% towards your application.</p>
        </div>
        <strong>0% complete</strong>
      </div>
      <div className="tracker-steps">
        {steps.map((step, index) => (
          <div className="tracker-step" key={step}>
            <span>{index + 1}</span>
            <div>
              <h3>{step}</h3>
              <p>20% credit</p>
            </div>
            {index < steps.length - 1 && <i />}
          </div>
        ))}
      </div>
    </section>
  );
}

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
  return (
    <main className={`client-dashboard ${dark ? "dashboard-dark" : ""}`}>
      <aside className="client-sidebar">
        <div className="client-brand">
          <span className="client-brand-mark">A</span>
          <span>
            Agni<span>CRM</span>
          </span>
        </div>
        <nav aria-label="Client dashboard navigation">
          {navItems.map(([icon, label]) => (
            <button
              key={label}
              className={activeNav === label ? "selected" : ""}
              onClick={() => setActiveNav(label)}
            >
              <DashboardIcon name={icon} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="theme-toggle">
            <span>
              <DashboardIcon name="moon" size={15} /> Dark mode
            </span>
            <button
              className={dark ? "on" : ""}
              onClick={() => setDark(!dark)}
              aria-label="Toggle dark mode"
            >
              <i />
            </button>
          </div>
          <button className="sign-out" onClick={onSignOut}>
            Sign out
          </button>
        </div>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-top">
          <article className="customer-company-card">
            <h1>Acme Industries Pvt. Ltd.</h1>
          </article>
          <div className="top-actions">
            {searchOpen ? (
              <>
                <form
                  id="scheme-search"
                  className="scheme-search"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSubmittedQuery(schemeQuery);
                  }}
                >
                  <input
                    autoFocus
                    value={schemeQuery}
                    onChange={(event) => setSchemeQuery(event.target.value)}
                    placeholder="Search schemes"
                    aria-label="Search schemes"
                  />
                </form>
                <button
                  className="search-submit-button"
                  type="submit"
                  form="scheme-search"
                  aria-label="Run scheme search"
                >
                  <DashboardIcon name="search" size={17} />
                </button>
              </>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search schemes"
              >
                <DashboardIcon name="search" />
              </button>
            )}
            <div className="notification-wrap">
              <button
                className="notification"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="Notifications"
              >
                <DashboardIcon name="bell" />
                <i />
              </button>
              {notificationsOpen && (
                <section
                  className="notifications-popover"
                  aria-label="Notifications"
                >
                  <header>
                    <h2>Notifications</h2>
                    <span>3 new</span>
                  </header>
                  <article>
                    <i className="notice-dot coral" />
                    <div>
                      <strong>Renewal due soon</strong>
                      <p>Family Floater Policy renews in 3 days.</p>
                    </div>
                  </article>
                  <article>
                    <i className="notice-dot violet" />
                    <div>
                      <strong>New scheme added</strong>
                      <p>Corporate Health Shield is now active.</p>
                    </div>
                  </article>
                  <article>
                    <i className="notice-dot green" />
                    <div>
                      <strong>Payment received</strong>
                      <p>Premium payment was received today.</p>
                    </div>
                  </article>
                </section>
              )}
            </div>
            <div className="profile-wrap">
              <button
                className="profile"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="Open profile"
              >
                <span>DS</span>
              </button>
              {profileOpen && (
                <section
                  className="profile-popover"
                  aria-label="Profile options"
                >
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
                    className="logout-option"
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
        {activeNav === "More Services" ? (
          <MoreServicesPage />
        ) : activeNav === "Eligibility" ? (
          <EligibilityPage />
        ) : (
          <div className="dashboard-layout">
            <div className="dashboard-main">
              <section className="scheme-grid" aria-label="Active schemes">
                {matchingSchemes.map((scheme) => (
                  <SchemeCard
                    key={scheme.name}
                    scheme={scheme}
                    onView={setSelectedScheme}
                  />
                ))}
                {matchingSchemes.length === 0 && (
                  <p className="no-schemes">
                    No schemes match “{submittedQuery}”.
                  </p>
                )}
              </section>
              <ApplicationTracker />
              <section className="bottom-grid">
                <article className="family-card">
                  <header>
                    <h2>Document checklist</h2>
                  </header>
                  <div className="document-checklist-inner">
                    <div className="document-section">
                      <h3>Submitted documents</h3>
                      <ul className="document-list">
                        <li>Identity proof</li>
                        <li>Address proof</li>
                      </ul>
                    </div>
                    <div className="document-section">
                      <h3>Pending documents</h3>
                      <ul className="document-list pending">
                        <li>Income proof</li>
                        <li>Bank statement</li>
                      </ul>
                    </div>
                  </div>
                </article>
                <article className="vehicle-card">
                  <header>
                    <h2>Contact person</h2>
                  </header>
                  <p>
                    Name: <b>Kansish</b>
                  </p>
                  <p>
                    Contact number: <b>+91 98765 43210</b>
                  </p>
                </article>
              </section>
            </div>
            <aside className="services-column">
              <h2>More Services</h2>
              {services.map((service) => (
                <ServiceCard
                  key={service.name}
                  service={service}
                  onOpen={() => setActiveNav("More Services")}
                />
              ))}
            </aside>
          </div>
        )}
      </section>
      {selectedScheme && (
        <div
          className="scheme-modal-backdrop"
          role="presentation"
          onMouseDown={() => setSelectedScheme(null)}
        >
          <section
            className="scheme-details-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="scheme-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedScheme(null)}
              aria-label="Close scheme details"
            >
              ×
            </button>
            <span className="scheme-status">
              {selectedScheme.status} scheme
            </span>
            <h2 id="scheme-modal-title">{selectedScheme.name}</h2>
            <p className="modal-description">
              Comprehensive health cover designed for your workforce and their
              families.
            </p>
            <div className="scheme-details-grid">
              <div>
                <span>Current Service</span>
                <strong>{selectedScheme.name}</strong>
              </div>
              <div>
                <span>Active from</span>
                <strong>{selectedScheme.startDate}</strong>
              </div>
            </div>
          </section>
        </div>
      )}
      {changePasswordOpen && (
        <div
          className="scheme-modal-backdrop"
          role="presentation"
          onMouseDown={() => setChangePasswordOpen(false)}
        >
          <section
            className="change-password-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="change-password-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setChangePasswordOpen(false)}
              aria-label="Close change password"
            >
              ×
            </button>
            <h2 id="change-password-title">Change password</h2>
            <p className="modal-description">
              Enter your new password and confirm it below.
            </p>
            <form
              className="change-password-form"
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
              <div className="change-password-grid">
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
              </div>
              {passwordError && <p className="form-error">{passwordError}</p>}
              <button type="submit" className="primary-button">
                Submit
              </button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
