import React from "react";

export default function RevenueTrendChart({
  data = [],
  color = "#6366f1",
  gradientId = "revGrad",
}) {
  const width = 320;
  const height = 180;
  const padding = 24;
  const values = data.map((item) => item.value);
  const maxValue = Math.max(...values, 1);
  const minValue = Math.min(...values, 0);
  const range = maxValue - minValue || 1;

  const points = data.map((item, index) => {
    const x = padding + (index * (width - padding * 2)) / Math.max(data.length - 1, 1);
    const y = height - padding - ((item.value - minValue) / range) * (height - padding * 2);
    return { x, y, label: item.label };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`
    : "";

  const uniqueGradId = `${gradientId}_${color.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="dashboard-chart" aria-hidden="true">
      <defs>
        <linearGradient id={uniqueGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      {areaPath && <path d={areaPath} fill={`url(#${uniqueGradId})`} />}
      {linePath && <path d={linePath} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />}
      {points.map((point) => (
        <g key={point.label}>
          <circle cx={point.x} cy={point.y} r="4.5" fill="#fff" stroke={color} strokeWidth="2.5" />
          <text x={point.x} y={height - 6} textAnchor="middle" fill="currentColor" opacity="0.65" fontSize="10.5" fontWeight="600">
            {point.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
