import React from "react";

export default function RevenueSparkline({
  d = "M12 42 C42 34 70 22 98 26 C126 30 154 18 182 24 C210 30 228 18 236 14",
  dots = [
    { cx: 12, cy: 42 },
    { cx: 98, cy: 26 },
    { cx: 236, cy: 14 },
  ],
  strokeColor = "rgba(255, 255, 255, 0.85)",
}) {
  return (
    <svg viewBox="0 0 240 64" aria-hidden="true" className="sparkline-chart">
      <path
        d={d}
        fill="none"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {dots.map((dot, idx) => (
        <circle key={idx} cx={dot.cx} cy={dot.cy} r="4" fill="#fff" />
      ))}
    </svg>
  );
}
