import React, { useState, useMemo } from "react";
import Icon from "../../components/Icon";
import ManagerEmployeeInfoModal from "./ManagerEmployeeInfoModal";

export default function ManagerTeamPage({
  branchTeam = [],
  managedRegion = "East Zone",
  managerName = "Manager",
}) {
  const [selectedMember, setSelectedMember] = useState(null);
  const [filterRole, setFilterRole] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const roles = Array.from(new Set(branchTeam.map((m) => m.role))).filter(Boolean);

  const displayedTeam = useMemo(() => {
    return branchTeam.filter((member) => {
      if (filterRole !== "all" && member.role !== filterRole) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = member.name?.toLowerCase().includes(q);
        const matchEmail = member.email?.toLowerCase().includes(q);
        const matchPhone = member.phone?.toLowerCase().includes(q);
        const matchRole = member.role?.toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchPhone && !matchRole) return false;
      }
      return true;
    });
  }, [branchTeam, filterRole, searchQuery]);

  return (
    <section className="manager-page-view">
      {/* Header Banner */}
      <div className="manager-header-banner">
        <div className="manager-header-info">
          <p className="manager-header-eyebrow">Sales Team Operations</p>
          <h1 className="manager-header-title">{managedRegion} Team</h1>
          <p className="manager-header-subtitle">
            Manage regional sales representatives, monthly quotas, territory coverage, and employee profiles.
          </p>
        </div>
      </div>

      {/* Team KPI Stats Ribbon */}
      <div className="manager-kpi-ribbon">
        <div className="analytics-card manager-kpi-tile">
          <div className="manager-kpi-tile-top">
            <span className="manager-kpi-tile-label">Team Members</span>
            <div className="manager-kpi-tile-icon">
              <Icon name="users" size={16} />
            </div>
          </div>
          <div>
            <strong className="manager-kpi-tile-value">{branchTeam.length}</strong>
            <span className="manager-kpi-tile-sub">Active Sales Representatives</span>
          </div>
        </div>

        <div className="analytics-card manager-kpi-tile">
          <div className="manager-kpi-tile-top">
            <span className="manager-kpi-tile-label">Branch Region</span>
            <div className="manager-kpi-tile-icon" style={{ background: "rgba(59, 130, 246, 0.12)", color: "#3b82f6" }}>
              <Icon name="building" size={16} />
            </div>
          </div>
          <div>
            <strong className="manager-kpi-tile-value" style={{ color: "#3b82f6" }}>{managedRegion}</strong>
            <span className="manager-kpi-tile-sub">Designated Territory</span>
          </div>
        </div>

        <div className="analytics-card manager-kpi-tile">
          <div className="manager-kpi-tile-top">
            <span className="manager-kpi-tile-label">Reporting Manager</span>
            <div className="manager-kpi-tile-icon" style={{ background: "rgba(16, 185, 129, 0.12)", color: "#10b981" }}>
              <Icon name="checkCircle" size={16} />
            </div>
          </div>
          <div>
            <strong className="manager-kpi-tile-value" style={{ color: "#10b981" }}>{managerName}</strong>
            <span className="manager-kpi-tile-sub">Direct Lead & Supervisor</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="analytics-card manager-toolbar-card">
        <div className="manager-toolbar-filters">
          <div className="manager-search-box">
            <span className="manager-search-icon">
              <Icon name="search" size={14} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search team member by name, role, email, or phone..."
            />
          </div>

          {roles.length > 0 && (
            <select
              className="manager-filter-select"
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
          )}
        </div>

        <div className="manager-count-badge">
          <span>Showing</span>
          <strong>{displayedTeam.length}</strong>
          <span>of {branchTeam.length} members</span>
        </div>
      </div>

      {/* Team Table Card */}
      <div className="analytics-card manager-table-card">
        <div className="manager-table-scroll">
          <table className="manager-team-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Role</th>
                <th>Contact Info</th>
                <th>Monthly Quota</th>
                <th>Joined</th>
                <th style={{ textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedTeam.map((member) => {
                const initials = member.name
                  ? member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()
                  : "SP";

                return (
                  <tr key={member.id}>
                    <td>
                      <div className="manager-member-avatar-cell">
                        <div className="manager-member-avatar">{initials}</div>
                        <div className="manager-member-details">
                          <strong className="manager-member-name">{member.name}</strong>
                          <span className="manager-member-branch">
                            {member.branch} Branch • {member.region || managedRegion}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="manager-role-tag">{member.role}</span>
                    </td>
                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <span>{member.email}</span>
                        <span style={{ fontSize: 12, color: "#7a748e", fontFamily: "monospace" }}>
                          {member.phone}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="manager-quota-cell">
                        <div className="manager-quota-numbers">
                          <span>{member.monthlySales || "₹0"}</span>
                          <span style={{ color: "#7a748e" }}>Target: {member.quota || "₹100k"}</span>
                        </div>
                        <div className="manager-quota-bar">
                          <div className="manager-quota-fill" style={{ width: "65%" }} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: 12.5, color: "#7a748e" }}>{member.joiningDate || "Jan 2025"}</span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        className="manager-view-btn"
                        type="button"
                        onClick={() => setSelectedMember(member)}
                      >
                        <Icon name="eye" size={13} />
                        <span>View Profile</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
              {displayedTeam.length === 0 && (
                <tr>
                  <td colSpan={6} className="manager-empty-state">
                    No team members found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

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
