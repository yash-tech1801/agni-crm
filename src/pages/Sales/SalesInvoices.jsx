import React, { useMemo, useState } from "react";
import Icon from "../../components/Icon";
import { mockClients } from "./mockClients";

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
    issueDate: "2026-07-10",
    dueDate: "2026-07-25",
    status: "Paid",
    createdBy: "Sales Person",
    notes: "IT infrastructure setup and annual maintenance.",
  },
];

function formatCurrency(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN");
}

function calculateTotals(baseAmount, gstPercentage) {
  const gstAmount = (Number(baseAmount) * Number(gstPercentage)) / 100;
  const totalAmount = Number(baseAmount) + gstAmount;
  return { gstAmount, totalAmount };
}

function generateInvoiceId(existingInvoices) {
  const year = new Date().getFullYear();
  const maxNum = existingInvoices.reduce((max, inv) => {
    const match = inv.id.match(/INV-\d{4}-(\d+)/);
    const num = match ? parseInt(match[1], 10) : 0;
    return Math.max(max, num);
  }, 0);
  const nextNum = String(maxNum + 1).padStart(3, "0");
  return `INV-${year}-${nextNum}`;
}

function CreateInvoiceModal({ clients, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    invoiceType: "Tax Invoice",
    clientId: clients[0]?.id ?? "",
    serviceDescription: "",
    baseAmount: "",
    gstPercentage: 18,
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    status: "Pending",
    notes: "",
  });

  const selectedClient = clients.find((c) => c.id === Number(formData.clientId));

  const { gstAmount, totalAmount } = calculateTotals(
    formData.baseAmount || 0,
    formData.invoiceType === "Tax Invoice" ? formData.gstPercentage : 0
  );

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleInvoiceTypeChange(type) {
    setFormData((prev) => ({
      ...prev,
      invoiceType: type,
      gstPercentage: type === "Tax Invoice" ? 18 : 0,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formData.clientId || !formData.serviceDescription || !formData.baseAmount) {
      return;
    }

    const invoice = {
      ...formData,
      clientName: selectedClient?.name ?? "",
      clientEmail: selectedClient?.email ?? "",
      clientPhone: selectedClient?.phone ?? "",
      clientGst: selectedClient?.documentDetails?.find((d) => d.label === "GST Number")?.value ?? "",
      baseAmount: Number(formData.baseAmount),
      gstPercentage: formData.invoiceType === "Tax Invoice" ? Number(formData.gstPercentage) : 0,
    };

    onSubmit(invoice);
  }

  return (
    <div className="cd-modal-backdrop" onMouseDown={onClose}>
      <section
        className="cd-modal"
        style={{ maxWidth: 720, maxHeight: "calc(100vh - 40px)", overflowY: "auto" }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button type="button" className="cd-modal-close" onClick={onClose}>
          ×
        </button>
        <p className="cd-modal-desc" style={{ color: "#9a74e9", fontSize: 13, fontWeight: 600, letterSpacing: 0.5 }}>
          CREATE NEW INVOICE
        </p>
        <h2 style={{ marginBottom: 6 }}>Generate Invoice</h2>
        <p className="cd-modal-desc" style={{ marginBottom: 20 }}>
          Choose invoice type and fill in the details below.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
          <div>
            <label className="field-label" style={{ marginBottom: 10, display: "block" }}>
              Invoice Type
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <button
                type="button"
                onClick={() => handleInvoiceTypeChange("Tax Invoice")}
                style={{
                  padding: 16,
                  borderRadius: 14,
                  border: formData.invoiceType === "Tax Invoice" ? "2px solid #4e7cff" : "1px solid #e7e7f5",
                  background: formData.invoiceType === "Tax Invoice" ? "rgba(78, 124, 255, 0.06)" : "#fff",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "rgba(78, 124, 255, 0.14)", color: "#4e7cff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon name="invoice" size={18} />
                  </div>
                  <strong style={{ fontSize: 15 }}>Tax Invoice</strong>
                </div>
                <small style={{ color: "#6b6b77" }}>With GST for registered businesses</small>
              </button>

              <button
                type="button"
                onClick={() => handleInvoiceTypeChange("Personal")}
                style={{
                  padding: 16,
                  borderRadius: 14,
                  border: formData.invoiceType === "Personal" ? "2px solid #9a74e9" : "1px solid #e7e7f5",
                  background: formData.invoiceType === "Personal" ? "rgba(154, 116, 233, 0.06)" : "#fff",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "rgba(154, 116, 233, 0.14)", color: "#9a74e9",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon name="invoice" size={18} />
                  </div>
                  <strong style={{ fontSize: 15 }}>Personal</strong>
                </div>
                <small style={{ color: "#6b6b77" }}>No GST for individual clients</small>
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <label className="field-label">
              Client
              <select
                name="clientId"
                value={formData.clientId}
                onChange={handleChange}
                required
              >
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name} ({client.company})
                  </option>
                ))}
              </select>
            </label>

            <label className="field-label">
              Invoice Status
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </label>
          </div>

          <label className="field-label">
            Service / Policy Description
            <textarea
              name="serviceDescription"
              value={formData.serviceDescription}
              onChange={handleChange}
              placeholder="e.g. Annual Health Insurance Premium - Group Plan"
              rows={3}
              required
              style={{ resize: "vertical" }}
            />
          </label>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <label className="field-label">
              Base Amount (₹)
              <input
                type="number"
                name="baseAmount"
                value={formData.baseAmount}
                onChange={handleChange}
                placeholder="50000"
                min="0"
                step="1"
                required
              />
            </label>

            {formData.invoiceType === "Tax Invoice" ? (
              <label className="field-label">
                GST Percentage (%)
                <input
                  type="number"
                  name="gstPercentage"
                  value={formData.gstPercentage}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.01"
                />
              </label>
            ) : (
              <div />
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <label className="field-label">
              Issue Date
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field-label">
              Due Date
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label className="field-label">
            Notes (optional)
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional notes or payment terms..."
              rows={2}
              style={{ resize: "vertical" }}
            />
          </label>

          <div
            style={{
              padding: 18,
              borderRadius: 14,
              background: formData.invoiceType === "Tax Invoice"
                ? "rgba(78, 124, 255, 0.06)"
                : "rgba(154, 116, 233, 0.06)",
              border: formData.invoiceType === "Tax Invoice"
                ? "1px solid rgba(78, 124, 255, 0.2)"
                : "1px solid rgba(154, 116, 233, 0.2)",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              <div>
                <p style={{ margin: 0, fontSize: 12, color: "#6b6b77" }}>Base Amount</p>
                <strong style={{ fontSize: 17 }}>{formatCurrency(formData.baseAmount || 0)}</strong>
              </div>
              {formData.invoiceType === "Tax Invoice" && (
                <div>
                  <p style={{ margin: 0, fontSize: 12, color: "#6b6b77" }}>GST ({formData.gstPercentage}%)</p>
                  <strong style={{ fontSize: 17 }}>{formatCurrency(gstAmount)}</strong>
                </div>
              )}
              <div>
                <p style={{ margin: 0, fontSize: 12, color: "#6b6b77" }}>Total Amount</p>
                <strong style={{ fontSize: 17, color: formData.invoiceType === "Tax Invoice" ? "#4e7cff" : "#9a74e9" }}>
                  {formatCurrency(totalAmount)}
                </strong>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 6 }}>
            <button
              type="button"
              className="table-action"
              onClick={onClose}
              style={{ border: "1px solid #e7e7f5", background: "#fff", color: "#1d2330" }}
            >
              Cancel
            </button>
            <button type="submit" className="primary-button">
              ✓ Create Invoice
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function InvoiceDetailsModal({ invoice, onClose, onDownload }) {
  const { gstAmount, totalAmount } = calculateTotals(invoice.baseAmount, invoice.gstPercentage);

  return (
    <div className="cd-modal-backdrop" onMouseDown={onClose}>
      <section
        className="cd-modal"
        style={{ maxWidth: 640, maxHeight: "calc(100vh - 40px)", overflowY: "auto" }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button type="button" className="cd-modal-close" onClick={onClose}>
          ×
        </button>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span className={`cd-doc-status-badge ${invoice.status === "Paid" ? "verified" : invoice.status === "Pending" ? "pending" : "warning"}`}>
            {invoice.status}
          </span>
          <span
            className="cd-doc-status-badge"
            style={{
              background: invoice.invoiceType === "Tax Invoice" ? "rgba(78, 124, 255, 0.12)" : "rgba(154, 116, 233, 0.12)",
              color: invoice.invoiceType === "Tax Invoice" ? "#4e7cff" : "#9a74e9",
            }}
          >
            {invoice.invoiceType}
          </span>
        </div>
        <h2 style={{ marginBottom: 4 }}>{invoice.id}</h2>
        <p className="cd-modal-desc" style={{ marginBottom: 20 }}>
          {invoice.serviceDescription}
        </p>

        <div className="cd-scheme-meta-box" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: 20 }}>
          <div>
            <span>Client Name</span>
            <strong>{invoice.clientName}</strong>
          </div>
          <div>
            <span>Contact</span>
            <strong>{invoice.clientPhone}</strong>
          </div>
          <div>
            <span>Email</span>
            <strong>{invoice.clientEmail}</strong>
          </div>
          {invoice.clientGst && (
            <div>
              <span>GSTIN</span>
              <strong>{invoice.clientGst}</strong>
            </div>
          )}
          <div>
            <span>Issue Date</span>
            <strong>{invoice.issueDate}</strong>
          </div>
          <div>
            <span>Due Date</span>
            <strong>{invoice.dueDate}</strong>
          </div>
        </div>

        <div
          style={{
            padding: 18,
            borderRadius: 14,
            background: invoice.invoiceType === "Tax Invoice"
              ? "rgba(78, 124, 255, 0.06)"
              : "rgba(154, 116, 233, 0.06)",
            border: invoice.invoiceType === "Tax Invoice"
              ? "1px solid rgba(78, 124, 255, 0.2)"
              : "1px solid rgba(154, 116, 233, 0.2)",
            marginBottom: 20,
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <p style={{ margin: 0, fontSize: 12, color: "#6b6b77" }}>Base Amount</p>
              <strong style={{ fontSize: 17 }}>{formatCurrency(invoice.baseAmount)}</strong>
            </div>
            {invoice.invoiceType === "Tax Invoice" && (
              <div>
                <p style={{ margin: 0, fontSize: 12, color: "#6b6b77" }}>GST ({invoice.gstPercentage}%)</p>
                <strong style={{ fontSize: 17 }}>{formatCurrency(gstAmount)}</strong>
              </div>
            )}
            <div style={{ gridColumn: invoice.invoiceType === "Tax Invoice" ? "1 / -1" : "2 / 3" }}>
              <p style={{ margin: 0, fontSize: 12, color: "#6b6b77" }}>Total Amount</p>
              <strong style={{ fontSize: 20, color: invoice.invoiceType === "Tax Invoice" ? "#4e7cff" : "#9a74e9" }}>
                {formatCurrency(totalAmount)}
              </strong>
            </div>
          </div>
        </div>

        {invoice.notes && (
          <div style={{ marginBottom: 20 }}>
            <p style={{ margin: 0, fontSize: 12, color: "#6b6b77", marginBottom: 6 }}>Notes</p>
            <p style={{ margin: 0, fontSize: 14, color: "#1d2330" }}>{invoice.notes}</p>
          </div>
        )}

        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button
            type="button"
            className="cd-table-action-btn"
            style={{ background: "rgba(68, 191, 176, 0.1)", color: "#44bfb0", borderColor: "rgba(68, 191, 176, 0.3)" }}
            onClick={() => onDownload(invoice)}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: 4 }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download
          </button>
          <button type="button" className="table-action" onClick={onClose}>
            Close
          </button>
        </div>
      </section>
    </div>
  );
}

export default function SalesInvoices() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [notification, setNotification] = useState("");
  const [filterType, setFilterType] = useState("All");

  const filteredInvoices = useMemo(() => {
    if (filterType === "All") return invoices;
    return invoices.filter((inv) => inv.invoiceType === filterType);
  }, [invoices, filterType]);

  const metrics = useMemo(() => {
    let totalBase = 0;
    let totalGst = 0;
    let pendingCount = 0;
    let paidCount = 0;

    invoices.forEach((inv) => {
      totalBase += Number(inv.baseAmount);
      const { gstAmount } = calculateTotals(inv.baseAmount, inv.gstPercentage);
      totalGst += gstAmount;
      if (inv.status === "Pending") pendingCount++;
      if (inv.status === "Paid") paidCount++;
    });

    return {
      totalBase,
      totalGst,
      totalAmount: totalBase + totalGst,
      pendingCount,
      paidCount,
    };
  }, [invoices]);

  const addInvoice = (invoiceData) => {
    const newInvoice = {
      id: generateInvoiceId(invoices),
      ...invoiceData,
    };
    setInvoices((prev) => [newInvoice, ...prev]);
    setShowCreateModal(false);
    setNotification(`Invoice ${newInvoice.id} created successfully!`);
    setTimeout(() => setNotification(""), 4200);
  };

  const downloadInvoice = (invoice) => {
    const { gstAmount, totalAmount } = calculateTotals(invoice.baseAmount, invoice.gstPercentage);
    const fileContent = `
====================================================================
                      AGNI CRM - ${invoice.invoiceType.toUpperCase()}
====================================================================
Invoice Number  : ${invoice.id}
Invoice Type    : ${invoice.invoiceType}
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
${invoice.invoiceType === "Tax Invoice" ? `GST (${invoice.gstPercentage}%)   : ${formatCurrency(gstAmount)}\n` : ""}TOTAL AMOUNT    : ${formatCurrency(totalAmount)}
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

    setNotification(`Invoice ${invoice.id} downloaded successfully!`);
    setTimeout(() => setNotification(""), 4200);
  };

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
        <div>
          <p className="dashboard-eyebrow">Invoices</p>
          <h1>Invoice Management</h1>
        </div>
        <button type="button" className="primary-button" onClick={() => setShowCreateModal(true)}>
          + Create Invoice
        </button>
      </div>

      <div className="scheme-grid" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))", marginBottom: 24 }}>
        <article className="kpi-card">
          <div className="kpi-card-accent" style={{ background: "#4e7cff" }} />
          <div>
            <span className="kpi-card-label">Total Invoices</span>
            <h3 className="kpi-card-value">{invoices.length}</h3>
            <span className="kpi-card-trend">Issued</span>
          </div>
        </article>
        <article className="kpi-card">
          <div className="kpi-card-accent" style={{ background: "#44bfb0" }} />
          <div>
            <span className="kpi-card-label">Total Billed</span>
            <h3 className="kpi-card-value">{formatCurrency(metrics.totalAmount)}</h3>
            <span className="kpi-card-trend">Base + GST</span>
          </div>
        </article>
        <article className="kpi-card">
          <div className="kpi-card-accent" style={{ background: "#f2aa38" }} />
          <div>
            <span className="kpi-card-label">Pending</span>
            <h3 className="kpi-card-value">{metrics.pendingCount}</h3>
            <span className="kpi-card-trend">Awaiting Payment</span>
          </div>
        </article>
        <article className="kpi-card">
          <div className="kpi-card-accent" style={{ background: "#9a74e9" }} />
          <div>
            <span className="kpi-card-label">Paid</span>
            <h3 className="kpi-card-value">{metrics.paidCount}</h3>
            <span className="kpi-card-trend">Completed</span>
          </div>
        </article>
      </div>

      {notification ? (
        <div style={{ marginBottom: 18, padding: 16, borderRadius: 16, background: "#e7f6ff", color: "#175f8f", border: "1px solid #c7e5f7" }}>
          {notification}
        </div>
      ) : null}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
        {["All", "Tax Invoice", "Personal"].map((type) => (
          <button
            key={type}
            type="button"
            className="table-action"
            style={{
              background: filterType === type ? (type === "All" ? "#1d2330" : type === "Tax Invoice" ? "#4e7cff" : "#9a74e9") : "#fff",
              color: filterType === type ? "#fff" : "#1d2330",
              border: filterType === type ? "1px solid transparent" : "1px solid #e7e7f5",
              minWidth: 140,
            }}
            onClick={() => setFilterType(type)}
          >
            {type === "All" ? "All Invoices" : type}
            <span style={{ marginLeft: 8, fontSize: 12, opacity: 0.8 }}>
              ({type === "All" ? invoices.length : invoices.filter((i) => i.invoiceType === type).length})
            </span>
          </button>
        ))}
      </div>

      <div className="cd-section-card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="cd-section-head" style={{ padding: "24px 28px 16px", margin: 0 }}>
          <div>
            <span className="cd-kicker">INVOICE RECORDS</span>
            <h2 style={{ fontSize: 20 }}>
              {filterType === "All" ? "All Invoices" : `${filterType}s`}
            </h2>
          </div>
          <span className="cd-count-pill">{filteredInvoices.length} records</span>
        </div>

        <div className="cd-table-wrap">
          <table className="cd-invoices-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Type</th>
                <th>Client</th>
                <th>Service</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => {
                const { totalAmount } = calculateTotals(invoice.baseAmount, invoice.gstPercentage);
                return (
                  <tr key={invoice.id}>
                    <td>
                      <strong className="cd-inv-id">{invoice.id}</strong>
                    </td>
                    <td>
                      <span
                        className="cd-doc-status-badge"
                        style={{
                          background: invoice.invoiceType === "Tax Invoice" ? "rgba(78, 124, 255, 0.12)" : "rgba(154, 116, 233, 0.12)",
                          color: invoice.invoiceType === "Tax Invoice" ? "#4e7cff" : "#9a74e9",
                        }}
                      >
                        {invoice.invoiceType}
                      </span>
                    </td>
                    <td>
                      <strong>{invoice.clientName}</strong>
                    </td>
                    <td style={{ maxWidth: 240 }}>
                      {invoice.serviceDescription.length > 50
                        ? invoice.serviceDescription.slice(0, 50) + "..."
                        : invoice.serviceDescription}
                    </td>
                    <td>{invoice.issueDate}</td>
                    <td>{invoice.dueDate}</td>
                    <td>
                      <strong className="cd-inv-amount">{formatCurrency(totalAmount)}</strong>
                    </td>
                    <td>
                      <span className={`cd-doc-status-badge ${
                        invoice.status === "Paid" ? "verified" :
                        invoice.status === "Pending" ? "pending" :
                        invoice.status === "Overdue" ? "warning" : "rejected"
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          type="button"
                          className="cd-table-action-btn"
                          onClick={() => setSelectedInvoice(invoice)}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="cd-table-action-btn"
                          style={{ background: "rgba(68, 191, 176, 0.1)", color: "#44bfb0", borderColor: "rgba(68, 191, 176, 0.3)" }}
                          onClick={() => downloadInvoice(invoice)}
                          title="Download Invoice"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan="9" style={{ padding: "48px 20px", textAlign: "center", color: "#6b6b77" }}>
                    <div style={{ marginBottom: 12 }}>
                      <Icon name="invoice" size={40} />
                    </div>
                    <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#1d2330" }}>No invoices found</p>
                    <p style={{ margin: "6px 0 16px", fontSize: 13 }}>
                      {filterType === "All" ? "Click 'Create Invoice' to generate your first invoice." : `No ${filterType.toLowerCase()} invoices yet.`}
                    </p>
                    <button
                      type="button"
                      className="primary-button"
                      onClick={() => setShowCreateModal(true)}
                    >
                      + Create Invoice
                    </button>
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
