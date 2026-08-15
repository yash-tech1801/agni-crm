import React, { useMemo, useState } from "react";
import Modal from "../../components/Modal";
import { mockClients } from "./mockClients";

const INVOICE_TABS = ["All Invoices", "Tax Invoices", "Personal Invoices"];
const INVOICE_TYPES = ["Tax Invoice", "Personal"];

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
];

const statusBadge = {
  Paid: "#44bfb0",
  Pending: "#f2aa38",
  Overdue: "#ff5757",
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
      <div style={{ display: "grid", gap: 18, minWidth: 320, maxWidth: 680 }}>
        {!selectedType ? (
          <div style={{ display: "grid", gap: 14 }}>
            <p className="dashboard-eyebrow">Select invoice type</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
              {INVOICE_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  className="table-action"
                  style={{
                    minHeight: 120,
                    display: "grid",
                    placeItems: "center",
                    padding: 18,
                    borderRadius: 20,
                    border: "1px solid #e7e7f5",
                    background: "#fff",
                    color: "#1d2330",
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                  onClick={() => handleSelectType(type)}
                >
                  <div>
                    <div>{type}</div>
                    <small style={{ color: "#7a748e", fontWeight: 400, marginTop: 4, display: "block" }}>
                      {type === "Tax Invoice" ? "With 18% GST (B2B)" : "GST Exempt (B2C)"}
                    </small>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div>
                <p className="dashboard-eyebrow">{selectedType}</p>
                <h2 style={{ margin: 0 }}>
                  {selectedType === "Tax Invoice" ? "Generate Tax Invoice" : "Generate Personal Invoice"}
                </h2>
              </div>
              <button className="table-action" type="button" onClick={() => setSelectedType("")}>
                Change type
              </button>
            </div>

            <label className="field-label">
              Client
              <select name="clientId" value={formData.clientId} onChange={handleChange} required>
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
                  <input type="text" value="0% (Exempt)" disabled readOnly />
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
            <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              <div>
                <p className="eyebrow" style={{ margin: "0 0 4px" }}>Base</p>
                <strong>{formatCurrency(formData.baseAmount || 0)}</strong>
              </div>
              <div>
                <p className="eyebrow" style={{ margin: "0 0 4px" }}>GST ({gstRate}%)</p>
                <strong>{formatCurrency(gstAmount)}</strong>
              </div>
              <div>
                <p className="eyebrow" style={{ margin: "0 0 4px" }}>Total Payable</p>
                <strong style={{ color: "#4e7cff" }}>{formatCurrency(totalAmount)}</strong>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: 10, marginTop: 4 }}>
              <button className="table-action" type="button" onClick={onClose}>
                Cancel
              </button>
              <button
                className="primary-button"
                type="button"
                onClick={handleSubmit}
                disabled={!formData.serviceDescription.trim() || !formData.baseAmount}
              >
                Create Invoice
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

  return (
    <Modal title={`Invoice ${invoice.id}`} onClose={onClose} closeLabel="Close">
      <div style={{ display: "grid", gap: 18, maxWidth: 680 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <p className="eyebrow">Client</p>
              <strong>{invoice.clientName}</strong>
            </div>
            <div>
              <p className="eyebrow">Invoice Type</p>
              <strong>{invoice.invoiceType}</strong>
            </div>
            <div>
              <p className="eyebrow">Status</p>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "4px 10px",
                  borderRadius: 999,
                  background: `${statusBadge[invoice.status] || "#f2aa38"}22`,
                  color: statusBadge[invoice.status] || "#f2aa38",
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                {invoice.status}
              </span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
            <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
              <p className="eyebrow">Issue Date</p>
              <strong>{invoice.issueDate}</strong>
            </div>
            <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
              <p className="eyebrow">Due Date</p>
              <strong>{invoice.dueDate}</strong>
            </div>
            <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
              <p className="eyebrow">Total Amount</p>
              <strong style={{ color: "#4e7cff" }}>{formatCurrency(totalAmount)}</strong>
            </div>
          </div>
        </div>

        <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
          <p className="eyebrow">Service Description</p>
          <div>{invoice.serviceDescription}</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
          <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
            <p className="eyebrow">Base Amount</p>
            <strong>{formatCurrency(invoice.baseAmount)}</strong>
          </div>
          <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
            <p className="eyebrow">GST ({invoice.gstPercentage}%)</p>
            <strong>{formatCurrency(gstAmount)}</strong>
          </div>
        </div>

        {invoice.notes && (
          <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
            <p className="eyebrow">Notes</p>
            <div>{invoice.notes}</div>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button className="table-action" type="button" onClick={() => onDownload(invoice)}>
            Download TXT / Receipt
          </button>
          <button className="primary-button" type="button" onClick={onClose}>
            Close
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

    setNotification(`Invoice ${invoice.id} downloaded successfully.`);
    setTimeout(() => setNotification(""), 4200);
  };

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
        <div>
          <p className="dashboard-eyebrow">Invoices</p>
          <h1>My Invoices</h1>
        </div>
        <button type="button" className="primary-button" onClick={() => setShowCreateModal(true)}>
          + Create Invoice
        </button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
        {INVOICE_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className="table-action"
            style={{
              background: activeTab === tab ? "#4e7cff" : "#fff",
              color: activeTab === tab ? "#fff" : "#1d2330",
              border: activeTab === tab ? "1px solid #4e7cff" : "1px solid #e7e7f5",
              minWidth: 170,
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {notification ? (
        <div style={{ marginBottom: 18, padding: 16, borderRadius: 16, background: "#e7f6ff", color: "#175f8f", border: "1px solid #c7e5f7" }}>
          {notification}
        </div>
      ) : null}

      <div style={{ overflowX: "auto" }}>
        <table className="clients-table" style={{ minWidth: 900 }}>
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
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "6px 10px",
                        borderRadius: 999,
                        background: `${statusBadge[invoice.status] || "#f2aa38"}22`,
                        color: statusBadge[invoice.status] || "#f2aa38",
                        fontWeight: 700,
                        fontSize: 12,
                      }}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: 8 }}>
                      <button className="table-action" type="button" onClick={() => setSelectedInvoice(invoice)}>
                        View
                      </button>
                      <button className="table-action" type="button" onClick={() => downloadInvoice(invoice)}>
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filteredInvoices.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: "36px 16px", color: "#6b6b77" }}>
                  No invoices found under {activeTab}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
