import React from "react";
import Modal from "../../components/Modal";
import ActivityStatusBar from "../../components/dashboard/ActivityStatusBar";
import { stageBadgeColors, formatCurrency } from "./mockAdminData";
import { getTrackerState, getProcessTypeLabel } from "../../utils/schemeTracker";

export default function AdminClientDossierModal({
  selectedClientForDossier,
  onClose,
  onOpenStatusUpdate,
}) {
  if (!selectedClientForDossier) return null;

  const tracker = getTrackerState(selectedClientForDossier);
  const schemeName = selectedClientForDossier.scheme || tracker.schemeName;
  const processLabel = tracker.processTypeLabel || getProcessTypeLabel(tracker.processType);

  return (
    <Modal
      title={`Application Dossier: ${selectedClientForDossier.name}`}
      onClose={onClose}
      closeLabel="Close"
    >
      <div style={{ display: "grid", gap: 18, maxWidth: 680 }}>
        {/* Header Info Banner */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.8, color: "#8c5ff8" }}>
              CLIENT APPLICATION DOSSIER
            </span>
            <h2 style={{ margin: "2px 0 0", fontSize: 20 }}>{selectedClientForDossier.name}</h2>
            <p style={{ margin: "2px 0 0", color: "#7a748e", fontSize: 13 }}>
              {selectedClientForDossier.company} • <strong>App ID:</strong> <code>{selectedClientForDossier.appId}</code>
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "4px 12px",
                borderRadius: 999,
                background: `${stageBadgeColors[selectedClientForDossier.applicationStatus || tracker.currentStage] || "#10b981"}22`,
                color: stageBadgeColors[selectedClientForDossier.applicationStatus || tracker.currentStage] || "#10b981",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              ● {selectedClientForDossier.applicationStatus || tracker.currentStage}
            </span>
            <div style={{ fontSize: 12, color: "#10b981", fontWeight: 700, marginTop: 4 }}>
              {tracker.progressPercent}% Completed ({tracker.completedStages.length}/{tracker.totalStages} Points)
            </div>
          </div>
        </div>

        {/* Selected Scheme & Process Type Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
          <div style={{ background: "#ffffff", padding: 12, borderRadius: 10, border: "1.5px solid #8c5ff833" }}>
            <p className="eyebrow" style={{ margin: "0 0 2px", color: "#8c5ff8", fontWeight: 800 }}>Selected Scheme</p>
            <strong style={{ fontSize: 14, color: "#1e293b" }}>{schemeName}</strong>
          </div>
          <div style={{ background: "#ffffff", padding: 12, borderRadius: 10, border: "1.5px solid #4e7cff33" }}>
            <p className="eyebrow" style={{ margin: "0 0 2px", color: "#4e7cff", fontWeight: 800 }}>Process Type</p>
            <strong style={{ fontSize: 14, color: "#4e7cff" }}>{processLabel}</strong>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{tracker.totalStages} Sequential Stages</div>
          </div>
          <div style={{ background: "#ffffff", padding: 12, borderRadius: 10, border: "1px solid #e7e7f5" }}>
            <p className="eyebrow" style={{ margin: "0 0 2px" }}>Total Commercial</p>
            <strong style={{ color: "#10b981", fontSize: 14 }}>{formatCurrency(selectedClientForDossier.totalPayment)}</strong>
          </div>
          <div style={{ background: "#ffffff", padding: 12, borderRadius: 10, border: "1px solid #e7e7f5" }}>
            <p className="eyebrow" style={{ margin: "0 0 2px" }}>Assigned Officer</p>
            <strong style={{ color: "#1e293b", fontSize: 13.5 }}>{selectedClientForDossier.assignedSalesPerson || "Branch Sales"}</strong>
          </div>
        </div>

        {/* Dynamic Activity Stepper Bar */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <label className="field-label" style={{ margin: 0 }}>
              Activity Progress Pipeline ({schemeName}):
            </label>
            <span style={{ fontSize: 12, color: "#64748b", fontWeight: 700 }}>
              Stage: <strong>{tracker.currentStage}</strong>
            </span>
          </div>
          <ActivityStatusBar
            scheme={schemeName}
            stages={tracker.stages}
            completedSteps={tracker.completedStages}
            progress={tracker.progressPercent}
            interactive={false}
          />
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
          {onOpenStatusUpdate && (
            <button
              className="primary-button"
              type="button"
              onClick={() => {
                onOpenStatusUpdate(selectedClientForDossier);
              }}
            >
              Update Application Status
            </button>
          )}
          <button className="table-action" type="button" onClick={onClose}>
            Close Dossier
          </button>
        </div>
      </div>
    </Modal>
  );
}
