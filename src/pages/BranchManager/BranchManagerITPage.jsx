import React, { useState } from "react";
import SimpleModal from "../../components/SimpleModal";

export default function BranchManagerITPage({
  branchIT,
}) {
  const [selectedEmployeeInfo, setSelectedEmployeeInfo] = useState(null);

  function openEmployeeInfo(emp) {
    setSelectedEmployeeInfo(emp);
  }
  function closeEmployeeInfo() {
    setSelectedEmployeeInfo(null);
  }

  return (
    <section className="bm-page-section">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
        <div>
          <h2 style={{ margin: 0 }}>IT Team</h2>
          <div style={{ color: "#7a748e", fontSize: 13, marginTop: 4 }}>IT professionals working under your branch</div>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="clients-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Joining Date</th>
              <th style={{ textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {branchIT.map((emp) => (
              <tr key={emp.id}>
                <td><strong>{emp.name}</strong></td>
                <td>{emp.email}</td>
                <td>{emp.joiningDate}</td>
                <td style={{ textAlign: "right" }}>
                  <button className="table-action" onClick={() => openEmployeeInfo(emp)}>
                    Info
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedEmployeeInfo && (
        <SimpleModal onClose={closeEmployeeInfo}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <div>
              <h3 style={{ margin: 0 }}>IT — {selectedEmployeeInfo.name}</h3>
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
              <div style={{ color: "#6b6b77", fontSize: 12 }}>Joining Date</div>
              <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.joiningDate}</div>
            </div>
            <div style={{ background: "#fbfbfe", padding: 12, borderRadius: 8 }}>
              <div style={{ color: "#6b6b77", fontSize: 12 }}>Designation</div>
              <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.role}</div>
            </div>
            <div style={{ background: "#fbfbfe", padding: 12, borderRadius: 8, gridColumn: "1 / -1" }}>
              <div style={{ color: "#6b6b77", fontSize: 12 }}>Region</div>
              <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.region}</div>
            </div>
          </div>
        </SimpleModal>
      )}
    </section>
  );
}
