import React from "react";
import Icon from "../../components/Icon";
import "./AdminDashboard.css";

export default function AdminRequestModal({ request, onClose }) {
  if (!request) return null;

  const isApproved = request.status === "Approved";
  const isRejected = request.status === "Rejected";

  return (
    <div className="admin-modal-backdrop-wrap" onClick={onClose}>
      <div
        className="admin-panel-card admin-modal-card-container hide-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="admin-modal-header-row">
          <div>
            <span className="admin-kicker">
              REQUEST INSPECTION • {request.id}
            </span>
            <h2 className="admin-title" style={{ fontSize: 20 }}>
              {request.requestType}
            </h2>
          </div>
          <button
            type="button"
            className="admin-btn-secondary admin-modal-close-circle"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Top Summary Box */}
        <div className="admin-subcard admin-modal-client-card" style={{ marginBottom: 16 }}>
          <div>
            <span className="admin-modal-metric-label">
              Target Client
            </span>
            <strong style={{ fontSize: 14.5, marginTop: 2, display: "block" }}>{request.clientName}</strong>
            <small className="admin-req-subtext">
              App ID: {request.clientAppId} • {request.company}
            </small>
          </div>

          <div>
            <span className="admin-modal-metric-label">
              Recipient Authority
            </span>
            <strong style={{ fontSize: 14, marginTop: 2, display: "block", color: "#8c5ff8" }}>
              {request.recipient || "Branch Manager"}
            </strong>
            <small className="admin-req-subtext">Branch: {request.branch}</small>
          </div>

          <div>
            <span className="admin-modal-metric-label">
              Status
            </span>
            <div style={{ marginTop: 4 }}>
              <span className={`admin-badge ${isApproved ? "admin-status-approved" : isRejected ? "admin-status-rejected" : "admin-status-pending"}`}>
                <span className="admin-status-dot" />
                {request.status}
              </span>
            </div>
          </div>
        </div>

        {/* 3 Metric Pills */}
        <div className="admin-modal-grid-3">
          <div className="admin-subcard admin-modal-metric-card">
            <span className="admin-modal-metric-label">Created On</span>
            <strong className="admin-modal-metric-val">{request.createdAt}</strong>
          </div>
          <div className="admin-subcard admin-modal-metric-card">
            <span className="admin-modal-metric-label">Priority</span>
            <strong className={`admin-modal-metric-val ${request.priority === "High" || request.priority === "Urgent" ? "admin-req-priority-high" : "admin-req-priority-normal"}`}>
              {request.priority || "Normal"}
            </strong>
          </div>
          <div className="admin-subcard admin-modal-metric-card">
            <span className="admin-modal-metric-label">Target Rollback</span>
            <strong className="admin-modal-metric-val admin-req-target-amber">
              ↩ {request.targetStage || "N/A"}
            </strong>
          </div>
        </div>

        {/* Reason Statement */}
        <div className="admin-subcard" style={{ padding: "12px 14px", marginBottom: 16 }}>
          <span className="admin-modal-metric-label" style={{ fontWeight: 700, marginBottom: 4 }}>
            Reason &amp; Audit Justification
          </span>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5 }}>
            {request.reason}
          </p>
        </div>

        {/* Requested Changes Table */}
        {request.requestedChanges && request.requestedChanges.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <span className="admin-modal-metric-label" style={{ fontWeight: 700, marginBottom: 6 }}>
              Requested Change Differentials ({request.requestedChanges.length})
            </span>
            <div className="admin-modal-diff-table-wrap">
              <table className="admin-modal-table-diff">
                <thead>
                  <tr>
                    <th className="admin-modal-th">Property</th>
                    <th className="admin-modal-th">Committed Value</th>
                    <th className="admin-modal-th">Requested Value</th>
                  </tr>
                </thead>
                <tbody>
                  {request.requestedChanges.map((ch, idx) => (
                    <tr key={idx}>
                      <td className="admin-modal-td" style={{ fontWeight: 700 }}>{ch.field}</td>
                      <td className="admin-modal-td" style={{ color: "#f43f5e", textDecoration: "line-through" }}>{ch.oldValue}</td>
                      <td className="admin-modal-td" style={{ color: "#10b981", fontWeight: 700 }}>{ch.newValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Branch Manager Remarks if decided */}
        {request.managerRemarks && (
          <div className={`admin-modal-remarks ${isApproved ? "approved" : "rejected"}`}>
            <span className="admin-modal-metric-label" style={{ fontWeight: 700, color: isApproved ? "#10b981" : "#f43f5e", marginBottom: 3 }}>
              Branch Manager Decision Remarks
            </span>
            <p style={{ margin: 0, fontSize: 13 }}>{request.managerRemarks}</p>
            {request.decisionDate && (
              <small className="admin-req-subtext" style={{ display: "block", marginTop: 4 }}>
                Decided on: {request.decisionDate}
              </small>
            )}
          </div>
        )}

        {/* Footer Close */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
          <button type="button" className="admin-btn-primary" onClick={onClose} style={{ padding: "8px 22px" }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
