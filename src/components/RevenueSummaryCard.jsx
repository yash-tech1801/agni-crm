import React from 'react';
import Icon from './Icon';

export default function RevenueSummaryCard({ card }) {
  return (
    <div className={`revenue-summary-card ${card.accentClass}`}>
      <div className="revenue-summary-card__top">
        <div className={`revenue-summary-icon ${card.accentClass}`}>
          <Icon name={card.icon} size={16} />
        </div>
        <span className="revenue-summary-pill">Live</span>
      </div>
      <p className="revenue-summary-card__label">{card.label}</p>
      <h3>{card.value}</h3>
      <p className="revenue-summary-card__hint">{card.hint}</p>
    </div>
  );
}
