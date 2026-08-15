import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import ActivityStatusBar from "../../components/dashboard/ActivityStatusBar";
import { ACTIVITY_STAGES } from "../Admin/mockAdminData";

const navItems = [
  { icon: "dashboard", label: "Dashboard" },
  { icon: "clients", label: "Clients" },
  { icon: "team", label: "Employees" },
  { icon: "revenue", label: "Revenue" },
  { icon: "invoice", label: "Invoice" },
  { icon: "requests", label: "Requests" },
  { icon: "reports", label: "Reports" },
];

const revenueKpiCards = [
  {
    label: "Daily Revenue",
    value: "₹14,250",
    trend: "+12%",
    description: "Generated today",
    accent: "#10b981",
    icon: "revenue",
    linkTo: "Revenue",
    slug: "daily-revenue"
  },
  {
    label: "Weekly Revenue",
    value: "₹98,400",
    trend: "+15%",
    description: "This week's collection",
    accent: "#6366f1",
    icon: "revenue",
    linkTo: "Revenue",
    slug: "weekly-revenue"
  },
  {
    label: "Monthly Revenue",
    value: "₹2,78,800",
    trend: "+22%",
    description: "Compared to last month",
    accent: "#f59e0b",
    icon: "revenue",
    linkTo: "Revenue",
    slug: "monthly-revenue"
  },
  {
    label: "Yearly Revenue",
    value: "₹32,45,000",
    trend: "+28%",
    description: "FY 2026-27 annual total",
    accent: "#8b5cf6",
    icon: "revenue",
    linkTo: "Revenue",
    slug: "yearly-revenue"
  },
  {
    label: "Total Payment Received",
    value: "₹24,80,000",
    trend: "+94%",
    description: "Collected from invoices",
    accent: "#059669",
    icon: "overview",
    linkTo: "Invoice",
    slug: "payment-received"
  },
  {
    label: "Total Payment Pending",
    value: "₹7,65,000",
    trend: "Outstanding",
    description: "Pending client dues",
    accent: "#dc2626",
    icon: "bell",
    linkTo: "Invoice",
    slug: "payment-pending"
  }
];

const workforceKpiCards = [
  {
    label: "Total Clients",
    value: "248",
    trend: "+18%",
    description: "Active client accounts",
    accent: "#3b82f6",
    icon: "clients",
    linkTo: "Clients",
    slug: "clients"
  },
  {
    label: "Total Branch Managers",
    value: "7",
    trend: "+5%",
    description: "Branch performance leads",
    accent: "#0284c7",
    icon: "branches",
    linkTo: "Employees",
    employeeRole: "branch manager",
    slug: "branch-managers"
  },
  {
    label: "Total Managers",
    value: "42",
    trend: "+8%",
    description: "Regional sales leads",
    accent: "#4f46e5",
    icon: "team",
    linkTo: "Employees",
    employeeRole: "manager",
    slug: "managers"
  },
  {
    label: "Sales Persons",
    value: "124",
    trend: "+12%",
    description: "Active sales reps",
    accent: "#14b8a6",
    icon: "team",
    linkTo: "Employees",
    employeeRole: "sales",
    slug: "sales"
  }
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
  const navigate = useNavigate();
  const location = useLocation();

  const urlToNavMap = React.useMemo(() => ({
    dashboard: "Dashboard",
    overview: "Dashboard",
    clients: "Clients",
    revenue: "Revenue",
    reports: "Reports",
    employees: "Employees",
    requests: "Requests",
    invoice: "Invoice"
  }), []);

  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentSlug = pathParts[1] || "dashboard";
  const activeNav = urlToNavMap[currentSlug.toLowerCase()] || "Dashboard";

  const handleNavChange = (label) => {
    const slug = label.toLowerCase();
    navigate(`/owner/${slug}`);
  };

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
  const [clients, setClients] = React.useState(() => {
    try {
      const saved = localStorage.getItem("agni_branch_clients");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((c, i) => ({
            id: c.id || i + 1,
            name: c.name,
            company: c.company,
            email: c.email,
            phone: c.phone,
            serviceType: c.scheme ? (c.scheme.includes('Grant') ? 'IT' : c.scheme.includes('Certificate') ? 'Certificate' : 'Marketing') : 'Certificate',
            serviceName: c.scheme || 'Mudra Export Certification',
            serviceStart: c.submissionDate || '2026-01-15',
            totalPayment: c.totalPayment || 120000,
            paymentReceived: c.paymentStatus === 'Paid' ? (c.totalPayment || 120000) : Math.round((c.totalPayment || 120000) * 0.6),
            branch: c.branch ? c.branch.split(' ')[0] : 'North',
            salesPerson: c.assignedSalesPerson || 'Mia Ross',
            progressPercent: c.progress || (c.completedSteps ? c.completedSteps.length * 20 : 60),
            completedSteps: c.completedSteps || (c.progress ? ACTIVITY_STAGES.slice(0, Math.round(c.progress / 20)).map(s => s.name) : ["Submission", "Doc Audit", "Manager Review"]),
            applicationStatus: c.applicationStatus || "Manager Review",
          }));
        }
      }
    } catch (e) {
      console.warn("Failed to load clients in owner dashboard", e);
    }
    return [
      { id: 1, name: 'Acme Industries', company: 'Acme Industries Pvt. Ltd.', email: 'contact@acme.com', phone: '+91 98765 43210', serviceType: 'Certificate', serviceName: 'Mudra Export Certification', serviceStart: '2026-01-15', totalPayment: 120000, paymentReceived: 80000, branch: 'North', salesPerson: 'Mia Ross', progressPercent: 80, completedSteps: ["Submission", "Doc Audit", "Manager Review", "Agreement"], applicationStatus: "Agreement" },
      { id: 2, name: 'Summit Co', company: 'Summit Co.', email: 'hello@summitco.com', phone: '+91 91234 56789', serviceType: 'IT', serviceName: 'Enterprise CRM Setup', serviceStart: '2026-03-01', totalPayment: 85000, paymentReceived: 50000, branch: 'South', salesPerson: 'Mia Ross', progressPercent: 60, completedSteps: ["Submission", "Doc Audit", "Manager Review"], applicationStatus: "Manager Review" },
      { id: 3, name: 'Blue Retail', company: 'Blue Retail Pvt Ltd', email: 'info@blueretail.com', phone: '+91 99876 54321', serviceType: 'Marketing', serviceName: 'Website & Brand Growth Suite', serviceStart: '2026-05-20', totalPayment: 60000, paymentReceived: 60000, branch: 'East', salesPerson: 'Mia Ross', progressPercent: 100, completedSteps: ["Submission", "Doc Audit", "Manager Review", "Agreement", "Final Approval"], applicationStatus: "Final Approval" },
      { id: 4, name: 'Nexus Logistics', company: 'Nexus Logistics Solutions', email: 'support@nexuslogistics.com', phone: '+91 98111 22233', serviceType: 'IT', serviceName: 'Supply Chain Analytics Platform', serviceStart: '2026-06-10', totalPayment: 150000, paymentReceived: 100000, branch: 'West', salesPerson: 'Alex Vance', progressPercent: 40, completedSteps: ["Submission", "Doc Audit"], applicationStatus: "Doc Audit" },
      { id: 5, name: 'Apex Healthcare', company: 'Apex Healthcare Systems', email: 'info@apexhealth.com', phone: '+91 97222 33344', serviceType: 'Certificate', serviceName: 'Corporate Health Shield Annual', serviceStart: '2026-08-01', totalPayment: 42000, paymentReceived: 42000, branch: 'North', salesPerson: 'Alex Vance', progressPercent: 100, completedSteps: ["Submission", "Doc Audit", "Manager Review", "Agreement", "Final Approval"], applicationStatus: "Final Approval" },
    ];
  });
  const [serviceFilter, setServiceFilter] = React.useState("");
  const [revenueRange, setRevenueRange] = React.useState("monthly");
  const [employeesList, setEmployeesList] = React.useState([
    { id: 1, name: 'Ariana Lee', email: 'ariana@agni.com', phone: '+91 91234 00111', role: 'branch manager', branch: 'North', region: 'North Zone', reportingManager: 'Devika Shah' },
    { id: 2, name: 'Eli Brooks', email: 'eli@agni.com', phone: '+91 91234 00222', role: 'manager', branch: 'North', region: 'North Zone', branchManager: 'Ariana Lee', reportingManager: 'Ariana Lee' },
    { id: 3, name: 'Mia Ross', email: 'mia@agni.com', phone: '+91 91234 10101', role: 'sales', branch: 'North', region: 'North Zone', branchManager: 'Ariana Lee', reportingManager: 'Eli Brooks' },
    { id: 4, name: 'Noah Kim', email: 'noah@agni.com', phone: '+91 91234 10202', role: 'IT', branch: 'North', region: 'North Zone', branchManager: 'Ariana Lee', reportingManager: 'Ariana Lee' },
    { id: 5, name: 'Sara Kim', email: 'sara@agni.com', phone: '+91 91234 20202', role: 'admin', branch: 'North', region: 'North Zone', branchManager: 'Ariana Lee', reportingManager: 'Ariana Lee' },
    { id: 6, name: 'Daniel Cruz', email: 'daniel@agni.com', phone: '+91 91234 30303', role: 'market', branch: 'North', region: 'North Zone', branchManager: 'Ariana Lee', reportingManager: 'Ariana Lee' },
    { id: 7, name: 'Priya Menon', email: 'priya@agni.com', phone: '+91 91234 40404', role: 'admin', branch: 'South', region: 'South Zone', branchManager: 'Ariana Lee', reportingManager: 'Ariana Lee' },
    { id: 8, name: 'Alex Vance', email: 'alex@agni.com', phone: '+91 91234 50505', role: 'sales', branch: 'North', region: 'North Zone', branchManager: 'Ariana Lee', reportingManager: 'Eli Brooks' },
  ]);
  const [salesClientsView, setSalesClientsView] = React.useState(null);
  const [managerTeamView, setManagerTeamView] = React.useState(null);
  const [managerTeamSearch, setManagerTeamSearch] = React.useState("");

  function getClientsForEmployee(emp) {
    if (!emp) return [];
    const empRole = (emp.role || '').toLowerCase();
    const empName = (emp.name || '').toLowerCase();
    const empBranch = (emp.branch || '').toLowerCase();

    let matched = clients.filter(c => 
      (c.assignedPerson && c.assignedPerson.toLowerCase() === empName) ||
      (c.salesPerson && c.salesPerson.toLowerCase() === empName)
    );

    if (matched.length > 0) return matched;

    if (empRole === 'it') {
      matched = clients.filter(c => (c.serviceType || '').toLowerCase() === 'it');
    } else if (empRole === 'market') {
      matched = clients.filter(c => (c.serviceType || '').toLowerCase() === 'marketing');
    } else if (empRole === 'admin') {
      matched = clients.filter(c => (c.serviceType || '').toLowerCase() === 'certificate' || (c.branch || '').toLowerCase() === empBranch);
    } else if (empRole === 'sales') {
      matched = clients.filter(c => (c.branch || '').toLowerCase() === empBranch || c.salesPerson);
    }

    return matched.length > 0 ? matched : clients;
  }

  const branchToRegionMap = {
    'North': 'North Zone',
    'South': 'South Zone',
    'East': 'East Zone',
    'West': 'West Zone',
    'Central': 'Central Zone'
  };

  function getTeamForManager(mgr) {
    if (!mgr) return [];
    const mgrName = (mgr.name || '').toLowerCase();
    const mgrBranch = (mgr.branch || '').toLowerCase();
    const mgrRole = (mgr.role || '').toLowerCase();
    const mgrRegion = (mgr.region || branchToRegionMap[mgr.branch] || '').toLowerCase();

    return employeesList.filter(emp => {
      if (emp.id === mgr.id) return false;
      const empRole = (emp.role || '').toLowerCase();
      const empRM = (emp.reportingManager || '').toLowerCase();
      const empBM = (emp.branchManager || '').toLowerCase();
      const empBranch = (emp.branch || '').toLowerCase();
      const empRegion = (emp.region || branchToRegionMap[emp.branch] || '').toLowerCase();

      if (mgrRole === 'branch manager') {
        // Marketing, IT, Admin, and Managers report directly to Branch Manager
        if (['market', 'it', 'admin', 'manager'].includes(empRole)) {
          return empBM === mgrName || empRM === mgrName || empBranch === mgrBranch;
        }
        return empBM === mgrName || empRM === mgrName || empBranch === mgrBranch;
      } else if (mgrRole === 'manager') {
        // Manager leads the Sales team
        if (empRole === 'sales') {
          return empRM === mgrName || empRegion === mgrRegion || empBranch === mgrBranch;
        }
        return empRM === mgrName;
      }
      return false;
    });
  }
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
    { label: 'Central', value: 'Central' },
  ];

  const regionOptions = [
    { label: 'All regions', value: '' },
    { label: 'North Zone', value: 'North Zone' },
    { label: 'South Zone', value: 'South Zone' },
    { label: 'East Zone', value: 'East Zone' },
    { label: 'West Zone', value: 'West Zone' },
    { label: 'Central Zone', value: 'Central Zone' },
  ];

  const PAGE_SIZE = 15;

  const [invoices, setInvoices] = React.useState([
    {
      id: "INV-2026-001",
      clientName: "Acme Industries",
      company: "Acme Industries Pvt. Ltd.",
      serviceName: "Mudra Export Certification",
      branch: "North",
      region: "North Zone",
      issueDate: "15 Jan 2026",
      dueDate: "30 Jan 2026",
      amount: "₹1,20,000",
      rawAmount: 120000,
      tax: "₹21,600 (18% GST)",
      totalAmount: "₹1,41,600",
      rawTotal: 141600,
      status: "Paid",
      accountManager: "Ariana Lee",
      gstNo: "27AAACA0000A1Z5"
    },
    {
      id: "INV-2026-002",
      clientName: "Summit Co",
      company: "Summit Co.",
      serviceName: "Enterprise CRM Setup",
      branch: "South",
      region: "South Zone",
      issueDate: "01 Mar 2026",
      dueDate: "15 Mar 2026",
      amount: "₹85,000",
      rawAmount: 85000,
      tax: "₹15,300 (18% GST)",
      totalAmount: "₹1,00,300",
      rawTotal: 100300,
      status: "Paid",
      accountManager: "Eli Brooks",
      gstNo: "33AAACS1234B1Z2"
    },
    {
      id: "INV-2026-003",
      clientName: "Blue Retail",
      company: "Blue Retail Pvt Ltd",
      serviceName: "Website & Brand Growth Suite",
      branch: "East",
      region: "East Zone",
      issueDate: "20 May 2026",
      dueDate: "05 Jun 2026",
      amount: "₹60,000",
      rawAmount: 60000,
      tax: "₹10,800 (18% GST)",
      totalAmount: "₹70,800",
      rawTotal: 70800,
      status: "Paid",
      accountManager: "Mia Ross",
      gstNo: "19AAACB9876C1Z9"
    },
    {
      id: "INV-2026-004",
      clientName: "Nexus Logistics",
      company: "Nexus Logistics Solutions",
      serviceName: "Supply Chain Analytics Platform",
      branch: "West",
      region: "West Zone",
      issueDate: "10 Jun 2026",
      dueDate: "25 Jun 2026",
      amount: "₹1,50,000",
      rawAmount: 150000,
      tax: "₹27,000 (18% GST)",
      totalAmount: "₹1,77,000",
      rawTotal: 177000,
      status: "Pending",
      accountManager: "Noah Kim",
      gstNo: "24AAACN5544D1Z7"
    },
    {
      id: "INV-2026-005",
      clientName: "Apex Healthcare",
      company: "Apex Healthcare Systems",
      serviceName: "Corporate Health Shield Annual",
      branch: "North",
      region: "North Zone",
      issueDate: "01 Aug 2026",
      dueDate: "15 Aug 2026",
      amount: "₹42,000",
      rawAmount: 42000,
      tax: "₹7,560 (18% GST)",
      totalAmount: "₹49,560",
      rawTotal: 49560,
      status: "Pending",
      accountManager: "Sara Kim",
      gstNo: "27AAACA9911E1Z3"
    },
    {
      id: "INV-2026-006",
      clientName: "Vanguard Tech",
      company: "Vanguard Tech Innovations",
      serviceName: "Cloud Security & Audit Compliance",
      branch: "Central",
      region: "Central Zone",
      issueDate: "12 Jul 2026",
      dueDate: "27 Jul 2026",
      amount: "₹95,000",
      rawAmount: 95000,
      tax: "₹17,100 (18% GST)",
      totalAmount: "₹1,12,100",
      rawTotal: 112100,
      status: "Overdue",
      accountManager: "Daniel Cruz",
      gstNo: "23AAACV3322F1Z8"
    },
    {
      id: "INV-2026-007",
      clientName: "Zenith Financials",
      company: "Zenith Advisory & Capital Ltd",
      serviceName: "FinTech Compliance Certification",
      branch: "South",
      region: "South Zone",
      issueDate: "05 Feb 2026",
      dueDate: "20 Feb 2026",
      amount: "₹1,10,000",
      rawAmount: 110000,
      tax: "₹19,800 (18% GST)",
      totalAmount: "₹1,29,800",
      rawTotal: 129800,
      status: "Paid",
      accountManager: "Priya Menon",
      gstNo: "33AAACZ7788G1Z1"
    },
    {
      id: "INV-2026-008",
      clientName: "Horizon Real Estate",
      company: "Horizon Infra Projects Pvt Ltd",
      serviceName: "Digital Marketing & Campaign Setup",
      branch: "East",
      region: "East Zone",
      issueDate: "18 Apr 2026",
      dueDate: "03 May 2026",
      amount: "₹75,000",
      rawAmount: 75000,
      tax: "₹13,500 (18% GST)",
      totalAmount: "₹88,500",
      rawTotal: 88500,
      status: "Paid",
      accountManager: "Lily Chen",
      gstNo: "19AAACH4455H1Z4"
    }
  ]);
  const [invoiceBranchFilter, setInvoiceBranchFilter] = React.useState("");
  const [invoiceRegionFilter, setInvoiceRegionFilter] = React.useState("");
  const [invoiceStatusFilter, setInvoiceStatusFilter] = React.useState("");
  const [invoiceSearch, setInvoiceSearch] = React.useState("");
  const [invoicePage, setInvoicePage] = React.useState(1);
  const [selectedInvoice, setSelectedInvoice] = React.useState(null);
  const [invoiceDownloadNotice, setInvoiceDownloadNotice] = React.useState(null);

  // Requests State (Branch Manager Requests sent to Owner for review)
  const [requestsList, setRequestsList] = React.useState([
    {
      id: "RQ-1001",
      clientId: 1,
      clientName: "Acme Industries",
      requester: "Ariana Lee",
      role: "branch manager",
      branch: "North",
      region: "North Zone",
      managerName: "Ariana Lee (Branch Manager)",
      requestType: "Edit Client",
      requestedChanges: [
        { field: "Company Name", oldValue: "Acme Industries Pvt. Ltd.", newValue: "Acme Global Solutions Pvt Ltd" },
        { field: "Phone Number", oldValue: "+91 98765 43210", newValue: "+91 98765 43999" },
      ],
      reason: "Branch Manager requested update for company legal name & primary phone number after branch audit.",
      status: "Pending",
      createdAt: "2026-08-01",
      decisionDate: null,
      managerRemarks: null,
    },
    {
      id: "RQ-1002",
      clientId: 2,
      clientName: "Summit Co",
      requester: "Ariana Lee",
      role: "branch manager",
      branch: "South",
      region: "South Zone",
      managerName: "Ariana Lee (Branch Manager)",
      requestType: "Delete Client",
      requestedChanges: [],
      reason: "Branch Manager requested account termination following business closure.",
      status: "Pending",
      createdAt: "2026-08-05",
      decisionDate: null,
      managerRemarks: null,
    },
    {
      id: "RQ-1003",
      clientId: 3,
      clientName: "Blue Retail",
      requester: "Ariana Lee",
      role: "branch manager",
      branch: "East",
      region: "East Zone",
      managerName: "Ariana Lee (Branch Manager)",
      requestType: "Edit Client",
      requestedChanges: [
        { field: "GST Number", oldValue: "27LMNOP4321D1Z3", newValue: "27LMNOP4321D1Z8" },
        { field: "Address", oldValue: "17 Industrial Park, Surat", newValue: "17 Industrial Park, Phase 2, Surat" }
      ],
      reason: "Branch Manager submitted verified GST certificate and address update.",
      status: "Approved",
      createdAt: "2026-06-12",
      decisionDate: "2026-06-15",
      managerRemarks: "Approved by Owner after verifying GST documentation.",
    },
    {
      id: "RQ-1004",
      clientId: 4,
      clientName: "Nexus Logistics",
      requester: "Ariana Lee",
      role: "branch manager",
      branch: "West",
      region: "West Zone",
      managerName: "Ariana Lee (Branch Manager)",
      requestType: "Delete Client",
      requestedChanges: [],
      reason: "Branch Manager requested duplicate client account deletion.",
      status: "Rejected",
      createdAt: "2026-05-10",
      decisionDate: "2026-05-12",
      managerRemarks: "Rejected by Owner: Active contract is still running.",
    },
    {
      id: "RQ-1005",
      clientId: 5,
      clientName: "Apex Healthcare",
      requester: "Ariana Lee",
      role: "branch manager",
      branch: "North",
      region: "North Zone",
      managerName: "Ariana Lee (Branch Manager)",
      requestType: "Edit Client",
      requestedChanges: [
        { field: "Contact Person", oldValue: "Deepa Joshi", newValue: "Deepa Joshi-Singh" },
        { field: "Email", oldValue: "info@apexhealth.com", newValue: "contact@apexhealth.com" }
      ],
      reason: "Branch Manager submitted updated primary contact details after executive transition.",
      status: "Cancelled",
      createdAt: "2026-04-02",
      decisionDate: "2026-04-03",
      managerRemarks: "Cancelled by branch manager prior to review.",
    }
  ]);

  const [requestsActiveTab, setRequestsActiveTab] = React.useState("Pending Requests");
  const [historyMonthFilter, setHistoryMonthFilter] = React.useState("All");
  const [historyYearFilter, setHistoryYearFilter] = React.useState("All");
  const [historyStatusFilter, setHistoryStatusFilter] = React.useState("All");

  const [selectedRequest, setSelectedRequest] = React.useState(null);
  const [notification, setNotification] = React.useState("");
  const [ownerRemarksInput, setOwnerRemarksInput] = React.useState("");

  const monthNamesList = ["All", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function handleApproveRequest(reqId, remarks) {
    const today = new Date().toISOString().split("T")[0];
    setRequestsList(prev => prev.map(r => {
      if (r.id === reqId) {
        return {
          ...r,
          status: "Approved",
          decisionDate: today,
          managerRemarks: remarks || "Approved by Owner."
        };
      }
      return r;
    }));
    setNotification(`Request ${reqId} has been Approved.`);
    setTimeout(() => setNotification(""), 4200);
  }

  function handleRejectRequest(reqId, remarks) {
    const today = new Date().toISOString().split("T")[0];
    setRequestsList(prev => prev.map(r => {
      if (r.id === reqId) {
        return {
          ...r,
          status: "Rejected",
          decisionDate: today,
          managerRemarks: remarks || "Rejected by Owner."
        };
      }
      return r;
    }));
    setNotification(`Request ${reqId} has been Rejected.`);
    setTimeout(() => setNotification(""), 4200);
  }

  function handleCancelRequest(reqId) {
    const today = new Date().toISOString().split("T")[0];
    setRequestsList(prev => prev.map(r => {
      if (r.id === reqId) {
        return {
          ...r,
          status: "Cancelled",
          decisionDate: today,
          managerRemarks: "Cancelled by requester."
        };
      }
      return r;
    }));
    setNotification(`Request ${reqId} cancelled.`);
    setTimeout(() => setNotification(""), 4200);
  }

  function handleCreateRequestSubmit() {
    if (!createSelectedType || !createSelectedClientId) return;
    const client = clients.find(c => String(c.id) === String(createSelectedClientId));
    if (!client) return;

    const newId = `RQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toISOString().split("T")[0];

    const requestedChanges = createSelectedType === "Delete Client" ? [] : [
      { field: "Client Name", oldValue: client.name, newValue: createFormValues.name },
      { field: "Company Name", oldValue: client.company, newValue: createFormValues.company },
      { field: "Email", oldValue: client.email, newValue: createFormValues.email },
      { field: "Phone", oldValue: client.phone, newValue: createFormValues.phone },
      { field: "Branch", oldValue: client.branch, newValue: createFormValues.branch }
    ].filter(change => change.oldValue !== change.newValue);

    const newReq = {
      id: newId,
      clientId: client.id,
      clientName: client.name,
      requester: "Owner Workspace",
      role: "Owner",
      branch: client.branch || "North",
      region: "North Zone",
      managerName: "Ariana Lee",
      requestType: createSelectedType,
      requestedChanges,
      reason: createReason.trim() || "Operational update request.",
      status: "Pending",
      createdAt: today,
      decisionDate: null,
      managerRemarks: null
    };

    setRequestsList([newReq, ...requestsList]);
    setShowCreateModal(false);
    setCreateStep(1);
    setCreateSelectedType("");
    setCreateSelectedClientId("");
    setCreateReason("");
    setNotification(`Request ${newId} created successfully.`);
    setTimeout(() => setNotification(""), 4200);
  }

  const filteredInvoices = invoices.filter((inv) => {
    const branchOk = !invoiceBranchFilter || inv.branch === invoiceBranchFilter;
    const regionOk = !invoiceRegionFilter || inv.region === invoiceRegionFilter;
    const statusOk = !invoiceStatusFilter || inv.status === invoiceStatusFilter;
    const searchLower = invoiceSearch.toLowerCase().trim();
    const searchOk = !searchLower ||
      inv.id.toLowerCase().includes(searchLower) ||
      inv.clientName.toLowerCase().includes(searchLower) ||
      inv.company.toLowerCase().includes(searchLower) ||
      inv.serviceName.toLowerCase().includes(searchLower);
    return branchOk && regionOk && statusOk && searchOk;
  });

  const invoiceTotalPages = Math.max(1, Math.ceil(filteredInvoices.length / PAGE_SIZE));
  const invoicePageItems = filteredInvoices.slice((invoicePage - 1) * PAGE_SIZE, invoicePage * PAGE_SIZE);

  const totalInvoicedAmount = filteredInvoices.reduce((sum, inv) => sum + (inv.rawTotal || 0), 0);
  const totalPaidAmount = filteredInvoices.filter(i => i.status === 'Paid').reduce((sum, inv) => sum + (inv.rawTotal || 0), 0);
  const totalPendingAmount = filteredInvoices.filter(i => i.status !== 'Paid').reduce((sum, inv) => sum + (inv.rawTotal || 0), 0);

  function downloadInvoiceFile(inv) {
    const fileContent = `
====================================================================
                        AGNI CRM - OFFICIAL CLIENT INVOICE
====================================================================
Invoice Number  : ${inv.id}
Client Name     : ${inv.company}
Service Line    : ${inv.serviceName}
Branch          : ${inv.branch}
Region Name     : ${inv.region}
Issue Date      : ${inv.issueDate}
Due Date        : ${inv.dueDate}
Account Manager : ${inv.accountManager}
GSTIN / Reg No  : ${inv.gstNo}
--------------------------------------------------------------------
Base Fee        : ${inv.amount}
Applicable GST  : ${inv.tax}
TOTAL AMOUNT    : ${inv.totalAmount}
PAYMENT STATUS  : ${inv.status.toUpperCase()}
--------------------------------------------------------------------
Thank you for choosing AgniCRM Enterprise Services.
For billing support contact: billing@agnicrm.com
====================================================================
`.trim();

    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${inv.id}_${inv.clientName.replace(/\s+/g, '_')}_Invoice.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setInvoiceDownloadNotice(`Downloaded official invoice receipt for ${inv.id}!`);
  }
  const employeeRoles = ['All roles', 'branch manager', 'manager', 'IT', 'admin', 'market', 'sales', 'hr'];
  // Pagination state
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
        onNavChange={handleNavChange}
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
                  <th>Client Name</th>
                  <th>Company</th>
                  <th>Contact Info</th>
                  <th>Service</th>
                  <th>Activity Status (5 Points)</th>
                  <th>Progress (%)</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clientsPageItems.map(client => {
                  const completed = client.completedSteps || (
                    client.progressPercent ? ACTIVITY_STAGES.slice(0, Math.round(client.progressPercent / 20)).map(s => s.name) : ["Submission", "Doc Audit", "Manager Review"]
                  );

                  return (
                    <tr key={client.id}>
                      <td><strong style={{ color: '#1e293b' }}>{client.name}</strong></td>
                      <td style={{ color: '#64748b' }}>{client.company}</td>
                      <td>
                        <div style={{ fontSize: 13 }}>{client.email}</div>
                        <div style={{ fontSize: 12, color: '#7a748e' }}>{client.phone}</div>
                      </td>
                      <td>
                        <span style={{ padding: '3px 8px', borderRadius: 6, background: '#f1f5f9', fontSize: 12, fontWeight: 600, color: '#475569' }}>
                          {client.serviceName || client.serviceType}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              padding: '2px 8px',
                              borderRadius: 999,
                              background: 'rgba(16, 185, 129, 0.12)',
                              color: '#059669',
                              fontWeight: 700,
                              fontSize: 11.5,
                              width: 'fit-content'
                            }}
                          >
                            ● {client.applicationStatus || (completed.length > 0 ? completed[completed.length - 1] : "Submission")}
                          </span>
                          {/* 5 mini dots */}
                          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                            {ACTIVITY_STAGES.map((st) => {
                              const isDone = completed.includes(st.name);
                              return (
                                <span
                                  key={st.name}
                                  title={`${st.name} (${st.percent}%) - ${isDone ? "Completed" : "Pending"}`}
                                  style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    background: isDone ? '#10b981' : '#cbd5e1'
                                  }}
                                />
                              );
                            })}
                            <span style={{ fontSize: 10.5, color: '#64748b', marginLeft: 4 }}>
                              {completed.length}/5 Points
                            </span>
                          </div>
                        </div>
                      </td>
                      <td style={{ minWidth: 130 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ flex: 1, height: 8, background: '#e2e8f0', borderRadius: 999, overflow: 'hidden' }}>
                            <div style={{
                              width: `${client.progressPercent || 60}%`,
                              height: '100%',
                              background: (client.progressPercent || 60) === 100 ? '#10b981' : 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                              borderRadius: 999
                            }} />
                          </div>
                          <strong style={{ fontSize: 12, color: (client.progressPercent || 60) === 100 ? '#10b981' : '#1e293b' }}>
                            {client.progressPercent || 60}%
                          </strong>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <button className="table-action" onClick={() => openClientInfo(client)}>Info &amp; Tracker</button>
                        <button className="table-action danger" onClick={() => openDeleteConfirm('client', client)}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
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
          managerTeamView ? (
            <section style={{ animation: 'fadeIn 0.25s ease-out' }}>
              {/* Top Hero Banner */}
              {/* Header Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button
                      type="button"
                      className="table-action"
                      onClick={() => setManagerTeamView(null)}
                      style={{ padding: '7px 14px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}
                    >
                      ← Back to Employees
                    </button>
                    <div>
                      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>
                        Team Under — {managerTeamView.name}
                      </h2>
                      <div style={{ color: '#7a748e', fontSize: 13, marginTop: 2 }}>
                        Designation: {managerTeamView.role.toUpperCase()} | Branch: {managerTeamView.branch} | Email: {managerTeamView.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              {(() => {
                const team = getTeamForManager(managerTeamView);
                const uniqueRoles = Array.from(new Set(team.map(t => t.role)));

                return (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 22 }}>
                      <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: 14, border: '1px solid #eef0f5', display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ background: 'rgba(78, 124, 255, 0.12)', color: '#4e7cff', padding: 14, borderRadius: 12, display: 'flex' }}>
                          <Icon name="team" size={24} />
                        </div>
                        <div>
                          <div style={{ fontSize: 22, fontWeight: 700, color: '#1e1b2e' }}>{team.length}</div>
                          <div style={{ fontSize: 12, color: '#7a748e', marginTop: 2, fontWeight: 500 }}>Team Members</div>
                        </div>
                      </div>

                      <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: 14, border: '1px solid #eef0f5', display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ background: 'rgba(99, 102, 241, 0.12)', color: '#6366f1', padding: 14, borderRadius: 12, display: 'flex' }}>
                          <Icon name="roles" size={24} />
                        </div>
                        <div>
                          <div style={{ fontSize: 22, fontWeight: 700, color: '#1e1b2e' }}>{uniqueRoles.length}</div>
                          <div style={{ fontSize: 12, color: '#7a748e', marginTop: 2, fontWeight: 500 }}>Role Types</div>
                        </div>
                      </div>

                      <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: 14, border: '1px solid #eef0f5', display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ background: 'rgba(68, 191, 176, 0.12)', color: '#2b9385', padding: 14, borderRadius: 12, display: 'flex' }}>
                          <Icon name="branches" size={24} />
                        </div>
                        <div>
                          <div style={{ fontSize: 22, fontWeight: 700, color: '#2b9385' }}>{managerTeamView.branch}</div>
                          <div style={{ fontSize: 12, color: '#7a748e', marginTop: 2, fontWeight: 500 }}>Branch Scope</div>
                        </div>
                      </div>
                    </div>

                    {/* Team Members Table */}
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
                        {team.length === 0 ? (
                          <tr>
                            <td colSpan={6} style={{ textAlign: 'center', padding: 36, color: '#64748b' }}>
                              No team members under this manager.
                            </td>
                          </tr>
                        ) : (
                          team.map((member) => (
                            <tr key={member.id}>
                              <td><strong style={{ color: '#1e293b' }}>{member.name}</strong></td>
                              <td>{member.branch}</td>
                              <td>{member.email}</td>
                              <td>{member.phone}</td>
                              <td>{member.role}</td>
                              <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                                  {['branch manager', 'manager'].includes((member.role || '').toLowerCase()) && (
                                    <button
                                      className="table-action"
                                      style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#059669', fontWeight: 600, whiteSpace: 'nowrap' }}
                                      onClick={() => {
                                        setSalesClientsView(null);
                                        setManagerTeamView(member);
                                      }}
                                    >
                                      Team under
                                    </button>
                                  )}
                                  {['sales', 'it', 'admin', 'market'].includes((member.role || '').toLowerCase()) && (
                                    <button
                                      className="table-action"
                                      style={{ background: 'rgba(99, 102, 241, 0.12)', color: '#4f46e5', fontWeight: 600, whiteSpace: 'nowrap' }}
                                      onClick={() => {
                                        setManagerTeamView(null);
                                        setSalesClientsView(member);
                                      }}
                                    >
                                      Clients under
                                    </button>
                                  )}
                                  <button className="table-action" style={{ whiteSpace: 'nowrap' }} onClick={() => openEmployeeInfo(member)}>
                                    Info
                                  </button>
                                  <button className="table-action" style={{ whiteSpace: 'nowrap' }} onClick={() => openEditModal('employee', member)}>Edit</button>
                                  <button className="table-action danger" style={{ whiteSpace: 'nowrap' }} onClick={() => openDeleteConfirm('employee', member)}>Delete</button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </>
                );
              })()}
            </section>
          ) : salesClientsView ? (
            <section style={{ animation: 'fadeIn 0.25s ease-out' }}>
              {/* Header Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button
                      type="button"
                      className="table-action"
                      onClick={() => setSalesClientsView(null)}
                      style={{ padding: '7px 14px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}
                    >
                      ← Back to Employees
                    </button>
                    <div>
                      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>
                        Clients Under — {salesClientsView.name}
                      </h2>
                      <div style={{ color: '#7a748e', fontSize: 13, marginTop: 2 }}>
                        Designation: {salesClientsView.role.toUpperCase()} | Branch: {salesClientsView.branch} | Email: {salesClientsView.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              {(() => {
                const managedClients = getClientsForEmployee(salesClientsView);
                const totalVal = managedClients.reduce((sum, c) => sum + (c.totalPayment || 0), 0);
                const avgProgress = Math.round(managedClients.reduce((sum, c) => sum + (c.progressPercent || ((c.paymentReceived >= c.totalPayment) ? 100 : 70)), 0) / Math.max(1, managedClients.length));

                return (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 22 }}>
                      <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: 14, border: '1px solid #eef0f5', display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ background: 'rgba(78, 124, 255, 0.12)', color: '#4e7cff', padding: 14, borderRadius: 12, display: 'flex' }}>
                          <Icon name="clients" size={24} />
                        </div>
                        <div>
                          <div style={{ fontSize: 22, fontWeight: 700, color: '#1e1b2e' }}>{managedClients.length}</div>
                          <div style={{ fontSize: 12, color: '#7a748e', marginTop: 2, fontWeight: 500 }}>Clients Managed</div>
                        </div>
                      </div>

                      <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: 14, border: '1px solid #eef0f5', display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ background: 'rgba(99, 102, 241, 0.12)', color: '#6366f1', padding: 14, borderRadius: 12, display: 'flex' }}>
                          <Icon name="revenue" size={24} />
                        </div>
                        <div>
                          <div style={{ fontSize: 22, fontWeight: 700, color: '#1e1b2e' }}>₹{totalVal.toLocaleString()}</div>
                          <div style={{ fontSize: 12, color: '#7a748e', marginTop: 2, fontWeight: 500 }}>Total Billed Value</div>
                        </div>
                      </div>

                      <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: 14, border: '1px solid #eef0f5', display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ background: 'rgba(68, 191, 176, 0.12)', color: '#2b9385', padding: 14, borderRadius: 12, display: 'flex' }}>
                          <Icon name="overview" size={24} />
                        </div>
                        <div>
                          <div style={{ fontSize: 22, fontWeight: 700, color: '#2b9385' }}>{avgProgress}%</div>
                          <div style={{ fontSize: 12, color: '#7a748e', marginTop: 2, fontWeight: 500 }}>Avg Progress Completion</div>
                        </div>
                      </div>
                    </div>

                    {/* Managed Clients Table */}
                    <table className="clients-table">
                      <thead>
                        <tr>
                          <th>Client Name</th>
                          <th>Company</th>
                          <th>Service Line</th>
                          <th>Total Billed</th>
                          <th>Payment Received</th>
                          <th style={{ width: 190 }}>Progress Percent</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {managedClients.map((client) => {
                          const progress = client.progressPercent || ((client.paymentReceived >= client.totalPayment) ? 100 : 70);
                          const remaining = Math.max(0, (client.totalPayment || 0) - (client.paymentReceived || 0));

                          return (
                            <tr key={client.id}>
                              <td><strong style={{ color: '#1e293b' }}>{client.name}</strong></td>
                              <td style={{ color: '#64748b' }}>{client.company}</td>
                              <td>
                                <span style={{ padding: '3px 9px', borderRadius: 6, background: '#f1f5f9', fontSize: 12, fontWeight: 500, color: '#475569' }}>
                                  {client.serviceType} ({client.serviceName || 'Standard'})
                                </span>
                              </td>
                              <td><strong style={{ color: '#0f172a' }}>₹{(client.totalPayment || 0).toLocaleString()}</strong></td>
                              <td>
                                <span style={{ color: remaining === 0 ? '#16a34a' : '#d97706', fontWeight: 600 }}>
                                  ₹{(client.paymentReceived || 0).toLocaleString()}
                                </span>
                              </td>
                              <td>
                                <div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                                    <div style={{ flex: 1, height: 8, background: '#e2e8f0', borderRadius: 999, overflow: 'hidden' }}>
                                      <div style={{
                                        width: `${progress}%`,
                                        height: '100%',
                                        background: progress === 100 ? '#10b981' : 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                                        borderRadius: 999
                                      }} />
                                    </div>
                                    <span style={{
                                      fontSize: 12,
                                      fontWeight: 700,
                                      color: progress === 100 ? '#10b981' : '#1e293b',
                                      minWidth: 38
                                    }}>
                                      {progress}%
                                    </span>
                                  </div>
                                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                                    {ACTIVITY_STAGES.map((st) => {
                                      const isDone = (client.completedSteps || ACTIVITY_STAGES.slice(0, Math.round(progress / 20)).map(s => s.name)).includes(st.name);
                                      return (
                                        <span
                                          key={st.name}
                                          title={`${st.name} (${st.percent}%)`}
                                          style={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            background: isDone ? '#10b981' : '#cbd5e1'
                                          }}
                                        />
                                      );
                                    })}
                                    <span style={{ fontSize: 10, color: '#64748b', marginLeft: 2 }}>
                                      {Math.round(progress / 20)}/5 Points
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                <button className="table-action" style={{ whiteSpace: 'nowrap' }} onClick={() => openClientInfo(client)}>
                                  Info &amp; Tracker
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </>
                );
              })()}
            </section>
          ) : (
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
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                        {['branch manager', 'manager'].includes((employee.role || '').toLowerCase()) && (
                          <button
                            className="table-action"
                            style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#059669', fontWeight: 600, whiteSpace: 'nowrap' }}
                            onClick={() => {
                              setSalesClientsView(null);
                              setManagerTeamView(employee);
                            }}
                          >
                            Team under
                          </button>
                        )}
                        {['sales', 'it', 'admin', 'market'].includes((employee.role || '').toLowerCase()) && (
                          <button
                            className="table-action"
                            style={{ background: 'rgba(99, 102, 241, 0.12)', color: '#4f46e5', fontWeight: 600, whiteSpace: 'nowrap' }}
                            onClick={() => {
                              setManagerTeamView(null);
                              setSalesClientsView(employee);
                            }}
                          >
                            Clients under
                          </button>
                        )}
                        <button className="table-action" style={{ whiteSpace: 'nowrap' }} onClick={() => openEmployeeInfo(employee)}>Info</button>
                        <button className="table-action danger" style={{ whiteSpace: 'nowrap' }} onClick={() => openDeleteConfirm('employee', employee)}>Delete</button>
                      </div>
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
                <button className="table-action" disabled={employeesPage >= employeesTotalPages} onClick={() => setEmployeesPage((page) => Math.min(employeesTotalPages, page + 1))}>Next</button>
              </div>
            </div>
          </section>
        )
      ) : activeNav === "Requests" ? (
          <section style={{ animation: 'fadeIn 0.25s ease-out' }}>
            {/* Header Section */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
              <div>
                <p style={{ fontSize: 13, color: '#6366f1', fontWeight: 700, margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Requests</p>
                <h1 style={{ margin: '4px 0 0 0', fontSize: 26, fontWeight: 800, color: '#0f172a' }}>Branch Manager Requests</h1>
                <p style={{ margin: '4px 0 0 0', fontSize: 13, color: '#64748b' }}>Review and decide on operational requests submitted directly by Branch Managers</p>
              </div>
            </div>

            {/* Notification Bar */}
            {notification ? (
              <div style={{ marginBottom: 18, padding: '14px 18px', borderRadius: 12, background: "#e0f2fe", color: "#0369a1", border: "1px solid #bae6fd", fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>✓ {notification}</div>
                <button type="button" onClick={() => setNotification("")} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'inherit', fontWeight: 'bold' }}>×</button>
              </div>
            ) : null}

            {/* Tabs Navigation (Sales Person Style) */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
              {["Pending Requests", "Request History"].map((tab) => {
                const count = tab === "Pending Requests" ? requestsList.filter(r => r.status === "Pending").length : requestsList.filter(r => r.status !== "Pending").length;
                return (
                  <button
                    key={tab}
                    type="button"
                    className="table-action"
                    style={{
                      background: requestsActiveTab === tab ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)" : "#ffffff",
                      color: requestsActiveTab === tab ? "#ffffff" : "#334155",
                      border: requestsActiveTab === tab ? "none" : "1px solid #cbd5e1",
                      minWidth: 170,
                      padding: '10px 18px',
                      borderRadius: 10,
                      fontWeight: 700,
                      fontSize: 13,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      cursor: 'pointer',
                      boxShadow: requestsActiveTab === tab ? '0 4px 12px rgba(99, 102, 241, 0.25)' : 'none'
                    }}
                    onClick={() => setRequestsActiveTab(tab)}
                  >
                    <span>{tab}</span>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: 999,
                      fontSize: 11,
                      background: requestsActiveTab === tab ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                      color: requestsActiveTab === tab ? '#ffffff' : '#64748b'
                    }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* TAB 1: PENDING REQUESTS */}
            {requestsActiveTab === "Pending Requests" ? (
              <div style={{ overflowX: "auto" }}>
                <table className="clients-table" style={{ minWidth: 900 }}>
                  <thead>
                    <tr>
                      <th>Request ID</th>
                      <th>Client Name</th>
                      <th>Request Type</th>
                      <th>Requester &amp; Manager</th>
                      <th>Request Date</th>
                      <th>Status</th>
                      <th style={{ textAlign: "right" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const pending = requestsList.filter(r => r.status === "Pending");
                      if (pending.length === 0) {
                        return (
                          <tr>
                            <td colSpan={7} style={{ textAlign: 'center', padding: 36, color: '#64748b' }}>
                              No pending requests awaiting approval.
                            </td>
                          </tr>
                        );
                      }

                      return pending.map(req => (
                        <tr key={req.id}>
                          <td><span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#4f46e5' }}>{req.id}</span></td>
                          <td>
                            <strong style={{ color: '#0f172a' }}>{req.clientName}</strong>
                            {req.requestedChanges && req.requestedChanges.length > 0 && (
                              <div style={{ fontSize: 11, color: '#64748b' }}>{req.requestedChanges.length} Field Change(s)</div>
                            )}
                          </td>
                          <td>
                            <span style={{
                              padding: '4px 10px',
                              borderRadius: 6,
                              fontSize: 12,
                              fontWeight: 700,
                              background: req.requestType === 'Delete Client' ? '#fee2e2' : '#e0e7ff',
                              color: req.requestType === 'Delete Client' ? '#b91c1c' : '#4338ca'
                            }}>
                              {req.requestType}
                            </span>
                          </td>
                          <td>
                            <div style={{ fontWeight: 600, color: '#1e293b' }}>{req.requester}</div>
                            <div style={{ fontSize: 11, color: '#64748b' }}>Branch Manager • {req.branch} Branch</div>
                          </td>
                          <td><span style={{ color: '#475569', fontSize: 13 }}>{req.createdAt}</span></td>
                          <td>
                            <span style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                              padding: "4px 10px",
                              borderRadius: 999,
                              background: "#fef3c7",
                              color: "#d97706",
                              fontWeight: 700,
                              fontSize: 12
                            }}>
                              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#d97706' }} />
                              Pending
                            </span>
                          </td>
                          <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                              <button
                                className="table-action"
                                type="button"
                                style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#ffffff', border: 'none', fontWeight: 600, padding: '5px 10px', borderRadius: 6, whiteSpace: 'nowrap' }}
                                onClick={() => {
                                  setSelectedRequest(req);
                                  setOwnerRemarksInput("");
                                }}
                              >
                                View &amp; Decision
                              </button>
                              <button
                                className="table-action danger"
                                type="button"
                                style={{ whiteSpace: 'nowrap' }}
                                onClick={() => handleCancelRequest(req.id)}
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            ) : (
              /* TAB 2: REQUEST HISTORY WITH FILTERS */
              <div>
                {/* Sales-Person Style History Filter Controls */}
                {(() => {
                  const historyList = requestsList.filter(r => r.status !== "Pending");
                  const years = ["All", ...Array.from(new Set(historyList.map(r => new Date(r.createdAt).getFullYear()))).sort()];

                  const filteredHistory = historyList.filter(req => {
                    if (historyStatusFilter !== "All" && req.status !== historyStatusFilter) return false;
                    const createdDate = new Date(req.createdAt);
                    const monthName = monthNamesList[createdDate.getMonth() + 1];
                    if (historyMonthFilter !== "All" && monthName !== historyMonthFilter) return false;
                    if (historyYearFilter !== "All" && String(createdDate.getFullYear()) !== historyYearFilter) return false;
                    return true;
                  });

                  return (
                    <>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 18, background: '#ffffff', padding: '14px 18px', borderRadius: 12, border: '1px solid #eef0f5' }}>
                        <div>
                          <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>Month</label>
                          <select
                            value={historyMonthFilter}
                            onChange={(e) => setHistoryMonthFilter(e.target.value)}
                            style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13, minWidth: 140 }}
                          >
                            {monthNamesList.map(m => (
                              <option key={m} value={m}>{m}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>Year</label>
                          <select
                            value={historyYearFilter}
                            onChange={(e) => setHistoryYearFilter(e.target.value)}
                            style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13, minWidth: 120 }}
                          >
                            {years.map(y => (
                              <option key={y} value={y}>{y}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>Status</label>
                          <select
                            value={historyStatusFilter}
                            onChange={(e) => setHistoryStatusFilter(e.target.value)}
                            style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13, minWidth: 140 }}
                          >
                            <option value="All">All Statuses</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ overflowX: "auto" }}>
                        <table className="clients-table" style={{ minWidth: 940 }}>
                          <thead>
                            <tr>
                              <th>Request ID</th>
                              <th>Client Name</th>
                              <th>Request Type</th>
                              <th>Assigned Manager</th>
                              <th>Status</th>
                              <th>Decision Date</th>
                              <th style={{ textAlign: "right" }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredHistory.length === 0 ? (
                              <tr>
                                <td colSpan={7} style={{ textAlign: 'center', padding: 36, color: '#64748b' }}>
                                  No requests found matching history filters.
                                </td>
                              </tr>
                            ) : (
                              filteredHistory.map(req => {
                                const badgeBg =
                                  req.status === 'Approved' ? '#dcfce7' :
                                  req.status === 'Rejected' ? '#ffe4e6' : '#f1f5f9';

                                const badgeText =
                                  req.status === 'Approved' ? '#15803d' :
                                  req.status === 'Rejected' ? '#be123c' : '#475569';

                                return (
                                  <tr key={req.id}>
                                    <td><span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#4f46e5' }}>{req.id}</span></td>
                                    <td><strong style={{ color: '#0f172a' }}>{req.clientName}</strong></td>
                                    <td>
                                      <span style={{ padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700, background: '#f1f5f9', color: '#475569' }}>
                                        {req.requestType}
                                      </span>
                                    </td>
                                    <td><span style={{ color: '#334155' }}>{req.managerName}</span></td>
                                    <td>
                                      <span style={{ padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700, background: badgeBg, color: badgeText }}>
                                        {req.status}
                                      </span>
                                    </td>
                                    <td><span style={{ color: '#64748b', fontSize: 13 }}>{req.decisionDate || '-'}</span></td>
                                    <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                                      <button className="table-action" type="button" onClick={() => setSelectedRequest(req)}>
                                        View Details
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </section>
        ) : activeNav === "Invoice" ? (
          <section style={{ animation: 'fadeIn 0.25s ease-out' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    color: '#fff',
                    padding: '8px 12px',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)'
                  }}>
                    <Icon name="invoice" size={20} />
                  </div>
                  <div>
                    <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Client Invoices</h2>
                    <div style={{ color: '#7a748e', fontSize: 13, marginTop: 2 }}>
                      Manage, search, and track billing across all company branches &amp; regions
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <button type="button" className="table-action" onClick={() => {
                  setInvoiceBranchFilter('');
                  setInvoiceRegionFilter('');
                  setInvoiceStatusFilter('');
                  setInvoiceSearch('');
                  setInvoicePage(1);
                }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8 }}>
                  Reset all filters
                </button>
              </div>
            </div>

            {invoiceDownloadNotice && (
              <div style={{
                background: 'rgba(68, 191, 176, 0.12)',
                border: '1px solid rgba(68, 191, 176, 0.3)',
                color: '#2b9385',
                padding: '12px 18px',
                borderRadius: 10,
                marginBottom: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 13,
                boxShadow: '0 2px 8px rgba(68, 191, 176, 0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>✓</span>
                  <strong>{invoiceDownloadNotice}</strong>
                </div>
                <button type="button" onClick={() => setInvoiceDownloadNotice(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontWeight: 'bold', fontSize: 16 }}>×</button>
              </div>
            )}

            {/* Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 22 }}>
              <div style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #fbfbfe 100%)',
                padding: '18px 22px',
                borderRadius: 14,
                border: '1px solid var(--border-color, #eef0f5)',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
              }}>
                <div style={{ background: 'rgba(99, 102, 241, 0.12)', color: '#6366f1', padding: 14, borderRadius: 12, display: 'flex' }}>
                  <Icon name="invoice" size={24} />
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-main, #1e1b2e)', letterSpacing: '-0.02em' }}>
                    ₹{totalInvoicedAmount.toLocaleString()}
                  </div>
                  <div style={{ fontSize: 12, color: '#7a748e', marginTop: 2, fontWeight: 500 }}>Total Billed Value</div>
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #fbfbfe 100%)',
                padding: '18px 22px',
                borderRadius: 14,
                border: '1px solid var(--border-color, #eef0f5)',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
              }}>
                <div style={{ background: 'rgba(68, 191, 176, 0.12)', color: '#2b9385', padding: 14, borderRadius: 12, display: 'flex' }}>
                  <Icon name="arrowUp" size={24} />
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#2b9385', letterSpacing: '-0.02em' }}>
                    ₹{totalPaidAmount.toLocaleString()}
                  </div>
                  <div style={{ fontSize: 12, color: '#7a748e', marginTop: 2, fontWeight: 500 }}>Collected / Paid</div>
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #fbfbfe 100%)',
                padding: '18px 22px',
                borderRadius: 14,
                border: '1px solid var(--border-color, #eef0f5)',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
              }}>
                <div style={{ background: 'rgba(242, 170, 56, 0.12)', color: '#b87b14', padding: 14, borderRadius: 12, display: 'flex' }}>
                  <Icon name="overview" size={24} />
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#b87b14', letterSpacing: '-0.02em' }}>
                    ₹{totalPendingAmount.toLocaleString()}
                  </div>
                  <div style={{ fontSize: 12, color: '#7a748e', marginTop: 2, fontWeight: 500 }}>Pending / Overdue</div>
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #fbfbfe 100%)',
                padding: '18px 22px',
                borderRadius: 14,
                border: '1px solid var(--border-color, #eef0f5)',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
              }}>
                <div style={{ background: 'rgba(78, 124, 255, 0.12)', color: '#4e7cff', padding: 14, borderRadius: 12, display: 'flex' }}>
                  <Icon name="clients" size={24} />
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-main, #1e1b2e)', letterSpacing: '-0.02em' }}>
                    {filteredInvoices.length}
                  </div>
                  <div style={{ fontSize: 12, color: '#7a748e', marginTop: 2, fontWeight: 500 }}>Total Active Invoices</div>
                </div>
              </div>
            </div>

            {/* Glassmorphic Filter Toolbar */}
            <div style={{
              display: 'flex',
              gap: 16,
              alignItems: 'center',
              marginBottom: 18,
              flexWrap: 'wrap',
              background: 'var(--panel-bg, #ffffff)',
              padding: '14px 20px',
              borderRadius: 12,
              border: '1px solid var(--border-color, #eef0f5)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}>
              {/* Search Box */}
              <div style={{ flex: '1 1 240px', minWidth: 220, position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search by client, ID, service..."
                  value={invoiceSearch}
                  onChange={(e) => { setInvoiceSearch(e.target.value); setInvoicePage(1); }}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 34px',
                    borderRadius: 8,
                    border: '1px solid #e2e8f0',
                    fontSize: 13,
                    outline: 'none',
                    background: '#fcfcfd'
                  }}
                />
                <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 14, pointerEvents: 'none' }}>🔍</span>
              </div>

              <div>
                <label style={{ fontSize: 13, color: '#6b6b77', marginRight: 8, fontWeight: 500 }}>Branch:</label>
                <select value={invoiceBranchFilter} onChange={(e) => { setInvoiceBranchFilter(e.target.value); setInvoicePage(1); }} style={{ padding: '7px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }}>
                  {branchOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: 13, color: '#6b6b77', marginRight: 8, fontWeight: 500 }}>Region:</label>
                <select value={invoiceRegionFilter} onChange={(e) => { setInvoiceRegionFilter(e.target.value); setInvoicePage(1); }} style={{ padding: '7px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }}>
                  {regionOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: 13, color: '#6b6b77', marginRight: 8, fontWeight: 500 }}>Status:</label>
                <select value={invoiceStatusFilter} onChange={(e) => { setInvoiceStatusFilter(e.target.value); setInvoicePage(1); }} style={{ padding: '7px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }}>
                  <option value="">All status</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
            </div>

            {/* Invoices Table */}
            <table className="clients-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Client / Company</th>
                  <th>Branch</th>
                  <th>Region Name</th>
                  <th>Service Line</th>
                  <th>Total Billed</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoicePageItems.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '36px', color: '#7a748e' }}>
                      <div style={{ fontSize: 24, marginBottom: 8 }}>📑</div>
                      <div style={{ fontWeight: 600, fontSize: 15, color: '#475569' }}>No invoices found</div>
                      <div style={{ fontSize: 13, marginTop: 4 }}>Try clearing search queries or adjusting branch &amp; region filters.</div>
                    </td>
                  </tr>
                ) : (
                  invoicePageItems.map((inv) => {
                    const initials = inv.clientName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                    return (
                      <tr key={inv.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ color: '#6366f1', fontWeight: 700, fontFamily: 'monospace', fontSize: 13 }}>{inv.id}</span>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{
                              width: 32,
                              height: 32,
                              borderRadius: 8,
                              background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
                              color: '#4338ca',
                              fontWeight: 700,
                              fontSize: 12,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              {initials}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: '#1e293b' }}>{inv.clientName}</div>
                              <div style={{ fontSize: 12, color: '#64748b' }}>{inv.company}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span style={{
                            padding: '3px 9px',
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 600,
                            background: '#f1f5f9',
                            color: '#475569'
                          }}>
                            {inv.branch}
                          </span>
                        </td>
                        <td>
                          <span style={{
                            padding: '3px 9px',
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 500,
                            background: '#f8fafc',
                            color: '#64748b',
                            border: '1px solid #e2e8f0'
                          }}>
                            {inv.region}
                          </span>
                        </td>
                        <td style={{ fontSize: 13 }}>{inv.serviceName}</td>
                        <td>
                          <strong style={{ fontSize: 14, color: '#0f172a' }}>{inv.totalAmount}</strong>
                        </td>
                        <td>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                            padding: '4px 10px',
                            borderRadius: 999,
                            fontSize: 12,
                            fontWeight: 600,
                            background: inv.status === 'Paid' ? 'rgba(68, 191, 176, 0.14)' : inv.status === 'Pending' ? 'rgba(242, 170, 56, 0.14)' : 'rgba(239, 68, 68, 0.14)',
                            color: inv.status === 'Paid' ? '#147b6e' : inv.status === 'Pending' ? '#a16207' : '#dc2626'
                          }}>
                            <span style={{ fontSize: 8 }}>●</span> {inv.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button className="table-action" type="button" onClick={() => setSelectedInvoice(inv)} style={{ padding: '4px 10px' }}>
                            Info
                          </button>
                          <button className="table-action" type="button" onClick={() => downloadInvoiceFile(inv)} style={{ marginLeft: 6, padding: '4px 10px' }}>
                            Download
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="table-pagination" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
              <div style={{ color: '#6b6b77', fontSize: 13 }}>
                Showing {filteredInvoices.length === 0 ? 0 : (invoicePage - 1) * PAGE_SIZE + 1} - {Math.min(invoicePage * PAGE_SIZE, filteredInvoices.length)} of {filteredInvoices.length} invoices
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <button className="table-action" disabled={invoicePage <= 1} onClick={() => setInvoicePage((p) => Math.max(1, p - 1))}>Prev</button>
                <span style={{ margin: '0 8px', fontSize: 13, fontWeight: 500 }}>Page {invoicePage} of {invoiceTotalPages}</span>
                <button className="table-action" disabled={invoicePage >= invoiceTotalPages} onClick={() => setInvoicePage((p) => Math.min(invoiceTotalPages, p + 1))}>Next</button>
              </div>
            </div>
          </section>
        ) : (
          <div className="owner-dashboard-layout">
            <div className="dashboard-main">
            {/* Revenue & Financial KPIs */}
            <div style={{ marginBottom: 26 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#6366f1' }} />
                  Revenue &amp; Payment Overview
                </h3>
                <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Real-time Financial Metrics</span>
              </div>
              <section className="kpi-grid">
                {revenueKpiCards.map((card) => (
                  <KpiCard
                    key={card.label}
                    card={card}
                    onAction={(c) => {
                      if (c.linkTo === "Employees") {
                        handleNavChange("Employees");
                        setSelectedRole(c.employeeRole || "All roles");
                      } else if (c.linkTo === "Revenue") {
                        handleNavChange("Revenue");
                        setRevenueRange("monthly");
                      } else {
                        handleNavChange(c.linkTo);
                      }
                    }}
                  />
                ))}
              </section>
            </div>

            {/* Workforce & Operations KPIs */}
            <div style={{ marginBottom: 26 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
                  Workforce &amp; Client Operations
                </h3>
                <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Team &amp; Account Metrics</span>
              </div>
              <section className="kpi-grid">
                {workforceKpiCards.map((card) => (
                  <KpiCard
                    key={card.label}
                    card={card}
                    onAction={(c) => {
                      if (c.linkTo === "Employees") {
                        handleNavChange("Employees");
                        setSelectedRole(c.employeeRole || "All roles");
                      } else {
                        handleNavChange(c.linkTo);
                      }
                    }}
                  />
                ))}
              </section>
            </div>

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
            {/* 5-Point Activity Status Milestone Widget */}
            <section className="activity-panel" style={{ marginBottom: 18 }}>
              <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p className="eyebrow">Milestone pipeline</p>
                  <h2>5-Point Activity Status</h2>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999, background: 'rgba(16, 185, 129, 0.12)', color: '#059669' }}>
                  20% / Step
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                {ACTIVITY_STAGES.map((st) => {
                  const clientsInStage = clients.filter(c => {
                    const steps = c.completedSteps || ACTIVITY_STAGES.slice(0, Math.round((c.progressPercent || 60) / 20)).map(s => s.name);
                    return steps.includes(st.name);
                  }).length;
                  const percentOfClients = Math.round((clientsInStage / Math.max(1, clients.length)) * 100);

                  return (
                    <div key={st.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', borderRadius: 8, background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
                        <span style={{ fontSize: 12.5, fontWeight: 600, color: '#1e293b' }}>{st.name}</span>
                        <span style={{ fontSize: 11, color: '#64748b' }}>({st.percent}%)</span>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#059669' }}>
                        {clientsInStage} Clients ({percentOfClients}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

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
        {selectedClient && (() => {
          const isPaid = (selectedClient.paymentReceived || 0) >= (selectedClient.totalPayment || 0);
          const remaining = Math.max(0, (selectedClient.totalPayment || 0) - (selectedClient.paymentReceived || 0));

          const completed = selectedClient.completedSteps || (
            selectedClient.progressPercent ? ACTIVITY_STAGES.slice(0, Math.round(selectedClient.progressPercent / 20)).map(s => s.name) : ["Submission", "Doc Audit", "Manager Review"]
          );
          const clientProgress = selectedClient.progressPercent || (completed.length * 20);

          return (
            <SimpleModal onClose={closeClientInfo}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, borderBottom: '1px solid #eef0f5', paddingBottom: 14 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Client — {selectedClient.name}</h3>
                  <div style={{ color: '#7a748e', fontSize: 13, marginTop: 2 }}>{selectedClient.company}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ background: '#eef2ff', color: '#4e7cff', padding: '6px 12px', borderRadius: 999, fontWeight: 600, fontSize: 12 }}>Client</span>
                  <span style={{ background: '#f3f6f9', color: '#475569', padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 500 }}>{selectedClient.serviceType}</span>
                </div>
              </div>

              {/* Client Info Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
                <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8, border: '1px solid #eef0f5' }}>
                  <div style={{ color: '#6b6b77', fontSize: 12 }}>Mobile</div>
                  <div style={{ marginTop: 4, fontWeight: 600 }}>{selectedClient.phone}</div>
                </div>
                <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8, border: '1px solid #eef0f5' }}>
                  <div style={{ color: '#6b6b77', fontSize: 12 }}>Email</div>
                  <div style={{ marginTop: 4, fontWeight: 600 }}>{selectedClient.email}</div>
                </div>

                <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8, border: '1px solid #eef0f5' }}>
                  <div style={{ color: '#6b6b77', fontSize: 12 }}>Service Type</div>
                  <div style={{ marginTop: 4, fontWeight: 600 }}>{selectedClient.serviceType}</div>
                </div>
                <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8, border: '1px solid #eef0f5' }}>
                  <div style={{ color: '#6b6b77', fontSize: 12 }}>Service Name</div>
                  <div style={{ marginTop: 4, fontWeight: 600 }}>{selectedClient.serviceName || '—'}</div>
                </div>

                <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8, border: '1px solid #eef0f5' }}>
                  <div style={{ color: '#6b6b77', fontSize: 12 }}>Service Start Date</div>
                  <div style={{ marginTop: 4, fontWeight: 600 }}>{selectedClient.serviceStart || '—'}</div>
                </div>
                <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8, border: '1px solid #eef0f5' }}>
                  <div style={{ color: '#6b6b77', fontSize: 12 }}>Total Payment</div>
                  <div style={{ marginTop: 4, fontWeight: 600 }}>₹{(selectedClient.totalPayment || 0).toLocaleString()}</div>
                </div>

                <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8, border: '1px solid #eef0f5' }}>
                  <div style={{ color: '#6b6b77', fontSize: 12 }}>Payment Received</div>
                  <div style={{ marginTop: 4, fontWeight: 600, color: '#16a34a' }}>₹{(selectedClient.paymentReceived || 0).toLocaleString()}</div>
                </div>

                <div style={{ background: remaining > 0 ? '#fff7f6' : '#f0fdf4', padding: 12, borderRadius: 8, border: remaining > 0 ? '1px solid #fee2e2' : '1px solid #dcfce7' }}>
                  <div style={{ color: '#6b6b77', fontSize: 12 }}>Payment Remaining</div>
                  <div style={{ marginTop: 4, fontWeight: 700, color: remaining > 0 ? '#d0433b' : '#16a34a' }}>
                    {remaining > 0 ? `₹${remaining.toLocaleString()}` : 'Fully Paid ✓'}
                  </div>
                </div>
              </div>

              {/* 5-Points Activity Status Stepper (20% per point) */}
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #eef0f5' }}>
                <div style={{ marginBottom: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', color: '#6366f1', textTransform: 'uppercase' }}>
                    WORK COMPLETION PIPELINE
                  </span>
                  <h4 style={{ margin: '4px 0 0', fontSize: 15, fontWeight: 700, color: '#1e293b' }}>
                    5-Point Activity Status
                  </h4>
                </div>
                <ActivityStatusBar
                  completedSteps={completed}
                  progress={clientProgress}
                  interactive={false}
                  stepDates={{
                    Submission: selectedClient.serviceStart ? selectedClient.serviceStart.slice(5) : "10 Aug",
                    "Doc Audit": "12 Aug",
                    "Manager Review": "14 Aug",
                    Agreement: "Pending",
                    "Final Approval": "Pending",
                  }}
                />
              </div>

              <div className="modal-actions" style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 20 }}>
                <button className="table-action" type="button" onClick={() => { openEditClient(selectedClient); closeClientInfo(); }}>Edit Client</button>
                <button className="table-action" type="button" onClick={closeClientInfo}>Close</button>
              </div>
            </SimpleModal>
          );
        })()}
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
                  <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.branchManager || 'Ariana Lee'}</div>
                </div>
              )}
              {['sales', 'market', 'IT', 'admin'].includes(selectedEmployeeInfo.role) && (
                <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                  <div style={{ color: '#6b6b77', fontSize: 12 }}>Reporting manager</div>
                  <div style={{ marginTop: 6, fontWeight: 600 }}>
                    {selectedEmployeeInfo.role === 'sales'
                      ? (selectedEmployeeInfo.reportingManager || 'Eli Brooks (Sales Lead)')
                      : (selectedEmployeeInfo.branchManager || 'Ariana Lee (Branch Manager)')}
                  </div>
                </div>
              )}
            </div>
            <div className="modal-actions" style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 18 }}>
              {['branch manager', 'manager'].includes((selectedEmployeeInfo.role || '').toLowerCase()) && (
                <button
                  className="table-action"
                  type="button"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 600,
                    padding: '6px 14px',
                    borderRadius: 6
                  }}
                  onClick={() => {
                    setSalesClientsView(null);
                    setManagerTeamView(selectedEmployeeInfo);
                    closeEmployeeInfo();
                  }}
                >
                  Team under
                </button>
              )}
              {['sales', 'it', 'admin', 'market'].includes((selectedEmployeeInfo.role || '').toLowerCase()) && (
                <button
                  className="table-action"
                  type="button"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 600,
                    padding: '6px 14px',
                    borderRadius: 6
                  }}
                  onClick={() => {
                    setManagerTeamView(null);
                    setSalesClientsView(selectedEmployeeInfo);
                    closeEmployeeInfo();
                  }}
                >
                  Clients under
                </button>
              )}
              <button className="table-action" type="button" onClick={() => { openEditEmployee(selectedEmployeeInfo); closeEmployeeInfo(); }}>Edit</button>
              <button className="table-action" type="button" onClick={closeEmployeeInfo}>Close</button>
            </div>
          </SimpleModal>
        )}
        {selectedInvoice && (
          <SimpleModal onClose={() => setSelectedInvoice(null)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div>
                <h3 style={{ margin: 0 }}>Invoice Details — {selectedInvoice.id}</h3>
                <div style={{ color: '#7a748e', fontSize: 13 }}>{selectedInvoice.company}</div>
              </div>
              <span style={{
                padding: '6px 12px',
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
                background: selectedInvoice.status === 'Paid' ? 'rgba(68, 191, 176, 0.15)' : selectedInvoice.status === 'Pending' ? 'rgba(242, 170, 56, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: selectedInvoice.status === 'Paid' ? '#2b9385' : selectedInvoice.status === 'Pending' ? '#b87b14' : '#dc2626'
              }}>
                {selectedInvoice.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16, padding: '12px 0' }}>
              <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                <div style={{ color: '#6b6b77', fontSize: 12 }}>Client Name</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedInvoice.clientName}</div>
              </div>
              <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                <div style={{ color: '#6b6b77', fontSize: 12 }}>GST / Reg No</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedInvoice.gstNo}</div>
              </div>

              <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                <div style={{ color: '#6b6b77', fontSize: 12 }}>Branch</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedInvoice.branch}</div>
              </div>
              <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                <div style={{ color: '#6b6b77', fontSize: 12 }}>Region Name</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedInvoice.region}</div>
              </div>

              <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                <div style={{ color: '#6b6b77', fontSize: 12 }}>Service Line</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedInvoice.serviceName}</div>
              </div>
              <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                <div style={{ color: '#6b6b77', fontSize: 12 }}>Account Manager</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedInvoice.accountManager}</div>
              </div>

              <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                <div style={{ color: '#6b6b77', fontSize: 12 }}>Issue Date</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedInvoice.issueDate}</div>
              </div>
              <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                <div style={{ color: '#6b6b77', fontSize: 12 }}>Due Date</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedInvoice.dueDate}</div>
              </div>

              <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                <div style={{ color: '#6b6b77', fontSize: 12 }}>Base Fee</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedInvoice.amount}</div>
              </div>
              <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
                <div style={{ color: '#6b6b77', fontSize: 12 }}>Tax</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedInvoice.tax}</div>
              </div>

              <div style={{ background: '#eef2ff', padding: 12, borderRadius: 8, gridColumn: '1 / -1' }}>
                <div style={{ color: '#4e7cff', fontSize: 12, fontWeight: 600 }}>Total Billed Amount</div>
                <div style={{ marginTop: 4, fontWeight: 700, fontSize: 18, color: '#4e7cff' }}>{selectedInvoice.totalAmount}</div>
              </div>
            </div>

            <div className="modal-actions" style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 18 }}>
              <button className="table-action" type="button" onClick={() => downloadInvoiceFile(selectedInvoice)}>
                Download Invoice
              </button>
              <button className="table-action" type="button" onClick={() => setSelectedInvoice(null)}>
                Close
              </button>
            </div>
          </SimpleModal>
        )}

        {/* SALES-PERSON STYLE REQUEST DETAILS MODAL WITH OLD VS NEW VALUE DIFF CARDS */}
        {selectedRequest && (
          <SimpleModal onClose={() => setSelectedRequest(null)}>
            <div style={{ display: "grid", gap: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <span style={{ color: "#6366f1", fontWeight: 700, fontFamily: "monospace", fontSize: 13 }}>{selectedRequest.id}</span>
                  <h3 style={{ margin: "4px 0 0 0", color: "#0f172a" }}>{selectedRequest.clientName}</h3>
                </div>
                <span style={{
                  padding: "4px 12px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 700,
                  background: selectedRequest.status === "Approved" ? "#dcfce7" : selectedRequest.status === "Rejected" ? "#ffe4e6" : "#fef3c7",
                  color: selectedRequest.status === "Approved" ? "#15803d" : selectedRequest.status === "Rejected" ? "#be123c" : "#d97706"
                }}>
                  {selectedRequest.status}
                </span>
              </div>

              {/* Meta info grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
                <div style={{ background: "#f8fafc", padding: 12, borderRadius: 10, border: "1px solid #e2e8f0" }}>
                  <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600 }}>Assigned Manager</div>
                  <strong style={{ color: "#0f172a", fontSize: 13, marginTop: 2, display: "block" }}>{selectedRequest.managerName}</strong>
                </div>
                <div style={{ background: "#f8fafc", padding: 12, borderRadius: 10, border: "1px solid #e2e8f0" }}>
                  <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600 }}>Request Type</div>
                  <strong style={{ color: "#4338ca", fontSize: 13, marginTop: 2, display: "block" }}>{selectedRequest.requestType}</strong>
                </div>
                <div style={{ background: "#f8fafc", padding: 12, borderRadius: 10, border: "1px solid #e2e8f0" }}>
                  <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600 }}>Request Date</div>
                  <strong style={{ color: "#0f172a", fontSize: 13, marginTop: 2, display: "block" }}>{selectedRequest.createdAt}</strong>
                </div>
              </div>

              {/* Reason box */}
              <div style={{ background: "#f8fafc", padding: 14, borderRadius: 10, border: "1px solid #e2e8f0" }}>
                <div style={{ color: "#64748b", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Reason for Request:</div>
                <div style={{ color: "#334155", fontSize: 13, lineHeight: 1.5 }}>{selectedRequest.reason}</div>
              </div>

              {/* Sales Person Style Diff Visualization for Edit Client */}
              {selectedRequest.requestType === "Edit Client" && selectedRequest.requestedChanges && selectedRequest.requestedChanges.length > 0 && (
                <div style={{ display: "grid", gap: 12 }}>
                  <div style={{ color: "#475569", fontSize: 13, fontWeight: 700 }}>Requested Field Changes:</div>
                  {selectedRequest.requestedChanges.map((change) => (
                    <div key={change.field} style={{ borderRadius: 12, border: "1px solid #e2e8f0", background: "#ffffff", padding: 14 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#6366f1", marginBottom: 8, textTransform: "uppercase" }}>{change.field}</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "center" }}>
                        <div style={{ background: "#fff1f2", padding: "10px 12px", borderRadius: 8, border: "1px solid #fecdd3" }}>
                          <div style={{ color: "#9f1239", fontSize: 11, fontWeight: 600 }}>Old Value</div>
                          <div style={{ color: "#be123c", fontWeight: 700, fontSize: 13, marginTop: 2 }}>{change.oldValue || "-"}</div>
                        </div>
                        <div style={{ color: "#6366f1", fontWeight: 900, fontSize: 18 }}>↓</div>
                        <div style={{ background: "#f0fdf4", padding: "10px 12px", borderRadius: 8, border: "1px solid #bbf7d0" }}>
                          <div style={{ color: "#166534", fontSize: 11, fontWeight: 600 }}>New Value</div>
                          <div style={{ color: "#15803d", fontWeight: 700, fontSize: 13, marginTop: 2 }}>{change.newValue || "-"}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Owner / Manager Decision & Remarks */}
              {selectedRequest.status !== "Pending" ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 4 }}>
                  <div style={{ background: "#f8fafc", padding: 12, borderRadius: 10, border: "1px solid #e2e8f0" }}>
                    <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600 }}>Decision Date</div>
                    <strong style={{ color: "#0f172a", fontSize: 13, marginTop: 2, display: "block" }}>{selectedRequest.decisionDate || "-"}</strong>
                  </div>
                  <div style={{ background: "#f8fafc", padding: 12, borderRadius: 10, border: "1px solid #e2e8f0" }}>
                    <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600 }}>Owner / Manager Remarks</div>
                    <div style={{ color: "#334155", fontSize: 13, marginTop: 2 }}>{selectedRequest.managerRemarks || "-"}</div>
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: 6, background: "#f8fafc", padding: 14, borderRadius: 10, border: "1px solid #e2e8f0" }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Owner Remarks / Note for Decision:</label>
                  <input
                    type="text"
                    placeholder="e.g. Approved after reviewing company document verification"
                    value={ownerRemarksInput}
                    onChange={(e) => setOwnerRemarksInput(e.target.value)}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #cbd5e1", fontSize: 13 }}
                  />
                </div>
              )}

              <div className="modal-actions" style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 14 }}>
                {selectedRequest.status === "Pending" && (
                  <>
                    <button
                      type="button"
                      className="table-action"
                      style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", color: "#ffffff", border: "none", fontWeight: 700, padding: "8px 16px", borderRadius: 6 }}
                      onClick={() => {
                        handleApproveRequest(selectedRequest.id, ownerRemarksInput);
                        setSelectedRequest(null);
                      }}
                    >
                      ✓ Approve Request
                    </button>
                    <button
                      type="button"
                      className="table-action"
                      style={{ background: "#fee2e2", color: "#b91c1c", border: "none", fontWeight: 700, padding: "8px 16px", borderRadius: 6 }}
                      onClick={() => {
                        handleRejectRequest(selectedRequest.id, ownerRemarksInput);
                        setSelectedRequest(null);
                      }}
                    >
                      ✕ Reject Request
                    </button>
                  </>
                )}
                <button className="table-action" onClick={() => setSelectedRequest(null)}>Close</button>
              </div>
            </div>
          </SimpleModal>
        )}
      </section>
    </main>
  );
}
