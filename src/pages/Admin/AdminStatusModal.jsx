import React from "react";
import Modal from "../../components/Modal";
import ActivityStatusBar from "../../components/dashboard/ActivityStatusBar";
import { ACTIVITY_STAGES, formatCurrency } from "./mockAdminData";

export default function AdminStatusModal({
  updatingClient,
  statusFormData,
  setStatusFormData,
  onClose,
  onSave,
}) {
  if (!updatingClient) return null;

  // Toggle a single step checkbox inside the Status Update Modal
  const handleModalStepCheckboxToggle = (stepName) => {
    setStatusFormData((prev) => {
      let updated;
      if (prev.completedSteps.includes(stepName)) {
        updated = prev.completedSteps.filter((s) => s !== stepName);
      } else {
        updated = [...prev.completedSteps, stepName];
      }
      const newPercent = Math.min(100, Math.max(0, updated.length * 20));
      const sortedCompleted = ACTIVITY_STAGES.filter((s) => updated.includes(s.name));
      const latestStage = sortedCompleted.length > 0 ? sortedCompleted[sortedCompleted.length - 1].name : "Submission";

      return {
        ...prev,
        completedSteps: updated,
        progress: newPercent,
        status: latestStage,
      };
    });
  };

  // Handle stage selection in modal (auto-checks all points up to that stage)
  const handleModalStageSelect = (stageName, stageIdx) => {
    const nextSteps = ACTIVITY_STAGES.slice(0, stageIdx + 1).map((s) => s.name);
    const newPercent = (stageIdx + 1) * 20;
    setStatusFormData((prev) => ({
      ...prev,
      status: stageName,
      completedSteps: nextSteps,
      progress: newPercent,
    }));
  };

  return (
    <Modal
      title={`Update Milestones: ${updatingClient.name} (${updatingClient.appId})`}
      onClose={onClose}
      closeLabel="Close"
    >
      <form onSubmit={onSave} style={{ display: "grid", gap: 18, minWidth: 320, maxWidth: 660 }}>
        <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <p className="eyebrow" style={{ margin: "0 0 2px" }}>Client & Company</p>
            <strong>{updatingClient.name}</strong> — {updatingClient.company}
          </div>
          <div>
            <p className="eyebrow" style={{ margin: "0 0 2px" }}>Assigned Scheme</p>
            <strong>{updatingClient.scheme}</strong> ({formatCurrency(updatingClient.totalPayment)})
          </div>
        </div>

        {/* 5-Points Live Interactive Checklist & Visual Stepper */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <label className="field-label" style={{ margin: 0 }}>
              5 Activity Points (20% per completed point):
            </label>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#10b981" }}>
              {statusFormData.completedSteps.length} of 5 Points ({statusFormData.progress}%)
            </span>
          </div>

          {/* Checklist Cards */}
          <div style={{ display: "grid", gap: 8, marginBottom: 14 }}>
            {ACTIVITY_STAGES.map((s, idx) => {
              const isChecked = statusFormData.completedSteps.includes(s.name);
              return (
                <div
                  key={s.name}
                  className={`activity-modal-step-card ${isChecked ? "is-checked" : ""}`}
                  onClick={() => handleModalStepCheckboxToggle(s.name)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div className="activity-modal-step-checkbox">
                      {isChecked ? "✓" : idx + 1}
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <strong style={{ fontSize: 13.5 }}>{s.name}</strong>
                        <span style={{ fontSize: 11, fontWeight: 750, color: isChecked ? "#10b981" : "#64748b" }}>
                          (+20%)
                        </span>
                      </div>
                      <small style={{ color: "#7a748e", display: "block" }}>{s.description}</small>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="table-action"
                    style={{
                      fontSize: 11,
                      padding: "4px 10px",
                      background: isChecked ? "rgba(16, 185, 129, 0.12)" : "#f1f5f9",
                      color: isChecked ? "#059669" : "#1e293b",
                      borderColor: isChecked ? "#10b981" : "#cbd5e1",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModalStageSelect(s.name, idx);
                    }}
                  >
                    {isChecked ? "Completed ✓" : `Set to Stage ${idx + 1}`}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Live Stepper Preview */}
          <div style={{ background: "#f8fafc", padding: 14, borderRadius: 14, border: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.8, color: "#64748b", display: "block", marginBottom: 10 }}>
              Live Stepper Preview:
            </span>
            <ActivityStatusBar
              completedSteps={statusFormData.completedSteps}
              progress={statusFormData.progress}
              interactive={false}
              size="compact"
            />
          </div>
        </div>

        {/* Document Verification Checklist */}
        {updatingClient.documents && updatingClient.documents.length > 0 && (
          <div>
            <label className="field-label" style={{ marginBottom: 6, display: "block" }}>
              Document Verification Checklist:
            </label>
            <div style={{ display: "grid", gap: 8 }}>
              {updatingClient.documents.map((doc) => (
                <div
                  key={doc.name}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: "#fbfbfe",
                    border: "1px solid #e7e7f5",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong>{doc.name}</strong>
                    <span style={{ marginLeft: 8, fontSize: 12, color: "#7a748e" }}>({doc.number})</span>
                  </div>
                  <select
                    value={statusFormData.documentUpdates[doc.name] || doc.status}
                    onChange={(e) =>
                      setStatusFormData({
                        ...statusFormData,
                        documentUpdates: {
                          ...statusFormData.documentUpdates,
                          [doc.name]: e.target.value,
                        },
                      })
                    }
                    style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #dedfe1", font: "inherit", fontSize: 12 }}
                  >
                    <option value="Verified">Verified ✓</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Rejected">Rejected ✕</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Admin Remarks */}
        <label className="field-label">
          Admin Verification Remarks / Notes:
          <textarea
            rows={3}
            required
            placeholder="Enter details of milestone completion, audit notes, or reasons for status change..."
            value={statusFormData.notes}
            onChange={(e) => setStatusFormData({ ...statusFormData, notes: e.target.value })}
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #dedfe1", font: "inherit", marginTop: 4 }}
          />
        </label>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 6 }}>
          <button className="table-action" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-button" type="submit" style={{ background: "#10b981", borderColor: "#10b981" }}>
            Save & Update Status ({statusFormData.progress}%)
          </button>
        </div>
      </form>
    </Modal>
  );
}
