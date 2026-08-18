import React from "react";
import Modal from "../../../components/Modal";
import Icon from "../../../components/Icon";
import { agreementStatusBadgeColors, AGREEMENT_TYPES, AGREEMENT_STATUSES } from "../mockAgreementData";

export default function AgreementReviewModal({
  agreement,
  onClose,
  onSendAgreement,
}) {
  if (!agreement) return null;

  const isScheme = agreement.agreementType === AGREEMENT_TYPES.SCHEME;
  const isSent = agreement.status === AGREEMENT_STATUSES.SENT;
  const statusStyle = agreementStatusBadgeColors[agreement.status] || agreementStatusBadgeColors.Ready;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      title={`Agreement Review: ${agreement.id} — ${agreement.companyName}`}
      onClose={onClose}
      closeLabel="Close"
    >
      <div style={{ display: "grid", gap: 20, maxWidth: 760 }}>
        {/* Top Meta Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 10,
            background: "#f8fafc",
            padding: "12px 16px",
            borderRadius: 12,
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                padding: "3px 10px",
                borderRadius: 999,
                background: isScheme ? "rgba(99, 102, 241, 0.12)" : "rgba(236, 72, 153, 0.12)",
                color: isScheme ? "#4338ca" : "#be185d",
                border: `1px solid ${isScheme ? "#c7d2fe" : "#fbcfe8"}`,
              }}
            >
              {isScheme ? "SCHEME AGREEMENT" : "PRIVATE FUNDING AGREEMENT"}
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: 999,
                background: statusStyle.bg,
                color: statusStyle.color,
                border: `1px solid ${statusStyle.border}`,
              }}
            >
              ● Status: {agreement.status}
            </span>
          </div>

          <div style={{ fontSize: 12, color: "#64748b" }}>
            Created: <strong>{agreement.createdAt}</strong>
            {agreement.sentAt && (
              <span style={{ marginLeft: 10, color: "#059669" }}>
                Sent: <strong>{agreement.sentAt}</strong>
              </span>
            )}
          </div>
        </div>

        {/* Printable Document Presentation Container */}
        <div
          className="agreement-document-paper"
          style={{
            background: "#ffffff",
            padding: "32px 36px",
            borderRadius: 14,
            border: "1.5px solid #dcdfe6",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
            display: "grid",
            gap: 22,
            fontFamily: "inherit",
          }}
        >
          {/* Document Header */}
          <div style={{ borderBottom: "2px solid #1e293b", paddingBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.2, color: "#6366f1", textTransform: "uppercase" }}>
                AGNI CRM • LEGAL &amp; COMMERCIAL REGISTRY
              </span>
              <h2 style={{ margin: "4px 0 2px", fontSize: 21, color: "#0f172a" }}>
                {isScheme ? "Statutory Scheme Engagement Agreement" : "Private Capital Mandate Agreement"}
              </h2>
              <div style={{ fontSize: 12, color: "#64748b" }}>
                Agreement Ref: <strong>{agreement.id}</strong> • Application ID: <strong>{agreement.appId}</strong>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#4f46e5" }}>Agni<span>CRM</span></div>
              <small style={{ color: "#94a3b8" }}>Govt &amp; Private Advisory Division</small>
            </div>
          </div>

          {/* Parties Section */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, background: "#f8fafc", padding: 16, borderRadius: 10, border: "1px solid #e2e8f0" }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "#64748b", display: "block", marginBottom: 4 }}>
                First Party (Consultant / Facilitator):
              </span>
              <strong style={{ fontSize: 14, color: "#0f172a" }}>Agni Solutions Private Limited</strong>
              <div style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>
                Branch: {agreement.branch}
              </div>
              <div style={{ fontSize: 12, color: "#475569" }}>
                Signatory: {agreement.authorizedSignatory} ({agreement.signatoryTitle})
              </div>
            </div>

            <div>
              <span style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "#64748b", display: "block", marginBottom: 4 }}>
                Second Party (Client / Commercial Entity):
              </span>
              <strong style={{ fontSize: 14, color: "#0f172a" }}>{agreement.companyName}</strong>
              <div style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>
                Authorized Rep: {agreement.clientName}
              </div>
              <div style={{ fontSize: 12, color: "#475569" }}>
                Email: {agreement.email} • Tel: {agreement.phone}
              </div>
              <div style={{ fontSize: 11.5, color: "#64748b" }}>
                Address: {agreement.address}
              </div>
            </div>
          </div>

          {/* Engagement Scope & Terms */}
          <div>
            <h4 style={{ margin: "0 0 6px", fontSize: 14, color: "#0f172a", textTransform: "uppercase", letterSpacing: 0.5 }}>
              1. Scope of Engagement &amp; Representation
            </h4>
            <p style={{ margin: 0, fontSize: 13, color: "#334155", lineHeight: 1.6 }}>
              {agreement.termsScope || "The First Party agrees to provide professional consultancy, statutory audit support, and formal liaison for scheme sanctioning and capital disbursement."}
            </p>
          </div>

          {/* Scheme / Funding Details Grid */}
          <div>
            <h4 style={{ margin: "0 0 8px", fontSize: 14, color: "#0f172a", textTransform: "uppercase", letterSpacing: 0.5 }}>
              2. Commercial &amp; Capital Terms
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
              <div style={{ background: "#f8fafc", padding: 10, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: 11, color: "#64748b", display: "block" }}>Contract Commercial Value</span>
                <strong style={{ fontSize: 14, color: "#059669" }}>
                  ₹{(agreement.commercialValue || 0).toLocaleString("en-IN")}
                </strong>
              </div>

              <div style={{ background: "#f8fafc", padding: 10, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: 11, color: "#64748b", display: "block" }}>Agreement Scheme</span>
                <strong style={{ fontSize: 14, color: isScheme ? "#4f46e5" : "#db2777" }}>
                  {agreement.scheme}
                </strong>
              </div>

              <div style={{ background: "#f8fafc", padding: 10, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: 11, color: "#64748b", display: "block" }}>Tenure &amp; Validity</span>
                <strong style={{ fontSize: 13.5, color: "#1e293b" }}>
                  {agreement.tenureMonths} Months ({agreement.effectiveDate})
                </strong>
              </div>

              {isScheme && agreement.details?.subsidyPercentage && (
                <div style={{ background: "#f8fafc", padding: 10, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: 11, color: "#64748b", display: "block" }}>Subsidy Benefit</span>
                  <strong style={{ fontSize: 13.5, color: "#4f46e5" }}>
                    {agreement.details.subsidyPercentage}
                  </strong>
                </div>
              )}

              {!isScheme && agreement.details?.targetFundingAmount && (
                <div style={{ background: "#f8fafc", padding: 10, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: 11, color: "#64748b", display: "block" }}>Target Capital Size</span>
                  <strong style={{ fontSize: 13.5, color: "#db2777" }}>
                    {agreement.details.targetFundingAmount}
                  </strong>
                </div>
              )}
            </div>
          </div>

          {/* Special Conditions */}
          {agreement.specialConditions && (
            <div>
              <h4 style={{ margin: "0 0 6px", fontSize: 14, color: "#0f172a", textTransform: "uppercase", letterSpacing: 0.5 }}>
                3. Special Covenants &amp; Conditions
              </h4>
              <p style={{ margin: 0, fontSize: 12.5, color: "#475569", lineHeight: 1.55 }}>
                {agreement.specialConditions}
              </p>
            </div>
          )}

          {/* Execution & Signature Blocks */}
          <div style={{ marginTop: 10, paddingTop: 20, borderTop: "1px dashed #cbd5e1", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
            <div>
              <div style={{ height: 44, borderBottom: "1.5px solid #94a3b8", display: "flex", alignItems: "flex-end", paddingBottom: 4 }}>
                <span style={{ fontFamily: "cursive", fontSize: 16, color: "#4f46e5" }}>{agreement.authorizedSignatory}</span>
              </div>
              <span style={{ fontSize: 11.5, color: "#64748b", display: "block", marginTop: 4 }}>
                For <strong>Agni Solutions Pvt. Ltd.</strong> (Authorized Signatory)
              </span>
            </div>

            <div>
              <div style={{ height: 44, borderBottom: "1.5px solid #94a3b8", display: "flex", alignItems: "flex-end", paddingBottom: 4 }}>
                <span style={{ fontFamily: "cursive", fontSize: 16, color: "#334155" }}>{agreement.clientName}</span>
              </div>
              <span style={{ fontSize: 11.5, color: "#64748b", display: "block", marginTop: 4 }}>
                For <strong>{agreement.companyName}</strong> (Client Signatory)
              </span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <button
            type="button"
            className="table-action"
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
            onClick={handlePrint}
          >
            <Icon name="document" size={15} />
            <span>Print / Export PDF</span>
          </button>

          <div style={{ display: "flex", gap: 10 }}>
            {!isSent && onSendAgreement && (
              <button
                type="button"
                className="primary-button"
                style={{ padding: "8px 20px", display: "inline-flex", alignItems: "center", gap: 6 }}
                onClick={() => {
                  onSendAgreement(agreement);
                  onClose();
                }}
              >
                <Icon name="mail" size={15} />
                <span>Send Agreement to Client</span>
              </button>
            )}
            <button type="button" className="table-action" onClick={onClose}>
              Close Review
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
