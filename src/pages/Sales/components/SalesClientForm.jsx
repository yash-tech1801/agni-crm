import React from "react";
import Icon from "../../../components/Icon";
import { serviceTypeSchemes } from "../mockSalesData";

export default function SalesClientForm({
  newClient,
  onNewClientChange,
  onAddClient,
  onClearForm,
  onGoToDetails,
  dark,
}) {
  const baseAmt = parseFloat(newClient.amount) || 0;
  const isOnline = newClient.paymentMode === "Online";

  const currentServiceType = newClient.serviceType || "Certificate";
  const availableSchemes = serviceTypeSchemes[currentServiceType] || serviceTypeSchemes.Certificate || [];

  return (
    <section className="sales-clients-form-view">
      {/* Top Title Banner */}
      <div className="sales-header-banner">
        <div>
          <p className="sales-header-eyebrow">Client Onboarding</p>
          <h1 className="sales-header-title">Register New Client</h1>
          <p className="sales-header-subtitle">
            Enter client identity, service type, scheme tier, and commercial terms. Saved profiles appear in <strong>Details</strong>.
          </p>
        </div>

        <button
          type="button"
          className="sales-btn-secondary"
          onClick={onGoToDetails}
        >
          <Icon name="eye" size={15} />
          <span>View Directory</span>
        </button>
      </div>

      {/* Form Container */}
      <div className="analytics-card sales-form-card">
        <form onSubmit={onAddClient} className="sales-form-wrapper">
          {/* Section 1: Business Identity */}
          <div className="sales-form-section">
            <div className="sales-section-title">
              <div className="sales-section-icon">
                <Icon name="building" size={15} />
              </div>
              <span>1. Business & Contact Information</span>
            </div>

            <div className="sales-form-grid-2">
              <label className="field-label">
                <span>Client / Trading Name <span style={{ color: "#f43f5e" }}>*</span></span>
                <input
                  type="text"
                  name="name"
                  value={newClient.name}
                  onChange={onNewClientChange}
                  placeholder="e.g. Apex Retail"
                  required
                />
              </label>
              <label className="field-label">
                <span>Contact Person Name <span style={{ color: "#f43f5e" }}>*</span></span>
                <input
                  type="text"
                  name="contactPerson"
                  value={newClient.contactPerson}
                  onChange={onNewClientChange}
                  placeholder="e.g. Rahul Sharma"
                  required
                />
              </label>
            </div>

            <div className="sales-form-grid-2" style={{ marginTop: 14 }}>
              <label className="field-label">
                <span>Registered Company Name <span style={{ color: "#f43f5e" }}>*</span></span>
                <input
                  type="text"
                  name="company"
                  value={newClient.company}
                  onChange={onNewClientChange}
                  placeholder="e.g. Apex Retail Pvt. Ltd."
                  required
                />
              </label>
              <label className="field-label">
                <span>Registered Office / Location</span>
                <input
                  type="text"
                  name="address"
                  value={newClient.address}
                  onChange={onNewClientChange}
                  placeholder="e.g. 101 MG Road, Mumbai"
                />
              </label>
            </div>

            <div className="sales-form-grid-2" style={{ marginTop: 14 }}>
              <label className="field-label">
                <span>Official Email Address <span style={{ color: "#f43f5e" }}>*</span></span>
                <input
                  type="email"
                  name="email"
                  value={newClient.email}
                  onChange={onNewClientChange}
                  placeholder="client@apexretail.com"
                  required
                />
              </label>
              <label className="field-label">
                <span>Phone Number <span style={{ color: "#f43f5e" }}>*</span></span>
                <input
                  type="tel"
                  name="phone"
                  value={newClient.phone}
                  onChange={onNewClientChange}
                  placeholder="+91 98765 43210"
                  required
                />
              </label>
            </div>
          </div>

          {/* Section 2: Engagement & Scheme */}
          <div className="sales-form-section">
            <div className="sales-section-title">
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: "rgba(140, 95, 248, 0.15)",
                  color: "#8c5ff8",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Icon name="document" size={15} />
              </div>
              <span>2. Scheme & Engagement Tier</span>
            </div>

            <div className="sales-form-grid-2">
              <label className="field-label">
                <span>Service Type <span style={{ color: "#f43f5e" }}>*</span></span>
                <select
                  name="serviceType"
                  value={currentServiceType}
                  onChange={onNewClientChange}
                  required
                >
                  <option value="Certificate">Certificate</option>
                  <option value="Consultancy Services">Consultancy Services</option>
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </label>
              <label className="field-label">
                <span>Selected Scheme ({currentServiceType}) <span style={{ color: "#f43f5e" }}>*</span></span>
                <select
                  name="scheme"
                  value={newClient.scheme || availableSchemes[0]}
                  onChange={onNewClientChange}
                  required
                >
                  {availableSchemes.map((scheme) => (
                    <option key={scheme} value={scheme}>{scheme}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {/* Section 3: Commercials & Billing */}
          <div className="sales-form-section">
            <div className="sales-section-title">
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: "rgba(140, 95, 248, 0.15)",
                  color: "#8c5ff8",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Icon name="currency" size={15} />
              </div>
              <span>3. Commercials & Payment Setup</span>
            </div>

            <div className="sales-form-grid-3">
              <label className="field-label">
                <span>Base Contract Amount (₹) <span style={{ color: "#f43f5e" }}>*</span></span>
                <input
                  type="number"
                  name="amount"
                  value={newClient.amount}
                  onChange={onNewClientChange}
                  placeholder="50000"
                  min="0"
                  required
                />
              </label>
              <label className="field-label">
                <span>Mode of Payment</span>
                <select name="paymentMode" value={newClient.paymentMode} onChange={onNewClientChange}>
                  <option value="Online">Online (18% GST Added)</option>
                  <option value="Offline">Offline (Direct/Exempt)</option>
                </select>
              </label>
              <label className="field-label">
                <span>Payment Received (₹)</span>
                <input
                  type="number"
                  name="paymentReceived"
                  value={newClient.paymentReceived}
                  onChange={onNewClientChange}
                  placeholder="0"
                  min="0"
                />
              </label>
            </div>

            {/* Live Calculation Summary Strip */}
            <div
              style={{
                marginTop: 16,
                padding: "16px 20px",
                borderRadius: 14,
                background: "linear-gradient(135deg, rgba(140, 95, 248, 0.08) 0%, rgba(109, 59, 245, 0.04) 100%)",
                border: "1px solid rgba(140, 95, 248, 0.2)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ fontSize: 11.5, color: "#7a748e", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>
                  Base Amount
                </span>
                <strong style={{ fontSize: 18, fontWeight: 700 }}>
                  ₹{baseAmt.toLocaleString("en-IN")}
                </strong>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ fontSize: 11.5, color: "#7a748e", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>
                  GST ({isOnline ? "18%" : "0%"})
                </span>
                <strong style={{ fontSize: 18, fontWeight: 700, color: isOnline ? "#8c5ff8" : "#7a748e" }}>
                  ₹{(newClient.gstAmount || 0).toLocaleString("en-IN")}
                </strong>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ fontSize: 11.5, color: "#7a748e", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>
                  Total Payable
                </span>
                <strong style={{ fontSize: 18, fontWeight: 700, color: "#10b981" }}>
                  ₹{(newClient.totalPayment || 0).toLocaleString("en-IN")}
                </strong>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ fontSize: 11.5, color: "#7a748e", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>
                  Pending Balance
                </span>
                <strong
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: (newClient.paymentPending || 0) > 0 ? "#f43f5e" : "#10b981",
                  }}
                >
                  ₹{(newClient.paymentPending || 0).toLocaleString("en-IN")}
                </strong>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sales-form-actions">
            <button
              type="button"
              className="sales-btn-secondary"
              onClick={onClearForm}
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="sales-add-btn"
            >
              <span>+ Register Client</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

