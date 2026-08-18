import React from "react";
import KpiCard from "../../components/KpiCard";
import Icon from "../../components/Icon";
import { companyITServices, itActivities } from "./mockITData";
import "./ITDashboard.css";

export default function ITOverviewPage({
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
      label: "Total IT Clients",
      value: `${totalClients}`,
      trend: "+3 new",
      description: "Direct & sales-pitched",
      accent: "#4e7cff",
      linkTo: "Details",
    },
    {
      label: "East Branch IT Deals",
      value: `${eastBranchClients}`,
      trend: "Top Branch",
      description: "Pitched by sales team",
      accent: "#56c37d",
      linkTo: "Details",
    },
    {
      label: "Active IT Services",
      value: `${companyITServices.length}`,
      trend: "All Operational",
      description: "Company IT offerings",
      accent: "#9a74e9",
      linkTo: "Services",
    },
    {
      label: "IT Pipeline Revenue",
      value: `₹${(totalRevenue / 1000).toFixed(0)}k`,
      trend: "+18%",
      description: "Total deal volume",
      accent: "#f2aa38",
      linkTo: "Details",
    },
    {
      label: "Active Deployments",
      value: `${activeAgreements}`,
      trend: "In Production",
      description: "SLA monitored",
      accent: "#44bfb0",
      linkTo: "Details",
    },
    {
      label: "SLA Uptime Commitment",
      value: "99.99%",
      trend: "Optimal",
      description: "Infrastructure health",
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
        <section className="it-launchpad-grid">
          <div
            className="it-launchpad-card blue"
            onClick={() => onNavigate && onNavigate("Client")}
          >
            <div className="it-launchpad-top">
              <div className="it-launchpad-icon">
                <Icon name="plus" size={18} />
              </div>
              <span className="it-launchpad-action-link">Create →</span>
            </div>
            <h3 className="it-launchpad-title">New IT Client Form</h3>
            <p className="it-launchpad-desc">
              Register new client profiles, configure IT service lines, and calculate GST billing.
            </p>
          </div>

          <div
            className="it-launchpad-card green"
            onClick={() => onNavigate && onNavigate("Details")}
          >
            <div className="it-launchpad-top">
              <div className="it-launchpad-icon">
                <Icon name="overview" size={18} />
              </div>
              <span className="it-launchpad-action-link">View Table →</span>
            </div>
            <h3 className="it-launchpad-title">Branch Client Details</h3>
            <p className="it-launchpad-desc">
              Inspect all created clients and branch-specific sales-pitched IT deals.
            </p>
          </div>

          <div
            className="it-launchpad-card purple"
            onClick={() => onNavigate && onNavigate("Services")}
          >
            <div className="it-launchpad-top">
              <div className="it-launchpad-icon">
                <Icon name="reports" size={18} />
              </div>
              <span className="it-launchpad-action-link">Catalog →</span>
            </div>
            <h3 className="it-launchpad-title">Company IT Services</h3>
            <p className="it-launchpad-desc">
              Explore the full catalog of IT offerings, pen-test audits, and cloud setups.
            </p>
          </div>
        </section>

        {/* Featured IT Services Panel (Strictly 1 Row of 3) */}
        <section className="it-panel-card" style={{ marginTop: 4 }}>
          <div className="it-panel-header">
            <div>
              <span className="it-kicker">Company Service Offerings</span>
              <h3 className="it-panel-header-title">Featured Enterprise IT Services</h3>
            </div>
            <button
              type="button"
              className="it-btn-secondary"
              onClick={() => onNavigate && onNavigate("Services")}
            >
              <span>View All {companyITServices.length} Services →</span>
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {companyITServices.slice(0, 3).map((svc) => (
              <div
                key={svc.id}
                className="it-service-card"
                style={{ height: "100%" }}
              >
                <div className="it-service-card-top" style={{ padding: "12px 14px" }}>
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
                <div className="it-service-card-body" style={{ padding: "14px 16px" }}>
                  <h4 className="it-service-name" style={{ fontSize: 14.5, minHeight: 40, margin: "0 0 6px" }}>
                    {svc.name}
                  </h4>
                  <p className="it-service-description" style={{ fontSize: 12, lineHeight: 1.45, marginBottom: 12 }}>
                    {svc.description.slice(0, 85)}...
                  </p>
                  <div className="it-service-price-box" style={{ marginTop: "auto", padding: "8px 12px", marginBottom: 10 }}>
                    <span style={{ fontSize: 11, color: "#64748b" }}>Rate</span>
                    <strong style={{ fontSize: 12.5, color: svc.tone }}>{svc.estimate}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      type="button"
                      className="it-btn-secondary"
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
        <section className="it-panel-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <div className="it-panel-header" style={{ marginBottom: 16 }}>
            <div>
              <span className="it-kicker">REAL-TIME TELEMETRY</span>
              <h3 className="it-panel-header-title" style={{ fontSize: 17 }}>
                IT Stream Pulse
              </h3>
            </div>
            <span
              className="it-badge"
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
            {itActivities.map((act, index) => (
              <div
                key={index}
                className="it-subcard"
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
                      background: "rgba(78, 124, 255, 0.15)",
                      color: "#4e7cff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 12,
                      flexShrink: 0,
                    }}
                  >
                    IT
                  </div>
                  <div>
                    <strong style={{ fontSize: 13, display: "block", color: "inherit" }}>
                      {act.title}
                    </strong>
                    <span style={{ fontSize: 11.5, color: "#64748b" }}>
                      {act.detail}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 8 }}>
                  <span
                    className="it-badge"
                    style={{
                      background: "rgba(16, 185, 129, 0.15)",
                      color: "#10b981",
                      fontSize: 10.5,
                      padding: "2px 6px",
                    }}
                  >
                    Active
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
