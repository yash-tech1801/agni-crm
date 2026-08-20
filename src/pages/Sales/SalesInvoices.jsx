import React, { useMemo, useState } from "react";
import Modal from "../../components/Modal";
import Icon from "../../components/Icon";
import { mockClients } from "./mockClients";

const INVOICE_TABS = ["All Invoices", "Tax Invoices", "Standard Invoices", "Personal Invoices"];
const INVOICE_TYPES = ["Tax Invoice", "Invoice", "Personal"];

const INVOICE_TYPE_METADATA = {
  "Tax Invoice": {
    icon: "📑",
    accent: "#8c5ff8",
    bg: "rgba(140, 95, 248, 0.15)",
    title: "Tax Invoice",
    subtitle: "Official tax invoice with 18% GST (B2B compliant)",
    hasGst: true,
  },
  "Invoice": {
    icon: "🧾",
    accent: "#3b82f6",
    bg: "rgba(59, 130, 246, 0.15)",
    title: "Invoice",
    subtitle: "Standard commercial invoice without GST (0% GST rate)",
    hasGst: false,
  },
  "Personal": {
    icon: "👤",
    accent: "#10b981",
    bg: "rgba(16, 185, 129, 0.15)",
    title: "Personal",
    subtitle: "Direct personal billing exempt from GST (B2C)",
    hasGst: false,
  },
};

const initialInvoices = [
  {
    id: "INV-2026-001",
    invoiceType: "Tax Invoice",
    clientId: 1,
    clientName: "Bright Retail",
    clientEmail: "hello@brightretail.com",
    clientPhone: "+91 98765 32100",
    clientGst: "27ABCDE1234F1Z5",
    serviceDescription: "Corporate Health Shield (Annual Premium)",
    baseAmount: 42000,
    gstPercentage: 18,
    issueDate: "2026-08-01",
    dueDate: "2026-08-15",
    status: "Pending",
    createdBy: "Sales Person",
    notes: "Annual renewal for group health insurance policy.",
  },
  {
    id: "INV-2026-002",
    invoiceType: "Personal",
    clientId: 2,
    clientName: "Urban Foods",
    clientEmail: "sales@urbanfoods.com",
    clientPhone: "+91 91234 55678",
    clientGst: "",
    serviceDescription: "Brand Growth Suite Activation",
    baseAmount: 60000,
    gstPercentage: 0,
    issueDate: "2026-07-20",
    dueDate: "2026-08-05",
    status: "Paid",
    createdBy: "Sales Person",
    notes: "One-time branding service fee.",
  },
  {
    id: "INV-2026-003",
    invoiceType: "Tax Invoice",
    clientId: 3,
    clientName: "Nova Textiles",
    clientEmail: "contact@novatextiles.com",
    clientPhone: "+91 99876 44556",
    clientGst: "27LMNOP4321D1Z3",
    serviceDescription: "Enterprise IT Infra Shield Setup",
    baseAmount: 85000,
    gstPercentage: 18,
    issueDate: "2026-07-15",
    dueDate: "2026-07-30",
    status: "Paid",
    createdBy: "Sales Person",
    notes: "Infrastructure and network security setup fee.",
  },
  {
    id: "INV-2026-004",
    invoiceType: "Invoice",
    clientId: 4,
    clientName: "Peak Logistics",
    clientEmail: "contact@peaklogistics.com",
    clientPhone: "+91 90123 45678",
    clientGst: "",
    serviceDescription: "Logistics Optimization Consultation (Non-GST)",
    baseAmount: 50000,
    gstPercentage: 0,
    issueDate: "2026-08-05",
    dueDate: "2026-08-20",
    status: "Pending",
    createdBy: "Sales Person",
    notes: "Commercial standard invoice issued without GST.",
  },
];

const statusBadge = {
  Paid: "#10b981",
  Pending: "#f59e0b",
  Overdue: "#f43f5e",
  Cancelled: "#7c8490",
};

const formatCurrency = (val) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

const calculateTotals = (base, gst) => {
  const b = Number(base) || 0;
  const g = Number(gst) || 0;
  const gstAmount = Math.round(b * (g / 100));
  return { gstAmount, totalAmount: b + gstAmount };
};

const generateInvoiceId = (existing) => {
  const nextNum = existing.length + 1;
  return `INV-2026-${String(nextNum).padStart(3, "0")}`;
};

function CreateInvoiceModal({ clients, onClose, onSubmit }) {
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState({
    clientId: clients[0]?.id ? String(clients[0].id) : "",
    serviceDescription: "",
    baseAmount: "",
    gstPercentage: 18,
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    status: "Pending",
    notes: "",
  });

  const selectedClient = useMemo(
    () => clients.find((client) => String(client.id) === String(formData.clientId)),
    [clients, formData.clientId]
  );

  const gstRate = selectedType === "Tax Invoice" ? formData.gstPercentage : 0;
  const { gstAmount, totalAmount } = calculateTotals(formData.baseAmount, gstRate);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectType = (type) => {
    setSelectedType(type);
    setFormData((prev) => ({
      ...prev,
      gstPercentage: type === "Tax Invoice" ? 18 : 0,
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!formData.serviceDescription.trim() || !formData.baseAmount || Number(formData.baseAmount) <= 0) {
      return;
    }

    const invoice = {
      id: generateInvoiceId([]),
      invoiceType: selectedType,
      clientId: selectedClient ? selectedClient.id : 1,
      clientName: selectedClient?.name ?? "Client",
      clientEmail: selectedClient?.email ?? "",
      clientPhone: selectedClient?.phone ?? "",
      clientGst: selectedClient?.gstNumber ?? "",
      serviceDescription: formData.serviceDescription,
      baseAmount: Number(formData.baseAmount),
      gstPercentage: selectedType === "Tax Invoice" ? Number(formData.gstPercentage) : 0,
      issueDate: formData.issueDate,
      dueDate: formData.dueDate,
      status: formData.status,
      createdBy: "Sales Person",
      notes: formData.notes,
    };

    onSubmit(invoice);
    onClose();
  };

  return (
    <Modal title="Create Invoice" onClose={onClose} closeLabel="Close">
      <div style={{ display: "flex", flexDirection: "column", gap: 18, minWidth: 320, maxWidth: 680 }}>
        {!selectedType ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <p className="eyebrow" style={{ margin: 0, textTransform: "uppercase", letterSpacing: 1, fontSize: 11, color: "#8c5ff8", fontWeight: 700 }}>
                Step 1 of 2
              </p>
              <h2 style={{ margin: "4px 0 4px", fontSize: 18, fontWeight: 800 }}>Select Invoice Class</h2>
              <p style={{ margin: 0, color: "#7a748e", fontSize: 13 }}>
                Select whether this invoice requires B2B GST compliance, standard commercial billing without GST, or personal billing.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginTop: 4 }}>
              {INVOICE_TYPES.map((type) => {
                const meta = INVOICE_TYPE_METADATA[type];
                return (
                  <button
                    key={type}
                    type="button"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      textAlign: "left",
                      padding: "20px 18px",
                      borderRadius: 16,
                      border: "1.5px solid rgba(140, 95, 248, 0.2)",
                      background: "linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
                      cursor: "pointer",
                      transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    className="sales-req-type-card"
                    onClick={() => handleSelectType(type)}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: meta?.bg || "rgba(140, 95, 248, 0.15)",
                        color: meta?.accent || "#8c5ff8",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 18,
                        marginBottom: 12,
                      }}
                    >
                      {meta?.icon || "📄"}
                    </div>
                    <strong style={{ fontSize: 15, marginBottom: 4, display: "block" }}>{meta?.title || type}</strong>
                    <small style={{ color: "#7a748e", fontSize: 12.5, lineHeight: 1.4, display: "block" }}>
                      {meta?.subtitle || "Invoice without GST"}
                    </small>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 12,
                padding: "12px 16px",
                borderRadius: 12,
                background: "linear-gradient(135deg, rgba(140, 95, 248, 0.08) 0%, rgba(109, 59, 245, 0.03) 100%)",
                border: "1px solid rgba(140, 95, 248, 0.16)",
              }}
            >
              <div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "2px 8px",
                    borderRadius: 6,
                    background: INVOICE_TYPE_METADATA[selectedType]?.bg || "rgba(140, 95, 248, 0.15)",
                    color: INVOICE_TYPE_METADATA[selectedType]?.accent || "#8c5ff8",
                    fontSize: 11,
                    fontWeight: 700,
                    marginBottom: 2,
                  }}
                >
                  {selectedType}
                </span>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>
                  {selectedType === "Tax Invoice"
                    ? "Generate Tax Invoice"
                    : selectedType === "Invoice"
                    ? "Generate Invoice (Without GST)"
                    : "Generate Personal Invoice"}
                </h3>
              </div>
              <button
                className="sales-btn-secondary"
                type="button"
                onClick={() => setSelectedType("")}
                style={{ padding: "6px 14px", fontSize: 12.5 }}
              >
                ← Change type
              </button>
            </div>

            <label className="field-label">
              <span>Target Client <span style={{ color: "#f43f5e" }}>*</span></span>
              <select name="clientId" value={formData.clientId} onChange={handleChange} style={{ padding: "10px 14px", borderRadius: 10 }} required>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name} — {client.company}
                  </option>
                ))}
              </select>
            </label>

            <label className="field-label">
              Service / Policy Description
              <textarea
                name="serviceDescription"
                value={formData.serviceDescription}
                onChange={handleChange}
                rows={3}
                placeholder="Explain the service or policy details"
                style={{ resize: "vertical", minHeight: 90, padding: 12, borderRadius: 8, border: "1px solid #dedfe1", font: "inherit" }}
                required
              />
            </label>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <label className="field-label">
                Base Amount (₹)
                <input
                  type="number"
                  name="baseAmount"
                  value={formData.baseAmount}
                  onChange={handleChange}
                  placeholder="e.g. 50000"
                  min="1"
                  required
                />
              </label>

              {selectedType === "Tax Invoice" ? (
                <label className="field-label">
                  GST Percentage (%)
                  <input
                    type="number"
                    name="gstPercentage"
                    value={formData.gstPercentage}
                    onChange={handleChange}
                    min="0"
                    max="100"
                  />
                </label>
              ) : (
                <label className="field-label">
                  GST Percentage (%)
                  <input type="text" value="0% (Without GST)" disabled readOnly />
                </label>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <label className="field-label">
                Issue Date
                <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} required />
              </label>

              <label className="field-label">
                Due Date
                <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
              </label>
            </div>

            <label className="field-label">
              Initial Status
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </label>

            <label className="field-label">
              Notes (optional)
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={2}
                placeholder="Any special remarks or payment instructions..."
                style={{ resize: "vertical", padding: 10, borderRadius: 8, border: "1px solid #dedfe1", font: "inherit" }}
              />
            </label>

            {/* Live calculation box */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(140, 95, 248, 0.08) 0%, rgba(109, 59, 245, 0.03) 100%)",
                padding: "16px 20px",
                borderRadius: 14,
                border: "1px solid rgba(140, 95, 248, 0.2)",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 14,
              }}
            >
              <div>
                <span style={{ fontSize: 11.5, color: "#7a748e", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600, display: "block", marginBottom: 3 }}>
                  Base Amount
                </span>
                <strong style={{ fontSize: 16 }}>{formatCurrency(formData.baseAmount || 0)}</strong>
              </div>
              <div>
                <span style={{ fontSize: 11.5, color: "#7a748e", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600, display: "block", marginBottom: 3 }}>
                  GST ({gstRate}%)
                </span>
                <strong style={{ fontSize: 16, color: selectedType === "Tax Invoice" ? "#8c5ff8" : "#7a748e" }}>
                  {formatCurrency(gstAmount)}
                </strong>
              </div>
              <div>
                <span style={{ fontSize: 11.5, color: "#7a748e", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600, display: "block", marginBottom: 3 }}>
                  Total Payable
                </span>
                <strong style={{ color: "#10b981", fontSize: 17, fontWeight: 700 }}>{formatCurrency(totalAmount)}</strong>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: 12, marginTop: 4 }}>
              <button className="sales-btn-secondary" type="button" onClick={onClose}>
                Cancel
              </button>
              <button
                className="sales-add-btn"
                type="button"
                onClick={handleSubmit}
                disabled={!formData.serviceDescription.trim() || !formData.baseAmount}
                style={{
                  opacity: (!formData.serviceDescription.trim() || !formData.baseAmount) ? 0.5 : 1,
                  cursor: (!formData.serviceDescription.trim() || !formData.baseAmount) ? "not-allowed" : "pointer",
                  padding: "10px 24px",
                  fontSize: 13.5,
                }}
              >
                <span>+ Create Invoice</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

function InvoiceDetailsModal({ invoice, onClose, onDownload }) {
  if (!invoice) return null;
  const { gstAmount, totalAmount } = calculateTotals(invoice.baseAmount, invoice.gstPercentage);
  const isTax = invoice.invoiceType === "Tax Invoice";

  return (
    <Modal title={`Invoice Details — ${invoice.id}`} onClose={onClose} closeLabel="Close">
      <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 680 }}>
        {/* Top Summary Banner */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
            padding: 16,
            borderRadius: 14,
            background: "linear-gradient(135deg, rgba(140, 95, 248, 0.08) 0%, rgba(109, 59, 245, 0.03) 100%)",
            border: "1px solid rgba(140, 95, 248, 0.16)",
          }}
        >
          <div>
            <span style={{ fontSize: 11.5, color: "#7a748e", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600, display: "block" }}>
              Client
            </span>
            <strong style={{ fontSize: 15, marginTop: 2, display: "block" }}>{invoice.clientName}</strong>
          </div>
          <div>
            <span style={{ fontSize: 11.5, color: "#7a748e", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600, display: "block" }}>
              Invoice Type
            </span>
            <strong
              style={{
                fontSize: 14,
                marginTop: 2,
                display: "block",
                color: INVOICE_TYPE_METADATA[invoice.invoiceType]?.accent || "#8c5ff8",
              }}
            >
              {invoice.invoiceType} {isTax ? "(18% GST)" : "(No GST)"}
            </strong>
          </div>
          <div>
            <span style={{ fontSize: 11.5, color: "#7a748e", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600, display: "block" }}>
              Status
            </span>
            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "4px 12px",
                  borderRadius: 999,
                  background: `${statusBadge[invoice.status] || "#f2aa38"}22`,
                  color: statusBadge[invoice.status] || "#f2aa38",
                  fontWeight: 700,
                  fontSize: 12,
                  marginTop: 2,
                }}
              >
                {invoice.status}
              </span>
            </div>
          </div>
        </div>

        {/* 3-Column Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
          <div style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(140, 95, 248, 0.14)", background: "rgba(255, 255, 255, 0.02)" }}>
            <span style={{ fontSize: 11.5, color: "#7a748e", fontWeight: 600, display: "block" }}>Issue Date</span>
            <strong style={{ fontSize: 13.5, marginTop: 3, display: "block" }}>{invoice.issueDate}</strong>
          </div>
          <div style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(140, 95, 248, 0.14)", background: "rgba(255, 255, 255, 0.02)" }}>
            <span style={{ fontSize: 11.5, color: "#7a748e", fontWeight: 600, display: "block" }}>Due Date</span>
            <strong style={{ fontSize: 13.5, marginTop: 3, display: "block" }}>{invoice.dueDate}</strong>
          </div>
          <div style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(16, 185, 129, 0.25)", background: "rgba(16, 185, 129, 0.06)" }}>
            <span style={{ fontSize: 11.5, color: "#10b981", fontWeight: 600, display: "block" }}>Total Amount</span>
            <strong style={{ fontSize: 16, color: "#10b981", marginTop: 2, display: "block", fontWeight: 700 }}>
              {formatCurrency(totalAmount)}
            </strong>
          </div>
        </div>

        {/* Service Description */}
        <div style={{ padding: "14px 16px", borderRadius: 12, border: "1px solid rgba(140, 95, 248, 0.14)", background: "rgba(140, 95, 248, 0.04)" }}>
          <span style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#8c5ff8", display: "block", marginBottom: 4 }}>
            Service Description
          </span>
          <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: "inherit" }}>
            {invoice.serviceDescription}
          </p>
        </div>

        {/* Base & GST */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
          <div style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(140, 95, 248, 0.14)", background: "rgba(255, 255, 255, 0.02)" }}>
            <span style={{ fontSize: 11.5, color: "#7a748e", fontWeight: 600, display: "block" }}>Base Amount</span>
            <strong style={{ fontSize: 14.5, marginTop: 3, display: "block" }}>{formatCurrency(invoice.baseAmount)}</strong>
          </div>
          <div style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(140, 95, 248, 0.14)", background: "rgba(255, 255, 255, 0.02)" }}>
            <span style={{ fontSize: 11.5, color: "#7a748e", fontWeight: 600, display: "block" }}>
              GST ({invoice.gstPercentage}%)
            </span>
            <strong style={{ fontSize: 14.5, marginTop: 3, display: "block", color: isTax ? "#8c5ff8" : "#7a748e" }}>
              {formatCurrency(gstAmount)}
            </strong>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div style={{ padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(140, 95, 248, 0.14)", background: "rgba(255, 255, 255, 0.02)" }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#8c5ff8", display: "block", marginBottom: 3 }}>
              Internal Remarks / Notes
            </span>
            <p style={{ margin: 0, fontSize: 13, color: "inherit" }}>{invoice.notes}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 6 }}>
          <button className="sales-btn-secondary" type="button" onClick={() => onDownload(invoice)} style={{ padding: "9px 18px" }}>
            📥 Download TXT / Receipt
          </button>
          <button className="sales-add-btn" type="button" onClick={onClose} style={{ padding: "9px 24px" }}>
            <span>Close</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default function SalesInvoices() {
  const [activeTab, setActiveTab] = useState("All Invoices");
  const [invoices, setInvoices] = useState(initialInvoices);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [notification, setNotification] = useState("");

  const filteredInvoices = useMemo(() => {
    if (activeTab === "All Invoices") return invoices;
    if (activeTab === "Tax Invoices") return invoices.filter((i) => i.invoiceType === "Tax Invoice");
    if (activeTab === "Standard Invoices") return invoices.filter((i) => i.invoiceType === "Invoice");
    if (activeTab === "Personal Invoices") return invoices.filter((i) => i.invoiceType === "Personal");
    return invoices;
  }, [invoices, activeTab]);

  const addInvoice = (newInvoice) => {
    const invWithId = {
      ...newInvoice,
      id: generateInvoiceId(invoices),
    };
    setInvoices((prev) => [invWithId, ...prev]);
    setShowCreateModal(false);
    setNotification(`Invoice ${invWithId.id} created successfully.`);
    setTimeout(() => setNotification(""), 4200);
  };

  const downloadInvoice = (invoice) => {
    const isTax = invoice.invoiceType === "Tax Invoice";
    const { gstAmount, totalAmount } = calculateTotals(invoice.baseAmount, invoice.gstPercentage);
    const fileContent = `
====================================================================
                      AGNI CRM - ${invoice.invoiceType.toUpperCase()}
====================================================================
Invoice Number  : ${invoice.id}
Invoice Type    : ${invoice.invoiceType} ${isTax ? "(Tax Invoice)" : "(Without GST)"}
Client Name     : ${invoice.clientName}
Email           : ${invoice.clientEmail}
Phone           : ${invoice.clientPhone}
${invoice.clientGst ? `GSTIN           : ${invoice.clientGst}\n` : ""}Issue Date      : ${invoice.issueDate}
Due Date        : ${invoice.dueDate}
Status          : ${invoice.status}
--------------------------------------------------------------------
SERVICE DESCRIPTION:
${invoice.serviceDescription}
--------------------------------------------------------------------
Base Amount     : ${formatCurrency(invoice.baseAmount)}
${isTax ? `GST (${invoice.gstPercentage}%)   : ${formatCurrency(gstAmount)}\n` : "GST             : ₹0 (Without GST)\n"}TOTAL AMOUNT    : ${formatCurrency(totalAmount)}
${invoice.notes ? `\nNOTES:\n${invoice.notes}\n` : ""}--------------------------------------------------------------------
Thank you for choosing AgniCRM.
For queries contact: billing@agnicrm.com
====================================================================
`.trim();

    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${invoice.id}_AgniCRM_Invoice.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setNotification(`Invoice ${invoice.id} downloaded successfully.`);
    setTimeout(() => setNotification(""), 4200);
  };

  return (
    <section className="sales-page-view">
      <div className="sales-header-banner">
        <div className="sales-header-info">
          <p className="sales-header-eyebrow">
            Billing & Invoicing
          </p>
          <h1 className="sales-header-title">
            My Invoices
          </h1>
          <p className="sales-header-subtitle">
            Generate and track B2B Tax Invoices, standard non-GST Invoices, and Personal invoices for acquired client accounts.
          </p>
        </div>

        <button
          type="button"
          className="sales-add-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>
          <span>Create Invoice</span>
        </button>
      </div>

      {/* Tabs Switcher */}
      <div className="sales-tabs-switcher" style={{ marginBottom: 18 }}>
        {INVOICE_TABS.map((tab) => {
          const isActive = activeTab === tab;
          const count =
            tab === "All Invoices"
              ? invoices.length
              : tab === "Tax Invoices"
              ? invoices.filter((i) => i.invoiceType === "Tax Invoice").length
              : tab === "Standard Invoices"
              ? invoices.filter((i) => i.invoiceType === "Invoice").length
              : invoices.filter((i) => i.invoiceType === "Personal").length;

          return (
            <button
              key={tab}
              type="button"
              className={`sales-tab-btn ${isActive ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              <span>{tab}</span>
              <span className="sales-tab-count">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {notification ? (
        <div className="sales-notification-banner">
          <span>{notification}</span>
          <button
            type="button"
            onClick={() => setNotification("")}
          >
            ✕
          </button>
        </div>
      ) : null}

      <div className="analytics-card sales-table-card">
        <div className="sales-table-scroll">
          <table className="sales-clients-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Client Name</th>
              <th>Invoice Type</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => {
              const { totalAmount } = calculateTotals(invoice.baseAmount, invoice.gstPercentage);
              return (
                <tr key={invoice.id}>
                  <td><strong>{invoice.id}</strong></td>
                  <td>{invoice.clientName}</td>
                  <td>{invoice.invoiceType}</td>
                  <td>{invoice.issueDate}</td>
                  <td>{invoice.dueDate}</td>
                  <td><strong>{formatCurrency(totalAmount)}</strong></td>
                  <td>
                    <span
                      className={`stage-tag ${invoice.status === "Paid" ? "active" : "prospect"}`}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: 999, background: "currentColor" }} />
                      {invoice.status}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: 8 }}>
                      <button className="sales-view-btn" type="button" onClick={() => setSelectedInvoice(invoice)}>
                        <Icon name="eye" size={13} />
                        <span>View</span>
                      </button>
                      <button className="sales-btn-secondary" style={{ padding: "6px 12px", fontSize: 12 }} type="button" onClick={() => downloadInvoice(invoice)}>
                        <span>Download</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filteredInvoices.length === 0 && (
              <tr>
                <td colSpan={8} className="sales-empty-cell">
                  No invoices found under {activeTab}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>

      {showCreateModal && (
        <CreateInvoiceModal
          clients={mockClients}
          onClose={() => setShowCreateModal(false)}
          onSubmit={addInvoice}
        />
      )}

      {selectedInvoice && (
        <InvoiceDetailsModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          onDownload={downloadInvoice}
        />
      )}
    </section>
  );
}
