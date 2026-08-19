import React, { useState, useMemo } from "react";
import Icon from "../../components/Icon";
import RevenueSummaryCard from "../../components/RevenueSummaryCard";
import { revenueSeries } from "./mockManagerData";

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
        <linearGradient id="managerRevGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8c5ff8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#8c5ff8" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#managerRevGrad)" />
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

export default function ManagerRevenuePage({
  branchTeam = [],
  managedRegion = "East Zone",
  managedBranch = "East",
}) {
  const [revenueRange, setRevenueRange] = useState("monthly");
  const [revenueSalesPersonFilter, setRevenueSalesPersonFilter] = useState("all");

  const selectedRevenueData = useMemo(() => {
    const rawData = revenueSeries[revenueRange] || revenueSeries.monthly;
    if (revenueSalesPersonFilter === "all") {
      return rawData;
    }
    const selectedId = Number(revenueSalesPersonFilter);
    const memberIndex = branchTeam.findIndex((m) => m.id === selectedId);
    const factor = memberIndex >= 0 ? 0.35 + ((memberIndex % 3) * 0.12) : 0.4;
    return rawData.map((item) => ({
      ...item,
      value: Math.round(item.value * factor),
    }));
  }, [revenueRange, revenueSalesPersonFilter, branchTeam]);

  const revenueTotal = selectedRevenueData.reduce((sum, point) => sum + point.value, 0);
  const revenueReceived = Math.round(revenueTotal * 0.76);
  const revenuePending = Math.round(revenueTotal * 0.24);

  const revenueSummaryCards = [
    {
      label: "Payment Received",
      value: `₹${revenueReceived.toLocaleString("en-IN")}`,
      hint: "Collected from clients",
      accentClass: "received",
      icon: "arrowUp",
    },
    {
      label: "Payment Pending",
      value: `₹${revenuePending.toLocaleString("en-IN")}`,
      hint: "Pending team invoices",
      accentClass: "pending",
      icon: "overview",
    },
    {
      label: "Total Pipeline Revenue",
      value: `₹${revenueTotal.toLocaleString("en-IN")}`,
      hint: "Combined active deals",
      accentClass: "total",
      icon: "wallet",
    },
  ];

  const filteredTeam = useMemo(() => {
    if (revenueSalesPersonFilter === "all") return branchTeam;
    return branchTeam.filter((m) => String(m.id) === String(revenueSalesPersonFilter));
  }, [branchTeam, revenueSalesPersonFilter]);

  return (
    <section className="manager-page-view">
      {/* Header Banner */}
      <div className="manager-header-banner">
        <div className="manager-header-info">
          <p className="manager-header-eyebrow">Financial Velocity</p>
          <h1 className="manager-header-title">Team Revenue Intelligence</h1>
          <p className="manager-header-subtitle">
            Track commercial deal flows, quota achievement velocities, and collection pipelines for {managedRegion} ({managedBranch} Branch).
          </p>
        </div>
      </div>

      {/* Toolbar Filter */}
      <div className="analytics-card manager-toolbar-card">
        <div className="manager-toolbar-filters">
          <label className="field-label" style={{ margin: 0 }}>
            <span>Filter Salesperson</span>
            <select
              className="manager-filter-select"
              value={revenueSalesPersonFilter}
              onChange={(e) => setRevenueSalesPersonFilter(e.target.value)}
            >
              <option value="all">Entire Sales Team ({branchTeam.length} Members)</option>
              {branchTeam.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </label>

          <label className="field-label" style={{ margin: 0 }}>
            <span>Time Horizon</span>
            <select
              className="manager-filter-select"
              value={revenueRange}
              onChange={(event) => setRevenueRange(event.target.value)}
            >
              <option value="daily">Daily Collection</option>
              <option value="weekly">Weekly View</option>
              <option value="monthly">Monthly Cycle</option>
              <option value="yearly">Yearly Aggregate</option>
              <option value="allTime">All-Time Cumulative</option>
            </select>
          </label>
        </div>

        <div className="manager-count-badge">
          <span>Active Period:</span>
          <strong>{revenueRange.toUpperCase()}</strong>
        </div>
      </div>

      {/* Hero Sparkline Section */}
      <div className="revenue-panel">
        <div className="revenue-summary">
          <div>
            <p className="eyebrow">
              {revenueSalesPersonFilter === "all"
                ? "Team Revenue Overview"
                : `${branchTeam.find((m) => String(m.id) === String(revenueSalesPersonFilter))?.name || "Member"}'s Revenue`}
            </p>
            <h2>₹{revenueTotal.toLocaleString("en-IN")}</h2>
            <p className="revenue-copy">
              {revenueSalesPersonFilter === "all"
                ? `Aggregate billing performance generated across ${branchTeam.length} active sales representatives.`
                : "Individual pipeline revenue generated for the designated cycle."}
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
              <span>Active Reps</span>
              <strong>{revenueSalesPersonFilter === "all" ? branchTeam.length : 1}</strong>
            </div>
          </div>
        </div>

        <div className="revenue-chart-panel">
          <div className="revenue-chip">
            <Icon name="arrowUp" size={14} />
            <span>Team Pipeline Trend</span>
          </div>
          <RevenueTrendChart data={selectedRevenueData} />
        </div>
      </div>

      {/* Revenue Summary Cards */}
      <div className="revenue-summary-grid">
        {revenueSummaryCards.map((card) => (
          <RevenueSummaryCard key={card.label} card={card} />
        ))}
      </div>

      {/* Team Quota Breakdown Table */}
      <div className="analytics-card manager-table-card">
        <div style={{ padding: "18px 22px 14px", borderBottom: "1px solid rgba(140, 95, 248, 0.12)" }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Representative Quota Breakdown</h2>
          <p style={{ margin: "4px 0 0", color: "#7a748e", fontSize: 13 }}>
            Individual monthly target quotas compared against realized sales collections.
          </p>
        </div>

        <div className="manager-table-scroll">
          <table className="manager-team-table">
            <thead>
              <tr>
                <th>Salesperson</th>
                <th>Role</th>
                <th>Monthly Target</th>
                <th>Realized Revenue</th>
                <th>Quota Progress</th>
                <th style={{ textAlign: "right" }}>Attainment</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeam.map((member) => {
                const salesVal = parseInt(member.monthlySales.replace(/[^0-9]/g, "")) * 1000;
                const quotaVal = parseInt(member.quota.replace(/[^0-9]/g, "")) * 1000;
                const pct = Math.min(Math.round((salesVal / (quotaVal || 1)) * 100), 100);
                const initials = member.name
                  ? member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()
                  : "SP";

                return (
                  <tr key={member.id}>
                    <td>
                      <div className="manager-member-avatar-cell">
                        <div className="manager-member-avatar">{initials}</div>
                        <div className="manager-member-details">
                          <strong className="manager-member-name">{member.name}</strong>
                          <span className="manager-member-branch">{member.region || managedRegion}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="manager-role-tag">{member.role}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700 }}>{member.quota}</span>
                    </td>
                    <td>
                      <strong style={{ color: "#10b981", fontSize: 14 }}>{member.monthlySales}</strong>
                    </td>
                    <td style={{ minWidth: 160 }}>
                      <div className="manager-quota-cell">
                        <div className="manager-quota-bar">
                          <div
                            className="manager-quota-fill"
                            style={{
                              width: `${pct}%`,
                              background: pct >= 80 ? "linear-gradient(90deg, #10b981, #34d399)" : "linear-gradient(90deg, #8c5ff8, #6d3bf5)",
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <span
                        className={`manager-trend-pill ${pct >= 75 ? "positive" : "negative"}`}
                        style={{ fontSize: 12, padding: "4px 10px", fontWeight: 800 }}
                      >
                        {pct}% Target
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
