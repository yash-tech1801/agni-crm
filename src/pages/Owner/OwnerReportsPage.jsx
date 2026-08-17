import React, { useState } from "react";
import TopPerformerLeaderboard from "../../components/TopPerformerLeaderboard";
import PerformanceChart from "../../components/PerformanceChart";
import SimpleModal from "../../components/SimpleModal";
import {
  topPerformers,
  reportRoleOptions,
  branchOptions,
  generateYearlySeries,
} from "./mockOwnerData";

export default function OwnerReportsPage({
  employeesList = [],
}) {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [reportRoleFilter, setReportRoleFilter] = useState("");
  const [reportBranchFilter, setReportBranchFilter] = useState("");
  const [selectedEmployeeForChart, setSelectedEmployeeForChart] = useState(null);

  const resetReportFilters = () => {
    setReportRoleFilter("");
    setReportBranchFilter("");
  };

  const openPerformance = (employee) => {
    const series = generateYearlySeries(employee);
    const lastMonth = series[10];
    const thisMonth = series[11];
    setSelectedEmployeeForChart({ ...employee, lastMonth, thisMonth, series });
  };

  const closePerformance = () => {
    setSelectedEmployeeForChart(null);
  };

  const filteredEmployees = employeesList.filter((employee) => {
    const roleOk =
      !reportRoleFilter ||
      (employee.role || "").toLowerCase() === (reportRoleFilter || "").toLowerCase();
    const branchOk =
      !reportBranchFilter || (employee.branch || "") === reportBranchFilter;
    return roleOk && branchOk;
  });

  return (
    <section style={{ animation: "fadeIn 0.25s ease-out" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Employee reports
          </h2>
          <div style={{ color: "#7a748e", fontSize: 13, marginTop: 4 }}>
            Last month vs this month performance &amp; team leaderboards
          </div>
        </div>
      </div>

      <div
        className="report-action-group"
        style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}
      >
        <button type="button" className="table-action" onClick={resetReportFilters}>
          Reset filters
        </button>
        <button
          type="button"
          className="table-action"
          onClick={() => setShowLeaderboard((show) => !show)}
        >
          {showLeaderboard ? "Hide leaderboard" : "Leaderboard"}
        </button>
      </div>

      {showLeaderboard ? (
        <div style={{ marginBottom: 18 }}>
          <TopPerformerLeaderboard performers={topPerformers} />
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              marginBottom: 16,
              flexWrap: "wrap",
            }}
          >
            <label style={{ fontSize: 13, color: "#6b6b77", marginRight: 6, fontWeight: 500 }}>
              Role:
            </label>
            <select
              value={reportRoleFilter}
              onChange={(e) => setReportRoleFilter(e.target.value)}
              style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 13 }}
            >
              {reportRoleOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <label style={{ fontSize: 13, color: "#6b6b77", margin: "0 6px 0 10px", fontWeight: 500 }}>
              Branch:
            </label>
            <select
              value={reportBranchFilter}
              onChange={(e) => setReportBranchFilter(e.target.value)}
              style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 13 }}
            >
              {branchOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <table className="clients-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Branch</th>
                <th>Role</th>
                <th>Last month</th>
                <th>This month</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: 36, color: "#64748b" }}>
                    No employee reports found matching the filters.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((employee) => {
                  const series = generateYearlySeries(employee);
                  const lastMonth = series[10];
                  const thisMonth = series[11];
                  return (
                    <tr key={employee.id}>
                      <td>
                        <strong style={{ color: "#1e293b" }}>{employee.name}</strong>
                      </td>
                      <td>{employee.branch}</td>
                      <td>
                        <span
                          style={{
                            padding: "3px 8px",
                            borderRadius: 6,
                            background: "#f1f5f9",
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#475569",
                            textTransform: "capitalize",
                          }}
                        >
                          {employee.role}
                        </span>
                      </td>
                      <td>₹{lastMonth.toLocaleString()}</td>
                      <td>
                        <strong style={{ color: "#059669" }}>
                          ₹{thisMonth.toLocaleString()}
                        </strong>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <button
                          className="table-action"
                          onClick={() => openPerformance(employee)}
                        >
                          View chart
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </>
      )}

      {selectedEmployeeForChart && (
        <SimpleModal onClose={closePerformance}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #eef0f5",
              paddingBottom: 12,
              marginBottom: 16,
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
                Performance Trend — {selectedEmployeeForChart.name}
              </h3>
              <div style={{ color: "#7a748e", fontSize: 13, marginTop: 2 }}>
                Role: {selectedEmployeeForChart.role} | Branch: {selectedEmployeeForChart.branch}
              </div>
            </div>
          </div>
          <PerformanceChart
            series={selectedEmployeeForChart.series}
            label={`Employee: ${selectedEmployeeForChart.name}`}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <button className="table-action" type="button" onClick={closePerformance}>
              Close
            </button>
          </div>
        </SimpleModal>
      )}
    </section>
  );
}
