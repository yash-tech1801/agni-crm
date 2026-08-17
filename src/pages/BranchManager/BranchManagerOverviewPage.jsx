import React, { useRef, useState, useEffect } from "react";
import KpiCard from "../../components/KpiCard";
import BranchRevenueChart from "../../components/BranchRevenueChart";
import Icon from "../../components/Icon";
import { kpiCards, branchRevenueData } from "./mockBranchManagerData";

export default function BranchManagerOverviewPage({ dark, onNavigate }) {
  const [activityAutoScrollPaused, setActivityAutoScrollPaused] = useState(false);
  const activityScrollTimer = useRef(null);
  const activityListRef = useRef(null);

  useEffect(() => {
    const list = activityListRef.current;
    if (!list) return undefined;

    const intervalId = window.setInterval(() => {
      if (activityAutoScrollPaused || !list) return;
      const maxScroll = list.scrollHeight - list.clientHeight;
      if (maxScroll <= 0) return;
      const nextScrollTop = Math.min(list.scrollTop + 86, maxScroll);
      if (list.scrollTop >= maxScroll - 2) {
        list.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        list.scrollTo({ top: nextScrollTop, behavior: "smooth" });
      }
    }, 2600);

    return () => window.clearInterval(intervalId);
  }, [activityAutoScrollPaused]);

  useEffect(() => {
    return () => {
      if (activityScrollTimer.current) {
        window.clearTimeout(activityScrollTimer.current);
      }
    };
  }, []);

  function handleActivityListScroll() {
    if (activityScrollTimer.current) {
      window.clearTimeout(activityScrollTimer.current);
    }

    setActivityAutoScrollPaused(true);
    activityScrollTimer.current = window.setTimeout(() => {
      setActivityAutoScrollPaused(false);
      activityScrollTimer.current = null;
    }, 3000);
  }

  return (
    <section className="bm-page-section">
      <div className="kpi-activity-row" style={{ display: "flex", gap: 18, alignItems: "stretch", width: "100%" }}>
        <section className="kpi-grid" style={{ flex: "2 1 0%", minWidth: 0 }}>
          {kpiCards.map((card) => (
            <KpiCard
              key={card.label}
              card={card}
              dark={dark}
              onAction={(c) => onNavigate && onNavigate(c.linkTo)}
            />
          ))}
        </section>

        <aside className="sidebar-widgets" style={{ flex: "1 1 0%", minWidth: 300, display: "flex" }}>
          <section className="activity-panel" style={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <div className="panel-header">
              <div>
                <p className="eyebrow">Recent activity</p>
                <h2>What's happening</h2>
              </div>
            </div>
            <div
              ref={activityListRef}
              className="activity-list notifications-scroll"
              onScroll={handleActivityListScroll}
              style={{ overflowY: "auto", paddingRight: 2, flex: 1 }}
            >
              <div className="activity-row" style={{ height: 64 }}>
                <span className="activity-mark" style={{ background: "#9a74e9" }} />
                <div>
                  <strong>New assignment</strong>
                  <small>New client assigned to branch</small>
                </div>
                <Icon name="arrowUp" size={16} />
              </div>
              <div className="activity-row" style={{ height: 64 }}>
                <span className="activity-mark" style={{ background: "#10b981" }} />
                <div>
                  <strong>Milestone Cleared</strong>
                  <small>Doc audit completed for Bright Retail</small>
                </div>
                <Icon name="check" size={16} />
              </div>
              <div className="activity-row" style={{ height: 64 }}>
                <span className="activity-mark" style={{ background: "#4e7cff" }} />
                <div>
                  <strong>Revenue Disbursed</strong>
                  <small>₹68k commercial token settled</small>
                </div>
                <Icon name="revenue" size={16} />
              </div>
            </div>
          </section>
        </aside>
      </div>

      <div className="dashboard-layout" style={{ marginTop: 18, gridTemplateColumns: "1fr" }}>
        <div className="dashboard-main">
          <div className="analytics-card" style={{ padding: 20 }}>
            <div className="panel-header" style={{ marginBottom: 18 }}>
              <div>
                <h2>Branch overview</h2>
                <p>Key metrics and regional branch health.</p>
              </div>
            </div>
            <BranchRevenueChart data={branchRevenueData} />
          </div>
        </div>
      </div>
    </section>
  );
}
