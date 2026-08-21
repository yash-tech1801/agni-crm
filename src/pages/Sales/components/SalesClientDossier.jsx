import React from "react";
import Icon from "../../../components/Icon";
import ActivityTracker from "../../../components/ActivityTracker";
import EligibleSchemes from "../EligibleSchemes";
import { mockEligibleSchemes } from "../mockEligibleSchemes";
import { getTrackerState, getProcessTypeLabel } from "../../../utils/schemeTracker";

export default function SalesClientDossier({
  selectedClient,
  onBack,
  salesPersonName,
  onSchemeSave,
}) {
  if (!selectedClient) return null;

  const tracker = getTrackerState(selectedClient);
  const schemeName = selectedClient.scheme || tracker.schemeName;
  const processLabel = tracker.processTypeLabel || getProcessTypeLabel(tracker.processType);

  return (
    <div className="client-details-dossier">
      {/* Navigation Bar */}
      <div className="dossier-nav-bar">
        <button
          type="button"
          className="dossier-back-btn"
          onClick={onBack}
        >
          <span>←</span>
          <span>Back to Client Directory</span>
        </button>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            type="button"
            className="sales-btn-secondary"
            onClick={onBack}
          >
            Close Dossier
          </button>
        </div>
      </div>

      {/* Hero Client Banner */}
      <div className="client-hero-banner">
        <div className="client-hero-left">
          <div className="client-hero-avatar">
            {selectedClient.name ? selectedClient.name.slice(0, 2).toUpperCase() : "CL"}
          </div>
          <div className="client-hero-title">
            <h2>{selectedClient.name}</h2>
            <p className="client-hero-sub">{selectedClient.company}</p>
            <div className="client-hero-meta-pills">
              <span
                className={`hero-pill ${
                  selectedClient.stage === "Active"
                    ? "active"
                    : selectedClient.stage === "Onboarding"
                    ? "onboarding"
                    : selectedClient.stage === "Renewal"
                    ? "renewal"
                    : "prospect"
                }`}
              >
                ● {selectedClient.stage || "Active"}
              </span>
              <span className="hero-pill">
                Client ID: #{selectedClient.id}
              </span>
              <span className="hero-pill">
                Owner: {selectedClient.owner || salesPersonName}
              </span>
              <span className="hero-pill" style={{ background: "rgba(140, 95, 248, 0.15)", color: "#8c5ff8", fontWeight: 700 }}>
                Scheme: {schemeName}
              </span>
              <span className="hero-pill" style={{ background: "rgba(78, 124, 255, 0.15)", color: "#4e7cff", fontWeight: 700 }}>
                Process: {processLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="client-hero-right">
          <span className="hero-balance-label">Total Commercial Value</span>
          <span className="hero-balance-val">
            ₹{(parseFloat(selectedClient.totalPayment) || 0).toLocaleString("en-IN")}
          </span>
          <span style={{ fontSize: 12, color: '#beb5d6' }}>
            {parseFloat(selectedClient.paymentPending) > 0
              ? `₹${(parseFloat(selectedClient.paymentPending) || 0).toLocaleString("en-IN")} pending collection`
              : "✓ Fully Paid"}
          </span>
        </div>
      </div>

      {/* Activity Progress Stepper Section */}
      <div className="dossier-finance-card" style={{ marginBottom: 20 }}>
        <div className="dossier-card-title">
          <div>
            <span>Activity Milestone Tracker</span>
            <small style={{ color: "#7a748e", display: "block", fontSize: 12, marginTop: 2 }}>
              Scheme: <strong>{schemeName}</strong> ({processLabel} — {tracker.totalStages} Stages)
            </small>
          </div>
          <span className="scheme-tag" style={{ fontSize: 13, padding: '6px 12px' }}>
            <Icon name="document" size={14} />
            Stage: {tracker.currentStage}
          </span>
        </div>

        <div style={{ marginTop: 14 }}>
          <ActivityTracker
            scheme={schemeName}
            completedSteps={tracker.completedStages}
            progress={tracker.progressPercent}
            interactive={false}
          />
        </div>
      </div>

      {/* Comprehensive Financial Breakdown */}
      <div className="dossier-finance-card">
        <div className="dossier-card-title">
          <span>Financial & Commercial Breakdown</span>
          <span className="scheme-tag" style={{ fontSize: 13, padding: '6px 12px' }}>
            <Icon name="document" size={14} />
            {schemeName}
          </span>
        </div>

        <div className="finance-metrics-grid">
          <div className="finance-metric-box">
            <span className="finance-metric-label">Base Contract Value</span>
            <span className="finance-metric-num">₹{(parseFloat(selectedClient.amount) || 0).toLocaleString("en-IN")}</span>
            <span className="finance-metric-sub">Base service rate</span>
          </div>

          <div className="finance-metric-box">
            <span className="finance-metric-label">Payment Mode</span>
            <span className="finance-metric-num" style={{ fontSize: 17, color: '#6d3bf5' }}>
              {selectedClient.paymentMode || "Online"}
            </span>
            <span className="finance-metric-sub">
              {selectedClient.paymentMode === "Online" ? "18% GST Applicable" : "Exempt / Direct"}
            </span>
          </div>

          <div className="finance-metric-box">
            <span className="finance-metric-label">GST (18%)</span>
            <span className="finance-metric-num">₹{(parseFloat(selectedClient.gstAmount) || 0).toLocaleString("en-IN")}</span>
            <span className="finance-metric-sub">Tax component</span>
          </div>

          <div className="finance-metric-box highlight">
            <span className="finance-metric-label">Total Commercial Value</span>
            <span className="finance-metric-num" style={{ color: '#6d3bf5' }}>
              ₹{(parseFloat(selectedClient.totalPayment) || 0).toLocaleString("en-IN")}
            </span>
            <span className="finance-metric-sub">Base + GST Total</span>
          </div>
        </div>

        {/* Settlement Progress */}
        <div className="settlement-bar-wrap">
          <div className="settlement-header">
            <span>
              Payment Collected: <strong>₹{(parseFloat(selectedClient.paymentReceived) || 0).toLocaleString("en-IN")}</strong>
            </span>
            <span style={{ color: parseFloat(selectedClient.paymentPending) > 0 ? '#e11d48' : '#059669' }}>
              Pending Balance: <strong>₹{(parseFloat(selectedClient.paymentPending) || 0).toLocaleString("en-IN")}</strong>
            </span>
          </div>
          <div className="settlement-bar-track">
            <div
              className="settlement-bar-fill"
              style={{
                width: `${
                  parseFloat(selectedClient.totalPayment) > 0
                    ? Math.min(
                        Math.round(
                          ((parseFloat(selectedClient.paymentReceived) || 0) /
                            parseFloat(selectedClient.totalPayment)) *
                            100
                        ),
                        100
                      )
                    : 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Two-Column Grid: Contact Profile & Compliance Documents */}
      <div className="dossier-columns-grid">
        {/* Left Card: Contact & Corporate Profile */}
        <div className="dossier-info-card">
          <div className="dossier-card-title">
            <span>Contact & Company Information</span>
            <Icon name="user" size={18} />
          </div>

          <div className="dossier-info-rows">
            <div className="dossier-field-item">
              <label>Client Name</label>
              <strong>{selectedClient.name}</strong>
            </div>

            <div className="dossier-field-item">
              <label>Contact Person</label>
              <strong>{selectedClient.contactPerson || selectedClient.name}</strong>
            </div>

            <div className="dossier-field-item">
              <label>Email Address</label>
              <strong>
                <a href={`mailto:${selectedClient.email}`} className="dossier-link">
                  {selectedClient.email}
                </a>
              </strong>
            </div>

            <div className="dossier-field-item">
              <label>Phone Number</label>
              <strong>
                <a href={`tel:${selectedClient.phone}`} className="dossier-link">
                  {selectedClient.phone}
                </a>
              </strong>
            </div>

            <div className="dossier-field-item full-width">
              <label>Registered Company</label>
              <strong>{selectedClient.company}</strong>
            </div>

            <div className="dossier-field-item full-width">
              <label>Registered Address</label>
              <strong>{selectedClient.address || "101 Commercial Hub, Metro City"}</strong>
            </div>
          </div>
        </div>

        {/* Right Card: Documentation & Compliance Details */}
        <div className="dossier-info-card">
          <div className="dossier-card-title">
            <span>Compliance & Verified Documents</span>
            <Icon name="roles" size={18} />
          </div>

          <div className="dossier-docs-list">
            {(selectedClient.documentDetails || []).map((doc) => (
              <div key={doc.label} className="dossier-doc-tile">
                <div className="dossier-doc-tile-top">
                  <strong>{doc.label}</strong>
                  <span className={`doc-status-badge ${doc.available === 'Yes' ? 'yes' : 'pending'}`}>
                    {doc.available === 'Yes' ? '✓ Verified' : 'Pending'}
                  </span>
                </div>
                <span className="dossier-doc-val">{doc.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Eligible Schemes Section */}
      <EligibleSchemes
        initialSchemes={mockEligibleSchemes}
        onSave={onSchemeSave}
      />

      {/* Internal Notes Card */}
      <div className="dossier-info-card">
        <div className="dossier-card-title">
          <span>Account Notes & Remarks</span>
          <Icon name="invoice" size={18} />
        </div>
        <div className="dossier-notes-box">
          <p style={{ margin: 0 }}>
            {selectedClient.notes || "Client documents are reviewed and the recommended schemes will be shared after the salesperson confirms visibility."}
          </p>
        </div>
      </div>
    </div>
  );
}
