import React from "react";
import KpiCard from "../../../components/KpiCard";
import Icon from "../../../components/Icon";
import DashboardChart from "./SalesQuotaChart";
import { requestActivities } from "../mockSalesData";

export default function SalesOverview({ kpiCards, onNavigate, dark }) {
  return (
    <section className="dashboard-layout" style={{ animation: "fadeIn 0.25s ease-out" }}>
      <div className="dashboard-main">
        <div className="scheme-grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
          {kpiCards.map((card) => (
            <KpiCard key={card.label} card={card} dark={dark} />
          ))}
        </div>

        <div className="analytics-card" style={{ padding: 24 }}>
          <div className="panel-header" style={{ marginBottom: 18 }}>
            <div>
              <p className="eyebrow" style={{ margin: "0 0 6px" }}>Monthly quota</p>
              <h2 style={{ margin: 0 }}>Monthly quota</h2>
              <p className="dashboard-copy" style={{ margin: "6px 0 0", maxWidth: "100%" }}>
                Quota decided each month vs target acquired.
              </p>
            </div>
          </div>
          <DashboardChart />
        </div>
      </div>

      <aside className="owner-sidebar-widgets">
        <section className="activity-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Recent activity</p>
              <h2>What's happening</h2>
            </div>
          </div>
          <div className="activity-list">
            {requestActivities.map((activity) => (
              <button
                key={activity.title}
                className="activity-row"
                type="button"
                onClick={() => onNavigate && onNavigate("Requests")}
                style={{
                  border: "none",
                  background: "transparent",
                  width: "100%",
                  textAlign: "left",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                <span className="activity-mark" style={{ background: activity.tone }} />
                <div>
                  <strong>{activity.title}</strong>
                  <small>{activity.detail}</small>
                </div>
                <Icon name="arrowUp" size={16} />
              </button>
            ))}
          </div>
        </section>
      </aside>
    </section>
  );
}
