import React, { useState } from "react";
import Icon from "../../../components/Icon";
import SalesClientViewModal from "./SalesClientViewModal";

export default function SalesClientDirectory({
  clients = [],
  filteredClients = [],
  clientSearch,
  setClientSearch,
  stageFilter,
  setStageFilter,
  paymentFilter,
  setPaymentFilter,
  onSelectClient,
  onCreateNewClient,
  salesPersonName,
  dark,
}) {
  const [viewingClient, setViewingClient] = useState(null);

  return (
    <div className="sales-clients-view">
      {/* Header Banner */}
      <div className="sales-header-banner">
        <div className="sales-header-info">
          <p className="sales-header-eyebrow">Client Dossier</p>
          <h1 className="sales-header-title">Sales Client Directory</h1>
          <p className="sales-header-subtitle">
            Click <strong>View</strong> on any client record to explore their full profile, commercials, and documentation.
          </p>
        </div>

        <button
          type="button"
          className="sales-add-btn"
          onClick={onCreateNewClient}
        >
          <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>
          <span>Register New Client</span>
        </button>
      </div>

      {/* Filter Toolbar Card */}
      <div className="analytics-card sales-toolbar-card">
        <div className="sales-toolbar-filters">
          <div className="sales-search-box">
            <span className="sales-search-icon">
              <Icon name="search" size={15} />
            </span>
            <input
              type="text"
              value={clientSearch}
              onChange={(e) => setClientSearch(e.target.value)}
              placeholder="Search by client, company, email, or scheme..."
            />
          </div>

          <select
            className="sales-filter-select"
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
          >
            <option value="all">All Stages</option>
            <option value="Active">Active</option>
            <option value="Onboarding">Onboarding</option>
            <option value="Renewal">Renewal</option>
            <option value="Prospect">Prospect</option>
          </select>

          <select
            className="sales-filter-select"
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            <option value="all">All Payment Status</option>
            <option value="paid">Fully Paid</option>
            <option value="partial">Partially Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="sales-count-badge">
          <span>Showing</span>
          <strong>{filteredClients.length}</strong>
          <span>of {clients.length} clients</span>
        </div>
      </div>

      {/* Directory Table Card */}
      <div className="analytics-card sales-table-card">
        {filteredClients.length === 0 ? (
          <div className="sales-empty-cell">
            No clients found matching the search and filter criteria.
          </div>
        ) : (
          <div className="sales-table-scroll">
            <table className="sales-clients-table">
              <thead>
                <tr>
                  <th style={{ width: 60 }}>ID</th>
                  <th>Client & Company</th>
                  <th>Contact Info</th>
                  <th>Scheme</th>
                  <th>Total Value</th>
                  <th style={{ minWidth: 160 }}>Payment Status</th>
                  <th>Stage</th>
                  <th style={{ textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => {
                  const total = parseFloat(client.totalPayment) || 0;
                  const received = parseFloat(client.paymentReceived) || 0;
                  const pending = parseFloat(client.paymentPending) || 0;
                  const pct = total > 0 ? Math.min(Math.round((received / total) * 100), 100) : 0;
                  const isPaid = pending === 0 && received > 0;
                  const isPartial = pending > 0 && received > 0;

                  return (
                    <tr key={client.id}>
                      <td>
                        <span style={{ fontWeight: 700, color: "#8c5ff8", fontFamily: "monospace", fontSize: 13 }}>
                          #{client.id}
                        </span>
                      </td>
                      <td>
                        <div className="client-avatar-cell">
                          <div className="client-avatar">
                            {client.name ? client.name.slice(0, 2).toUpperCase() : "CL"}
                          </div>
                          <div>
                            <strong className="client-name-title" style={{ display: "block" }}>{client.name}</strong>
                            <span className="client-company-sub" style={{ display: "block" }}>{client.company || "Individual"}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="contact-cell">
                          <span>{client.email}</span>
                          <span className="contact-phone">{client.phone}</span>
                        </div>
                      </td>
                      <td>
                        <span className="scheme-tag">
                          {client.scheme || "Standard"}
                        </span>
                      </td>
                      <td>
                        <strong style={{ fontSize: 14, fontWeight: 700 }}>₹{total.toLocaleString("en-IN")}</strong>
                      </td>
                      <td>
                        <div className="payment-progress-cell">
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span
                              style={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: isPaid ? "#10b981" : isPartial ? "#f59e0b" : "#f43f5e",
                              }}
                            >
                              {isPaid ? "✓ Paid" : isPartial ? `₹${pending.toLocaleString("en-IN")} pending` : "Unpaid"}
                            </span>
                            <span style={{ fontSize: 11, color: "#7a748e", fontWeight: 600 }}>{isPaid ? 100 : pct}%</span>
                          </div>
                          <div className="payment-mini-bar">
                            <div
                              className={`payment-mini-fill ${isPaid ? "paid" : isPartial ? "partial" : "pending"}`}
                              style={{ width: `${isPaid ? 100 : pct}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`stage-tag ${
                            client.stage === "Active"
                              ? "active"
                              : client.stage === "Onboarding"
                              ? "onboarding"
                              : client.stage === "Renewal"
                              ? "renewal"
                              : "prospect"
                          }`}
                        >
                          <span style={{ width: 6, height: 6, borderRadius: 999, background: "currentColor" }} />
                          {client.stage || "Active"}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <button
                          type="button"
                          className="sales-view-btn"
                          onClick={() => setViewingClient(client)}
                        >
                          <Icon name="eye" size={13} />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Client View Pop-up Modal */}
      {viewingClient && (
        <SalesClientViewModal
          client={viewingClient}
          onClose={() => setViewingClient(null)}
          onOpenFullDossier={(client) => {
            setViewingClient(null);
            onSelectClient?.(client);
          }}
          salesPersonName={salesPersonName}
          dark={dark}
        />
      )}
    </div>
  );
}


