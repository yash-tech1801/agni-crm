import React, { useState } from "react";
import TopPerformerLeaderboard from "../../components/TopPerformerLeaderboard";
import PerformanceChart from "../../components/PerformanceChart";
import SimpleModal from "../../components/SimpleModal";
import { generateYearlySeries } from "./mockManagerData";

export default function ManagerReportsPage({ branchTeam = [] }) {
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
    <section style={{ animation: "fadeIn 0.25s ease-out" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Employee reports</h2>
          <div style={{ color: "#7a748e", fontSize: 13, marginTop: 4 }}>
            Last month vs this month performance
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="button"
            className="table-action"
            onClick={() => setShowLeaderboard((show) => !show)}
          >
            {showLeaderboard ? "Hide leaderboard" : "Leaderboard"}
          </button>
        </div>
      </div>

      {showLeaderboard ? (
        <div style={{ marginBottom: 18 }}>
          <TopPerformerLeaderboard performers={branchTeam} />
        </div>
      ) : (
        <table className="clients-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Branch</th>
              <th>Role</th>
              <th>Last month</th>
              <th>This month</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {branchTeam.map((employee) => {
              const series = generateYearlySeries(employee);
              const lastMonth = series[10];
              const thisMonth = series[11];
              return (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.branch}</td>
                  <td>{employee.role}</td>
                  <td>₹{lastMonth.toLocaleString()}</td>
                  <td>₹{thisMonth.toLocaleString()}</td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      className="table-action"
                      type="button"
                      onClick={() => openPerformance(employee)}
                    >
                      View chart
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {selectedPerformanceEmployee && (
        <SimpleModal onClose={closePerformance}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>
              Performance — {selectedPerformanceEmployee.name}
            </h3>
          </div>
          <PerformanceChart
            series={selectedPerformanceEmployee.series}
            label={`Employee: ${selectedPerformanceEmployee.name}`}
          />
        </SimpleModal>
      )}
    </section>
  );
}
