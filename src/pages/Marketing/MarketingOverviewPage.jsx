import React from "react";
import KpiCard from "../../components/KpiCard";
import Icon from "../../components/Icon";
import { companyMarketingServices, marketingActivities } from "./mockMarketingData";
import "./MarketingDashboard.css";

export default function MarketingOverviewPage({
  onNavigate,
  onPitchService,
  dark,
  createdClients = [],
  salesPitchedClients = [],
}) {
  const allClients = [...createdClients, ...salesPitchedClients];
  const totalClients = allClients.length;
  const eastBranchClients = allClients.filter((c) => c.branch === "East").length;
  const totalRevenue = allClients.reduce(
    (acc, c) => acc + Number(c.totalPayment || c.amount || 0),
    0
  );
  const activeAgreements = allClients.filter((c) => c.stage === "Active").length;

  const kpiCards = [
    {
      label: "Total Marketing Clients",
      value: `${totalClients}`,
      trend: "+3 new",
      description: "Direct & sales-pitched",
      accent: "#4e7cff",
      linkTo: "Details",
    },
    {
      label: "East Branch Deals",
      value: `${eastBranchClients}`,
      trend: "Top Branch",
      description: "Pitched by sales team",
      accent: "#56c37d",
      linkTo: "Details",
    },
    {
      label: "Active Service Lines",
      value: `${companyMarketingServices.length}`,
      trend: "All Operational",
      description: "Company offerings",
      accent: "#9a74e9",
      linkTo: "Services",
    },
    {
      label: "Pipeline Revenue",
      value: `₹${(totalRevenue / 1000).toFixed(0)}k`,
      trend: "+24%",
      description: "Total deal volume",
      accent: "#f2aa38",
      linkTo: "Details",
    },
    {
      label: "Active Retainers",
      value: `${activeAgreements}`,
      trend: "Live Campaigns",
      description: "Active client growth",
      accent: "#44bfb0",
      linkTo: "Details",
    },
    {
      label: "Campaign ROI Quality",
      value: "99.4%",
      trend: "Optimal",
      description: "Client growth performance",
      accent: "#f2938f",
      linkTo: "Services",
    },
  ];

  return (
    <section className="dashboard-layout" style={{ animation: "fadeIn 0.25s ease-out" }}>
      {/* Main Column */}
      <div className="dashboard-main">
        {/* KPI Cards Grid */}
        <section className="kpi-grid">
          {kpiCards.map((card) => (
            <KpiCard
              key={card.label}
              card={card}
              onAction={(c) => c.linkTo && onNavigate && onNavigate(c.linkTo)}
              dark={dark}
            />
          ))}
        </section>

        {/* Quick Launchpad Action Cards */}
        <section className="mkt-launchpad-grid">
          <div
            className="mkt-launchpad-card blue"
            onClick={() => onNavigate && onNavigate("Client")}
          >
            <div className="mkt-launchpad-top">
              <div className="mkt-launchpad-icon">
                <Icon name="plus" size={18} />
              </div>
              <span className="mkt-launchpad-action-link">Create →</span>
            </div>
            <h3 className="mkt-launchpad-title">New Client Onboarding</h3>
            <p className="mkt-launchpad-desc">
              Register corporate marketing clients, assign service lines, and calculate 18% GST invoices.
            </p>
          </div>

          <div
            className="mkt-launchpad-card green"
            onClick={() => onNavigate && onNavigate("Details")}
          >
            <div className="mkt-launchpad-top">
              <div className="mkt-launchpad-icon">
                <Icon name="clients" size={18} />
              </div>
              <span className="mkt-launchpad-action-link">Register →</span>
            </div>
            <h3 className="mkt-launchpad-title">Client &amp; Service Register</h3>
            <p className="mkt-launchpad-desc">
              Review all marketing clients and branch deals pitched by sales reps where service requested is Marketing.
            </p>
          </div>

          <div
            className="mkt-launchpad-card purple"
            onClick={() => onNavigate && onNavigate("Services")}
          >
            <div className="mkt-launchpad-top">
              <div className="mkt-launchpad-icon">
                <Icon name="reports" size={18} />
              </div>
              <span className="mkt-launchpad-action-link">Catalog →</span>
            </div>
            <h3 className="mkt-launchpad-title">Company Marketing Services</h3>
            <p className="mkt-launchpad-desc">
              Explore the full catalog of Paid Media, SEO, Social Media, B2B Funnels, and Brand Design solutions.
            </p>
          </div>
        </section>

        {/* Featured Marketing Services Panel (Strictly 1 Row of 3) */}
        <section className="mkt-panel-card" style={{ marginTop: 4 }}>
          <div className="mkt-panel-header">
            <div>
              <span className="mkt-kicker">Company Service Offerings</span>
              <h3 className="mkt-panel-header-title">Featured Enterprise Marketing Services</h3>
            </div>
            <button
              type="button"
              className="mkt-btn-secondary"
              onClick={() => onNavigate && onNavigate("Services")}
            >
              <span>View All {companyMarketingServices.length} Services →</span>
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {companyMarketingServices.slice(0, 3).map((svc) => (
              <div
                key={svc.id}
                className="mkt-service-card"
                style={{ height: "100%" }}
              >
                <div className="mkt-service-card-top" style={{ padding: "12px 14px" }}>
                  <span
                    className="mkt-badge"
                    style={{
                      background: `${svc.tone}22`,
                      color: svc.tone,
                      border: `1px solid ${svc.tone}44`,
                      fontSize: 10.5,
                      padding: "2px 8px",
                    }}
                  >
                    {svc.tag}
                  </span>
                  <span style={{ fontSize: 10.5, color: "#64748b", fontWeight: 600 }}>{svc.turnaround}</span>
                </div>
                <div className="mkt-service-card-body" style={{ padding: "14px 16px" }}>
                  <h4 className="mkt-service-name" style={{ fontSize: 14.5, minHeight: 40, margin: "0 0 6px" }}>
                    {svc.name}
                  </h4>
                  <p className="mkt-service-description" style={{ fontSize: 12, lineHeight: 1.45, marginBottom: 12 }}>
                    {svc.description.slice(0, 85)}...
                  </p>
                  <div className="mkt-service-price-box" style={{ marginTop: "auto", padding: "8px 12px", marginBottom: 10 }}>
                    <span style={{ fontSize: 11, color: "#64748b" }}>Rate</span>
                    <strong style={{ fontSize: 12.5, color: svc.tone }}>{svc.estimate}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      type="button"
                      className="mkt-btn-secondary"
                      onClick={() => {
                        if (onPitchService) {
                          onPitchService(svc);
                        } else if (onNavigate) {
                          onNavigate("Client");
                        }
                      }}
                      style={{ padding: "5px 10px", fontSize: 11.5 }}
                    >
                      Pitch Client →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right Column: REAL-TIME TELEMETRY filling the space next to KPI cards */}
      <aside className="owner-sidebar-widgets">
        <section className="mkt-panel-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <div className="mkt-panel-header" style={{ marginBottom: 16 }}>
            <div>
              <span className="mkt-kicker">REAL-TIME TELEMETRY</span>
              <h3 className="mkt-panel-header-title" style={{ fontSize: 17 }}>
                Recent Marketing Inquiries
              </h3>
            </div>
            <span
              className="mkt-badge"
              style={{
                background: "rgba(16, 185, 129, 0.15)",
                color: "#10b981",
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              ● Live
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, flexGrow: 1 }}>
            {marketingActivities.map((act) => (
              <div
                key={act.id}
                className="mkt-subcard"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 14px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background:
                        act.type === "onboarding"
                          ? "rgba(16, 185, 129, 0.15)"
                          : act.type === "pitch"
                          ? "rgba(78, 124, 255, 0.15)"
                          : "rgba(154, 116, 233, 0.15)",
                      color:
                        act.type === "onboarding"
                          ? "#10b981"
                          : act.type === "pitch"
                          ? "#4e7cff"
                          : "#9a74e9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 12,
                      flexShrink: 0,
                    }}
                  >
                    {act.branch}
                  </div>
                  <div>
                    <strong style={{ fontSize: 13, display: "block", color: "inherit" }}>
                      {act.action}: {act.target}
                    </strong>
                    <span style={{ fontSize: 11.5, color: "#64748b" }}>
                      Handled by {act.user} • {act.branch} Branch
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 8 }}>
                  <span
                    className="mkt-badge"
                    style={{
                      background: "rgba(78, 124, 255, 0.15)",
                      color: "#4e7cff",
                      fontSize: 10.5,
                      padding: "2px 6px",
                    }}
                  >
                    {act.status}
                  </span>
                  <div style={{ fontSize: 10.5, color: "#64748b", marginTop: 2 }}>{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </section>
  );
}
