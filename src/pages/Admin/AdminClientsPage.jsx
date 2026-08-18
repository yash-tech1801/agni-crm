import React from "react";
import { ACTIVITY_STAGES, stageBadgeColors, formatCurrency, getTrackerState } from "./mockAdminData";

export default function AdminClientsPage({
  selectedBranch,
  statusTab,
  setStatusTab,
  clientSearch,
  setClientSearch,
  filteredClients,
  onOpenStatusUpdate,
  onOpenDossier,
}) {
  return (
    <section className="admin-page-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
        <div>
          <p className="dashboard-eyebrow">{selectedBranch}</p>
          <h1>Branch Client Directory & Progress</h1>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["All", ...ACTIVITY_STAGES.map((s) => s.name)].map((tab) => (
            <button
              key={tab}
              type="button"
              className="table-action"
              style={{
                background: statusTab === tab ? "#4e7cff" : "#fff",
                color: statusTab === tab ? "#fff" : "#1d2330",
                border: statusTab === tab ? "1px solid #4e7cff" : "1px solid #e7e7f5",
                minWidth: 100,
              }}
              onClick={() => setStatusTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ minWidth: 260 }}>
          <input
            type="text"
            placeholder="Search client, company, app ID..."
            value={clientSearch}
            onChange={(e) => setClientSearch(e.target.value)}
            style={{ width: "100%", padding: "9px 14px", borderRadius: 8, border: "1px solid #dedfe1" }}
          />
        </div>
      </div>

      {/* Clients Table */}
      <div style={{ overflowX: "auto" }}>
        <table className="clients-table" style={{ minWidth: 980 }}>
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Client & Company</th>
              <th>Scheme / Value</th>
              <th>Sales Officer</th>
              <th>Activity Status (5 Points)</th>
              <th>Progress (%)</th>
              <th>Last Verified</th>
              <th style={{ textAlign: "right" }}>Admin Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => {
              const tracker = getTrackerState(client);

              return (
                <tr key={client.id}>
                  <td><strong>{client.appId}</strong></td>
                  <td>
                    <strong>{client.name}</strong>
                    <div style={{ fontSize: 12, color: "#7a748e" }}>{client.company}</div>
                  </td>
                  <td>
                    <div>{client.scheme}</div>
                    <strong style={{ color: "#4e7cff", fontSize: 12.5 }}>{formatCurrency(client.totalPayment)}</strong>
                  </td>
                  <td>{client.assignedSalesPerson}</td>
                  <td>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "3px 9px",
                          borderRadius: 999,
                          background: `${stageBadgeColors[client.applicationStatus || tracker.currentStage] || "#10b981"}18`,
                          color: stageBadgeColors[client.applicationStatus || tracker.currentStage] || "#10b981",
                          fontWeight: 700,
                          fontSize: 11.5,
                          width: "fit-content",
                        }}
                      >
                        ● {client.applicationStatus || tracker.currentStage}
                      </span>
                      {/* Dynamic scheme mini dots indicator */}
                      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                        {tracker.stages.map((st) => {
                          const isDone = tracker.completedStages.includes(st.name);
                          return (
                            <span
                              key={st.name}
                              title={`${st.name} (${st.percent}%) - ${isDone ? "Completed" : "Pending"}`}
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: isDone ? "#10b981" : "#cbd5e1",
                              }}
                            />
                          );
                        })}
                        <span style={{ fontSize: 10.5, color: "#64748b", marginLeft: 4 }}>
                          {tracker.completedStages.length}/{tracker.totalStages} Points
                        </span>
                      </div>
                    </div>
                  </td>
                  <td style={{ minWidth: 130 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ flex: 1, height: 8, background: "#e7e7f5", borderRadius: 999, overflow: "hidden" }}>
                        <div
                          style={{
                            width: `${tracker.progressPercent}%`,
                            height: "100%",
                            background: tracker.progressPercent === 100 ? "#10b981" : "linear-gradient(90deg, #10b981, #059669)",
                            borderRadius: 999,
                          }}
                        />
                      </div>
                      <strong style={{ fontSize: 12, color: tracker.progressPercent === 100 ? "#10b981" : "#1e293b" }}>
                        {tracker.progressPercent}%
                      </strong>
                    </div>
                  </td>
                  <td style={{ fontSize: 12, color: "#7a748e" }}>{client.lastUpdated}</td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                      <button
                        className="primary-button"
                        type="button"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: 32,
                          padding: "0 12px",
                          fontSize: 12,
                          fontWeight: 700,
                          borderRadius: 8,
                          margin: 0,
                          boxSizing: "border-box",
                        }}
                        onClick={() => onOpenStatusUpdate(client)}
                      >
                        Update Status
                      </button>
                      <button
                        className="admin-dossier-btn"
                        type="button"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 5,
                          height: 32,
                          padding: "0 12px",
                          fontSize: 12,
                          fontWeight: 700,
                          borderRadius: 8,
                          background: "#f0f4ff",
                          color: "#3730a3",
                          border: "1px solid #c7d2fe",
                          cursor: "pointer",
                          margin: 0,
                          boxSizing: "border-box",
                          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#4338ca";
                          e.currentTarget.style.color = "#ffffff";
                          e.currentTarget.style.borderColor = "#4338ca";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#f0f4ff";
                          e.currentTarget.style.color = "#3730a3";
                          e.currentTarget.style.borderColor = "#c7d2fe";
                        }}
                        onClick={() => onOpenDossier(client)}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                        <span>Dossier</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filteredClients.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: "36px 16px", color: "#7a748e" }}>
                  No clients found for {selectedBranch} under {statusTab}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
