import React from "react";
import Modal from "../../components/Modal";
import Icon from "../../components/Icon";

const formatDate = (value) => value || "—";

export default function RequestModal({ request, onClose, onApprove, onReject, readOnly }) {
  if (!request) return null;

  const isDelete = request.requestType === "Delete Client";
  const actionLabel = isDelete ? "Approve Client Deletion" : "Approve Changes";
  const statusClass = (request.status || "Pending").toLowerCase();

  return (
    <Modal title={`Request Details — ${request.id}`} onClose={onClose} closeLabel="Close">
      <div style={{ display: "grid", gap: 16 }}>
        {/* Header Profile Summary */}
        <div className="manager-modal-info-grid">
          <div className="manager-modal-card">
            <span className="manager-modal-card-label">Client Account</span>
            <span className="manager-modal-card-val">{request.clientName}</span>
          </div>
          <div className="manager-modal-card">
            <span className="manager-modal-card-label">Initiating Salesperson</span>
            <span className="manager-modal-card-val" style={{ color: "#8c5ff8" }}>{request.salesPerson}</span>
          </div>
          <div className="manager-modal-card">
            <span className="manager-modal-card-label">Request Type</span>
            <span className="manager-modal-card-val" style={{ color: "#3b82f6" }}>{request.requestType}</span>
          </div>
          <div className="manager-modal-card">
            <span className="manager-modal-card-label">Current Status</span>
            <span className={`manager-status-badge ${statusClass}`} style={{ width: "fit-content", marginTop: 4 }}>
              <span className="manager-status-dot" />
              {request.status}
            </span>
          </div>
        </div>

        {/* Reason Box */}
        <div className="manager-modal-card">
          <span className="manager-modal-card-label">Submission Reason & Justification</span>
          <div style={{ marginTop: 4, fontSize: 13.5, lineHeight: 1.5 }}>{request.reason}</div>
        </div>

        {/* Changes diff view */}
        {!isDelete && request.requestedChanges && request.requestedChanges.length > 0 && (
          <div style={{ display: "grid", gap: 10 }}>
            <span className="manager-modal-card-label">Requested Field Modifications</span>
            <div style={{ display: "grid", gap: 10 }}>
              {request.requestedChanges.map((change) => (
                <div key={change.field} className="manager-modal-card">
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#8c5ff8" }}>{change.field}</span>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 12, marginTop: 6 }}>
                    <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(244, 63, 94, 0.08)", border: "1px solid rgba(244, 63, 94, 0.2)" }}>
                      <span style={{ fontSize: 10.5, color: "#f43f5e", display: "block", fontWeight: 700, textTransform: "uppercase" }}>Original Value</span>
                      <strong style={{ fontSize: 13 }}>{change.oldValue}</strong>
                    </div>
                    <span style={{ color: "#7a748e", fontSize: 16 }}>→</span>
                    <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                      <span style={{ fontSize: 10.5, color: "#10b981", display: "block", fontWeight: 700, textTransform: "uppercase" }}>Proposed Value</span>
                      <strong style={{ fontSize: 13 }}>{change.newValue}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audit Details */}
        <div className="manager-modal-info-grid">
          <div className="manager-modal-card">
            <span className="manager-modal-card-label">Submission Date</span>
            <span className="manager-modal-card-val">{formatDate(request.createdAt)}</span>
          </div>
          <div className="manager-modal-card">
            <span className="manager-modal-card-label">Decision Audit</span>
            <span className="manager-modal-card-val">
              {request.decisionDate ? `${formatDate(request.decisionDate)} (by ${request.approvedBy || "Manager"})` : "Awaiting Review"}
            </span>
          </div>
        </div>

        {!readOnly && request.status === "Pending" && (
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 8 }}>
            <button className="manager-btn-danger" type="button" onClick={() => onReject(request.id)}>
              Reject Request
            </button>
            <button className="manager-btn-primary" type="button" onClick={() => onApprove(request.id)}>
              <Icon name="check" size={15} />
              <span>{actionLabel}</span>
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
