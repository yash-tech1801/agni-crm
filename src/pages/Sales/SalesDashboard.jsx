import React from "react";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Icon from "../../components/Icon";
import KpiCard from "../../components/KpiCard";
import SalesRequests from "./SalesRequests";
import SalesInvoices from "./SalesInvoices";
import SalesPayments from "./SalesPayments";
import EligibleSchemes from "./EligibleSchemes";
import { mockEligibleSchemes } from "./mockEligibleSchemes";

const GST_RATE = 0.18; // 18% GST applied only when payment mode is Online

const schemeOptions = mockEligibleSchemes.map((scheme) => scheme.schemeName);

const navItems = [
  { icon: "dashboard", label: "Dashboard" },
  { icon: "clients", label: "Clients" },
  { icon: "overview", label: "Requests" },
  { icon: "invoice", label: "Invoices" },
  { icon: "wallet", label: "Payment" },
  { icon: "reports", label: "Details" },
];

const salesLeads = [
  { id: 1, client: "Bright Retail", contact: "Anil Kumar", status: "Proposal", value: "₹58k", owner: "Mia Ross" },
  { id: 2, client: "Urban Foods", contact: "Riya Sharma", status: "Negotiation", value: "₹46k", owner: "Rohan Varma" },
  { id: 3, client: "Nova Textiles", contact: "Sanjay Patel", status: "Qualified", value: "₹34k", owner: "Noah Kim" },
  { id: 4, client: "Peak Logistics", contact: "Rakesh Mehra", status: "Demo", value: "₹72k", owner: "Tara Singh" },
];

const initialSalesClients = [
  {
    id: 1,
    name: "Bright Retail",
    contactPerson: "Anil Kumar",
    company: "Bright Retail Pvt Ltd",
    email: "hello@brightretail.com",
    phone: "+91 98765 32100",
    address: "101 MG Road, Fort, Mumbai",
    stage: "Active",
    owner: "Mia Ross",
    scheme: schemeOptions[0] || "Enterprise Growth Scheme",
    amount: "50000",
    paymentMode: "Online",
    gstAmount: 9000,
    totalPayment: 59000,
    paymentReceived: "59000",
    paymentPending: 0,
    notes: "Key retail client onboarded for the annual growth scheme. High customer satisfaction.",
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
    contactPerson: "Riya Sharma",
    company: "Urban Foods Ltd",
    email: "sales@urbanfoods.com",
    phone: "+91 91234 55678",
    address: "22 Brigade Road, Indiranagar, Bengaluru",
    stage: "Onboarding",
    owner: "Mia Ross",
    scheme: schemeOptions[1] || "Retail Scale-Up Program",
    amount: "45000",
    paymentMode: "Online",
    gstAmount: 8100,
    totalPayment: 53100,
    paymentReceived: "30000",
    paymentPending: 23100,
    notes: "Initial installment processed. KYC verification documents under review.",
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
    contactPerson: "Sanjay Patel",
    company: "Nova Textiles Co",
    email: "contact@novatextiles.com",
    phone: "+91 99876 44556",
    address: "17 Industrial Park, Ring Road, Surat",
    stage: "Renewal",
    owner: "Rohan Varma",
    scheme: schemeOptions[2] || "Textile Machinery Subsidy",
    amount: "75000",
    paymentMode: "Offline",
    gstAmount: 0,
    totalPayment: 75000,
    paymentReceived: "75000",
    paymentPending: 0,
    notes: "Renewal completed via direct wire transfer. Eligible for upcoming state incentive subsidies.",
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
    contactPerson: "Rakesh Mehra",
    company: "Peak Logistics Pvt Ltd",
    email: "contact@peaklogistics.com",
    phone: "+91 90123 45678",
    address: "38 Freight Lane, GIDC, Ahmedabad",
    stage: "Active",
    owner: "Tara Singh",
    scheme: schemeOptions[3] || "Fleet Modernization Grant",
    amount: "120000",
    paymentMode: "Online",
    gstAmount: 21600,
    totalPayment: 141600,
    paymentReceived: "70800",
    paymentPending: 70800,
    notes: "First milestone payment received. Aadhar update requested for final sign-off.",
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

function DashboardChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const quotaData = [62000, 65000, 70000, 72000, 74000, 76000, 78000, 80000, 82000, 84000, 86000, 90000];
  const acquiredData = [52000, 58000, 63000, 68000, 71000, 74000, 76000, 79000, 81000, 83000, 85000, 89000];
  return <SalesQuotaChart months={months} quotaData={quotaData} acquiredData={acquiredData} />;
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
    const cleaned = raw.replace(/\d+$/, "");
    const parts = cleaned.split(/[^a-zA-Z]+/).filter(Boolean);
    if (!parts.length) return "Sales Person";
    return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(" ");
  }, [userEmail]);

  const [clients, setClients] = React.useState(initialSalesClients);
  const [selectedClient, setSelectedClient] = React.useState(null);
  const [clientSearch, setClientSearch] = React.useState("");
  const [stageFilter, setStageFilter] = React.useState("all");
  const [paymentFilter, setPaymentFilter] = React.useState("all");
  const [toastMessage, setToastMessage] = React.useState("");

  const initialNewClientState = {
    name: "",
    contactPerson: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    stage: "Active",
    scheme: schemeOptions[0] || "Standard Scheme",
    amount: "",
    paymentMode: "Online",
    gstAmount: 0,
    totalPayment: 0,
    paymentReceived: "",
    paymentPending: 0,
    panNumber: "",
    aadharNumber: "",
    gstNumber: "",
    kycStatus: "Submitted",
    notes: "",
  };

  const [newClient, setNewClient] = React.useState(initialNewClientState);

  // Filtered clients list for directory table in Details tab
  const filteredClients = React.useMemo(() => {
    return clients.filter((c) => {
      const q = clientSearch.trim().toLowerCase();
      const matchesSearch =
        !q ||
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.company && c.company.toLowerCase().includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.phone && c.phone.toLowerCase().includes(q)) ||
        (c.scheme && c.scheme.toLowerCase().includes(q));

      const matchesStage = stageFilter === "all" || c.stage === stageFilter;

      let matchesPayment = true;
      const pending = parseFloat(c.paymentPending) || 0;
      const received = parseFloat(c.paymentReceived) || 0;
      if (paymentFilter === "paid") {
        matchesPayment = pending === 0 && received > 0;
      } else if (paymentFilter === "partial") {
        matchesPayment = pending > 0 && received > 0;
      } else if (paymentFilter === "pending") {
        matchesPayment = received === 0;
      }

      return matchesSearch && matchesStage && matchesPayment;
    });
  }, [clients, clientSearch, stageFilter, paymentFilter]);

  const totalActiveClients = clients.filter((client) => client.stage === "Active").length;
  const totalClosedDeals = salesLeads.filter((lead) => lead.status === "Closed").length;

  const kpiCards = [
    { label: "Active clients", value: `${totalActiveClients}`, trend: "+6%", description: "Currently active", accent: "#4e7cff" },
    { label: "Total closed", value: `${totalClosedDeals || 3}`, trend: "+3%", description: "Closed deals", accent: "#44bfb0" },
    { label: "Quota progress", value: "76%", trend: "+4%", description: "Towards target", accent: "#9a74e9" },
    { label: "New contacts", value: "28", trend: "+22%", description: "Added this week", accent: "#f2aa38" },
  ];

  const handleNewClientChange = (event) => {
    const { name, value } = event.target;
    setNewClient((prev) => {
      const next = { ...prev, [name]: value };

      const amountNum = parseFloat(next.amount) || 0;
      const receivedNum = parseFloat(next.paymentReceived) || 0;
      const gstAmount = next.paymentMode === "Online" ? Math.round(amountNum * GST_RATE) : 0;
      const totalPayment = amountNum + gstAmount;
      const paymentPending = Math.max(totalPayment - receivedNum, 0);

      return {
        ...next,
        gstAmount,
        totalPayment,
        paymentPending,
      };
    });
  };

  const handleAddClient = (event) => {
    event.preventDefault();
    const nextId = clients.length ? Math.max(...clients.map((client) => client.id)) + 1 : 1;

    const documentDetails = [
      {
        label: "PAN Number",
        value: newClient.panNumber ? newClient.panNumber.toUpperCase() : "ABCDE1234F",
        available: newClient.panNumber ? "Yes" : "Pending",
      },
      {
        label: "Aadhar Number",
        value: newClient.aadharNumber ? newClient.aadharNumber : "1234 5678 9012",
        available: newClient.aadharNumber ? "Yes" : "Pending",
      },
      {
        label: "GST Number",
        value: newClient.gstNumber ? newClient.gstNumber.toUpperCase() : "27ABCDE1234F1Z5",
        available: newClient.gstNumber ? "Yes" : "Pending",
      },
      {
        label: "KYC Documents",
        value: newClient.kycStatus || "Submitted",
        available: newClient.kycStatus === "Submitted" ? "Yes" : "Pending",
      },
    ];

    const newlyCreatedClient = {
      id: nextId,
      name: newClient.name,
      contactPerson: newClient.contactPerson || newClient.name,
      company: newClient.company,
      email: newClient.email,
      phone: newClient.phone,
      address: newClient.address || "Main Street, Metro City",
      stage: newClient.stage,
      owner: salesPersonName,
      scheme: newClient.scheme,
      amount: newClient.amount || "0",
      paymentMode: newClient.paymentMode,
      gstAmount: newClient.gstAmount,
      totalPayment: newClient.totalPayment,
      paymentReceived: newClient.paymentReceived || "0",
      paymentPending: newClient.paymentPending,
      notes: newClient.notes || "Client profile registered by salesperson.",
      documentDetails,
    };

    setClients((prev) => [newlyCreatedClient, ...prev]);
    setNewClient(initialNewClientState);

    setToastMessage(`✓ Client "${newlyCreatedClient.name}" created successfully! Details can now be viewed in the 'Details' tab.`);
    window.setTimeout(() => setToastMessage(""), 5000);
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
        onNavChange={(nav) => {
          setActiveNav(nav);
        }}
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

        {toastMessage && (
          <div
            style={{
              padding: "14px 20px",
              marginBottom: 18,
              borderRadius: 12,
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "13.5px",
              boxShadow: "0 4px 18px rgba(16, 185, 129, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              animation: "fadeIn 0.25s ease",
            }}
          >
            <span>{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage("")}
              style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontSize: 16 }}
            >
              ✕
            </button>
          </div>
        )}

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
          /* =========================================================
             CLIENTS TAB: ONLY THE REGISTRATION FORM AS REQUESTED
             ========================================================= */
          <section className="sales-clients-form-view" style={{ maxWidth: 860, margin: '0 auto', animation: 'fadeIn 0.3s ease' }}>
            <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <p className="eyebrow" style={{ margin: 0, textTransform: 'uppercase', letterSpacing: 1, fontSize: 11.5, color: '#8c5ff8', fontWeight: 700 }}>Client Registration</p>
                <h1 style={{ margin: '4px 0 2px', fontSize: 24, fontWeight: 800, color: dark ? '#f3effc' : '#1e1932', letterSpacing: '-0.5px' }}>Add New Client</h1>
                <p style={{ margin: 0, color: '#7a748e', fontSize: 13 }}>Fill in client identity, scheme selection, commercial terms, and compliance documents. Submitted details will appear in the <strong>Details</strong> tab.</p>
              </div>
              <button
                type="button"
                className="sales-btn-secondary"
                onClick={() => setActiveNav("Details")}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <Icon name="eye" size={14} />
                <span>Go to Details</span>
              </button>
            </div>

            <div className="sales-table-card" style={{ padding: 24 }}>
              <form onSubmit={handleAddClient} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Section 1: Business Identity */}
                <div className="sales-form-section">
                  <div className="sales-section-title">
                    <Icon name="building" size={16} />
                    <span>1. Business & Contact Information</span>
                  </div>
                  <div className="sales-form-grid-2">
                    <label className="field-label">
                      Client / Trading Name
                      <input
                        type="text"
                        name="name"
                        value={newClient.name}
                        onChange={handleNewClientChange}
                        placeholder="e.g. Apex Retail"
                        required
                      />
                    </label>
                    <label className="field-label">
                      Contact Person Name
                      <input
                        type="text"
                        name="contactPerson"
                        value={newClient.contactPerson}
                        onChange={handleNewClientChange}
                        placeholder="e.g. Rahul Sharma"
                        required
                      />
                    </label>
                  </div>
                  <div className="sales-form-grid-2" style={{ marginTop: 14 }}>
                    <label className="field-label">
                      Registered Company Name
                      <input
                        type="text"
                        name="company"
                        value={newClient.company}
                        onChange={handleNewClientChange}
                        placeholder="e.g. Apex Retail Pvt. Ltd."
                        required
                      />
                    </label>
                    <label className="field-label">
                      Registered Office / Location
                      <input
                        type="text"
                        name="address"
                        value={newClient.address}
                        onChange={handleNewClientChange}
                        placeholder="e.g. 101 MG Road, Mumbai"
                      />
                    </label>
                  </div>
                  <div className="sales-form-grid-2" style={{ marginTop: 14 }}>
                    <label className="field-label">
                      Official Email Address
                      <input
                        type="email"
                        name="email"
                        value={newClient.email}
                        onChange={handleNewClientChange}
                        placeholder="client@apexretail.com"
                        required
                      />
                    </label>
                    <label className="field-label">
                      Phone Number
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
                </div>

                {/* Section 2: Engagement & Scheme */}
                <div className="sales-form-section">
                  <div className="sales-section-title">
                    <Icon name="document" size={16} />
                    <span>2. Scheme & Engagement Tier</span>
                  </div>
                  <div className="sales-form-grid-2">
                    <label className="field-label">
                      Lifecycle Stage
                      <select name="stage" value={newClient.stage} onChange={handleNewClientChange}>
                        <option value="Active">Active</option>
                        <option value="Onboarding">Onboarding</option>
                        <option value="Renewal">Renewal</option>
                        <option value="Prospect">Prospect</option>
                      </select>
                    </label>
                    <label className="field-label">
                      Selected Scheme
                      <select name="scheme" value={newClient.scheme} onChange={handleNewClientChange} required>
                        {schemeOptions.map((scheme) => (
                          <option key={scheme} value={scheme}>{scheme}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>

                {/* Section 3: Commercials & Billing */}
                <div className="sales-form-section">
                  <div className="sales-section-title">
                    <Icon name="currency" size={16} />
                    <span>3. Commercials & Payment Setup</span>
                  </div>
                  <div className="sales-form-grid-3">
                    <label className="field-label">
                      Base Contract Amount (₹)
                      <input
                        type="number"
                        name="amount"
                        value={newClient.amount}
                        onChange={handleNewClientChange}
                        placeholder="50000"
                        min="0"
                        required
                      />
                    </label>
                    <label className="field-label">
                      Mode of Payment
                      <select name="paymentMode" value={newClient.paymentMode} onChange={handleNewClientChange}>
                        <option value="Online">Online (18% GST Added)</option>
                        <option value="Offline">Offline (Direct/Exempt)</option>
                      </select>
                    </label>
                    <label className="field-label">
                      Payment Received (₹)
                      <input
                        type="number"
                        name="paymentReceived"
                        value={newClient.paymentReceived}
                        onChange={handleNewClientChange}
                        placeholder="0"
                        min="0"
                      />
                    </label>
                  </div>

                  {/* Live Calculation Summary Box */}
                  <div className="sales-live-calc-box">
                    <div className="sales-live-calc-item">
                      <span>Base Amount</span>
                      <strong>₹{(parseFloat(newClient.amount) || 0).toLocaleString("en-IN")}</strong>
                    </div>
                    <div className="sales-live-calc-item">
                      <span>GST ({newClient.paymentMode === "Online" ? "18%" : "0%"})</span>
                      <strong style={{ color: newClient.paymentMode === "Online" ? "#6d3bf5" : "#7a748e" }}>
                        ₹{newClient.gstAmount.toLocaleString("en-IN")}
                      </strong>
                    </div>
                    <div className="sales-live-calc-item">
                      <span>Total Payable</span>
                      <strong style={{ color: "#10b981" }}>₹{newClient.totalPayment.toLocaleString("en-IN")}</strong>
                    </div>
                    <div className="sales-live-calc-item">
                      <span>Pending Balance</span>
                      <strong style={{ color: newClient.paymentPending > 0 ? "#e11d48" : "#059669" }}>
                        ₹{newClient.paymentPending.toLocaleString("en-IN")}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Section 4: Compliance & KYC Documents */}
                <div className="sales-form-section">
                  <div className="sales-section-title">
                    <Icon name="roles" size={16} />
                    <span>4. Compliance & Verification Numbers</span>
                  </div>
                  <div className="sales-form-grid-3">
                    <label className="field-label">
                      PAN Number
                      <input
                        type="text"
                        name="panNumber"
                        value={newClient.panNumber}
                        onChange={handleNewClientChange}
                        placeholder="ABCDE1234F"
                        maxLength={10}
                      />
                    </label>
                    <label className="field-label">
                      Aadhar Number
                      <input
                        type="text"
                        name="aadharNumber"
                        value={newClient.aadharNumber}
                        onChange={handleNewClientChange}
                        placeholder="1234 5678 9012"
                      />
                    </label>
                    <label className="field-label">
                      GST Number
                      <input
                        type="text"
                        name="gstNumber"
                        value={newClient.gstNumber}
                        onChange={handleNewClientChange}
                        placeholder="27ABCDE1234F1Z5"
                      />
                    </label>
                  </div>
                  <div className="sales-form-grid-2" style={{ marginTop: 14 }}>
                    <label className="field-label">
                      KYC Documentation Status
                      <select name="kycStatus" value={newClient.kycStatus} onChange={handleNewClientChange}>
                        <option value="Submitted">Submitted / Verified</option>
                        <option value="Pending">Pending Documents</option>
                        <option value="In Review">Under Review</option>
                      </select>
                    </label>
                    <label className="field-label">
                      Internal Account Notes
                      <input
                        type="text"
                        name="notes"
                        value={newClient.notes}
                        onChange={handleNewClientChange}
                        placeholder="Special client remarks or contract terms..."
                      />
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                  <button
                    type="button"
                    className="sales-btn-secondary"
                    onClick={() => setNewClient(initialNewClientState)}
                  >
                    Clear Form
                  </button>
                  <button type="submit" className="sales-add-btn" style={{ padding: '12px 28px', fontSize: 14 }}>
                    <span>+ Add Client</span>
                  </button>
                </div>
              </form>
            </div>
          </section>
        ) : activeNav === "Requests" ? (
          <SalesRequests />
        ) : activeNav === "Invoices" ? (
          <SalesInvoices />
        ) : activeNav === "Payment" ? (
          <SalesPayments />
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
          /* =========================================================
             DETAILS TAB: CLIENT DIRECTORY & FULL CLIENT DOSSIER VIEW
             ========================================================= */
          <section>
            {!selectedClient ? (
              <div className="sales-clients-view">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 4, flexWrap: 'wrap' }}>
                  <div>
                    <p className="eyebrow" style={{ margin: 0, textTransform: 'uppercase', letterSpacing: 1, fontSize: 11.5, color: '#8c5ff8', fontWeight: 700 }}>Client Dossier</p>
                    <h2 style={{ margin: '4px 0 2px', fontSize: 24, fontWeight: 800, color: dark ? '#f3effc' : '#1e1932' }}>Sales Client Directory</h2>
                    <p style={{ margin: 0, color: '#7a748e', fontSize: 13 }}>Click the <strong>View</strong> button on any client to view their complete profile, financials, and submitted documents.</p>
                  </div>
                  <button
                    type="button"
                    className="sales-add-btn"
                    onClick={() => setActiveNav("Clients")}
                  >
                    <Icon name="plus" size={16} />
                    <span>Create New Client</span>
                  </button>
                </div>

                {/* Filter Toolbar */}
                <div className="sales-toolbar" style={{ marginTop: 12 }}>
                  <div className="sales-toolbar-filters">
                    <div className="sales-search-box">
                      <span className="sales-search-icon">
                        <Icon name="search" size={15} />
                      </span>
                      <input
                        type="text"
                        value={clientSearch}
                        onChange={(e) => setClientSearch(e.target.value)}
                        placeholder="Search by client, company, email, or scheme..."
                      />
                    </div>

                    <select
                      className="sales-filter-select"
                      value={stageFilter}
                      onChange={(e) => setStageFilter(e.target.value)}
                    >
                      <option value="all">All Stages</option>
                      <option value="Active">Active</option>
                      <option value="Onboarding">Onboarding</option>
                      <option value="Renewal">Renewal</option>
                      <option value="Prospect">Prospect</option>
                    </select>

                    <select
                      className="sales-filter-select"
                      value={paymentFilter}
                      onChange={(e) => setPaymentFilter(e.target.value)}
                    >
                      <option value="all">All Payment Status</option>
                      <option value="paid">Fully Paid</option>
                      <option value="partial">Partially Paid</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>

                  <div style={{ color: '#7a748e', fontSize: 13, fontWeight: 500 }}>
                    Showing <strong>{filteredClients.length}</strong> of {clients.length} clients
                  </div>
                </div>

                {/* Directory Table */}
                <div className="sales-table-card" style={{ marginTop: 14 }}>
                  <table className="sales-clients-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Client & Company</th>
                        <th>Contact</th>
                        <th>Scheme</th>
                        <th>Total Value</th>
                        <th>Payment Status</th>
                        <th>Stage</th>
                        <th style={{ textAlign: 'right' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredClients.map((client) => {
                        const total = parseFloat(client.totalPayment) || 0;
                        const received = parseFloat(client.paymentReceived) || 0;
                        const pending = parseFloat(client.paymentPending) || 0;
                        const pct = total > 0 ? Math.min(Math.round((received / total) * 100), 100) : 0;
                        const isPaid = pending === 0 && received > 0;
                        const isPartial = pending > 0 && received > 0;

                        return (
                          <tr key={client.id}>
                            <td><strong>#{client.id}</strong></td>
                            <td>
                              <div className="client-avatar-cell">
                                <div className="client-avatar">
                                  {client.name ? client.name.slice(0, 2).toUpperCase() : "CL"}
                                </div>
                                <div>
                                  <div className="client-name-title">{client.name}</div>
                                  <div className="client-company-sub">{client.company}</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="contact-cell">
                                <span>{client.email}</span>
                                <span className="contact-phone">{client.phone}</span>
                              </div>
                            </td>
                            <td>
                              <span className="scheme-tag">
                                {client.scheme || "Standard"}
                              </span>
                            </td>
                            <td>
                              <strong>₹{total.toLocaleString("en-IN")}</strong>
                            </td>
                            <td>
                              <div className="payment-progress-cell">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <span className={`payment-pill ${isPaid ? 'paid' : isPartial ? 'partial' : 'pending'}`}>
                                    {isPaid ? "✓ Paid" : isPartial ? `₹${pending.toLocaleString("en-IN")} pending` : "Unpaid"}
                                  </span>
                                </div>
                                <div className="payment-mini-bar">
                                  <div
                                    className={`payment-mini-fill ${isPaid ? 'paid' : isPartial ? 'partial' : 'pending'}`}
                                    style={{ width: `${isPaid ? 100 : pct}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td>
                              <span
                                className={`stage-tag ${
                                  client.stage === "Active"
                                    ? "active"
                                    : client.stage === "Onboarding"
                                    ? "onboarding"
                                    : client.stage === "Renewal"
                                    ? "renewal"
                                    : "prospect"
                                }`}
                              >
                                {client.stage}
                              </span>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <button
                                type="button"
                                className="sales-view-btn"
                                onClick={() => setSelectedClient(client)}
                              >
                                <Icon name="eye" size={14} />
                                <span>View</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* =========================================================
                 SELECTED CLIENT FULL DOSSIER WITH ALL FILLED DETAILS
                 ========================================================= */
              <div className="client-details-dossier">
                {/* Navigation Bar */}
                <div className="dossier-nav-bar">
                  <button
                    type="button"
                    className="dossier-back-btn"
                    onClick={() => setSelectedClient(null)}
                  >
                    <span>←</span>
                    <span>Back to Client Directory</span>
                  </button>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button
                      type="button"
                      className="sales-btn-secondary"
                      onClick={() => setSelectedClient(null)}
                    >
                      Close Dossier
                    </button>
                  </div>
                </div>

                {/* Hero Client Banner */}
                <div className="client-hero-banner">
                  <div className="client-hero-left">
                    <div className="client-hero-avatar">
                      {selectedClient.name ? selectedClient.name.slice(0, 2).toUpperCase() : "CL"}
                    </div>
                    <div className="client-hero-title">
                      <h2>{selectedClient.name}</h2>
                      <p className="client-hero-sub">{selectedClient.company}</p>
                      <div className="client-hero-meta-pills">
                        <span
                          className={`hero-pill ${
                            selectedClient.stage === "Active"
                              ? "active"
                              : selectedClient.stage === "Onboarding"
                              ? "onboarding"
                              : selectedClient.stage === "Renewal"
                              ? "renewal"
                              : "prospect"
                          }`}
                        >
                          ● {selectedClient.stage}
                        </span>
                        <span className="hero-pill">
                          Client ID: #{selectedClient.id}
                        </span>
                        <span className="hero-pill">
                          Owner: {selectedClient.owner || salesPersonName}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="client-hero-right">
                    <span className="hero-balance-label">Total Commercial Value</span>
                    <span className="hero-balance-val">
                      ₹{(parseFloat(selectedClient.totalPayment) || 0).toLocaleString("en-IN")}
                    </span>
                    <span style={{ fontSize: 12, color: '#beb5d6' }}>
                      {parseFloat(selectedClient.paymentPending) > 0
                        ? `₹${(parseFloat(selectedClient.paymentPending) || 0).toLocaleString("en-IN")} pending collection`
                        : "✓ Fully Paid"}
                    </span>
                  </div>
                </div>

                {/* Comprehensive Financial Breakdown */}
                <div className="dossier-finance-card">
                  <div className="dossier-card-title">
                    <span>Financial & Commercial Breakdown</span>
                    <span className="scheme-tag" style={{ fontSize: 13, padding: '6px 12px' }}>
                      <Icon name="document" size={14} />
                      {selectedClient.scheme || "Standard Scheme"}
                    </span>
                  </div>

                  <div className="finance-metrics-grid">
                    <div className="finance-metric-box">
                      <span className="finance-metric-label">Base Contract Value</span>
                      <span className="finance-metric-num">₹{(parseFloat(selectedClient.amount) || 0).toLocaleString("en-IN")}</span>
                      <span className="finance-metric-sub">Base service rate</span>
                    </div>

                    <div className="finance-metric-box">
                      <span className="finance-metric-label">Payment Mode</span>
                      <span className="finance-metric-num" style={{ fontSize: 17, color: '#6d3bf5' }}>
                        {selectedClient.paymentMode || "Online"}
                      </span>
                      <span className="finance-metric-sub">
                        {selectedClient.paymentMode === "Online" ? "18% GST Applicable" : "Exempt / Direct"}
                      </span>
                    </div>

                    <div className="finance-metric-box">
                      <span className="finance-metric-label">GST (18%)</span>
                      <span className="finance-metric-num">₹{(parseFloat(selectedClient.gstAmount) || 0).toLocaleString("en-IN")}</span>
                      <span className="finance-metric-sub">Tax component</span>
                    </div>

                    <div className="finance-metric-box highlight">
                      <span className="finance-metric-label">Total Commercial Value</span>
                      <span className="finance-metric-num" style={{ color: '#6d3bf5' }}>
                        ₹{(parseFloat(selectedClient.totalPayment) || 0).toLocaleString("en-IN")}
                      </span>
                      <span className="finance-metric-sub">Base + GST Total</span>
                    </div>
                  </div>

                  {/* Settlement Progress */}
                  <div className="settlement-bar-wrap">
                    <div className="settlement-header">
                      <span>
                        Payment Collected: <strong>₹{(parseFloat(selectedClient.paymentReceived) || 0).toLocaleString("en-IN")}</strong>
                      </span>
                      <span style={{ color: parseFloat(selectedClient.paymentPending) > 0 ? '#e11d48' : '#059669' }}>
                        Pending Balance: <strong>₹{(parseFloat(selectedClient.paymentPending) || 0).toLocaleString("en-IN")}</strong>
                      </span>
                    </div>
                    <div className="settlement-bar-track">
                      <div
                        className="settlement-bar-fill"
                        style={{
                          width: `${
                            parseFloat(selectedClient.totalPayment) > 0
                              ? Math.min(
                                  Math.round(
                                    ((parseFloat(selectedClient.paymentReceived) || 0) /
                                      parseFloat(selectedClient.totalPayment)) *
                                      100
                                  ),
                                  100
                                )
                              : 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Two-Column Grid: Contact Profile & Compliance Documents */}
                <div className="dossier-columns-grid">
                  {/* Left Card: Contact & Corporate Profile */}
                  <div className="dossier-info-card">
                    <div className="dossier-card-title">
                      <span>Contact & Company Information</span>
                      <Icon name="user" size={18} />
                    </div>

                    <div className="dossier-info-rows">
                      <div className="dossier-field-item">
                        <label>Client Name</label>
                        <strong>{selectedClient.name}</strong>
                      </div>

                      <div className="dossier-field-item">
                        <label>Contact Person</label>
                        <strong>{selectedClient.contactPerson || selectedClient.name}</strong>
                      </div>

                      <div className="dossier-field-item">
                        <label>Email Address</label>
                        <strong>
                          <a href={`mailto:${selectedClient.email}`} className="dossier-link">
                            {selectedClient.email}
                          </a>
                        </strong>
                      </div>

                      <div className="dossier-field-item">
                        <label>Phone Number</label>
                        <strong>
                          <a href={`tel:${selectedClient.phone}`} className="dossier-link">
                            {selectedClient.phone}
                          </a>
                        </strong>
                      </div>

                      <div className="dossier-field-item full-width">
                        <label>Registered Company</label>
                        <strong>{selectedClient.company}</strong>
                      </div>

                      <div className="dossier-field-item full-width">
                        <label>Registered Address</label>
                        <strong>{selectedClient.address || "101 Commercial Hub, Metro City"}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Right Card: Documentation & Compliance Details */}
                  <div className="dossier-info-card">
                    <div className="dossier-card-title">
                      <span>Compliance & Verified Documents</span>
                      <Icon name="roles" size={18} />
                    </div>

                    <div className="dossier-docs-list">
                      {(selectedClient.documentDetails || []).map((doc) => (
                        <div key={doc.label} className="dossier-doc-tile">
                          <div className="dossier-doc-tile-top">
                            <strong>{doc.label}</strong>
                            <span className={`doc-status-badge ${doc.available === 'Yes' ? 'yes' : 'pending'}`}>
                              {doc.available === 'Yes' ? '✓ Verified' : 'Pending'}
                            </span>
                          </div>
                          <span className="dossier-doc-val">{doc.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Eligible Schemes Section */}
                <EligibleSchemes
                  initialSchemes={mockEligibleSchemes}
                  onSave={() => {
                    setActiveNav('Details');
                    setSelectedClient((prev) => prev || selectedClient);
                  }}
                />

                {/* Internal Notes Card */}
                <div className="dossier-info-card">
                  <div className="dossier-card-title">
                    <span>Account Notes & Remarks</span>
                    <Icon name="invoice" size={18} />
                  </div>
                  <div className="dossier-notes-box">
                    <p style={{ margin: 0 }}>
                      {selectedClient.notes || "Client documents are reviewed and the recommended schemes will be shared after the salesperson confirms visibility."}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        ) : null}
      </section>
    </main>
  );
}
