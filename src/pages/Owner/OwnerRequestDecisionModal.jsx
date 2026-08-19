import React, { useState } from "react";
import SimpleModal from "../../components/SimpleModal";

export default function OwnerRequestDecisionModal({
  selectedRequest,
  onClose,
  onApprove,
  onReject,
}) {
  const [remarksInput, setRemarksInput] = useState("");

  if (!selectedRequest) return null;

  const statusClass = (selectedRequest.status || "pending").toLowerCase();

  return (
    <SimpleModal onClose={onClose}>
      <div className="owner-modal-profile">
        <div className="owner-modal-avatar">REQ</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <span className="owner-rep-pill" style={{ fontFamily: "monospace", fontWeight: 700 }}>
                {selectedRequest.id}
              </span>
              <h2 className="owner-header-title" style={{ marginTop: 4 }}>{selectedRequest.clientName}</h2>
            </div>
            <span className={`owner-status-pill ${statusClass}`}>
              ● {selectedRequest.status}
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gap: 16 }}>
        {/* Meta info grid */}
        <div className="owner-modal-info-grid">
          <div className="owner-modal-card">
            <span className="owner-modal-card-label">Assigned Branch Manager</span>
            <span className="owner-modal-card-val">{selectedRequest.managerName}</span>
          </div>
          <div className="owner-modal-card">
            <span className="owner-modal-card-label">Request Type</span>
            <span className="owner-modal-card-val" style={{ color: "#6366f1" }}>{selectedRequest.requestType}</span>
          </div>
          <div className="owner-modal-card">
            <span className="owner-modal-card-label">Request Date</span>
            <span className="owner-modal-card-val">{selectedRequest.createdAt}</span>
          </div>
        </div>

        {/* Reason box */}
        <div className="owner-modal-card">
          <span className="owner-modal-card-label">Reason for Request</span>
          <span className="owner-modal-card-val" style={{ fontWeight: 500, lineHeight: 1.5, marginTop: 4 }}>
            {selectedRequest.reason}
          </span>
        </div>

        {/* Diff Visualization for Edit Client */}
        {selectedRequest.requestType === "Edit Client" && selectedRequest.requestedChanges && selectedRequest.requestedChanges.length > 0 && (
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Requested Field Changes:</div>
            {selectedRequest.requestedChanges.map((change) => (
              <div key={change.field} className="owner-modal-card" style={{ padding: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#6366f1", marginBottom: 8, textTransform: "uppercase" }}>
                  {change.field}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "center" }}>
                  <div style={{ background: "rgba(244, 63, 94, 0.1)", padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(244, 63, 94, 0.2)" }}>
                    <div style={{ color: "#f43f5e", fontSize: 11, fontWeight: 700 }}>Old Value</div>
                    <div style={{ fontWeight: 700, fontSize: 13, marginTop: 2 }}>{change.oldValue || "-"}</div>
                  </div>
                  <div style={{ color: "#6366f1", fontWeight: 900, fontSize: 18 }}>↓</div>
                  <div style={{ background: "rgba(16, 185, 129, 0.1)", padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                    <div style={{ color: "#10b981", fontSize: 11, fontWeight: 700 }}>New Value</div>
                    <div style={{ fontWeight: 700, fontSize: 13, marginTop: 2, color: "#10b981" }}>{change.newValue || "-"}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Owner Decision & Remarks */}
        {selectedRequest.status !== "Pending" ? (
          <div className="owner-modal-info-grid">
            <div className="owner-modal-card">
              <span className="owner-modal-card-label">Decision Date</span>
              <span className="owner-modal-card-val">{selectedRequest.decisionDate || "-"}</span>
            </div>
            <div className="owner-modal-card">
              <span className="owner-modal-card-label">Owner Remarks</span>
              <span className="owner-modal-card-val">{selectedRequest.managerRemarks || "-"}</span>
            </div>
          </div>
        ) : (
          <div className="owner-modal-card">
            <span className="owner-modal-card-label">Owner Remarks / Note for Decision</span>
            <input
              type="text"
              placeholder="e.g. Approved after reviewing business case documents"
              value={remarksInput}
              onChange={(e) => setRemarksInput(e.target.value)}
              className="owner-search-box input"
              style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(99, 102, 241, 0.2)", marginTop: 6, fontSize: 13, background: "transparent", color: "inherit" }}
            />
          </div>
        )}

        <div className="owner-modal-actions">
          {selectedRequest.status === "Pending" && (
            <>
              <button
                type="button"
                className="owner-btn-primary"
                style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}
                onClick={() => {
                  onApprove(selectedRequest.id, remarksInput);
                  onClose();
                }}
              >
                ✓ Approve Request
              </button>
              <button
                type="button"
                className="owner-btn-danger"
                onClick={() => {
                  onReject(selectedRequest.id, remarksInput);
                  onClose();
                }}
              >
                ✕ Reject Request
              </button>
            </>
          )}
          <button className="owner-btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </SimpleModal>
  );
}
