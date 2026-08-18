import React, { useState } from "react";
import Modal from "../../../components/Modal";
import Icon from "../../../components/Icon";
import {
  agreementService,
  agreementStatusBadgeColors,
  AGREEMENT_STATUSES,
  TEMPLATE_TYPES,
  TEMPLATE_NAMES,
  normalizeAgreementData,
} from "../../../services/agreementService";

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
    <Modal
      title={`Agreement Review: ${agr.client?.companyName} (${agr.id})`}
      onClose={onClose}
      closeLabel="Close"
    >
      <div style={{ display: "grid", gap: 18, maxWidth: 820, width: "100%", boxSizing: "border-box" }}>
        
        {/* Feedback Alert if applicable */}
        {feedbackMsg && (
          <div
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: feedbackMsg.type === "error" ? "#fee2e2" : "#eff6ff",
              color: feedbackMsg.type === "error" ? "#b91c1c" : "#1d4ed8",
              border: `1px solid ${feedbackMsg.type === "error" ? "#fca5a5" : "#bfdbfe"}`,
            }}
          >
            <span>{feedbackMsg.text}</span>
            <button
              type="button"
              onClick={() => setFeedbackMsg(null)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", fontWeight: "bold" }}
            >
              ×
            </button>
          </div>
        )}

        {/* ── 1. Agreement Information Card ── */}
        <div
          style={{
            background: "#f8fafc",
            padding: "16px 20px",
            borderRadius: 12,
            border: "1px solid #e2e8f0",
            display: "grid",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  padding: "4px 12px",
                  borderRadius: 999,
                  background: isPrivate ? "rgba(236, 72, 153, 0.12)" : "rgba(79, 70, 229, 0.12)",
                  color: isPrivate ? "#db2777" : "#4f46e5",
                  border: `1px solid ${isPrivate ? "#fbcfe8" : "#c7d2fe"}`,
                }}
              >
                📄 {templateTitle}
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 750,
                  padding: "4px 12px",
                  borderRadius: 999,
                  background: statusStyle.bg,
                  color: statusStyle.color,
                  border: `1px solid ${statusStyle.border}`,
                }}
              >
                ● {agr.agreement?.status}
              </span>
            </div>

            <div style={{ fontSize: 12, color: "#64748b" }}>
              Created: <strong>{agr.createdAt}</strong>
              {agr.sentAt && (
                <span style={{ marginLeft: 10, color: "#059669" }}>
                  • Sent: <strong>{agr.sentAt}</strong> ({agr.sentTo})
                </span>
              )}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 12,
              paddingTop: 10,
              borderTop: "1px solid #e2e8f0",
            }}
          >
            <div>
              <span style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", fontWeight: 700, display: "block" }}>
                Agreement ID
              </span>
              <strong style={{ fontSize: 13.5, color: "#1e293b" }}>{agr.id}</strong>
            </div>
            <div>
              <span style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", fontWeight: 700, display: "block" }}>
                Application ID
              </span>
              <strong style={{ fontSize: 13.5, color: "#1e293b" }}>{agr.applicationId || "—"}</strong>
            </div>
            <div>
              <span style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", fontWeight: 700, display: "block" }}>
                Client / Company
              </span>
              <strong style={{ fontSize: 13.5, color: "#1e293b" }}>{agr.client?.companyName || "—"}</strong>
              <div style={{ fontSize: 11.5, color: "#64748b" }}>{agr.client?.clientName}</div>
            </div>
            <div>
              <span style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", fontWeight: 700, display: "block" }}>
                Scheme / Service
              </span>
              <strong style={{ fontSize: 13.5, color: isPrivate ? "#db2777" : "#4f46e5" }}>
                {agr.scheme?.name || "—"}
              </strong>
            </div>
            <div>
              <span style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", fontWeight: 700, display: "block" }}>
                Agreement Date
              </span>
              <strong style={{ fontSize: 13.5, color: "#1e293b" }}>{agr.agreement?.date || "—"}</strong>
            </div>
          </div>
        </div>

        {/* ── 2. Commercial Information Card ── */}
        <div
          style={{
            background: "#ffffff",
            padding: "14px 18px",
            borderRadius: 12,
            border: "1px solid #e2e8f0",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: 12,
          }}
        >
          <div>
            <span style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", fontWeight: 700, display: "block" }}>
              Pitched Amount
            </span>
            <strong style={{ fontSize: 14, color: "#4f46e5" }}>
              {typeof agr.agreement?.pricing?.pitched === "number"
                ? `₹${agr.agreement.pricing.pitched.toLocaleString("en-IN")}`
                : agr.agreement?.pricing?.pitched || "—"}
            </strong>
          </div>
          <div>
            <span style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", fontWeight: 700, display: "block" }}>
              Token Received
            </span>
            <strong style={{ fontSize: 14, color: "#059669" }}>
              {typeof agr.agreement?.pricing?.received === "number"
                ? `₹${agr.agreement.pricing.received.toLocaleString("en-IN")}`
                : agr.agreement?.pricing?.received || "—"}
            </strong>
          </div>
          <div>
            <span style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", fontWeight: 700, display: "block" }}>
              Payment Left
            </span>
            <strong style={{ fontSize: 14, color: "#d97706" }}>
              {typeof agr.agreement?.pricing?.left === "number"
                ? `₹${agr.agreement.pricing.left.toLocaleString("en-IN")}`
                : agr.agreement?.pricing?.left || "—"}
            </strong>
          </div>
          <div>
            <span style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", fontWeight: 700, display: "block" }}>
              Success / Disb. Rate
            </span>
            <strong style={{ fontSize: 14, color: "#db2777" }}>
              {typeof agr.agreement?.pricing?.successRate === "number"
                ? `${agr.agreement.pricing.successRate}%`
                : agr.agreement?.pricing?.successRate || "—"}
            </strong>
          </div>
        </div>

        {/* ── 3. Document Preview Area ── */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 12,
            border: "1.5px solid #cbd5e1",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.03)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "12px 18px",
              background: "#f8fafc",
              borderBottom: "1px solid #e2e8f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="document" size={16} />
              <strong style={{ fontSize: 13, color: "#1e293b" }}>Agreement Document Preview</strong>
            </div>
            <span style={{ fontSize: 11.5, color: "#64748b" }}>
              Source: <code>{isPrivate ? "private_funding.docx" : "common_agreement.docx"}</code>
            </span>
          </div>

          {agr.documents?.pdfUrl ? (
            /* Backend PDF View */
            <div style={{ width: "100%", height: "480px" }}>
              <iframe
                src={agr.documents.pdfUrl}
                title="Agreement Document PDF"
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            </div>
          ) : (
            /* Clean Backend-Ready Placeholder Banner */
            <div
              style={{
                padding: "44px 24px",
                textAlign: "center",
                background: "#fcfcfd",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                minHeight: 220,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: isPrivate ? "rgba(236, 72, 153, 0.1)" : "rgba(79, 70, 229, 0.1)",
                  color: isPrivate ? "#db2777" : "#4f46e5",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Icon name="document" size={26} />
              </div>

              <div>
                <strong style={{ fontSize: 15, color: "#1e293b", display: "block", marginBottom: 4 }}>
                  {templateTitle}
                </strong>
                <p style={{ fontSize: 13, color: "#64748b", margin: "0 auto", maxWidth: 440, lineHeight: 1.5 }}>
                  Agreement preview will appear here once the official PDF is generated by the backend.
                  You can download the generated Word (.docx) document or dispatch the contract directly to the client.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  justifyContent: "center",
                  marginTop: 6,
                }}
              >
                <span
                  style={{
                    fontSize: 11.5,
                    padding: "3px 10px",
                    borderRadius: 6,
                    background: "#f1f5f9",
                    color: "#475569",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  ✓ Template Verified
                </span>
                <span
                  style={{
                    fontSize: 11.5,
                    padding: "3px 10px",
                    borderRadius: 6,
                    background: "#f1f5f9",
                    color: "#475569",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  ✓ Client Data Linked
                </span>
                <span
                  style={{
                    fontSize: 11.5,
                    padding: "3px 10px",
                    borderRadius: 6,
                    background: "#f1f5f9",
                    color: "#475569",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  ✓ Ready for Dispatch
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ── 4. Modal Action Buttons ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 10,
            paddingTop: 4,
          }}
        >
          {/* Document Download & Print Actions */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              className="primary-button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "#4f46e5",
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
              className="table-action"
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
              onClick={handleDownloadPdf}
              disabled={downloadingPdf}
              title="Download generated PDF document"
            >
              <Icon name="document" size={15} />
              <span>{downloadingPdf ? "Downloading..." : "Download PDF"}</span>
            </button>

            <button
              type="button"
              className="table-action"
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
              onClick={handlePrint}
              title="Print agreement details"
            >
              <Icon name="document" size={15} />
              <span>Print</span>
            </button>
          </div>

          {/* Send / Close Actions */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {!isHistoryView && !isSent && (
              <button
                type="button"
                className="primary-button"
                style={{
                  padding: "8px 20px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#059669",
                }}
                onClick={handleSend}
                disabled={sending}
                title={`Send agreement to ${agr.client?.email || "client"}`}
              >
                <Icon name="mail" size={15} />
                <span>{sending ? "Sending..." : "Send to Client"}</span>
              </button>
            )}

            {isSent && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: "#059669",
                  padding: "6px 12px",
                  background: "rgba(16, 185, 129, 0.1)",
                  borderRadius: 8,
                }}
              >
                <Icon name="check" size={14} />
                <span>Agreement Sent</span>
              </span>
            )}

            <button type="button" className="table-action" onClick={onClose}>
              Close
            </button>
          </div>
        </div>

      </div>
    </Modal>
  );
}
