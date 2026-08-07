import React from 'react';

export default function BranchRevenueChart({ data = [] }) {
  const width = 520;
  const height = 220;
  const padY = 40;
  const padX = 20;
  
  if (!data || data.length === 0) return null;
  
  const maxRevenue = Math.max(...data.map(d => d.revenue), 1);
  const barWidth = 48;
  const availableWidth = width - padX * 2;
  const spacing = availableWidth / data.length;

  return (
    <div style={{ padding: 12 }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 240 }} aria-hidden="true">
        {data.map((item, idx) => {
          const x = padX + (idx * spacing) + (spacing / 2) - (barWidth / 2);
          const barHeight = Math.max(Math.round((item.revenue / maxRevenue) * (height - padY * 2)), 4);
          const y = height - padY - barHeight;
          return (
            <g key={idx}>
              <rect x={x} y={y} width={barWidth} height={barHeight} fill="#9a74e9" rx={4} />
              <text x={x + barWidth / 2} y={y - 8} textAnchor="middle" fill="#4e5579" fontSize={12} fontWeight={600}>
                ₹{item.revenue}k
              </text>
              <text x={x + barWidth / 2} y={height - padY + 20} textAnchor="middle" fill="#7b7790" fontSize={12}>
                {item.branch}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
