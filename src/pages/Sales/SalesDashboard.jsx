import React from "react";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Icon from "../../components/Icon";
import KpiCard from "../../components/KpiCard";
import SalesRequests from "./SalesRequests";
import EligibleSchemes from "./EligibleSchemes";
import { mockEligibleSchemes } from "./mockEligibleSchemes";

const navItems = [
  { icon: "dashboard", label: "Dashboard" },
  { icon: "clients", label: "Clients" },
  { icon: "overview", label: "Requests" },
  { icon: "reports", label: "Details" },
];

const salesLeads = [
  { id: 1, client: "Bright Retail", contact: "Anil Kumar", status: "Proposal", value: "₹58k", owner: "Mia Ross" },
  { id: 2, client: "Urban Foods", contact: "Riya Sharma", status: "Negotiation", value: "₹46k", owner: "Rohan Varma" },
  { id: 3, client: "Nova Textiles", contact: "Sanjay Patel", status: "Qualified", value: "₹34k", owner: "Noah Kim" },
  { id: 4, client: "Peak Logistics", contact: "Rakesh Mehra", status: "Demo", value: "₹72k", owner: "Tara Singh" },
];

const salesClients = [
  {
    id: 1,
    name: "Bright Retail",
    company: "Bright Retail Pvt Ltd",
    email: "hello@brightretail.com",
    phone: "+91 98765 32100",
    stage: "Active",
    owner: "Mia Ross",
    documentDetails: [
      { label: "PAN Number", value: "ABCDE1234F", available: "Yes" },
      { label: "Aadhar Number", value: "1234 5678 9012", available: "Yes" },
      { label: "GST Number", value: "27ABCDE1234F1Z5", available: "Yes" },
      { label: "KYC Documents", value: "Submitted", available: "Yes" },
    ],
  },
  {
    id: 2,
    name: "Urban Foods",
    company: "Urban Foods Ltd",
    email: "sales@urbanfoods.com",
    phone: "+91 91234 55678",
    stage: "Onboarding",
    owner: "Mia Ross",
    documentDetails: [
      { label: "PAN Number", value: "PQRSX6789K", available: "Yes" },
      { label: "Aadhar Number", value: "2345 6789 0123", available: "Yes" },
      { label: "GST Number", value: "27PQRSX6789K1Z1", available: "Yes" },
      { label: "KYC Documents", value: "Pending", available: "No" },
    ],
  },
  {
    id: 3,
    name: "Nova Textiles",
    company: "Nova Textiles Co",
    email: "contact@novatextiles.com",
    phone: "+91 99876 44556",
    stage: "Renewal",
    owner: "Rohan Varma",
    documentDetails: [
      { label: "PAN Number", value: "LMNOP4321D", available: "Yes" },
      { label: "Aadhar Number", value: "3456 7890 1234", available: "Yes" },
      { label: "GST Number", value: "27LMNOP4321D1Z3", available: "Yes" },
      { label: "KYC Documents", value: "Submitted", available: "Yes" },
    ],
  },
  {
    id: 4,
    name: "Peak Logistics",
    company: "Peak Logistics Pvt Ltd",
    email: "contact@peaklogistics.com",
    phone: "+91 90123 45678",
    stage: "Active",
    owner: "Tara Singh",
    documentDetails: [
      { label: "PAN Number", value: "RSTUV9876P", available: "Yes" },
      { label: "Aadhar Number", value: "4567 8901 2345", available: "No" },
      { label: "GST Number", value: "27RSTUV9876P1Z2", available: "Yes" },
      { label: "KYC Documents", value: "Pending", available: "No" },
    ],
  },
];

const notifications = [
  { title: "New lead assigned", detail: "4 leads were assigned to your queue.", issuer: "CRM", tone: "#9a74e9" },
  { title: "Deal updated", detail: "Urban Foods moved to Negotiation.", issuer: "Sales Ops", tone: "#44bfb0" },
  { title: "Quota alert", detail: "You are 18% ahead of pace.", issuer: "System", tone: "#f2aa38" },
];

const requestActivities = [
  { title: "Request approved", detail: "Client update request approved by management.", time: "2m ago", tone: "#44bfb0" },
  { title: "Request rejected", detail: "Delete request rejected for Nova Textiles.", time: "1h ago", tone: "#f2aa38" },
  { title: "New request", detail: "A new approval request is ready for review.", time: "3h ago", tone: "#9a74e3" },
];

const requestFeed = [
  { id: 1, client: "Nova Textiles", type: "Edit Request", status: "Approved", submitted: "Today" },
  { id: 2, client: "Peak Logistics", type: "Delete Request", status: "Rejected", submitted: "Yesterday" },
  { id: 3, client: "Urban Foods", type: "New Request", status: "Pending", submitted: "Today" },
];

function generateSeries(amount = 12, seed = 1) {
  return Array.from({ length: amount }, (_, index) =>
    Math.round(32000 + seed * 2400 + index * 1450 + Math.sin(index / 2) * 1600)
  );
}

function DashboardChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const quotaData = [62000, 65000, 70000, 72000, 74000, 76000, 78000, 80000, 82000, 84000, 86000, 90000];
  const acquiredData = [52000, 58000, 63000, 68000, 71000, 74000, 76000, 79000, 81000, 83000, 85000, 89000];
  return <SalesQuotaChart months={months} quotaData={quotaData} acquiredData={acquiredData} />;
}

function SalesQuotaChart({ months, quotaData, acquiredData }) {
  const width = 560;
  const height = 260;
  const padding = 44;
  const maxValue = Math.max(...quotaData, ...acquiredData);
  const points = months.map((label, index) => {
    const x = padding + (index * (width - padding * 2)) / Math.max(months.length - 1, 1);
    const quotaY = height - padding - (quotaData[index] / maxValue) * (height - padding * 2);
    const acquiredY = height - padding - (acquiredData[index] / maxValue) * (height - padding * 2);
    return { label, x, quotaY, acquiredY, quota: quotaData[index], acquired: acquiredData[index] };
  });

  const quotaPath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.quotaY}`).join(" ");
  const acquiredPath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.acquiredY}`).join(" ");

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 12, height: 12, background: '#9a74e9', borderRadius: 999 }} /> Quota
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 12, height: 12, background: '#44bfb0', borderRadius: 999 }} /> Acquired
        </span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 280 }} aria-hidden="true">
        <path d={quotaPath} fill="none" stroke="#9a74e9" strokeWidth={3} strokeLinecap="round" />
        <path d={acquiredPath} fill="none" stroke="#44bfb0" strokeWidth={3} strokeLinecap="round" />
        {points.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.quotaY} r={5} fill="#fff" stroke="#9a74e9" strokeWidth={2} />
            <circle cx={point.x} cy={point.acquiredY} r={5} fill="#fff" stroke="#44bfb0" strokeWidth={2} />
          </g>
        ))}
        {points.map((point) => (
          <text key={`${point.label}-label`} x={point.x} y={height - 16} textAnchor="middle" fontSize="11" fill="#6b6b77">
            {point.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

export default function SalesDashboard({ onSignOut, userEmail }) {
  const [activeNav, setActiveNav] = React.useState("Dashboard");
  const [dark, setDark] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const notificationWrapRef = React.useRef(null);
  const notificationsListRef = React.useRef(null);
  const notificationsPauseTimer = React.useRef(null);

  const salesPersonName = React.useMemo(() => {
    if (!userEmail) return "Sales Person";
    const raw = userEmail.split("@")[0];
    const parts = raw.split(/[^a-zA-Z0-9]+/).filter(Boolean);
    return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(" ");
  }, [userEmail]);

  const [clients, setClients] = React.useState(salesClients);
  const [selectedClient, setSelectedClient] = React.useState(null);
  const [newClient, setNewClient] = React.useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    stage: "Active",
  });

  const totalActiveClients = clients.filter((client) => client.stage === "Active").length;
  const totalClosedDeals = salesLeads.filter((lead) => lead.status === "Closed").length;
  const kpiCards = [
    { label: "Active clients", value: `${totalActiveClients}`, trend: "+6%", description: "Currently active", accent: "#4e7cff" },
    { label: "Total closed", value: `${totalClosedDeals}`, trend: "+3%", description: "Closed deals", accent: "#44bfb0" },
    { label: "Quota progress", value: "76%", trend: "+4%", description: "Towards target", accent: "#9a74e9" },
    { label: "New contacts", value: "28", trend: "+22%", description: "Added this week", accent: "#f2aa38" },
  ];

  const handleNewClientChange = (event) => {
    const { name, value } = event.target;
    setNewClient((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClient = (event) => {
    event.preventDefault();
    const nextId = clients.length ? Math.max(...clients.map((client) => client.id)) + 1 : 1;
    setClients((prev) => [
      ...prev,
      { id: nextId, ...newClient },
    ]);
    setNewClient({ name: "", company: "", email: "", phone: "", stage: "Active" });
  };

  React.useEffect(() => {
    function handleOutsideClick(event) {
      if (
        notificationsOpen &&
        notificationWrapRef.current &&
        !notificationWrapRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [notificationsOpen]);

  React.useEffect(() => {
    if (!notificationsOpen) return undefined;
    const list = notificationsListRef.current;
    if (!list) return undefined;

    const intervalId = window.setInterval(() => {
      const maxScroll = list.scrollHeight - list.clientHeight;
      if (maxScroll <= 0) return;
      const nextScrollTop = Math.min(list.scrollTop + 76, maxScroll);
      list.scrollTo({ top: nextScrollTop, behavior: "smooth" });
      if (list.scrollTop >= maxScroll - 2) {
        list.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 2600);

    return () => window.clearInterval(intervalId);
  }, [notificationsOpen]);

  function handleNotificationsListScroll() {
    if (notificationsPauseTimer.current) {
      window.clearTimeout(notificationsPauseTimer.current);
    }
    notificationsPauseTimer.current = window.setTimeout(() => {
      notificationsPauseTimer.current = null;
    }, 3000);
  }

  return (
    <main className={`owner-dashboard sales-dashboard ${dark ? "dashboard-dark" : ""}`}>
      <DashboardSidebar
        navItems={navItems}
        activeNav={activeNav}
        onNavChange={setActiveNav}
        dark={dark}
        onToggleDark={() => setDark((value) => !value)}
        onSignOut={onSignOut}
        IconComponent={Icon}
        brandMark="S"
        navLabel="Sales dashboard navigation"
      />

      <section className="dashboard-content">
        <DashboardHeader
          eyebrow="Sales workspace"
          title={`Hello, ${salesPersonName}`}
          className="sales-dashboard-top"
        >
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
            <div className="notification-wrap" ref={notificationWrapRef}>
              <button
                className="notification"
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="Notifications"
              >
                <Icon name="bell" size={16} />
                <i />
              </button>
              {notificationsOpen && (
                <section className="notifications-popover" aria-label="Notifications">
                  <header>
                    <h2>Notifications</h2>
                    <span>{notifications.length} new</span>
                  </header>
                  <div
                    ref={notificationsListRef}
                    className="notifications-scroll"
                    onScroll={handleNotificationsListScroll}
                  >
                    {notifications.map((notice) => (
                      <article key={notice.title}>
                        <span className={`notice-dot ${notice.tone === '#aa83eb' ? 'violet' : notice.tone === '#88cda4' ? 'green' : 'coral'}`} />
                        <div>
                          <strong>{notice.title}</strong>
                          <p>{notice.detail}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </div>
            <button className="profile" type="button">
              SP
            </button>
            <span className="role-badge">Sales</span>
          </div>
        </DashboardHeader>

        {activeNav === "Dashboard" ? (
          <section>
            <div className="scheme-grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', maxWidth: 940 }}>
              {kpiCards.map((card) => (
                <KpiCard key={card.label} card={card} />
              ))}
            </div>

            <div className="dashboard-layout" style={{ marginTop: 18 }}>
              <div className="dashboard-main">
                <div className="analytics-card" style={{ padding: 20 }}>
                  <div className="panel-header" style={{ marginBottom: 18 }}>
                    <div>
                      <h2>Monthly quota</h2>
                      <p>Quota decided each month vs target acquired.</p>
                    </div>
                  </div>
                  <DashboardChart />
                </div>
              </div>
              <aside className="sidebar-widgets">
                <section className="activity-panel">
                  <div className="panel-header">
                    <div>
                      <p className="eyebrow">Recent activity</p>
                      <h2>What's happening</h2>
                    </div>
                  </div>
                  <div className="activity-list">
                    {requestActivities.map((activity) => (
                      <button
                        key={activity.title}
                        className="activity-row"
                        type="button"
                        onClick={() => setActiveNav("Requests")}
                        style={{ border: 'none', background: 'transparent', width: '100%', textAlign: 'left', padding: 0 }}
                      >
                        <span className="activity-mark" style={{ background: activity.tone }} />
                        <div>
                          <strong>{activity.title}</strong>
                          <small>{activity.detail}</small>
                        </div>
                        <Icon name="arrowUp" size={16} />
                      </button>
                    ))}
                  </div>
                </section>
              </aside>
            </div>
          </section>
        ) : activeNav === "Clients" ? (
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
              <div>
                <p className="eyebrow">Client management</p>
                <h2>Add a new client</h2>
              </div>
              <div style={{ color: '#7a748e', fontSize: 13 }}>{clients.length} clients</div>
            </div>
            <form onSubmit={handleAddClient} style={{ display: 'grid', gap: 18, maxWidth: 760 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                <label className="field-label">
                  Client name
                  <input
                    type="text"
                    name="name"
                    value={newClient.name}
                    onChange={handleNewClientChange}
                    placeholder="Acme Retail"
                    required
                  />
                </label>
                <label className="field-label">
                  Company
                  <input
                    type="text"
                    name="company"
                    value={newClient.company}
                    onChange={handleNewClientChange}
                    placeholder="Acme Retail Pvt. Ltd."
                    required
                  />
                </label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                <label className="field-label">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={newClient.email}
                    onChange={handleNewClientChange}
                    placeholder="email@client.com"
                    required
                  />
                </label>
                <label className="field-label">
                  Phone
                  <input
                    type="tel"
                    name="phone"
                    value={newClient.phone}
                    onChange={handleNewClientChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                </label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                <label className="field-label">
                  Stage
                  <select name="stage" value={newClient.stage} onChange={handleNewClientChange}>
                    <option>Active</option>
                    <option>Onboarding</option>
                    <option>Renewal</option>
                    <option>Prospect</option>
                  </select>
                </label>
                <div />
              </div>
              <button type="submit" className="primary-button" style={{ width: 160, justifySelf: 'start' }}>
                Add client
              </button>
            </form>
          </section>
        ) : activeNav === "Requests" ? (
          <SalesRequests />
        ) : activeNav === "Performance" ? (
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
              <div>
                <p className="eyebrow">Performance overview</p>
                <h2>Sales velocity</h2>
              </div>
            </div>
            <div className="revenue-panel" style={{ display: 'grid', gridTemplateColumns: '1.2fr', gap: 18 }}>
              <div className="revenue-summary" style={{ background: '#fff', padding: 20 }}>
                <div style={{ marginBottom: 20 }}>
                  <h3>Latest revenue plan</h3>
                  <p style={{ margin: 0, color: '#6b6b77' }}>Compare actuals against target over the last 12 months.</p>
                </div>
                <DashboardChart />
              </div>
            </div>
          </section>
        ) : activeNav === "Details" ? (
          <section>
            {!selectedClient ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                  <div>
                    <p className="eyebrow">Client details</p>
                    <h2>Sales-owned clients</h2>
                  </div>
                  <div style={{ color: '#7a748e', fontSize: 13 }}>{clients.length} clients</div>
                </div>
                <table className="clients-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Client</th>
                      <th>Company</th>
                      <th>Email</th>
                      <th>Stage</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => (
                      <tr key={client.id}>
                        <td>{client.id}</td>
                        <td>{client.name}</td>
                        <td>{client.company}</td>
                        <td>{client.email}</td>
                        <td>{client.stage}</td>
                        <td>
                          <button
                            type="button"
                            className="table-action"
                            onClick={() => setSelectedClient(client)}
                          >
                            Info
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <section className="client-details-panel full-page-details">
                <div className="client-details-header">
                  <div>
                    <p className="eyebrow">Client details</p>
                    <h3>{selectedClient.name}</h3>
                    <p>{selectedClient.company}</p>
                  </div>
                  <button type="button" className="table-action" onClick={() => setSelectedClient(null)}>
                    Close
                  </button>
                </div>

                <div className="detail-section-card">
                  <div className="panel-header">
                    <div>
                      <p className="eyebrow">Client profile</p>
                      <h3>Personal Information</h3>
                    </div>
                  </div>
                  <div className="detail-value-grid">
                    <div>
                      <p className="detail-label">Email</p>
                      <strong>{selectedClient.email}</strong>
                    </div>
                    <div>
                      <p className="detail-label">Phone</p>
                      <strong>{selectedClient.phone}</strong>
                    </div>
                  </div>
                </div>

                <div className="detail-section-card">
                  <div className="panel-header">
                    <div>
                      <p className="eyebrow">Client profile</p>
                      <h3>Business Information</h3>
                    </div>
                  </div>
                  <div className="detail-value-grid">
                    <div>
                      <p className="detail-label">Company</p>
                      <strong>{selectedClient.company}</strong>
                    </div>
                    <div>
                      <p className="detail-label">Stage</p>
                      <strong>{selectedClient.stage}</strong>
                    </div>
                  </div>
                </div>

                <div className="detail-section-card">
                  <div className="panel-header">
                    <div>
                      <p className="eyebrow">Documentation</p>
                      <h3>Uploaded Documents</h3>
                    </div>
                  </div>
                  <div className="detail-doc-list">
                    {selectedClient.documentDetails.map((doc) => (
                      <div key={doc.label} className="detail-doc-item">
                        <div className="detail-doc-top">
                          <strong>{doc.label}</strong>
                          <span className={doc.available === 'Yes' ? 'detail-pill success' : 'detail-pill warning'}>
                            {doc.available}
                          </span>
                        </div>
                        <p>{doc.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <EligibleSchemes initialSchemes={mockEligibleSchemes} onSave={() => {
                  // Navigate to Details view and keep this client selected
                  setActiveNav('Details');
                  // ensure selectedClient remains set so the details panel shows
                  setSelectedClient((prev) => prev || selectedClient);
                }} />

                <div className="detail-section-card">
                  <div className="panel-header">
                    <div>
                      <p className="eyebrow">Follow-up</p>
                      <h3>Notes</h3>
                    </div>
                  </div>
                  <div className="detail-note-card">
                    <p>Client documents are reviewed and the recommended schemes will be shared after the salesperson confirms visibility.</p>
                  </div>
                </div>
              </section>
            )}
          </section>
        ) : null}
      </section>
    </main>
  );
}
