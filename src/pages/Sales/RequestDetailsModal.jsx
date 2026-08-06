import React from "react";
import Modal from "../../components/Modal";

const formatDate = (value) => value || "-";

export default function RequestDetailsModal({ request, onClose }) {
  if (!request) return null;

  const isDelete = request.requestType === "Delete Client";

  return (
    <Modal title={`Request ${request.id}`} onClose={onClose} closeLabel="Close">
      <div style={{ display: "grid", gap: 18, maxWidth: 680 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <p className="eyebrow">Client</p>
              <strong>{request.clientName}</strong>
            </div>
            <div>
              <p className="eyebrow">Assigned Manager</p>
              <strong>{request.managerName}</strong>
            </div>
            <div>
              <p className="eyebrow">Request Type</p>
              <strong>{request.requestType}</strong>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
            <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
              <p className="eyebrow">Request Date</p>
              <strong>{formatDate(request.createdAt)}</strong>
            </div>
            <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
              <p className="eyebrow">Status</p>
              <strong>{request.status}</strong>
            </div>
            <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
              <p className="eyebrow">Manager Name</p>
              <strong>{request.managerName}</strong>
            </div>
          </div>
        </div>

        {isDelete ? (
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
              <p className="eyebrow">Reason for Deletion</p>
              <div>{request.reason}</div>
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
              <p className="eyebrow">Reason for Edit</p>
              <div>{request.reason}</div>
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {request.requestedChanges.map((change) => (
                <div key={change.field} style={{ borderRadius: 12, border: "1px solid #e7e7f5", background: "#fff", padding: 14 }}>
                  <p className="eyebrow">{change.field}</p>
                  <div style={{ display: "grid", gap: 8 }}>
                    <div>
                      <p className="eyebrow">Old Value</p>
                      <strong>{change.oldValue || "-"}</strong>
                    </div>
                    <div style={{ color: "#7a748e", fontWeight: 700, textAlign: "center" }}>↓</div>
                    <div>
                      <p className="eyebrow">New Value</p>
                      <strong>{change.newValue || "-"}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {request.status !== "Pending" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
            <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
              <p className="eyebrow">Decision Date</p>
              <strong>{formatDate(request.decisionDate)}</strong>
            </div>
            <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
              <p className="eyebrow">Manager Remarks</p>
              <div>{request.managerRemarks || "-"}</div>
            </div>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}
