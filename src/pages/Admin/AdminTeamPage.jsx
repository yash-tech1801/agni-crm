import React, { useState, useMemo } from "react";
import { ACTIVITY_STAGES, stageBadgeColors, formatCurrency, getTrackerState } from "./mockAdminData";

export default function AdminTeamPage({
  selectedBranch,
  teamMembers = [],
  branchClients = [],
  onOpenDossier,
  onOpenStatusUpdate,
}) {
  const [selectedSalesPerson, setSelectedSalesPerson] = useState(null);
  const [clientSearch, setClientSearch] = useState("");
  const [statusTab, setStatusTab] = useState("All");

  // Filter ONLY sales persons belonging to the selected branch
  const branchSalesPersons = useMemo(() => {
    return teamMembers.filter((m) => {
      const isBranch = !m.branch || m.branch === selectedBranch;
      const isSales = (m.role || "").toLowerCase().includes("sales");
      return isBranch && isSales;
    });
  }, [teamMembers, selectedBranch]);

  // Helper to retrieve clients assigned to a specific sales person in this branch
  const getClientsForSalesPerson = (salesPersonName) => {
    if (!salesPersonName) return [];
    const normalizedName = salesPersonName.toLowerCase().trim();
    const matched = branchClients.filter(
      (c) =>
        c.assignedSalesPerson &&
        c.assignedSalesPerson.toLowerCase().trim() === normalizedName
    );

    // If no exact match, return branch clients
    if (matched.length > 0) return matched;
    return branchClients;
  };

  // DRILL DOWN VIEW: Clients under the selected sales person
  if (selectedSalesPerson) {
    const spClients = getClientsForSalesPerson(selectedSalesPerson.name);

    const filteredSpClients = spClients.filter((c) => {
      const q = clientSearch.trim().toLowerCase();
      const matchesSearch =
        !q ||
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.company && c.company.toLowerCase().includes(q)) ||
        (c.appId && c.appId.toLowerCase().includes(q)) ||
        (c.scheme && c.scheme.toLowerCase().includes(q));

      const matchesStage = statusTab === "All" || c.applicationStatus === statusTab;
      return matchesSearch && matchesStage;
    });

    return (
      <section className="admin-page-section">
        {/* Header with Back button */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
          <div>
            <p className="dashboard-eyebrow">{selectedBranch} • Sales Representative</p>
            <h1>Clients under {selectedSalesPerson.name}</h1>
          </div>
          <button
            type="button"
            className="table-action"
            onClick={() => {
              setSelectedSalesPerson(null);
              setClientSearch("");
              setStatusTab("All");
            }}
            style={{
              background: "#fff",
              color: "#1d2330",
              border: "1px solid #e7e7f5",
              padding: "8px 16px",
              fontWeight: 600,
            }}
          >
            ← Back to Team Roster
          </button>
        </div>

        {/* Filter Tabs & Search matching AdminClientsPage */}
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

        {/* Clients Table matching AdminClientsPage styling */}
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
              {filteredSpClients.map((client) => {
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
                    <td>{client.assignedSalesPerson || selectedSalesPerson.name}</td>
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
                        {onOpenStatusUpdate && (
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
                        )}
                        {onOpenDossier && (
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
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredSpClients.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "36px 16px", color: "#7a748e" }}>
                    No clients found for {selectedSalesPerson.name} under {statusTab}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  // MAIN TEAM VIEW: List of Sales Persons of the selected branch
  return (
    <section className="admin-page-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
        <div>
          <p className="dashboard-eyebrow">{selectedBranch}</p>
          <h1>Branch Sales Team</h1>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="clients-table" style={{ minWidth: 860 }}>
          <thead>
            <tr>
              <th>Team Member</th>
              <th>Branch Role</th>
              <th>Official Email</th>
              <th>Phone</th>
              <th>Assigned Client Accounts</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {branchSalesPersons.map((m) => {
              const assignedCount = getClientsForSalesPerson(m.name).length;

              return (
                <tr key={m.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 999,
                          background: "#4e7cff22",
                          color: "#4e7cff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: 13,
                        }}
                      >
                        {m.name.slice(0, 2).toUpperCase()}
                      </div>
                      <strong>{m.name}</strong>
                    </div>
                  </td>
                  <td><strong>{m.role}</strong></td>
                  <td>{m.email}</td>
                  <td>{m.phone}</td>
                  <td>
                    <strong style={{ color: "#4e7cff" }}>
                      {assignedCount} Client{assignedCount === 1 ? "" : "s"}
                    </strong>
                  </td>
                  <td>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "4px 10px",
                        borderRadius: 999,
                        background: "#44bfb022",
                        color: "#44bfb0",
                        fontWeight: 700,
                        fontSize: 12,
                      }}
                    >
                      {m.status || "Active"}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      className="primary-button"
                      type="button"
                      style={{ padding: "6px 14px", fontSize: 12 }}
                      onClick={() => setSelectedSalesPerson(m)}
                    >
                      View Clients
                    </button>
                  </td>
                </tr>
              );
            })}
            {branchSalesPersons.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "36px 16px", color: "#7a748e" }}>
                  No sales personnel found assigned to {selectedBranch}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
