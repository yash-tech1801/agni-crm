import React from "react";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
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
            <button className="profile" type="button">
              SP
            </button>
            <span className="role-badge">Sales</span>
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
