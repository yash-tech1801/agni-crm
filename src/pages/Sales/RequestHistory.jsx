import React, { useMemo, useState } from "react";
import Icon from "../../components/Icon";

const months = [
  "All",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const statusConfig = {
  Approved: { bg: "rgba(16, 185, 129, 0.12)", color: "#10b981", dot: "#10b981" },
  Rejected: { bg: "rgba(244, 63, 94, 0.12)", color: "#f43f5e", dot: "#f43f5e" },
  Cancelled: { bg: "rgba(100, 116, 139, 0.12)", color: "#64748b", dot: "#64748b" },
  Pending: { bg: "rgba(245, 158, 11, 0.12)", color: "#f59e0b", dot: "#f59e0b" },
};

export default function RequestHistory({ requests = [], onView }) {
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const years = useMemo(() => {
    const yearSet = new Set(
      requests
        .filter((r) => r.createdAt)
        .map((request) => new Date(request.createdAt).getFullYear())
    );
    return ["All", ...Array.from(yearSet).sort().reverse()];
  }, [requests]);

  const filtered = useMemo(() => {
    return requests.filter((request) => {
      if (selectedStatus !== "All" && request.status !== selectedStatus) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = request.clientName?.toLowerCase().includes(q);
        const matchId = request.id?.toLowerCase().includes(q);
        const matchMgr = request.managerName?.toLowerCase().includes(q);
        if (!matchName && !matchId && !matchMgr) return false;
      }

      if (request.createdAt) {
        const createdDate = new Date(request.createdAt);
        const monthName = months[createdDate.getMonth() + 1];
        if (selectedMonth !== "All" && monthName !== selectedMonth) {
          return false;
        }

        if (selectedYear !== "All" && String(createdDate.getFullYear()) !== selectedYear) {
          return false;
        }
      }

      return true;
    });
  }, [requests, selectedMonth, selectedYear, selectedStatus, searchQuery]);

  return (
    <div>
      {/* Filter Toolbar */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid rgba(140, 95, 248, 0.12)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, flex: 1 }}>
          <div style={{ minWidth: 200, flex: "1 1 200px" }}>
            <input
              type="text"
              placeholder="Search by client or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 14px",
                borderRadius: 10,
                fontSize: 13,
              }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              style={{ padding: "8px 12px", borderRadius: 10, fontSize: 13 }}
            >
              <option value="All">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              value={selectedMonth}
              onChange={(event) => setSelectedMonth(event.target.value)}
              style={{ padding: "8px 12px", borderRadius: 10, fontSize: 13 }}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month === "All" ? "All Months" : month}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(event) => setSelectedYear(event.target.value)}
              style={{ padding: "8px 12px", borderRadius: 10, fontSize: 13 }}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year === "All" ? "All Years" : year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {(selectedStatus !== "All" || selectedMonth !== "All" || selectedYear !== "All" || searchQuery) && (
          <button
            type="button"
            className="sales-btn-secondary"
            onClick={() => {
              setSelectedStatus("All");
              setSelectedMonth("All");
              setSelectedYear("All");
              setSearchQuery("");
            }}
            style={{ padding: "7px 12px", fontSize: 12 }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div style={{ padding: "48px 24px", textAlign: "center" }}>
          <p style={{ margin: 0, color: "#7a748e", fontSize: 13.5 }}>
            No request history found matching the selected filter criteria.
          </p>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="sales-clients-table" style={{ width: "100%", minWidth: 900, margin: 0 }}>
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Client Name</th>
                <th>Request Type</th>
                <th>Assigned Manager</th>
                <th>Status</th>
                <th>Decision Date</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((request) => {
                const conf = statusConfig[request.status] || statusConfig.Pending;
                const isDelete = request.requestType === "Delete Client";
                return (
                  <tr key={request.id}>
                    <td>
                      <span style={{ fontWeight: 700, color: "#8c5ff8", fontFamily: "monospace", fontSize: 12.5 }}>
                        {request.id}
                      </span>
                    </td>
                    <td>
                      <strong style={{ display: "block", fontSize: 13.5 }}>{request.clientName}</strong>
                    </td>
                    <td>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 12,
                          fontWeight: 600,
                          color: isDelete ? "#f43f5e" : "#8c5ff8",
                        }}
                      >
                        <Icon name={isDelete ? "trash" : "document"} size={13} />
                        {request.requestType}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: 13, color: "#7a748e" }}>{request.managerName}</span>
                    </td>
                    <td>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "4px 10px",
                          borderRadius: 999,
                          background: conf.bg,
                          color: conf.color,
                          fontWeight: 700,
                          fontSize: 11.5,
                        }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: 999, background: conf.dot }} />
                        {request.status}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: 12.5, color: "#7a748e" }}>{request.decisionDate || "-"}</span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        className="sales-view-btn"
                        type="button"
                        onClick={() => onView(request)}
                        style={{ padding: "6px 14px", fontSize: 12 }}
                      >
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

