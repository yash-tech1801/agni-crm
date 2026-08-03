import React from "react";
import Icon from "../../components/Icon";

export default function SalesDashboard({ onSignOut }) {
  return (
    <main className="placeholder-dashboard">
      <section className="placeholder-panel">
        <header className="placeholder-header">
          <div>
            <p className="eyebrow">Sales workspace</p>
            <h1>Sales Dashboard Coming Soon</h1>
            <p>A polished sales experience is on the way. Stay tuned for your CRM performance hub.</p>
          </div>
          <button className="primary-button" type="button" onClick={onSignOut}>
            <Icon name="arrow" size={18} /> Sign out
          </button>
        </header>
      </section>
    </main>
  );
}
