import React from "react";
import Icon from "../Icon";
import { ACTIVITY_STAGES } from "../../pages/Admin/mockAdminData";
import "./ActivityStatusBar.css";

/**
 * ActivityStatusBar: 5-Point Client Activity Status Stepper
 * Each checked point represents 20% progress (1=20%, 2=40%, 3=60%, 4=80%, 5=100%).
 *
 * @param {Object} props
 * @param {Array<string>} [props.completedSteps] - Array of completed stage names
 * @param {number} [props.progress] - Progress percentage (0 - 100)
 * @param {Function} [props.onStepToggle] - Callback (stepName, newCompletedSteps, newPercent)
 * @param {boolean} [props.interactive] - If true, points can be clicked to toggle completion
 * @param {boolean} [props.showTrack] - If true, renders a filled progress track bar
 * @param {string} [props.size] - "compact" | "normal" | "large"
 * @param {Object} [props.stepDates] - Optional map of { [stepName]: "10 Aug" }
 * @param {string} [props.className] - Custom container class
 */
export default function ActivityStatusBar({
  completedSteps,
  progress,
  onStepToggle,
  interactive = false,
  showTrack = true,
  size = "normal",
  stepDates = {},
  className = "",
}) {
  // Determine checked steps array
  const currentCompleted = React.useMemo(() => {
    if (Array.isArray(completedSteps)) {
      return completedSteps;
    }
    if (typeof progress === "number") {
      const count = Math.round(progress / 20);
      return ACTIVITY_STAGES.slice(0, count).map((s) => s.name);
    }
    return [];
  }, [completedSteps, progress]);

  // Calculate percentage: exactly 20% per completed point
  const calculatedPercent = Math.min(100, Math.max(0, currentCompleted.length * 20));

  // Find the first uncompleted step (active next step)
  const firstUncompletedIndex = ACTIVITY_STAGES.findIndex(
    (s) => !currentCompleted.includes(s.name)
  );

  const handlePointClick = (stage, idx) => {
    if (!interactive || !onStepToggle) return;

    let nextCompleted;
    if (currentCompleted.includes(stage.name)) {
      // If clicking already completed, uncheck this and subsequent steps
      nextCompleted = currentCompleted.filter((name) => {
        const stageIdx = ACTIVITY_STAGES.findIndex((s) => s.name === name);
        return stageIdx < idx;
      });
    } else {
      // If clicking uncompleted, check all steps up to and including this one
      nextCompleted = ACTIVITY_STAGES.slice(0, idx + 1).map((s) => s.name);
    }

    const newPercent = nextCompleted.length * 20;
    onStepToggle(stage.name, nextCompleted, newPercent);
  };

  return (
    <div className={`activity-status-wrapper size-${size} ${className}`}>
      {showTrack && (
        <div className="activity-status-header-bar">
          <div className="activity-status-header-left">
            <span className="activity-status-kicker">ACTIVITY MILESTONE TRACKER</span>
            <span className="activity-status-count-badge">
              <strong>{currentCompleted.length}</strong> of 5 Points Completed
            </span>
          </div>
          <div className="activity-status-header-right">
            <div className="activity-status-meter-wrap">
              <div className="activity-status-meter-bar">
                <div
                  className="activity-status-meter-fill"
                  style={{ width: `${calculatedPercent}%` }}
                />
              </div>
              <strong className="activity-status-percent-pill">
                {calculatedPercent}%
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* 5-Points Stepper Container */}
      <div className={`activity-status-points-container ${interactive ? "is-interactive" : ""}`}>
        {ACTIVITY_STAGES.map((stage, idx) => {
          const isDone = currentCompleted.includes(stage.name);
          const isActive = !isDone && idx === firstUncompletedIndex;
          const isPending = !isDone && !isActive;
          const dateStr = stepDates[stage.name] || (isDone ? "Completed" : "Pending");

          return (
            <div
              key={stage.name}
              className={`activity-point-item ${
                isDone ? "is-done" : isActive ? "is-active" : "is-pending"
              }`}
              onClick={() => handlePointClick(stage, idx)}
              title={
                interactive
                  ? isDone
                    ? `Click to mark pending from ${stage.name}`
                    : `Click to complete up to ${stage.name} (${(idx + 1) * 20}%)`
                  : undefined
              }
              role={interactive ? "button" : undefined}
              tabIndex={interactive ? 0 : undefined}
              onKeyDown={(e) => {
                if (interactive && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  handlePointClick(stage, idx);
                }
              }}
            >
              {/* Circle Node */}
              <div className="activity-point-node">
                {isDone ? (
                  <div className="activity-node-check">
                    <Icon name="check" size={size === "compact" ? 14 : 20} />
                  </div>
                ) : (
                  <div className="activity-node-number">{idx + 1}</div>
                )}
                {interactive && (
                  <span className="activity-node-toggle-indicator" title="Toggle point">
                    {isDone ? "✕" : "✓"}
                  </span>
                )}
              </div>

              {/* Step Labels */}
              <div className="activity-point-info">
                <span className="activity-point-name">{stage.name}</span>
                <span
                  className={`activity-point-status ${
                    isDone ? "status-done" : isActive ? "status-active" : "status-pending"
                  }`}
                >
                  {isDone ? "Completed" : dateStr}
                </span>
                <span className="activity-point-pct-tag">{(idx + 1) * 20}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
