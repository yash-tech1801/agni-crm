import React from 'react';
import Icon from './Icon';

function hexToRgba(hex, alpha) {
  if (!hex || !hex.startsWith('#')) return `rgba(78, 124, 255, ${alpha})`;
  let c = hex.substring(1);
  if (c.length === 3) {
    c = c.split('').map((x) => x + x).join('');
  }
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function KpiCard({ card, onAction, dark }) {
  const accent = card.accent || "#4e7cff";

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
  };

  return (
    <article className="kpi-card" style={cardStyle}>
      <div className="kpi-card-header">
        <div className="kpi-card-title">
          {card.icon && (
            <span
              className="kpi-card-icon"
              style={{ background: hexToRgba(accent, 0.25), color: accent }}
            >
              <Icon name={card.icon} size={18} />
            </span>
          )}
          <span>{card.label}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            className="metric-chip"
            style={{
              background: hexToRgba(accent, 0.25),
              color: accent,
              border: `1px solid ${hexToRgba(accent, 0.4)}`,
            }}
          >
            {card.trend}
          </span>
          {card.linkTo && (
            <button
              type="button"
              className="kpi-link-button"
              onClick={() => onAction && onAction(card)}
              aria-label={`Open ${card.linkTo}`}
            >
              <Icon name="arrowUp" size={14} />
            </button>
          )}
        </div>
      </div>
      <h2>{card.value}</h2>
      <p>{card.description}</p>
    </article>
  );
}
