import React from "react";
import Icon from "../../../components/Icon";
import { schemeOptions } from "../mockSalesData";

export default function SalesClientForm({
  newClient,
  onNewClientChange,
  onAddClient,
  onClearForm,
  onGoToDetails,
  dark,
}) {
  return (
    <section className="sales-clients-form-view" style={{ maxWidth: 860, margin: '0 auto', animation: 'fadeIn 0.3s ease' }}>
      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <p className="eyebrow" style={{ margin: 0, textTransform: 'uppercase', letterSpacing: 1, fontSize: 11.5, color: '#8c5ff8', fontWeight: 700 }}>Client Registration</p>
          <h1 style={{ margin: '4px 0 2px', fontSize: 24, fontWeight: 800, color: dark ? '#f3effc' : '#1e1932', letterSpacing: '-0.5px' }}>Add New Client</h1>
          <p style={{ margin: 0, color: '#7a748e', fontSize: 13 }}>Fill in client identity, scheme selection, commercial terms, and compliance documents. Submitted details will appear in the <strong>Details</strong> tab.</p>
        </div>
        <button
          type="button"
          className="sales-btn-secondary"
          onClick={onGoToDetails}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          <Icon name="eye" size={14} />
          <span>Go to Details</span>
        </button>
      </div>

      <div className="sales-table-card" style={{ padding: 24 }}>
        <form onSubmit={onAddClient} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Section 1: Business Identity */}
          <div className="sales-form-section">
            <div className="sales-section-title">
              <Icon name="building" size={16} />
              <span>1. Business & Contact Information</span>
            </div>
            <div className="sales-form-grid-2">
              <label className="field-label">
                Client / Trading Name
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
                Contact Person Name
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
                Registered Company Name
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
                Registered Office / Location
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
                Official Email Address
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
                Phone Number
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
              <Icon name="document" size={16} />
              <span>2. Scheme & Engagement Tier</span>
            </div>
            <div className="sales-form-grid-2">
              <label className="field-label">
                Lifecycle Stage
                <select name="stage" value={newClient.stage} onChange={onNewClientChange}>
                  <option value="Active">Active</option>
                  <option value="Onboarding">Onboarding</option>
                  <option value="Renewal">Renewal</option>
                  <option value="Prospect">Prospect</option>
                </select>
              </label>
              <label className="field-label">
                Selected Scheme
                <select name="scheme" value={newClient.scheme} onChange={onNewClientChange} required>
                  {schemeOptions.map((scheme) => (
                    <option key={scheme} value={scheme}>{scheme}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {/* Section 3: Commercials & Billing */}
          <div className="sales-form-section">
            <div className="sales-section-title">
              <Icon name="currency" size={16} />
              <span>3. Commercials & Payment Setup</span>
            </div>
            <div className="sales-form-grid-3">
              <label className="field-label">
                Base Contract Amount (₹)
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
                Mode of Payment
                <select name="paymentMode" value={newClient.paymentMode} onChange={onNewClientChange}>
                  <option value="Online">Online (18% GST Added)</option>
                  <option value="Offline">Offline (Direct/Exempt)</option>
                </select>
              </label>
              <label className="field-label">
                Payment Received (₹)
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

            {/* Live Calculation Summary Box */}
            <div className="sales-live-calc-box">
              <div className="sales-live-calc-item">
                <span>Base Amount</span>
                <strong>₹{(parseFloat(newClient.amount) || 0).toLocaleString("en-IN")}</strong>
              </div>
              <div className="sales-live-calc-item">
                <span>GST ({newClient.paymentMode === "Online" ? "18%" : "0%"})</span>
                <strong style={{ color: newClient.paymentMode === "Online" ? "#6d3bf5" : "#7a748e" }}>
                  ₹{newClient.gstAmount.toLocaleString("en-IN")}
                </strong>
              </div>
              <div className="sales-live-calc-item">
                <span>Total Payable</span>
                <strong style={{ color: "#10b981" }}>₹{newClient.totalPayment.toLocaleString("en-IN")}</strong>
              </div>
              <div className="sales-live-calc-item">
                <span>Pending Balance</span>
                <strong style={{ color: newClient.paymentPending > 0 ? "#e11d48" : "#059669" }}>
                  ₹{newClient.paymentPending.toLocaleString("en-IN")}
                </strong>
              </div>
            </div>
          </div>

          {/* Section 4: Compliance & KYC Documents */}
          <div className="sales-form-section">
            <div className="sales-section-title">
              <Icon name="roles" size={16} />
              <span>4. Compliance & Verification Numbers</span>
            </div>
            <div className="sales-form-grid-3">
              <label className="field-label">
                PAN Number
                <input
                  type="text"
                  name="panNumber"
                  value={newClient.panNumber}
                  onChange={onNewClientChange}
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />
              </label>
              <label className="field-label">
                Aadhar Number
                <input
                  type="text"
                  name="aadharNumber"
                  value={newClient.aadharNumber}
                  onChange={onNewClientChange}
                  placeholder="1234 5678 9012"
                />
              </label>
              <label className="field-label">
                GST Number
                <input
                  type="text"
                  name="gstNumber"
                  value={newClient.gstNumber}
                  onChange={onNewClientChange}
                  placeholder="27ABCDE1234F1Z5"
                />
              </label>
            </div>
            <div className="sales-form-grid-2" style={{ marginTop: 14 }}>
              <label className="field-label">
                KYC Documentation Status
                <select name="kycStatus" value={newClient.kycStatus} onChange={onNewClientChange}>
                  <option value="Submitted">Submitted / Verified</option>
                  <option value="Pending">Pending Documents</option>
                  <option value="In Review">Under Review</option>
                </select>
              </label>
              <label className="field-label">
                Internal Account Notes
                <input
                  type="text"
                  name="notes"
                  value={newClient.notes}
                  onChange={onNewClientChange}
                  placeholder="Special client remarks or contract terms..."
                />
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
            <button
              type="button"
              className="sales-btn-secondary"
              onClick={onClearForm}
            >
              Clear Form
            </button>
            <button type="submit" className="sales-add-btn" style={{ padding: '12px 28px', fontSize: 14 }}>
              <span>+ Add Client</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
