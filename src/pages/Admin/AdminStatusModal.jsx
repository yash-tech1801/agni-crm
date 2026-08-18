import React from "react";
import Modal from "../../components/Modal";
import ActivityStatusBar from "../../components/dashboard/ActivityStatusBar";
import { formatCurrency } from "./mockAdminData";
import {
  getTrackerStages,
  normalizeCompletedStages,
  canCompleteStage,
} from "../../utils/schemeTracker";

export default function AdminStatusModal({
  updatingClient,
  statusFormData,
  setStatusFormData,
  onClose,
  onSave,
}) {
  if (!updatingClient) return null;

  // Resolve dynamic stages from client's assigned scheme
  const stages = getTrackerStages(updatingClient.scheme);
  const totalStages = stages.length;

  const currentCompleted = statusFormData.completedSteps || [];
  const firstUncompletedIndex = stages.findIndex((s) => !currentCompleted.includes(s.name));

  // Toggle a single step checkbox inside the Status Update Modal with sequential enforcement
  const handleModalStepCheckboxToggle = (stepName, idx) => {
    setStatusFormData((prev) => {
      let updated;
      const prevCompleted = prev.completedSteps || [];

      if (prevCompleted.includes(stepName)) {
        // CRM Creation cannot be unchecked
        if (stepName === "CRM Creation") {
          updated = ["CRM Creation"];
        } else {
          // Unchecking a stage automatically unchecks all subsequent stages
          updated = prevCompleted.filter((name) => {
            const sIdx = stages.findIndex((s) => s.name === name);
            return sIdx < idx;
          });
          if (!updated.includes("CRM Creation")) {
            updated.unshift("CRM Creation");
          }
        }
      } else {
        // Checking an uncompleted stage: can only complete if all preceding are done,
        // or checking up to this stage
        updated = stages.slice(0, idx + 1).map((s) => s.name);
      }

      // Normalize and compute percent with strict sequential guarantee
      const normalized = normalizeCompletedStages(updated, stages);
      const newPercent = Math.min(100, Math.max(0, Math.round((normalized.length / totalStages) * 100)));
      const latestStage = normalized.length > 0 ? normalized[normalized.length - 1] : "CRM Creation";

      return {
        ...prev,
        completedSteps: normalized,
        progress: newPercent,
        status: latestStage,
      };
    });
  };

  // Handle stage selection in modal (sequentially checks all points up to that stage)
  const handleModalStageSelect = (stageName, stageIdx) => {
    const nextSteps = stages.slice(0, stageIdx + 1).map((s) => s.name);
    const normalized = normalizeCompletedStages(nextSteps, stages);
    const newPercent = Math.round((normalized.length / totalStages) * 100);
    setStatusFormData((prev) => ({
      ...prev,
      status: stageName,
      completedSteps: normalized,
      progress: newPercent,
    }));
  };

  const completedCount = (statusFormData.completedSteps || []).length;
  const currentPct = statusFormData.progress || Math.round((completedCount / totalStages) * 100);

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

        {/* Dynamic Activity Points Live Interactive Checklist & Visual Stepper */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <label className="field-label" style={{ margin: 0 }}>
              {totalStages} Activity Milestone Points (Sequential Workflow):
            </label>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#10b981" }}>
              {completedCount} of {totalStages} Points ({currentPct}%)
            </span>
          </div>

          {/* Checklist Cards */}
          <div style={{ display: "grid", gap: 8, marginBottom: 14 }}>
            {stages.map((s, idx) => {
              const isChecked = currentCompleted.includes(s.name);
              const isNextAvailable = !isChecked && idx === firstUncompletedIndex;
              const isLocked = !isChecked && firstUncompletedIndex !== -1 && idx > firstUncompletedIndex;

              return (
                <div
                  key={s.name}
                  className={`activity-modal-step-card ${isChecked ? "is-checked" : isLocked ? "is-locked" : ""}`}
                  style={{
                    opacity: isLocked ? 0.75 : 1,
                    cursor: isLocked ? "not-allowed" : "pointer",
                    borderStyle: isLocked ? "dashed" : "solid",
                  }}
                  onClick={() => {
                    if (isLocked) {
                      // Selecting a locked stage completes all prerequisites up to it
                      handleModalStageSelect(s.name, idx);
                    } else {
                      handleModalStepCheckboxToggle(s.name, idx);
                    }
                  }}
                  title={isLocked ? `Complete ${stages[idx - 1]?.name} first or click to advance pipeline to this stage` : undefined}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      className="activity-modal-step-checkbox"
                      style={{
                        background: isChecked ? "#10b981" : isLocked ? "#f1f5f9" : "#fff",
                        color: isChecked ? "#fff" : isLocked ? "#94a3b8" : "#d97706",
                        borderColor: isChecked ? "#10b981" : isLocked ? "#cbd5e1" : "#f59e0b",
                      }}
                    >
                      {isChecked ? "✓" : isLocked ? "🔒" : idx + 1}
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <strong style={{ fontSize: 13.5, color: isLocked ? "#64748b" : "#1e293b" }}>{s.name}</strong>
                        <span style={{ fontSize: 11, fontWeight: 750, color: isChecked ? "#10b981" : isLocked ? "#94a3b8" : "#d97706" }}>
                          {isChecked ? "✓ Completed" : isNextAvailable ? "● In Progress" : "🔒 Locked"}
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
                      background: isChecked ? "rgba(16, 185, 129, 0.12)" : isNextAvailable ? "rgba(245, 158, 11, 0.12)" : "#f1f5f9",
                      color: isChecked ? "#059669" : isNextAvailable ? "#b45309" : "#64748b",
                      borderColor: isChecked ? "#10b981" : isNextAvailable ? "#f59e0b" : "#cbd5e1",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModalStageSelect(s.name, idx);
                    }}
                  >
                    {isChecked ? "Completed ✓" : isNextAvailable ? `Complete Stage ${idx + 1}` : `Set to Stage ${idx + 1}`}
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
              scheme={updatingClient.scheme}
              stages={stages}
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
            <label className="field-label" style={{ marginBottom: 8, display: "block" }}>
              Uploaded Document Audits:
            </label>
            <div style={{ display: "grid", gap: 8 }}>
              {updatingClient.documents.map((doc) => (
                <div
                  key={doc.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "9px 12px",
                    borderRadius: 8,
                    background: "#ffffff",
                    border: "1px solid #e7e7f5",
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 600, fontSize: 13 }}>{doc.name}</span>
                    <div style={{ fontSize: 11.5, color: "#7a748e" }}>Ref: {doc.number}</div>
                  </div>
                  <span
                    style={{
                      fontSize: 11.5,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 6,
                      background: doc.status === "Verified" ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)",
                      color: doc.status === "Verified" ? "#059669" : "#d97706",
                    }}
                  >
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Admin Notes */}
        <div>
          <label className="field-label" style={{ marginBottom: 6, display: "block" }}>
            Admin Milestone Notes:
          </label>
          <textarea
            value={statusFormData.notes || ""}
            onChange={(e) => setStatusFormData((prev) => ({ ...prev, notes: e.target.value }))}
            placeholder="Add verification notes, board review comments, or next action items..."
            rows={3}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #dedfe1",
              fontSize: 13,
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Modal Action Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
          <button type="button" className="table-action" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="primary-button" style={{ padding: "8px 20px" }}>
            Save Milestone Status
          </button>
        </div>
      </form>
    </Modal>
  );
}
