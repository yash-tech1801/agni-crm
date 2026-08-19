import React, { useState } from "react";
import Icon from "../../components/Icon";
import TopPerformerLeaderboard from "../../components/TopPerformerLeaderboard";
import PerformanceChart from "../../components/PerformanceChart";
import SimpleModal from "../../components/SimpleModal";
import { generateYearlySeries } from "./mockManagerData";

export default function ManagerReportsPage({ branchTeam = [], managedRegion = "East Zone" }) {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [selectedPerformanceEmployee, setSelectedPerformanceEmployee] = useState(null);

  function openPerformance(employee) {
    const series = generateYearlySeries(employee);
    setSelectedPerformanceEmployee({ ...employee, series });
  }

  function closePerformance() {
    setSelectedPerformanceEmployee(null);
  }

  return (
    <section className="manager-page-view">
      {/* Header Banner */}
      <div className="manager-header-banner">
        <div className="manager-header-info">
          <p className="manager-header-eyebrow">Performance & Analytics</p>
          <h1 className="manager-header-title">Representative Performance Reports</h1>
          <p className="manager-header-subtitle">
            Month-over-month performance velocity, seasonal trend charts, and sales leaderboard rankings in {managedRegion}.
          </p>
        </div>
        <button
          type="button"
          className="manager-btn-primary"
          onClick={() => setShowLeaderboard((show) => !show)}
        >
          <Icon name="reports" size={15} />
          <span>{showLeaderboard ? "Show Table View" : "View Leaderboard"}</span>
        </button>
      </div>

      {showLeaderboard ? (
        <div style={{ animation: "managerFadeIn 0.2s ease" }}>
          <TopPerformerLeaderboard performers={branchTeam} />
        </div>
      ) : (
        <div className="analytics-card manager-table-card">
          <div style={{ padding: "18px 22px 14px", borderBottom: "1px solid rgba(140, 95, 248, 0.12)" }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Month-over-Month Sales Velocity</h2>
            <p style={{ margin: "4px 0 0", color: "#7a748e", fontSize: 13 }}>
              Comparative billing volume for last month vs. current billing cycle.
            </p>
          </div>

          <div className="manager-table-scroll">
            <table className="manager-team-table">
              <thead>
                <tr>
                  <th>Sales Representative</th>
                  <th>Branch & Region</th>
                  <th>Role</th>
                  <th>Previous Month</th>
                  <th>Current Month</th>
                  <th>Growth Delta</th>
                  <th style={{ textAlign: "right" }}>Trajectory</th>
                </tr>
              </thead>
              <tbody>
                {branchTeam.map((employee) => {
                  const series = generateYearlySeries(employee);
                  const lastMonth = series[10] || 75000;
                  const thisMonth = series[11] || 88000;
                  const diff = thisMonth - lastMonth;
                  const isPositive = diff >= 0;
                  const pct = Math.abs(Math.round((diff / (lastMonth || 1)) * 100));

                  const initials = employee.name
                    ? employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()
                    : "SP";

                  return (
                    <tr key={employee.id}>
                      <td>
                        <div className="manager-member-avatar-cell">
                          <div className="manager-member-avatar">{initials}</div>
                          <div>
                            <strong className="manager-member-name" style={{ display: "block" }}>{employee.name}</strong>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: 13, color: "#7a748e" }}>
                          {employee.branch} Branch • {employee.region || managedRegion}
                        </span>
                      </td>
                      <td>
                        <span className="manager-role-tag">{employee.role}</span>
                      </td>
                      <td>
                        <span style={{ color: "#7a748e", fontWeight: 600 }}>₹{lastMonth.toLocaleString("en-IN")}</span>
                      </td>
                      <td>
                        <strong style={{ color: "#10b981", fontSize: 14 }}>₹{thisMonth.toLocaleString("en-IN")}</strong>
                      </td>
                      <td>
                        <span className={`manager-trend-pill ${isPositive ? "positive" : "negative"}`}>
                          {isPositive ? "↑ +" : "↓ -"}₹{Math.abs(diff).toLocaleString("en-IN")} ({pct}%)
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <button
                          className="manager-view-btn"
                          type="button"
                          onClick={() => openPerformance(employee)}
                        >
                          <Icon name="eye" size={13} />
                          <span>View Chart</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedPerformanceEmployee && (
        <SimpleModal onClose={closePerformance}>
          <div className="manager-modal-profile">
            <div className="manager-modal-avatar">
              {selectedPerformanceEmployee.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div>
              <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 800 }}>
                {selectedPerformanceEmployee.name}
              </h2>
              <span className="manager-role-tag">{selectedPerformanceEmployee.role}</span>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <PerformanceChart
              series={selectedPerformanceEmployee.series}
              label={`Annual Performance: ${selectedPerformanceEmployee.name}`}
            />
          </div>
        </SimpleModal>
      )}
    </section>
  );
}
