import React, { useState, useMemo, useRef, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Icon from "../../components/Icon";

// Modular Page Components
import ManagerOverviewPage from "./ManagerOverviewPage";
import ManagerTeamPage from "./ManagerTeamPage";
import ManagerClientsPage from "./ManagerClientsPage";
import ManagerRequestsPage from "./ManagerRequestsPage";
import ManagerRevenuePage from "./ManagerRevenuePage";
import ManagerReportsPage from "./ManagerReportsPage";

// Mock & Initial Data
import {
  navItems,
  salesTeam,
  managerClients,
} from "./mockManagerData";

export default function ManagerDashboard({ onSignOut, userEmail }) {
  const navigate = useNavigate();
  const location = useLocation();

  const urlToNavMap = useMemo(
    () => ({
      dashboard: "Dashboard",
      overview: "Dashboard",
      team: "Team",
      employees: "Team",
      clients: "Clients",
      client: "Clients",
      requests: "Requests",
      request: "Requests",
      revenue: "Revenue",
      revenues: "Revenue",
      reports: "Reports",
      report: "Reports",
      analytics: "Reports",
    }),
    []
  );

  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentSlug = pathParts[1] || "dashboard";
  const activeNav = urlToNavMap[currentSlug.toLowerCase()] || "Dashboard";

  const handleNavChange = (label) => {
    const slug = label.toLowerCase();
    navigate(`/manager/${slug}`);
  };

  const [dark, setDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsAutoScrollPaused, setNotificationsAutoScrollPaused] = useState(false);
  const [query, setQuery] = useState("");
  const [clients, setClients] = useState(managerClients);

  const notificationWrapRef = useRef(null);
  const notificationsListRef = useRef(null);
  const notificationsPauseTimer = useRef(null);

  const managerName = useMemo(() => {
    if (!userEmail) return "Manager";
    const raw = userEmail.split("@")[0];
    const parts = raw.split(/[^a-zA-Z0-9]+/).filter(Boolean);
    return parts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  }, [userEmail]);

  const managedBranch = "East";
  const managedRegion = "East Zone";
  const branchTeam = useMemo(
    () => salesTeam.filter((member) => member.branch === managedBranch),
    [managedBranch]
  );
  const branchTeamNames = useMemo(
    () => branchTeam.map((member) => member.name),
    [branchTeam]
  );
  const branchClients = useMemo(
    () => clients.filter((client) => branchTeamNames.includes(client.salesRep)),
    [clients, branchTeamNames]
  );

  const salesPeople = useMemo(
    () => branchTeam.map((member) => ({ id: member.id, name: member.name })),
    [branchTeam]
  );

  // Close notifications on outside click
  useEffect(() => {
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

  // Notifications auto-scroll
  useEffect(() => {
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

  useEffect(() => {
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

  return (
    <main className={`owner-dashboard ${dark ? "dashboard-dark" : ""}`}>
      <DashboardSidebar
        navItems={navItems}
        activeNav={activeNav}
        onNavChange={handleNavChange}
        dark={dark}
        onToggleDark={() => setDark((value) => !value)}
        onSignOut={onSignOut}
        IconComponent={Icon}
        brandName={<strong>Agni CRM</strong>}
        navLabel="Manager dashboard navigation"
      />

      <section className="dashboard-content">
        <DashboardHeader
          ref={notificationWrapRef}
          eyebrow="Manager workspace"
          title={`Welcome back, ${managerName}`}
          copy="Monitor your team, track pipeline momentum, and keep client work moving forward."
          className="owner-dashboard-top"
        >
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
        </DashboardHeader>

        {/* Nested Routes for Manager Dashboard */}
        <Routes>
          <Route
            index
            element={<ManagerOverviewPage dark={dark} onNavigate={handleNavChange} />}
          />
          <Route
            path="dashboard"
            element={<ManagerOverviewPage dark={dark} onNavigate={handleNavChange} />}
          />
          <Route
            path="overview"
            element={<ManagerOverviewPage dark={dark} onNavigate={handleNavChange} />}
          />
          <Route
            path="team"
            element={
              <ManagerTeamPage
                branchTeam={branchTeam}
                managedRegion={managedRegion}
                managerName={managerName}
              />
            }
          />
          <Route
            path="employees"
            element={
              <ManagerTeamPage
                branchTeam={branchTeam}
                managedRegion={managedRegion}
                managerName={managerName}
              />
            }
          />
          <Route
            path="clients"
            element={
              <ManagerClientsPage
                clients={branchClients}
                setClients={setClients}
                salesPeople={salesPeople}
              />
            }
          />
          <Route
            path="client"
            element={
              <ManagerClientsPage
                clients={branchClients}
                setClients={setClients}
                salesPeople={salesPeople}
              />
            }
          />
          <Route
            path="requests"
            element={
              <ManagerRequestsPage
                branchTeamNames={branchTeamNames}
                managedRegion={managedRegion}
                branchTeam={branchTeam}
              />
            }
          />
          <Route
            path="request"
            element={
              <ManagerRequestsPage
                branchTeamNames={branchTeamNames}
                managedRegion={managedRegion}
                branchTeam={branchTeam}
              />
            }
          />
          <Route
            path="revenue"
            element={
              <ManagerRevenuePage
                branchTeam={branchTeam}
                managedRegion={managedRegion}
                managedBranch={managedBranch}
              />
            }
          />
          <Route
            path="revenues"
            element={
              <ManagerRevenuePage
                branchTeam={branchTeam}
                managedRegion={managedRegion}
                managedBranch={managedBranch}
              />
            }
          />
          <Route
            path="reports"
            element={<ManagerReportsPage branchTeam={branchTeam} />}
          />
          <Route
            path="report"
            element={<ManagerReportsPage branchTeam={branchTeam} />}
          />
          <Route
            path="analytics"
            element={<ManagerReportsPage branchTeam={branchTeam} />}
          />
          <Route
            path="*"
            element={<Navigate to="/manager/dashboard" replace />}
          />
        </Routes>
      </section>
    </main>
  );
}
