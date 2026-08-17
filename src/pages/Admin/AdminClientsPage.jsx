import React from "react";
import { ACTIVITY_STAGES, stageBadgeColors, formatCurrency } from "./mockAdminData";

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
              const completed = client.completedSteps || (
                client.progress ? ACTIVITY_STAGES.slice(0, Math.round(client.progress / 20)).map(s => s.name) : ["Submission"]
              );

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
                          background: `${stageBadgeColors[client.applicationStatus] || "#10b981"}18`,
                          color: stageBadgeColors[client.applicationStatus] || "#10b981",
                          fontWeight: 700,
                          fontSize: 11.5,
                          width: "fit-content",
                        }}
                      >
                        ● {client.applicationStatus}
                      </span>
                      {/* 5 mini dots indicator */}
                      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                        {ACTIVITY_STAGES.map((st) => {
                          const isDone = completed.includes(st.name);
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
                          {completed.length}/5 Points
                        </span>
                      </div>
                    </div>
                  </td>
                  <td style={{ minWidth: 130 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ flex: 1, height: 8, background: "#e7e7f5", borderRadius: 999, overflow: "hidden" }}>
                        <div
                          style={{
                            width: `${client.progress}%`,
                            height: "100%",
                            background: client.progress === 100 ? "#10b981" : "linear-gradient(90deg, #10b981, #059669)",
                            borderRadius: 999,
                          }}
                        />
                      </div>
                      <strong style={{ fontSize: 12, color: client.progress === 100 ? "#10b981" : "#1e293b" }}>
                        {client.progress}%
                      </strong>
                    </div>
                  </td>
                  <td style={{ fontSize: 12, color: "#7a748e" }}>{client.lastUpdated}</td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: 6 }}>
                      <button
                        className="primary-button"
                        type="button"
                        style={{ padding: "6px 12px", fontSize: 12 }}
                        onClick={() => onOpenStatusUpdate(client)}
                      >
                        Update Status
                      </button>
                      <button
                        className="table-action"
                        type="button"
                        onClick={() => onOpenDossier(client)}
                      >
                        Dossier
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
