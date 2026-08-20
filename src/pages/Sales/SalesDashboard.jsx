import React from "react";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import HeaderSearch from "../../components/dashboard/HeaderSearch";
import UserProfileMenu from "../../components/dashboard/UserProfileMenu";
import Icon from "../../components/Icon";
import "./salesdashboard.css";

// Sub-components
import SalesOverview from "./components/SalesOverview";
import SalesClientForm from "./components/SalesClientForm";
import SalesClientDirectory from "./components/SalesClientDirectory";
import SalesClientDossier from "./components/SalesClientDossier";
import SalesPerformance from "./components/SalesPerformance";
import SalesRequests from "./SalesRequests";
import SalesInvoices from "./SalesInvoices";
import SalesPayments from "./SalesPayments";

// Hooks & Data
import { useSalesDashboard } from "./hooks/useSalesDashboard";
import { useSalesClients } from "./hooks/useSalesClients";
import { navItems, notifications } from "./mockSalesData";

export default function SalesDashboard({ onSignOut, userEmail }) {
  const {
    activeNav,
    setActiveNav,
    dark,
    setDark,
    searchOpen,
    setSearchOpen,
    notificationsOpen,
    setNotificationsOpen,
    query,
    setQuery,
    toastMessage,
    setToastMessage,
    showToast,
    salesPersonName,
    notificationWrapRef,
    notificationsListRef,
    handleNotificationsListScroll,
  } = useSalesDashboard(userEmail);

  const {
    clients,
    selectedClient,
    setSelectedClient,
    clientSearch,
    setClientSearch,
    stageFilter,
    setStageFilter,
    paymentFilter,
    setPaymentFilter,
    newClient,
    filteredClients,
    kpiCards,
    handleNewClientChange,
    handleClearClientForm,
    handleAddClient,
  } = useSalesClients(salesPersonName, (createdClient) => {
    showToast(
      `✓ Client "${createdClient.name}" created successfully! Details can now be viewed in the 'Details' tab.`
    );
  });

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
            <HeaderSearch
              query={query}
              setQuery={setQuery}
              isOpen={searchOpen}
              setIsOpen={setSearchOpen}
              placeholder="Search clients, leads, or deals..."
            />

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
                        <span
                          className={`notice-dot ${
                            notice.tone === '#aa83eb'
                              ? 'violet'
                              : notice.tone === '#88cda4'
                              ? 'green'
                              : 'coral'
                          }`}
                        />
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
            <UserProfileMenu
              user={{
                name: salesPersonName,
                email: "yash.patel@agnicrm.com",
                phone: "+91 98201 54321",
                branch: "West Zone (Mumbai)",
                designation: "Senior Sales Officer",
                empId: "EMP-SLS-2024",
                quota: "₹15,00,000",
                achieved: "₹11,40,000 (76%)",
                reportingManager: "Vikramaditya Sharma",
              }}
              role="Sales"
              roleBadge="Sales"
              initials="SP"
              avatarColor="linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
              onSignOut={onSignOut}
              showToast={(msg) => setToastMessage(msg)}
            />
          </div>
        </DashboardHeader>

        {toastMessage && (
          <div className="sales-toast">
            <span>{toastMessage}</span>
            <button
              type="button"
              className="sales-toast-close"
              onClick={() => setToastMessage("")}
            >
              ✕
            </button>
          </div>
        )}

        {activeNav === "Dashboard" && (
          <SalesOverview
            kpiCards={kpiCards}
            dark={dark}
            onNavigate={(nav) => setActiveNav(nav)}
          />
        )}

        {activeNav === "Clients" && (
          <SalesClientForm
            newClient={newClient}
            onNewClientChange={handleNewClientChange}
            onAddClient={handleAddClient}
            onClearForm={handleClearClientForm}
            onGoToDetails={() => setActiveNav("Details")}
            dark={dark}
          />
        )}

        {activeNav === "Requests" && <SalesRequests />}

        {activeNav === "Invoices" && <SalesInvoices />}

        {activeNav === "Payment" && <SalesPayments />}

        {activeNav === "Performance" && <SalesPerformance />}

        {activeNav === "Details" && (
          <section>
            {!selectedClient ? (
              <SalesClientDirectory
                clients={clients}
                filteredClients={filteredClients}
                clientSearch={clientSearch}
                setClientSearch={setClientSearch}
                stageFilter={stageFilter}
                setStageFilter={setStageFilter}
                paymentFilter={paymentFilter}
                setPaymentFilter={setPaymentFilter}
                onSelectClient={(client) => setSelectedClient(client)}
                onCreateNewClient={() => setActiveNav("Clients")}
                salesPersonName={salesPersonName}
                dark={dark}
              />
            ) : (
              <SalesClientDossier
                selectedClient={selectedClient}
                onBack={() => setSelectedClient(null)}
                salesPersonName={salesPersonName}
                onSchemeSave={() => {
                  setActiveNav('Details');
                  setSelectedClient((prev) => prev || selectedClient);
                }}
              />
            )}
          </section>
        )}
      </section>
    </main>
  );
}
