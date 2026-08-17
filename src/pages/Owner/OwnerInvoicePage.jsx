import React, { useState } from "react";
import Icon from "../../components/Icon";
import { branchOptions, regionOptions, downloadInvoiceFile } from "./mockOwnerData";

const PAGE_SIZE = 15;

export default function OwnerInvoicePage({
  invoices = [],
  onOpenInvoiceDetails,
}) {
  const [invoiceBranchFilter, setInvoiceBranchFilter] = useState("");
  const [invoiceRegionFilter, setInvoiceRegionFilter] = useState("");
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState("");
  const [invoiceSearch, setInvoiceSearch] = useState("");
  const [invoicePage, setInvoicePage] = useState(1);
  const [invoiceDownloadNotice, setInvoiceDownloadNotice] = useState(null);

  const filteredInvoices = invoices.filter((inv) => {
    const branchOk = !invoiceBranchFilter || inv.branch === invoiceBranchFilter;
    const regionOk = !invoiceRegionFilter || inv.region === invoiceRegionFilter;
    const statusOk = !invoiceStatusFilter || inv.status === invoiceStatusFilter;
    const searchLower = invoiceSearch.toLowerCase().trim();
    const searchOk =
      !searchLower ||
      (inv.id || "").toLowerCase().includes(searchLower) ||
      (inv.clientName || "").toLowerCase().includes(searchLower) ||
      (inv.company || "").toLowerCase().includes(searchLower) ||
      (inv.serviceName || "").toLowerCase().includes(searchLower);
    return branchOk && regionOk && statusOk && searchOk;
  });

  const invoiceTotalPages = Math.max(1, Math.ceil(filteredInvoices.length / PAGE_SIZE));
  const invoicePageItems = filteredInvoices.slice(
    (invoicePage - 1) * PAGE_SIZE,
    invoicePage * PAGE_SIZE
  );

  const totalInvoicedAmount = filteredInvoices.reduce(
    (sum, inv) => sum + (inv.rawTotal || 0),
    0
  );
  const totalPaidAmount = filteredInvoices
    .filter((i) => i.status === "Paid")
    .reduce((sum, inv) => sum + (inv.rawTotal || 0), 0);
  const totalPendingAmount = filteredInvoices
    .filter((i) => i.status !== "Paid")
    .reduce((sum, inv) => sum + (inv.rawTotal || 0), 0);

  const handleDownload = (inv) => {
    downloadInvoiceFile(inv, (msg) => {
      setInvoiceDownloadNotice(msg);
      setTimeout(() => setInvoiceDownloadNotice(null), 4000);
    });
  };

  const handleResetFilters = () => {
    setInvoiceBranchFilter("");
    setInvoiceRegionFilter("");
    setInvoiceStatusFilter("");
    setInvoiceSearch("");
    setInvoicePage(1);
  };

  return (
    <section style={{ animation: "fadeIn 0.25s ease-out" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                color: "#fff",
                padding: "8px 12px",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(99, 102, 241, 0.25)",
              }}
            >
              <Icon name="invoice" size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>
                Client Invoices
              </h2>
              <div style={{ color: "#7a748e", fontSize: 13, marginTop: 2 }}>
                Manage, search, and track billing across all company branches &amp; regions
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            className="table-action"
            onClick={handleResetFilters}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 14px",
              borderRadius: 8,
            }}
          >
            Reset all filters
          </button>
        </div>
      </div>

      {invoiceDownloadNotice && (
        <div
          style={{
            background: "rgba(68, 191, 176, 0.12)",
            border: "1px solid rgba(68, 191, 176, 0.3)",
            color: "#2b9385",
            padding: "12px 18px",
            borderRadius: 10,
            marginBottom: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 13,
            boxShadow: "0 2px 8px rgba(68, 191, 176, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16 }}>✓</span>
            <strong>{invoiceDownloadNotice}</strong>
          </div>
          <button
            type="button"
            onClick={() => setInvoiceDownloadNotice(null)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "inherit",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Metrics Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 22,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #fbfbfe 100%)",
            padding: "18px 22px",
            borderRadius: 14,
            border: "1px solid var(--border-color, #eef0f5)",
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 4px 16px rgba(0,0,0,0.02)",
          }}
        >
          <div
            style={{
              background: "rgba(99, 102, 241, 0.12)",
              color: "#6366f1",
              padding: 14,
              borderRadius: 12,
              display: "flex",
            }}
          >
            <Icon name="invoice" size={24} />
          </div>
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "var(--text-main, #1e1b2e)",
                letterSpacing: "-0.02em",
              }}
            >
              ₹{totalInvoicedAmount.toLocaleString()}
            </div>
            <div style={{ fontSize: 12, color: "#7a748e", marginTop: 2, fontWeight: 500 }}>
              Total Billed Value
            </div>
          </div>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #fbfbfe 100%)",
            padding: "18px 22px",
            borderRadius: 14,
            border: "1px solid var(--border-color, #eef0f5)",
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 4px 16px rgba(0,0,0,0.02)",
          }}
        >
          <div
            style={{
              background: "rgba(68, 191, 176, 0.12)",
              color: "#2b9385",
              padding: 14,
              borderRadius: 12,
              display: "flex",
            }}
          >
            <Icon name="arrowUp" size={24} />
          </div>
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#2b9385",
                letterSpacing: "-0.02em",
              }}
            >
              ₹{totalPaidAmount.toLocaleString()}
            </div>
            <div style={{ fontSize: 12, color: "#7a748e", marginTop: 2, fontWeight: 500 }}>
              Collected / Paid
            </div>
          </div>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #fbfbfe 100%)",
            padding: "18px 22px",
            borderRadius: 14,
            border: "1px solid var(--border-color, #eef0f5)",
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 4px 16px rgba(0,0,0,0.02)",
          }}
        >
          <div
            style={{
              background: "rgba(242, 170, 56, 0.12)",
              color: "#b87b14",
              padding: 14,
              borderRadius: 12,
              display: "flex",
            }}
          >
            <Icon name="overview" size={24} />
          </div>
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#b87b14",
                letterSpacing: "-0.02em",
              }}
            >
              ₹{totalPendingAmount.toLocaleString()}
            </div>
            <div style={{ fontSize: 12, color: "#7a748e", marginTop: 2, fontWeight: 500 }}>
              Pending / Overdue
            </div>
          </div>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #fbfbfe 100%)",
            padding: "18px 22px",
            borderRadius: 14,
            border: "1px solid var(--border-color, #eef0f5)",
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 4px 16px rgba(0,0,0,0.02)",
          }}
        >
          <div
            style={{
              background: "rgba(78, 124, 255, 0.12)",
              color: "#4e7cff",
              padding: 14,
              borderRadius: 12,
              display: "flex",
            }}
          >
            <Icon name="clients" size={24} />
          </div>
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "var(--text-main, #1e1b2e)",
                letterSpacing: "-0.02em",
              }}
            >
              {filteredInvoices.length}
            </div>
            <div style={{ fontSize: 12, color: "#7a748e", marginTop: 2, fontWeight: 500 }}>
              Total Active Invoices
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          marginBottom: 18,
          flexWrap: "wrap",
          background: "var(--panel-bg, #ffffff)",
          padding: "14px 20px",
          borderRadius: 12,
          border: "1px solid var(--border-color, #eef0f5)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
        }}
      >
        {/* Search Box */}
        <div style={{ flex: "1 1 240px", minWidth: 220, position: "relative" }}>
          <input
            type="text"
            placeholder="Search by client, ID, service..."
            value={invoiceSearch}
            onChange={(e) => {
              setInvoiceSearch(e.target.value);
              setInvoicePage(1);
            }}
            style={{
              width: "100%",
              padding: "8px 12px 8px 34px",
              borderRadius: 8,
              border: "1px solid #e2e8f0",
              fontSize: 13,
              outline: "none",
              background: "#fcfcfd",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
              fontSize: 14,
              pointerEvents: "none",
            }}
          >
            🔍
          </span>
        </div>

        <div>
          <label style={{ fontSize: 13, color: "#6b6b77", marginRight: 8, fontWeight: 500 }}>
            Branch:
          </label>
          <select
            value={invoiceBranchFilter}
            onChange={(e) => {
              setInvoiceBranchFilter(e.target.value);
              setInvoicePage(1);
            }}
            style={{
              padding: "7px 12px",
              borderRadius: 8,
              border: "1px solid #e2e8f0",
              fontSize: 13,
            }}
          >
            {branchOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontSize: 13, color: "#6b6b77", marginRight: 8, fontWeight: 500 }}>
            Region:
          </label>
          <select
            value={invoiceRegionFilter}
            onChange={(e) => {
              setInvoiceRegionFilter(e.target.value);
              setInvoicePage(1);
            }}
            style={{
              padding: "7px 12px",
              borderRadius: 8,
              border: "1px solid #e2e8f0",
              fontSize: 13,
            }}
          >
            {regionOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontSize: 13, color: "#6b6b77", marginRight: 8, fontWeight: 500 }}>
            Status:
          </label>
          <select
            value={invoiceStatusFilter}
            onChange={(e) => {
              setInvoiceStatusFilter(e.target.value);
              setInvoicePage(1);
            }}
            style={{
              padding: "7px 12px",
              borderRadius: 8,
              border: "1px solid #e2e8f0",
              fontSize: 13,
            }}
          >
            <option value="">All status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Invoices Table */}
      <table className="clients-table">
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Client / Company</th>
            <th>Branch</th>
            <th>Region Name</th>
            <th>Service Line</th>
            <th>Total Billed</th>
            <th>Status</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoicePageItems.length === 0 ? (
            <tr>
              <td
                colSpan="8"
                style={{ textAlign: "center", padding: "36px", color: "#7a748e" }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>📑</div>
                <div style={{ fontWeight: 600, fontSize: 15, color: "#475569" }}>
                  No invoices found
                </div>
                <div style={{ fontSize: 13, marginTop: 4 }}>
                  Try clearing search queries or adjusting branch &amp; region filters.
                </div>
              </td>
            </tr>
          ) : (
            invoicePageItems.map((inv) => {
              const initials = (inv.clientName || "")
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();
              return (
                <tr key={inv.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span
                        style={{
                          color: "#6366f1",
                          fontWeight: 700,
                          fontFamily: "monospace",
                          fontSize: 13,
                        }}
                      >
                        {inv.id}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
                          color: "#4338ca",
                          fontWeight: 700,
                          fontSize: 12,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {initials}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: "#1e293b" }}>{inv.clientName}</div>
                        <div style={{ fontSize: 12, color: "#64748b" }}>{inv.company}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        padding: "3px 9px",
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        background: "#f1f5f9",
                        color: "#475569",
                      }}
                    >
                      {inv.branch}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        padding: "3px 9px",
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 500,
                        background: "#f8fafc",
                        color: "#64748b",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      {inv.region}
                    </span>
                  </td>
                  <td style={{ fontSize: 13 }}>{inv.serviceName}</td>
                  <td>
                    <strong style={{ fontSize: 14, color: "#0f172a" }}>
                      {inv.totalAmount}
                    </strong>
                  </td>
                  <td>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "4px 10px",
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 600,
                        background:
                          inv.status === "Paid"
                            ? "rgba(68, 191, 176, 0.14)"
                            : inv.status === "Pending"
                            ? "rgba(242, 170, 56, 0.14)"
                            : "rgba(239, 68, 68, 0.14)",
                        color:
                          inv.status === "Paid"
                            ? "#147b6e"
                            : inv.status === "Pending"
                            ? "#a16207"
                            : "#dc2626",
                      }}
                    >
                      <span style={{ fontSize: 8 }}>●</span> {inv.status}
                    </span>
                  </td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <button
                      className="table-action"
                      type="button"
                      onClick={() => onOpenInvoiceDetails(inv)}
                      style={{ padding: "4px 10px" }}
                    >
                      Info
                    </button>
                    <button
                      className="table-action"
                      type="button"
                      onClick={() => handleDownload(inv)}
                      style={{ marginLeft: 6, padding: "4px 10px" }}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div
        className="table-pagination"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 14,
        }}
      >
        <div style={{ color: "#6b6b77", fontSize: 13 }}>
          Showing {filteredInvoices.length === 0 ? 0 : (invoicePage - 1) * PAGE_SIZE + 1} -{" "}
          {Math.min(invoicePage * PAGE_SIZE, filteredInvoices.length)} of{" "}
          {filteredInvoices.length} invoices
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button
            className="table-action"
            disabled={invoicePage <= 1}
            onClick={() => setInvoicePage((p) => Math.max(1, p - 1))}
          >
            Prev
          </button>
          <span style={{ margin: "0 8px", fontSize: 13, fontWeight: 500 }}>
            Page {invoicePage} of {invoiceTotalPages}
          </span>
          <button
            className="table-action"
            disabled={invoicePage >= invoiceTotalPages}
            onClick={() => setInvoicePage((p) => Math.min(invoiceTotalPages, p + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
