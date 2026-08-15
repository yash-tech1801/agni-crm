import React, { useMemo, useState } from "react";
import Modal from "../../components/Modal";
import { mockClients } from "./mockClients";

const PAYMENT_TABS = ["All Records", "Payment Requests", "Completed Payments"];
const PAYMENT_MODES = ["Bank Transfer", "UPI", "Cheque", "Online Gateway"];

const initialPayments = [
  {
    id: "PAY-2026-001",
    clientId: 1,
    clientName: "Bright Retail",
    clientEmail: "hello@brightretail.com",
    clientPhone: "+91 98765 32100",
    clientCompany: "Bright Retail Pvt Ltd",
    type: "Payment",
    amount: 42000,
    paymentMode: "Bank Transfer",
    transactionRef: "NEFT-AB1234567890",
    date: "2026-08-02",
    dueDate: "2026-08-15",
    status: "Paid",
    relatedInvoice: "INV-2026-001",
    description: "Full payment against Corporate Health Shield annual premium.",
    receivedBy: "Sales Person",
  },
  {
    id: "PAY-2026-002",
    clientId: 2,
    clientName: "Urban Foods",
    clientEmail: "sales@urbanfoods.com",
    clientPhone: "+91 91234 55678",
    clientCompany: "Urban Foods Ltd",
    type: "Payment",
    amount: 30000,
    paymentMode: "UPI",
    transactionRef: "UPI-987654321012",
    date: "2026-07-22",
    dueDate: "2026-08-05",
    status: "Paid",
    relatedInvoice: "INV-2026-002",
    description: "50% advance for Brand Growth Suite activation.",
    receivedBy: "Sales Person",
  },
  {
    id: "REQ-2026-003",
    clientId: 3,
    clientName: "Nova Textiles",
    clientEmail: "contact@novatextiles.com",
    clientPhone: "+91 99876 44556",
    clientCompany: "Nova Textiles Co",
    type: "Payment Request",
    amount: 85000,
    paymentMode: "Bank Transfer",
    transactionRef: "IMPS-5544332211",
    date: "2026-07-11",
    dueDate: "2026-07-25",
    status: "Paid",
    relatedInvoice: "INV-2026-003",
    description: "Enterprise IT Infra Shield setup + 1 year AMC.",
    receivedBy: "Sales Person",
  },
  {
    id: "REQ-2026-004",
    clientId: 4,
    clientName: "Peak Logistics",
    clientEmail: "contact@peaklogistics.com",
    clientPhone: "+91 90123 45678",
    clientCompany: "Peak Logistics Pvt Ltd",
    type: "Payment Request",
    amount: 54000,
    paymentMode: "Cheque",
    transactionRef: "",
    date: "2026-08-05",
    dueDate: "2026-08-20",
    status: "Requested",
    relatedInvoice: "INV-2026-004",
    description: "Fleet Comprehensive Cover - annual premium, payable via A/C payee cheque.",
    receivedBy: "Sales Person",
  },
  {
    id: "REQ-2026-005",
    clientId: 1,
    clientName: "Bright Retail",
    clientEmail: "hello@brightretail.com",
    clientPhone: "+91 98765 32100",
    clientCompany: "Bright Retail Pvt Ltd",
    type: "Payment Request",
    amount: 18500,
    paymentMode: "UPI",
    transactionRef: "",
    date: "2026-08-08",
    dueDate: "2026-08-22",
    status: "Requested",
    relatedInvoice: "INV-2026-005",
    description: "Add-on rider - critical illness cover for 12 employees.",
    receivedBy: "Sales Person",
  },
];

const statusBadge = {
  Paid: "#44bfb0",
  Requested: "#f2aa38",
  Pending: "#f2aa38",
  Overdue: "#ff5757",
  Cancelled: "#7c8490",
};

const formatCurrency = (val) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

const generatePaymentId = (existing) => {
  const nextNum = existing.length + 1;
  return `REQ-2026-${String(nextNum).padStart(3, "0")}`;
};

function CreatePaymentRequestModal({ clients, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    clientId: clients[0]?.id ? String(clients[0].id) : "",
    amount: "",
    paymentMode: "Bank Transfer",
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    relatedInvoice: "",
    description: "",
  });

  const selectedClient = useMemo(
    () => clients.find((client) => String(client.id) === String(formData.clientId)),
    [clients, formData.clientId]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!formData.amount || Number(formData.amount) <= 0) {
      return;
    }

    const request = {
      id: generatePaymentId([]),
      clientId: selectedClient ? selectedClient.id : 1,
      clientName: selectedClient?.name ?? "Client",
      clientEmail: selectedClient?.email ?? "",
      clientPhone: selectedClient?.phone ?? "",
      clientCompany: selectedClient?.company ?? "",
      type: "Payment Request",
      amount: Number(formData.amount),
      paymentMode: formData.paymentMode,
      transactionRef: "",
      date: new Date().toISOString().split("T")[0],
      dueDate: formData.dueDate,
      status: "Requested",
      relatedInvoice: formData.relatedInvoice || "INV-2026-001",
      description: formData.description || "Payment demand for outstanding contract milestone.",
      receivedBy: "Sales Person",
    };

    onSubmit(request);
    onClose();
  };

  return (
    <Modal title="Create Payment Request" onClose={onClose} closeLabel="Close">
      <div style={{ display: "grid", gap: 18, minWidth: 320, maxWidth: 680 }}>
        <div style={{ display: "grid", gap: 18 }}>
          <div>
            <p className="dashboard-eyebrow">Payment Demand</p>
            <h2 style={{ margin: 0 }}>Issue Payment Request</h2>
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

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <label className="field-label">
              Requested Amount (₹)
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="e.g. 25000"
                min="1"
                required
              />
            </label>

            <label className="field-label">
              Preferred Payment Mode
              <select name="paymentMode" value={formData.paymentMode} onChange={handleChange}>
                {PAYMENT_MODES.map((mode) => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>
            </label>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <label className="field-label">
              Due Date
              <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
            </label>

            <label className="field-label">
              Related Invoice (optional)
              <input
                type="text"
                name="relatedInvoice"
                value={formData.relatedInvoice}
                onChange={handleChange}
                placeholder="e.g. INV-2026-008"
              />
            </label>
          </div>

          <label className="field-label">
            Description / Reason for Request
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Explain the payment installment or purpose"
              style={{ resize: "vertical", minHeight: 90, padding: 12, borderRadius: 8, border: "1px solid #dedfe1", font: "inherit" }}
            />
          </label>

          {/* Live Summary Box */}
          <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <p className="eyebrow" style={{ margin: "0 0 4px" }}>Total Demand</p>
              <strong style={{ color: "#4e7cff", fontSize: 17 }}>{formatCurrency(formData.amount || 0)}</strong>
            </div>
            <div>
              <p className="eyebrow" style={{ margin: "0 0 4px" }}>Payment Method</p>
              <strong>{formData.paymentMode}</strong>
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
              disabled={!formData.amount || Number(formData.amount) <= 0}
            >
              Create Request
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function PaymentDetailsModal({ payment, onClose, onDownload }) {
  if (!payment) return null;

  return (
    <Modal title={`Payment Record ${payment.id}`} onClose={onClose} closeLabel="Close">
      <div style={{ display: "grid", gap: 18, maxWidth: 680 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <p className="eyebrow">Client</p>
              <strong>{payment.clientName}</strong>
            </div>
            <div>
              <p className="eyebrow">Record Type</p>
              <strong>{payment.type}</strong>
            </div>
            <div>
              <p className="eyebrow">Status</p>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "4px 10px",
                  borderRadius: 999,
                  background: `${statusBadge[payment.status] || "#f2aa38"}22`,
                  color: statusBadge[payment.status] || "#f2aa38",
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                {payment.status}
              </span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
            <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
              <p className="eyebrow">Amount</p>
              <strong style={{ color: "#4e7cff" }}>{formatCurrency(payment.amount)}</strong>
            </div>
            <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
              <p className="eyebrow">Payment Mode</p>
              <strong>{payment.paymentMode}</strong>
            </div>
            <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
              <p className="eyebrow">Date</p>
              <strong>{payment.date || payment.dueDate}</strong>
            </div>
          </div>
        </div>

        <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
          <p className="eyebrow">Description</p>
          <div>{payment.description}</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
          <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
            <p className="eyebrow">Related Invoice</p>
            <strong>{payment.relatedInvoice || "N/A"}</strong>
          </div>
          <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
            <p className="eyebrow">Transaction Reference</p>
            <strong>{payment.transactionRef || "Pending Settlement"}</strong>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button className="table-action" type="button" onClick={() => onDownload(payment)}>
            Download Receipt
          </button>
          <button className="primary-button" type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default function SalesPayments() {
  const [activeTab, setActiveTab] = useState("All Records");
  const [payments, setPayments] = useState(initialPayments);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [notification, setNotification] = useState("");

  const filteredPayments = useMemo(() => {
    if (activeTab === "All Records") return payments;
    if (activeTab === "Payment Requests") return payments.filter((p) => p.type === "Payment Request" || p.status === "Requested");
    if (activeTab === "Completed Payments") return payments.filter((p) => p.status === "Paid");
    return payments;
  }, [payments, activeTab]);

  const addPaymentRequest = (newReq) => {
    const reqWithId = {
      ...newReq,
      id: generatePaymentId(payments),
    };
    setPayments((prev) => [reqWithId, ...prev]);
    setShowCreateModal(false);
    setNotification(`Payment request ${reqWithId.id} created successfully.`);
    setTimeout(() => setNotification(""), 4200);
  };

  const markAsPaid = (paymentId) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === paymentId
          ? {
              ...p,
              status: "Paid",
              type: "Payment",
              transactionRef: `SETTLED-${Math.floor(100000 + Math.random() * 900000)}`,
            }
          : p
      )
    );
    setNotification(`Payment ${paymentId} marked as Paid.`);
    setTimeout(() => setNotification(""), 4200);
  };

  const downloadReceipt = (payment) => {
    const fileContent = `
====================================================================
                      AGNI CRM - PAYMENT RECEIPT
====================================================================
Receipt ID      : ${payment.id}
Record Type     : ${payment.type}
Client Name     : ${payment.clientName}
Company         : ${payment.clientCompany}
Email           : ${payment.clientEmail}
Phone           : ${payment.clientPhone}
Date            : ${payment.date}
Due Date        : ${payment.dueDate || payment.date}
Payment Mode    : ${payment.paymentMode}
Transaction Ref : ${payment.transactionRef || "N/A"}
Status          : ${payment.status}
--------------------------------------------------------------------
PURPOSE:
${payment.description}
--------------------------------------------------------------------
AMOUNT          : ${formatCurrency(payment.amount)}
--------------------------------------------------------------------
Thank you for choosing AgniCRM.
====================================================================
`.trim();

    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${payment.id}_AgniCRM_Receipt.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setNotification(`Receipt ${payment.id} downloaded successfully.`);
    setTimeout(() => setNotification(""), 4200);
  };

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
        <div>
          <p className="dashboard-eyebrow">Payments</p>
          <h1>Payment Tracker</h1>
        </div>
        <button type="button" className="primary-button" onClick={() => setShowCreateModal(true)}>
          + Create Payment Request
        </button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
        {PAYMENT_TABS.map((tab) => (
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
              <th>Reference ID</th>
              <th>Client Name</th>
              <th>Type</th>
              <th>Payment Mode</th>
              <th>Amount</th>
              <th>Date / Due Date</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id}>
                <td><strong>{payment.id}</strong></td>
                <td>{payment.clientName}</td>
                <td>{payment.type}</td>
                <td>{payment.paymentMode}</td>
                <td><strong>{formatCurrency(payment.amount)}</strong></td>
                <td>{payment.date || payment.dueDate}</td>
                <td>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 10px",
                      borderRadius: 999,
                      background: `${statusBadge[payment.status] || "#f2aa38"}22`,
                      color: statusBadge[payment.status] || "#f2aa38",
                      fontWeight: 700,
                      fontSize: 12,
                    }}
                  >
                    {payment.status}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <div style={{ display: "inline-flex", gap: 8 }}>
                    <button className="table-action" type="button" onClick={() => setSelectedPayment(payment)}>
                      View
                    </button>
                    {payment.status === "Requested" && (
                      <button
                        className="table-action"
                        style={{ color: "#44bfb0", borderColor: "rgba(68, 191, 176, 0.4)" }}
                        type="button"
                        onClick={() => markAsPaid(payment.id)}
                      >
                        Mark Paid
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filteredPayments.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: "36px 16px", color: "#6b6b77" }}>
                  No payment records found under {activeTab}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showCreateModal && (
        <CreatePaymentRequestModal
          clients={mockClients}
          onClose={() => setShowCreateModal(false)}
          onSubmit={addPaymentRequest}
        />
      )}

      {selectedPayment && (
        <PaymentDetailsModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
          onDownload={downloadReceipt}
        />
      )}
    </section>
  );
}