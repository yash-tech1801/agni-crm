import React from 'react';
import Icon from './Icon';

export default function KpiCard({ card, onAction, dark }) {
  const accent = card.accent || "#4e7cff";
  const base = dark ? "#353241" : "#fff";
  const cardStyle = {
    background: `linear-gradient(135deg, ${accent}${dark ? "3d" : "26"} 0%, ${accent}${dark ? "1f" : "12"} 55%, ${base} 100%)`,
    borderColor: "transparent",
  };

  return (
    <article className="kpi-card" style={cardStyle}>
      <div className="kpi-card-header">
        <div className="kpi-card-title">
          {card.icon && (
            <span className="kpi-card-icon" style={{ background: card.accent + "22", color: card.accent }}>
              <Icon name={card.icon} size={18} />
            </span>
          )}
          <span>{card.label}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="metric-chip" style={{ background: card.accent + "20", color: card.accent }}>
            {card.trend}
          </span>
          {card.linkTo && (
            <button
              type="button"
              className="kpi-link-button"
              onClick={() => onAction && onAction(card)}
              aria-label={`Open ${card.linkTo}`}>
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
