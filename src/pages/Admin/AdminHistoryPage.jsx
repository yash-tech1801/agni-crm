import React, { useState, useMemo } from "react";
import { stageBadgeColors } from "./mockAdminData";

export default function AdminHistoryPage({
  selectedBranch,
  branchClients = [],
  onOpenDossier,
}) {
  const [historySearch, setHistorySearch] = useState("");

  const historyItems = useMemo(() => {
    const flattened = branchClients.flatMap((c) =>
      (c.history || []).map((h, i) => ({
        ...h,
        client: c,
        clientName: c.name,
        company: c.company,
        appId: c.appId,
        scheme: c.scheme,
        rowKey: `${c.id}-${i}-${h.date}-${h.status}`,
      }))
    );

    // Sort descending by date
    flattened.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

    if (!historySearch.trim()) return flattened;

    const q = historySearch.toLowerCase();
    return flattened.filter(
      (item) =>
        item.clientName.toLowerCase().includes(q) ||
        item.company.toLowerCase().includes(q) ||
        item.appId.toLowerCase().includes(q) ||
        (item.status && item.status.toLowerCase().includes(q)) ||
        (item.updatedBy && item.updatedBy.toLowerCase().includes(q)) ||
        (item.notes && item.notes.toLowerCase().includes(q))
    );
  }, [branchClients, historySearch]);

  return (
    <section className="admin-page-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
        <div>
          <p className="dashboard-eyebrow">{selectedBranch}</p>
          <h1 style={{ margin: 0 }}>Application Milestone Audit Trail</h1>
          <p style={{ margin: "4px 0 0", color: "#7a748e", fontSize: 13 }}>
            Complete historical log of verification stages, updates, and admin notes across branch clients.
          </p>
        </div>

        {/* Quick Search */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input
            type="text"
            placeholder="Search audit trail..."
            value={historySearch}
            onChange={(e) => setHistorySearch(e.target.value)}
            style={{
              padding: "7px 14px",
              borderRadius: 8,
              border: "1px solid #dcdfe6",
              fontSize: 13,
              width: 220,
              outline: "none",
            }}
          />
        </div>
      </div>

      <div style={{ overflowX: "auto", background: "#fff", borderRadius: 16, border: "1px solid #e7e7f5" }}>
        <table className="clients-table" style={{ minWidth: 960, margin: 0 }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Application</th>
              <th>Client & Company</th>
              <th>Milestone Stage</th>
              <th>Updated By</th>
              <th>Admin Notes & Remarks</th>
              <th style={{ textAlign: "right" }}>Client Details</th>
            </tr>
          </thead>
          <tbody>
            {historyItems.map((item) => (
              <tr key={item.rowKey}>
                <td><strong>{item.date}</strong></td>
                <td><code>{item.appId}</code></td>
                <td>
                  <strong>{item.clientName}</strong>
                  <div style={{ fontSize: 12, color: "#7a748e" }}>{item.company}</div>
                </td>
                <td>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "4px 10px",
                      borderRadius: 999,
                      background: `${stageBadgeColors[item.status] || "#10b981"}22`,
                      color: stageBadgeColors[item.status] || "#10b981",
                      fontWeight: 700,
                      fontSize: 12,
                    }}
                  >
                    ● {item.status}
                  </span>
                </td>
                <td><strong>{item.updatedBy}</strong></td>
                <td style={{ maxWidth: 320, color: "#475569", fontSize: 12.5 }}>{item.notes}</td>
                <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
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
                        boxShadow: "0 1px 2px rgba(55, 48, 163, 0.06)",
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
                      onClick={() => onOpenDossier(item.client)}
                      title={`View full details & dossier for ${item.clientName}`}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                      <span>View Details</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {historyItems.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "36px 16px", color: "#7a748e" }}>
                  No audit history records found for {selectedBranch}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
