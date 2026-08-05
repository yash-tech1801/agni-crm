import React from 'react';
import Icon from './Icon';

export default function KpiCard({ card, onAction }) {
  return (
    <article className={`kpi-card ${card.slug || ''}`}>
      <div className="kpi-card-header">
        <span>{card.label}</span>
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
