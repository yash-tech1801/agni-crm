import React from "react";
import Icon from "../../components/Icon";

export default function ManagerDashboard({ onSignOut }) {
  return (
    <main className="placeholder-dashboard">
      <section className="placeholder-panel">
        <header className="placeholder-header">
          <div>
            <p className="eyebrow">Manager workspace</p>
            <h1>Manager Dashboard Coming Soon</h1>
            <p>We are building a dedicated manager experience for your CRM workflow.</p>
          </div>
          <button className="primary-button" type="button" onClick={onSignOut}>
            <Icon name="arrow" size={18} /> Sign out
          </button>
        </header>
      </section>
    </main>
  );
}
