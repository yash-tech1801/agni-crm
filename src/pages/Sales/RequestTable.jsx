import React from "react";
import Icon from "../../components/Icon";

const statusConfig = {
  Pending: { bg: "rgba(245, 158, 11, 0.12)", color: "#f59e0b", dot: "#f59e0b" },
  Approved: { bg: "rgba(16, 185, 129, 0.12)", color: "#10b981", dot: "#10b981" },
  Rejected: { bg: "rgba(244, 63, 94, 0.12)", color: "#f43f5e", dot: "#f43f5e" },
  Cancelled: { bg: "rgba(100, 116, 139, 0.12)", color: "#64748b", dot: "#64748b" },
};

export default function RequestTable({ requests = [], onView, onCancel }) {
  if (requests.length === 0) {
    return (
      <div style={{ padding: "48px 24px", textAlign: "center" }}>
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            background: "rgba(140, 95, 248, 0.12)",
            color: "#8c5ff8",
            display: "grid",
            placeItems: "center",
            margin: "0 auto 16px",
          }}
        >
          <Icon name="clock" size={24} />
        </div>
        <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 700 }}>No Pending Requests</h3>
        <p style={{ margin: 0, color: "#7a748e", fontSize: 13, maxWidth: 360, marginInline: "auto" }}>
          All client profile edits and deletion requests have been processed. Use "+ Create Request" to submit a new one.
        </p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table className="sales-clients-table" style={{ width: "100%", minWidth: 860, margin: 0 }}>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Client Name</th>
            <th>Request Type</th>
            <th>Assigned Manager</th>
            <th>Submitted On</th>
            <th>Status</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => {
            const conf = statusConfig[request.status] || statusConfig.Pending;
            const isDelete = request.requestType === "Delete Client";
            return (
              <tr key={request.id}>
                <td>
                  <span style={{ fontWeight: 700, color: "#8c5ff8", fontFamily: "monospace", fontSize: 12.5 }}>
                    {request.id}
                  </span>
                </td>
                <td>
                  <strong style={{ display: "block", fontSize: 13.5 }}>{request.clientName}</strong>
                </td>
                <td>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      color: isDelete ? "#f43f5e" : "#8c5ff8",
                    }}
                  >
                    <Icon name={isDelete ? "trash" : "document"} size={13} />
                    {request.requestType}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: 13, color: "#7a748e" }}>{request.managerName}</span>
                </td>
                <td>
                  <span style={{ fontSize: 12.5, color: "#7a748e" }}>{request.createdAt}</span>
                </td>
                <td>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "4px 10px",
                      borderRadius: 999,
                      background: conf.bg,
                      color: conf.color,
                      fontWeight: 700,
                      fontSize: 11.5,
                    }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: conf.dot }} />
                    {request.status}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <button
                      className="sales-view-btn"
                      type="button"
                      onClick={() => onView(request)}
                      style={{ padding: "6px 14px", fontSize: 12 }}
                    >
                      <span>View</span>
                    </button>
                    {request.status === "Pending" && (
                      <button
                        type="button"
                        onClick={() => onCancel(request.id)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          padding: "6px 12px",
                          borderRadius: 8,
                          border: "1px solid rgba(244, 63, 94, 0.35)",
                          background: "rgba(244, 63, 94, 0.08)",
                          color: "#f43f5e",
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(244, 63, 94, 0.18)";
                          e.currentTarget.style.borderColor = "#f43f5e";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(244, 63, 94, 0.08)";
                          e.currentTarget.style.borderColor = "rgba(244, 63, 94, 0.35)";
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

