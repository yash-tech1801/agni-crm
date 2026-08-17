import React, { useState } from "react";
import { monthNamesList } from "./mockOwnerData";

export default function OwnerRequestsPage({
  requestsList = [],
  onOpenRequestDecision,
  onCancelRequest,
}) {
  const [requestsActiveTab, setRequestsActiveTab] = useState("Pending Requests");
  const [historyMonthFilter, setHistoryMonthFilter] = useState("All");
  const [historyYearFilter, setHistoryYearFilter] = useState("All");
  const [historyStatusFilter, setHistoryStatusFilter] = useState("All");

  return (
    <section style={{ animation: "fadeIn 0.25s ease-out" }}>
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div>
          <p
            style={{
              fontSize: 13,
              color: "#6366f1",
              fontWeight: 700,
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Requests
          </p>
          <h1
            style={{
              margin: "4px 0 0 0",
              fontSize: 26,
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            Branch Manager Requests
          </h1>
          <p style={{ margin: "4px 0 0 0", fontSize: 13, color: "#64748b" }}>
            Review and decide on operational requests submitted directly by Branch Managers
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
        {["Pending Requests", "Request History"].map((tab) => {
          const count =
            tab === "Pending Requests"
              ? requestsList.filter((r) => r.status === "Pending").length
              : requestsList.filter((r) => r.status !== "Pending").length;
          return (
            <button
              key={tab}
              type="button"
              className="table-action"
              style={{
                background:
                  requestsActiveTab === tab
                    ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)"
                    : "#ffffff",
                color: requestsActiveTab === tab ? "#ffffff" : "#334155",
                border: requestsActiveTab === tab ? "none" : "1px solid #cbd5e1",
                minWidth: 170,
                padding: "10px 18px",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor: "pointer",
                boxShadow:
                  requestsActiveTab === tab
                    ? "0 4px 12px rgba(99, 102, 241, 0.25)"
                    : "none",
              }}
              onClick={() => setRequestsActiveTab(tab)}
            >
              <span>{tab}</span>
              <span
                style={{
                  padding: "2px 8px",
                  borderRadius: 999,
                  fontSize: 11,
                  background:
                    requestsActiveTab === tab
                      ? "rgba(255,255,255,0.25)"
                      : "#f1f5f9",
                  color: requestsActiveTab === tab ? "#ffffff" : "#64748b",
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PENDING REQUESTS */}
      {requestsActiveTab === "Pending Requests" ? (
        <div style={{ overflowX: "auto" }}>
          <table className="clients-table" style={{ minWidth: 900 }}>
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Client Name</th>
                <th>Request Type</th>
                <th>Requester &amp; Manager</th>
                <th>Request Date</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const pending = requestsList.filter((r) => r.status === "Pending");
                if (pending.length === 0) {
                  return (
                    <tr>
                      <td
                        colSpan={7}
                        style={{ textAlign: "center", padding: 36, color: "#64748b" }}
                      >
                        No pending requests awaiting approval.
                      </td>
                    </tr>
                  );
                }

                return pending.map((req) => (
                  <tr key={req.id}>
                    <td>
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontWeight: 700,
                          color: "#4f46e5",
                        }}
                      >
                        {req.id}
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: "#0f172a" }}>{req.clientName}</strong>
                      {req.requestedChanges && req.requestedChanges.length > 0 && (
                        <div style={{ fontSize: 11, color: "#64748b" }}>
                          {req.requestedChanges.length} Field Change(s)
                        </div>
                      )}
                    </td>
                    <td>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 700,
                          background:
                            req.requestType === "Delete Client" ? "#fee2e2" : "#e0e7ff",
                          color:
                            req.requestType === "Delete Client" ? "#b91c1c" : "#4338ca",
                        }}
                      >
                        {req.requestType}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: "#1e293b" }}>{req.requester}</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>
                        Branch Manager • {req.branch} Branch
                      </div>
                    </td>
                    <td>
                      <span style={{ color: "#475569", fontSize: 13 }}>{req.createdAt}</span>
                    </td>
                    <td>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "4px 10px",
                          borderRadius: 999,
                          background: "#fef3c7",
                          color: "#d97706",
                          fontWeight: 700,
                          fontSize: 12,
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "#d97706",
                          }}
                        />
                        Pending
                      </span>
                    </td>
                    <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          gap: 6,
                        }}
                      >
                        <button
                          className="table-action"
                          type="button"
                          style={{
                            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                            color: "#ffffff",
                            border: "none",
                            fontWeight: 600,
                            padding: "5px 10px",
                            borderRadius: 6,
                            whiteSpace: "nowrap",
                          }}
                          onClick={() => onOpenRequestDecision(req)}
                        >
                          View &amp; Decision
                        </button>
                        {onCancelRequest && (
                          <button
                            className="table-action danger"
                            type="button"
                            style={{ whiteSpace: "nowrap" }}
                            onClick={() => onCancelRequest(req.id)}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>
      ) : (
        /* TAB 2: REQUEST HISTORY WITH FILTERS */
        <div>
          {(() => {
            const historyList = requestsList.filter((r) => r.status !== "Pending");
            const years = [
              "All",
              ...Array.from(
                new Set(historyList.map((r) => new Date(r.createdAt).getFullYear()))
              ).sort(),
            ];

            const filteredHistory = historyList.filter((req) => {
              if (historyStatusFilter !== "All" && req.status !== historyStatusFilter)
                return false;
              const createdDate = new Date(req.createdAt);
              const monthName = monthNamesList[createdDate.getMonth() + 1];
              if (historyMonthFilter !== "All" && monthName !== historyMonthFilter)
                return false;
              if (
                historyYearFilter !== "All" &&
                String(createdDate.getFullYear()) !== historyYearFilter
              )
                return false;
              return true;
            });

            return (
              <>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 14,
                    marginBottom: 18,
                    background: "#ffffff",
                    padding: "14px 18px",
                    borderRadius: 12,
                    border: "1px solid #eef0f5",
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#64748b",
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      Month
                    </label>
                    <select
                      value={historyMonthFilter}
                      onChange={(e) => setHistoryMonthFilter(e.target.value)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 8,
                        border: "1px solid #cbd5e1",
                        fontSize: 13,
                        minWidth: 140,
                      }}
                    >
                      {monthNamesList.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#64748b",
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      Year
                    </label>
                    <select
                      value={historyYearFilter}
                      onChange={(e) => setHistoryYearFilter(e.target.value)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 8,
                        border: "1px solid #cbd5e1",
                        fontSize: 13,
                        minWidth: 120,
                      }}
                    >
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#64748b",
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      Status
                    </label>
                    <select
                      value={historyStatusFilter}
                      onChange={(e) => setHistoryStatusFilter(e.target.value)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 8,
                        border: "1px solid #cbd5e1",
                        fontSize: 13,
                        minWidth: 140,
                      }}
                    >
                      <option value="All">All Statuses</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table className="clients-table" style={{ minWidth: 940 }}>
                    <thead>
                      <tr>
                        <th>Request ID</th>
                        <th>Client Name</th>
                        <th>Request Type</th>
                        <th>Assigned Manager</th>
                        <th>Status</th>
                        <th>Decision Date</th>
                        <th style={{ textAlign: "right" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHistory.length === 0 ? (
                        <tr>
                          <td
                            colSpan={7}
                            style={{ textAlign: "center", padding: 36, color: "#64748b" }}
                          >
                            No requests found matching history filters.
                          </td>
                        </tr>
                      ) : (
                        filteredHistory.map((req) => {
                          const badgeBg =
                            req.status === "Approved"
                              ? "#dcfce7"
                              : req.status === "Rejected"
                              ? "#ffe4e6"
                              : "#f1f5f9";

                          const badgeText =
                            req.status === "Approved"
                              ? "#15803d"
                              : req.status === "Rejected"
                              ? "#be123c"
                              : "#475569";

                          return (
                            <tr key={req.id}>
                              <td>
                                <span
                                  style={{
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    color: "#4f46e5",
                                  }}
                                >
                                  {req.id}
                                </span>
                              </td>
                              <td>
                                <strong style={{ color: "#0f172a" }}>{req.clientName}</strong>
                              </td>
                              <td>
                                <span
                                  style={{
                                    padding: "4px 10px",
                                    borderRadius: 6,
                                    fontSize: 12,
                                    fontWeight: 700,
                                    background: "#f1f5f9",
                                    color: "#475569",
                                  }}
                                >
                                  {req.requestType}
                                </span>
                              </td>
                              <td>
                                <span style={{ color: "#334155" }}>{req.managerName}</span>
                              </td>
                              <td>
                                <span
                                  style={{
                                    padding: "4px 10px",
                                    borderRadius: 999,
                                    fontSize: 12,
                                    fontWeight: 700,
                                    background: badgeBg,
                                    color: badgeText,
                                  }}
                                >
                                  {req.status}
                                </span>
                              </td>
                              <td>
                                <span style={{ color: "#64748b", fontSize: 13 }}>
                                  {req.decisionDate || "-"}
                                </span>
                              </td>
                              <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                                <button
                                  className="table-action"
                                  type="button"
                                  onClick={() => onOpenRequestDecision(req)}
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </section>
  );
}
