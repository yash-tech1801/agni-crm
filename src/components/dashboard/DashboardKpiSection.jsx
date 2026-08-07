import React from "react";
import KpiCard from "../KpiCard";

export default function DashboardKpiSection({ cards, onAction, className = "" }) {
  return (
    <section className={`kpi-grid ${className}`.trim()}>
      {cards.map((card) => (
        <KpiCard key={card.label} card={card} onAction={onAction} />
      ))}
    </section>
  );
}
