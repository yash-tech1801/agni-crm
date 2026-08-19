import React, { useState, useMemo } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Icon from "../../components/Icon";

// Modular Page Components
import BranchManagerOverviewPage from "./BranchManagerOverviewPage";
import BranchManagerClientsPage from "./BranchManagerClientsPage";
import BranchManagerEmployeesPage from "./BranchManagerEmployeesPage";
import BranchManagerRevenuePage from "./BranchManagerRevenuePage";
import BranchManagerReportsPage from "./BranchManagerReportsPage";
import BranchManagerAdminPage from "./BranchManagerAdminPage";
import BranchManagerITPage from "./BranchManagerITPage";
import BranchManagerMarketingPage from "./BranchManagerMarketingPage";
import "./branchmanagerdashboard.css";

// Mock & Initial Data
import {
  initialBranchManagerClients,
  initialBranchAdmins,
  initialBranchIT,
  initialBranchMarketing,
  initialEmployeesList,
} from "./mockBranchManagerData";

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

export default function BranchManagerDashboard({ onSignOut, userEmail }) {
  const navigate = useNavigate();
  const location = useLocation();

  const urlToNavMap = useMemo(() => ({
    dashboard: "Dashboard",
    overview: "Dashboard",
    clients: "Clients",
    employees: "Employees",
    team: "Employees",
    revenue: "Revenue",
    reports: "Reports",
    admin: "Admin",
    settings: "Admin",
    it: "IT",
    marketing: "Marketing",
    leads: "Marketing",
  }), []);

  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentSlug = pathParts[1] || "dashboard";
  const activeNav = urlToNavMap[currentSlug.toLowerCase()] || "Dashboard";

  const handleNavChange = (label) => {
    const slug = label.toLowerCase();
    navigate(`/branch-manager/${slug}`);
  };

  const [dark, setDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  // States
  const [clients, setClients] = useState(initialBranchManagerClients);
  const [branchAdmins] = useState(initialBranchAdmins);
  const [branchIT] = useState(initialBranchIT);
  const [branchMarketing] = useState(initialBranchMarketing);
  const [employeesList] = useState(initialEmployeesList);

  const salesPersonName = useMemo(() => {
    if (!userEmail) return "Branch Manager";
    const raw = userEmail.split("@")[0];
    const parts = raw.split(/[^a-zA-Z0-9]+/).filter(Boolean);
    return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(" ");
  }, [userEmail]);

  // Branch scope
  const myBranch = "East";

  return (
    <main className={`owner-dashboard branch-manager-dashboard ${dark ? "dashboard-dark" : ""}`}>
      <DashboardSidebar
        navItems={navItems}
        activeNav={activeNav}
        onNavChange={handleNavChange}
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

        {/* Nested Routes for Branch Manager Dashboard */}
        <Routes>
          <Route
            index
            element={<BranchManagerOverviewPage dark={dark} onNavigate={handleNavChange} />}
          />
          <Route
            path="dashboard"
            element={<BranchManagerOverviewPage dark={dark} onNavigate={handleNavChange} />}
          />
          <Route
            path="overview"
            element={<BranchManagerOverviewPage dark={dark} onNavigate={handleNavChange} />}
          />
          <Route
            path="clients"
            element={
              <BranchManagerClientsPage
                clients={clients}
                setClients={setClients}
              />
            }
          />
          <Route
            path="employees"
            element={
              <BranchManagerEmployeesPage
                employeesList={employeesList}
              />
            }
          />
          <Route
            path="team"
            element={
              <BranchManagerEmployeesPage
                employeesList={employeesList}
              />
            }
          />
          <Route
            path="revenue"
            element={
              <BranchManagerRevenuePage
                myBranch={myBranch}
              />
            }
          />
          <Route
            path="reports"
            element={
              <BranchManagerReportsPage
                myBranch={myBranch}
              />
            }
          />
          <Route
            path="admin"
            element={
              <BranchManagerAdminPage
                branchAdmins={branchAdmins}
              />
            }
          />
          <Route
            path="settings"
            element={
              <BranchManagerAdminPage
                branchAdmins={branchAdmins}
              />
            }
          />
          <Route
            path="it"
            element={
              <BranchManagerITPage
                branchIT={branchIT}
              />
            }
          />
          <Route
            path="marketing"
            element={
              <BranchManagerMarketingPage
                branchMarketing={branchMarketing}
              />
            }
          />
          <Route
            path="leads"
            element={
              <BranchManagerMarketingPage
                branchMarketing={branchMarketing}
              />
            }
          />
          <Route
            path="*"
            element={<Navigate to="/branch-manager/dashboard" replace />}
          />
        </Routes>
      </section>
    </main>
  );
}
