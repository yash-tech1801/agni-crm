import React from "react";
import Icon from "../../../components/Icon";

export default function SalesClientDirectory({
  clients,
  filteredClients,
  clientSearch,
  setClientSearch,
  stageFilter,
  setStageFilter,
  paymentFilter,
  setPaymentFilter,
  onSelectClient,
  onCreateNewClient,
  dark,
}) {
  return (
    <div className="sales-clients-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 4, flexWrap: 'wrap' }}>
        <div>
          <p className="eyebrow" style={{ margin: 0, textTransform: 'uppercase', letterSpacing: 1, fontSize: 11.5, color: '#8c5ff8', fontWeight: 700 }}>Client Dossier</p>
          <h2 style={{ margin: '4px 0 2px', fontSize: 24, fontWeight: 800, color: dark ? '#f3effc' : '#1e1932' }}>Sales Client Directory</h2>
          <p style={{ margin: 0, color: '#7a748e', fontSize: 13 }}>Click the <strong>View</strong> button on any client to view their complete profile, financials, and submitted documents.</p>
        </div>
        <button
          type="button"
          className="sales-add-btn"
          onClick={onCreateNewClient}
        >
          <Icon name="plus" size={16} />
          <span>Create New Client</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="sales-toolbar" style={{ marginTop: 12 }}>
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

        <div style={{ color: '#7a748e', fontSize: 13, fontWeight: 500 }}>
          Showing <strong>{filteredClients.length}</strong> of {clients.length} clients
        </div>
      </div>

      {/* Directory Table */}
      <div className="sales-table-card" style={{ marginTop: 14 }}>
        <table className="sales-clients-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client & Company</th>
              <th>Contact</th>
              <th>Scheme</th>
              <th>Total Value</th>
              <th>Payment Status</th>
              <th>Stage</th>
              <th style={{ textAlign: 'right' }}>Action</th>
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
                  <td><strong>#{client.id}</strong></td>
                  <td>
                    <div className="client-avatar-cell">
                      <div className="client-avatar">
                        {client.name ? client.name.slice(0, 2).toUpperCase() : "CL"}
                      </div>
                      <div>
                        <div className="client-name-title">{client.name}</div>
                        <div className="client-company-sub">{client.company}</div>
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
                    <strong>₹{total.toLocaleString("en-IN")}</strong>
                  </td>
                  <td>
                    <div className="payment-progress-cell">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className={`payment-pill ${isPaid ? 'paid' : isPartial ? 'partial' : 'pending'}`}>
                          {isPaid ? "✓ Paid" : isPartial ? `₹${pending.toLocaleString("en-IN")} pending` : "Unpaid"}
                        </span>
                      </div>
                      <div className="payment-mini-bar">
                        <div
                          className={`payment-mini-fill ${isPaid ? 'paid' : isPartial ? 'partial' : 'pending'}`}
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
                      {client.stage}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      className="sales-view-btn"
                      onClick={() => onSelectClient(client)}
                    >
                      <Icon name="eye" size={14} />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
