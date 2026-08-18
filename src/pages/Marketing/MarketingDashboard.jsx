import React, { useState, useMemo, useRef, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Icon from "../../components/Icon";

// Modular Sub-pages
import MarketingOverviewPage from "./MarketingOverviewPage";
import MarketingClientFormPage from "./MarketingClientFormPage";
import MarketingClientDetailsPage from "./MarketingClientDetailsPage";
import MarketingServicesCatalogPage from "./MarketingServicesCatalogPage";
import "./MarketingDashboard.css";

// Mock Data
import {
  navItems,
  initialMarketingCreatedClients,
  initialSalesPitchedMarketingClients,
} from "./mockMarketingData";

export default function MarketingDashboard({ onSignOut, userEmail }) {
  const navigate = useNavigate();
  const location = useLocation();

  const urlToNavMap = useMemo(
    () => ({
      dashboard: "Dashboard",
      overview: "Dashboard",
      client: "Client",
      "new-client": "Client",
      details: "Details",
      clients: "Details",
      services: "Services",
      service: "Services",
    }),
    []
  );

  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentSlug = pathParts[1] || "dashboard";
  const activeNav = urlToNavMap[currentSlug.toLowerCase()] || "Dashboard";

  const handleNavChange = (label) => {
    const slug = label.toLowerCase();
    navigate(`/marketing/${slug}`);
  };

  const [dark, setDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsAutoScrollPaused, setNotificationsAutoScrollPaused] = useState(false);
  const [query, setQuery] = useState("");

  // Shared state for Marketing clients
  const [createdClients, setCreatedClients] = useState(initialMarketingCreatedClients);
  const [salesPitchedClients, setSalesPitchedClients] = useState(initialSalesPitchedMarketingClients);
  const [preselectedService, setPreselectedService] = useState(null);

  const handleCreateClientWithService = (serviceOrName) => {
    setPreselectedService(serviceOrName);
    handleNavChange("Client");
  };

  const notificationWrapRef = useRef(null);
  const notificationsListRef = useRef(null);
  const notificationsPauseTimer = useRef(null);

  const marketingLeadName = useMemo(() => {
    if (!userEmail) return "Marketing Lead";
    let raw = userEmail.split("@")[0];
    raw = raw.replace(/\d+$/, "");
    const parts = raw.split(/[^a-zA-Z]+/).filter(Boolean);
    if (parts.length === 0) return "Marketing Lead";
    return parts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  }, [userEmail]);

  const handleClientCreated = (newClient) => {
    setCreatedClients((prev) => [newClient, ...prev]);
  };

  // Notifications outside click handler
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
      if (list.scrollTop >= maxScroll - 4) {
        list.scrollTop = 0;
      } else {
        list.scrollTop += 1;
      }
    }, 45);

    return () => window.clearInterval(intervalId);
  }, [notificationsOpen, notificationsAutoScrollPaused]);

  const handleNotificationsListScroll = () => {
    setNotificationsAutoScrollPaused(true);
    if (notificationsPauseTimer.current) {
      window.clearTimeout(notificationsPauseTimer.current);
    }
    notificationsPauseTimer.current = window.setTimeout(() => {
      setNotificationsAutoScrollPaused(false);
    }, 2000);
  };

  return (
    <main className={`owner-dashboard marketing-dashboard ${dark ? "dashboard-dark" : ""}`}>
      {/* ── Sidebar ── */}
      <DashboardSidebar
        navItems={navItems}
        activeNav={activeNav}
        onNavChange={handleNavChange}
        dark={dark}
        onToggleDark={() => setDark((prev) => !prev)}
        onSignOut={onSignOut}
        navLabel="Marketing navigation"
      />

      {/* ── Main Content Area ── */}
      <section className="dashboard-content">
        {/* ── Header ── */}
        <DashboardHeader
          title={`Hello, ${marketingLeadName}`}
          subtitle="Corporate marketing operations, client acquisitions, and enterprise growth campaigns."
          eyebrow="MARKETING OPERATIONS &amp; CLIENT SERVICES"
        >
          <div className="owner-top-actions">
            {searchOpen ? (
              <div className="search-inline">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search marketing services, clients..."
                  autoFocus
                  onBlur={() => {
                    if (!query) setSearchOpen(false);
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setSearchOpen(false);
                  }}
                >
                  ✕
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
                    <h2>Marketing Alerts</h2>
                    <span>3 active</span>
                  </header>
                  <div
                    className="notifications-scroll"
                    ref={notificationsListRef}
                    onScroll={handleNotificationsListScroll}
                  >
                    <article>
                      <span className="notice-dot green" />
                      <div>
                        <strong>New Marketing Client Onboarded</strong>
                        <p>Apex Healthcare AI enrolled for multi-channel performance ads.</p>
                      </div>
                    </article>
                    <article>
                      <span className="notice-dot coral" />
                      <div>
                        <strong>Sales Marketing Pitch Received</strong>
                        <p>East branch rep pitched B2B Funnels to Eastern Steel Infra.</p>
                      </div>
                    </article>
                    <article>
                      <span className="notice-dot violet" />
                      <div>
                        <strong>Service Catalog Live</strong>
                        <p>6 enterprise marketing service lines available with 18% GST auto-calc.</p>
                      </div>
                    </article>
                  </div>
                </section>
              )}
            </div>
            <button className="profile" type="button">
              MKT
            </button>
            <span className="role-badge">Marketing Lead</span>
          </div>
        </DashboardHeader>

        {/* Nested Routes for Marketing Dashboard */}
        <Routes>
          <Route
            index
            element={
              <MarketingOverviewPage
                dark={dark}
                onNavigate={handleNavChange}
                onPitchService={handleCreateClientWithService}
                createdClients={createdClients}
                salesPitchedClients={salesPitchedClients}
              />
            }
          />
          <Route
            path="dashboard"
            element={
              <MarketingOverviewPage
                dark={dark}
                onNavigate={handleNavChange}
                onPitchService={handleCreateClientWithService}
                createdClients={createdClients}
                salesPitchedClients={salesPitchedClients}
              />
            }
          />
          <Route
            path="overview"
            element={
              <MarketingOverviewPage
                dark={dark}
                onNavigate={handleNavChange}
                onPitchService={handleCreateClientWithService}
                createdClients={createdClients}
                salesPitchedClients={salesPitchedClients}
              />
            }
          />
          <Route
            path="client"
            element={
              <MarketingClientFormPage
                dark={dark}
                preselectedService={preselectedService}
                onClearPreselectedService={() => setPreselectedService(null)}
                onClientCreated={handleClientCreated}
                onNavigateToDetails={() => handleNavChange("Details")}
              />
            }
          />
          <Route
            path="new-client"
            element={
              <MarketingClientFormPage
                dark={dark}
                preselectedService={preselectedService}
                onClearPreselectedService={() => setPreselectedService(null)}
                onClientCreated={handleClientCreated}
                onNavigateToDetails={() => handleNavChange("Details")}
              />
            }
          />
          <Route
            path="details"
            element={
              <MarketingClientDetailsPage
                dark={dark}
                createdClients={createdClients}
                salesPitchedClients={salesPitchedClients}
                onNavigateToCreateClient={() => {
                  setPreselectedService(null);
                  handleNavChange("Client");
                }}
              />
            }
          />
          <Route
            path="clients"
            element={
              <MarketingClientDetailsPage
                dark={dark}
                createdClients={createdClients}
                salesPitchedClients={salesPitchedClients}
                onNavigateToCreateClient={() => {
                  setPreselectedService(null);
                  handleNavChange("Client");
                }}
              />
            }
          />
          <Route
            path="services"
            element={
              <MarketingServicesCatalogPage
                dark={dark}
                onPitchService={handleCreateClientWithService}
              />
            }
          />
          <Route
            path="service"
            element={
              <MarketingServicesCatalogPage
                dark={dark}
                onPitchService={handleCreateClientWithService}
              />
            }
          />
          <Route
            path="*"
            element={<Navigate to="/marketing/dashboard" replace />}
          />
        </Routes>
      </section>
    </main>
  );
}
