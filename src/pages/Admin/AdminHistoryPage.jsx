import React, { useState, useMemo } from "react";
import { stageBadgeColors } from "./mockAdminData";
import "./AdminDashboard.css";

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
    <div className="admin-page-container">
      {/* Glass Header Banner */}
      <div className="admin-header-banner">
        <div>
          <span className="admin-kicker">COMPLIANCE &amp; LOGS</span>
          <h2 className="admin-title">{selectedBranch} Milestone Audit Trail</h2>
          <p className="admin-desc">
            Complete historical log of verification stages, updates, and admin notes across branch clients.
          </p>
        </div>

        {/* Quick Search */}
        <div style={{ minWidth: 260 }}>
          <input
            type="text"
            className="admin-form-input"
            placeholder="Search audit trail..."
            value={historySearch}
            onChange={(e) => setHistorySearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table Wrap */}
      <div className="admin-table-wrap" style={{ overflowX: "auto" }}>
        <table className="admin-table" style={{ minWidth: 960 }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Application</th>
              <th>Client &amp; Company</th>
              <th>Milestone Stage</th>
              <th>Updated By</th>
              <th>Admin Notes &amp; Remarks</th>
              <th style={{ textAlign: "right" }}>Client Details</th>
            </tr>
          </thead>
          <tbody>
            {historyItems.map((item) => (
              <tr key={item.rowKey}>
                <td><strong>{item.date}</strong></td>
                <td><code style={{ color: "#4e7cff", fontWeight: 700 }}>{item.appId}</code></td>
                <td>
                  <strong>{item.clientName}</strong>
                  <div style={{ fontSize: 12, color: "#64748b" }}>{item.company}</div>
                </td>
                <td>
                  <span
                    className="admin-badge"
                    style={{
                      background: `${stageBadgeColors[item.status] || "#10b981"}22`,
                      color: stageBadgeColors[item.status] || "#10b981",
                      border: `1px solid ${stageBadgeColors[item.status] || "#10b981"}33`,
                    }}
                  >
                    ● {item.status}
                  </span>
                </td>
                <td><strong>{item.updatedBy}</strong></td>
                <td style={{ maxWidth: 320, color: "#64748b", fontSize: 12.5 }}>{item.notes}</td>
                <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                  {onOpenDossier && (
                    <button
                      className="admin-btn-secondary"
                      type="button"
                      style={{ padding: "5px 10px", fontSize: 11.5 }}
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
                <td colSpan={7} style={{ textAlign: "center", padding: "36px 16px", color: "#64748b" }}>
                  No audit history records found for {selectedBranch}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
