import React from "react";
import KpiCard from "../../components/KpiCard";
import BranchRevenueChart from "../../components/BranchRevenueChart";
import { kpiCards, branchRevenueData } from "./mockBranchManagerData";

const branchActivities = [
  {
    title: "New Client Assignment",
    detail: "Bright Retail assigned to East branch",
    tone: "#9a74e9",
    time: "10m ago",
  },
  {
    title: "Milestone Cleared",
    detail: "Doc audit completed for Urban Foods",
    tone: "#10b981",
    time: "32m ago",
  },
  {
    title: "Revenue Disbursed",
    detail: "₹68k commercial token settled",
    tone: "#4e7cff",
    time: "1h ago",
  },
  {
    title: "IT Support Resolved",
    detail: "Server sync verified for West branch",
    tone: "#f59e0b",
    time: "2h ago",
  },
  {
    title: "Manager Review Scheduled",
    detail: "Monthly regional sync with North Zone",
    tone: "#8c5ff8",
    time: "4h ago",
  },
  {
    title: "Campaign Initiated",
    detail: "Q3 Marketing leads allocated to sales",
    tone: "#ec4899",
    time: "Yesterday",
  },
  {
    title: "Compliance Verified",
    detail: "Quarterly audit & tax filings checked",
    tone: "#06b6d4",
    time: "1d ago",
  },
  {
    title: "Team Quota Updated",
    detail: "South Zone targets increased by 15%",
    tone: "#10b981",
    time: "2d ago",
  },
];

export default function BranchManagerOverviewPage({ dark, onNavigate }) {
  return (
    <section className="dashboard-layout" style={{ animation: "bmFadeIn 0.25s ease-out", alignItems: "stretch" }}>
      <div className="dashboard-main" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {/* KPI Grid */}
        <section className="kpi-grid">
          {kpiCards.map((card) => (
            <KpiCard
              key={card.label}
              card={card}
              dark={dark}
              onAction={(c) => onNavigate && onNavigate(c.linkTo)}
            />
          ))}
        </section>

        {/* Branch Overview Analytics Chart */}
        <div className="analytics-card" style={{ padding: 22, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div className="panel-header" style={{ marginBottom: 18 }}>
            <div>
              <p className="eyebrow" style={{ margin: "0 0 4px" }}>Financial Health</p>
              <h2 style={{ margin: 0 }}>Branch Overview</h2>
              <p style={{ margin: "4px 0 0", color: "#7a748e", fontSize: 13 }}>
                Key metrics, territorial distribution, and regional branch revenue across zones.
              </p>
            </div>
          </div>
          <BranchRevenueChart data={branchRevenueData} />
        </div>
      </div>

      {/* Full-Height Recent Activity Sidebar with No Scroll */}
      <aside className="owner-sidebar-widgets" style={{ display: "flex", flexDirection: "column" }}>
        <section className="activity-panel bm-activity-panel">
          <div className="panel-header" style={{ marginBottom: 14 }}>
            <div>
              <p className="eyebrow" style={{ margin: "0 0 4px" }}>Live Activity Feed</p>
              <h2 style={{ margin: 0 }}>What’s happening</h2>
            </div>
          </div>

          <div className="activity-list bm-activity-list">
            {branchActivities.map((act) => (
              <div className="activity-row bm-activity-row" key={act.title}>
                <span className="activity-mark bm-activity-mark" style={{ background: act.tone, boxShadow: `0 0 8px ${act.tone}` }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 2 }}>
                    {act.title}
                  </strong>
                  <small style={{ color: "#7a748e", fontSize: 11.5, display: "block", lineHeight: 1.3 }}>
                    {act.detail}
                  </small>
                </div>
                <time style={{ fontSize: 11, color: "#7a748e", whiteSpace: "nowrap", marginLeft: 6 }}>
                  {act.time}
                </time>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </section>
  );
}
