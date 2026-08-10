import React from "react";

const invoiceMetrics = [
  { label: "Paid Year-To-Date", value: "₹3,07,000", color: "#44bfb0", bg: "rgba(68, 191, 176, 0.12)" },
  { label: "Pending Balance", value: "₹42,000", color: "#f2aa38", bg: "rgba(242, 170, 56, 0.12)" },
  { label: "Total Invoices Issued", value: "6 Invoices", color: "#4e7cff", bg: "rgba(78, 124, 255, 0.12)" },
  { label: "Next Billing Cycle", value: "14 Jun 2027", color: "#9a74e9", bg: "rgba(154, 116, 233, 0.12)" }
];

const invoicesData = [
  {
    id: "INV-2026-091",
    service: "Corporate Health Shield (Annual Premium)",
    amount: "₹42,000",
    tax: "₹7,560 (18% GST)",
    totalAmount: "₹49,560",
    issueDate: "01 Aug 2026",
    dueDate: "15 Aug 2026",
    status: "Pending",
    accountManager: "Kansish",
    gstNo: "27AAACA0000A1Z5"
  },
  {
    id: "INV-2026-064",
    service: "Enterprise IT Infra Shield Setup",
    amount: "₹85,000",
    tax: "₹15,300 (18% GST)",
    totalAmount: "₹1,00,300",
    issueDate: "01 Mar 2026",
    dueDate: "15 Mar 2026",
    status: "Paid",
    accountManager: "Noah Kim",
    gstNo: "27AAACA0000A1Z5"
  },
  {
    id: "INV-2026-042",
    service: "Brand Growth Suite Activation",
    amount: "₹60,000",
    tax: "₹10,800 (18% GST)",
    totalAmount: "₹70,800",
    issueDate: "20 May 2026",
    dueDate: "05 Jun 2026",
    status: "Paid",
    accountManager: "Mia Ross",
    gstNo: "27AAACA0000A1Z5"
  },
  {
    id: "INV-2026-018",
    service: "Mudra Export Certification Fee",
    amount: "₹1,20,000",
    tax: "₹21,600 (18% GST)",
    totalAmount: "₹1,41,600",
    issueDate: "15 Jan 2026",
    dueDate: "30 Jan 2026",
    status: "Paid",
    accountManager: "Kansish",
    gstNo: "27AAACA0000A1Z5"
  },
  {
    id: "INV-2025-884",
    service: "Annual Compliance Audit & Review",
    amount: "₹42,000",
    tax: "₹7,560 (18% GST)",
    totalAmount: "₹49,560",
    issueDate: "10 Dec 2025",
    dueDate: "25 Dec 2025",
    status: "Paid",
    accountManager: "Kansish",
    gstNo: "27AAACA0000A1Z5"
  }
];

export default function InvoicesPage() {
  const [selectedInvoice, setSelectedInvoice] = React.useState(null);
  const [paidInvoices, setPaidInvoices] = React.useState([]);
  const [downloadNotice, setDownloadNotice] = React.useState(null);

  function triggerDownload(inv, isPaid) {
    const statusText = isPaid ? "PAID & CLEARED" : "PENDING PAYMENT";
    const fileContent = `
====================================================================
                        AGNI CRM - OFFICIAL INVOICE
====================================================================
Invoice Number  : ${inv.id}
Client Name     : Acme Industries Pvt. Ltd. (CLI-2026-8942)
Service Line    : ${inv.service}
Issue Date      : ${inv.issueDate}
Due Date        : ${inv.dueDate}
Account Manager : ${inv.accountManager}
GSTIN / Reg No  : ${inv.gstNo}
--------------------------------------------------------------------
Base Fee        : ${inv.amount}
Applicable GST  : ${inv.tax}
TOTAL AMOUNT    : ${inv.totalAmount}
PAYMENT STATUS  : ${statusText}
--------------------------------------------------------------------
Thank you for choosing AgniCRM Enterprise Services.
For billing support contact: billing@agnicrm.com
====================================================================
`.trim();

    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${inv.id}_AgniCRM_Invoice.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadNotice(`Downloaded official invoice receipt for ${inv.id}!`);
  }

  function handlePayNow(inv) {
    setPaidInvoices(prev => [...prev, inv.id]);
    setSelectedInvoice(null);
    setDownloadNotice(`Payment for ${inv.id} completed successfully! Invoice updated to Paid.`);
  }

  return (
    <div className="cd-subpage-container">
      {/* Header Intro */}
      <div className="cd-subpage-intro">
        <div>
          <span className="cd-kicker">FINANCIALS & BILLING</span>
          <h2>Invoices & Payment Receipts</h2>
          <p>Download billing receipts, inspect payment breakdowns, and pay outstanding invoices online.</p>
        </div>
        <span className="cd-count-pill">{invoicesData.length} Invoices On Record</span>
      </div>

      {/* Download Alert Notice */}
      {downloadNotice && (
        <div className="cd-alert-success-banner">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>{downloadNotice}</span>
          <button type="button" onClick={() => setDownloadNotice(null)}>×</button>
        </div>
      )}

      {/* Metrics Banner */}
      <div className="cd-metrics-grid" style={{ marginBottom: 28 }}>
        {invoiceMetrics.map(item => (
          <article key={item.label} className="cd-metric-card">
            <div className="cd-metric-icon-box" style={{ background: item.bg, color: item.color }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6M9 12h6"/></svg>
            </div>
            <div className="cd-metric-info">
              <span className="cd-metric-value">{item.value}</span>
              <span className="cd-metric-label">{item.label}</span>
            </div>
          </article>
        ))}
      </div>

      {/* Invoices Table Card */}
      <div className="cd-section-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="cd-section-head" style={{ padding: '24px 28px 16px', margin: 0 }}>
          <div>
            <span className="cd-kicker">BILLING RECORD</span>
            <h2 style={{ fontSize: 20 }}>All Invoices</h2>
          </div>
        </div>

        <div className="cd-table-wrap">
          <table className="cd-invoices-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Service / Policy Name</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Total Billed</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoicesData.map(inv => {
                const isPaid = inv.status === "Paid" || paidInvoices.includes(inv.id);
                return (
                  <tr key={inv.id}>
                    <td>
                      <strong className="cd-inv-id">{inv.id}</strong>
                    </td>
                    <td>{inv.service}</td>
                    <td>{inv.issueDate}</td>
                    <td>{inv.dueDate}</td>
                    <td>
                      <strong className="cd-inv-amount">{inv.totalAmount}</strong>
                    </td>
                    <td>
                      <span className={`cd-doc-status-badge ${isPaid ? "verified" : "pending"}`}>
                        {isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          type="button"
                          className="cd-table-action-btn"
                          style={{ background: 'rgba(68, 191, 176, 0.1)', color: '#44bfb0', borderColor: 'rgba(68, 191, 176, 0.3)' }}
                          onClick={() => triggerDownload(inv, isPaid)}
                          title="Download Invoice File"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: 4 }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                          Download
                        </button>
                        <button
                          type="button"
                          className="cd-table-action-btn"
                          onClick={() => setSelectedInvoice({ ...inv, isPaid })}
                        >
                          {isPaid ? "Inspect" : "Pay Now"}
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

      {/* Invoice Inspection & Download Modal */}
      {selectedInvoice && (
        <div className="cd-modal-backdrop" onMouseDown={() => setSelectedInvoice(null)}>
          <section className="cd-modal cd-modal-sm" onMouseDown={(e) => e.stopPropagation()}>
            <button type="button" className="cd-modal-close" onClick={() => setSelectedInvoice(null)}>×</button>
            <span className={`cd-doc-status-badge ${selectedInvoice.isPaid ? "verified" : "pending"}`} style={{ marginBottom: 12 }}>
              {selectedInvoice.isPaid ? "Paid & Cleared" : "Payment Pending"}
            </span>
            <h2>{selectedInvoice.id}</h2>
            <p className="cd-modal-desc">{selectedInvoice.service}</p>

            <div className="cd-scheme-meta-box" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: 20 }}>
              <div>
                <span>Base Amount</span>
                <strong>{selectedInvoice.amount}</strong>
              </div>
              <div>
                <span>GST Tax (18%)</span>
                <strong>{selectedInvoice.tax}</strong>
              </div>
              <div>
                <span>Total Amount Due</span>
                <strong style={{ color: '#4e7cff' }}>{selectedInvoice.totalAmount}</strong>
              </div>
              <div>
                <span>Due Date</span>
                <strong>{selectedInvoice.dueDate}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                type="button"
                className="cd-submit-btn"
                style={{ background: 'linear-gradient(135deg, #44bfb0 0%, #2b9e90 100%)' }}
                onClick={() => triggerDownload(selectedInvoice, selectedInvoice.isPaid)}
              >
                Download Official Invoice File ({selectedInvoice.id})
              </button>

              {!selectedInvoice.isPaid && (
                <button
                  type="button"
                  className="cd-submit-btn"
                  onClick={() => handlePayNow(selectedInvoice)}
                >
                  Pay {selectedInvoice.totalAmount} Online
                </button>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
