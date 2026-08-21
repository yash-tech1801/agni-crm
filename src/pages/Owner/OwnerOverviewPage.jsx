import React from "react";
import KpiCard from "../../components/KpiCard";
import Icon from "../../components/Icon";
import { RevenueSparkline, ActivityTracker } from "../../components/charts";
import { revenueKpiCards, workforceKpiCards, activities } from "./mockOwnerData";

export default function OwnerOverviewPage({
  clients = [],
  onNavigate,
  onSelectEmployeeRole,
  onSelectRevenueRange,
  dark,
}) {
  return (
    <div className="owner-dashboard-layout" style={{ animation: "ownerFadeIn 0.25s ease-out" }}>
      <div className="dashboard-main">
        {/* Revenue & Financial KPIs */}
        <div style={{ marginBottom: 26 }}>
          <div className="owner-section-header">
            <h3 className="owner-section-title">
              <span className="owner-section-title-dot" style={{ background: '#6366f1' }} />
              Revenue &amp; Payment Overview
            </h3>
            <span className="owner-section-subtitle">Real-time Financial Metrics</span>
          </div>
          <section className="kpi-grid">
            {revenueKpiCards.map((card) => (
              <KpiCard
                key={card.label}
                card={card}
                dark={dark}
                onAction={(c) => {
                  if (c.linkTo === "Employees") {
                    if (onSelectEmployeeRole) onSelectEmployeeRole(c.employeeRole || "All roles");
                    if (onNavigate) onNavigate("Employees");
                  } else if (c.linkTo === "Revenue") {
                    if (onSelectRevenueRange) onSelectRevenueRange("monthly");
                    if (onNavigate) onNavigate("Revenue");
                  } else {
                    if (onNavigate) onNavigate(c.linkTo);
                  }
                }}
              />
            ))}
          </section>
        </div>

        {/* Workforce & Operations KPIs */}
        <div style={{ marginBottom: 26 }}>
          <div className="owner-section-header">
            <h3 className="owner-section-title">
              <span className="owner-section-title-dot" style={{ background: '#10b981' }} />
              Workforce &amp; Client Operations
            </h3>
            <span className="owner-section-subtitle">Team &amp; Account Metrics</span>
          </div>
          <section className="kpi-grid">
            {workforceKpiCards.map((card) => (
              <KpiCard
                key={card.label}
                card={card}
                dark={dark}
                onAction={(c) => {
                  if (c.linkTo === "Employees") {
                    if (onSelectEmployeeRole) onSelectEmployeeRole(c.employeeRole || "All roles");
                    if (onNavigate) onNavigate("Employees");
                  } else {
                    if (onNavigate) onNavigate(c.linkTo);
                  }
                }}
              />
            ))}
          </section>
        </div>

        {/* Revenue sparkline panel */}
        <section className="revenue-panel">
          <div className="revenue-summary">
            <p className="eyebrow">Revenue overview</p>
            <h2>₹96,421.50</h2>
            <p className="revenue-copy">Current revenue with growth across pending and monthly segments.</p>
            <div className="revenue-breakdown">
              <div>
                <span>Monthly revenue</span>
                <strong>₹28,900</strong>
              </div>
              <div>
                <span>Pending revenue</span>
                <strong>₹12,070</strong>
              </div>
              <div>
                <span>Growth</span>
                <strong>+14.6%</strong>
              </div>
            </div>
          </div>
          <div className="revenue-chart-panel">
            <div className="revenue-chip">
              <Icon name="arrowUp" size={14} />
              <span>Revenue trend</span>
            </div>
            <RevenueSparkline />
          </div>
        </section>
      </div>

      <aside className="owner-sidebar-widgets">
        {/* Dynamic Activity Status Milestone Widget */}
        <ActivityTracker clients={clients} />

        <section className="activity-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Recent activity</p>
              <h2>What's happening</h2>
            </div>
          </div>
          <div className="activity-list">
            {activities.map((activity) => (
              <div className="activity-row" key={activity.title}>
                <span className="activity-mark" style={{ background: activity.tone }} />
                <div>
                  <strong>{activity.title}</strong>
                  <small>{activity.detail}</small>
                </div>
                <time>{activity.time}</time>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}
