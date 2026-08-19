import React, { useState } from "react";
import RevenueSummaryCard from "../../components/RevenueSummaryCard";
import Icon from "../../components/Icon";
import { revenueSeries } from "./mockBranchManagerData";

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

  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="dashboard-chart" aria-hidden="true">
      <defs>
        <linearGradient id="bmRevGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8c5ff8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#8c5ff8" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#bmRevGrad)" />
      <path d={linePath} fill="none" stroke="#8c5ff8" strokeWidth="3" strokeLinecap="round" />
      {points.map((point) => (
        <g key={point.label}>
          <circle cx={point.x} cy={point.y} r="4.5" fill="#fff" stroke="#8c5ff8" strokeWidth="2.5" />
          <text x={point.x} y={height - 6} textAnchor="middle" fill="currentColor" opacity="0.65" fontSize="10.5" fontWeight="600">
            {point.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function BranchManagerRevenuePage({
  myBranch = "East",
}) {
  const [revenueRange, setRevenueRange] = useState("monthly");

  const selectedRevenueData = revenueSeries[revenueRange] || revenueSeries.monthly;
  const revenueTotal = selectedRevenueData.reduce((sum, point) => sum + point.value, 0);
  const revenueReceived = Math.round(revenueTotal * 0.72);
  const revenuePending = Math.round(revenueTotal * 0.28);

  const revenueSummaryCards = [
    {
      label: "Branch Payment Received",
      value: `₹${revenueReceived.toLocaleString("en-IN")}`,
      hint: "Collected from clients",
      accentClass: "received",
      icon: "arrowUp",
    },
    {
      label: "Branch Payment Pending",
      value: `₹${revenuePending.toLocaleString("en-IN")}`,
      hint: "Awaiting invoice settlement",
      accentClass: "pending",
      icon: "overview",
    },
    {
      label: "Total Branch Revenue",
      value: `₹${revenueTotal.toLocaleString("en-IN")}`,
      hint: "Cumulative pipeline revenue",
      accentClass: "total",
      icon: "wallet",
    },
  ];

  return (
    <section className="bm-page-view">
      {/* Header Banner */}
      <div className="bm-header-banner">
        <div className="bm-header-info">
          <p className="bm-header-eyebrow">{myBranch} Branch Financials</p>
          <h1 className="bm-header-title">Revenue Intelligence & Analytics</h1>
          <p className="bm-header-subtitle">
            Comprehensive billing volume, collection rate trajectories, and commercial pipeline horizons.
          </p>
        </div>
      </div>

      {/* Toolbar Filter */}
      <div className="analytics-card bm-toolbar-card">
        <div className="bm-toolbar-filters">
          <label className="field-label">
            <span>Time Horizon:</span>
            <select
              className="bm-filter-select"
              value={revenueRange}
              onChange={(event) => setRevenueRange(event.target.value)}
            >
              <option value="daily">Daily Collection</option>
              <option value="weekly">Weekly Cycle</option>
              <option value="monthly">Monthly Cycle</option>
              <option value="yearly">Yearly Aggregate</option>
              <option value="allTime">All-Time Cumulative</option>
            </select>
          </label>
        </div>

        <div className="bm-count-badge">
          <span>Active Cycle:</span>
          <strong>{revenueRange.toUpperCase()}</strong>
        </div>
      </div>

      {/* Hero Sparkline Section */}
      <div className="revenue-panel">
        <div className="revenue-summary">
          <div>
            <p className="eyebrow">Branch Revenue Performance</p>
            <h2>₹{revenueTotal.toLocaleString("en-IN")}</h2>
            <p className="revenue-copy">
              Aggregate billing revenue captured for the {revenueRange} horizon across all regional sales accounts.
            </p>
          </div>

          <div className="revenue-breakdown">
            <div>
              <span>Average Run Rate</span>
              <strong>₹{Math.round(revenueTotal / selectedRevenueData.length).toLocaleString("en-IN")}</strong>
            </div>
            <div>
              <span>Cycle Peak</span>
              <strong>₹{Math.max(...selectedRevenueData.map((item) => item.value)).toLocaleString("en-IN")}</strong>
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
            <span>Branch Pipeline Trend</span>
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
