import React, { useState } from "react";
import Modal from "../../components/Modal";
import Icon from "../../components/Icon";

export default function BranchManagerRequestModal({
  request,
  onClose,
  onApprove,
  onReject,
  isManagerRequest = false,
}) {
  const [remarks, setRemarks] = useState("");

  if (!request) return null;

  const isPending = request.status === "Pending";
  const canDecide = isManagerRequest && isPending;

  const statusColor =
    request.status === "Approved"
      ? "#10b981"
      : request.status === "Rejected"
      ? "#f43f5e"
      : "#f59e0b";

  return (
    <Modal title={`Request Details — ${request.id}`} onClose={onClose} closeLabel="Close">
      <div style={{ display: "flex", flexDirection: "column", gap: 18, minWidth: 320, maxWidth: 680 }}>
        {/* Top Summary Banner */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
            padding: 16,
            borderRadius: 14,
            background: "linear-gradient(135deg, rgba(140, 95, 248, 0.08) 0%, rgba(78, 124, 255, 0.04) 100%)",
            border: "1px solid rgba(140, 95, 248, 0.18)",
          }}
        >
          <div>
            <span style={{ fontSize: 11.5, color: "#7a748e", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700, display: "block" }}>
              {isManagerRequest ? "Submitted By Manager" : "Target Employee / Entity"}
            </span>
            <strong style={{ fontSize: 15, marginTop: 2, display: "block" }}>
              {isManagerRequest ? request.requesterName : request.targetName}
            </strong>
            <small style={{ color: "#7a748e", fontSize: 11.5 }}>
              {isManagerRequest ? `${request.requesterRole} (${request.requesterBranch || "South"} Branch)` : `${request.targetRole || request.department} (${request.targetBranch || "East"} Branch)`}
            </small>
          </div>

          <div>
            <span style={{ fontSize: 11.5, color: "#7a748e", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700, display: "block" }}>
              Request Type
            </span>
            <strong style={{ fontSize: 14.5, marginTop: 2, display: "block", color: "#8c5ff8" }}>
              {request.requestType}
            </strong>
            <small style={{ color: "#7a748e", fontSize: 11.5 }}>
              {request.department ? `Department: ${request.department}` : `Target: ${request.targetName}`}
            </small>
          </div>

          <div>
            <span style={{ fontSize: 11.5, color: "#7a748e", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700, display: "block" }}>
              Governance Status
            </span>
            <div style={{ marginTop: 4 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "4px 12px",
                  borderRadius: 999,
                  background: `${statusColor}22`,
                  color: statusColor,
                  fontWeight: 800,
                  fontSize: 12,
                }}
              >
                ● {request.status} {request.recipient === "Owner" ? "(Owner Review)" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* 3-Column Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
          <div style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(140, 95, 248, 0.14)", background: "rgba(255, 255, 255, 0.02)" }}>
            <span style={{ fontSize: 11.5, color: "#7a748e", fontWeight: 600, display: "block" }}>Creation Date</span>
            <strong style={{ fontSize: 13.5, marginTop: 3, display: "block" }}>{request.createdAt}</strong>
          </div>
          <div style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(140, 95, 248, 0.14)", background: "rgba(255, 255, 255, 0.02)" }}>
            <span style={{ fontSize: 11.5, color: "#7a748e", fontWeight: 600, display: "block" }}>Priority Level</span>
            <strong style={{ fontSize: 13.5, marginTop: 3, display: "block", color: request.priority === "High" || request.priority === "Urgent" ? "#f43f5e" : "inherit" }}>
              {request.priority || "Normal"}
            </strong>
          </div>
          <div style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(140, 95, 248, 0.14)", background: "rgba(255, 255, 255, 0.02)" }}>
            <span style={{ fontSize: 11.5, color: "#7a748e", fontWeight: 600, display: "block" }}>Recipient Authority</span>
            <strong style={{ fontSize: 13.5, marginTop: 3, display: "block", color: "#8c5ff8" }}>
              {request.recipient || (isManagerRequest ? "Branch Manager" : "Owner")}
            </strong>
          </div>
        </div>

        {/* Reason / Statement */}
        <div style={{ padding: "14px 16px", borderRadius: 12, border: "1px solid rgba(140, 95, 248, 0.14)", background: "rgba(140, 95, 248, 0.04)" }}>
          <span style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#8c5ff8", display: "block", marginBottom: 4 }}>
            Statement & Justification
          </span>
          <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5 }}>
            {request.reason}
          </p>
        </div>

        {/* Transfer Destination if Transfer request */}
        {request.destinationBranch && (
          <div style={{ padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(154, 116, 233, 0.25)", background: "rgba(154, 116, 233, 0.08)" }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#9a74e9", display: "block", marginBottom: 3 }}>
              Transfer Destination & Receiving Lead
            </span>
            <strong style={{ fontSize: 14, color: "var(--cd-ink, inherit)" }}>
              {request.destinationBranch} Branch {request.receivingManager ? `• Assigned Lead: ${request.receivingManager}` : ""}
            </strong>
          </div>
        )}

        {/* Requested Changes Table / Diff */}
        {request.requestedChanges && request.requestedChanges.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#8c5ff8" }}>
              Requested Change Differential ({request.requestedChanges.length})
            </span>
            <div style={{ border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: 12, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
                <thead>
                  <tr style={{ background: "rgba(140, 95, 248, 0.08)", textAlign: "left" }}>
                    <th style={{ padding: "8px 12px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>Field</th>
                    <th style={{ padding: "8px 12px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>Current Value</th>
                    <th style={{ padding: "8px 12px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>Proposed Value</th>
                  </tr>
                </thead>
                <tbody>
                  {request.requestedChanges.map((change, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                      <td style={{ padding: "8px 12px", fontWeight: 700 }}>{change.field}</td>
                      <td style={{ padding: "8px 12px", color: "#f43f5e", textDecoration: "line-through" }}>{change.oldValue || "—"}</td>
                      <td style={{ padding: "8px 12px", color: "#10b981", fontWeight: 700 }}>{change.newValue || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Existing Decision Remarks or Owner Remarks */}
        {(request.decisionRemarks || request.ownerRemarks) && (
          <div style={{ padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(16, 185, 129, 0.2)", background: "rgba(16, 185, 129, 0.05)" }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#10b981", display: "block", marginBottom: 3 }}>
              {request.ownerRemarks ? "Owner Governance Remarks" : "Branch Decision Remarks"}
            </span>
            <p style={{ margin: 0, fontSize: 13 }}>{request.ownerRemarks || request.decisionRemarks}</p>
            {request.decisionDate && (
              <small style={{ color: "#7a748e", fontSize: 11, display: "block", marginTop: 4 }}>
                Decided on: {request.decisionDate}
              </small>
            )}
          </div>
        )}

        {/* Decision Actions for Pending Manager Requests */}
        {canDecide && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
            <label className="field-label">
              <span>Decision Remarks / Feedback (optional)</span>
              <textarea
                rows={2}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Add approval notes or justification for rejection..."
                style={{ resize: "vertical", padding: 10, borderRadius: 8, border: "1px solid #dedfe1", font: "inherit" }}
              />
            </label>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 6 }}>
              <button
                type="button"
                className="sales-btn-secondary"
                style={{ color: "#f43f5e", borderColor: "rgba(244, 63, 94, 0.3)" }}
                onClick={() => {
                  onReject(request.id, remarks);
                  onClose();
                }}
              >
                ✕ Reject Request
              </button>
              <button
                type="button"
                className="manager-btn-primary"
                style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}
                onClick={() => {
                  onApprove(request.id, remarks);
                  onClose();
                }}
              >
                <Icon name="checkCircle" size={15} />
                <span>Approve Request</span>
              </button>
            </div>
          </div>
        )}

        {/* Default Close button if not deciding */}
        {!canDecide && (
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 6 }}>
            <button className="manager-btn-primary" type="button" onClick={onClose} style={{ padding: "9px 24px" }}>
              <span>Close</span>
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
