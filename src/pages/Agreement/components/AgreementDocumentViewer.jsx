import React, { useState } from "react";
import Icon from "../../../components/Icon";
import {
  agreementService,
  agreementStatusBadgeColors,
  AGREEMENT_STATUSES,
  TEMPLATE_TYPES,
  TEMPLATE_NAMES,
  normalizeAgreementData,
} from "../../../services/agreementService";
import "../../Admin/AdminDashboard.css";

export default function AgreementDocumentViewer({
  agreement,
  onClose,
  onSendAgreement,
  isHistoryView = false,
  showToast,
}) {
  const [downloadingDocx, setDownloadingDocx] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [sending, setSending] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  if (!agreement) return null;

  const agr = normalizeAgreementData(agreement);
  const isPrivate = agr.scheme?.type === TEMPLATE_TYPES.PRIVATE_FUNDING;
  const isSent = agr.agreement?.status === AGREEMENT_STATUSES.SENT;
  const statusStyle =
    agreementStatusBadgeColors[agr.agreement?.status] || agreementStatusBadgeColors.Ready;
  const templateTitle =
    agr.agreement?.templateName ||
    (isPrivate ? TEMPLATE_NAMES.PRIVATE_FUNDING : TEMPLATE_NAMES.SCHEME);

  const handleDownloadDocx = async () => {
    setDownloadingDocx(true);
    setFeedbackMsg(null);
    try {
      await agreementService.downloadAgreementDocx(agr.id);
      if (showToast) {
        showToast(`✓ Downloaded ${templateTitle} (.docx) for ${agr.client?.companyName}`);
      }
    } catch (err) {
      console.error("Error downloading DOCX:", err);
      setFeedbackMsg({ type: "error", text: "Failed to download DOCX document." });
    } finally {
      setDownloadingDocx(false);
    }
  };

  const handleDownloadPdf = async () => {
    setDownloadingPdf(true);
    setFeedbackMsg(null);
    try {
      const result = await agreementService.downloadAgreementPdf(agr.id);
      if (result.success) {
        if (showToast) {
          showToast(`✓ Downloaded Agreement PDF for ${agr.client?.companyName}`);
        }
      } else {
        setFeedbackMsg({
          type: "info",
          text: result.message || "PDF generation will be provided by the backend API.",
        });
      }
    } catch (err) {
      console.error("Error downloading PDF:", err);
      setFeedbackMsg({ type: "error", text: "Failed to download PDF document." });
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSend = async () => {
    if (isSent) return;
    setSending(true);
    setFeedbackMsg(null);
    try {
      if (onSendAgreement) {
        await onSendAgreement(agr);
      } else {
        await agreementService.sendAgreement(agr.id, agr.client?.email);
      }
      if (showToast) {
        showToast(`✓ Agreement ${agr.id} dispatched to ${agr.client?.email || "client"}`);
      }
      onClose();
    } catch (err) {
      console.error("Error sending agreement:", err);
      setFeedbackMsg({ type: "error", text: `Failed to send agreement: ${err.message}` });
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="modal-backdrop"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.78)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px 16px",
        animation: "fadeIn 0.2s ease-out",
      }}
      onClick={onClose}
    >
      <div
        className="admin-panel-card hide-scrollbar"
        style={{
          width: "100%",
          maxWidth: 820,
          maxHeight: "92vh",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          padding: 0,
          borderRadius: 22,
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.45), 0 0 32px rgba(78, 124, 255, 0.15)",
          border: "1px solid rgba(154, 116, 233, 0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: "22px 26px 18px",
            borderBottom: "1px solid rgba(154, 116, 233, 0.15)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
              <span
                className="admin-badge"
                style={{
                  background: isPrivate
                    ? "linear-gradient(135deg, #ec4899 0%, #db2777 100%)"
                    : "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                  color: "#ffffff",
                  fontSize: 11,
                  padding: "3px 10px",
                }}
              >
                {isPrivate ? "PRIVATE FUNDING CONTRACT" : "SCHEME AGREEMENT"}
              </span>
              <span
                className="admin-badge"
                style={{
                  background: "rgba(78, 124, 255, 0.12)",
                  color: "#4e7cff",
                  fontWeight: 750,
                  fontSize: 11,
                }}
              >
                ID: {agr.id}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "3px 10px",
                  borderRadius: 999,
                  background: statusStyle.bg,
                  color: statusStyle.color,
                  border: `1px solid ${statusStyle.border}`,
                  fontSize: 11,
                  fontWeight: 750,
                }}
              >
                <span style={{ fontSize: 8 }}>●</span>
                <span>{agr.agreement?.status}</span>
              </span>
            </div>
            <h3 style={{ margin: "2px 0 4px", fontSize: 20, fontWeight: 800, color: "inherit", letterSpacing: -0.3 }}>
              {agr.client?.companyName || agr.client?.clientName}
            </h3>
            <p className="admin-desc" style={{ fontSize: 13 }}>
              Contact: <strong>{agr.client?.clientName}</strong> • Created: {agr.createdAt}
              {agr.sentAt && (
                <span style={{ marginLeft: 10, color: "#10b981", fontWeight: 700 }}>
                  • Dispatched: {agr.sentAt} ({agr.sentTo})
                </span>
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: "rgba(241, 245, 249, 0.6)",
              border: "1px solid rgba(154, 116, 233, 0.15)",
              borderRadius: "50%",
              width: 34,
              height: 34,
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              color: "#64748b",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.12)";
              e.currentTarget.style.color = "#ef4444";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(241, 245, 249, 0.6)";
              e.currentTarget.style.color = "#64748b";
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "22px 26px 26px", display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Feedback Alert if applicable */}
          {feedbackMsg && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: feedbackMsg.type === "error" ? "rgba(239, 68, 68, 0.12)" : "rgba(59, 130, 246, 0.12)",
                color: feedbackMsg.type === "error" ? "#ef4444" : "#3b82f6",
                border: `1px solid ${feedbackMsg.type === "error" ? "rgba(239, 68, 68, 0.3)" : "rgba(59, 130, 246, 0.3)"}`,
              }}
            >
              <span>{feedbackMsg.text}</span>
              <button
                type="button"
                onClick={() => setFeedbackMsg(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", fontWeight: "bold" }}
              >
                ✕
              </button>
            </div>
          )}

          {/* ── 1. Commercial Summary Strip ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
            <div className="admin-subcard" style={{ padding: "10px 14px" }}>
              <span className="admin-kicker" style={{ fontSize: 10.5, color: "#6366f1" }}>Pitched Commercial</span>
              <strong style={{ display: "block", fontSize: 14, color: "#6366f1" }}>
                {typeof agr.agreement?.pricing?.pitched === "number"
                  ? `₹${agr.agreement.pricing.pitched.toLocaleString("en-IN")}`
                  : agr.agreement?.pricing?.pitched || "—"}
              </strong>
              <small style={{ color: "#64748b", fontSize: 11 }}>Total Agreement Fee</small>
            </div>
            <div className="admin-subcard" style={{ padding: "10px 14px" }}>
              <span className="admin-kicker" style={{ fontSize: 10.5, color: "#10b981" }}>Token Received</span>
              <strong style={{ display: "block", fontSize: 14, color: "#10b981" }}>
                {typeof agr.agreement?.pricing?.received === "number"
                  ? `₹${agr.agreement.pricing.received.toLocaleString("en-IN")}`
                  : agr.agreement?.pricing?.received || "—"}
              </strong>
              <small style={{ color: "#64748b", fontSize: 11 }}>Upfront Paid</small>
            </div>
            <div className="admin-subcard" style={{ padding: "10px 14px" }}>
              <span className="admin-kicker" style={{ fontSize: 10.5, color: "#f59e0b" }}>Balance Pending</span>
              <strong style={{ display: "block", fontSize: 14, color: "#f59e0b" }}>
                {typeof agr.agreement?.pricing?.left === "number"
                  ? `₹${agr.agreement.pricing.left.toLocaleString("en-IN")}`
                  : agr.agreement?.pricing?.left || "—"}
              </strong>
              <small style={{ color: "#64748b", fontSize: 11 }}>Payable on Milestone</small>
            </div>
            <div className="admin-subcard" style={{ padding: "10px 14px" }}>
              <span className="admin-kicker" style={{ fontSize: 10.5, color: "#ec4899" }}>Success Fee</span>
              <strong style={{ display: "block", fontSize: 14, color: "#ec4899" }}>
                {typeof agr.agreement?.pricing?.successRate === "number"
                  ? `${agr.agreement.pricing.successRate}%`
                  : agr.agreement?.pricing?.successRate || "5%"}
              </strong>
              <small style={{ color: "#64748b", fontSize: 11 }}>On Disbursement</small>
            </div>
          </div>

          {/* ── 2. Official Simulated Legal Paper Presentation ── */}
          <div
            className="admin-subcard"
            style={{
              padding: 0,
              overflow: "hidden",
              border: "1px solid rgba(154, 116, 233, 0.2)",
            }}
          >
            <div
              style={{
                padding: "12px 18px",
                borderBottom: "1px solid rgba(154, 116, 233, 0.15)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 8,
                background: "rgba(154, 116, 233, 0.05)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14 }}>📄</span>
                <strong style={{ fontSize: 13 }}>Official Legal Contract Document Preview</strong>
              </div>
              <span style={{ fontSize: 11.5, color: "#64748b" }}>
                Template: <code>{isPrivate ? "private_funding_template.docx" : "common_scheme_agreement.docx"}</code>
              </span>
            </div>

            {/* Document Paper Container */}
            <div
              style={{
                padding: "28px 32px",
                background: "#ffffff",
                color: "#1e293b",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 13,
                lineHeight: 1.6,
              }}
            >
              {/* Official Header Strip */}
              <div
                style={{
                  borderBottom: "2px solid #1e293b",
                  paddingBottom: 14,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div>
                  <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 1.5, color: "#4f46e5", textTransform: "uppercase" }}>
                    AGNI CRM • LEGAL CONSULTANCY &amp; SERVICE AGREEMENT
                  </span>
                  <h3 style={{ margin: "2px 0 0", fontSize: 17, fontWeight: 800, color: "#0f172a" }}>
                    {templateTitle}
                  </h3>
                  <div style={{ fontSize: 11.5, color: "#64748b" }}>
                    Document Ref: <strong>{agr.id}</strong> • CRM App Ref: <strong>{agr.applicationId || agr.crmId || "CRM-REF"}</strong>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Execution Date</div>
                  <strong style={{ fontSize: 13, color: "#0f172a" }}>{agr.agreement?.date || agr.createdAt}</strong>
                </div>
              </div>

              {/* Parties Block */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  padding: "12px 16px",
                  background: "#f8fafc",
                  borderRadius: 10,
                  border: "1px solid #e2e8f0",
                }}
              >
                <div>
                  <span style={{ fontSize: 10.5, fontWeight: 800, color: "#4f46e5", textTransform: "uppercase" }}>
                    FIRST PARTY (SERVICE PROVIDER)
                  </span>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#0f172a", marginTop: 2 }}>
                    AGNI BUSINESS CONSULTANCY SERVICES
                  </div>
                  <div style={{ fontSize: 11.5, color: "#64748b" }}>Corporate Legal &amp; Financial Advisory Division</div>
                </div>

                <div>
                  <span style={{ fontSize: 10.5, fontWeight: 800, color: isPrivate ? "#db2777" : "#059669", textTransform: "uppercase" }}>
                    SECOND PARTY (CLIENT / APPLICANT)
                  </span>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#0f172a", marginTop: 2 }}>
                    {agr.client?.companyName || "Client Enterprise"}
                  </div>
                  <div style={{ fontSize: 11.5, color: "#64748b" }}>
                    Rep: <strong>{agr.client?.clientName}</strong> • {agr.client?.address || "Registered Business Address"}
                  </div>
                </div>
              </div>

              {/* Scope & Service Mandate */}
              <div>
                <strong style={{ fontSize: 13, color: "#0f172a", display: "block", marginBottom: 4 }}>
                  1. Mandate &amp; Scope of Services
                </strong>
                <p style={{ margin: 0, color: "#475569", fontSize: 12.5 }}>
                  The First Party agrees to provide end-to-end consultancy, DPR project formulation, document vetting, compliance verification,
                  and liaison services for the <strong>{agr.scheme?.name || "Govt. Credit Link Scheme"}</strong> on behalf of the Second Party.
                </p>
              </div>

              {/* Financial Considerations Breakdown Table */}
              <div>
                <strong style={{ fontSize: 13, color: "#0f172a", display: "block", marginBottom: 6 }}>
                  2. Agreed Commercials &amp; Milestone Payment Terms
                </strong>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, textAlign: "left" }}>
                  <thead>
                    <tr style={{ background: "#f1f5f9", borderBottom: "1px solid #cbd5e1" }}>
                      <th style={{ padding: "7px 10px", color: "#475569" }}>Schedule Milestone</th>
                      <th style={{ padding: "7px 10px", color: "#475569" }}>Payable Amount</th>
                      <th style={{ padding: "7px 10px", color: "#475569" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <td style={{ padding: "7px 10px" }}>Upfront File Inception &amp; DPR Formulation</td>
                      <td style={{ padding: "7px 10px", fontWeight: 700, color: "#059669" }}>
                        {typeof agr.agreement?.pricing?.received === "number"
                          ? `₹${agr.agreement.pricing.received.toLocaleString("en-IN")}`
                          : agr.agreement?.pricing?.received || "—"}
                      </td>
                      <td style={{ padding: "7px 10px", color: "#059669", fontWeight: 700 }}>✓ Cleared</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <td style={{ padding: "7px 10px" }}>Application Submission &amp; Bank Portal Filing</td>
                      <td style={{ padding: "7px 10px", fontWeight: 700, color: "#f59e0b" }}>
                        {typeof agr.agreement?.pricing?.left === "number"
                          ? `₹${agr.agreement.pricing.left.toLocaleString("en-IN")}`
                          : agr.agreement?.pricing?.left || "—"}
                      </td>
                      <td style={{ padding: "7px 10px", color: "#f59e0b", fontWeight: 700 }}>Pending Milestone</td>
                    </tr>
                    <tr style={{ background: "#f8fafc" }}>
                      <td style={{ padding: "7px 10px" }}>Disbursement Success Fee</td>
                      <td style={{ padding: "7px 10px", fontWeight: 700, color: "#ec4899" }}>
                        {agr.agreement?.pricing?.successRate || "5%"} of Sanctioned Value
                      </td>
                      <td style={{ padding: "7px 10px", color: "#64748b" }}>On Final Sanction</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Signatures Block */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 24,
                  marginTop: 10,
                  paddingTop: 16,
                  borderTop: "1px solid #e2e8f0",
                }}
              >
                <div>
                  <div style={{ height: 36, borderBottom: "1px dashed #cbd5e1", marginBottom: 4 }} />
                  <strong style={{ fontSize: 12, color: "#0f172a", display: "block" }}>For Agni Business Consultants</strong>
                  <span style={{ fontSize: 11, color: "#64748b" }}>Authorized Commercial Signatory</span>
                </div>
                <div>
                  <div style={{ height: 36, borderBottom: "1px dashed #cbd5e1", marginBottom: 4 }} />
                  <strong style={{ fontSize: 12, color: "#0f172a", display: "block" }}>
                    For {agr.client?.companyName || "Client"}
                  </strong>
                  <span style={{ fontSize: 11, color: "#64748b" }}>Authorized Client Signatory</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── 3. Bottom Action Toolbar ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
              paddingTop: 12,
              borderTop: "1px solid rgba(154, 116, 233, 0.15)",
            }}
          >
            {/* Export Actions */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                type="button"
                className="admin-btn-secondary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(59, 130, 246, 0.12)",
                  color: "#3b82f6",
                  borderColor: "rgba(59, 130, 246, 0.3)",
                }}
                onClick={handleDownloadDocx}
                disabled={downloadingDocx}
                title="Download generated Word document (.docx)"
              >
                <Icon name="document" size={15} />
                <span>{downloadingDocx ? "Downloading..." : "Download DOCX"}</span>
              </button>

              <button
                type="button"
                className="admin-btn-secondary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(239, 68, 68, 0.12)",
                  color: "#ef4444",
                  borderColor: "rgba(239, 68, 68, 0.3)",
                }}
                onClick={handleDownloadPdf}
                disabled={downloadingPdf}
                title="Download generated PDF document"
              >
                <Icon name="document" size={15} />
                <span>{downloadingPdf ? "Downloading..." : "Download PDF"}</span>
              </button>

              <button
                type="button"
                className="admin-btn-secondary"
                style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                onClick={handlePrint}
                title="Print agreement details"
              >
                <span>🖨️ Print</span>
              </button>
            </div>

            {/* Send / Close Actions */}
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button type="button" className="admin-btn-secondary" onClick={onClose} style={{ padding: "10px 20px" }}>
                Close
              </button>

              {!isHistoryView && !isSent && (
                <button
                  type="button"
                  className="admin-btn-primary"
                  style={{
                    padding: "10px 24px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  }}
                  onClick={handleSend}
                  disabled={sending}
                  title={`Send agreement to ${agr.client?.email || "client"}`}
                >
                  <Icon name="mail" size={15} />
                  <span>{sending ? "Dispatching..." : "Send to Client Email"}</span>
                </button>
              )}

              {isSent && (
                <span
                  className="admin-badge"
                  style={{
                    fontSize: 12,
                    padding: "8px 14px",
                    background: "rgba(16, 185, 129, 0.15)",
                    color: "#10b981",
                    fontWeight: 800,
                  }}
                >
                  ✓ Dispatched to Client
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
