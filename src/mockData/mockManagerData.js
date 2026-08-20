export const navItems = [
  { icon: "dashboard", label: "Dashboard" },
  { icon: "team", label: "Team" },
  { icon: "clients", label: "Clients" },
  { icon: "overview", label: "Requests" },
  { icon: "revenue", label: "Revenue" },
  { icon: "reports", label: "Reports" },
];

export const kpiCards = [
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

export const teamPerformance = [
  { name: "Mia Ross", role: "Senior Sales", score: "92%", detail: "Top conversion" },
  { name: "Ariana Lee", role: "Branch Lead", score: "88%", detail: "Highest client growth" },
  { name: "Eli Brooks", role: "Operations", score: "84%", detail: "Process efficiency" },
  { name: "Noah Kim", role: "Support", score: "81%", detail: "Response quality" },
  { name: "Priya Menon", role: "Assistant", score: "77%", detail: "Follow up speed" },
];

export const salesTeam = [
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
    name: "Alex Vance",
    role: "Sales Executive",
    branch: "East",
    branchManager: "Ariana Lee",
    email: "alex@agni.com",
    phone: "+91 91234 10102",
    region: "East Zone",
    quota: "₹100k",
    monthlySales: "₹82k",
    joiningDate: "2024-03-10",
  },
  {
    id: 3,
    name: "Kabir Sharma",
    role: "Sales Specialist",
    branch: "East",
    branchManager: "Ariana Lee",
    email: "kabir@agni.com",
    phone: "+91 91234 10103",
    region: "East Zone",
    quota: "₹110k",
    monthlySales: "₹74k",
    joiningDate: "2024-04-01",
  },
  {
    id: 4,
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
    id: 5,
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
    id: 6,
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

export const managerClients = [
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

export const activities = [
  { title: "Weekly pipeline review", detail: "Scheduled for Thursday at 10am.", time: "Just now", tone: "#9a74e9" },
  { title: "Client meeting prep", detail: "Finalize proposal deck for Kiran.", time: "1 hr ago", tone: "#4e7cff" },
  { title: "Deal follow-up", detail: "Reminder to reconnect with RMD Corp.", time: "3 hrs ago", tone: "#44bfb0" },
  { title: "Team coaching", detail: "Review conversion metrics with sales team.", time: "6 hrs ago", tone: "#f2aa38" },
];

export const reportRoleOptions = [
  { label: 'All roles', value: '' },
  { label: 'Branch Manager', value: 'branch manager' },
  { label: 'Manager', value: 'manager' },
  { label: 'Senior Sales', value: 'Senior Sales' },
  { label: 'Sales Executive', value: 'Sales Executive' },
  { label: 'Sales Associate', value: 'Sales Associate' },
  { label: 'Sales Specialist', value: 'Sales Specialist' },
];

export const branchOptions = [
  { label: 'All branches', value: '' },
  { label: 'East', value: 'East' },
  { label: 'South', value: 'South' },
  { label: 'West', value: 'West' },
  { label: 'North', value: 'North' },
];

export const revenueSeries = {
  daily: [
    { label: 'Mon', value: 12000 },
    { label: 'Tue', value: 16000 },
    { label: 'Wed', value: 14500 },
    { label: 'Thu', value: 19000 },
    { label: 'Fri', value: 17000 },
    { label: 'Sat', value: 21000 },
  ],
  weekly: [
    { label: 'W1', value: 58000 },
    { label: 'W2', value: 64000 },
    { label: 'W3', value: 71000 },
    { label: 'W4', value: 82000 },
  ],
  monthly: [
    { label: 'Jan', value: 52000 },
    { label: 'Feb', value: 61000 },
    { label: 'Mar', value: 68000 },
    { label: 'Apr', value: 74000 },
    { label: 'May', value: 82000 },
    { label: 'Jun', value: 96000 },
  ],
  yearly: [
    { label: '2021', value: 340000 },
    { label: '2022', value: 450000 },
    { label: '2023', value: 560000 },
    { label: '2024', value: 680000 },
    { label: '2025', value: 810000 },
  ],
  allTime: [
    { label: '2019', value: 210000 },
    { label: '2020', value: 310000 },
    { label: '2021', value: 450000 },
    { label: '2022', value: 560000 },
    { label: '2023', value: 680000 },
    { label: '2024', value: 810000 },
  ],
};

export function generateYearlySeries(employee) {
  const base = 50000 + (employee?.id || 1) * 2000;
  return Array.from({ length: 12 }, (_, index) => {
    const seasonal = 0.72 + index * 0.02;
    const seed = (((employee?.id || 1) * 7 + index * 3) % 11) * 0.01;
    return Math.round(base * (seasonal + seed));
  });
}
