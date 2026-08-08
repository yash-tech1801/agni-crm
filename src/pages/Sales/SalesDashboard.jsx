import React from "react";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Icon from "../../components/Icon";
import RevenueSummaryCard from "../../components/RevenueSummaryCard";
import PerformanceChart from "../../components/PerformanceChart";
import BranchRevenueChart from "../../components/BranchRevenueChart";
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
  { icon: "settings", label: "Admin" },
  { icon: "overview", label: "IT" },
  { icon: "leads", label: "Marketing" },
];

const branchRevenueData = [
  { branch: 'North', revenue: 145 },
  { branch: 'South', revenue: 210 },
  { branch: 'East', revenue: 180 },
  { branch: 'West', revenue: 320 },
];

const kpiCards = [
  { label: "Total Regional Managers", value: "7", trend: "+3%", description: "Managers across region", accent: "#9a74e9" },
  { label: "Total Employees", value: "124", trend: "+6%", description: "Staff at branch", accent: "#4e7cff" },
  { label: "Active Clients", value: "248", trend: "+8%", description: "Currently active", accent: "#44bfb0" },
  { label: "Pending Requests", value: "12", trend: "-2%", description: "Awaiting action", accent: "#f2aa38" },
  { label: "Branch Revenue", value: "₹278.8k", trend: "+22%", description: "This month", accent: "#f97316" },
];

const branchManagerClients = [
  {
    id: 1,
    name: "Bright Retail",
    company: "Bright Retail Pvt Ltd",
    email: "hello@brightretail.com",
    phone: "+91 98765 32100",
    service: "CRM Implementation",
    salesRep: "Mia Ross",
    branch: "East",
    revenue: "₹68k",
    startDate: "2024-03-02",
    region: "East Zone",
    managerName: "Ariana Lee",
  },
  {
    id: 2,
    name: "Urban Foods",
    company: "Urban Foods Ltd",
    email: "sales@urbanfoods.com",
    phone: "+91 91234 55678",
    service: "Marketing Campaign",
    salesRep: "Mia Ross",
    branch: "East",
    revenue: "₹54k",
    startDate: "2024-04-18",
    region: "East Zone",
    managerName: "Ariana Lee",
  },
  {
    id: 3,
    name: "Nova Textiles",
    company: "Nova Textiles Co",
    email: "contact@novatextiles.com",
    phone: "+91 99876 44556",
    service: "IT Support",
    salesRep: "Rohan Varma",
    branch: "South",
    revenue: "₹46k",
    startDate: "2024-05-09",
    region: "South Zone",
    managerName: "Priya Menon",
  },
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

  // Client management state
  const [clients, setClients] = React.useState(branchManagerClients);
  const [selectedClient, setSelectedClient] = React.useState(null);
  const [editClientValues, setEditClientValues] = React.useState(null);
  const [deleteTargetClient, setDeleteTargetClient] = React.useState(null);

  const [branchAdmins] = React.useState([
    { id: 1, name: 'Sara Kim', email: 'sara@agni.com', joiningDate: '2023-01-15', role: 'admin', region: 'North Zone', branchManagerName: 'Ariana Lee' },
    { id: 2, name: 'Nisha Rao', email: 'nisha@agni.com', joiningDate: '2024-03-22', role: 'admin', region: 'South Zone', branchManagerName: 'Priya Menon' },
  ]);

  const [branchIT] = React.useState([
    { id: 1, name: 'Noah Kim', email: 'noah@agni.com', joiningDate: '2022-11-04', role: 'IT Support', region: 'West Zone', branchManagerName: 'Ariana Lee' },
    { id: 2, name: 'Janet Paul', email: 'janet@agni.com', joiningDate: '2024-01-18', role: 'Systems Admin', region: 'West Zone', branchManagerName: 'Ariana Lee' },
  ]);

  const [branchMarketing] = React.useState([
    { id: 1, name: 'Daniel Cruz', email: 'daniel@agni.com', joiningDate: '2023-05-11', role: 'Marketing Specialist', region: 'South Zone', branchManagerName: 'Ariana Lee' },
    { id: 2, name: 'Lily Chen', email: 'lily@agni.com', joiningDate: '2023-08-02', role: 'SEO Expert', region: 'East Zone', branchManagerName: 'Priya Menon' },
  ]);

  // Regional Revenue state
  const [regionalRevenue] = React.useState([
    { id: 1, region: 'North Zone', manager: 'Ariana Lee', revenue: '₹145k', series: [80, 95, 110, 105, 130, 145] },
    { id: 2, region: 'South Zone', manager: 'Priya Menon', revenue: '₹210k', series: [120, 130, 150, 160, 190, 210] },
    { id: 3, region: 'East Zone', manager: 'Mia Ross', revenue: '₹180k', series: [100, 110, 125, 140, 165, 180] },
    { id: 4, region: 'West Zone', manager: 'Eli Brooks', revenue: '₹320k', series: [150, 180, 210, 240, 280, 320] },
  ]);
  const [selectedRegionRevenue, setSelectedRegionRevenue] = React.useState(null);

  // Employee management state
  const [employeesList] = React.useState([
    { id: 1, name: 'Eli Brooks', email: 'eli@agni.com', phone: '+91 91234 00222', role: 'manager', branch: 'South', branchManager: 'Ariana Lee' },
    { id: 2, name: 'Mia Ross', email: 'mia@agni.com', phone: '+91 91234 10101', role: 'sales', branch: 'East', branchManager: 'Ariana Lee', reportingManager: 'Eli Brooks' },
    { id: 3, name: 'Noah Kim', email: 'noah@agni.com', phone: '+91 91234 10202', role: 'sales', branch: 'West', branchManager: 'Ariana Lee', reportingManager: 'Eli Brooks' },
    { id: 4, name: 'Daniel Cruz', email: 'daniel@agni.com', phone: '+91 91234 30303', role: 'manager', branch: 'South', branchManager: 'Ariana Lee' },
    { id: 5, name: 'Priya Menon', email: 'priya@agni.com', phone: '+91 91234 40404', role: 'sales', branch: 'East', branchManager: 'Ariana Lee', reportingManager: 'Daniel Cruz' },
  ]);
  const [selectedManagerForTeam, setSelectedManagerForTeam] = React.useState(null);
  const [selectedEmployeeInfo, setSelectedEmployeeInfo] = React.useState(null);

  function openEmployeeInfo(employee) {
    setSelectedEmployeeInfo(employee);
  }
  function closeEmployeeInfo() {
    setSelectedEmployeeInfo(null);
  }

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

  // Client handlers
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

  return (
    <main className={`owner-dashboard branch-manager-dashboard ${dark ? "dashboard-dark" : ""}`}>
      <DashboardSidebar
        navItems={navItems}
        activeNav={activeNav}
        onNavChange={setActiveNav}
        dark={dark}
        onToggleDark={() => setDark((value) => !value)}
        onSignOut={onSignOut}
        IconComponent={Icon}
        brandMark="BM"
        navLabel="Branch manager navigation"
      />

      <section className="dashboard-content">
        <DashboardHeader
          eyebrow="Branch manager workspace"
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
            <button className="profile" type="button">
              BM
            </button>
            <span className="role-badge">Branch Manager</span>
          </div>
        </DashboardHeader>

        {activeNav === "Clients" ? (
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <p className="eyebrow">Branch clients</p>
                <h2>Clients under your branch</h2>
                <p style={{ margin: 0, color: '#6b6b77', fontSize: 13 }}>Showing clients managed by sales members in your branch.</p>
              </div>
              <div style={{ color: '#7a748e', fontSize: 13 }}>{clients.length} clients</div>
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
                {clients.map((client) => (
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
                      <div style={{ background: '#eef0fb', padding: 12, borderRadius: 8, border: '1px solid #d4d8f0' }}>
                        <div style={{ color: '#4e5579', fontSize: 12, fontWeight: 500 }}>Region name</div>
                        <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.region}</div>
                      </div>
                      <div style={{ background: '#eef0fb', padding: 12, borderRadius: 8, border: '1px solid #d4d8f0' }}>
                        <div style={{ color: '#4e5579', fontSize: 12, fontWeight: 500 }}>Manager name</div>
                        <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.managerName}</div>
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
        ) : activeNav === "Employees" ? (
          <section>
            {selectedManagerForTeam ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
                  <div>
                    <h2 style={{ margin: 0 }}>Team: {selectedManagerForTeam.name}</h2>
                    <div style={{ color: '#7a748e', fontSize: 13, marginTop: 4 }}>Region: {selectedManagerForTeam.branch}</div>
                  </div>
                  <button className="table-action" onClick={() => setSelectedManagerForTeam(null)}>Back to Managers</button>
                </div>
                <table className="clients-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeesList.filter(emp => emp.reportingManager === selectedManagerForTeam.name || emp.branchManager === selectedManagerForTeam.name).map((employee) => (
                      <tr key={employee.id}>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.role}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button className="table-action" onClick={() => openEmployeeInfo(employee)}>View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
                  <div>
                    <h2 style={{ margin: 0 }}>Managers</h2>
                    <div style={{ color: '#7a748e', fontSize: 13, marginTop: 4 }}>Select a manager to view their team</div>
                  </div>
                </div>
                <table className="clients-table">
                  <thead>
                    <tr>
                      <th>Manager Name</th>
                      <th>Region Name</th>
                      <th>Sales Persons</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeesList
                      .filter(emp => (emp.role || '').toLowerCase().includes('manager'))
                      .map((manager) => {
                        const teamCount = employeesList.filter(emp => emp.reportingManager === manager.name || emp.branchManager === manager.name).length;
                        return (
                          <tr key={manager.id}>
                            <td>{manager.name}</td>
                            <td>{manager.branch}</td>
                            <td>{teamCount}</td>
                            <td style={{ textAlign: 'right' }}>
                              <button className="table-action" onClick={() => setSelectedManagerForTeam(manager)}>View Team</button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </>
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
                  <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8, gridColumn: '1 / -1' }}>
                    <div style={{ color: '#6b6b77', fontSize: 12 }}>Reporting manager</div>
                    <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.reportingManager || '—'}</div>
                  </div>
                </div>
              </SimpleModal>
            )}
          </section>
        ) : activeNav === "Admin" ? (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
              <div>
                <h2 style={{ margin: 0 }}>Branch Admins</h2>
                <div style={{ color: '#7a748e', fontSize: 13, marginTop: 4 }}>Administrators working under your branch</div>
              </div>
            </div>
            <table className="clients-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Joining Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {branchAdmins.map((admin) => (
                  <tr key={admin.id}>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>{admin.joiningDate}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="table-action" onClick={() => openEmployeeInfo(admin)}>Info</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedEmployeeInfo && (
              <SimpleModal onClose={closeEmployeeInfo}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <div>
                    <h3 style={{ margin: 0 }}>Admin — {selectedEmployeeInfo.name}</h3>
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
                    <div style={{ color: '#6b6b77', fontSize: 12 }}>Joining Date</div>
                    <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.joiningDate}</div>
                  </div>
                  <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                    <div style={{ color: '#6b6b77', fontSize: 12 }}>Designation</div>
                    <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.role}</div>
                  </div>
                  <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                    <div style={{ color: '#6b6b77', fontSize: 12 }}>Region</div>
                    <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.region}</div>
                  </div>
                </div>
              </SimpleModal>
            )}
          </section>
        ) : activeNav === "IT" ? (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
              <div>
                <h2 style={{ margin: 0 }}>IT Team</h2>
                <div style={{ color: '#7a748e', fontSize: 13, marginTop: 4 }}>IT professionals working under your branch</div>
              </div>
            </div>
            <table className="clients-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Joining Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {branchIT.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.joiningDate}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="table-action" onClick={() => openEmployeeInfo(emp)}>Info</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedEmployeeInfo && (
              <SimpleModal onClose={closeEmployeeInfo}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <div>
                    <h3 style={{ margin: 0 }}>IT — {selectedEmployeeInfo.name}</h3>
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
                    <div style={{ color: '#6b6b77', fontSize: 12 }}>Joining Date</div>
                    <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.joiningDate}</div>
                  </div>
                  <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                    <div style={{ color: '#6b6b77', fontSize: 12 }}>Designation</div>
                    <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.role}</div>
                  </div>
                  <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                    <div style={{ color: '#6b6b77', fontSize: 12 }}>Region</div>
                    <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.region}</div>
                  </div>
                </div>
              </SimpleModal>
            )}
          </section>
        ) : activeNav === "Marketing" ? (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
              <div>
                <h2 style={{ margin: 0 }}>Marketing Team</h2>
                <div style={{ color: '#7a748e', fontSize: 13, marginTop: 4 }}>Marketing experts working under your branch</div>
              </div>
            </div>
            <table className="clients-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Joining Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {branchMarketing.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.joiningDate}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="table-action" onClick={() => openEmployeeInfo(emp)}>Info</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedEmployeeInfo && (
              <SimpleModal onClose={closeEmployeeInfo}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <div>
                    <h3 style={{ margin: 0 }}>Marketing — {selectedEmployeeInfo.name}</h3>
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
                    <div style={{ color: '#6b6b77', fontSize: 12 }}>Joining Date</div>
                    <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.joiningDate}</div>
                  </div>
                  <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                    <div style={{ color: '#6b6b77', fontSize: 12 }}>Designation</div>
                    <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.role}</div>
                  </div>
                  <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                    <div style={{ color: '#6b6b77', fontSize: 12 }}>Region</div>
                    <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.region}</div>
                  </div>
                </div>
              </SimpleModal>
            )}
          </section>
        ) : activeNav === "Revenue" ? (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
              <div>
                <h2 style={{ margin: 0 }}>Regional Revenue</h2>
                <div style={{ color: '#7a748e', fontSize: 13, marginTop: 4 }}>Revenue breakdown by region</div>
              </div>
            </div>
            <table className="clients-table">
              <thead>
                <tr>
                  <th>Region Name</th>
                  <th>Manager Name</th>
                  <th>Revenue (This Month)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {regionalRevenue.map((item) => (
                  <tr key={item.id}>
                    <td>{item.region}</td>
                    <td>{item.manager}</td>
                    <td>{item.revenue}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="table-action" onClick={() => setSelectedRegionRevenue(item)}>View Chart</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedRegionRevenue && (
              <SimpleModal onClose={() => setSelectedRegionRevenue(null)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <div>
                    <h3 style={{ margin: 0 }}>Revenue Chart — {selectedRegionRevenue.region}</h3>
                    <div style={{ color: '#7a748e', fontSize: 13 }}>Manager: {selectedRegionRevenue.manager}</div>
                  </div>
                </div>
                <div style={{ marginTop: 24, padding: '12px 0' }}>
                  <PerformanceChart series={selectedRegionRevenue.series} label={`${selectedRegionRevenue.region} Monthly Trend`} />
                </div>
              </SimpleModal>
            )}
          </section>
        ) : (
          <section>
            <div className="kpi-activity-row" style={{ display: 'flex', gap: 18, alignItems: 'stretch', width: '100%' }}>
              <section className="kpi-grid" style={{ flex: '2 1 0%', minWidth: 0 }}>
                {kpiCards.map((card) => (
                  <KpiCard key={card.label} card={card} />
                ))}
              </section>

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
                    <div className="activity-row" style={{ height: 64 }}>
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
                  <BranchRevenueChart data={branchRevenueData} />
                </div>
              </div>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
