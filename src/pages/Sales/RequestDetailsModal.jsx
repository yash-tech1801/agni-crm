import React from "react";
import Modal from "../../components/Modal";
import Icon from "../../components/Icon";

const formatDate = (value) => value || "—";

const statusConfig = {
  Pending: { bg: "rgba(245, 158, 11, 0.12)", color: "#f59e0b" },
  Approved: { bg: "rgba(16, 185, 129, 0.12)", color: "#10b981" },
  Rejected: { bg: "rgba(244, 63, 94, 0.12)", color: "#f43f5e" },
  Cancelled: { bg: "rgba(100, 116, 139, 0.12)", color: "#64748b" },
};

export default function RequestDetailsModal({ request, onClose }) {
  if (!request) return null;

  const isDelete = request.requestType === "Delete Client";
  const statusStyle = statusConfig[request.status] || statusConfig.Pending;

  return (
    <Modal title={`Request Details — ${request.id}`} onClose={onClose} closeLabel="Close">
      <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 680 }}>
        {/* Top Summary Banner */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
            padding: 16,
            borderRadius: 14,
            background: "linear-gradient(135deg, rgba(140, 95, 248, 0.08) 0%, rgba(109, 59, 245, 0.03) 100%)",
            border: "1px solid rgba(140, 95, 248, 0.16)",
          }}
        >
          <div>
            <span style={{ fontSize: 11.5, color: "#7a748e", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>Client Name</span>
            <strong style={{ display: "block", fontSize: 15, marginTop: 2 }}>{request.clientName}</strong>
          </div>
          <div>
            <span style={{ fontSize: 11.5, color: "#7a748e", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>Request Type</span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                fontSize: 12.5,
                fontWeight: 700,
                color: isDelete ? "#f43f5e" : "#8c5ff8",
                marginTop: 2,
              }}
            >
              <Icon name={isDelete ? "trash" : "document"} size={13} />
              {request.requestType}
            </span>
          </div>
          <div>
            <span style={{ fontSize: 11.5, color: "#7a748e", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>Status</span>
            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "3px 10px",
                  borderRadius: 999,
                  background: statusStyle.bg,
                  color: statusStyle.color,
                  fontWeight: 700,
                  fontSize: 11.5,
                  marginTop: 2,
                }}
              >
                {request.status}
              </span>
            </div>
          </div>
        </div>

        {/* Meta Info Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
          <div style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(140, 95, 248, 0.12)", background: "rgba(255, 255, 255, 0.02)" }}>
            <span style={{ fontSize: 11.5, color: "#7a748e", fontWeight: 600, display: "block" }}>Date Submitted</span>
            <strong style={{ fontSize: 13, marginTop: 3, display: "block" }}>{formatDate(request.createdAt)}</strong>
          </div>
          <div style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(140, 95, 248, 0.12)", background: "rgba(255, 255, 255, 0.02)" }}>
            <span style={{ fontSize: 11.5, color: "#7a748e", fontWeight: 600, display: "block" }}>Assigned Manager</span>
            <strong style={{ fontSize: 13, marginTop: 3, display: "block" }}>{request.managerName}</strong>
          </div>
          <div style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(140, 95, 248, 0.12)", background: "rgba(255, 255, 255, 0.02)" }}>
            <span style={{ fontSize: 11.5, color: "#7a748e", fontWeight: 600, display: "block" }}>Decision Date</span>
            <strong style={{ fontSize: 13, marginTop: 3, display: "block" }}>{formatDate(request.decisionDate)}</strong>
          </div>
        </div>

        {/* Reason Section */}
        <div style={{ padding: "14px 16px", borderRadius: 12, border: "1px solid rgba(140, 95, 248, 0.14)", background: "rgba(140, 95, 248, 0.04)" }}>
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#8c5ff8", display: "block", marginBottom: 6 }}>
            {isDelete ? "Reason for Deletion Request" : "Reason for Edit Request"}
          </span>
          <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: "inherit" }}>
            {request.reason || "No reason specified."}
          </p>
        </div>

        {/* Changes Diff List (for Edit Client) */}
        {!isDelete && request.requestedChanges && request.requestedChanges.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#8c5ff8" }}>
              Requested Modifications ({request.requestedChanges.length})
            </span>
            <div style={{ display: "grid", gap: 10 }}>
              {request.requestedChanges.map((change) => (
                <div
                  key={change.field}
                  style={{
                    borderRadius: 12,
                    border: "1px solid rgba(140, 95, 248, 0.14)",
                    background: "rgba(255, 255, 255, 0.02)",
                    padding: "12px 16px",
                  }}
                >
                  <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 8, color: "#8c5ff8" }}>
                    {change.field}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "center" }}>
                    <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(244, 63, 94, 0.08)", border: "1px solid rgba(244, 63, 94, 0.2)" }}>
                      <span style={{ fontSize: 11, color: "#f43f5e", fontWeight: 600, display: "block" }}>Original</span>
                      <strong style={{ fontSize: 13, wordBreak: "break-word" }}>{change.oldValue || "—"}</strong>
                    </div>
                    <span style={{ color: "#8c5ff8", fontWeight: 800, fontSize: 16 }}>→</span>
                    <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                      <span style={{ fontSize: 11, color: "#10b981", fontWeight: 600, display: "block" }}>Requested</span>
                      <strong style={{ fontSize: 13, wordBreak: "break-word", color: "#10b981" }}>{change.newValue || "—"}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Manager Remarks if available */}
        {request.managerRemarks && (
          <div style={{ padding: "14px 16px", borderRadius: 12, border: "1px solid rgba(140, 95, 248, 0.14)", background: "rgba(255, 255, 255, 0.03)" }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#8c5ff8", display: "block", marginBottom: 4 }}>
              Manager Remarks
            </span>
            <p style={{ margin: 0, fontSize: 13, color: "inherit" }}>{request.managerRemarks}</p>
          </div>
        )}

        {/* Close Button */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
          <button type="button" className="sales-btn-secondary" onClick={onClose} style={{ padding: "8px 20px" }}>
            Close Details
          </button>
        </div>
      </div>
    </Modal>
  );
}

