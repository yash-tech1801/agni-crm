import React from "react";
import BranchRevenueChart from "../../components/BranchRevenueChart";
import { branchRevenueData } from "./mockBranchManagerData";

export default function BranchManagerReportsPage({
  myBranch = "East",
}) {
  const performanceMetrics = [
    { label: "Quarterly Target", value: "₹4,500,000", achieved: "₹4,120,000 Realized", rate: "91.5%", isPositive: true },
    { label: "Client Conversion", value: "68.4%", achieved: "+5.2% MoM Velocity", rate: "Optimal", isPositive: true },
    { label: "Average Case TAT", value: "4.2 Days", achieved: "-1.1 Days Faster", rate: "Fast Track", isPositive: true },
    { label: "Milestone Clearance", value: "94.8%", achieved: "5-Point Compliance", rate: "Excellent", isPositive: true },
  ];

  return (
    <section className="bm-page-view">
      {/* Header Banner */}
      <div className="bm-header-banner">
        <div className="bm-header-info">
          <p className="bm-header-eyebrow">{myBranch} Branch Headquarters</p>
          <h1 className="bm-header-title">Branch Performance & Analytics Reports</h1>
          <p className="bm-header-subtitle">
            Quarterly target realisations, conversion trajectories, and operational turnaround velocity metrics.
          </p>
        </div>
      </div>

      {/* KPI Cards Ribbon */}
      <div className="bm-kpi-ribbon">
        {performanceMetrics.map((item) => (
          <div key={item.label} className="analytics-card bm-kpi-tile">
            <div className="bm-kpi-tile-top">
              <span className="bm-kpi-tile-label">{item.label}</span>
              <span className="bm-trend-pill positive">{item.rate}</span>
            </div>
            <div>
              <strong className="bm-kpi-tile-value">{item.value}</strong>
              <span className="bm-kpi-tile-sub">
                {item.achieved}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue & Growth Analysis Card */}
      <div className="analytics-card bm-analytics-card">
        <div className="panel-header" style={{ marginBottom: 18 }}>
          <div>
            <p className="eyebrow" style={{ margin: "0 0 4px" }}>Cross-Territorial Analysis</p>
            <h2 className="bm-header-title">Branch Revenue Comparison Chart</h2>
            <p className="bm-header-subtitle">
              Comparative billing volume and target settlement distribution across operational regional zones.
            </p>
          </div>
        </div>
        <BranchRevenueChart data={branchRevenueData} />
      </div>
    </section>
  );
}
