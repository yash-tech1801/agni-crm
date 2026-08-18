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
      label: "Team Payment Received",
      value: `₹${revenueReceived.toLocaleString()}`,
      hint: "Collected by team members",
      accentClass: "received",
      icon: "arrowUp",
    },
    {
      label: "Team Payment Pending",
      value: `₹${revenuePending.toLocaleString()}`,
      hint: "Pending from team clients",
      accentClass: "pending",
      icon: "overview",
    },
    {
      label: "Total Team Payment",
      value: `₹${revenueTotal.toLocaleString()}`,
      hint: "Overall team revenue range",
      accentClass: "total",
      icon: "revenue",
    },
  ];

  const filteredTeam = useMemo(() => {
    if (revenueSalesPersonFilter === "all") return branchTeam;
    return branchTeam.filter((m) => String(m.id) === String(revenueSalesPersonFilter));
  }, [branchTeam, revenueSalesPersonFilter]);

  return (
    <section style={{ animation: "fadeIn 0.25s ease-out" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Team Revenue Analytics</h2>
          <div style={{ color: "#7a748e", fontSize: 13, marginTop: 4 }}>
            Revenue performance for your sales team in {managedRegion} ({managedBranch} Branch)
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div>
            <label style={{ fontSize: 13, color: "#6b6b77", marginRight: 8 }}>Team Member</label>
            <select
              value={revenueSalesPersonFilter}
              onChange={(e) => setRevenueSalesPersonFilter(e.target.value)}
            >
              <option value="all">All Team Members</option>
              {branchTeam.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 13, color: "#6b6b77", marginRight: 8 }}>Time range</label>
            <select
              value={revenueRange}
              onChange={(event) => setRevenueRange(event.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="allTime">All time</option>
            </select>
          </div>
        </div>
      </div>

      <div
        className="revenue-panel"
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: 16,
          alignItems: "stretch",
        }}
      >
        <div className="revenue-summary" style={{ minHeight: 220 }}>
          <p className="eyebrow">
            {revenueSalesPersonFilter === "all"
              ? "Team Revenue Overview"
              : `${branchTeam.find((m) => String(m.id) === String(revenueSalesPersonFilter))?.name || "Member"}'s Revenue`}
          </p>
          <h2>₹{revenueTotal.toLocaleString()}</h2>
          <p className="revenue-copy">
            {revenueSalesPersonFilter === "all"
              ? `Combined revenue of ${branchTeam.length} sales team members.`
              : "Revenue generated by selected team member."}
          </p>
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
              <span>Team Members</span>
              <strong>{revenueSalesPersonFilter === "all" ? branchTeam.length : 1}</strong>
            </div>
          </div>
        </div>
        <div className="revenue-chart-panel" style={{ minHeight: 220 }}>
          <div className="revenue-chip">
            <Icon name="arrowUp" size={14} />
            <span>Team Trend</span>
          </div>
          <RevenueTrendChart data={selectedRevenueData} />
        </div>
      </div>

      <div className="revenue-summary-grid">
        {revenueSummaryCards.map((card) => (
          <RevenueSummaryCard key={card.label} card={card} />
        ))}
      </div>

      <div style={{ marginTop: 24 }}>
        <h3 style={{ margin: "0 0 12px 0" }}>Team Member Revenue Breakdown</h3>
        <table className="clients-table">
          <thead>
            <tr>
              <th>Sales Person</th>
              <th>Role</th>
              <th>Region</th>
              <th>Monthly Quota</th>
              <th>Revenue Generated</th>
              <th>Achievement</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeam.map((member) => {
              const salesVal = parseInt(member.monthlySales.replace(/[^0-9]/g, "")) * 1000;
              const quotaVal = parseInt(member.quota.replace(/[^0-9]/g, "")) * 1000;
              const pct = Math.round((salesVal / (quotaVal || 1)) * 100);
              return (
                <tr key={member.id}>
                  <td style={{ fontWeight: 600 }}>{member.name}</td>
                  <td>{member.role}</td>
                  <td>{member.region}</td>
                  <td>{member.quota}</td>
                  <td style={{ color: "#44bfb0", fontWeight: 600 }}>{member.monthlySales}</td>
                  <td>
                    <span
                      className="table-action"
                      style={{
                        background: "#eef3ff",
                        color: "#4e7cff",
                        border: "1px solid #c7d7fe",
                      }}
                    >
                      {pct}% Achieved
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
