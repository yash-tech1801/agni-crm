import React, { useState } from "react";
import Icon from "../../components/Icon";
import RevenueSummaryCard from "../../components/RevenueSummaryCard";
import { revenueSeries } from "./mockOwnerData";

function RevenueTrendChart({ data }) {
  const width = 320;
  const height = 180;
  const padding = 24;
  const values = data.map((item) => item.value);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = maxValue - minValue || 1;

  const points = data.map((item, index) => {
    const x = padding + (index * (width - padding * 2)) / Math.max(data.length - 1, 1);
    const y = height - padding - ((item.value - minValue) / range) * (height - padding * 2);
    return { x, y, label: item.label };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${
    height - padding
  } L ${points[0].x} ${height - padding} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="dashboard-chart" aria-hidden="true">
      <defs>
        <linearGradient id="ownerRevGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#ownerRevGrad)" />
      <path d={linePath} fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
      {points.map((point) => (
        <g key={point.label}>
          <circle cx={point.x} cy={point.y} r="4.5" fill="#fff" stroke="#6366f1" strokeWidth="2.5" />
          <text x={point.x} y={height - 6} textAnchor="middle" fill="currentColor" opacity="0.65" fontSize="10.5" fontWeight="600">
            {point.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function OwnerRevenuePage({
  revenueRange = "monthly",
  setRevenueRange,
}) {
  const [localRange, setLocalRange] = useState(revenueRange);

  const activeRange = setRevenueRange ? revenueRange : localRange;
  const handleRangeChange = (val) => {
    if (setRevenueRange) setRevenueRange(val);
    else setLocalRange(val);
  };

  const selectedRevenueData = revenueSeries[activeRange] || revenueSeries.monthly;
  const revenueTotal = selectedRevenueData.reduce((sum, point) => sum + point.value, 0);
  const revenueReceived = Math.round(revenueTotal * 0.72);
  const revenuePending = Math.round(revenueTotal * 0.28);

  const revenueSummaryCards = [
    {
      label: "Payment received",
      value: `₹${revenueReceived.toLocaleString()}`,
      hint: "Collected from clients",
      accentClass: "received",
      icon: "arrowUp",
    },
    {
      label: "Payment pending",
      value: `₹${revenuePending.toLocaleString()}`,
      hint: "Awaiting confirmation",
      accentClass: "pending",
      icon: "overview",
    },
    {
      label: "Total payment",
      value: `₹${revenueTotal.toLocaleString()}`,
      hint: "Overall revenue range",
      accentClass: "total",
      icon: "revenue",
    },
  ];

  return (
    <section className="owner-page-view">
      {/* Header Banner */}
      <div className="owner-header-banner">
        <div className="owner-header-info">
          <p className="owner-header-eyebrow">Financial Analytics</p>
          <h1 className="owner-header-title">Executive Revenue Analytics</h1>
          <p className="owner-header-subtitle">
            Track revenue performance, collection volumes, and commercial billing trajectories across all regional branches.
          </p>
        </div>
      </div>

      {/* Toolbar Filter */}
      <div className="analytics-card owner-toolbar-card">
        <div className="owner-toolbar-filters">
          <label className="field-label" style={{ margin: 0 }}>
            <span>Time Horizon:</span>
            <select
              className="owner-filter-select"
              value={activeRange}
              onChange={(event) => handleRangeChange(event.target.value)}
            >
              <option value="daily">Daily Collection</option>
              <option value="weekly">Weekly Cycle</option>
              <option value="monthly">Monthly Cycle</option>
              <option value="yearly">Yearly Aggregate</option>
              <option value="allTime">All-Time Cumulative</option>
            </select>
          </label>
        </div>

        <div className="owner-count-badge">
          <span>Active Cycle:</span>
          <strong>{activeRange.toUpperCase()}</strong>
        </div>
      </div>

      {/* Hero Sparkline Section */}
      <div className="revenue-panel">
        <div className="revenue-summary">
          <div>
            <p className="eyebrow">Revenue overview</p>
            <h2>₹{revenueTotal.toLocaleString()}</h2>
            <p className="revenue-copy">
              Selected range: {activeRange.charAt(0).toUpperCase() + activeRange.slice(1)} horizon across all active enterprise portfolios.
            </p>
          </div>

          <div className="revenue-breakdown">
            <div>
              <span>Average Run Rate</span>
              <strong>
                ₹{Math.round(revenueTotal / selectedRevenueData.length).toLocaleString()}
              </strong>
            </div>
            <div>
              <span>Cycle Peak</span>
              <strong>
                ₹{Math.max(...selectedRevenueData.map((item) => item.value)).toLocaleString()}
              </strong>
            </div>
            <div>
              <span>Data Checkpoints</span>
              <strong>{selectedRevenueData.length} Points</strong>
            </div>
          </div>
        </div>

        <div className="revenue-chart-panel">
          <div className="revenue-chip">
            <Icon name="arrowUp" size={14} />
            <span>Revenue Trend</span>
          </div>
          <RevenueTrendChart data={selectedRevenueData} />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="revenue-summary-grid">
        {revenueSummaryCards.map((card) => (
          <RevenueSummaryCard key={card.label} card={card} />
        ))}
      </div>
    </section>
  );
}
