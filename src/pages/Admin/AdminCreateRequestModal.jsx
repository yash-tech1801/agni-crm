import React, { useMemo, useState, useEffect } from "react";
import Icon from "../../components/Icon";
import { getTrackerStages } from "../../utils/schemeTracker";
import "./AdminDashboard.css";

const makeRequestId = () => `ARQ-${Math.floor(100 + Math.random() * 900)}`;

export default function AdminCreateRequestModal({
  clients = [],
  preselectedClient = null,
  preselectedTargetStage = null,
  onClose,
  onSubmit,
}) {
  const [selectedClientId, setSelectedClientId] = useState(
    preselectedClient ? String(preselectedClient.id) : (clients[0] ? String(clients[0].id) : "")
  );
  const [targetRollbackStage, setTargetRollbackStage] = useState(
    preselectedTargetStage || ""
  );
  const [reason, setReason] = useState("");
  const [priority, setPriority] = useState("High");

  const selectedClient = useMemo(
    () => clients.find((c) => String(c.id) === String(selectedClientId)) || clients[0],
    [clients, selectedClientId]
  );

  const completedSteps = useMemo(() => {
    return selectedClient?.completedSteps || [];
  }, [selectedClient]);

  // Available earlier stages to roll back to
  const rollbackOptions = useMemo(() => {
    if (!selectedClient || completedSteps.length <= 1) return [];
    const currentLatest = completedSteps[completedSteps.length - 1];
    return completedSteps.filter((step) => step !== currentLatest);
  }, [selectedClient, completedSteps]);

  useEffect(() => {
    if (rollbackOptions.length > 0 && !targetRollbackStage) {
      setTargetRollbackStage(rollbackOptions[rollbackOptions.length - 1]);
    }
  }, [rollbackOptions, targetRollbackStage]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!selectedClient) return;
    if (!reason.trim()) return;

    const currentLatest = completedSteps[completedSteps.length - 1] || selectedClient.applicationStatus;
    const requestedChanges = [
      { field: "Milestone Stage", oldValue: `${currentLatest} (${selectedClient.progress}%)`, newValue: `${targetRollbackStage || "CRM Creation"}` },
      { field: "Tracker Status", oldValue: "Committed", newValue: "Rolled Back & In Progress" },
    ];

    const request = {
      id: makeRequestId(),
      clientAppId: selectedClient.appId,
      clientName: selectedClient.name,
      company: selectedClient.company || selectedClient.name,
      branch: selectedClient.branch,
      requestType: "Tracker Stage Rollback",
      currentStage: currentLatest,
      targetStage: targetRollbackStage || "CRM Creation",
      recipient: "Branch Manager",
      reason: reason.trim(),
      requestedChanges,
      priority,
      status: "Pending",
      createdAt: new Date().toISOString().split("T")[0],
      decisionDate: null,
      managerRemarks: null,
    };

    onSubmit(request);
    onClose();
  };

  return (
    <div className="admin-modal-backdrop-wrap" onClick={onClose}>
      <div
        className="admin-panel-card admin-modal-card-container hide-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="admin-modal-header-row">
          <div>
            <span className="admin-kicker">
              Branch Governance • Recipient: Branch Manager
            </span>
            <h2 className="admin-title" style={{ fontSize: 20 }}>
              Request Tracker Stage Rollback
            </h2>
          </div>
          <button
            type="button"
            className="admin-btn-secondary admin-modal-close-circle"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Info Banner */}
        <div className="admin-subcard admin-modal-alert-box">
          <Icon name="alert" size={16} />
          <span>
            Tracker stages cannot be undone directly once committed. This petition will be sent to the <strong>Branch Manager</strong> for authorization.
          </span>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          {/* Select Target Client */}
          <div>
            <label className="admin-form-label">
              Select Target Client <span style={{ color: "#f43f5e" }}>*</span>
            </label>
            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="admin-form-input"
              required
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.company}) — Scheme: {c.scheme} • Current: {c.applicationStatus} ({c.progress}%)
                </option>
              ))}
            </select>
          </div>

          {/* Client Snapshot Card */}
          {selectedClient && (
            <div className="admin-subcard admin-modal-client-card">
              <div>
                <strong>{selectedClient.name}</strong>
                <div className="admin-req-subtext">
                  App ID: {selectedClient.appId} • Scheme: {selectedClient.scheme} • Branch: {selectedClient.branch}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span className="admin-badge" style={{ background: "rgba(78, 124, 255, 0.12)", color: "#4e7cff", fontSize: 11 }}>
                  Current Milestone: {selectedClient.applicationStatus} ({selectedClient.progress}%)
                </span>
              </div>
            </div>
          )}

          {/* Target Rollback Stage Selector */}
          <div>
            <label className="admin-form-label">
              Target Rollback Milestone Stage <span style={{ color: "#f43f5e" }}>*</span>
            </label>
            {rollbackOptions.length > 0 ? (
              <select
                value={targetRollbackStage}
                onChange={(e) => setTargetRollbackStage(e.target.value)}
                className="admin-form-input"
                required
              >
                {rollbackOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    Roll back to: {opt}
                  </option>
                ))}
              </select>
            ) : (
              <div className="admin-modal-alert-box">
                Client is currently at the initial milestone ({completedSteps[0] || "CRM Creation"}). No earlier stages to roll back to.
              </div>
            )}
            <small className="admin-req-subtext" style={{ display: "block", marginTop: 4 }}>
              Upon Branch Manager approval, all milestones subsequent to this target stage will be marked pending.
            </small>
          </div>

          {/* Reason & Audit Justification */}
          <div>
            <label className="admin-form-label">
              Reason &amp; Audit Justification to Branch Manager <span style={{ color: "#f43f5e" }}>*</span>
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explain why this tracker milestone rollback is required (e.g. documentation correction, scheme adjustment)..."
              className="admin-form-textarea"
              required
            />
          </div>

          {/* Priority */}
          <div className="admin-modal-grid-2">
            <div>
              <label className="admin-form-label">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="admin-form-input"
              >
                <option value="Normal">Normal Priority</option>
                <option value="High">High Priority</option>
                <option value="Urgent">Urgent (Immediate Reversal)</option>
              </select>
            </div>
            <div>
              <span className="admin-req-subtext" style={{ lineHeight: 1.4, display: "block" }}>
                🛡️ Direct approval request will appear in the <strong>Branch Manager</strong> governance queue.
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
            <button type="button" className="admin-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="admin-btn-primary"
              disabled={rollbackOptions.length === 0}
            >
              <Icon name="checkCircle" size={14} />
              <span>Submit Rollback Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
