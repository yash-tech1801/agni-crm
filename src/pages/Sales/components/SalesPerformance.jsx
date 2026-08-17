import React from "react";
import DashboardChart from "./SalesQuotaChart";

export default function SalesPerformance() {
  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <div>
          <p className="eyebrow">Performance overview</p>
          <h2>Sales velocity</h2>
        </div>
      </div>
      <div className="revenue-panel" style={{ display: 'grid', gridTemplateColumns: '1.2fr', gap: 18 }}>
        <div className="revenue-summary" style={{ background: '#fff', padding: 20 }}>
          <div style={{ marginBottom: 20 }}>
            <h3>Latest revenue plan</h3>
            <p style={{ margin: 0, color: '#6b6b77' }}>Compare actuals against target over the last 12 months.</p>
          </div>
          <DashboardChart />
        </div>
      </div>
    </section>
  );
}
