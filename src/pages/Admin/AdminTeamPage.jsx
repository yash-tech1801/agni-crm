import React from "react";

export default function AdminTeamPage({
  selectedBranch,
  teamMembers,
}) {
  return (
    <section className="admin-page-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
        <div>
          <p className="dashboard-eyebrow">{selectedBranch}</p>
          <h1>Branch Team Roster</h1>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="clients-table" style={{ minWidth: 860 }}>
          <thead>
            <tr>
              <th>Team Member</th>
              <th>Branch Role</th>
              <th>Official Email</th>
              <th>Phone</th>
              <th>Assigned Client Accounts</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((m) => (
              <tr key={m.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 999,
                        background: "#4e7cff22",
                        color: "#4e7cff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: 13,
                      }}
                    >
                      {m.name.slice(0, 2).toUpperCase()}
                    </div>
                    <strong>{m.name}</strong>
                  </div>
                </td>
                <td><strong>{m.role}</strong></td>
                <td>{m.email}</td>
                <td>{m.phone}</td>
                <td><strong>{m.assignedClients} Clients</strong></td>
                <td>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "4px 10px",
                      borderRadius: 999,
                      background: "#44bfb022",
                      color: "#44bfb0",
                      fontWeight: 700,
                      fontSize: 12,
                    }}
                  >
                    {m.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
