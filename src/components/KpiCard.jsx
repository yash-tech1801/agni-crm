import React from 'react';
import Icon from './Icon';

export default function KpiCard({ card, onAction }) {
  return (
    <article className={`kpi-card ${card.slug || ''}`} style={card.bg ? { background: card.bg, borderColor: 'transparent' } : {}}>
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
