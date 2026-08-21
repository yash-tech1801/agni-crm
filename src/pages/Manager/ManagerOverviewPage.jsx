import React, { useMemo } from "react";
import KpiCard from "../../components/KpiCard";
import Icon from "../../components/Icon";
import { RevenueSparkline } from "../../components/charts";
import { kpiCards, activities } from "./mockManagerData";
import { getDailyPayment, getWeeklyPayment, getMonthlyPayment, formatCurrency } from "../../utils/paymentHelpers";

export default function ManagerOverviewPage({ onNavigate, dark }) {
  const currentManagerId = 4;

  const paymentMetrics = useMemo(() => ({
    daily: formatCurrency(getDailyPayment(currentManagerId)),
    weekly: formatCurrency(getWeeklyPayment(currentManagerId)),
    monthly: formatCurrency(getMonthlyPayment(currentManagerId)),
  }), [currentManagerId]);

  const dashboardKpiCards = useMemo(() => [
    ...kpiCards,
    {
      label: "Daily Payment",
      value: paymentMetrics.daily,
      trend: "Today",
      description: "Today's collection",
      accent: "#f2938f",
      icon: "calendarToday",
    },
    {
      label: "Weekly Payment",
      value: paymentMetrics.weekly,
      trend: "This week",
      description: "Sales team total",
      accent: "#6f94f8",
      icon: "calendarWeek",
    },
    {
      label: "Monthly Payment",
      value: paymentMetrics.monthly,
      trend: "This month",
      description: "Manager collection",
      accent: "#56c37d",
      icon: "wallet",
    },
  ], [paymentMetrics]);

  return (
    <section className="dashboard-layout" style={{ animation: "fadeIn 0.25s ease-out" }}>
      <div className="dashboard-main">
        <section className="kpi-grid">
          {dashboardKpiCards.map((card) => (
            <KpiCard
              key={card.label}
              card={card}
              onAction={(c) => c.linkTo && onNavigate && onNavigate(c.linkTo)}
              dark={dark}
            />
          ))}
        </section>

        <section className="revenue-panel">
          <div className="revenue-summary">
            <div>
              <p className="eyebrow">Performance overview</p>
              <h2>₹184.6k</h2>
              <p className="revenue-copy">Pipeline value across active opportunities this month.</p>
            </div>

            <div className="revenue-breakdown">
              <div>
                <span>Won revenue</span>
                <strong>₹84.2k</strong>
              </div>
              <div>
                <span>Pending</span>
                <strong>₹52.3k</strong>
              </div>
              <div>
                <span>Forecast</span>
                <strong>+18.9%</strong>
              </div>
            </div>
          </div>

          <div className="revenue-chart-panel">
            <div className="revenue-chip">
              <Icon name="arrowUp" size={14} />
              <span>Pipeline trend</span>
            </div>
            <RevenueSparkline
              d="M12 48 C42 36 70 30 98 22 C126 14 154 18 182 12 C210 6 228 12 236 20"
              dots={[
                { cx: 12, cy: 48 },
                { cx: 98, cy: 22 },
                { cx: 236, cy: 20 },
              ]}
              strokeColor="rgba(255,255,255,0.9)"
            />
          </div>
        </section>
      </div>

      <aside className="owner-sidebar-widgets">
        <section className="activity-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Activity</p>
              <h2>What’s happening</h2>
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
    </section>
  );
}
