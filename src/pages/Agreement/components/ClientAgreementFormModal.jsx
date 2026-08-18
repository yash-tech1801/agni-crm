import React, { useState, useEffect } from "react";
import Icon from "../../../components/Icon";
import {
  agreementService,
  getTemplateTypeForService,
  TEMPLATE_TYPES,
  TEMPLATE_NAMES,
} from "../../../services/agreementService";
import "../../Admin/AdminDashboard.css";

export default function ClientAgreementFormModal({
  isOpen,
  onClose,
  client,
  onSubmitAgreement,
  existingAgreementsCount = 0,
}) {
  // 7 Form Fields
  const [agreementDate, setAgreementDate] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [pitchedMoney, setPitchedMoney] = useState("");
  const [paymentReceived, setPaymentReceived] = useState("");
  const [paymentLeft, setPaymentLeft] = useState("");
  const [disbursementRate, setDisbursementRate] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (client) {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      setAgreementDate(`${dd}/${mm}/${yyyy}`);
      setCompanyName(client.company || client.name || "");
      setCompanyAddress(client.address || "Corporate Business District, Registered Office");
      setPitchedMoney(
        client.totalPayment
          ? `₹${client.totalPayment.toLocaleString("en-IN")}`
          : "₹50,000"
      );
      setPaymentReceived(
        client.paymentReceived
          ? `₹${client.paymentReceived.toLocaleString("en-IN")}`
          : "₹20,000"
      );
      setPaymentLeft(
        client.totalPayment && client.paymentReceived
          ? `₹${(client.totalPayment - client.paymentReceived).toLocaleString("en-IN")}`
          : "₹30,000"
      );
      setDisbursementRate("5%");
      setErrors({});
    }
  }, [client, isOpen]);

  if (!isOpen || !client) return null;

  // Determine template type automatically from client's existing service/scheme
  const serviceName = client.scheme || client.serviceName || "PMEGP";
  const templateType = getTemplateTypeForService(serviceName);
  const isPrivate = templateType === TEMPLATE_TYPES.PRIVATE_FUNDING;
  const templateDisplayName = isPrivate ? TEMPLATE_NAMES.PRIVATE_FUNDING : TEMPLATE_NAMES.SCHEME;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!agreementDate.trim()) newErrors.agreementDate = "Agreement Date is required.";
    if (!companyName.trim()) newErrors.companyName = "Company Name is required.";
    if (!companyAddress.trim()) newErrors.companyAddress = "Company Address is required.";
    if (!pitchedMoney.trim()) newErrors.pitchedMoney = "Pitched Money is required.";
    if (!paymentReceived.trim()) newErrors.paymentReceived = "Payment Received is required.";
    if (!paymentLeft.trim()) newErrors.paymentLeft = "Payment Left is required.";
    if (!disbursementRate.trim()) newErrors.disbursementRate = "Disbursement Rate is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Trigger agreement generation via backend-ready service abstraction
      const generatedAgreement = await agreementService.generateAgreement({
        client,
        agreementDate: agreementDate.trim(),
        companyName: companyName.trim(),
        companyAddress: companyAddress.trim(),
        pitchedMoney: pitchedMoney.trim(),
        paymentReceived: paymentReceived.trim(),
        paymentLeft: paymentLeft.trim(),
        disbursementRate: disbursementRate.trim(),
        templateType,
        existingCount: existingAgreementsCount,
      });

      onSubmitAgreement(generatedAgreement, client);
    } catch (err) {
      console.error("Error generating agreement:", err);
      setErrors({ form: `Failed to request agreement generation: ${err.message}` });
    } finally {
      setLoading(false);
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
          maxWidth: 600,
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
        {/* Header */}
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
                    : "linear-gradient(135deg, #4e7cff 0%, #3b66e8 100%)",
                  color: "#ffffff",
                  fontSize: 11,
                  padding: "3px 10px",
                }}
              >
                CREATE LEGAL CONTRACT
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
                ID: {client.appId}
              </span>
            </div>
            <h3 style={{ margin: "2px 0 4px", fontSize: 19, fontWeight: 800, color: "inherit", letterSpacing: -0.3 }}>
              {client.name}
            </h3>
            <p className="admin-desc" style={{ fontSize: 13 }}>
              {client.company || "Enterprise Client"} • Scheme: <strong>{serviceName}</strong>
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

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: "22px 26px 26px", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Template Indicator */}
          <div
            className="admin-subcard"
            style={{
              padding: "10px 14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: `1.5px solid ${isPrivate ? "rgba(236, 72, 153, 0.35)" : "rgba(78, 124, 255, 0.35)"}`,
              background: isPrivate ? "rgba(236, 72, 153, 0.08)" : "rgba(78, 124, 255, 0.08)",
            }}
          >
            <div>
              <span className="admin-kicker" style={{ fontSize: 10.5, color: isPrivate ? "#ec4899" : "#4e7cff" }}>
                Auto-Matched Contract Template ({serviceName}):
              </span>
              <div style={{ fontSize: 13, fontWeight: 800, color: "inherit", marginTop: 2 }}>
                📄 {templateDisplayName} (.docx)
              </div>
            </div>
            <span
              className="admin-badge"
              style={{
                fontSize: 11,
                background: isPrivate ? "rgba(236, 72, 153, 0.18)" : "rgba(78, 124, 255, 0.18)",
                color: isPrivate ? "#ec4899" : "#4e7cff",
              }}
            >
              Verified Template
            </span>
          </div>

          {errors.form && (
            <div
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                background: "rgba(239, 68, 68, 0.12)",
                color: "#ef4444",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                fontSize: 12.5,
              }}
            >
              {errors.form}
            </div>
          )}

          {/* 1. Agreement Date */}
          <div>
            <label className="admin-form-label">
              Agreement Execution Date <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="text"
              className="admin-form-input"
              placeholder="e.g. 17/08/2026"
              value={agreementDate}
              disabled={loading}
              onChange={(e) => {
                setAgreementDate(e.target.value);
                setErrors((prev) => ({ ...prev, agreementDate: null }));
              }}
              style={{ borderColor: errors.agreementDate ? "#ef4444" : undefined }}
            />
            {errors.agreementDate && <span style={{ color: "#ef4444", fontSize: 11.5, marginTop: 2, display: "block" }}>{errors.agreementDate}</span>}
          </div>

          {/* 2. Company Name */}
          <div>
            <label className="admin-form-label">
              Registered Company / Enterprise Name <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="text"
              className="admin-form-input"
              placeholder="e.g. Test Enterprise Pvt Ltd"
              value={companyName}
              disabled={loading}
              onChange={(e) => {
                setCompanyName(e.target.value);
                setErrors((prev) => ({ ...prev, companyName: null }));
              }}
              style={{ borderColor: errors.companyName ? "#ef4444" : undefined }}
            />
            {errors.companyName && <span style={{ color: "#ef4444", fontSize: 11.5, marginTop: 2, display: "block" }}>{errors.companyName}</span>}
          </div>

          {/* 3. Company Address */}
          <div>
            <label className="admin-form-label">
              Principal Place of Business / Registered Address <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="text"
              className="admin-form-input"
              placeholder="e.g. Corporate Address, Industrial Estate"
              value={companyAddress}
              disabled={loading}
              onChange={(e) => {
                setCompanyAddress(e.target.value);
                setErrors((prev) => ({ ...prev, companyAddress: null }));
              }}
              style={{ borderColor: errors.companyAddress ? "#ef4444" : undefined }}
            />
            {errors.companyAddress && <span style={{ color: "#ef4444", fontSize: 11.5, marginTop: 2, display: "block" }}>{errors.companyAddress}</span>}
          </div>

          {/* 4 & 5. Pitched Money & Payment Received */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label className="admin-form-label">
                Total Pitched Commercial <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="e.g. ₹50,000"
                value={pitchedMoney}
                disabled={loading}
                onChange={(e) => {
                  setPitchedMoney(e.target.value);
                  setErrors((prev) => ({ ...prev, pitchedMoney: null }));
                }}
                style={{ borderColor: errors.pitchedMoney ? "#ef4444" : undefined }}
              />
              {errors.pitchedMoney && <span style={{ color: "#ef4444", fontSize: 11.5, marginTop: 2, display: "block" }}>{errors.pitchedMoney}</span>}
            </div>

            <div>
              <label className="admin-form-label">
                Upfront Inception Received <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="e.g. ₹20,000"
                value={paymentReceived}
                disabled={loading}
                onChange={(e) => {
                  setPaymentReceived(e.target.value);
                  setErrors((prev) => ({ ...prev, paymentReceived: null }));
                }}
                style={{ borderColor: errors.paymentReceived ? "#ef4444" : undefined }}
              />
              {errors.paymentReceived && <span style={{ color: "#ef4444", fontSize: 11.5, marginTop: 2, display: "block" }}>{errors.paymentReceived}</span>}
            </div>
          </div>

          {/* 6 & 7. Payment Left & Disbursement Rate */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label className="admin-form-label">
                Balance Payment Left <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="e.g. ₹30,000"
                value={paymentLeft}
                disabled={loading}
                onChange={(e) => {
                  setPaymentLeft(e.target.value);
                  setErrors((prev) => ({ ...prev, paymentLeft: null }));
                }}
                style={{ borderColor: errors.paymentLeft ? "#ef4444" : undefined }}
              />
              {errors.paymentLeft && <span style={{ color: "#ef4444", fontSize: 11.5, marginTop: 2, display: "block" }}>{errors.paymentLeft}</span>}
            </div>

            <div>
              <label className="admin-form-label">
                Disbursement Success Fee <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="e.g. 5%"
                value={disbursementRate}
                disabled={loading}
                onChange={(e) => {
                  setDisbursementRate(e.target.value);
                  setErrors((prev) => ({ ...prev, disbursementRate: null }));
                }}
                style={{ borderColor: errors.disbursementRate ? "#ef4444" : undefined }}
              />
              {errors.disbursementRate && <span style={{ color: "#ef4444", fontSize: 11.5, marginTop: 2, display: "block" }}>{errors.disbursementRate}</span>}
            </div>
          </div>

          {/* Submit Actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 12,
              paddingTop: 10,
              borderTop: "1px solid rgba(154, 116, 233, 0.15)",
            }}
          >
            <button type="button" className="admin-btn-secondary" onClick={onClose} disabled={loading} style={{ padding: "10px 20px" }}>
              Cancel
            </button>
            <button
              type="submit"
              className="admin-btn-primary"
              style={{
                padding: "10px 24px",
                minWidth: 180,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      display: "inline-block",
                      width: 12,
                      height: 12,
                      border: "2px solid rgba(255,255,255,0.4)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  <span>Generating Contract...</span>
                </>
              ) : (
                <>
                  <Icon name="check" size={16} />
                  <span>Generate Agreement</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
