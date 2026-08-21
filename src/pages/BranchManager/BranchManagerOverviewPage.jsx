import React from "react";
import KpiCard from "../../components/KpiCard";
import { BranchRevenueChart } from "../../components/charts";
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
    <section className="dashboard-layout bm-overview-layout">
      <div className="dashboard-main bm-overview-main">
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
        <div className="analytics-card bm-overview-chart-card">
          <div className="panel-header bm-panel-header-gap">
            <div>
              <p className="eyebrow bm-panel-eyebrow">Financial Health</p>
              <h2 className="bm-panel-heading">Branch Overview</h2>
              <p className="bm-panel-subtext">
                Key metrics, territorial distribution, and regional branch revenue across zones.
              </p>
            </div>
          </div>
          <BranchRevenueChart data={branchRevenueData} />
        </div>
      </div>

      {/* Full-Height Recent Activity Sidebar with No Scroll */}
      <aside className="owner-sidebar-widgets bm-sidebar-widgets-flex">
        <section className="activity-panel bm-activity-panel">
          <div className="panel-header bm-panel-header-gap-sm">
            <div>
              <p className="eyebrow bm-panel-eyebrow">Live Activity Feed</p>
              <h2 className="bm-panel-heading">What’s happening</h2>
            </div>
          </div>

          <div className="activity-list bm-activity-list">
            {branchActivities.map((act) => (
              <div className="activity-row bm-activity-row" key={act.title}>
                <span className="activity-mark bm-activity-mark" style={{ background: act.tone, boxShadow: `0 0 8px ${act.tone}` }} />
                <div className="bm-activity-content">
                  <strong className="bm-activity-title">
                    {act.title}
                  </strong>
                  <small className="bm-activity-detail">
                    {act.detail}
                  </small>
                </div>
                <time className="bm-activity-time">
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
