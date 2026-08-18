import React from "react";
import Icon from "../Icon";
import {
  getTrackerStages,
  getTrackerState,
  canCompleteStage,
  normalizeCompletedStages,
  getProcessTypeForScheme,
  getProcessTypeLabel,
} from "../../utils/schemeTracker.js";
import "./ActivityStatusBar.css";

/**
 * ActivityStatusBar: Scheme-Based Dynamic Activity Milestone Tracker
 * Strictly enforces sequential workflow.
 */
export default function ActivityStatusBar({
  scheme,
  completedSteps,
  progress,
  onStepToggle,
  interactive = false,
  showTrack = true,
  size = "normal",
  stepDates = {},
  className = "",
}) {
  const stages = React.useMemo(() => getTrackerStages(scheme), [scheme]);
  const totalStages = stages.length;

  const currentCompleted = React.useMemo(() => {
    let rawSteps = [];
    if (Array.isArray(completedSteps)) {
      rawSteps = completedSteps;
    } else if (typeof progress === "number" && totalStages > 0) {
      const count = Math.round((progress / 100) * totalStages);
      rawSteps = stages.slice(0, count).map((s) => s.name);
    }
    return normalizeCompletedStages(rawSteps, stages);
  }, [completedSteps, progress, stages, totalStages]);

  const trackerState = React.useMemo(() => {
    return getTrackerState({ scheme, completedSteps: currentCompleted });
  }, [scheme, currentCompleted]);

  const calculatedPercent = trackerState.progressPercent;
  const processType = getProcessTypeForScheme(scheme);
  const processLabel = getProcessTypeLabel(processType);

  const handlePointClick = (stage, idx) => {
    if (!interactive || !onStepToggle) return;

    let nextCompleted;
    if (currentCompleted.includes(stage.name)) {
      // If unchecking, remove this and all subsequent steps to maintain sequentiality
      nextCompleted = currentCompleted.filter((name) => {
        const stageIdx = stages.findIndex((s) => s.name === name);
        return stageIdx < idx;
      });
    } else {
      // If completing, check if allowed sequentially
      if (!canCompleteStage(stage.name, stages, currentCompleted)) {
        return;
      }
      nextCompleted = stages.slice(0, idx + 1).map((s) => s.name);
    }

    const normalized = normalizeCompletedStages(nextCompleted, stages);
    const updatedTracker = getTrackerState({ scheme, completedSteps: normalized });
    onStepToggle(stage.name, updatedTracker.completedStages, updatedTracker.progressPercent);
  };

  return (
    <div className={`activity-status-wrapper size-${size} ${className}`}>
      {showTrack && (
        <div className="activity-status-header-bar">
          <div className="activity-status-header-left">
            <span className="activity-status-kicker">
              ACTIVITY MILESTONE TRACKER ({processLabel})
            </span>
            <span className="activity-status-count-badge">
              <strong>{currentCompleted.length}</strong> of {totalStages} Points Completed
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

      {/* Stepper Container */}
      <div className={`activity-status-points-container ${interactive ? "is-interactive" : ""}`}>
        {stages.map((stage, idx) => {
          const isDone = currentCompleted.includes(stage.name);
          const isCurrentActive = stage.name === trackerState.currentStage;
          const isLocked = !isDone && !isCurrentActive;
          const isClickable = interactive && (isDone || canCompleteStage(stage.name, stages, currentCompleted));

          const dateStr = stepDates[stage.name] || (isDone ? "Completed" : isCurrentActive ? "In Progress" : "Locked");

          return (
            <div
              key={stage.name}
              className={`activity-point-item ${
                isDone
                  ? "is-done"
                  : isCurrentActive
                  ? "is-active"
                  : "is-pending is-locked"
              } ${isClickable ? "is-clickable" : "not-clickable"}`}
              onClick={() => handlePointClick(stage, idx)}
              title={
                interactive
                  ? isDone
                    ? `Click to mark pending from ${stage.name}`
                    : isClickable
                    ? `Click to complete ${stage.name}`
                    : `Locked: Complete prior steps first`
                  : undefined
              }
              role={interactive && isClickable ? "button" : undefined}
              tabIndex={interactive && isClickable ? 0 : undefined}
            >
              {/* Circle Node */}
              <div className="activity-point-node">
                {isDone ? (
                  <div className="activity-node-check">
                    <Icon name="check" size={size === "compact" ? 14 : 20} />
                  </div>
                ) : isCurrentActive ? (
                  <div className="activity-node-number">{idx + 1}</div>
                ) : (
                  <div className="activity-node-locked">🔒</div>
                )}
                {interactive && isClickable && (
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
                    isDone
                      ? "status-done"
                      : isCurrentActive
                      ? "status-active"
                      : "status-pending status-locked"
                  }`}
                >
                  {dateStr}
                </span>
                <span className="activity-point-pct-tag">
                  {Math.round(((idx + 1) / totalStages) * 100)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
