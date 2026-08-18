import React, { useState } from "react";
import ManagerEmployeeInfoModal from "./ManagerEmployeeInfoModal";

export default function ManagerTeamPage({
  branchTeam = [],
  managedRegion = "East Zone",
  managerName = "Manager",
}) {
  const [selectedMember, setSelectedMember] = useState(null);
  const [filterRole, setFilterRole] = useState("all");

  const roles = Array.from(new Set(branchTeam.map((m) => m.role))).filter(Boolean);

  const displayedTeam = branchTeam.filter((member) => {
    if (filterRole !== "all" && member.role !== filterRole) return false;
    return true;
  });

  return (
    <section style={{ animation: "fadeIn 0.25s ease-out" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <p className="eyebrow">Sales team</p>
          <h2>{managedRegion} team</h2>
          <p style={{ margin: 0, color: "#6b6b77", fontSize: 13 }}>
            Only sales members from the branch you manage are shown here.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{ color: "#7a748e", fontSize: 13 }}>{displayedTeam.length} members</div>
          {roles.length > 1 && (
            <label className="field-label" style={{ minWidth: 180, margin: 0 }}>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      </div>

      <table className="clients-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Joined</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {displayedTeam.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.role}</td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
              <td>{member.joiningDate}</td>
              <td style={{ textAlign: "right" }}>
                <button
                  className="table-action"
                  type="button"
                  onClick={() => setSelectedMember(member)}
                >
                  Info
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedMember && (
        <ManagerEmployeeInfoModal
          member={selectedMember}
          managerName={managerName}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </section>
  );
}
