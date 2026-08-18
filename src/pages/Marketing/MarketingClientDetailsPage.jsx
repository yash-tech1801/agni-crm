import React, { useState, useMemo } from "react";
import Icon from "../../components/Icon";
import { branchOptions } from "./mockMarketingData";
import MarketingClientInfoModal from "./MarketingClientInfoModal";
import "./MarketingDashboard.css";

export default function MarketingClientDetailsPage({
  createdClients = [],
  salesPitchedClients = [],
  onNavigateToCreateClient,
  dark,
}) {
  const [selectedBranch, setSelectedBranch] = useState("East");
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [selectedClientModal, setSelectedClientModal] = useState(null);

  // Combine both sources
  const allMarketingClients = useMemo(() => {
    const fromSales = salesPitchedClients.map((c) => ({
      ...c,
      origin: "Sales Pitched",
    }));
    const fromDirect = createdClients.map((c) => ({
      ...c,
      origin: "Marketing Direct Created",
    }));
    return [...fromDirect, ...fromSales];
  }, [createdClients, salesPitchedClients]);

  // Filter clients by branch, search query, stage, and payment status
  const filteredClients = useMemo(() => {
    return allMarketingClients.filter((client) => {
      if (selectedBranch !== "ALL" && client.branch !== selectedBranch) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = (client.name || "").toLowerCase().includes(q);
        const matchesCompany = (client.company || "").toLowerCase().includes(q);
        const matchesService = (client.serviceName || "").toLowerCase().includes(q);
        const matchesPerson = (client.contactPerson || "").toLowerCase().includes(q);
        if (!matchesName && !matchesCompany && !matchesService && !matchesPerson) {
          return false;
        }
      }

      if (stageFilter !== "all" && client.stage !== stageFilter) {
        return false;
      }

      const pending = Number(client.paymentPending || 0);
      const received = Number(client.paymentReceived || 0);
      if (paymentFilter === "paid" && (pending > 0 || received === 0)) return false;
      if (paymentFilter === "partial" && (pending === 0 || received === 0)) return false;
      if (paymentFilter === "pending" && received > 0) return false;

      return true;
    });
  }, [allMarketingClients, selectedBranch, searchQuery, stageFilter, paymentFilter]);

  const totalClientsCount = filteredClients.length;
  const branchPitchedCount = filteredClients.filter((c) => c.origin === "Sales Pitched").length;
  const directCreatedCount = filteredClients.filter((c) => c.origin === "Marketing Direct Created").length;
  const totalRevenue = filteredClients.reduce(
    (acc, c) => acc + Number(c.totalPayment || c.amount || 0),
    0
  );

  return (
    <div className="mkt-page-container mkt-details-page">
      {/* Glass Header Banner */}
      <div className="mkt-header-banner">
        <div>
          <span className="mkt-kicker">CENTRALIZED MARKETING CLIENT DIRECTORY</span>
          <h2 className="mkt-title">Client &amp; Service Details</h2>
          <p className="mkt-desc">
            Unified register of all Marketing-created clients and branch clients pitched by sales representatives for Marketing services.
          </p>
        </div>

        <button
          type="button"
          className="mkt-btn-primary"
          onClick={onNavigateToCreateClient}
        >
          <Icon name="plus" size={16} />
          <span>Create New Client</span>
        </button>
      </div>

      {/* High-Aesthetic KPI Stat Cards */}
      <div className="mkt-kpi-grid">
        <div className="mkt-stat-card blue">
          <div className="mkt-stat-top">
            <span className="mkt-stat-label">Total Displayed Clients</span>
            <div className="mkt-stat-icon-wrap">
              <Icon name="clients" size={18} />
            </div>
          </div>
          <div className="mkt-stat-value">{totalClientsCount}</div>
          <div className="mkt-stat-pill">
            <span>●</span>
            <span>{selectedBranch === "ALL" ? "All Branches" : `${selectedBranch} Branch Active`}</span>
          </div>
        </div>

        <div className="mkt-stat-card green">
          <div className="mkt-stat-top">
            <span className="mkt-stat-label">Sales Pitched (Marketing)</span>
            <div className="mkt-stat-icon-wrap">
              <Icon name="reports" size={18} />
            </div>
          </div>
          <div className="mkt-stat-value">{branchPitchedCount}</div>
          <div className="mkt-stat-pill">
            <span>●</span>
            <span>From Branch Sales</span>
          </div>
        </div>

        <div className="mkt-stat-card purple">
          <div className="mkt-stat-top">
            <span className="mkt-stat-label">Direct Marketing Created</span>
            <div className="mkt-stat-icon-wrap">
              <Icon name="plus" size={18} />
            </div>
          </div>
          <div className="mkt-stat-value">{directCreatedCount}</div>
          <div className="mkt-stat-pill">
            <span>●</span>
            <span>Marketing Direct</span>
          </div>
        </div>

        <div className="mkt-stat-card amber">
          <div className="mkt-stat-top">
            <span className="mkt-stat-label">Marketing Pipeline Revenue</span>
            <div className="mkt-stat-icon-wrap">
              <Icon name="revenue" size={18} />
            </div>
          </div>
          <div className="mkt-stat-value">₹{totalRevenue.toLocaleString("en-IN")}</div>
          <div className="mkt-stat-pill">
            <span>●</span>
            <span>Total Invoiced / Deals</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="mkt-filter-bar">
        {/* Branch Selector Tabs */}
        <div className="mkt-branch-tabs">
          <span style={{ fontSize: 12, fontWeight: 700, color: "#64748b", marginRight: 4 }}>
            Branch View:
          </span>
          {branchOptions.map((b) => (
            <button
              key={b}
              type="button"
              className={`mkt-branch-tab ${selectedBranch === b ? "active" : ""}`}
              onClick={() => setSelectedBranch(b)}
            >
              {b} Branch
            </button>
          ))}
          <button
            type="button"
            className={`mkt-branch-tab ${selectedBranch === "ALL" ? "active" : ""}`}
            onClick={() => setSelectedBranch("ALL")}
          >
            All Branches ({allMarketingClients.length})
          </button>
        </div>

        {/* Search & Filter Dropdowns */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <div style={{ position: "relative", minWidth: 220 }}>
            <input
              type="text"
              className="mkt-form-input"
              placeholder="Search company, contact, or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: 34, height: 38 }}
            />
            <div
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#64748b",
                pointerEvents: "none",
              }}
            >
              <Icon name="search" size={15} />
            </div>
          </div>

          <select
            className="mkt-form-select"
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            style={{ width: 140, height: 38, padding: "0 10px", fontSize: 12.5 }}
          >
            <option value="all">All Stages</option>
            <option value="Active">Active</option>
            <option value="In Progress">In Progress</option>
            <option value="Agreement">Agreement</option>
          </select>

          <select
            className="mkt-form-select"
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            style={{ width: 140, height: 38, padding: "0 10px", fontSize: 12.5 }}
          >
            <option value="all">All Payments</option>
            <option value="paid">Fully Paid</option>
            <option value="partial">Partial</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Unified Client Directory Table */}
      <div className="mkt-table-wrap">
        <table className="mkt-table">
          <thead>
            <tr>
              <th>Client &amp; Company</th>
              <th>Branch</th>
              <th>Service Line (Marketing)</th>
              <th>Origin / Sales Rep</th>
              <th>Deal Value (₹)</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ color: "#64748b", fontSize: 14 }}>
                    No marketing clients found matching your branch or filter criteria.
                  </div>
                  <button
                    type="button"
                    className="mkt-btn-secondary"
                    style={{ marginTop: 12 }}
                    onClick={() => {
                      setSelectedBranch("ALL");
                      setSearchQuery("");
                      setStageFilter("all");
                      setPaymentFilter("all");
                    }}
                  >
                    Clear All Filters
                  </button>
                </td>
              </tr>
            ) : (
              filteredClients.map((client) => {
                const total = Number(client.totalPayment || client.amount || 0);
                const pending = Number(client.paymentPending || 0);
                const received = Number(client.paymentReceived || 0);
                const isPaid = pending <= 0 && received > 0;

                return (
                  <tr key={`${client.origin}-${client.id}`}>
                    {/* Client & Company */}
                    <td>
                      <div>
                        <strong style={{ fontSize: 13.5, display: "block" }}>
                          {client.company || client.name}
                        </strong>
                        <span style={{ fontSize: 11.5, color: "#64748b" }}>
                          {client.contactPerson || client.name} • {client.phone || client.email}
                        </span>
                      </div>
                    </td>

                    {/* Branch */}
                    <td>
                      <span
                        className="mkt-badge"
                        style={{
                          background:
                            client.branch === "East"
                              ? "rgba(78, 124, 255, 0.12)"
                              : client.branch === "West"
                              ? "rgba(154, 116, 233, 0.12)"
                              : client.branch === "South"
                              ? "rgba(16, 185, 129, 0.12)"
                              : "rgba(245, 158, 11, 0.12)",
                          color:
                            client.branch === "East"
                              ? "#4e7cff"
                              : client.branch === "West"
                              ? "#9a74e9"
                              : client.branch === "South"
                              ? "#10b981"
                              : "#f59e0b",
                        }}
                      >
                        {client.branch} Branch
                      </span>
                    </td>

                    {/* Marketing Service Line */}
                    <td>
                      <div style={{ maxWidth: 220 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, display: "block" }}>
                          {client.serviceName || "Digital Marketing"}
                        </span>
                        <span style={{ fontSize: 11, color: "#64748b" }}>
                          SLA: {client.slaTier || "Standard Retainer"}
                        </span>
                      </div>
                    </td>

                    {/* Origin & Rep */}
                    <td>
                      <div>
                        <span
                          className="mkt-badge"
                          style={{
                            background:
                              client.origin === "Marketing Direct Created"
                                ? "rgba(16, 185, 129, 0.12)"
                                : "rgba(78, 124, 255, 0.12)",
                            color:
                              client.origin === "Marketing Direct Created"
                                ? "#10b981"
                                : "#4e7cff",
                            fontSize: 10.5,
                          }}
                        >
                          {client.origin}
                        </span>
                        <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>
                          Rep: {client.salesPerson || "Marketing Lead"}
                        </div>
                      </div>
                    </td>

                    {/* Deal Value */}
                    <td>
                      <div>
                        <strong style={{ fontSize: 13.5 }}>
                          ₹{total.toLocaleString("en-IN")}
                        </strong>
                        <div style={{ fontSize: 11, color: "#64748b" }}>
                          +18% GST incl.
                        </div>
                      </div>
                    </td>

                    {/* Stage Status */}
                    <td>
                      <span
                        className="mkt-badge"
                        style={{
                          background:
                            client.stage === "Active"
                              ? "rgba(16, 185, 129, 0.15)"
                              : client.stage === "In Progress"
                              ? "rgba(78, 124, 255, 0.15)"
                              : "rgba(245, 158, 11, 0.15)",
                          color:
                            client.stage === "Active"
                              ? "#10b981"
                              : client.stage === "In Progress"
                              ? "#4e7cff"
                              : "#f59e0b",
                        }}
                      >
                        {client.stage || "Active"}
                      </span>
                    </td>

                    {/* Payment Status */}
                    <td>
                      {isPaid ? (
                        <span
                          className="mkt-badge"
                          style={{
                            background: "rgba(16, 185, 129, 0.15)",
                            color: "#10b981",
                          }}
                        >
                          ✓ Fully Paid
                        </span>
                      ) : (
                        <div>
                          <span
                            className="mkt-badge"
                            style={{
                              background: "rgba(245, 158, 11, 0.15)",
                              color: "#f59e0b",
                            }}
                          >
                            ₹{pending.toLocaleString("en-IN")} Due
                          </span>
                          <div style={{ fontSize: 10.5, color: "#64748b", marginTop: 2 }}>
                            Recv: ₹{received.toLocaleString("en-IN")}
                          </div>
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td style={{ textAlign: "right" }}>
                      <button
                        type="button"
                        className="mkt-btn-secondary"
                        style={{ padding: "5px 12px", fontSize: 11.5 }}
                        onClick={() => setSelectedClientModal(client)}
                      >
                        View Dossier
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Client Dossier Modal */}
      {selectedClientModal && (
        <MarketingClientInfoModal
          client={selectedClientModal}
          onClose={() => setSelectedClientModal(null)}
        />
      )}
    </div>
  );
}
