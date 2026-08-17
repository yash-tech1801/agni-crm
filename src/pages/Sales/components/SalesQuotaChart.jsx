import React from "react";

export function SalesQuotaChart({ months, quotaData, acquiredData }) {
  const width = 560;
  const height = 260;
  const padding = 44;
  const maxValue = Math.max(...quotaData, ...acquiredData);
  const points = months.map((label, index) => {
    const x = padding + (index * (width - padding * 2)) / Math.max(months.length - 1, 1);
    const quotaY = height - padding - (quotaData[index] / maxValue) * (height - padding * 2);
    const acquiredY = height - padding - (acquiredData[index] / maxValue) * (height - padding * 2);
    return { label, x, quotaY, acquiredY, quota: quotaData[index], acquired: acquiredData[index] };
  });

  const quotaPath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.quotaY}`).join(" ");
  const acquiredPath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.acquiredY}`).join(" ");

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 12, height: 12, background: '#9a74e9', borderRadius: 999 }} /> Quota
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 12, height: 12, background: '#44bfb0', borderRadius: 999 }} /> Acquired
        </span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 280 }} aria-hidden="true">
        <path d={quotaPath} fill="none" stroke="#9a74e9" strokeWidth={3} strokeLinecap="round" />
        <path d={acquiredPath} fill="none" stroke="#44bfb0" strokeWidth={3} strokeLinecap="round" />
        {points.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.quotaY} r={5} fill="#fff" stroke="#9a74e9" strokeWidth={2} />
            <circle cx={point.x} cy={point.acquiredY} r={5} fill="#fff" stroke="#44bfb0" strokeWidth={2} />
          </g>
        ))}
        {points.map((point) => (
          <text key={`${point.label}-label`} x={point.x} y={height - 16} textAnchor="middle" fontSize="11" fill="#6b6b77">
            {point.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

export function DashboardChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const quotaData = [62000, 65000, 70000, 72000, 74000, 76000, 78000, 80000, 82000, 84000, 86000, 90000];
  const acquiredData = [52000, 58000, 63000, 68000, 71000, 74000, 76000, 79000, 81000, 83000, 85000, 89000];
  return <SalesQuotaChart months={months} quotaData={quotaData} acquiredData={acquiredData} />;
}

export default DashboardChart;
