import React, { useState } from "react";
import Icon from "../../components/Icon";
import { companyMarketingServices } from "./mockMarketingData";
import "./MarketingDashboard.css";

export default function MarketingServicesCatalogPage({ onPitchService, dark }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);

  const categories = [
    { key: "all", label: "All Marketing Services" },
    { key: "Paid Media & Ads", label: "Performance & Paid Ads" },
    { key: "SEO & Growth", label: "SEO & Organic Growth" },
    { key: "Lead Generation & CRM", label: "B2B Lead Funnels" },
    { key: "Social & Community", label: "Social Media & Community" },
    { key: "Design & Branding", label: "Brand Identity & UI/UX" },
    { key: "Content & PR", label: "Content Marketing & PR" },
  ];

  const filteredServices = companyMarketingServices.filter((srv) => {
    if (selectedCategory !== "all" && srv.category !== selectedCategory) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchesName = (srv.name || "").toLowerCase().includes(q);
      const matchesDesc = (srv.description || "").toLowerCase().includes(q);
      const matchesFeatures = srv.features.some((f) => f.toLowerCase().includes(q));
      if (!matchesName && !matchesDesc && !matchesFeatures) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="mkt-page-container mkt-services-page">
      {/* Header Banner */}
      <div className="mkt-header-banner">
        <div>
          <span className="mkt-kicker">AGNI CRM • ENTERPRISE MARKETING PORTFOLIO</span>
          <h2 className="mkt-title">Company Marketing Services Catalog</h2>
          <p className="mkt-desc">
            Official directory of all Performance Marketing, SEO, B2B Lead Funnels, Social Media, and Brand Identity services delivered by the company.
          </p>
        </div>

        <span
          className="mkt-badge"
          style={{
            background: "rgba(78, 124, 255, 0.15)",
            color: "#4e7cff",
            padding: "8px 16px",
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {companyMarketingServices.length} Active Marketing Service Lines
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
        <div className="mkt-panel-card" style={{ padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "rgba(78, 124, 255, 0.15)",
                color: "#4e7cff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="reports" size={20} />
            </div>
            <div>
              <div style={{ fontSize: 11.5, color: "#64748b", fontWeight: 600 }}>Multi-Channel Coverage</div>
              <strong style={{ fontSize: 15, display: "block" }}>Google, Meta &amp; LinkedIn Ads</strong>
            </div>
          </div>
        </div>

        <div className="mkt-panel-card" style={{ padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "rgba(16, 185, 129, 0.15)",
                color: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="overview" size={20} />
            </div>
            <div>
              <div style={{ fontSize: 11.5, color: "#64748b", fontWeight: 600 }}>Growth Retainers</div>
              <strong style={{ fontSize: 15, display: "block" }}>Dedicated Growth Lead Assigned</strong>
            </div>
          </div>
        </div>

        <div className="mkt-panel-card" style={{ padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "rgba(154, 116, 233, 0.15)",
                color: "#9a74e9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="revenue" size={20} />
            </div>
            <div>
              <div style={{ fontSize: 11.5, color: "#64748b", fontWeight: 600 }}>Transparent Pricing</div>
              <strong style={{ fontSize: 15, display: "block" }}>Standard Rates + 18% GST Compliant</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="mkt-filter-bar">
        {/* Category Tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              className={`mkt-branch-tab ${selectedCategory === cat.key ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: "relative", minWidth: 260 }}>
          <input
            type="text"
            className="mkt-form-input"
            placeholder="Search marketing services or deliverables..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: 34, height: 38 }}
          />
          <div
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#64748b",
              pointerEvents: "none",
            }}
          >
            <Icon name="search" size={15} />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="mkt-services-grid">
        {filteredServices.map((service) => (
          <article
            key={service.id}
            className="mkt-service-card"
          >
            {/* Top Bar: Tag & SLA */}
            <div className="mkt-service-card-top">
              <span
                className="mkt-badge"
                style={{
                  background: `${service.tone}22`,
                  color: service.tone,
                  border: `1px solid ${service.tone}44`,
                }}
              >
                {service.tag}
              </span>
              <span style={{ fontSize: 11.5, color: "#64748b", fontWeight: 600 }}>
                ⏱ {service.turnaround}
              </span>
            </div>

            {/* Body */}
            <div className="mkt-service-card-body">
              <span className="mkt-service-category" style={{ color: service.tone }}>
                {service.category}
              </span>
              <h3 className="mkt-service-name">
                {service.name}
              </h3>

              <p className="mkt-service-description">
                {service.description}
              </p>

              {/* Pricing Box */}
              <div className="mkt-service-price-box">
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
                    <div key={idx} className="mkt-service-feature-row">
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
                  className="mkt-btn-secondary"
                  onClick={() => setSelectedServiceModal(service)}
                >
                  Technical Scope
                </button>

                <button
                  type="button"
                  className="mkt-btn-primary"
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
            className="modal-card mkt-panel-card"
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
                  className="mkt-badge"
                  style={{
                    background: `${selectedServiceModal.tone}22`,
                    color: selectedServiceModal.tone,
                    marginBottom: 6,
                  }}
                >
                  {selectedServiceModal.category}
                </span>
                <h3 style={{ margin: "4px 0 0", fontSize: 18, fontWeight: 700 }}>
                  {selectedServiceModal.name}
                </h3>
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

            {/* Modal Body */}
            <div style={{ padding: 24 }}>
              <div
                className="mkt-subcard"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <div>
                  <span style={{ fontSize: 11.5, color: "#64748b" }}>Standard Base Pricing</span>
                  <div style={{ fontSize: 18, fontWeight: 800, color: selectedServiceModal.tone }}>
                    {selectedServiceModal.estimate}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: 11.5, color: "#64748b" }}>Launch SLA</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{selectedServiceModal.turnaround}</div>
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <h4 style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 700 }}>
                  Strategic Scope &amp; Methodology
                </h4>
                <p style={{ margin: 0, fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
                  {selectedServiceModal.scopeDetails}
                </p>
              </div>

              <div style={{ marginBottom: 20 }}>
                <h4 style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700 }}>
                  Complete List of Deliverables
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {selectedServiceModal.features.map((feat, idx) => (
                    <div key={idx} className="mkt-service-feature-row">
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
                className="mkt-btn-secondary"
                onClick={() => setSelectedServiceModal(null)}
              >
                Close
              </button>

              <button
                type="button"
                className="mkt-btn-primary"
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
