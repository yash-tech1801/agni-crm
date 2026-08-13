import React, { useMemo, useState } from "react";
import Icon from "../../components/Icon";
import { mockClients } from "./mockClients";

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
    type: "Request",
    amount: 85000,
    paymentMode: "Bank Transfer",
    transactionRef: "",
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
    type: "Request",
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
    type: "Request",
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
  {
    id: "PAY-2026-006",
    clientId: 2,
    clientName: "Urban Foods",
    clientEmail: "sales@urbanfoods.com",
    clientPhone: "+91 91234 55678",
    clientCompany: "Urban Foods Ltd",
    type: "Payment",
    amount: 30000,
    paymentMode: "Bank Transfer",
    transactionRef: "IMPS-UF29JUL-8821",
    date: "2026-08-01",
    status: "Paid",
    relatedInvoice: "INV-2026-002",
    description: "Remaining 50% balance for Brand Growth Suite.",
    receivedBy: "Sales Person",
  },
  {
    id: "REQ-2026-007",
    clientId: 5,
    clientName: "Blue Ocean Resorts",
    clientEmail: "accounts@blueoceanresorts.com",
    clientPhone: "+91 98221 40100",
    clientCompany: "Blue Ocean Resorts LLP",
    type: "Request",
    amount: 72500,
    paymentMode: "Bank Transfer",
    transactionRef: "",
    date: "2026-08-10",
    dueDate: "2026-08-24",
    status: "Overdue",
    relatedInvoice: "INV-2026-007",
    description: "Group term-life + group health for 40 resort staff members.",
    receivedBy: "Sales Person",
  },
];

function formatCurrency(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN");
}

function daysBetween(a, b) {
  const ms = new Date(b) - new Date(a);
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

function downloadReceipt(payment) {
  const lines = [
    "AGNI CRM — PAYMENT RECEIPT",
    "=".repeat(36),
    `Record ID:        ${payment.id}`,
    `Type:              ${payment.type === "Payment" ? "Payment" : "Payment Request"}`,
    `Status:            ${payment.status}`,
    "",
    `Client:            ${payment.clientName}`,
    `Company:           ${payment.clientCompany || "-"}`,
    `Phone:             ${payment.clientPhone}`,
    `Email:             ${payment.clientEmail}`,
    "",
    `Amount:            ${formatCurrency(payment.amount)}`,
    `Payment Mode:      ${payment.paymentMode}`,
    `Transaction Ref:   ${payment.transactionRef || "-"}`,
    `Related Invoice:   ${payment.relatedInvoice || "-"}`,
    `Date:              ${payment.date}`,
    payment.dueDate ? `Due Date:          ${payment.dueDate}` : null,
    "",
    `Description:       ${payment.description || "-"}`,
    `Received By:       ${payment.receivedBy || "AgniCRM"}`,
    "=".repeat(36),
  ].filter(Boolean);

  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${payment.id}-receipt.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function PaymentDetailsModal({ payment, onClose }) {
  const statusColor =
    payment.status === "Paid"
      ? {
          main: "#16a34a",
          bg: "rgba(22, 163, 74, 0.06)",
          border: "rgba(22, 163, 74, 0.2)",
          gradient: "linear-gradient(135deg, rgba(22, 163, 74, 0.15) 0%, rgba(22, 163, 74, 0.02) 60%)",
        }
      : payment.status === "Overdue"
      ? {
          main: "#dc2626",
          bg: "rgba(220, 38, 38, 0.06)",
          border: "rgba(220, 38, 38, 0.2)",
          gradient: "linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(220, 38, 38, 0.02) 60%)",
        }
      : {
          main: "#7c3aed",
          bg: "rgba(124, 58, 237, 0.06)",
          border: "rgba(124, 58, 237, 0.2)",
          gradient: "linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(124, 58, 237, 0.02) 60%)",
        };

  const typeColor =
    payment.type === "Payment"
      ? { main: "#16a34a", bg: "rgba(22, 163, 74, 0.12)" }
      : { main: "#ec4899", bg: "rgba(236, 72, 153, 0.12)" };

  const overdueDays =
    payment.status === "Overdue" && payment.dueDate
      ? daysBetween(payment.dueDate, new Date().toISOString().split("T")[0])
      : 0;

  const dueInDays =
    payment.status === "Requested" && payment.dueDate
      ? daysBetween(new Date().toISOString().split("T")[0], payment.dueDate)
      : 0;

  return (
    <div className="cd-modal-backdrop" onMouseDown={onClose}>
      <section
        className="cd-modal"
        style={{
          maxWidth: 800,
          maxHeight: "calc(100vh - 40px)",
          overflowY: "auto",
          padding: 0,
          borderRadius: 28,
          boxShadow: "0 40px 80px -20px rgba(30, 19, 48, 0.35)",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: "38px 40px 30px",
            background: statusColor.gradient,
            position: "relative",
            borderBottom: "1px solid rgba(0,0,0,0.04)",
          }}
        >
          <button
            type="button"
            className="cd-modal-close"
            onClick={onClose}
            style={{
              top: 24,
              right: 24,
              width: 36,
              height: 36,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.05)",
              border: "none",
              fontSize: 20,
              color: "#6b6472",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(220, 38, 38, 0.12)";
              e.currentTarget.style.color = "#dc2626";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,0.05)";
              e.currentTarget.style.color = "#6b6472";
            }}
          >
            ×
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 18,
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginBottom: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flex: 1, minWidth: 300 }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 20,
                  background: `linear-gradient(135deg, ${statusColor.main}22 0%, ${statusColor.main}08 100%)`,
                  color: statusColor.main,
                  border: `1.5px solid ${statusColor.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: `0 8px 20px -6px ${statusColor.main}44`,
                }}
              >
                <Icon name={payment.type === "Payment" ? "wallet" : "invoice"} size={26} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <p
                    style={{
                      color: statusColor.main,
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: 1.2,
                      margin: 0,
                      textTransform: "uppercase",
                    }}
                  >
                    {payment.type === "Payment" ? "PAYMENT CONFIRMATION" : "PAYMENT REQUEST"}
                  </p>
                </div>
                <h2 style={{ margin: 0, fontSize: 30, letterSpacing: "-1px", fontWeight: 700 }}>{payment.id}</h2>
                <p style={{ margin: "8px 0 0", color: "#6b6472", fontSize: 14, lineHeight: 1.5, maxWidth: 480 }}>
                  {payment.description}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "8px 16px",
                  borderRadius: 999,
                  background: statusColor.bg,
                  color: statusColor.main,
                  fontWeight: 800,
                  fontSize: 12.5,
                  letterSpacing: 0.3,
                  border: `1.5px solid ${statusColor.border}`,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: statusColor.main,
                    boxShadow: `0 0 0 3px ${statusColor.main}20`,
                  }}
                />
                {payment.status}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 13px",
                  borderRadius: 999,
                  background: typeColor.bg,
                  color: typeColor.main,
                  fontSize: 11.5,
                  fontWeight: 700,
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: 999, background: typeColor.main }} />
                {payment.type === "Payment" ? "Payment Done" : "Requested to Pay"}
              </span>
              {payment.status === "Paid" && (
                <span
                  style={{
                    fontSize: 12,
                    color: "#16a34a",
                    fontWeight: 700,
                    padding: "6px 13px",
                    borderRadius: 999,
                    background: "rgba(22, 163, 74, 0.1)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  ✓ Received by {payment.receivedBy || "AgniCRM"}
                </span>
              )}
              {payment.status === "Overdue" && (
                <span
                  style={{
                    fontSize: 12,
                    color: "#dc2626",
                    fontWeight: 800,
                    padding: "6px 13px",
                    borderRadius: 999,
                    background: "rgba(220, 38, 38, 0.12)",
                    border: "1px solid rgba(220, 38, 38, 0.2)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  ⚠ {overdueDays} day{overdueDays === 1 ? "" : "s"} overdue
                </span>
              )}
              {payment.status === "Requested" && dueInDays >= 0 && (
                <span
                  style={{
                    fontSize: 12,
                    color: "#7c3aed",
                    fontWeight: 700,
                    padding: "6px 13px",
                    borderRadius: 999,
                    background: dueInDays <= 3 && dueInDays > 0
                      ? "rgba(245, 158, 11, 0.12)"
                      : "rgba(124, 58, 237, 0.1)",
                    color: dueInDays <= 3 && dueInDays > 0 ? "#d97706" : "#7c3aed",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {dueInDays === 0 ? "Due today" : `Due in ${dueInDays} day${dueInDays === 1 ? "" : "s"}`}
                </span>
              )}
            </div>
          </div>

          {/* Client Info Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 18px",
              borderRadius: 16,
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(0,0,0,0.05)",
              backdropFilter: "blur(10px)",
            }}
          >
            <ClientAvatar name={payment.clientName} size={44} />
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: 15, color: "#201a2e", display: "block" }}>{payment.clientName}</strong>
              <span style={{ fontSize: 12, color: "#6b6472" }}>{payment.clientCompany || "—"}</span>
            </div>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0, fontSize: 10, color: "#a39aad", fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase" }}>Phone</p>
                <span style={{ fontSize: 13, color: "#5c5468", fontWeight: 600 }}>{payment.clientPhone}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0, fontSize: 10, color: "#a39aad", fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase" }}>Email</p>
                <span style={{ fontSize: 13, color: "#5c5468", fontWeight: 600 }}>{payment.clientEmail}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: "28px 40px 40px" }}>
          <div
            style={{
              padding: 28,
              borderRadius: 22,
              background: `linear-gradient(145deg, ${statusColor.bg} 0%, rgba(255,255,255,0.9) 100%)`,
              border: `1.5px solid ${statusColor.border}`,
              marginBottom: 26,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -30,
                right: -30,
                width: 160,
                height: 160,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${statusColor.main}12 0%, transparent 70%)`,
              }}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.6fr 1fr 1fr",
                gap: 28,
                alignItems: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div>
                <p style={{ margin: 0, fontSize: 11, color: "#a39aad", letterSpacing: 1, textTransform: "uppercase", fontWeight: 700 }}>
                  {payment.type === "Payment" ? "Amount Paid" : "Amount Requested"}
                </p>
                <strong style={{ fontSize: 40, color: "#201a2e", display: "block", marginTop: 8, letterSpacing: "-1.5px", fontWeight: 700 }}>
                  {formatCurrency(payment.amount)}
                </strong>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: 8,
                      background: "#fff",
                      border: "1px solid #efe6f9",
                      fontSize: 12,
                      color: "#5c5468",
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    {payment.paymentMode === "UPI" && "📱"}
                    {payment.paymentMode === "Bank Transfer" && "🏦"}
                    {payment.paymentMode === "Cheque" && "📄"}
                    {payment.paymentMode !== "UPI" && payment.paymentMode !== "Bank Transfer" && payment.paymentMode !== "Cheque" && "💳"}
                    {payment.paymentMode}
                  </span>
                  {payment.relatedInvoice && (
                    <span style={{ fontSize: 12, color: "#6b6472" }}>
                      Linked to <strong style={{ color: "#201a2e" }}>{payment.relatedInvoice}</strong>
                    </span>
                  )}
                </div>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 11, color: "#a39aad", letterSpacing: 0.8, textTransform: "uppercase", fontWeight: 700 }}>
                  {payment.type === "Payment" ? "Paid On" : "Request Date"}
                </p>
                <strong style={{ fontSize: 18, color: "#201a2e", display: "block", marginTop: 6 }}>{payment.date}</strong>
              </div>
              {payment.dueDate ? (
                <div>
                  <p style={{ margin: 0, fontSize: 11, color: "#a39aad", letterSpacing: 0.8, textTransform: "uppercase", fontWeight: 700 }}>Due Date</p>
                  <strong
                    style={{
                      fontSize: 18,
                      color: payment.status === "Overdue" ? "#dc2626" : "#201a2e",
                      display: "block",
                      marginTop: 6,
                    }}
                  >
                    {payment.dueDate}
                  </strong>
                </div>
              ) : (
                <div>
                  <p style={{ margin: 0, fontSize: 11, color: "#a39aad", letterSpacing: 0.8, textTransform: "uppercase", fontWeight: 700 }}>Related Invoice</p>
                  <strong style={{ fontSize: 18, color: "#201a2e", display: "block", marginTop: 6 }}>
                    {payment.relatedInvoice || "—"}
                  </strong>
                </div>
              )}
            </div>
          </div>

          <div
            className="cd-scheme-meta-box"
            style={{ gridTemplateColumns: "1fr 1fr", marginBottom: 24 }}
          >
            <div>
              <span>Client Name</span>
              <strong>{payment.clientName}</strong>
            </div>
            <div>
              <span>Company</span>
              <strong>{payment.clientCompany || "—"}</strong>
            </div>
            <div>
              <span>Contact Number</span>
              <strong>{payment.clientPhone}</strong>
            </div>
            <div>
              <span>Email Address</span>
              <strong>{payment.clientEmail}</strong>
            </div>
            <div>
              <span>Related Invoice</span>
              <strong>{payment.relatedInvoice || "—"}</strong>
            </div>
            <div>
              <span>Payment Mode</span>
              <strong>{payment.paymentMode}</strong>
            </div>
          </div>

          {payment.transactionRef && (
            <div
              style={{
                padding: 18,
                borderRadius: 14,
                border: "1px dashed #e3d9ec",
                background: "#faf9fc",
                marginBottom: 20,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <Icon name="wallet" size={15} />
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: "#6b6472",
                    fontWeight: 600,
                    letterSpacing: 0.3,
                    textTransform: "uppercase",
                  }}
                >
                  Transaction Reference
                </p>
              </div>
              <strong style={{ fontSize: 15, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: "#201a2e" }}>
                {payment.transactionRef}
              </strong>
            </div>
          )}

          <div style={{ marginBottom: 28 }}>
            <p
              style={{
                margin: "0 0 8px",
                fontSize: 12,
                color: "#6b6472",
                fontWeight: 600,
                letterSpacing: 0.3,
                textTransform: "uppercase",
              }}
            >
              Description
            </p>
            <p style={{ margin: 0, fontSize: 14, color: "#201a2e", lineHeight: 1.65 }}>
              {payment.description}
            </p>
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", flexWrap: "wrap", marginTop: 8 }}>
            {payment.status === "Overdue" && (
              <button
                type="button"
                className="cd-table-action-btn"
                style={{
                  background: "rgba(245, 158, 11, 0.1)",
                  color: "#d97706",
                  borderColor: "rgba(245, 158, 11, 0.3)",
                  padding: "12px 20px",
                  fontSize: 13.5,
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                }}
              >
                <span>🔔</span>
                Send Reminder
              </button>
            )}
            {payment.status === "Requested" && (
              <button
                type="button"
                className="cd-table-action-btn"
                style={{
                  background: "rgba(22, 163, 74, 0.1)",
                  color: "#16a34a",
                  borderColor: "rgba(22, 163, 74, 0.3)",
                  padding: "12px 20px",
                  fontSize: 13.5,
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                }}
              >
                <span>✓</span>
                Mark as Paid
              </button>
            )}
            <button
              type="button"
              className="cd-table-action-btn"
              style={{
                background: "rgba(124, 58, 237, 0.08)",
                color: "#7c3aed",
                borderColor: "rgba(124, 58, 237, 0.25)",
                padding: "12px 20px",
                fontSize: 13.5,
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Receipt
            </button>
            <button
              type="button"
              className="table-action"
              onClick={onClose}
              style={{
                padding: "12px 24px",
                fontSize: 13.5,
                fontWeight: 700,
                background: "#201a2e",
                color: "#fff",
                border: "none",
                borderRadius: 14,
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              Close
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                <polyline points="18 6 6 18" />
                <polyline points="6 6 18 18" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ClientAvatar({ name, accent = "#7c3aed", size = 36 }) {
  const bgGradients = [
    "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)",
    "linear-gradient(135deg, #16a34a 0%, #7c3aed 100%)",
    "linear-gradient(135deg, #f59e0b 0%, #f0630a 100%)",
    "linear-gradient(135deg, #ec4899 0%, #dc2626 100%)",
    "linear-gradient(135deg, #1e1330 0%, #7c3aed 100%)",
  ];
  const gradient = bgGradients[name.length % bgGradients.length];

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        background: gradient,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: size * 0.38,
        letterSpacing: 0.5,
        boxShadow: `0 4px 12px rgba(124, 58, 237, 0.25)`,
        flexShrink: 0,
      }}
    >
      {getInitials(name)}
    </div>
  );
}

const PAYMENT_MODE_ICON = {
  UPI: "📱",
  "Bank Transfer": "🏦",
  Cheque: "📄",
};

const emptyRequestForm = {
  clientId: "",
  amount: "",
  paymentMode: "Bank Transfer",
  dueDate: "",
  relatedInvoice: "",
  description: "",
};

export default function SalesPayments() {
  const [payments, setPayments] = useState(initialPayments);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [filterType, setFilterType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState("All");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestForm, setRequestForm] = useState(emptyRequestForm);
  const [requestErrors, setRequestErrors] = useState({});
  const [requestSuccess, setRequestSuccess] = useState(false);

  function updateRequestField(field, value) {
    setRequestForm((prev) => ({ ...prev, [field]: value }));
    setRequestErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function closeRequestModal() {
    setShowRequestModal(false);
    setRequestForm(emptyRequestForm);
    setRequestErrors({});
    setRequestSuccess(false);
  }

  function handleCreateRequest() {
    const errors = {};
    if (!requestForm.clientId) errors.clientId = "Select a client";
    if (!requestForm.amount || Number(requestForm.amount) <= 0) errors.amount = "Enter a valid amount";
    if (!requestForm.dueDate) errors.dueDate = "Pick a due date";
    if (Object.keys(errors).length) {
      setRequestErrors(errors);
      return;
    }

    const client = mockClients.find((c) => c.id === Number(requestForm.clientId));
    const nextNum = payments.length + 1;
    const newRequest = {
      id: `REQ-2026-${String(nextNum).padStart(3, "0")}`,
      clientId: client.id,
      clientName: client.name,
      clientEmail: client.email,
      clientPhone: client.phone,
      clientCompany: client.company,
      type: "Request",
      amount: Number(requestForm.amount),
      paymentMode: requestForm.paymentMode,
      transactionRef: "",
      date: new Date().toISOString().split("T")[0],
      dueDate: requestForm.dueDate,
      status: "Requested",
      relatedInvoice: requestForm.relatedInvoice || "",
      description: requestForm.description || "Payment request",
      receivedBy: "Sales Person",
    };

    setPayments((prev) => [newRequest, ...prev]);
    setRequestSuccess(true);
    setTimeout(() => {
      closeRequestModal();
    }, 1100);
  }

  const filteredPayments = useMemo(() => {
    let result = payments;
    if (filterType !== "All") result = result.filter((p) => p.status === filterType);
    if (filterMode !== "All") result = result.filter((p) => p.type === filterMode);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.id.toLowerCase().includes(q) ||
          p.clientName.toLowerCase().includes(q) ||
          p.clientCompany?.toLowerCase().includes(q) ||
          p.clientEmail.toLowerCase().includes(q) ||
          p.clientPhone.includes(q) ||
          p.relatedInvoice?.toLowerCase().includes(q) ||
          p.transactionRef?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [payments, filterType, filterMode, searchQuery]);

  const metrics = useMemo(() => {
    let totalReceived = 0;
    let requested = 0;
    let overdue = 0;
    let pendingCount = 0;
    let overdueCount = 0;

    payments.forEach((p) => {
      if (p.status === "Paid") totalReceived += Number(p.amount);
      else if (p.status === "Requested") {
        requested += Number(p.amount);
        pendingCount++;
      } else if (p.status === "Overdue") {
        overdue += Number(p.amount);
        overdueCount++;
      }
    });

    const totalRequested = requested + overdue;
    const collectionRate =
      totalReceived + totalRequested > 0
        ? Math.round((totalReceived / (totalReceived + totalRequested)) * 100)
        : 0;

    return {
      totalReceived,
      totalRequested,
      pendingCount,
      overdueCount,
      totalCount: payments.length,
      collectionRate,
      overdue,
    };
  }, [payments]);

  const tabs = [
    { key: "All", label: "All Records", accent: "#201a2e", count: payments.length, icon: "overview" },
    {
      key: "Paid",
      label: "Paid",
      accent: "#16a34a",
      count: payments.filter((p) => p.status === "Paid").length,
      icon: "wallet",
    },
    {
      key: "Requested",
      label: "Requested",
      accent: "#7c3aed",
      count: payments.filter((p) => p.status === "Requested").length,
      icon: "invoice",
    },
    {
      key: "Overdue",
      label: "Overdue",
      accent: "#dc2626",
      count: payments.filter((p) => p.status === "Overdue").length,
      icon: "bell",
    },
  ];

  const kpis = [
    {
      label: "Total Received",
      value: formatCurrency(metrics.totalReceived),
      trend: `${metrics.collectionRate}% collected`,
      description: "Payments Done",
      accent: "#16a34a",
      icon: "wallet",
      glow: "rgba(22, 163, 74, 0.15)",
    },
    {
      label: "Requested Pending",
      value: formatCurrency(metrics.totalRequested),
      trend: `${metrics.pendingCount} active`,
      description: "Awaiting payment",
      accent: "#7c3aed",
      icon: "invoice",
      glow: "rgba(124, 58, 237, 0.15)",
    },
    {
      label: "Total Transactions",
      value: `${metrics.totalCount}`,
      trend: `${payments.filter((p) => p.type === "Payment").length} paid / ${payments.filter((p) => p.type === "Request").length} requests`,
      description: "All records",
      accent: "#ec4899",
      icon: "overview",
      glow: "rgba(236, 72, 153, 0.15)",
    },
    {
      label: "Overdue",
      value: `${metrics.overdueCount}`,
      trend: formatCurrency(metrics.overdue),
      description: "Needs follow-up",
      accent: "#dc2626",
      icon: "bell",
      glow: "rgba(220, 38, 38, 0.15)",
    },
  ];

  return (
    <section className="sp-page">
      {/* Header */}
      <div className="sp-header">
        <div style={{ flex: 1, minWidth: 320 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <p className="dashboard-eyebrow" style={{ color: "#ec4899", margin: 0 }}>Payments</p>
            <span
              style={{
                fontSize: 11,
                padding: "3px 10px",
                borderRadius: 999,
                background: "rgba(22, 163, 74, 0.12)",
                color: "#16a34a",
                fontWeight: 700,
                letterSpacing: 0.3,
              }}
            >
              LIVE
            </span>
          </div>
          <h1 style={{ marginBottom: 6, letterSpacing: "-2px" }}>Payment & Requests Tracker</h1>
          <p className="cd-modal-desc" style={{ color: "#6b6472", margin: 0, maxWidth: 560 }}>
            Monitor every client payment received and payment requests sent, including follow-up alerts and collection progress.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            type="button"
            className="cd-table-action-btn"
            style={{
              background: "rgba(124, 58, 237, 0.08)",
              color: "#7c3aed",
              borderColor: "rgba(124, 58, 237, 0.25)",
              padding: "12px 18px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Icon name="overview" size={15} />
            Export Report
          </button>
          <button
            type="button"
            className="table-action"
            onClick={() => setShowRequestModal(true)}
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)",
              color: "#fff",
              border: "none",
              padding: "12px 22px",
              fontWeight: 700,
              boxShadow: "0 8px 24px -6px rgba(124, 58, 237, 0.5)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              letterSpacing: 0.2,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Payment Request
          </button>
        </div>
      </div>

      {/* Full-width Collection Performance Banner */}
      <div className="sp-hero-banner">
        <div className="sp-hero-decor-1" />
        <div className="sp-hero-decor-2" />

        <div className="sp-hero-identity">
          <div className="sp-hero-icon">
            <Icon name="overview" size={22} />
          </div>
          <div>
            <p className="sp-hero-eyebrow">Collection Performance</p>
            <h3 className="sp-hero-value">{metrics.collectionRate}%</h3>
          </div>
        </div>

        <div className="sp-hero-bar-block">
          <div className="sp-hero-bar-label-row">
            <span style={{ color: "#a89ab5" }}>Received vs Pending</span>
            <span style={{ color: "#d9cee0", fontWeight: 600 }}>
              {formatCurrency(metrics.totalReceived)} / {formatCurrency(metrics.totalReceived + metrics.totalRequested)}
            </span>
          </div>
          <div className="sp-hero-bar-track">
            <div
              className="sp-hero-bar-fill"
              style={{ width: `${metrics.collectionRate}%` }}
            />
            <div
              className="sp-hero-bar-overdue"
              style={{ width: `${(metrics.overdue / (metrics.totalReceived + metrics.totalRequested)) * 100 || 0}%` }}
            />
          </div>
        </div>

        <div className="sp-hero-legend">
          <div className="sp-hero-legend-item">
            <div className="sp-hero-dot" style={{ background: "#16a34a" }} />
            <span>Collected</span>
          </div>
          <div className="sp-hero-legend-item">
            <div className="sp-hero-dot" style={{ background: "#7c3aed" }} />
            <span>Requested</span>
          </div>
          <div className="sp-hero-legend-item">
            <div className="sp-hero-dot" style={{ background: "#dc2626" }} />
            <span>Overdue</span>
          </div>
        </div>
      </div>

      {/* KPI row - horizontal compact cards */}
      <div className="sp-kpi-row">
        {kpis.map((kpi) => (
          <article key={kpi.label} className="sp-kpi-card">
            <div
              className="sp-kpi-icon"
              style={{ background: kpi.glow, color: kpi.accent, border: `1px solid ${kpi.accent}22` }}
            >
              <Icon name={kpi.icon} size={19} />
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <span className="sp-kpi-label">{kpi.label}</span>
              <h3 className="sp-kpi-value">{kpi.value}</h3>
              <div className="sp-kpi-foot">
                <span style={{ color: kpi.accent, fontWeight: 700 }}>{kpi.trend}</span>
                <span style={{ color: "#a39aad" }}> · {kpi.description}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Toolbar: status tabs + search + type filter, combined */}
      <div className="sp-toolbar">
        <div className="sp-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilterType(tab.key)}
              className="sp-tab-btn"
              style={{
                background: filterType === tab.key ? "#fff" : "transparent",
                color: filterType === tab.key ? tab.accent : "#6b6472",
                border: filterType === tab.key ? `1.5px solid ${tab.accent}44` : "1.5px solid transparent",
                fontWeight: filterType === tab.key ? 700 : 600,
                boxShadow: filterType === tab.key ? `0 6px 16px -8px ${tab.accent}55` : "none",
              }}
            >
              <div
                className="sp-tab-icon"
                style={{
                  background: filterType === tab.key ? `${tab.accent}18` : "#f5eff9",
                  color: filterType === tab.key ? tab.accent : "#a39aad",
                }}
              >
                <Icon name={tab.icon} size={13} />
              </div>
              {tab.label}
              <span
                className="sp-tab-count"
                style={{
                  background: filterType === tab.key ? `${tab.accent}18` : "#f5eff9",
                  color: filterType === tab.key ? tab.accent : "#6b6472",
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="sp-toolbar-right">
          <div style={{ display: "flex", gap: 6, background: "#fff", padding: 4, borderRadius: 14, border: "1px solid #ece2f7" }}>
            {[
              { key: "All", label: "All" },
              { key: "Payment", label: "Payments" },
              { key: "Request", label: "Requests" },
            ].map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => setFilterMode(m.key)}
                style={{
                  padding: "8px 13px",
                  borderRadius: 10,
                  border: "none",
                  background: filterMode === m.key ? "linear-gradient(135deg, #ec4899 0%, #7c3aed 100%)" : "transparent",
                  color: filterMode === m.key ? "#fff" : "#6b6472",
                  fontSize: 12.5,
                  fontWeight: filterMode === m.key ? 700 : 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit",
                }}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="sp-search" style={{ position: "relative" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a39aad" strokeWidth="2.3" className="sp-search-icon">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search payments…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="sp-search-input"
              onFocus={(e) => {
                e.target.style.borderColor = "#7c3aed";
                e.target.style.boxShadow = "0 0 0 4px rgba(124, 58, 237, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ebe0ed";
                e.target.style.boxShadow = "none";
              }}
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery("")} className="sp-search-clear">
                ×
              </button>
            )}
          </div>

          {(filterType !== "All" || filterMode !== "All" || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setFilterType("All");
                setFilterMode("All");
                setSearchQuery("");
              }}
              className="sp-clear-btn"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                <polyline points="3 3 3 8 8 8" />
              </svg>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Records */}
      <div className="sp-records-head">
        <div>
          <span className="cd-kicker">PAYMENT RECORDS</span>
          <h2 style={{ fontSize: 20, margin: "6px 0 0" }}>
            {filterType === "All" ? "All Payments & Requests" : `${filterType} Records`}
          </h2>
        </div>
        <span className="cd-count-pill">{filteredPayments.length} records</span>
      </div>

      {filteredPayments.length > 0 ? (
        <div className="cd-section-card" style={{ padding: 0, overflow: "hidden" }}>
          <div className="cd-table-wrap">
            <table className="cd-invoices-table">
              <thead>
                <tr style={{ borderBottom: "1px solid #efe6f9" }}>
                  <th style={{ padding: "16px 20px" }}>Payment ID</th>
                  <th style={{ padding: "16px 20px" }}>Client</th>
                  <th style={{ padding: "16px 20px" }}>Type</th>
                  <th style={{ padding: "16px 20px" }}>Amount</th>
                  <th style={{ padding: "16px 20px" }}>Timeline</th>
                  <th style={{ padding: "16px 20px" }}>Status</th>
                  <th style={{ padding: "16px 20px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment, idx) => {
                  const typeAccent =
                    payment.type === "Payment"
                      ? { main: "#16a34a", bg: "rgba(22, 163, 74, 0.12)" }
                      : { main: "#ec4899", bg: "rgba(236, 72, 153, 0.12)" };

                  const statusStyles = {
                    Paid: { main: "#16a34a", bg: "rgba(22, 163, 74, 0.1)", border: "rgba(22, 163, 74, 0.25)" },
                    Requested: { main: "#7c3aed", bg: "rgba(124, 58, 237, 0.1)", border: "rgba(124, 58, 237, 0.25)" },
                    Overdue: { main: "#dc2626", bg: "rgba(220, 38, 38, 0.1)", border: "rgba(220, 38, 38, 0.25)" },
                  };
                  const statusStyle = statusStyles[payment.status] || statusStyles.Requested;

                  const dueInDays =
                    payment.status === "Requested" && payment.dueDate
                      ? daysBetween(new Date().toISOString().split("T")[0], payment.dueDate)
                      : 0;
                  const overdueDays =
                    payment.status === "Overdue" && payment.dueDate
                      ? daysBetween(payment.dueDate, new Date().toISOString().split("T")[0])
                      : 0;
                  const isUrgent = (dueInDays > 0 && dueInDays <= 3) || payment.status === "Overdue";

                  return (
                    <tr
                      key={payment.id}
                      style={{ background: "#fff", animation: `slideIn 0.3s ${idx * 0.02}s ease both` }}
                    >
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div
                            style={{
                              width: 38,
                              height: 38,
                              borderRadius: 12,
                              background: typeAccent.bg,
                              color: typeAccent.main,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: `1px solid ${typeAccent.main}22`,
                            }}
                          >
                            <Icon name={payment.type === "Payment" ? "wallet" : "invoice"} size={17} />
                          </div>
                          <div>
                            <strong className="cd-inv-id" style={{ fontSize: 13.5, color: "#201a2e" }}>
                              {payment.id}
                            </strong>
                            {payment.relatedInvoice && (
                              <div style={{ marginTop: 3 }}>
                                <span style={{ fontSize: 10, color: "#a39aad", fontWeight: 700 }}>INV </span>
                                <small style={{ color: "#6b6472", fontSize: 11 }}>{payment.relatedInvoice}</small>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <ClientAvatar name={payment.clientName} />
                          <div>
                            <strong style={{ display: "block", fontSize: 14, color: "#201a2e" }}>
                              {payment.clientName}
                            </strong>
                            <span style={{ fontSize: 11, color: "#a39aad" }}>{payment.clientCompany}</span>
                            <br />
                            <small style={{ color: "#6b6472", fontSize: 11.5 }}>{payment.clientPhone}</small>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "6px 12px",
                            borderRadius: 999,
                            background: typeAccent.bg,
                            color: typeAccent.main,
                            fontWeight: 700,
                            fontSize: 12,
                          }}
                        >
                          <span style={{ width: 5, height: 5, borderRadius: 999, background: typeAccent.main }} />
                          {payment.type === "Payment" ? "Payment" : "Request"}
                        </span>
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <strong className="cd-inv-amount" style={{ fontSize: 16, color: "#201a2e", letterSpacing: "-0.3px" }}>
                          {formatCurrency(payment.amount)}
                        </strong>
                        {payment.transactionRef && (
                          <div style={{ marginTop: 4 }}>
                            <span style={{ fontSize: 10, color: "#a39aad" }}>REF </span>
                            <small style={{ fontSize: 10.5, color: "#6b6472", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                              {payment.transactionRef.slice(0, 14)}
                              {payment.transactionRef.length > 14 ? "…" : ""}
                            </small>
                          </div>
                        )}
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                            <span style={{ fontSize: 11, color: "#a39aad", fontWeight: 700 }}>SENT</span>
                            <strong style={{ fontSize: 13, color: "#201a2e" }}>{payment.date}</strong>
                          </div>
                          {payment.status === "Requested" && payment.dueDate && (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                padding: "4px 10px",
                                borderRadius: 8,
                                background: isUrgent ? "rgba(220, 38, 38, 0.08)" : "rgba(124, 58, 237, 0.08)",
                                width: "fit-content",
                              }}
                            >
                              <small style={{ fontSize: 11, color: isUrgent ? "#dc2626" : "#7c3aed", fontWeight: 700 }}>
                                Due {payment.dueDate}
                                {dueInDays > 0 && dueInDays <= 3 && ` • ${dueInDays}d left`}
                                {dueInDays === 0 && " • Today"}
                              </small>
                            </div>
                          )}
                          {payment.status === "Overdue" && (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                padding: "4px 10px",
                                borderRadius: 8,
                                background: "rgba(220, 38, 38, 0.1)",
                                width: "fit-content",
                                border: "1px solid rgba(220, 38, 38, 0.2)",
                              }}
                            >
                              <small style={{ fontSize: 11, color: "#dc2626", fontWeight: 800 }}>
                                {overdueDays}d OVERDUE
                              </small>
                            </div>
                          )}
                          {payment.status === "Paid" && (
                            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                              <span
                                style={{
                                  width: 5,
                                  height: 5,
                                  borderRadius: 999,
                                  background: "#16a34a",
                                  boxShadow: "0 0 0 3px rgba(22, 163, 74, 0.15)",
                                }}
                              />
                              <small style={{ fontSize: 11, color: "#16a34a", fontWeight: 700 }}>Confirmed</small>
                            </div>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 7,
                            padding: "7px 14px",
                            borderRadius: 999,
                            background: statusStyle.bg,
                            color: statusStyle.main,
                            fontWeight: 800,
                            fontSize: 12,
                            border: `1px solid ${statusStyle.border}`,
                          }}
                        >
                          <span style={{ width: 6, height: 6, borderRadius: 999, background: statusStyle.main }} />
                          {payment.status}
                        </span>
                      </td>
                      <td style={{ padding: "16px 20px", textAlign: "right" }}>
                        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                          <button
                            type="button"
                            className="cd-table-action-btn"
                            onClick={() => setSelectedPayment(payment)}
                            style={{ padding: "8px 14px", fontSize: 12.5, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 5 }}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                            View
                          </button>
                          <button
                            type="button"
                            className="cd-table-action-btn"
                            onClick={() => downloadReceipt(payment)}
                            style={{ padding: "8px 14px", fontSize: 12.5, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 5 }}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="sp-empty-state">
          <div className="sp-empty-icon">
            <Icon name="wallet" size={36} />
          </div>
          <p style={{ margin: 0, fontSize: 19, fontWeight: 800, color: "#201a2e", letterSpacing: "-0.3px" }}>
            No records match your search
          </p>
          <p style={{ margin: "10px auto 22px", fontSize: 14.5, maxWidth: 480, color: "#6b6472", lineHeight: 1.6 }}>
            {filterType === "All" && filterMode === "All" && !searchQuery
              ? "No payment or request records yet. Create a payment request or mark invoices as paid to see them here."
              : searchQuery
              ? `No results for "${searchQuery}". Try different keywords or clear the search.`
              : `No ${filterType.toLowerCase()} ${filterMode.toLowerCase()} records in the current view. Try adjusting filters.`}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {(filterType !== "All" || filterMode !== "All" || searchQuery) && (
              <button
                type="button"
                className="table-action"
                onClick={() => {
                  setFilterType("All");
                  setFilterMode("All");
                  setSearchQuery("");
                }}
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)",
                  color: "#fff",
                  border: "none",
                  padding: "11px 24px",
                  fontWeight: 700,
                  borderRadius: 12,
                  boxShadow: "0 8px 24px -6px rgba(124, 58, 237, 0.5)",
                }}
              >
                Reset all filters
              </button>
            )}
            {filterType === "All" && filterMode === "All" && !searchQuery && (
              <button
                type="button"
                className="table-action"
                onClick={() => setShowRequestModal(true)}
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)",
                  color: "#fff",
                  border: "none",
                  padding: "11px 24px",
                  fontWeight: 700,
                  borderRadius: 12,
                  boxShadow: "0 8px 24px -6px rgba(124, 58, 237, 0.5)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Create Payment Request
              </button>
            )}
          </div>
        </div>
      )}

      {selectedPayment && (
        <PaymentDetailsModal payment={selectedPayment} onClose={() => setSelectedPayment(null)} />
      )}

      {/* New Payment Request Modal */}
      {showRequestModal && (
        <div className="cd-modal-backdrop" onMouseDown={closeRequestModal}>
          <section
            className="cd-modal"
            style={{ maxWidth: 640, maxHeight: "calc(100vh - 40px)", overflowY: "auto" }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button type="button" className="cd-modal-close" onClick={closeRequestModal}>
              ×
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: "rgba(124, 58, 237, 0.12)",
                  color: "#7c3aed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
              <div>
                <p className="cd-modal-desc" style={{ color: "#ec4899", fontSize: 12, fontWeight: 700, letterSpacing: 1, margin: 0 }}>
                  NEW REQUEST
                </p>
                <h2 style={{ margin: "4px 0 0", fontSize: 24 }}>Create Payment Request</h2>
              </div>
            </div>
            <p className="cd-modal-desc" style={{ marginBottom: 24 }}>
              Send a formal payment request to a client linked to an existing invoice.
            </p>

            {requestSuccess ? (
              <div style={{ textAlign: "center", padding: "40px 20px", margin: "10px 0 20px" }}>
                <div
                  style={{
                    width: 84,
                    height: 84,
                    borderRadius: 28,
                    margin: "0 auto 18px",
                    background: "rgba(22, 163, 74, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(22, 163, 74, 0.25)",
                    color: "#16a34a",
                  }}
                >
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#201a2e" }}>Request sent</p>
                <p style={{ margin: "8px 0 0", fontSize: 14, color: "#6b6472" }}>
                  The payment request has been added to your tracker.
                </p>
              </div>
            ) : (
              <>
                <div className="sp-request-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div className="sp-field">
                    <label>Client *</label>
                    <select
                      value={requestForm.clientId}
                      onChange={(e) => updateRequestField("clientId", e.target.value)}
                      style={requestErrors.clientId ? { borderColor: "#dc2626" } : undefined}
                    >
                      <option value="">Select a client…</option>
                      {mockClients.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} — {c.company}
                        </option>
                      ))}
                    </select>
                    {requestErrors.clientId && <span className="sp-field-error">{requestErrors.clientId}</span>}
                  </div>

                  <div className="sp-field">
                    <label>Amount (₹) *</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="e.g. 25000"
                      value={requestForm.amount}
                      onChange={(e) => updateRequestField("amount", e.target.value)}
                      style={requestErrors.amount ? { borderColor: "#dc2626" } : undefined}
                    />
                    {requestErrors.amount && <span className="sp-field-error">{requestErrors.amount}</span>}
                  </div>

                  <div className="sp-field">
                    <label>Payment Mode</label>
                    <select
                      value={requestForm.paymentMode}
                      onChange={(e) => updateRequestField("paymentMode", e.target.value)}
                    >
                      <option>Bank Transfer</option>
                      <option>UPI</option>
                      <option>Cheque</option>
                    </select>
                  </div>

                  <div className="sp-field">
                    <label>Due Date *</label>
                    <input
                      type="date"
                      value={requestForm.dueDate}
                      onChange={(e) => updateRequestField("dueDate", e.target.value)}
                      style={requestErrors.dueDate ? { borderColor: "#dc2626" } : undefined}
                    />
                    {requestErrors.dueDate && <span className="sp-field-error">{requestErrors.dueDate}</span>}
                  </div>

                  <div className="sp-field" style={{ gridColumn: "1 / -1" }}>
                    <label>Related Invoice (optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. INV-2026-008"
                      value={requestForm.relatedInvoice}
                      onChange={(e) => updateRequestField("relatedInvoice", e.target.value)}
                    />
                  </div>

                  <div className="sp-field" style={{ gridColumn: "1 / -1" }}>
                    <label>Description</label>
                    <textarea
                      rows={3}
                      placeholder="What is this payment for?"
                      value={requestForm.description}
                      onChange={(e) => updateRequestField("description", e.target.value)}
                      style={{ resize: "vertical", fontFamily: "inherit" }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    className="cd-table-action-btn"
                    onClick={closeRequestModal}
                    style={{ padding: "11px 20px" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateRequest}
                    style={{
                      background: "#4c1d95",
                      color: "#ffffff",
                      border: "none",
                      padding: "11px 24px",
                      fontWeight: 700,
                      fontSize: 14,
                      borderRadius: 12,
                      cursor: "pointer",
                      boxShadow: "0 8px 20px -8px rgba(76, 29, 149, 0.6)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#3b1578")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#4c1d95")}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Create Request
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      )}

      {/* Styles */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .sp-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 24px;
        }
        .sp-hero-banner {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          gap: 32px;
          flex-wrap: wrap;
          background: linear-gradient(120deg, #1e1330 0%, #3a2a5c 100%);
          border-radius: 24px;
          padding: 26px 32px;
          color: #fff;
          margin-bottom: 18px;
          box-shadow: 0 20px 40px -12px rgba(30, 19, 48, 0.35);
        }
        .sp-hero-decor-1 {
          position: absolute;
          top: -60px;
          right: -20px;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.35) 0%, transparent 70%);
        }
        .sp-hero-decor-2 {
          position: absolute;
          bottom: -70px;
          left: 30%;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(22, 163, 74, 0.18) 0%, transparent 70%);
        }
        .sp-hero-identity {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }
        .sp-hero-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(124, 58, 237, 0.25);
          border: 1px solid rgba(124, 58, 237, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c9a3f7;
          flex-shrink: 0;
        }
        .sp-hero-eyebrow {
          margin: 0;
          font-size: 11px;
          color: #a89ab5;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }
        .sp-hero-value {
          margin: 4px 0 0;
          font-size: 30px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }
        .sp-hero-bar-block {
          position: relative;
          z-index: 1;
          flex: 1;
          min-width: 240px;
        }
        .sp-hero-bar-label-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 12px;
        }
        .sp-hero-bar-track {
          height: 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          overflow: hidden;
          display: flex;
        }
        .sp-hero-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #16a34a 0%, #7c3aed 100%);
          border-radius: 999px;
          transition: width 0.6s ease;
        }
        .sp-hero-bar-overdue {
          height: 100%;
          background: linear-gradient(90deg, #dc2626 0%, #f0630a 100%);
        }
        .sp-hero-legend {
          position: relative;
          z-index: 1;
          display: flex;
          gap: 18px;
          flex-shrink: 0;
          font-size: 12px;
        }
        .sp-hero-legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #a89ab5;
        }
        .sp-hero-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
        }
        .sp-kpi-row {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .sp-kpi-card {
          flex: 1;
          min-width: 220px;
          display: flex;
          align-items: center;
          gap: 14px;
          background: #fff;
          border-radius: 18px;
          padding: 16px 18px;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 6px 18px -10px rgba(0,0,0,0.1);
        }
        .sp-kpi-icon {
          width: 42px;
          height: 42px;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .sp-kpi-label {
          display: block;
          font-size: 10.5px;
          color: #6b6472;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .sp-kpi-value {
          margin: 3px 0 2px;
          font-size: 20px;
          color: #201a2e;
          font-weight: 700;
          letter-spacing: -0.4px;
        }
        .sp-kpi-foot {
          font-size: 11.5px;
        }
        .sp-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 22px;
          padding: 14px 16px;
          background: linear-gradient(180deg, #faf9fc 0%, #faf7fb 100%);
          border-radius: 18px;
          border: 1px solid #efe6f9;
        }
        .sp-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .sp-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 14px;
          border-radius: 13px;
          cursor: pointer;
          font-family: inherit;
          font-size: 13px;
          transition: all 0.2s ease;
        }
        .sp-tab-icon {
          width: 24px;
          height: 24px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sp-tab-count {
          font-size: 10.5px;
          padding: 2px 8px;
          border-radius: 999px;
          font-weight: 800;
        }
        .sp-toolbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .sp-search {
          width: 220px;
        }
        .sp-search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }
        .sp-search-input {
          width: 100%;
          padding: 10px 34px 10px 36px;
          border-radius: 12px;
          border: 1px solid #ebe0ed;
          background: #fff;
          font-size: 13px;
          color: #201a2e;
          outline: none;
          font-family: inherit;
          transition: all 0.2s ease;
        }
        .sp-search-clear {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          background: #f5eff9;
          border: none;
          width: 22px;
          height: 22px;
          border-radius: 999px;
          cursor: pointer;
          color: #6b6472;
          font-size: 14px;
        }
        .sp-clear-btn {
          padding: 9px 14px;
          border-radius: 12px;
          border: 1px solid #ece2f7;
          background: #fff;
          color: #6b6472;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: inherit;
        }
        .sp-records-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 14px;
          flex-wrap: wrap;
          gap: 10px;
        }
        .cd-invoices-table th {
          font-size: 11px !important;
          font-weight: 800 !important;
          letter-spacing: 0.8px !important;
          color: #a39aad !important;
          text-transform: uppercase !important;
          background: #faf9fc !important;
          border-bottom: none !important;
        }
        .cd-invoices-table td {
          border-bottom: 1px solid #f8f4fa !important;
          vertical-align: middle !important;
        }
        .cd-invoices-table tbody tr:last-child td {
          border-bottom: none !important;
        }
        .sp-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .sp-field label {
          font-size: 12px;
          font-weight: 700;
          color: #5c5468;
          letter-spacing: 0.2px;
        }
        .sp-field input,
        .sp-field select,
        .sp-field textarea {
          padding: 11px 14px;
          border-radius: 12px;
          border: 1px solid #ebe0ed;
          background: #fff;
          font-size: 13.5px;
          color: #201a2e;
          outline: none;
          font-family: inherit;
          transition: all 0.2s ease;
        }
        .sp-field input:focus,
        .sp-field select:focus,
        .sp-field textarea:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1);
        }
        .sp-field-error {
          font-size: 11.5px;
          color: #dc2626;
          font-weight: 600;
        }
        .sp-empty-state {
          text-align: center;
          padding: 70px 28px;
          border-radius: 22px;
          background: linear-gradient(180deg, rgba(124, 58, 237, 0.05) 0%, rgba(236, 72, 153, 0.03) 50%, rgba(255,255,255,0) 100%);
          border: 1px solid #efe6f9;
        }
        .sp-empty-icon {
          width: 88px;
          height: 88px;
          border-radius: 28px;
          margin: 0 auto 22px;
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%);
          color: #7c3aed;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(124, 58, 237, 0.2);
          box-shadow: 0 12px 32px -8px rgba(124, 58, 237, 0.25);
        }
        @media (max-width: 720px) {
          .sp-hero-banner { flex-direction: column; align-items: flex-start; }
          .sp-toolbar { flex-direction: column; align-items: stretch; }
          .sp-search { width: 100%; }
          .sp-request-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}