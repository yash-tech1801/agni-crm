import React from "react";

export default function PerformanceChart({ series = [], label }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const width = 520;
  const height = 200;
  const pad = 36;
  const max = Math.max(...series, 1);
  const points = series.map((v, i) => {
    const x = pad + (i * (width - pad * 2)) / Math.max(series.length - 1, 1);
    const y = height - pad - Math.round((v / max) * (height - pad * 2));
    return { x, y, v, label: months[i] };
  });

  return (
    <div style={{ padding: 12 }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 220 }} aria-hidden="true">
        <polyline
          fill="none"
          stroke="#cfcff6"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points.map(p => `${p.x},${p.y}`).join(' ')}
        />
        {points.map((p, idx) => (
          <g key={idx}>
            <circle cx={p.x} cy={p.y} r={6} fill={idx >= 10 ? (idx === 11 ? '#44bfb0' : '#9a74e9') : '#9a74e9'} />
          </g>
        ))}
      </svg>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        {points.map((p, idx) => (
          <div key={idx} style={{ textAlign: 'center', fontSize: 11, color: '#7b7790', minWidth: 0 }}>
            <div>{p.label}</div>
          </div>
        ))}
      </div>

      {label && <div style={{ marginTop: 12, color: '#6b6b77' }}>{label}</div>}
    </div>
  );
}
