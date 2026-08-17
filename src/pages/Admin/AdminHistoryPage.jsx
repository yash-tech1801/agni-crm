import React from "react";
import { stageBadgeColors } from "./mockAdminData";

export default function AdminHistoryPage({
  selectedBranch,
  branchClients,
}) {
  return (
    <section className="admin-page-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
        <div>
          <p className="dashboard-eyebrow">{selectedBranch}</p>
          <h1>Application Milestone Audit Trail</h1>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="clients-table" style={{ minWidth: 900 }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Application</th>
              <th>Client Name</th>
              <th>Milestone Stage</th>
              <th>Updated By</th>
              <th>Admin Notes & Verification Remarks</th>
            </tr>
          </thead>
          <tbody>
            {branchClients
              .flatMap((c) =>
                (c.history || []).map((h, i) => ({
                  ...h,
                  clientName: c.name,
                  company: c.company,
                  appId: c.appId,
                  rowKey: `${c.id}-${i}`,
                }))
              )
              .map((item) => (
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
                      {item.status}
                    </span>
                  </td>
                  <td><strong>{item.updatedBy}</strong></td>
                  <td>{item.notes}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
