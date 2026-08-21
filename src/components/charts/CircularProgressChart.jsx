import React from "react";

export default function CircularProgressChart({
  progress = 60,
  strokeColor = "#4e7cff",
  trackColor = "rgba(78, 124, 255, 0.15)",
  strokeWidth = 3.5,
  showLabel = true,
  className = "",
}) {
  const cleanProgress = Math.min(Math.max(Number(progress) || 0, 0), 100);

  return (
    <div className={`cd-tracker-ring ${className}`}>
      <svg viewBox="0 0 36 36">
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${cleanProgress}, 100`}
          strokeLinecap="round"
        />
      </svg>
      {showLabel && (
        <span className="cd-tracker-percent-text">{cleanProgress}%</span>
      )}
    </div>
  );
}
