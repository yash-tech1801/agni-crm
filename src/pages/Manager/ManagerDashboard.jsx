import React from "react";
import Icon from "../../components/Icon";
import KpiCard from "../../components/KpiCard";
import { getDailyPayment, getWeeklyPayment, getMonthlyPayment, formatCurrency } from "../../utils/paymentHelpers";
import PerformanceChart from "../../components/PerformanceChart";
import SimpleModal from "../../components/SimpleModal";
import TopPerformerLeaderboard from "../../components/TopPerformerLeaderboard";
import EditForm from "../../components/EditForm";
import ConfirmDialog from "../../components/ConfirmDialog";
import ManagerRequests from "./ManagerRequests";

const navItems = [
  { icon: "dashboard", label: "Dashboard" },
  { icon: "team", label: "Team" },
  { icon: "clients", label: "Clients" },
  { icon: "overview", label: "Requests" },
  { icon: "reports", label: "Reports" },
];

const kpiCards = [
  {
    label: "Team members",
    value: "48",
    trend: "+12%",
    description: "Active this month",
    accent: "#4e7cff",
    linkTo: "Team",
    slug: "managers",
  },
  {
    label: "Open deals",
    value: "32",
    trend: "+9%",
    description: "In progress",
    accent: "#44bfb0",
    linkTo: "Clients",
    slug: "sales",
  },
  {
    label: "Closed this month",
    value: "18",
    trend: "+21%",
    description: "Won opportunities",
    accent: "#9a74e9",
    slug: "clients",
  },
];

const teamPerformance = [
  { name: "Mia Ross", role: "Senior Sales", score: "92%", detail: "Top conversion" },
  { name: "Ariana Lee", role: "Branch Lead", score: "88%", detail: "Highest client growth" },
  { name: "Eli Brooks", role: "Operations", score: "84%", detail: "Process efficiency" },
  { name: "Noah Kim", role: "Support", score: "81%", detail: "Response quality" },
  { name: "Priya Menon", role: "Assistant", score: "77%", detail: "Follow up speed" },
];

const salesTeam = [
  {
    id: 1,
    name: "Mia Ross",
    role: "Senior Sales",
    branch: "East",
    branchManager: "Ariana Lee",
    email: "mia@agni.com",
    phone: "+91 91234 10101",
    region: "East Zone",
    quota: "₹120k",
    monthlySales: "₹96k",
    joiningDate: "2024-02-15",
  },
  {
    id: 2,
    name: "Rohan Varma",
    role: "Sales Executive",
    branch: "South",
    branchManager: "Priya Menon",
    email: "rohan@agni.com",
    phone: "+91 91234 20202",
    region: "South Zone",
    quota: "₹95k",
    monthlySales: "₹78k",
    joiningDate: "2024-05-11",
  },
  {
    id: 3,
    name: "Noah Kim",
    role: "Sales Associate",
    branch: "West",
    branchManager: "Sara Kim",
    email: "noah@agni.com",
    phone: "+91 91234 10202",
    region: "West Zone",
    quota: "₹84k",
    monthlySales: "₹63k",
    joiningDate: "2024-03-18",
  },
  {
    id: 4,
    name: "Tara Singh",
    role: "Sales Specialist",
    branch: "North",
    branchManager: "Eli Brooks",
    email: "tara@agni.com",
    phone: "+91 91234 30303",
    region: "North Zone",
    quota: "₹110k",
    monthlySales: "₹88k",
    joiningDate: "2024-01-22",
  },
];

const managerClients = [
  {
    id: 1,
    name: "Bright Retail",
    company: "Bright Retail Pvt Ltd",
    email: "hello@brightretail.com",
    phone: "+91 98765 32100",
    service: "CRM Implementation",
    salesRep: "Mia Ross",
    assignedSalesPersonId: 1,
    branch: "East",
    revenue: "₹68k",
    startDate: "2024-03-02",
  },
  {
    id: 2,
    name: "Urban Foods",
    company: "Urban Foods Ltd",
    email: "sales@urbanfoods.com",
    phone: "+91 91234 55678",
    service: "Marketing Campaign",
    salesRep: "Mia Ross",
    assignedSalesPersonId: 1,
    branch: "East",
    revenue: "₹54k",
    startDate: "2024-04-18",
  },
  {
    id: 3,
    name: "Nova Textiles",
    company: "Nova Textiles Co",
    email: "contact@novatextiles.com",
    phone: "+91 99876 44556",
    service: "IT Support",
    salesRep: "Rohan Varma",
    assignedSalesPersonId: 2,
    branch: "South",
    revenue: "₹46k",
    startDate: "2024-05-09",
  },
];

const activities = [
  { title: "Weekly pipeline review", detail: "Scheduled for Thursday at 10am.", time: "Just now", tone: "#9a74e9" },
  { title: "Client meeting prep", detail: "Finalize proposal deck for Kiran.", time: "1 hr ago", tone: "#4e7cff" },
  { title: "Deal follow-up", detail: "Reminder to reconnect with RMD Corp.", time: "3 hrs ago", tone: "#44bfb0" },
  { title: "Team coaching", detail: "Review conversion metrics with sales team.", time: "6 hrs ago", tone: "#f2aa38" },
];

const reportRoleOptions = [
  { label: 'All roles', value: '' },
  { label: 'Branch Manager', value: 'branch manager' },
  { label: 'Manager', value: 'manager' },
  { label: 'Senior Sales', value: 'Senior Sales' },
  { label: 'Sales Executive', value: 'Sales Executive' },
  { label: 'Sales Associate', value: 'Sales Associate' },
  { label: 'Sales Specialist', value: 'Sales Specialist' },
];

const branchOptions = [
  { label: 'All branches', value: '' },
  { label: 'East', value: 'East' },
  { label: 'South', value: 'South' },
  { label: 'West', value: 'West' },
  { label: 'North', value: 'North' },
];

function RevenueSparkline() {
  return (
    <svg viewBox="0 0 240 64" aria-hidden="true" className="sparkline-chart">
      <path d="M12 48 C42 36 70 30 98 22 C126 14 154 18 182 12 C210 6 228 12 236 20" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="12" cy="48" r="4" fill="#fff" />
      <circle cx="98" cy="22" r="4" fill="#fff" />
      <circle cx="236" cy="20" r="4" fill="#fff" />
    </svg>
  );
}

export default function ManagerDashboard({ onSignOut, userEmail }) {
  const [activeNav, setActiveNav] = React.useState("Dashboard");
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [notificationsAutoScrollPaused, setNotificationsAutoScrollPaused] = React.useState(false);
  const [dark, setDark] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selectedTeamMember, setSelectedTeamMember] = React.useState(null);
  const [selectedClient, setSelectedClient] = React.useState(null);
  const [clients, setClients] = React.useState(managerClients);
  const [selectedSalesPerson, setSelectedSalesPerson] = React.useState("all");
  const [editClientValues, setEditClientValues] = React.useState(null);
  const [deleteTargetClient, setDeleteTargetClient] = React.useState(null);
  const notificationWrapRef = React.useRef(null);
  const notificationsListRef = React.useRef(null);
  const notificationsPauseTimer = React.useRef(null);

  const managerName = React.useMemo(() => {
    if (!userEmail) return "Manager";
    const raw = userEmail.split("@")[0];
    const parts = raw.split(/[^a-zA-Z0-9]+/).filter(Boolean);
    return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(" ");
  }, [userEmail]);

  const managedBranch = "East";
  const managedRegion = "East Zone";
  const branchTeam = salesTeam.filter((member) => member.branch === managedBranch);
  const branchTeamNames = branchTeam.map((member) => member.name);
  const branchClients = clients.filter((client) => branchTeamNames.includes(client.salesRep));

  const salesPeople = React.useMemo(
    () => branchTeam.map((member) => ({ id: member.id, name: member.name })),
    [branchTeam]
  );

  const filteredClients = React.useMemo(() => {
    // Apply salesperson filtering first, then any other table-level filters if added.
    if (selectedSalesPerson === "all") {
      return branchClients;
    }

    const selectedId = Number(selectedSalesPerson);
    return branchClients.filter((client) => client.assignedSalesPersonId === selectedId);
  }, [branchClients, selectedSalesPerson]);

  const currentManagerId = React.useMemo(() => 4, [userEmail]);

  const paymentMetrics = React.useMemo(() => ({
    daily: formatCurrency(getDailyPayment(currentManagerId)),
    weekly: formatCurrency(getWeeklyPayment(currentManagerId)),
    monthly: formatCurrency(getMonthlyPayment(currentManagerId)),
  }), [currentManagerId]);

  const dashboardKpiCards = React.useMemo(() => [
    ...kpiCards,
    {
      label: "Daily Payment",
      value: paymentMetrics.daily,
      trend: "Today",
      description: "Today's collection",
      accent: "#f2938f",
      icon: "calendarToday",
    },
    {
      label: "Weekly Payment",
      value: paymentMetrics.weekly,
      trend: "This week",
      description: "Sales team total",
      accent: "#6f94f8",
      icon: "calendarWeek",
    },
    {
      label: "Monthly Payment",
      value: paymentMetrics.monthly,
      trend: "This month",
      description: "Manager collection",
      accent: "#56c37d",
      icon: "wallet",
    },
  ], [paymentMetrics]);

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
        list.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        list.scrollTo({ top: nextScrollTop, behavior: "smooth" });
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

  function openMemberInfo(member) {
    setSelectedTeamMember(member);
  }

  function closeMemberInfo() {
    setSelectedTeamMember(null);
  }

  const [showLeaderboard, setShowLeaderboard] = React.useState(false);
  const [selectedPerformanceEmployee, setSelectedPerformanceEmployee] = React.useState(null);

  function openClientInfo(client) {
    setSelectedClient(client);
    setEditClientValues(null);
  }

  function closeClientInfo() {
    setSelectedClient(null);
    setEditClientValues(null);
  }

  function openDeleteConfirm(client) {
    setDeleteTargetClient(client);
  }

  function closeDeleteConfirm() {
    setDeleteTargetClient(null);
  }

  function handleDeleteClient(clientId) {
    setClients((prev) => prev.filter((client) => client.id !== clientId));
    if (selectedClient?.id === clientId) {
      setSelectedClient(null);
      setEditClientValues(null);
    }
  }

  function confirmDeleteClient() {
    if (!deleteTargetClient) return;
    handleDeleteClient(deleteTargetClient.id);
    closeDeleteConfirm();
  }

  function startClientEdit() {
    setEditClientValues(selectedClient);
  }

  function handleEditClientChange(event) {
    const { name, value } = event.target;
    setEditClientValues((prev) => ({ ...prev, [name]: value }));
  }

  function saveClientEdit() {
    setClients((prev) => prev.map((client) => (client.id === editClientValues.id ? editClientValues : client)));
    setSelectedClient(editClientValues);
    setEditClientValues(null);
  }

  function cancelClientEdit() {
    setEditClientValues(null);
  }

  function openPerformance(employee) {
    const series = generateYearlySeries(employee);
    setSelectedPerformanceEmployee({ ...employee, series });
  }

  function closePerformance() {
    setSelectedPerformanceEmployee(null);
  }

  function generateYearlySeries(employee) {
    const base = 50000 + employee.id * 2000;
    return Array.from({ length: 12 }, (_, index) => {
      const seasonal = 0.72 + index * 0.02;
      const seed = ((employee.id * 7 + index * 3) % 11) * 0.01;
      return Math.round(base * (seasonal + seed));
    });
  }

  return (
    <main className={`owner-dashboard ${dark ? "dashboard-dark" : ""}`}>
      <aside className="client-sidebar">
        <div className="client-brand">
          <strong>Agni CRM</strong>
        </div>
        <nav>
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={activeNav === item.label ? "selected" : ""}
              onClick={() => setActiveNav(item.label)}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
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
              onClick={() => setDark((value) => !value)}
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
        <header className="dashboard-top owner-dashboard-top" ref={notificationWrapRef}>
          <div>
            <p className="dashboard-eyebrow">Manager workspace</p>
            <h1>Welcome back, {managerName}</h1>
            <p className="dashboard-copy">
              Monitor your team, track pipeline momentum, and keep client work moving forward.
            </p>
          </div>

          <div className="top-actions owner-top-actions">
            {searchOpen ? (
              <div className="search-field">
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search team, deals or reports"
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
            <div className="notification-wrap">
              <button
                className="notification"
                type="button"
                onClick={() => setNotificationsOpen((open) => !open)}
                aria-label="Notifications"
              >
                <Icon name="bell" size={16} />
                <i />
              </button>
              {notificationsOpen && (
                <section className="notifications-popover" aria-label="Notifications">
                  <header>
                    <h2>Notifications</h2>
                    <span>4 new</span>
                  </header>
                  <div
                    className="notifications-scroll"
                    ref={notificationsListRef}
                    onScroll={handleNotificationsListScroll}
                  >
                    <article>
                      <span className="notice-dot violet" />
                      <div>
                        <strong>Daily standup ready</strong>
                        <p>Review today's agenda before the 9am call.</p>
                      </div>
                    </article>
                    <article>
                      <span className="notice-dot green" />
                      <div>
                        <strong>New deal assigned</strong>
                        <p>Rohan has been added to the Pharma account.</p>
                      </div>
                    </article>
                    <article>
                      <span className="notice-dot coral" />
                      <div>
                        <strong>Quarterly forecast</strong>
                        <p>Your updated revenue forecast is ready for review.</p>
                      </div>
                    </article>
                  </div>
                </section>
              )}
            </div>
          </div>
        </header>

        {activeNav === "Dashboard" ? (
          <section className="dashboard-layout">
            <div className="dashboard-main">
              <section className="kpi-grid">
                {dashboardKpiCards.map((card) => (
                  <KpiCard
                    key={card.label}
                    card={card}
                    onAction={(c) => c.linkTo && setActiveNav(c.linkTo)}
                  />
                ))}
              </section>

              <section className="revenue-panel">
                <div className="revenue-summary">
                  <p className="eyebrow">Performance overview</p>
                  <h2>₹184.6k</h2>
                  <p className="revenue-copy">Pipeline value across active opportunities this month.</p>
                  <div className="revenue-breakdown">
                    <div>
                      <span>Won revenue</span>
                      <strong>₹84.2k</strong>
                    </div>
                    <div>
                      <span>Pending</span>
                      <strong>₹52.3k</strong>
                    </div>
                    <div>
                      <span>Forecast</span>
                      <strong>+18.9%</strong>
                    </div>
                  </div>
                </div>
                <div className="revenue-chart-panel">
                  <div className="revenue-chip">
                    <Icon name="arrowUp" size={14} />
                    <span>Pipeline trend</span>
                  </div>
                  <RevenueSparkline />
                </div>
              </section>
            </div>

            <aside className="owner-sidebar-widgets">
              <section className="activity-panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Activity</p>
                    <h2>What’s happening</h2>
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
          </section>
        ) : activeNav === "Team" ? (
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <p className="eyebrow">Sales team</p>
                <h2>{managedRegion} team</h2>
                <p style={{ margin: 0, color: '#6b6b77', fontSize: 13 }}>Only sales members from the branch you manage are shown here.</p>
              </div>
              <div style={{ color: '#7a748e', fontSize: 13 }}>{branchTeam.length} members</div>
            </div>

            <table className="clients-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Joined</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {branchTeam.map((member) => (
                  <tr key={member.id}>
                    <td>{member.name}</td>
                    <td>{member.role}</td>
                    <td>{member.email}</td>
                    <td>{member.phone}</td>
                    <td>{member.joiningDate}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="table-action" type="button" onClick={() => openMemberInfo(member)}>
                        Info
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedTeamMember && (
              <SimpleModal onClose={closeMemberInfo}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <div>
                    <h3 style={{ margin: 0 }}>Employee — {selectedTeamMember.name}</h3>
                    <div style={{ color: '#7a748e', fontSize: 13 }}>{selectedTeamMember.role}</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16, padding: '12px 0' }}>
                  <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                    <div style={{ color: '#6b6b77', fontSize: 12 }}>Name</div>
                    <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedTeamMember.name}</div>
                  </div>
                  <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                    <div style={{ color: '#6b6b77', fontSize: 12 }}>Role</div>
                    <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedTeamMember.role}</div>
                  </div>
                  <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                    <div style={{ color: '#6b6b77', fontSize: 12 }}>Branch</div>
                    <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedTeamMember.branch}</div>
                  </div>
                  <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                    <div style={{ color: '#6b6b77', fontSize: 12 }}>Branch manager</div>
                    <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedTeamMember.branchManager || managerName}</div>
                  </div>
                  <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                    <div style={{ color: '#6b6b77', fontSize: 12 }}>Region</div>
                    <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedTeamMember.region}</div>
                  </div>
                  <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                    <div style={{ color: '#6b6b77', fontSize: 12 }}>Email</div>
                    <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedTeamMember.email}</div>
                  </div>
                  <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                    <div style={{ color: '#6b6b77', fontSize: 12 }}>Phone</div>
                    <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedTeamMember.phone}</div>
                  </div>
                  <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                    <div style={{ color: '#6b6b77', fontSize: 12 }}>Quota</div>
                    <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedTeamMember.quota}</div>
                  </div>
                  <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                    <div style={{ color: '#6b6b77', fontSize: 12 }}>Monthly sales</div>
                    <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedTeamMember.monthlySales}</div>
                  </div>
                  <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8, gridColumn: '1 / -1' }}>
                    <div style={{ color: '#6b6b77', fontSize: 12 }}>Joined</div>
                    <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedTeamMember.joiningDate}</div>
                  </div>
                </div>
              </SimpleModal>
            )}
          </section>
        ) : activeNav === "Clients" ? (
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <p className="eyebrow">Branch clients</p>
                <h2>Clients under your sales team</h2>
                <p style={{ margin: 0, color: '#6b6b77', fontSize: 13 }}>Showing only clients managed by sales members in your branch.</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ color: '#7a748e', fontSize: 13 }}>{filteredClients.length} clients</div>
                <label className="field-label" style={{ minWidth: 220, margin: 0 }}>
                  <span>Sales Person</span>
                  <select
                    value={selectedSalesPerson}
                    onChange={(event) => setSelectedSalesPerson(event.target.value)}
                  >
                    <option value="all">All Sales Persons</option>
                    {salesPeople.map((person) => (
                      <option key={person.id} value={person.id}>
                        {person.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <table className="clients-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Company</th>
                  <th>Assigned rep</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Start</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.company}</td>
                    <td>{client.salesRep}</td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>{client.startDate}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="table-action" type="button" onClick={() => openClientInfo(client)}>
                        Info
                      </button>
                      <button className="table-action danger" type="button" onClick={() => openDeleteConfirm(client)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedClient && (
              <SimpleModal onClose={closeClientInfo}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <div>
                    <h3 style={{ margin: 0 }}>Client — {selectedClient.name}</h3>
                    <div style={{ color: '#7a748e', fontSize: 13 }}>{selectedClient.company}</div>
                  </div>
                </div>

                {editClientValues ? (
                  <div style={{ display: 'grid', gap: 16, marginTop: 16 }}>
                    <EditForm values={editClientValues} onChange={handleEditClientChange} />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                      <button className="table-action" type="button" onClick={cancelClientEdit}>
                        Cancel
                      </button>
                      <button className="table-action" type="button" onClick={saveClientEdit}>
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16, padding: '12px 0' }}>
                      <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                        <div style={{ color: '#6b6b77', fontSize: 12 }}>Client</div>
                        <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.name}</div>
                      </div>
                      <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                        <div style={{ color: '#6b6b77', fontSize: 12 }}>Company</div>
                        <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.company}</div>
                      </div>
                      <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                        <div style={{ color: '#6b6b77', fontSize: 12 }}>Assigned rep</div>
                        <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.salesRep}</div>
                      </div>
                      <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                        <div style={{ color: '#6b6b77', fontSize: 12 }}>Email</div>
                        <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.email}</div>
                      </div>
                      <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                        <div style={{ color: '#6b6b77', fontSize: 12 }}>Phone</div>
                        <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.phone}</div>
                      </div>
                      <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                        <div style={{ color: '#6b6b77', fontSize: 12 }}>Service</div>
                        <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.service}</div>
                      </div>
                      <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                        <div style={{ color: '#6b6b77', fontSize: 12 }}>Start date</div>
                        <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.startDate}</div>
                      </div>
                      <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                        <div style={{ color: '#6b6b77', fontSize: 12 }}>Revenue</div>
                        <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.revenue}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                      <button className="table-action" type="button" onClick={startClientEdit}>
                        Edit
                      </button>
                    </div>
                  </>
                )}
              </SimpleModal>
            )}

            {deleteTargetClient && (
              <SimpleModal onClose={closeDeleteConfirm} showCloseButton={false}>
                <ConfirmDialog
                  message={`Delete ${deleteTargetClient.name} from clients?`}
                  onConfirm={confirmDeleteClient}
                  onCancel={closeDeleteConfirm}
                />
              </SimpleModal>
            )}
          </section>
        ) : activeNav === "Requests" ? (
          <section>
            <ManagerRequests branchTeamNames={branchTeamNames} managedRegion={managedRegion} />
          </section>
        ) : activeNav === "Reports" ? (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ margin: 0 }}>Employee reports</h2>
                <div style={{ color: '#7a748e', fontSize: 13, marginTop: 4 }}>Last month vs this month performance</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <button type="button" className="table-action" onClick={() => setShowLeaderboard((show) => !show)}>
                {showLeaderboard ? 'Hide leaderboard' : 'Leaderboard'}
              </button>
            </div>

            {showLeaderboard ? (
              <div style={{ marginBottom: 18 }}>
                <TopPerformerLeaderboard performers={branchTeam} />
              </div>
            ) : (
              <>
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
                    {branchTeam.map((employee) => {
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
                            <button className="table-action" type="button" onClick={() => openPerformance(employee)}>
                              View chart
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}

            {selectedPerformanceEmployee && (
              <SimpleModal onClose={closePerformance}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0 }}>Performance — {selectedPerformanceEmployee.name}</h3>
                </div>
                <PerformanceChart series={selectedPerformanceEmployee.series} label={`Employee: ${selectedPerformanceEmployee.name}`} />
              </SimpleModal>
            )}
          </section>
        ) : (
          <section className="dashboard-layout">
            <div className="dashboard-main">
              <section className="kpi-grid">
                {dashboardKpiCards.map((card) => (
                  <KpiCard
                    key={card.label}
                    card={card}
                    onAction={(c) => c.linkTo && setActiveNav(c.linkTo)}
                  />
                ))}
              </section>

              <section className="revenue-panel">
                <div className="revenue-summary">
                  <p className="eyebrow">Performance overview</p>
                  <h2>₹184.6k</h2>
                  <p className="revenue-copy">Pipeline value across active opportunities this month.</p>
                  <div className="revenue-breakdown">
                    <div>
                      <span>Won revenue</span>
                      <strong>₹84.2k</strong>
                    </div>
                    <div>
                      <span>Pending</span>
                      <strong>₹52.3k</strong>
                    </div>
                    <div>
                      <span>Forecast</span>
                      <strong>+18.9%</strong>
                    </div>
                  </div>
                </div>
                <div className="revenue-chart-panel">
                  <div className="revenue-chip">
                    <Icon name="arrowUp" size={14} />
                    <span>Pipeline trend</span>
                  </div>
                  <RevenueSparkline />
                </div>
              </section>
            </div>

            <aside className="owner-sidebar-widgets">
              <section className="activity-panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Activity</p>
                    <h2>What’s happening</h2>
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
          </section>
        )}
      </section>
    </main>
  );
}
