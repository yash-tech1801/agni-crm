import React, { useState } from "react";
import SimpleModal from "../../components/SimpleModal";

export default function BranchManagerEmployeesPage({
  employeesList,
}) {
  const [selectedManagerForTeam, setSelectedManagerForTeam] = useState(null);
  const [selectedEmployeeInfo, setSelectedEmployeeInfo] = useState(null);

  function openEmployeeInfo(employee) {
    setSelectedEmployeeInfo(employee);
  }
  function closeEmployeeInfo() {
    setSelectedEmployeeInfo(null);
  }

  return (
    <section className="bm-page-section">
      {selectedManagerForTeam ? (
        <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
            <div>
              <h2 style={{ margin: 0 }}>Team: {selectedManagerForTeam.name}</h2>
              <div style={{ color: "#7a748e", fontSize: 13, marginTop: 4 }}>Region: {selectedManagerForTeam.branch}</div>
            </div>
            <button className="table-action" onClick={() => setSelectedManagerForTeam(null)}>
              Back to Managers
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="clients-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th style={{ textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {employeesList
                  .filter((emp) => emp.reportingManager === selectedManagerForTeam.name || emp.branchManager === selectedManagerForTeam.name)
                  .map((employee) => (
                    <tr key={employee.id}>
                      <td><strong>{employee.name}</strong></td>
                      <td>{employee.email}</td>
                      <td>{employee.phone}</td>
                      <td>
                        <span
                          style={{
                            display: "inline-flex",
                            padding: "3px 8px",
                            borderRadius: 6,
                            background: "rgba(78, 124, 255, 0.12)",
                            color: "#4e7cff",
                            fontWeight: 700,
                            fontSize: 12,
                          }}
                        >
                          {employee.role}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <button className="table-action" onClick={() => openEmployeeInfo(employee)}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
            <div>
              <h2 style={{ margin: 0 }}>Managers</h2>
              <div style={{ color: "#7a748e", fontSize: 13, marginTop: 4 }}>Select a manager to view their team</div>
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="clients-table">
              <thead>
                <tr>
                  <th>Manager Name</th>
                  <th>Region Name</th>
                  <th>Sales Persons</th>
                  <th style={{ textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {employeesList
                  .filter((emp) => (emp.role || "").toLowerCase().includes("manager"))
                  .map((manager) => {
                    const teamCount = employeesList.filter(
                      (emp) => emp.reportingManager === manager.name || emp.branchManager === manager.name
                    ).length;
                    return (
                      <tr key={manager.id}>
                        <td><strong>{manager.name}</strong></td>
                        <td>{manager.branch}</td>
                        <td><strong>{teamCount} Members</strong></td>
                        <td style={{ textAlign: "right" }}>
                          <button className="table-action" onClick={() => setSelectedManagerForTeam(manager)}>
                            View Team
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {selectedEmployeeInfo && (
        <SimpleModal onClose={closeEmployeeInfo}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <div>
              <h3 style={{ margin: 0 }}>Employee — {selectedEmployeeInfo.name}</h3>
              <div style={{ color: "#7a748e", fontSize: 13 }}>{selectedEmployeeInfo.role}</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16, padding: "12px 0" }}>
            <div style={{ background: "#fbfbfe", padding: 12, borderRadius: 8 }}>
              <div style={{ color: "#6b6b77", fontSize: 12 }}>Name</div>
              <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.name}</div>
            </div>
            <div style={{ background: "#fbfbfe", padding: 12, borderRadius: 8 }}>
              <div style={{ color: "#6b6b77", fontSize: 12 }}>Email</div>
              <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.email}</div>
            </div>
            <div style={{ background: "#fbfbfe", padding: 12, borderRadius: 8 }}>
              <div style={{ color: "#6b6b77", fontSize: 12 }}>Mobile</div>
              <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.phone}</div>
            </div>
            <div style={{ background: "#fbfbfe", padding: 12, borderRadius: 8 }}>
              <div style={{ color: "#6b6b77", fontSize: 12 }}>Designation</div>
              <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.role}</div>
            </div>
            <div style={{ background: "#fbfbfe", padding: 12, borderRadius: 8 }}>
              <div style={{ color: "#6b6b77", fontSize: 12 }}>Branch</div>
              <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.branch}</div>
            </div>
            <div style={{ background: "#fbfbfe", padding: 12, borderRadius: 8, gridColumn: "1 / -1" }}>
              <div style={{ color: "#6b6b77", fontSize: 12 }}>Reporting manager</div>
              <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.reportingManager || "—"}</div>
            </div>
          </div>
        </SimpleModal>
      )}
    </section>
  );
}
