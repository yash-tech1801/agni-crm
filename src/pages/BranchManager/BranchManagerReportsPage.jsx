import React from "react";
import BranchRevenueChart from "../../components/BranchRevenueChart";
import { branchRevenueData } from "./mockBranchManagerData";

export default function BranchManagerReportsPage({
  myBranch = "East",
}) {
  const performanceMetrics = [
    { label: "Quarterly Target", value: "₹4,500,000", achieved: "₹4,120,000", rate: "91.5%" },
    { label: "Client Conversion Rate", value: "68.4%", achieved: "+5.2% MoM", rate: "Optimal" },
    { label: "Average Case TAT", value: "4.2 Days", achieved: "-1.1 Days", rate: "Fast Track" },
    { label: "Milestone Clearance Rate", value: "94.8%", achieved: "5-Point Compliant", rate: "Excellent" },
  ];

  return (
    <section className="bm-page-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <p className="eyebrow">{myBranch} Branch</p>
          <h2 style={{ margin: 0 }}>Branch Performance & Analytics Reports</h2>
          <p style={{ margin: "4px 0 0", color: "#6b6b77", fontSize: 13 }}>
            Comprehensive operational reports, conversion rates, and milestone turnaround velocity.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 }}>
        {performanceMetrics.map((item) => (
          <div key={item.label} style={{ background: "#fff", padding: 20, borderRadius: 16, border: "1px solid #e7e7f5" }}>
            <p className="eyebrow" style={{ margin: "0 0 6px", color: "#4e7cff" }}>{item.label}</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>{item.value}</h2>
              <span style={{ fontSize: 12, color: "#10b981", fontWeight: 700 }}>{item.rate}</span>
            </div>
            <small style={{ color: "#7a748e", marginTop: 4, display: "block" }}>{item.achieved}</small>
          </div>
        ))}
      </div>

      {/* Revenue & Growth Analysis */}
      <div style={{ background: "#fff", padding: 22, borderRadius: 16, border: "1px solid #e7e7f5", marginBottom: 20 }}>
        <h3 style={{ margin: "0 0 4px" }}>Branch Revenue Comparison Chart</h3>
        <p style={{ margin: "0 0 16px", color: "#7a748e", fontSize: 13 }}>
          Comparative revenue analysis across operational regional zones.
        </p>
        <BranchRevenueChart data={branchRevenueData} />
      </div>
    </section>
  );
}
