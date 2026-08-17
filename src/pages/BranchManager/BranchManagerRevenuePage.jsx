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
      <path d={areaPath} fill="rgba(154, 116, 233, 0.16)" />
      <path d={linePath} fill="none" stroke="#9a74e9" strokeWidth="3" strokeLinecap="round" />
      {points.map((point) => (
        <g key={point.label}>
          <circle cx={point.x} cy={point.y} r="4.5" fill="#fff" stroke="#9a74e9" strokeWidth="2" />
          <text x={point.x} y={height - 6} textAnchor="middle" fill="#7d79a8" fontSize="11">
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
    <section className="bm-page-section">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
        <div>
          <h2 style={{ margin: 0 }}>Revenue Analytics — {myBranch} Branch</h2>
          <div style={{ color: "#7a748e", fontSize: 13, marginTop: 4 }}>Track revenue performance for your branch over time</div>
        </div>
        <div>
          <label style={{ fontSize: 13, color: "#6b6b77", marginRight: 8 }}>Time range:</label>
          <select
            value={revenueRange}
            onChange={(event) => setRevenueRange(event.target.value)}
            style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid #dedfe1", fontWeight: 600 }}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="allTime">All time</option>
          </select>
        </div>
      </div>

      <div className="revenue-panel" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 16, alignItems: "stretch", marginBottom: 20 }}>
        <div className="revenue-summary" style={{ minHeight: 220 }}>
          <p className="eyebrow">Revenue overview</p>
          <h2>₹{revenueTotal.toLocaleString()}</h2>
          <p className="revenue-copy">Selected range: {revenueRange.charAt(0).toUpperCase() + revenueRange.slice(1)}</p>
          <div className="revenue-breakdown">
            <div>
              <span>Average</span>
              <strong>₹{Math.round(revenueTotal / selectedRevenueData.length).toLocaleString()}</strong>
            </div>
            <div>
              <span>Peak</span>
              <strong>₹{Math.max(...selectedRevenueData.map((item) => item.value)).toLocaleString()}</strong>
            </div>
            <div>
              <span>Points</span>
              <strong>{selectedRevenueData.length}</strong>
            </div>
          </div>
        </div>
        <div className="revenue-chart-panel" style={{ minHeight: 220 }}>
          <div className="revenue-chip">
            <Icon name="arrowUp" size={14} />
            <span>Trend</span>
          </div>
          <RevenueTrendChart data={selectedRevenueData} />
        </div>
      </div>

      <div className="revenue-summary-grid">
        {revenueSummaryCards.map((card) => (
          <RevenueSummaryCard key={card.label} card={card} />
        ))}
      </div>
    </section>
  );
}
