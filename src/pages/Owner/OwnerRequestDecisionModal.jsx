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

  return (
    <SimpleModal onClose={onClose}>
      <div style={{ display: "grid", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <span style={{ color: "#6366f1", fontWeight: 700, fontFamily: "monospace", fontSize: 13 }}>{selectedRequest.id}</span>
            <h3 style={{ margin: "4px 0 0 0", color: "#0f172a" }}>{selectedRequest.clientName}</h3>
          </div>
          <span style={{
            padding: "4px 12px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            background: selectedRequest.status === "Approved" ? "#dcfce7" : selectedRequest.status === "Rejected" ? "#ffe4e6" : "#fef3c7",
            color: selectedRequest.status === "Approved" ? "#15803d" : selectedRequest.status === "Rejected" ? "#be123c" : "#d97706"
          }}>
            {selectedRequest.status}
          </span>
        </div>

        {/* Meta info grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
          <div style={{ background: "#f8fafc", padding: 12, borderRadius: 10, border: "1px solid #e2e8f0" }}>
            <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600 }}>Assigned Manager</div>
            <strong style={{ color: "#0f172a", fontSize: 13, marginTop: 2, display: "block" }}>{selectedRequest.managerName}</strong>
          </div>
          <div style={{ background: "#f8fafc", padding: 12, borderRadius: 10, border: "1px solid #e2e8f0" }}>
            <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600 }}>Request Type</div>
            <strong style={{ color: "#4338ca", fontSize: 13, marginTop: 2, display: "block" }}>{selectedRequest.requestType}</strong>
          </div>
          <div style={{ background: "#f8fafc", padding: 12, borderRadius: 10, border: "1px solid #e2e8f0" }}>
            <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600 }}>Request Date</div>
            <strong style={{ color: "#0f172a", fontSize: 13, marginTop: 2, display: "block" }}>{selectedRequest.createdAt}</strong>
          </div>
        </div>

        {/* Reason box */}
        <div style={{ background: "#f8fafc", padding: 14, borderRadius: 10, border: "1px solid #e2e8f0" }}>
          <div style={{ color: "#64748b", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Reason for Request:</div>
          <div style={{ color: "#334155", fontSize: 13, lineHeight: 1.5 }}>{selectedRequest.reason}</div>
        </div>

        {/* Diff Visualization for Edit Client */}
        {selectedRequest.requestType === "Edit Client" && selectedRequest.requestedChanges && selectedRequest.requestedChanges.length > 0 && (
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ color: "#475569", fontSize: 13, fontWeight: 700 }}>Requested Field Changes:</div>
            {selectedRequest.requestedChanges.map((change) => (
              <div key={change.field} style={{ borderRadius: 12, border: "1px solid #e2e8f0", background: "#ffffff", padding: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#6366f1", marginBottom: 8, textTransform: "uppercase" }}>{change.field}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "center" }}>
                  <div style={{ background: "#fff1f2", padding: "10px 12px", borderRadius: 8, border: "1px solid #fecdd3" }}>
                    <div style={{ color: "#9f1239", fontSize: 11, fontWeight: 600 }}>Old Value</div>
                    <div style={{ color: "#be123c", fontWeight: 700, fontSize: 13, marginTop: 2 }}>{change.oldValue || "-"}</div>
                  </div>
                  <div style={{ color: "#6366f1", fontWeight: 900, fontSize: 18 }}>↓</div>
                  <div style={{ background: "#f0fdf4", padding: "10px 12px", borderRadius: 8, border: "1px solid #bbf7d0" }}>
                    <div style={{ color: "#166534", fontSize: 11, fontWeight: 600 }}>New Value</div>
                    <div style={{ color: "#15803d", fontWeight: 700, fontSize: 13, marginTop: 2 }}>{change.newValue || "-"}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Owner / Manager Decision & Remarks */}
        {selectedRequest.status !== "Pending" ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 4 }}>
            <div style={{ background: "#f8fafc", padding: 12, borderRadius: 10, border: "1px solid #e2e8f0" }}>
              <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600 }}>Decision Date</div>
              <strong style={{ color: "#0f172a", fontSize: 13, marginTop: 2, display: "block" }}>{selectedRequest.decisionDate || "-"}</strong>
            </div>
            <div style={{ background: "#f8fafc", padding: 12, borderRadius: 10, border: "1px solid #e2e8f0" }}>
              <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600 }}>Owner / Manager Remarks</div>
              <div style={{ color: "#334155", fontSize: 13, marginTop: 2 }}>{selectedRequest.managerRemarks || "-"}</div>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: 6, background: "#f8fafc", padding: 14, borderRadius: 10, border: "1px solid #e2e8f0" }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Owner Remarks / Note for Decision:</label>
            <input
              type="text"
              placeholder="e.g. Approved after reviewing company document verification"
              value={remarksInput}
              onChange={(e) => setRemarksInput(e.target.value)}
              style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #cbd5e1", fontSize: 13 }}
            />
          </div>
        )}

        <div className="modal-actions" style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 14 }}>
          {selectedRequest.status === "Pending" && (
            <>
              <button
                type="button"
                className="table-action"
                style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", color: "#ffffff", border: "none", fontWeight: 700, padding: "8px 16px", borderRadius: 6 }}
                onClick={() => {
                  onApprove(selectedRequest.id, remarksInput);
                  onClose();
                }}
              >
                ✓ Approve Request
              </button>
              <button
                type="button"
                className="table-action"
                style={{ background: "#fee2e2", color: "#b91c1c", border: "none", fontWeight: 700, padding: "8px 16px", borderRadius: 6 }}
                onClick={() => {
                  onReject(selectedRequest.id, remarksInput);
                  onClose();
                }}
              >
                ✕ Reject Request
              </button>
            </>
          )}
          <button className="table-action" onClick={onClose}>Close</button>
        </div>
      </div>
    </SimpleModal>
  );
}
