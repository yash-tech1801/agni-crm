import React, { useMemo, useState } from "react";
import Modal from "../../components/Modal";
import Icon from "../../components/Icon";
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
  Paid: "#10b981",
  Requested: "#f59e0b",
  Pending: "#f59e0b",
  Overdue: "#f43f5e",
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
    <Modal title="Issue Payment Request" onClose={onClose} closeLabel="Close">
      <div style={{ display: "flex", flexDirection: "column", gap: 18, minWidth: 320, maxWidth: 680 }}>
        <div>
          <p className="eyebrow" style={{ margin: 0, textTransform: "uppercase", letterSpacing: 1, fontSize: 11, color: "#8c5ff8", fontWeight: 700 }}>
            Payment Demand
          </p>
          <h2 style={{ margin: "4px 0 4px", fontSize: 18, fontWeight: 800 }}>Create New Payment Demand</h2>
          <p style={{ margin: 0, color: "#7a748e", fontSize: 13 }}>
            Generate a formal payment request notification and track settlement progress.
          </p>
        </div>

        <label className="field-label">
          <span>Target Client Account <span style={{ color: "#f43f5e" }}>*</span></span>
          <select name="clientId" value={formData.clientId} onChange={handleChange} style={{ padding: "10px 14px", borderRadius: 10 }} required>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name} — {client.company}
              </option>
            ))}
          </select>
        </label>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <label className="field-label">
            <span>Requested Amount (₹) <span style={{ color: "#f43f5e" }}>*</span></span>
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
            <span>Preferred Payment Mode</span>
            <select name="paymentMode" value={formData.paymentMode} onChange={handleChange}>
              {PAYMENT_MODES.map((mode) => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <label className="field-label">
            <span>Due Date <span style={{ color: "#f43f5e" }}>*</span></span>
            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
          </label>

          <label className="field-label">
            <span>Related Invoice Ref (optional)</span>
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
          <span>Description / Milestone Remarks</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Explain the payment installment or purpose..."
            style={{ resize: "vertical", minHeight: 80, padding: "10px 14px", borderRadius: 10, fontFamily: "inherit" }}
          />
        </label>

        {/* Live Summary Box */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(140, 95, 248, 0.08) 0%, rgba(109, 59, 245, 0.03) 100%)",
            padding: "16px 20px",
            borderRadius: 14,
            border: "1px solid rgba(140, 95, 248, 0.2)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
          }}
        >
          <div>
            <span style={{ fontSize: 11.5, color: "#7a748e", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600, display: "block", marginBottom: 3 }}>
              Total Demand
            </span>
            <strong style={{ color: "#10b981", fontSize: 18, fontWeight: 700 }}>
              {formatCurrency(formData.amount || 0)}
            </strong>
          </div>
          <div>
            <span style={{ fontSize: 11.5, color: "#7a748e", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600, display: "block", marginBottom: 3 }}>
              Payment Method
            </span>
            <strong style={{ fontSize: 15, color: "#8c5ff8" }}>{formData.paymentMode}</strong>
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
            disabled={!formData.amount || Number(formData.amount) <= 0}
            style={{
              opacity: (!formData.amount || Number(formData.amount) <= 0) ? 0.5 : 1,
              cursor: (!formData.amount || Number(formData.amount) <= 0) ? "not-allowed" : "pointer",
              padding: "10px 24px",
              fontSize: 13.5,
            }}
          >
            <span>+ Issue Payment Request</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

function PaymentDetailsModal({ payment, onClose, onDownload }) {
  if (!payment) return null;

  return (
    <Modal title={`Payment Record Details — ${payment.id}`} onClose={onClose} closeLabel="Close">
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
            <strong style={{ fontSize: 15, marginTop: 2, display: "block" }}>{payment.clientName}</strong>
          </div>
          <div>
            <span style={{ fontSize: 11.5, color: "#7a748e", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600, display: "block" }}>
              Record Type
            </span>
            <strong style={{ fontSize: 14, marginTop: 2, display: "block", color: "#8c5ff8" }}>{payment.type}</strong>
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
                  background: `${statusBadge[payment.status] || "#f59e0b"}22`,
                  color: statusBadge[payment.status] || "#f59e0b",
                  fontWeight: 700,
                  fontSize: 12,
                  marginTop: 2,
                }}
              >
                {payment.status}
              </span>
            </div>
          </div>
        </div>

        {/* 3-Column Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
          <div style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(16, 185, 129, 0.25)", background: "rgba(16, 185, 129, 0.06)" }}>
            <span style={{ fontSize: 11.5, color: "#10b981", fontWeight: 600, display: "block" }}>Amount</span>
            <strong style={{ fontSize: 16, color: "#10b981", marginTop: 2, display: "block", fontWeight: 700 }}>
              {formatCurrency(payment.amount)}
            </strong>
          </div>
          <div style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(140, 95, 248, 0.14)", background: "rgba(255, 255, 255, 0.02)" }}>
            <span style={{ fontSize: 11.5, color: "#7a748e", fontWeight: 600, display: "block" }}>Payment Mode</span>
            <strong style={{ fontSize: 13.5, marginTop: 3, display: "block" }}>{payment.paymentMode}</strong>
          </div>
          <div style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(140, 95, 248, 0.14)", background: "rgba(255, 255, 255, 0.02)" }}>
            <span style={{ fontSize: 11.5, color: "#7a748e", fontWeight: 600, display: "block" }}>Date</span>
            <strong style={{ fontSize: 13.5, marginTop: 3, display: "block" }}>{payment.date || payment.dueDate}</strong>
          </div>
        </div>

        {/* Description */}
        <div style={{ padding: "14px 16px", borderRadius: 12, border: "1px solid rgba(140, 95, 248, 0.14)", background: "rgba(140, 95, 248, 0.04)" }}>
          <span style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#8c5ff8", display: "block", marginBottom: 4 }}>
            Payment Description / Purpose
          </span>
          <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: "inherit" }}>
            {payment.description}
          </p>
        </div>

        {/* Related Invoice & Transaction Ref */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
          <div style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(140, 95, 248, 0.14)", background: "rgba(255, 255, 255, 0.02)" }}>
            <span style={{ fontSize: 11.5, color: "#7a748e", fontWeight: 600, display: "block" }}>Related Invoice</span>
            <strong style={{ fontSize: 14, marginTop: 3, display: "block", color: "#8c5ff8" }}>{payment.relatedInvoice || "N/A"}</strong>
          </div>
          <div style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(140, 95, 248, 0.14)", background: "rgba(255, 255, 255, 0.02)" }}>
            <span style={{ fontSize: 11.5, color: "#7a748e", fontWeight: 600, display: "block" }}>Transaction Reference</span>
            <strong style={{ fontSize: 13.5, marginTop: 3, display: "block", fontFamily: "monospace" }}>
              {payment.transactionRef || "Pending Settlement"}
            </strong>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 6 }}>
          <button className="sales-btn-secondary" type="button" onClick={() => onDownload(payment)} style={{ padding: "9px 18px" }}>
            📥 Download Receipt
          </button>
          <button className="sales-add-btn" type="button" onClick={onClose} style={{ padding: "9px 24px" }}>
            <span>Close</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default function SalesPayments() {
  const [activeTab, setActiveTab] = useState("All Records");
  const [payments, setPayments] = useState(initialPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [modeFilter, setModeFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [notification, setNotification] = useState("");

  // KPI Calculations
  const stats = useMemo(() => {
    const totalCollected = payments
      .filter((p) => p.status === "Paid")
      .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    const totalPending = payments
      .filter((p) => p.status === "Requested" || p.status === "Pending")
      .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    const totalDemand = totalCollected + totalPending;
    const collectionRate = totalDemand > 0 ? Math.round((totalCollected / totalDemand) * 100) : 0;

    return {
      totalCollected,
      totalPending,
      collectionRate,
      count: payments.length,
    };
  }, [payments]);

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      // Tab filter
      if (activeTab === "Payment Requests" && !(p.type === "Payment Request" || p.status === "Requested")) {
        return false;
      }
      if (activeTab === "Completed Payments" && p.status !== "Paid") {
        return false;
      }

      // Mode filter
      if (modeFilter !== "all" && p.paymentMode !== modeFilter) {
        return false;
      }

      // Search filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchId = p.id.toLowerCase().includes(query);
        const matchClient = p.clientName.toLowerCase().includes(query);
        const matchCompany = (p.clientCompany || "").toLowerCase().includes(query);
        const matchInvoice = (p.relatedInvoice || "").toLowerCase().includes(query);
        if (!matchId && !matchClient && !matchCompany && !matchInvoice) return false;
      }

      return true;
    });
  }, [payments, activeTab, modeFilter, searchTerm]);

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
    <section className="sales-page-view">
      {/* Header Banner */}
      <div className="sales-header-banner">
        <div className="sales-header-info">
          <p className="sales-header-eyebrow">Payments & Collections</p>
          <h1 className="sales-header-title">Payment Tracker</h1>
          <p className="sales-header-subtitle">
            Monitor client payment demands, collection milestones, and verified transaction receipts.
          </p>
        </div>

        <button
          type="button"
          className="sales-add-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>
          <span>Issue Payment Request</span>
        </button>
      </div>

      {/* KPI Stats Ribbon */}
      <div className="sales-kpi-ribbon">
        <div className="analytics-card sales-kpi-tile">
          <span className="sales-kpi-tile-label">Total Collected</span>
          <strong className="sales-kpi-tile-value" style={{ color: "#10b981" }}>
            {formatCurrency(stats.totalCollected)}
          </strong>
          <span className="sales-kpi-tile-sub" style={{ color: "#10b981" }}>
            ✓ Verified settlements
          </span>
        </div>

        <div className="analytics-card sales-kpi-tile">
          <span className="sales-kpi-tile-label">Pending Demand</span>
          <strong className="sales-kpi-tile-value" style={{ color: "#f59e0b" }}>
            {formatCurrency(stats.totalPending)}
          </strong>
          <span className="sales-kpi-tile-sub" style={{ color: "#f59e0b" }}>
            ⏳ Awaiting payment
          </span>
        </div>

        <div className="analytics-card sales-kpi-tile">
          <span className="sales-kpi-tile-label">Collection Rate</span>
          <strong className="sales-kpi-tile-value" style={{ color: "#8c5ff8" }}>
            {stats.collectionRate}%
          </strong>
          <div className="sales-kpi-progress-bar">
            <div
              className="sales-kpi-progress-fill"
              style={{ width: `${stats.collectionRate}%` }}
            />
          </div>
        </div>

        <div className="analytics-card sales-kpi-tile">
          <span className="sales-kpi-tile-label">Total Transactions</span>
          <strong className="sales-kpi-tile-value">
            {stats.count}
          </strong>
          <span className="sales-kpi-tile-sub" style={{ color: "#7a748e" }}>
            Logged in pipeline
          </span>
        </div>
      </div>

      {/* Tabs & Filters Toolbar */}
      <div className="analytics-card sales-toolbar-card">
        {/* Segmented Tab Switcher */}
        <div className="sales-tabs-switcher">
          {PAYMENT_TABS.map((tab) => {
            const isActive = activeTab === tab;
            const count =
              tab === "All Records"
                ? payments.length
                : tab === "Payment Requests"
                ? payments.filter((p) => p.type === "Payment Request" || p.status === "Requested").length
                : payments.filter((p) => p.status === "Paid").length;

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

        {/* Search & Mode Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
          <div className="sales-search-box">
            <span className="sales-search-icon">
              <Icon name="search" size={14} />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search payment or client..."
            />
          </div>

          <select
            className="sales-filter-select"
            value={modeFilter}
            onChange={(e) => setModeFilter(e.target.value)}
          >
            <option value="all">All Payment Modes</option>
            {PAYMENT_MODES.map((mode) => (
              <option key={mode} value={mode}>{mode}</option>
            ))}
          </select>
        </div>
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

      {/* Payments Table Card */}
      <div className="analytics-card sales-table-card">
        <div className="sales-table-scroll">
          <table className="sales-clients-table">
            <thead>
              <tr>
                <th>Reference ID</th>
                <th>Client & Company</th>
                <th>Type</th>
                <th>Payment Mode</th>
                <th>Amount</th>
                <th>Date / Due Date</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>
                    <span style={{ fontWeight: 700, color: "#8c5ff8", fontFamily: "monospace", fontSize: 13 }}>
                      {payment.id}
                    </span>
                  </td>
                  <td>
                    <div>
                      <strong className="client-name-title" style={{ display: "block" }}>{payment.clientName}</strong>
                      <span className="client-company-sub" style={{ display: "block" }}>{payment.clientCompany}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "3px 8px",
                        borderRadius: 6,
                        background: payment.type === "Payment" ? "rgba(16, 185, 129, 0.12)" : "rgba(140, 95, 248, 0.12)",
                        color: payment.type === "Payment" ? "#10b981" : "#8c5ff8",
                        fontWeight: 700,
                        fontSize: 11.5,
                      }}
                    >
                      {payment.type}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: 13, color: "inherit" }}>{payment.paymentMode}</span>
                  </td>
                  <td>
                    <strong style={{ fontSize: 14, fontWeight: 700, color: payment.status === "Paid" ? "#10b981" : "#f59e0b" }}>
                      {formatCurrency(payment.amount)}
                    </strong>
                  </td>
                  <td>
                    <span style={{ fontSize: 12.5, color: "#7a748e" }}>{payment.date || payment.dueDate}</span>
                  </td>
                  <td>
                    <span
                      className={`stage-tag ${payment.status === "Paid" ? "active" : "prospect"}`}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: 999, background: "currentColor" }} />
                      {payment.status}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: 8 }}>
                      <button
                        type="button"
                        className="sales-view-btn"
                        onClick={() => setSelectedPayment(payment)}
                      >
                        <Icon name="eye" size={13} />
                        <span>View</span>
                      </button>
                      {payment.status === "Requested" && (
                        <button
                          type="button"
                          className="sales-settle-btn"
                          onClick={() => markAsPaid(payment.id)}
                        >
                          <span>✓ Mark Paid</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan={8} className="sales-empty-cell">
                    No payment records found matching the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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