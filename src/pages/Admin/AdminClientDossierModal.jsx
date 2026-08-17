import React from "react";
import Modal from "../../components/Modal";
import ActivityStatusBar from "../../components/dashboard/ActivityStatusBar";
import { stageBadgeColors, formatCurrency } from "./mockAdminData";

export default function AdminClientDossierModal({
  selectedClientForDossier,
  onClose,
  onOpenStatusUpdate,
}) {
  if (!selectedClientForDossier) return null;

  return (
    <Modal
      title={`Application Dossier: ${selectedClientForDossier.name}`}
      onClose={onClose}
      closeLabel="Close"
    >
      <div style={{ display: "grid", gap: 18, maxWidth: 680 }}>
        {/* Header Info */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h2 style={{ margin: 0 }}>{selectedClientForDossier.name}</h2>
            <p style={{ margin: "2px 0 0", color: "#7a748e" }}>{selectedClientForDossier.company} • App ID: {selectedClientForDossier.appId}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "4px 12px",
                borderRadius: 999,
                background: `${stageBadgeColors[selectedClientForDossier.applicationStatus] || "#10b981"}22`,
                color: stageBadgeColors[selectedClientForDossier.applicationStatus] || "#10b981",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              ● {selectedClientForDossier.applicationStatus}
            </span>
            <div style={{ fontSize: 12, color: "#10b981", fontWeight: 700, marginTop: 4 }}>
              {selectedClientForDossier.progress}% Completed ({(selectedClientForDossier.completedSteps || []).length}/5 Points)
            </div>
          </div>
        </div>

        {/* 5-Points Stepper Bar */}
        <ActivityStatusBar
          completedSteps={selectedClientForDossier.completedSteps || []}
          progress={selectedClientForDossier.progress}
          interactive={false}
        />

        {/* Commercials & Scheme */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
          <div style={{ background: "#fbfbfe", padding: 12, borderRadius: 10, border: "1px solid #e7e7f5" }}>
            <p className="eyebrow" style={{ margin: "0 0 2px" }}>Assigned Scheme</p>
            <strong>{selectedClientForDossier.scheme}</strong>
          </div>
          <div style={{ background: "#fbfbfe", padding: 12, borderRadius: 10, border: "1px solid #e7e7f5" }}>
            <p className="eyebrow" style={{ margin: "0 0 2px" }}>Total Commercial</p>
            <strong style={{ color: "#4e7cff" }}>{formatCurrency(selectedClientForDossier.totalPayment)}</strong>
          </div>
          <div style={{ background: "#fbfbfe", padding: 12, borderRadius: 10, border: "1px solid #e7e7f5" }}>
            <p className="eyebrow" style={{ margin: "0 0 2px" }}>Assigned Sales Officer</p>
            <strong>{selectedClientForDossier.assignedSalesPerson}</strong>
          </div>
        </div>

        {/* Verified Documents */}
        <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
          <p className="eyebrow" style={{ margin: "0 0 8px" }}>Compliance & Verified Documents</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {(selectedClientForDossier.documents || []).map((doc) => (
              <div key={doc.name} style={{ background: "#fff", padding: 10, borderRadius: 8, border: "1px solid #e7e7f5" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                  <strong>{doc.name}</strong>
                  <span style={{ fontSize: 11, fontWeight: 700, color: doc.status === "Verified" ? "#44bfb0" : "#f2aa38" }}>
                    {doc.status}
                  </span>
                </div>
                <small style={{ color: "#7a748e" }}>{doc.number}</small>
              </div>
            ))}
          </div>
        </div>

        {/* Status History Timeline */}
        <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
          <p className="eyebrow" style={{ margin: "0 0 8px" }}>Application Timeline & History</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {(selectedClientForDossier.history || []).map((h, i) => (
              <div key={i} style={{ padding: 8, background: "#fff", borderRadius: 6, border: "1px solid #eee", fontSize: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                  <span style={{ color: stageBadgeColors[h.status] || "#10b981" }}>{h.status}</span>
                  <span style={{ color: "#9a94ad" }}>{h.date}</span>
                </div>
                <p style={{ margin: "2px 0 0", color: "#555" }}>{h.notes}</p>
                <small style={{ color: "#888" }}>By {h.updatedBy}</small>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button
            className="primary-button"
            type="button"
            onClick={() => {
              onOpenStatusUpdate(selectedClientForDossier);
            }}
          >
            Update Application Status
          </button>
          <button className="table-action" type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
