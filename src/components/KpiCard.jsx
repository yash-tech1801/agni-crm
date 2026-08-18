import React from 'react';
import Icon from './Icon';

function hexToRgba(hex, alpha) {
  if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) return `rgba(78, 124, 255, ${alpha})`;
  let c = hex.substring(1);
  if (c.length === 3) {
    c = c.split('').map((x) => x + x).join('');
  }
  const num = parseInt(c, 16);
  if (isNaN(num)) return `rgba(78, 124, 255, ${alpha})`;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function KpiCard({ card, onAction, onClick, dark, ...props }) {
  // Support both `card` object and spread individual props
  const data = card || props;
  const accent = data.accent || "#4e7cff";
  const label = data.label || "";
  const value = data.value || "";
  const trend = data.trend || "";
  const description = data.description || "";
  const icon = data.icon || null;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (onAction && card) {
      onAction(card);
    }
  };

  const bgGradient = dark
    ? `linear-gradient(135deg, ${hexToRgba(accent, 0.35)} 0%, ${hexToRgba(accent, 0.16)} 55%, #353241 100%)`
    : `linear-gradient(135deg, ${hexToRgba(accent, 0.45)} 0%, ${hexToRgba(accent, 0.22)} 50%, rgba(255, 255, 255, 0.70) 100%)`;

  const cardStyle = {
    background: bgGradient,
    backdropFilter: 'blur(24px) saturate(180%)',
    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
    border: `1px solid ${dark ? hexToRgba(accent, 0.35) : hexToRgba(accent, 0.45)}`,
    boxShadow: dark
      ? `0 14px 36px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)`
      : `0 14px 36px ${hexToRgba(accent, 0.22)}, 0 4px 12px rgba(23, 19, 43, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.9)`,
    cursor: onClick || onAction ? 'pointer' : 'default',
  };

  return (
    <article className="kpi-card" style={cardStyle} onClick={handleClick}>
      <div className="kpi-card-header">
        <div className="kpi-card-title">
          {icon && (
            <span
              className="kpi-card-icon"
              style={{ background: hexToRgba(accent, 0.25), color: accent }}
            >
              <Icon name={icon} size={18} />
            </span>
          )}
          <span>{label}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {trend && (
            <span
              className="metric-chip"
              style={{
                background: hexToRgba(accent, 0.2),
                color: dark ? '#ffffff' : accent,
                border: `1px solid ${hexToRgba(accent, 0.35)}`,
              }}
            >
              {trend}
            </span>
          )}
        </div>
      </div>
      <h2>{value}</h2>
      {description && <p>{description}</p>}
    </article>
  );
}
