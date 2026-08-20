import React from "react";
import Icon from "../../components/Icon";
import ActivityStatusBar from "../../components/dashboard/ActivityStatusBar";
import { formatCurrency, stageBadgeColors } from "./mockAdminData";
import {
  getTrackerStages,
  normalizeCompletedStages,
  canCompleteStage,
  getProcessTypeForScheme,
  getProcessTypeLabel,
} from "../../utils/schemeTracker";
import "./AdminDashboard.css";

export default function AdminStatusModal({
  updatingClient,
  statusFormData,
  setStatusFormData,
  onClose,
  onSave,
  onRequestRollback,
}) {
  if (!updatingClient) return null;

  // Resolve dynamic stages from client's assigned scheme
  const stages = getTrackerStages(updatingClient.scheme);
  const totalStages = stages.length;
  const processType = getProcessTypeForScheme(updatingClient.scheme);
  const processLabel = getProcessTypeLabel(processType);

  const originallyCommitted = updatingClient.completedSteps || [];
  const currentCompleted = statusFormData.completedSteps || [];
  const firstUncompletedIndex = stages.findIndex((s) => !currentCompleted.includes(s.name));

  // Toggle a single step checkbox inside the Status Update Modal with sequential enforcement & reversal protection
  const handleModalStepCheckboxToggle = (stepName, idx) => {
    // If the stage was ALREADY saved in the client database, admin cannot directly uncheck it!
    if (originallyCommitted.includes(stepName) && currentCompleted.includes(stepName)) {
      if (onRequestRollback) {
        onRequestRollback(updatingClient, stepName);
      }
      return;
    }

    setStatusFormData((prev) => {
      let updated;
      const prevCompleted = prev.completedSteps || [];

      if (prevCompleted.includes(stepName)) {
        // CRM Creation cannot be unchecked
        if (stepName === "CRM Creation") {
          updated = ["CRM Creation"];
        } else {
          // Unchecking a newly toggled stage automatically unchecks all subsequent stages
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
    // If admin is trying to select a stage that is EARLIER than what's already committed:
    const latestCommittedIdx = stages.findLastIndex ? stages.findLastIndex((s) => originallyCommitted.includes(s.name)) : -1;
    if (latestCommittedIdx > stageIdx && originallyCommitted.includes(stages[latestCommittedIdx]?.name)) {
      if (onRequestRollback) {
        onRequestRollback(updatingClient, stageName);
      }
      return;
    }

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

  const quickNotes = [
    "KYC & document audits verified by Branch Admin.",
    "Manager commercial clearance granted.",
    "Legal agreement executed and dispatched to client.",
    "Final approval processed & milestones cleared.",
  ];

  return (
    <div
      className="modal-backdrop"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px 16px",
        animation: "fadeIn 0.2s ease-out",
      }}
      onClick={onClose}
    >
      <div
        className="admin-panel-card hide-scrollbar"
        style={{
          width: "100%",
          maxWidth: 720,
          maxHeight: "92vh",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          padding: 0,
          borderRadius: 22,
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.4), 0 0 32px rgba(78, 124, 255, 0.12)",
          border: "1px solid rgba(154, 116, 233, 0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: "22px 26px 18px",
            borderBottom: "1px solid rgba(154, 116, 233, 0.15)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
              <span
                className="admin-badge"
                style={{
                  background: "linear-gradient(135deg, #4e7cff 0%, #3b66e8 100%)",
                  color: "#ffffff",
                  fontSize: 11,
                  padding: "3px 10px",
                }}
              >
                MILESTONE VERIFICATION
              </span>
              <span
                className="admin-badge"
                style={{
                  background: "rgba(78, 124, 255, 0.12)",
                  color: "#4e7cff",
                  fontWeight: 700,
                  fontSize: 11,
                }}
              >
                ID: {updatingClient.appId}
              </span>
              <span
                className="admin-badge"
                style={{
                  background: "rgba(16, 185, 129, 0.12)",
                  color: "#10b981",
                  fontSize: 11,
                }}
              >
                {updatingClient.branch || "West Zone"} Branch
              </span>
            </div>
            <h3 style={{ margin: "2px 0 4px", fontSize: 20, fontWeight: 800, color: "inherit", letterSpacing: -0.3 }}>
              {updatingClient.name}
            </h3>
            <p className="admin-desc" style={{ fontSize: 13 }}>
              {updatingClient.company} • Officer: <strong>{updatingClient.assignedSalesPerson}</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: "rgba(241, 245, 249, 0.6)",
              border: "1px solid rgba(154, 116, 233, 0.15)",
              borderRadius: "50%",
              width: 34,
              height: 34,
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              color: "#64748b",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.12)";
              e.currentTarget.style.color = "#ef4444";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(241, 245, 249, 0.6)";
              e.currentTarget.style.color = "#64748b";
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={onSave} style={{ padding: "22px 26px 26px", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Key Metrics Strip */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
            <div className="admin-subcard" style={{ padding: "10px 14px" }}>
              <span className="admin-kicker" style={{ fontSize: 10.5 }}>Assigned Scheme</span>
              <strong style={{ display: "block", fontSize: 13.5, color: "inherit" }}>{updatingClient.scheme}</strong>
              <small style={{ color: "#64748b", fontSize: 11 }}>{processLabel}</small>
            </div>
            <div className="admin-subcard" style={{ padding: "10px 14px" }}>
              <span className="admin-kicker" style={{ fontSize: 10.5, color: "#10b981" }}>Deal Value</span>
              <strong style={{ display: "block", fontSize: 14, color: "#10b981" }}>
                {formatCurrency(updatingClient.totalPayment)}
              </strong>
              <small style={{ color: "#64748b", fontSize: 11 }}>Commercial Total</small>
            </div>
            <div className="admin-subcard" style={{ padding: "10px 14px" }}>
              <span className="admin-kicker" style={{ fontSize: 10.5, color: "#9a74e9" }}>Milestones</span>
              <strong style={{ display: "block", fontSize: 14, color: "#9a74e9" }}>
                {completedCount} / {totalStages} Points
              </strong>
              <small style={{ color: "#64748b", fontSize: 11 }}>{currentPct}% Completed</small>
            </div>
          </div>

          {/* Dynamic Activity Points Live Checklist */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div>
                <label className="admin-form-label" style={{ margin: 0, fontSize: 13 }}>
                  {totalStages} Sequential Milestone Checkpoints:
                </label>
                <small style={{ color: "#64748b", fontSize: 11.5 }}>
                  Click to complete or toggle stages sequentially.
                </small>
              </div>
              <span
                className="admin-badge"
                style={{
                  background: currentPct === 100 ? "rgba(16, 185, 129, 0.15)" : "rgba(78, 124, 255, 0.15)",
                  color: currentPct === 100 ? "#10b981" : "#4e7cff",
                  fontWeight: 800,
                  fontSize: 12,
                }}
              >
                {currentPct}% Finished
              </span>
            </div>

            {/* Milestone Reversal Guard Alert Banner */}
            <div
              style={{
                padding: "8px 12px",
                borderRadius: 10,
                background: "rgba(245, 158, 11, 0.08)",
                border: "1px solid rgba(245, 158, 11, 0.22)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 12,
                color: "#f59e0b",
                marginBottom: 10,
              }}
            >
              <Icon name="alert" size={14} />
              <span>
                <strong>Milestone Integrity:</strong> Once saved, tracker stages cannot be undone directly. To reverse milestones, submit a <strong>Rollback Request</strong> to the Branch Manager.
              </span>
            </div>

            {/* Checklist Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {stages.map((s, idx) => {
                const isChecked = currentCompleted.includes(s.name);
                const isCommitted = originallyCommitted.includes(s.name);
                const isNextAvailable = !isChecked && idx === firstUncompletedIndex;
                const isLocked = !isChecked && firstUncompletedIndex !== -1 && idx > firstUncompletedIndex;

                return (
                  <div
                    key={s.name}
                    className="admin-subcard"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      borderRadius: 14,
                      cursor: "pointer",
                      border: isChecked
                        ? "1.5px solid rgba(16, 185, 129, 0.45)"
                        : isNextAvailable
                        ? "1.5px solid rgba(245, 158, 11, 0.45)"
                        : "1px dashed rgba(154, 116, 233, 0.18)",
                      background: isChecked
                        ? "rgba(16, 185, 129, 0.08)"
                        : isNextAvailable
                        ? "rgba(245, 158, 11, 0.08)"
                        : undefined,
                      transition: "all 0.2s ease",
                    }}
                    onClick={() => {
                      if (isLocked) {
                        handleModalStageSelect(s.name, idx);
                      } else {
                        handleModalStepCheckboxToggle(s.name, idx);
                      }
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          display: "grid",
                          placeItems: "center",
                          fontWeight: 800,
                          fontSize: 12,
                          background: isChecked
                            ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                            : isNextAvailable
                            ? "#f59e0b"
                            : "rgba(148, 163, 184, 0.2)",
                          color: isChecked || isNextAvailable ? "#ffffff" : "#64748b",
                          boxShadow: isChecked
                            ? "0 2px 8px rgba(16, 185, 129, 0.35)"
                            : isNextAvailable
                            ? "0 2px 8px rgba(245, 158, 11, 0.35)"
                            : "none",
                          flexShrink: 0,
                        }}
                      >
                        {isChecked ? "✓" : isLocked ? "🔒" : idx + 1}
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <strong style={{ fontSize: 13.5, color: "inherit" }}>{s.name}</strong>
                          <span
                            className="admin-badge"
                            style={{
                              fontSize: 10,
                              padding: "1px 6px",
                              background: isChecked
                                ? "rgba(16, 185, 129, 0.15)"
                                : isNextAvailable
                                ? "rgba(245, 158, 11, 0.15)"
                                : "rgba(148, 163, 184, 0.15)",
                              color: isChecked ? "#10b981" : isNextAvailable ? "#f59e0b" : "#64748b",
                            }}
                          >
                            {isChecked ? (isCommitted ? "Committed ✓" : "Completed") : isNextAvailable ? "In Progress" : "Pending"}
                          </span>
                        </div>
                        <small style={{ color: "#64748b", fontSize: 11.5, display: "block" }}>
                          {s.description}
                        </small>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {isCommitted && idx > 0 && idx < originallyCommitted.length - 1 && (
                        <button
                          type="button"
                          className="admin-btn-secondary"
                          style={{
                            padding: "4px 10px",
                            fontSize: 11,
                            color: "#f59e0b",
                            borderColor: "rgba(245, 158, 11, 0.3)",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onRequestRollback) {
                              onRequestRollback(updatingClient, s.name);
                            }
                          }}
                          title="Request milestone reversal to this stage via Branch Manager"
                        >
                          ↩ Request Rollback
                        </button>
                      )}
                      <button
                        type="button"
                        className={isChecked ? "admin-btn-secondary" : "admin-btn-primary"}
                        style={{
                          padding: "5px 12px",
                          fontSize: 11.5,
                          flexShrink: 0,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isCommitted && isChecked && idx < originallyCommitted.length - 1) {
                            if (onRequestRollback) {
                              onRequestRollback(updatingClient, s.name);
                            }
                            return;
                          }
                          handleModalStageSelect(s.name, idx);
                        }}
                      >
                        {isChecked ? (isCommitted ? "Committed ✓" : "Completed ✓") : isNextAvailable ? "Mark Done →" : "Set Stage →"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live 1-Row Stepper Preview */}
          <div className="admin-subcard" style={{ padding: "14px 16px" }}>
            <span className="admin-kicker" style={{ fontSize: 11, display: "block", marginBottom: 8 }}>
              Real-Time Stepper Pipeline Preview
            </span>
            <ActivityStatusBar
              scheme={updatingClient.scheme}
              stages={stages}
              completedSteps={statusFormData.completedSteps}
              progress={statusFormData.progress}
              interactive={false}
              size="compact"
              showTrack={false}
            />
          </div>

          {/* Document Verification Audits */}
          {updatingClient.documents && updatingClient.documents.length > 0 && (
            <div>
              <label className="admin-form-label" style={{ marginBottom: 8 }}>
                Compliance &amp; Document Audits:
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {updatingClient.documents.map((doc) => (
                  <div
                    key={doc.name}
                    className="admin-subcard"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 12px",
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 700, fontSize: 12.5 }}>{doc.name}</span>
                      <div style={{ fontSize: 11, color: "#64748b" }}>Ref: {doc.number}</div>
                    </div>
                    <span
                      className="admin-badge"
                      style={{
                        fontSize: 10.5,
                        padding: "2px 7px",
                        background: doc.status === "Verified" ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)",
                        color: doc.status === "Verified" ? "#10b981" : "#f59e0b",
                      }}
                    >
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Admin Milestone Notes & Quick Presets */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <label className="admin-form-label" style={{ margin: 0 }}>
                Admin Milestone Audit Notes:
              </label>
              <span style={{ fontSize: 11, color: "#64748b" }}>Logged to audit history</span>
            </div>

            {/* Quick Note Presets */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
              {quickNotes.map((preset, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => setStatusFormData((prev) => ({ ...prev, notes: preset }))}
                  className="admin-preset-pill"
                >
                  + {preset.split(" ")[0]} {preset.split(" ")[1]}...
                </button>
              ))}
            </div>

            <textarea
              className="admin-form-textarea"
              value={statusFormData.notes || ""}
              onChange={(e) => setStatusFormData((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Add verification remarks, committee audit notes, or next milestone directives..."
              rows={3}
            />
          </div>

          {/* Modal Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 12,
              paddingTop: 10,
              borderTop: "1px solid rgba(154, 116, 233, 0.15)",
            }}
          >
            <button
              type="button"
              className="admin-btn-secondary"
              onClick={onClose}
              style={{ padding: "10px 20px" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="admin-btn-primary"
              style={{ padding: "10px 24px" }}
            >
              <Icon name="check" size={16} />
              <span>Save Milestone Status</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
