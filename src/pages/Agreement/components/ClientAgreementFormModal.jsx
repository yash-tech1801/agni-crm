import React, { useState, useEffect } from "react";
import Modal from "../../../components/Modal";
import Icon from "../../../components/Icon";
import {
  agreementService,
  getTemplateTypeForService,
  TEMPLATE_TYPES,
  TEMPLATE_NAMES,
} from "../../../services/agreementService";

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
      setCompanyAddress(client.address || "Corporate Office, Business District");
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
    <Modal
      title={`Create Agreement: ${client.name} (${client.company || ""})`}
      onClose={onClose}
      closeLabel="Cancel"
    >
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14, minWidth: 320, maxWidth: 540 }}>
        {/* Template Indicator */}
        <div
          style={{
            background: isPrivate ? "#fffafc" : "#f8faff",
            padding: "8px 12px",
            borderRadius: 8,
            border: `1px solid ${isPrivate ? "#fce7f3" : "#e0e7ff"}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <span style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: isPrivate ? "#db2777" : "#4f46e5" }}>
              Selected Template ({serviceName}):
            </span>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1e293b", marginTop: 2 }}>
              📄 {templateDisplayName} (.docx)
            </div>
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 750,
              padding: "2px 8px",
              borderRadius: 6,
              background: isPrivate ? "rgba(236, 72, 153, 0.15)" : "rgba(79, 70, 229, 0.12)",
              color: isPrivate ? "#be185d" : "#4338ca",
            }}
          >
            Auto-Selected
          </span>
        </div>

        {errors.form && (
          <div style={{ padding: "8px 12px", borderRadius: 8, background: "#fee2e2", color: "#b91c1c", fontSize: 12.5 }}>
            {errors.form}
          </div>
        )}

        {/* 1. Agreement Date */}
        <div>
          <label className="field-label" style={{ display: "block", marginBottom: 4 }}>
            Agreement Date <span style={{ color: "#e11d48" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. 17/08/2026"
            value={agreementDate}
            disabled={loading}
            onChange={(e) => {
              setAgreementDate(e.target.value);
              setErrors((prev) => ({ ...prev, agreementDate: null }));
            }}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: 8,
              border: errors.agreementDate ? "1.5px solid #e11d48" : "1px solid #dcdfe6",
              fontSize: 13,
              boxSizing: "border-box",
            }}
          />
          {errors.agreementDate && <span style={{ color: "#e11d48", fontSize: 11.5, marginTop: 2, display: "block" }}>{errors.agreementDate}</span>}
        </div>

        {/* 2. Company Name */}
        <div>
          <label className="field-label" style={{ display: "block", marginBottom: 4 }}>
            Company Name <span style={{ color: "#e11d48" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Test Company Pvt Ltd"
            value={companyName}
            disabled={loading}
            onChange={(e) => {
              setCompanyName(e.target.value);
              setErrors((prev) => ({ ...prev, companyName: null }));
            }}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: 8,
              border: errors.companyName ? "1.5px solid #e11d48" : "1px solid #dcdfe6",
              fontSize: 13,
              boxSizing: "border-box",
            }}
          />
          {errors.companyName && <span style={{ color: "#e11d48", fontSize: 11.5, marginTop: 2, display: "block" }}>{errors.companyName}</span>}
        </div>

        {/* 3. Company Address */}
        <div>
          <label className="field-label" style={{ display: "block", marginBottom: 4 }}>
            Company Address <span style={{ color: "#e11d48" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Delhi or Principal place of business address"
            value={companyAddress}
            disabled={loading}
            onChange={(e) => {
              setCompanyAddress(e.target.value);
              setErrors((prev) => ({ ...prev, companyAddress: null }));
            }}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: 8,
              border: errors.companyAddress ? "1.5px solid #e11d48" : "1px solid #dcdfe6",
              fontSize: 13,
              boxSizing: "border-box",
            }}
          />
          {errors.companyAddress && <span style={{ color: "#e11d48", fontSize: 11.5, marginTop: 2, display: "block" }}>{errors.companyAddress}</span>}
        </div>

        {/* 4 & 5. Pitched Money & Payment Received in 2 columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label className="field-label" style={{ display: "block", marginBottom: 4 }}>
              Pitched Money <span style={{ color: "#e11d48" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. ₹50,000"
              value={pitchedMoney}
              disabled={loading}
              onChange={(e) => {
                setPitchedMoney(e.target.value);
                setErrors((prev) => ({ ...prev, pitchedMoney: null }));
              }}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 8,
                border: errors.pitchedMoney ? "1.5px solid #e11d48" : "1px solid #dcdfe6",
                fontSize: 13,
                boxSizing: "border-box",
              }}
            />
            {errors.pitchedMoney && <span style={{ color: "#e11d48", fontSize: 11.5, marginTop: 2, display: "block" }}>{errors.pitchedMoney}</span>}
          </div>

          <div>
            <label className="field-label" style={{ display: "block", marginBottom: 4 }}>
              Payment Received <span style={{ color: "#e11d48" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. ₹20,000"
              value={paymentReceived}
              disabled={loading}
              onChange={(e) => {
                setPaymentReceived(e.target.value);
                setErrors((prev) => ({ ...prev, paymentReceived: null }));
              }}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 8,
                border: errors.paymentReceived ? "1.5px solid #e11d48" : "1px solid #dcdfe6",
                fontSize: 13,
                boxSizing: "border-box",
              }}
            />
            {errors.paymentReceived && <span style={{ color: "#e11d48", fontSize: 11.5, marginTop: 2, display: "block" }}>{errors.paymentReceived}</span>}
          </div>
        </div>

        {/* 6 & 7. Payment Left & Disbursement Rate in 2 columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label className="field-label" style={{ display: "block", marginBottom: 4 }}>
              Payment Left <span style={{ color: "#e11d48" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. ₹30,000"
              value={paymentLeft}
              disabled={loading}
              onChange={(e) => {
                setPaymentLeft(e.target.value);
                setErrors((prev) => ({ ...prev, paymentLeft: null }));
              }}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 8,
                border: errors.paymentLeft ? "1.5px solid #e11d48" : "1px solid #dcdfe6",
                fontSize: 13,
                boxSizing: "border-box",
              }}
            />
            {errors.paymentLeft && <span style={{ color: "#e11d48", fontSize: 11.5, marginTop: 2, display: "block" }}>{errors.paymentLeft}</span>}
          </div>

          <div>
            <label className="field-label" style={{ display: "block", marginBottom: 4 }}>
              Disbursement Rate <span style={{ color: "#e11d48" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 5%"
              value={disbursementRate}
              disabled={loading}
              onChange={(e) => {
                setDisbursementRate(e.target.value);
                setErrors((prev) => ({ ...prev, disbursementRate: null }));
              }}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 8,
                border: errors.disbursementRate ? "1.5px solid #e11d48" : "1px solid #dcdfe6",
                fontSize: 13,
                boxSizing: "border-box",
              }}
            />
            {errors.disbursementRate && <span style={{ color: "#e11d48", fontSize: 11.5, marginTop: 2, display: "block" }}>{errors.disbursementRate}</span>}
          </div>
        </div>

        {/* Submit Actions */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
          <button type="button" className="table-action" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            type="submit"
            className="primary-button"
            style={{
              padding: "8px 24px",
              minWidth: 160,
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
                <span>Generating Agreement...</span>
              </>
            ) : (
              <span>Generate Agreement</span>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
