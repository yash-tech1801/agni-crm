import React from "react";
import KpiCard from "../../components/KpiCard";
import Icon from "../../components/Icon";
import { revenueKpiCards, workforceKpiCards, activities } from "./mockOwnerData";
import { ACTIVITY_STAGES } from "../Admin/mockAdminData";
import { getTrackerState } from "../../utils/schemeTracker";

function RevenueSparkline() {
  return (
    <svg viewBox="0 0 240 64" aria-hidden="true" className="sparkline-chart">
      <path
        d="M12 42 C42 34 70 22 98 26 C126 30 154 18 182 24 C210 30 228 18 236 14"
        fill="none"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="12" cy="42" r="4" fill="#fff" />
      <circle cx="98" cy="26" r="4" fill="#fff" />
      <circle cx="236" cy="14" r="4" fill="#fff" />
    </svg>
  );
}

export default function OwnerOverviewPage({
  clients = [],
  onNavigate,
  onSelectEmployeeRole,
  onSelectRevenueRange,
}) {
  return (
    <div className="owner-dashboard-layout" style={{ animation: "fadeIn 0.25s ease-out" }}>
      <div className="dashboard-main">
        {/* Revenue & Financial KPIs */}
        <div style={{ marginBottom: 26 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#6366f1' }} />
              Revenue &amp; Payment Overview
            </h3>
            <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Real-time Financial Metrics</span>
          </div>
          <section className="kpi-grid">
            {revenueKpiCards.map((card) => (
              <KpiCard
                key={card.label}
                card={card}
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
              Workforce &amp; Client Operations
            </h3>
            <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Team &amp; Account Metrics</span>
          </div>
          <section className="kpi-grid">
            {workforceKpiCards.map((card) => (
              <KpiCard
                key={card.label}
                card={card}
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
        <section className="activity-panel" style={{ marginBottom: 18 }}>
          <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p className="eyebrow">Milestone pipeline</p>
              <h2>Activity Status Breakdown</h2>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999, background: 'rgba(16, 185, 129, 0.12)', color: '#059669' }}>
              Scheme-Driven
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            {ACTIVITY_STAGES.map((st) => {
              const clientsInStage = clients.filter(c => {
                const clientScheme = c.serviceName || c.scheme || c.serviceType || "PMEGP";
                const tracker = getTrackerState({ scheme: clientScheme, completedSteps: c.completedSteps });
                return tracker.completedStages.includes(st.name);
              }).length;
              const percentOfClients = Math.round((clientsInStage / Math.max(1, clients.length)) * 100);

              return (
                <div key={st.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', borderRadius: 8, background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: st.badgeColor || '#10b981' }} />
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: '#1e293b' }}>{st.name}</span>
                    <span style={{ fontSize: 11, color: '#64748b' }}>({st.percent}%)</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#059669' }}>
                    {clientsInStage} Clients ({percentOfClients}%)
                  </span>
                </div>
              );
            })}
          </div>
        </section>

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
