export const branchRevenueData = [
  { branch: "North", revenue: 145 },
  { branch: "South", revenue: 210 },
  { branch: "East", revenue: 180 },
  { branch: "West", revenue: 320 },
];

export const kpiCards = [
  { label: "Total Regional Managers", value: "7", trend: "+3%", description: "Managers across region", accent: "#9a74e9", linkTo: "Employees" },
  { label: "Total Employees", value: "124", trend: "+6%", description: "Staff at branch", accent: "#4e7cff", linkTo: "Employees" },
  { label: "Active Clients", value: "248", trend: "+8%", description: "Currently active", accent: "#44bfb0", linkTo: "Clients" },
  { label: "Pending Requests", value: "12", trend: "-2%", description: "Awaiting action", accent: "#f2aa38", linkTo: "Clients" },
  { label: "Branch Revenue", value: "₹278.8k", trend: "+22%", description: "This month", accent: "#f97316", linkTo: "Revenue" },
];

export const initialBranchManagerClients = [
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

export const initialBranchAdmins = [
  { id: 1, name: "Sara Kim", email: "sara@agni.com", joiningDate: "2023-01-15", role: "admin", region: "North Zone", branchManagerName: "Ariana Lee" },
  { id: 2, name: "Nisha Rao", email: "nisha@agni.com", joiningDate: "2024-03-22", role: "admin", region: "South Zone", branchManagerName: "Priya Menon" },
];

export const initialBranchIT = [
  { id: 1, name: "Noah Kim", email: "noah@agni.com", joiningDate: "2022-11-04", role: "IT Support", region: "West Zone", branchManagerName: "Ariana Lee" },
  { id: 2, name: "Janet Paul", email: "janet@agni.com", joiningDate: "2024-01-18", role: "Systems Admin", region: "West Zone", branchManagerName: "Ariana Lee" },
];

export const initialBranchMarketing = [
  { id: 1, name: "Daniel Cruz", email: "daniel@agni.com", joiningDate: "2023-05-11", role: "Marketing Specialist", region: "South Zone", branchManagerName: "Ariana Lee" },
  { id: 2, name: "Lily Chen", email: "lily@agni.com", joiningDate: "2023-08-02", role: "SEO Expert", region: "East Zone", branchManagerName: "Priya Menon" },
];

export const initialEmployeesList = [
  { id: 1, name: "Eli Brooks", email: "eli@agni.com", phone: "+91 91234 00222", role: "manager", branch: "South", branchManager: "Ariana Lee" },
  { id: 2, name: "Mia Ross", email: "mia@agni.com", phone: "+91 91234 10101", role: "sales", branch: "East", branchManager: "Ariana Lee", reportingManager: "Eli Brooks" },
  { id: 3, name: "Noah Kim", email: "noah@agni.com", phone: "+91 91234 10202", role: "sales", branch: "West", branchManager: "Ariana Lee", reportingManager: "Eli Brooks" },
  { id: 4, name: "Daniel Cruz", email: "daniel@agni.com", phone: "+91 91234 30303", role: "manager", branch: "South", branchManager: "Ariana Lee" },
  { id: 5, name: "Priya Menon", email: "priya@agni.com", phone: "+91 91234 40404", role: "sales", branch: "East", branchManager: "Ariana Lee", reportingManager: "Daniel Cruz" },
];

export const revenueSeries = {
  daily: [
    { label: "Mon", value: 4200 },
    { label: "Tue", value: 4800 },
    { label: "Wed", value: 4500 },
    { label: "Thu", value: 5200 },
    { label: "Fri", value: 5000 },
    { label: "Sat", value: 5600 },
  ],
  weekly: [
    { label: "W1", value: 21000 },
    { label: "W2", value: 23000 },
    { label: "W3", value: 25000 },
    { label: "W4", value: 27000 },
  ],
  monthly: [
    { label: "Jan", value: 18000 },
    { label: "Feb", value: 21000 },
    { label: "Mar", value: 22800 },
    { label: "Apr", value: 24500 },
    { label: "May", value: 27000 },
    { label: "Jun", value: 30500 },
  ],
  yearly: [
    { label: "2021", value: 120000 },
    { label: "2022", value: 155000 },
    { label: "2023", value: 190000 },
    { label: "2024", value: 227000 },
    { label: "2025", value: 260000 },
  ],
  allTime: [
    { label: "2019", value: 80000 },
    { label: "2020", value: 118000 },
    { label: "2021", value: 155000 },
    { label: "2022", value: 190000 },
    { label: "2023", value: 230000 },
    { label: "2024", value: 270000 },
  ],
};
