import React, { useState } from "react";
import Icon from "../../components/Icon";
import { companyITServices } from "./mockITData";
import "./ITDashboard.css";

export default function ITServicesCatalogPage({ onPitchService }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);

  const categories = [
    { key: "all", label: "All IT Services" },
    { key: "Infrastructure & Web", label: "Web & CRM Infrastructure" },
    { key: "Security & Compliance", label: "Cybersecurity & Audits" },
    { key: "Cloud & DevOps", label: "Cloud & DevOps" },
    { key: "Networking & Remote Access", label: "Networking & VoIP" },
    { key: "Software Engineering", label: "API & Microservices" },
    { key: "End-User Computing", label: "Device Fleet & MDM" },
  ];

  const filteredServices = companyITServices.filter((srv) => {
    if (selectedCategory !== "all" && srv.category !== selectedCategory) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchesName = (srv.name || "").toLowerCase().includes(q);
      const matchesDesc = (srv.description || "").toLowerCase().includes(q);
      const matchesTag = (srv.tag || "").toLowerCase().includes(q);
      const matchesFeatures = srv.features.some((f) => f.toLowerCase().includes(q));
      if (!matchesName && !matchesDesc && !matchesTag && !matchesFeatures) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="it-page-container it-services-page">
      {/* Header Banner */}
      <div className="it-header-banner">
        <div>
          <span className="it-kicker">AGNI CRM • ENTERPRISE IT PORTFOLIO</span>
          <h2 className="it-title">Company IT Services Catalog</h2>
          <p className="it-desc">
            Official directory of all IT services, cybersecurity audits, cloud infrastructure, and SLA solutions delivered by the company.
          </p>
        </div>

        <span
          className="it-badge"
          style={{
            background: "rgba(78, 124, 255, 0.15)",
            color: "#4e7cff",
            padding: "8px 16px",
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {companyITServices.length} Active IT Service Lines
        </span>
      </div>

      {/* Highlights Strip */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}
      >
        <div className="it-panel-card" style={{ padding: "18px 20px" }}>
          <div style={{ fontSize: 12, color: "#4e7cff", fontWeight: 700 }}>ENTERPRISE SLA GUARANTEE</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>
            99.99% Uptime Commitment
          </div>
          <p className="it-desc" style={{ marginTop: 4 }}>
            24/7 telemetry monitoring with dedicated DevOps and Tier-3 technical escalation.
          </p>
        </div>

        <div className="it-panel-card" style={{ padding: "18px 20px" }}>
          <div style={{ fontSize: 12, color: "#9a74e9", fontWeight: 700 }}>COMPLIANCE &amp; SECURITY</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>
            ISO 27001 &amp; SOC-2 Ready
          </div>
          <p className="it-desc" style={{ marginTop: 4 }}>
            OWASP pen-testing, encrypted database vaults, zero-trust VPN mesh, and multi-factor auth.
          </p>
        </div>

        <div className="it-panel-card" style={{ padding: "18px 20px" }}>
          <div style={{ fontSize: 12, color: "#10b981", fontWeight: 700 }}>RAPID ONBOARDING</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>
            Same-Day to 48h Turnaround
          </div>
          <p className="it-desc" style={{ marginTop: 4 }}>
            Pre-configured Terraform blueprints, Docker orchestration, and instant MDM enrollment.
          </p>
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="it-filter-bar">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                className={`it-branch-tab ${isSelected ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div style={{ position: "relative", minWidth: 260 }}>
          <input
            type="text"
            className="it-form-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search IT service by keyword..."
            style={{ paddingRight: 30 }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: 8,
                top: 9,
                background: "transparent",
                border: "none",
                color: "#94a3b8",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Services Grid Layout */}
      <div className="it-services-grid">
        {filteredServices.map((service) => (
          <article key={service.id} className="it-service-card">
            {/* Top Banner with Service Tag & Turnaround */}
            <div className="it-service-card-top">
              <span
                className="it-badge"
                style={{
                  background: `${service.tone}22`,
                  color: service.tone,
                  border: `1px solid ${service.tone}44`,
                }}
              >
                {service.tag}
              </span>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: "#64748b" }}>
                ⏱ {service.turnaround}
              </span>
            </div>

            {/* Content Body */}
            <div className="it-service-card-body">
              <span className="it-service-category" style={{ color: service.tone }}>
                {service.category}
              </span>
              <h3 className="it-service-name">
                {service.name}
              </h3>

              <p className="it-service-description">
                {service.description}
              </p>

              {/* Pricing Box */}
              <div className="it-service-price-box">
                <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Standard Estimate</span>
                <strong style={{ fontSize: 15, color: service.tone, fontWeight: 800 }}>
                  {service.estimate}
                </strong>
              </div>

              {/* Feature Bullets */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, marginBottom: 8 }}>
                  Key Inclusions &amp; Deliverables:
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {service.features.slice(0, 4).map((feat, idx) => (
                    <div key={idx} className="it-service-feature-row">
                      <span style={{ color: "#10b981", fontWeight: 700 }}>✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                  {service.features.length > 4 && (
                    <span style={{ fontSize: 11, color: "#4e7cff", fontWeight: 600, marginTop: 2 }}>
                      + {service.features.length - 4} more deliverables
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: "auto" }}>
                <button
                  type="button"
                  className="it-btn-secondary"
                  onClick={() => setSelectedServiceModal(service)}
                >
                  Technical Scope
                </button>

                <button
                  type="button"
                  className="it-btn-primary"
                  onClick={() => onPitchService && onPitchService(service)}
                >
                  Create Client →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Service Scope Modal */}
      {selectedServiceModal && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(5px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 20,
          }}
          onClick={() => setSelectedServiceModal(null)}
        >
          <div
            className="modal-card it-panel-card"
            style={{
              width: "100%",
              maxWidth: 640,
              maxHeight: "90vh",
              overflowY: "auto",
              padding: 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <span
                  className="it-badge"
                  style={{
                    background: `${selectedServiceModal.tone}22`,
                    color: selectedServiceModal.tone,
                    border: `1px solid ${selectedServiceModal.tone}44`,
                  }}
                >
                  {selectedServiceModal.category}
                </span>
                <h3 style={{ margin: "6px 0 2px", fontSize: 19, fontWeight: 700 }}>
                  {selectedServiceModal.name}
                </h3>
                <span style={{ fontSize: 12, color: "#64748b" }}>
                  Turnaround: <strong>{selectedServiceModal.turnaround}</strong> • Standard Rate:{" "}
                  <strong>{selectedServiceModal.estimate}</strong>
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedServiceModal(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: 6,
                  color: "#64748b",
                }}
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: 24 }}>
              <div style={{ marginBottom: 18 }}>
                <h4 style={{ margin: "0 0 6px", fontSize: 13, fontWeight: 700 }}>
                  Service Architecture &amp; Overview
                </h4>
                <p className="it-desc" style={{ lineHeight: 1.6 }}>
                  {selectedServiceModal.description}
                </p>
              </div>

              <div className="it-subcard" style={{ marginBottom: 18 }}>
                <h4 style={{ margin: "0 0 6px", fontSize: 13, fontWeight: 700 }}>
                  Detailed Scope &amp; Implementation Protocol
                </h4>
                <p className="it-desc" style={{ lineHeight: 1.5 }}>
                  {selectedServiceModal.scopeDetails}
                </p>
              </div>

              <div style={{ marginBottom: 20 }}>
                <h4 style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700 }}>
                  Complete List of Deliverables
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {selectedServiceModal.features.map((feat, idx) => (
                    <div key={idx} className="it-service-feature-row">
                      <span style={{ color: "#10b981", fontWeight: 700 }}>✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: "16px 24px",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                type="button"
                className="it-btn-secondary"
                onClick={() => setSelectedServiceModal(null)}
              >
                Close
              </button>

              <button
                type="button"
                className="it-btn-primary"
                onClick={() => {
                  const targetSvc = selectedServiceModal;
                  setSelectedServiceModal(null);
                  if (onPitchService) onPitchService(targetSvc);
                }}
              >
                Create Client with this Service →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
