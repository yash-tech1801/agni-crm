import React from "react";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
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
  {
    label: "Total Clients",
    value: "248",
    trend: "+18%",
    description: "New this month",
    accent: "#9a74e9",
    linkTo: "Clients",
    slug: "clients",
  },
  {
    label: "Total Managers",
    value: "42",
    trend: "+8%",
    description: "Team expansion",
    accent: "#4e7cff",
    linkTo: "Employees",
    employeeRole: "manager",
    slug: "managers",
  },
  {
    label: "Sales Persons",
    value: "124",
    trend: "+12%",
    description: "Active sellers",
    accent: "#44bfb0",
    linkTo: "Employees",
    employeeRole: "sales",
    slug: "sales",
  },
  {
    label: "Monthly Revenue",
    value: "₹278.8k",
    trend: "+22%",
    description: "Compared to last month",
    accent: "#f2aa38",
    linkTo: "Revenue",
    slug: "revenue",
  },
  {
    label: "Total Branch Managers",
    value: "7",
    trend: "+5%",
    description: "Branch Performance",
    accent: "#4e7cff",
    slug: "branch-managers",
  },
  {
    label: "Conversion Rate",
    value: "74%",
    trend: "+9%",
    description: "Qualified leads",
    accent: "#6d60fa",
    slug: "conversion",
  },
];

const topPerformers = [
  { name: "Ariana Lee", role: "Branch Manager", score: "92%", detail: "Client growth +14%" },
  { name: "Priya Menon", role: "Branch Manager", score: "90%", detail: "Pipeline expansion" },
  { name: "Daniel Cruz", role: "Branch Manager", score: "88%", detail: "Customer retention" },
  { name: "Sara Reddy", role: "Branch Manager", score: "85%", detail: "Process improvements" },
  { name: "Kavya Patel", role: "Branch Manager", score: "82%", detail: "Team mentoring" },
  { name: "Mia Ross", role: "Sales Person", score: "89%", detail: "Lead conversion" },
  { name: "Noah Kim", role: "Sales Person", score: "87%", detail: "Revenue uplift" },
  { name: "Rohan Varma", role: "Sales Person", score: "84%", detail: "New accounts" },
  { name: "Meera Singh", role: "Sales Person", score: "80%", detail: "Deal closure" },
  { name: "Sonal Desai", role: "Sales Person", score: "78%", detail: "Cross-sell growth" },
  { name: "Eli Brooks", role: "Manager", score: "86%", detail: "Process efficiency" },
  { name: "Naveen Sharma", role: "Manager", score: "84%", detail: "Team coordination" },
  { name: "Ananya Gupta", role: "Manager", score: "82%", detail: "Budget control" },
  { name: "Rhea Kapoor", role: "Manager", score: "80%", detail: "Strategy execution" },
  { name: "Vikram Joshi", role: "Manager", score: "78%", detail: "Operational review" },
  { name: "Noah Kim", role: "IT", score: "83%", detail: "Revenue uplift" },
  { name: "Tara Singh", role: "IT", score: "81%", detail: "System automation" },
  { name: "Arjun Das", role: "IT", score: "79%", detail: "Support delivery" },
  { name: "Janet Paul", role: "IT", score: "76%", detail: "Infrastructure uptime" },
  { name: "Lina Abraham", role: "IT", score: "74%", detail: "App stability" },
  { name: "Sara Kim", role: "Admin", score: "79%", detail: "Operations stability" },
  { name: "Nisha Rao", role: "Admin", score: "77%", detail: "Policy compliance" },
  { name: "Isha Nair", role: "Admin", score: "75%", detail: "Resource planning" },
  { name: "Deepak Shah", role: "Admin", score: "72%", detail: "Team support" },
  { name: "Milan Das", role: "Admin", score: "70%", detail: "Documentation" },
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

function RevenueTrendChart({ data }) {
  const width = 320;
  const height = 180;
  const padding = 24;
  const values = data.map((item) => item.value);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = maxValue - minValue || 1;

  const points = data.map((item, index) => {
    const x = padding + (index * (width - padding * 2)) / Math.max(data.length - 1, 1);
    const y = height - padding - ((item.value - minValue) / range) * (height - padding * 2);
    return { x, y, label: item.label };
  });

  const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="dashboard-chart" aria-hidden="true">
      <path d={areaPath} fill="rgba(154, 116, 233, 0.16)" />
      <path d={linePath} fill="none" stroke="#9a74e9" strokeWidth="3" strokeLinecap="round" />
      {points.map((point) => (
        <g key={point.label}>
          <circle cx={point.x} cy={point.y} r="4.5" fill="#fff" stroke="#9a74e9" strokeWidth="2" />
          <text x={point.x} y={height - 6} textAnchor="middle" fill="#7d79a8" fontSize="11">
            {point.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function OwnerDashboard({ onSignOut, userEmail }) {
  const [activeNav, setActiveNav] = React.useState("Dashboard");
  const [dark, setDark] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [notificationsAutoScrollPaused, setNotificationsAutoScrollPaused] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const notificationWrapRef = React.useRef(null);
  const notificationsListRef = React.useRef(null);
  const notificationsPauseTimer = React.useRef(null);

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
      if (notificationsAutoScrollPaused || !list) return;
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
  }, [notificationsOpen, notificationsAutoScrollPaused]);

  React.useEffect(() => {
    return () => {
      if (notificationsPauseTimer.current) {
        window.clearTimeout(notificationsPauseTimer.current);
      }
    };
  }, []);

  function handleNotificationsListScroll() {
    if (notificationsPauseTimer.current) {
      window.clearTimeout(notificationsPauseTimer.current);
    }

    setNotificationsAutoScrollPaused(true);
    notificationsPauseTimer.current = window.setTimeout(() => {
      setNotificationsAutoScrollPaused(false);
      notificationsPauseTimer.current = null;
    }, 3000);
  }

  const services = [
    { name: "Certificate" },
    { name: "IT" },
    { name: "Marketing" },
  ];
  const [clients, setClients] = React.useState([
    { id: 1, name: 'Acme Industries', company: 'Acme Industries Pvt. Ltd.', email: 'contact@acme.com', phone: '+91 98765 43210', serviceType: 'Certificate', serviceName: 'Mudra', serviceStart: '2026-01-15', totalPayment: 120000, paymentReceived: 80000 },
    { id: 2, name: 'Summit Co', company: 'Summit Co.', email: 'hello@summitco.com', phone: '+91 91234 56789', serviceType: 'IT', serviceName: 'CRM', serviceStart: '2026-03-01', totalPayment: 85000, paymentReceived: 50000 },
    { id: 3, name: 'Blue Retail', company: 'Blue Retail Pvt Ltd', email: 'info@blueretail.com', phone: '+91 99876 54321', serviceType: 'Marketing', serviceName: 'Website', serviceStart: '2026-05-20', totalPayment: 60000, paymentReceived: 60000 },
  ]);
  const [serviceFilter, setServiceFilter] = React.useState("");
  const [revenueRange, setRevenueRange] = React.useState("monthly");
  const [employeesList, setEmployeesList] = React.useState([
    { id: 1, name: 'Ariana Lee', email: 'ariana@agni.com', phone: '+91 91234 00111', role: 'branch manager', branch: 'North', reportingManager: 'Devika Shah' },
    { id: 2, name: 'Eli Brooks', email: 'eli@agni.com', phone: '+91 91234 00222', role: 'manager', branch: 'South', branchManager: 'Ariana Lee' },
    { id: 3, name: 'Mia Ross', email: 'mia@agni.com', phone: '+91 91234 10101', role: 'sales', branch: 'East', branchManager: 'Ariana Lee', reportingManager: 'Eli Brooks' },
    { id: 4, name: 'Noah Kim', email: 'noah@agni.com', phone: '+91 91234 10202', role: 'IT', branch: 'West', branchManager: 'Ariana Lee' },
    { id: 5, name: 'Sara Kim', email: 'sara@agni.com', phone: '+91 91234 20202', role: 'admin', branch: 'North', branchManager: 'Ariana Lee' },
    { id: 6, name: 'Daniel Cruz', email: 'daniel@agni.com', phone: '+91 91234 30303', role: 'market', branch: 'South', branchManager: 'Eli Brooks' },
    { id: 7, name: 'Priya Menon', email: 'priya@agni.com', phone: '+91 91234 40404', role: 'hr', branch: 'East', branchManager: 'Ariana Lee', reportingManager: 'Eli Brooks' },
  ]);
  const [selectedRole, setSelectedRole] = React.useState('All roles');
  const [selectedBranch, setSelectedBranch] = React.useState('');
  const [selectedEmployee, setSelectedEmployee] = React.useState(null);
  const [selectedEmployeeInfo, setSelectedEmployeeInfo] = React.useState(null);
  const [editModal, setEditModal] = React.useState(null);
  const [confirmModal, setConfirmModal] = React.useState(null);
  const [showLeaderboard, setShowLeaderboard] = React.useState(false);
  const [reportRoleFilter, setReportRoleFilter] = React.useState('');
  const [reportBranchFilter, setReportBranchFilter] = React.useState('');

  const reportRoleOptions = [
    { label: 'All roles', value: '' },
    { label: 'Branch Manager', value: 'branch manager' },
    { label: 'Manager', value: 'manager' },
    { label: 'Admin', value: 'admin' },
    { label: 'Sales Person', value: 'sales' },
    { label: 'It', value: 'IT' },
    { label: 'Marketing', value: 'market' },
  ];

  const branchOptions = [
    { label: 'All branches', value: '' },
    { label: 'North', value: 'North' },
    { label: 'South', value: 'South' },
    { label: 'East', value: 'East' },
    { label: 'West', value: 'West' },
  ];
  const employeeRoles = ['All roles', 'branch manager', 'manager', 'IT', 'admin', 'market', 'sales', 'hr'];
  // Pagination state
  const PAGE_SIZE = 15;
  const [clientsPage, setClientsPage] = React.useState(1);
  const [employeesPage, setEmployeesPage] = React.useState(1);

  const [selectedClient, setSelectedClient] = React.useState(null);

  const filteredClients = clients.filter(c => !serviceFilter || c.serviceType === serviceFilter);
  const clientsTotalPages = Math.max(1, Math.ceil(filteredClients.length / PAGE_SIZE));
  const clientsPageItems = filteredClients.slice((clientsPage - 1) * PAGE_SIZE, clientsPage * PAGE_SIZE);

  const filteredEmployees = employeesList.filter((employee) => {
    const roleOk = (selectedRole === 'All roles' || !selectedRole) || (employee.role || '').toLowerCase() === (selectedRole || '').toLowerCase();
    const branchOk = !selectedBranch || (employee.branch || '') === selectedBranch;
    return roleOk && branchOk;
  });
  const employeesTotalPages = Math.max(1, Math.ceil(filteredEmployees.length / PAGE_SIZE));
  const employeesPageItems = filteredEmployees.slice((employeesPage - 1) * PAGE_SIZE, employeesPage * PAGE_SIZE);

  function openPerformance(employee) {
    const series = generateYearlySeries(employee);
    const lastMonth = series[10];
    const thisMonth = series[11];
    setSelectedEmployee({ ...employee, lastMonth, thisMonth, series });
  }

  function openEmployeeInfo(employee) {
    setSelectedEmployeeInfo(employee);
  }

  function closeEmployeeInfo() {
    setSelectedEmployeeInfo(null);
  }

  function generateYearlySeries(employee) {
    const base = 50000 + employee.id * 2000;
    const series = [];
    for (let i = 0; i < 12; i++) {
      const seasonal = 0.72 + i * 0.02; // gentle upward trend across months
      const seed = ((employee.id * 7 + i * 3) % 11) * 0.01; // deterministic small variance
      const v = Math.round(base * (seasonal + seed));
      series.push(v);
    }
    return series;
  }

  function closePerformance() {
    setSelectedEmployee(null);
  }

  function openEditClient(client) {
    setEditModal({
      type: 'client',
      item: client,
      values: {
        name: client.name,
        company: client.company,
        email: client.email,
        phone: client.phone,
        serviceType: client.serviceType,
        serviceName: client.serviceName,
      },
    });
  }

  function openClientInfo(client) {
    setSelectedClient(client);
  }

  function closeClientInfo() {
    setSelectedClient(null);
  }

  function openEditEmployee(employee) {
    setEditModal({
      type: 'employee',
      item: employee,
      values: {
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        role: employee.role,
      },
    });
  }

  function closeEditModal() {
    setEditModal(null);
  }

  function handleEditChange(event) {
    const { name, value } = event.target;
    setEditModal((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value,
      },
    }));
  }

  function saveEditItem() {
    if (!editModal) return;

    if (editModal.type === 'client') {
      setClients((prev) => prev.map((item) =>
        item.id === editModal.item.id ? { ...item, ...editModal.values } : item
      ));
    } else if (editModal.type === 'employee') {
      setEmployeesList((prev) => prev.map((item) =>
        item.id === editModal.item.id ? { ...item, ...editModal.values } : item
      ));
    }
    setEditModal(null);
  }

  function openDeleteConfirm(type, item) {
    setConfirmModal({
      type,
      item,
      message: `Delete ${item.name} permanently?`,
    });
  }

  function closeConfirmModal() {
    setConfirmModal(null);
  }

  function confirmDelete() {
    if (!confirmModal) return;

    if (confirmModal.type === 'client') {
      setClients((prev) => {
        const next = prev.filter((item) => item.id !== confirmModal.item.id);
        const nextFiltered = next.filter((c) => !serviceFilter || c.serviceType === serviceFilter);
        const nextPages = Math.max(1, Math.ceil(nextFiltered.length / PAGE_SIZE));
        setClientsPage((p) => Math.min(p, nextPages));
        return next;
      });
    } else if (confirmModal.type === 'employee') {
      setEmployeesList((prev) => prev.filter((item) => item.id !== confirmModal.item.id));
    }

    setConfirmModal(null);
  }

  function resetReportFilters() {
    setReportRoleFilter('');
    setReportBranchFilter('');
  }

  const revenueSeries = {
    daily: [
      { label: 'Mon', value: 18000 },
      { label: 'Tue', value: 22000 },
      { label: 'Wed', value: 20500 },
      { label: 'Thu', value: 26000 },
      { label: 'Fri', value: 24000 },
      { label: 'Sat', value: 29000 },
    ],
    weekly: [
      { label: 'W1', value: 86000 },
      { label: 'W2', value: 94000 },
      { label: 'W3', value: 101000 },
      { label: 'W4', value: 112000 },
    ],
    monthly: [
      { label: 'Jan', value: 72000 },
      { label: 'Feb', value: 84000 },
      { label: 'Mar', value: 91000 },
      { label: 'Apr', value: 98000 },
      { label: 'May', value: 108000 },
      { label: 'Jun', value: 121000 },
    ],
    yearly: [
      { label: '2021', value: 480000 },
      { label: '2022', value: 620000 },
      { label: '2023', value: 760000 },
      { label: '2024', value: 910000 },
      { label: '2025', value: 1040000 },
    ],
    allTime: [
      { label: '2019', value: 320000 },
      { label: '2020', value: 470000 },
      { label: '2021', value: 620000 },
      { label: '2022', value: 760000 },
      { label: '2023', value: 920000 },
      { label: '2024', value: 1080000 },
    ],
  };

  const selectedRevenueData = revenueSeries[revenueRange] || revenueSeries.monthly;
  const revenueTotal = selectedRevenueData.reduce((sum, point) => sum + point.value, 0);
  const revenueReceived = Math.round(revenueTotal * 0.72);
  const revenuePending = Math.round(revenueTotal * 0.28);
  const revenueSummaryCards = [
    {
      label: 'Payment received',
      value: `₹${revenueReceived.toLocaleString()}`,
      hint: 'Collected from clients',
      accentClass: 'received',
      icon: 'arrowUp',
    },
    {
      label: 'Payment pending',
      value: `₹${revenuePending.toLocaleString()}`,
      hint: 'Awaiting confirmation',
      accentClass: 'pending',
      icon: 'overview',
    },
    {
      label: 'Total payment',
      value: `₹${revenueTotal.toLocaleString()}`,
      hint: 'Overall revenue range',
      accentClass: 'total',
      icon: 'revenue',
    },
  ];

  React.useEffect(() => {
    setClientsPage(1);
  }, [serviceFilter]);

  React.useEffect(() => {
    setEmployeesPage((currentPage) => Math.min(currentPage, Math.max(1, Math.ceil(filteredEmployees.length / PAGE_SIZE))));
  }, [filteredEmployees.length, selectedRole, selectedBranch]);

  const handleEditEmployee = () => {
    // Old prompt-based edit handler removed in favor of modal flow.
  };

  const handleDeleteEmployee = () => {
    // Old confirm handler removed in favor of modal flow.
  };

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
      <DashboardSidebar
        navItems={navItems}
        activeNav={activeNav}
        onNavChange={setActiveNav}
        dark={dark}
        onToggleDark={() => setDark(!dark)}
        onSignOut={onSignOut}
        IconComponent={Icon}
        navLabel="Owner dashboard navigation"
      />

      <section className="dashboard-content">
        <DashboardHeader
          eyebrow="Owner workspace"
          title={`Hello, ${ownerName}`}
          copy="Track revenue, top performers, and client activity in one place."
          className="owner-dashboard-top"
        >
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
              JB
            </button>
            <span className="role-badge">Owner</span>
          </div>
        </DashboardHeader>

        {activeNav === "Clients" ? (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
              <div>
                <label style={{ fontSize: 13, color: '#6b6b77', marginRight: 8 }}>Filter by service</label>
                <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}>
                  <option value="">All services</option>
                  {services.map(s => (
                    <option key={s.name} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ color: '#7a748e', fontSize: 13 }}>{clients.length} clients</div>
            </div>

            <table className="clients-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {clientsPageItems.map(client => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.company}</td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>{client.serviceName}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="table-action" onClick={() => openClientInfo(client)}>Info</button>
                      <button className="table-action danger" onClick={() => openDeleteConfirm('client', client)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="table-pagination" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
              <div style={{ color: '#6b6b77' }}>
                Showing {(filteredClients.length === 0) ? 0 : ( (clientsPage - 1) * PAGE_SIZE + 1 )} - {Math.min(clientsPage * PAGE_SIZE, filteredClients.length)} of {filteredClients.length}
              </div>
              <div>
                <button className="table-action" disabled={clientsPage <= 1} onClick={() => setClientsPage(p => Math.max(1, p - 1))}>Prev</button>
                <span style={{ margin: '0 8px' }}>Page {clientsPage} / {clientsTotalPages}</span>
                <button className="table-action" disabled={clientsPage >= clientsTotalPages} onClick={() => setClientsPage(p => Math.min(clientsTotalPages, p + 1))}>Next</button>
              </div>
            </div>
          </section>
        ) : activeNav === "Revenue" ? (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ margin: 0 }}>Revenue analytics</h2>
                <div style={{ color: '#7a748e', fontSize: 13, marginTop: 4 }}>Track revenue performance over time</div>
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#6b6b77', marginRight: 8 }}>Time range</label>
                <select value={revenueRange} onChange={(event) => setRevenueRange(event.target.value)}>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="allTime">All time</option>
                </select>
              </div>
            </div>

            <div className="revenue-panel" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 16, alignItems: 'stretch' }}>
              <div className="revenue-summary" style={{ minHeight: 220 }}>
                <p className="eyebrow">Revenue overview</p>
                <h2>₹{revenueTotal.toLocaleString()}</h2>
                <p className="revenue-copy">Selected range: {revenueRange.charAt(0).toUpperCase() + revenueRange.slice(1)}</p>
                <div className="revenue-breakdown">
                  <div>
                    <span>Average</span>
                    <strong>₹{Math.round(revenueTotal / selectedRevenueData.length).toLocaleString()}</strong>
                  </div>
                  <div>
                    <span>Peak</span>
                    <strong>₹{Math.max(...selectedRevenueData.map((item) => item.value)).toLocaleString()}</strong>
                  </div>
                  <div>
                    <span>Points</span>
                    <strong>{selectedRevenueData.length}</strong>
                  </div>
                </div>
              </div>
              <div className="revenue-chart-panel" style={{ minHeight: 220 }}>
                <div className="revenue-chip">
                  <Icon name="arrowUp" size={14} />
                  <span>Trend</span>
                </div>
                <RevenueTrendChart data={selectedRevenueData} />
              </div>
            </div>

            <div className="revenue-summary-grid">
              {revenueSummaryCards.map((card) => (
                <RevenueSummaryCard key={card.label} card={card} />
              ))}
            </div>
          </section>
        ) : activeNav === "Reports" ? (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ margin: 0 }}>Employee reports</h2>
                <div style={{ color: '#7a748e', fontSize: 13, marginTop: 4 }}>Last month vs this month performance</div>
              </div>
            </div>

            <div className="report-action-group" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
              <button type="button" className="table-action" onClick={resetReportFilters}>Reset filters</button>
              <button type="button" className="table-action" onClick={() => setShowLeaderboard((show) => !show)}>
                {showLeaderboard ? 'Hide leaderboard' : 'Leaderboard'}
              </button>
            </div>

            {showLeaderboard ? (
              <div style={{ marginBottom: 18 }}>
                <TopPerformerLeaderboard performers={topPerformers} />
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
                  <label style={{ fontSize: 13, color: '#6b6b77', marginRight: 6 }}>Role</label>
                  <select value={reportRoleFilter} onChange={(e) => setReportRoleFilter(e.target.value)}>
                    {reportRoleOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>

                  <label style={{ fontSize: 13, color: '#6b6b77', margin: '0 6px' }}>Branch</label>
                  <select value={reportBranchFilter} onChange={(e) => setReportBranchFilter(e.target.value)}>
                    {branchOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <table className="clients-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Branch</th>
                      <th>Role</th>
                      <th>Last month</th>
                      <th>This month</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeesList
                      .filter((employee) => {
                        const roleOk = !reportRoleFilter || (employee.role || '').toLowerCase() === (reportRoleFilter || '').toLowerCase();
                        const branchOk = !reportBranchFilter || (employee.branch || '') === reportBranchFilter;
                        return roleOk && branchOk;
                      })
                      .map((employee) => {
                        const series = generateYearlySeries(employee);
                        const lastMonth = series[10];
                        const thisMonth = series[11];
                        return (
                          <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.branch}</td>
                            <td>{employee.role}</td>
                            <td>₹{lastMonth.toLocaleString()}</td>
                            <td>₹{thisMonth.toLocaleString()}</td>
                            <td style={{ textAlign: 'right' }}>
                              <button className="table-action" onClick={() => openPerformance(employee)}>View chart</button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </>
            )}

            {selectedEmployee ? (
              <SimpleModal onClose={closePerformance}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0 }}>Performance — {selectedEmployee.name}</h3>
                </div>
                <PerformanceChart series={selectedEmployee.series} label={`Employee: ${selectedEmployee.name}`} />
              </SimpleModal>
            ) : null}
          </section>
        ) : activeNav === "Employees" ? (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
              <div>
                <label style={{ fontSize: 13, color: '#6b6b77', marginRight: 8 }}>Filter by role</label>
                <select value={selectedRole} onChange={(event) => {
                  setSelectedRole(event.target.value);
                  setEmployeesPage(1);
                }}>
                  {employeeRoles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                <label style={{ fontSize: 13, color: '#6b6b77', margin: '0 8px' }}>Branch</label>
                <select value={selectedBranch} onChange={(event) => { setSelectedBranch(event.target.value); setEmployeesPage(1); }}>
                  {branchOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div style={{ color: '#7a748e', fontSize: 13 }}>{filteredEmployees.length} employees</div>
            </div>

            <table className="clients-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Branch</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {employeesPageItems.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.branch}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.role}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="table-action" onClick={() => openEmployeeInfo(employee)}>Info</button>
                      <button className="table-action danger" onClick={() => openDeleteConfirm('employee', employee)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="table-pagination" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
              <div style={{ color: '#6b6b77' }}>
                Showing {(filteredEmployees.length === 0) ? 0 : ((employeesPage - 1) * PAGE_SIZE + 1)} - {Math.min(employeesPage * PAGE_SIZE, filteredEmployees.length)} of {filteredEmployees.length}
              </div>
              <div>
                <button className="table-action" disabled={employeesPage <= 1} onClick={() => setEmployeesPage((page) => Math.max(1, page - 1))}>Prev</button>
                <span style={{ margin: '0 8px' }}>Page {employeesPage} / {employeesTotalPages}</span>
                <button className="table-action" disabled={employeesPage >= employeesTotalPages} onClick={() => setEmployeesPage((page) => Math.min(employeesTotalPages, page + 1))}>Next</button>
              </div>
            </div>
          </section>
        ) : (
          <div className="owner-dashboard-layout">
            <div className="dashboard-main">
            <section className="kpi-grid">
              {kpiCards.map((card) => (
                <KpiCard
                  key={card.label}
                  card={card}
                  onAction={(c) => {
                    if (c.linkTo === "Employees") {
                      setActiveNav("Employees");
                      setSelectedRole(c.employeeRole || "All roles");
                    } else if (c.linkTo === "Revenue") {
                      setActiveNav("Revenue");
                      setRevenueRange("monthly");
                    } else {
                      setActiveNav(c.linkTo);
                    }
                  }}
                />
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

          </div>

          <aside className="owner-sidebar-widgets">
            <section className="activity-panel">
              <div className="panel-header">
                <div>
                  <p className="eyebrow">Recent activity</p>
                  <h2>What's happening</h2>
                </div>
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
          </aside>
        </div>
        )}

        {editModal && (
          <Modal title={editModal.type === 'client' ? 'Edit Client' : 'Edit Employee'} onClose={closeEditModal}>
            <EditForm values={editModal.values} onChange={handleEditChange} />
            <div className="modal-actions">
              <button className="table-action" type="button" onClick={closeEditModal}>Cancel</button>
              <button className="table-action" type="button" onClick={saveEditItem}>Save</button>
            </div>
          </Modal>
        )}

        {confirmModal && (
          <Modal title="Confirm delete" onClose={closeConfirmModal}>
            <ConfirmDialog
              message={confirmModal.message}
              onCancel={closeConfirmModal}
              onConfirm={confirmDelete}
            />
          </Modal>
        )}
        {selectedClient && (
          <SimpleModal onClose={closeClientInfo}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div>
                <h3 style={{ margin: 0 }}>Client — {selectedClient.name}</h3>
                <div style={{ color: '#7a748e', fontSize: 13 }}>{selectedClient.company}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ background: '#eef2ff', color: '#4e7cff', padding: '6px 10px', borderRadius: 999 }}>Client</span>
                <span style={{ background: '#f3f6f9', color: '#6b6b77', padding: '6px 10px', borderRadius: 6, fontSize: 13 }}>{selectedClient.serviceType}</span>
              </div>
            </div>
                
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16, padding: '12px 0' }}>
              <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                <div style={{ color: '#6b6b77', fontSize: 12 }}>Mobile</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.phone}</div>
              </div>
              <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                <div style={{ color: '#6b6b77', fontSize: 12 }}>Email</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.email}</div>
              </div>

              <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                <div style={{ color: '#6b6b77', fontSize: 12 }}>Service Type</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.serviceType}</div>
              </div>
              <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                <div style={{ color: '#6b6b77', fontSize: 12 }}>Service Name</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.serviceName || '—'}</div>
              </div>

              <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                <div style={{ color: '#6b6b77', fontSize: 12 }}>Service start</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.serviceStart || '—'}</div>
              </div>
              <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                <div style={{ color: '#6b6b77', fontSize: 12 }}>Total payment</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>₹{(selectedClient.totalPayment || 0).toLocaleString()}</div>
              </div>

              <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                <div style={{ color: '#6b6b77', fontSize: 12 }}>Payment received</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>₹{(selectedClient.paymentReceived || 0).toLocaleString()}</div>
              </div>

              <div style={{ background: '#fff7f6', padding: 12, borderRadius: 8, gridColumn: '1 / -1' }}>
                <div style={{ color: '#6b6b77', fontSize: 12 }}>Payment remaining</div>
                <div style={{ marginTop: 6, fontWeight: 700, color: '#d0433b' }}>₹{(((selectedClient.totalPayment || 0) - (selectedClient.paymentReceived || 0)) || 0).toLocaleString()}</div>
              </div>
            </div>

            <div className="modal-actions" style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 18 }}>
              <button className="table-action" type="button" onClick={() => { openEditClient(selectedClient); closeClientInfo(); }}>Edit</button>
            </div>
          </SimpleModal>
        )}
        {selectedEmployeeInfo && (
          <SimpleModal onClose={closeEmployeeInfo}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div>
                <h3 style={{ margin: 0 }}>Employee — {selectedEmployeeInfo.name}</h3>
                <div style={{ color: '#7a748e', fontSize: 13 }}>{selectedEmployeeInfo.role}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16, padding: '12px 0' }}>
              <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                <div style={{ color: '#6b6b77', fontSize: 12 }}>Name</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.name}</div>
              </div>
              <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                <div style={{ color: '#6b6b77', fontSize: 12 }}>Email</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.email}</div>
              </div>
              <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                <div style={{ color: '#6b6b77', fontSize: 12 }}>Mobile</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.phone}</div>
              </div>
              <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                <div style={{ color: '#6b6b77', fontSize: 12 }}>Designation</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.role}</div>
              </div>
              <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                <div style={{ color: '#6b6b77', fontSize: 12 }}>Branch</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.branch}</div>
              </div>
              {['sales', 'manager', 'admin', 'IT', 'market'].includes(selectedEmployeeInfo.role) && (
                <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                  <div style={{ color: '#6b6b77', fontSize: 12 }}>Branch manager</div>
                  <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.branchManager || '—'}</div>
                </div>
              )}
              {selectedEmployeeInfo.role === 'sales' && (
                <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8, gridColumn: '1 / -1' }}>
                  <div style={{ color: '#6b6b77', fontSize: 12 }}>Reporting manager</div>
                  <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.reportingManager || '—'}</div>
                </div>
              )}
            </div>
            <div className="modal-actions" style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 18 }}>
              <button className="table-action" type="button" onClick={() => { openEditEmployee(selectedEmployeeInfo); closeEmployeeInfo(); }}>Edit</button>
            </div>
          </SimpleModal>
        )}
      </section>
    </main>
  );
}
