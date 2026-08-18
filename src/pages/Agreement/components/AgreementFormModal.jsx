import React, { useState, useEffect, useMemo } from "react";
import Modal from "../../../components/Modal";
import Icon from "../../../components/Icon";
import { AGREEMENT_TYPES, AGREEMENT_STATUSES } from "../mockAgreementData";

export default function AgreementFormModal({
  isOpen,
  onClose,
  agreementType,
  clients = [],
  onSubmitAgreement,
  existingAgreements = [],
}) {
  const isScheme = agreementType === AGREEMENT_TYPES.SCHEME;

  // Selected client ID
  const [selectedClientId, setSelectedClientId] = useState("");

  // Form Fields
  const [effectiveDate, setEffectiveDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [tenureMonths, setTenureMonths] = useState(isScheme ? "12" : "18");
  const [authorizedSignatory, setAuthorizedSignatory] = useState("Mia Ross");
  const [signatoryTitle, setSignatoryTitle] = useState(
    isScheme ? "Senior Scheme Consultant" : "Principal Private Equity Advisor"
  );
  const [termsScope, setTermsScope] = useState("");
  const [specialConditions, setSpecialConditions] = useState("");

  // Scheme specific
  const [schemeCategory, setSchemeCategory] = useState("Credit-Linked Capital Subsidy & Representation");
  const [projectCostEstimated, setProjectCostEstimated] = useState("₹25,00,000");
  const [bankNodalAgency, setBankNodalAgency] = useState("State Bank of India");
  const [subsidyPercentage, setSubsidyPercentage] = useState("35%");

  // Private Funding specific
  const [targetFundingAmount, setTargetFundingAmount] = useState("₹1,00,00,000");
  const [fundingInstrument, setFundingInstrument] = useState("Compulsorily Convertible Debentures (CCD)");
  const [equityPercentage, setEquityPercentage] = useState("7.5%");
  const [syndicateLead, setSyndicateLead] = useState("Apex Venture Syndicate");
  const [successFeePercent, setSuccessFeePercent] = useState("3.5%");

  // Errors
  const [errors, setErrors] = useState({});

  // Auto-select first client if available on open
  useEffect(() => {
    if (clients.length > 0 && !selectedClientId) {
      setSelectedClientId(clients[0].id.toString());
    }
  }, [clients, selectedClientId]);

  // Selected client object
  const activeClient = useMemo(() => {
    return clients.find((c) => c.id.toString() === selectedClientId.toString()) || null;
  }, [clients, selectedClientId]);

  // Update default scope based on selected client and type
  useEffect(() => {
    if (!activeClient) return;
    if (isScheme) {
      setTermsScope(
        `Legal engagement and statutory representation agreement for ${activeClient.scheme || "Government Scheme"} grant filing on behalf of ${activeClient.company || activeClient.name}.`
      );
      setSpecialConditions(
        "Project outlay subject to nodal bank appraisal and Ministry of MSME sanction clearance."
      );
    } else {
      setTermsScope(
        `Private investment syndication and capital advisory mandate for ${activeClient.company || activeClient.name}.`
      );
      setSpecialConditions(
        "Exclusive 180-day investment advisory term sheet for institutional and accredited angel syndication."
      );
    }
  }, [activeClient, isScheme]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!activeClient) {
      newErrors.client = "Please select an existing CRM client.";
    }
    if (!effectiveDate) {
      newErrors.effectiveDate = "Effective date is required.";
    }
    if (!authorizedSignatory.trim()) {
      newErrors.authorizedSignatory = "Authorized signatory name is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const nextNumber = existingAgreements.length + 1;
    const branchCode = activeClient.branch ? (activeClient.branch.includes("Mumbai") ? "WZ" : "NZ") : "GEN";
    const agreementId = `AGR-${branchCode}-2026-${String(nextNumber).padStart(3, "0")}`;
    const nowStr = new Date().toISOString().replace("T", " ").substring(0, 16);

    const agreementRecord = {
      id: agreementId,
      crmId: activeClient.id,
      clientId: activeClient.id,
      appId: activeClient.appId || `APP-${activeClient.id}`,
      clientName: activeClient.name,
      companyName: activeClient.company || activeClient.name,
      email: activeClient.email,
      phone: activeClient.phone,
      address: activeClient.address || "Corporate Office, Business District",
      branch: activeClient.branch || "West Zone (Mumbai)",
      agreementType: agreementType,
      scheme: isScheme ? activeClient.scheme || "PMEGP" : "Private Funding",
      status: AGREEMENT_STATUSES.READY,
      createdAt: nowStr,
      sentAt: null,
      sentTo: null,
      effectiveDate: effectiveDate,
      tenureMonths: parseInt(tenureMonths, 10) || 12,
      commercialValue: activeClient.totalPayment || activeClient.amount || 50000,
      authorizedSignatory: authorizedSignatory.trim(),
      signatoryTitle: signatoryTitle.trim(),
      termsScope: termsScope.trim(),
      specialConditions: specialConditions.trim(),
      details: isScheme
        ? {
            schemeCategory,
            projectCostEstimated,
            bankNodalAgency,
            subsidyPercentage,
          }
        : {
            targetFundingAmount,
            fundingInstrument,
            equityPercentage,
            syndicateLead,
            successFeePercent,
          },
    };

    onSubmitAgreement(agreementRecord, activeClient);
  };

  return (
    <Modal
      title={`Create ${isScheme ? "Scheme" : "Private Funding"} Agreement`}
      onClose={onClose}
      closeLabel="Cancel"
    >
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18, minWidth: 320, maxWidth: 680 }}>
        {/* Step 1: Select CRM Client */}
        <div>
          <label className="field-label" style={{ display: "block", marginBottom: 6 }}>
            Select Existing CRM Client <span style={{ color: "#e11d48" }}>*</span>
          </label>
          <select
            value={selectedClientId}
            onChange={(e) => {
              setSelectedClientId(e.target.value);
              setErrors((prev) => ({ ...prev, client: null }));
            }}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              border: errors.client ? "1.5px solid #e11d48" : "1px solid #dcdfe6",
              fontSize: 13.5,
              background: "#fff",
              outline: "none",
            }}
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.company}) — App ID: {c.appId} [{c.scheme || "General"}]
              </option>
            ))}
          </select>
          {errors.client && <span style={{ color: "#e11d48", fontSize: 12, marginTop: 4, display: "block" }}>{errors.client}</span>}
        </div>

        {/* Auto-populated Client Information Card */}
        {activeClient && (
          <div
            style={{
              background: "#fbfbfe",
              padding: 14,
              borderRadius: 12,
              border: "1px solid #e7e7f5",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 10,
            }}
          >
            <div>
              <p className="eyebrow" style={{ margin: "0 0 2px" }}>Client &amp; Company</p>
              <strong style={{ fontSize: 13.5 }}>{activeClient.name}</strong>
              <div style={{ fontSize: 12, color: "#7a748e" }}>{activeClient.company}</div>
            </div>
            <div>
              <p className="eyebrow" style={{ margin: "0 0 2px" }}>Application &amp; Scheme</p>
              <strong style={{ fontSize: 13.5, color: isScheme ? "#4f46e5" : "#db2777" }}>
                {activeClient.scheme || "Standard"}
              </strong>
              <div style={{ fontSize: 11.5, color: "#7a748e" }}>ID: <code>{activeClient.appId}</code></div>
            </div>
            <div>
              <p className="eyebrow" style={{ margin: "0 0 2px" }}>Email &amp; Phone</p>
              <strong style={{ fontSize: 12.5 }}>{activeClient.email}</strong>
              <div style={{ fontSize: 11.5, color: "#7a748e" }}>{activeClient.phone}</div>
            </div>
            <div>
              <p className="eyebrow" style={{ margin: "0 0 2px" }}>Contract Commercial</p>
              <strong style={{ fontSize: 13.5, color: "#059669" }}>
                ₹{(activeClient.totalPayment || activeClient.amount || 0).toLocaleString("en-IN")}
              </strong>
              <div style={{ fontSize: 11.5, color: "#7a748e" }}>Officer: {activeClient.assignedSalesPerson || "Branch"}</div>
            </div>
          </div>
        )}

        {/* Step 2: Agreement Parameters */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <label className="field-label" style={{ display: "block", marginBottom: 6 }}>
              Effective Agreement Date <span style={{ color: "#e11d48" }}>*</span>
            </label>
            <input
              type="date"
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 8,
                border: errors.effectiveDate ? "1.5px solid #e11d48" : "1px solid #dcdfe6",
                fontSize: 13,
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label className="field-label" style={{ display: "block", marginBottom: 6 }}>
              Agreement Tenure (Months)
            </label>
            <select
              value={tenureMonths}
              onChange={(e) => setTenureMonths(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: 8,
                border: "1px solid #dcdfe6",
                fontSize: 13,
                background: "#fff",
                boxSizing: "border-box",
              }}
            >
              <option value="6">6 Months</option>
              <option value="12">12 Months (1 Year)</option>
              <option value="18">18 Months (1.5 Years)</option>
              <option value="24">24 Months (2 Years)</option>
              <option value="36">36 Months (3 Years)</option>
            </select>
          </div>
        </div>

        {/* Type-Specific Fields */}
        {isScheme ? (
          <div style={{ background: "#f8faff", padding: 14, borderRadius: 12, border: "1px solid #e0e7ff", display: "grid", gap: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.8, color: "#4f46e5" }}>
              Scheme Agreement Parameters:
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label className="field-label" style={{ display: "block", marginBottom: 4 }}>Scheme Category</label>
                <input
                  type="text"
                  value={schemeCategory}
                  onChange={(e) => setSchemeCategory(e.target.value)}
                  style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #cbd5e1", fontSize: 12.5, boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label className="field-label" style={{ display: "block", marginBottom: 4 }}>Est. Project Outlay</label>
                <input
                  type="text"
                  value={projectCostEstimated}
                  onChange={(e) => setProjectCostEstimated(e.target.value)}
                  style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #cbd5e1", fontSize: 12.5, boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label className="field-label" style={{ display: "block", marginBottom: 4 }}>Nodal Banking Agency</label>
                <input
                  type="text"
                  value={bankNodalAgency}
                  onChange={(e) => setBankNodalAgency(e.target.value)}
                  style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #cbd5e1", fontSize: 12.5, boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label className="field-label" style={{ display: "block", marginBottom: 4 }}>Subsidy Allocation %</label>
                <input
                  type="text"
                  value={subsidyPercentage}
                  onChange={(e) => setSubsidyPercentage(e.target.value)}
                  style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #cbd5e1", fontSize: 12.5, boxSizing: "border-box" }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div style={{ background: "#fffafc", padding: 14, borderRadius: 12, border: "1px solid #fce7f3", display: "grid", gap: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.8, color: "#db2777" }}>
              Private Funding Agreement Parameters:
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label className="field-label" style={{ display: "block", marginBottom: 4 }}>Target Funding Amount</label>
                <input
                  type="text"
                  value={targetFundingAmount}
                  onChange={(e) => setTargetFundingAmount(e.target.value)}
                  style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #cbd5e1", fontSize: 12.5, boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label className="field-label" style={{ display: "block", marginBottom: 4 }}>Funding Instrument</label>
                <input
                  type="text"
                  value={fundingInstrument}
                  onChange={(e) => setFundingInstrument(e.target.value)}
                  style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #cbd5e1", fontSize: 12.5, boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label className="field-label" style={{ display: "block", marginBottom: 4 }}>Equity Stake / Term</label>
                <input
                  type="text"
                  value={equityPercentage}
                  onChange={(e) => setEquityPercentage(e.target.value)}
                  style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #cbd5e1", fontSize: 12.5, boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label className="field-label" style={{ display: "block", marginBottom: 4 }}>Syndicate Lead Entity</label>
                <input
                  type="text"
                  value={syndicateLead}
                  onChange={(e) => setSyndicateLead(e.target.value)}
                  style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #cbd5e1", fontSize: 12.5, boxSizing: "border-box" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Signatory Details */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <label className="field-label" style={{ display: "block", marginBottom: 4 }}>
              Authorized Signatory Name <span style={{ color: "#e11d48" }}>*</span>
            </label>
            <input
              type="text"
              value={authorizedSignatory}
              onChange={(e) => setAuthorizedSignatory(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 8,
                border: errors.authorizedSignatory ? "1.5px solid #e11d48" : "1px solid #dcdfe6",
                fontSize: 13,
                boxSizing: "border-box",
              }}
            />
            {errors.authorizedSignatory && (
              <span style={{ color: "#e11d48", fontSize: 12, marginTop: 4, display: "block" }}>
                {errors.authorizedSignatory}
              </span>
            )}
          </div>
          <div>
            <label className="field-label" style={{ display: "block", marginBottom: 4 }}>
              Signatory Designation
            </label>
            <input
              type="text"
              value={signatoryTitle}
              onChange={(e) => setSignatoryTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #dcdfe6",
                fontSize: 13,
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        {/* Terms and Scope */}
        <div>
          <label className="field-label" style={{ display: "block", marginBottom: 4 }}>
            Agreement Terms &amp; Representation Scope
          </label>
          <textarea
            rows={2}
            value={termsScope}
            onChange={(e) => setTermsScope(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #dcdfe6",
              fontSize: 13,
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div>
          <label className="field-label" style={{ display: "block", marginBottom: 4 }}>
            Special Conditions / Covenants
          </label>
          <textarea
            rows={2}
            value={specialConditions}
            onChange={(e) => setSpecialConditions(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #dcdfe6",
              fontSize: 13,
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Modal Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
          <button type="button" className="table-action" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="primary-button" style={{ padding: "8px 24px" }}>
            Generate &amp; Save Agreement
          </button>
        </div>
      </form>
    </Modal>
  );
}
