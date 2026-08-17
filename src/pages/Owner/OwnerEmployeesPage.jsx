import React, { useState, useEffect } from "react";
import Icon from "../../components/Icon";
import { employeeRoles, branchOptions, branchToRegionMap } from "./mockOwnerData";
import { ACTIVITY_STAGES } from "../Admin/mockAdminData";

const PAGE_SIZE = 15;

export default function OwnerEmployeesPage({
  employeesList = [],
  clients = [],
  selectedRole = "All roles",
  setSelectedRole,
  onOpenEmployeeInfo,
  onOpenEditEmployee,
  onDeleteEmployee,
  onOpenClientInfo,
}) {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [employeesPage, setEmployeesPage] = useState(1);
  const [managerTeamView, setManagerTeamView] = useState(null);
  const [salesClientsView, setSalesClientsView] = useState(null);

  function getClientsForEmployee(emp) {
    if (!emp) return [];
    const empRole = (emp.role || "").toLowerCase();
    const empName = (emp.name || "").toLowerCase();
    const empBranch = (emp.branch || "").toLowerCase();

    let matched = clients.filter(
      (c) =>
        (c.assignedPerson && c.assignedPerson.toLowerCase() === empName) ||
        (c.salesPerson && c.salesPerson.toLowerCase() === empName)
    );

    if (matched.length > 0) return matched;

    if (empRole === "it") {
      matched = clients.filter((c) => (c.serviceType || "").toLowerCase() === "it");
    } else if (empRole === "market") {
      matched = clients.filter((c) => (c.serviceType || "").toLowerCase() === "marketing");
    } else if (empRole === "admin") {
      matched = clients.filter(
        (c) =>
          (c.serviceType || "").toLowerCase() === "certificate" ||
          (c.branch || "").toLowerCase() === empBranch
      );
    } else if (empRole === "sales") {
      matched = clients.filter(
        (c) => (c.branch || "").toLowerCase() === empBranch || c.salesPerson
      );
    }

    return matched.length > 0 ? matched : clients;
  }

  function getTeamForManager(mgr) {
    if (!mgr) return [];
    const mgrName = (mgr.name || "").toLowerCase();
    const mgrBranch = (mgr.branch || "").toLowerCase();
    const mgrRole = (mgr.role || "").toLowerCase();
    const mgrRegion = (mgr.region || branchToRegionMap[mgr.branch] || "").toLowerCase();

    return employeesList.filter((emp) => {
      if (emp.id === mgr.id) return false;
      const empRole = (emp.role || "").toLowerCase();
      const empRM = (emp.reportingManager || "").toLowerCase();
      const empBM = (emp.branchManager || "").toLowerCase();
      const empBranch = (emp.branch || "").toLowerCase();
      const empRegion = (emp.region || branchToRegionMap[emp.branch] || "").toLowerCase();

      if (mgrRole === "branch manager") {
        if (["market", "it", "admin", "manager"].includes(empRole)) {
          return empBM === mgrName || empRM === mgrName || empBranch === mgrBranch;
        }
        return empBM === mgrName || empRM === mgrName || empBranch === mgrBranch;
      } else if (mgrRole === "manager") {
        if (empRole === "sales") {
          return empRM === mgrName || empRegion === mgrRegion || empBranch === mgrBranch;
        }
        return empRM === mgrName;
      }
      return false;
    });
  }

  const filteredEmployees = employeesList.filter((employee) => {
    const roleOk =
      selectedRole === "All roles" ||
      !selectedRole ||
      (employee.role || "").toLowerCase() === (selectedRole || "").toLowerCase();
    const branchOk = !selectedBranch || (employee.branch || "") === selectedBranch;
    return roleOk && branchOk;
  });

  const employeesTotalPages = Math.max(1, Math.ceil(filteredEmployees.length / PAGE_SIZE));
  const employeesPageItems = filteredEmployees.slice(
    (employeesPage - 1) * PAGE_SIZE,
    employeesPage * PAGE_SIZE
  );

  useEffect(() => {
    setEmployeesPage(1);
  }, [selectedRole, selectedBranch]);

  // VIEW 1: Team under Manager
  if (managerTeamView) {
    const team = getTeamForManager(managerTeamView);
    const uniqueRoles = Array.from(new Set(team.map((t) => t.role)));

    return (
      <section style={{ animation: "fadeIn 0.25s ease-out" }}>
        {/* Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button
                type="button"
                className="table-action"
                onClick={() => setManagerTeamView(null)}
                style={{
                  padding: "7px 14px",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontWeight: 600,
                }}
              >
                ← Back to Employees
              </button>
              <div>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>
                  Team Under — {managerTeamView.name}
                </h2>
                <div style={{ color: "#7a748e", fontSize: 13, marginTop: 2 }}>
                  Designation: {(managerTeamView.role || "").toUpperCase()} | Branch:{" "}
                  {managerTeamView.branch} | Email: {managerTeamView.email}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginBottom: 22,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "18px 22px",
              borderRadius: 14,
              border: "1px solid #eef0f5",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                background: "rgba(78, 124, 255, 0.12)",
                color: "#4e7cff",
                padding: 14,
                borderRadius: 12,
                display: "flex",
              }}
            >
              <Icon name="team" size={24} />
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#1e1b2e" }}>
                {team.length}
              </div>
              <div style={{ fontSize: 12, color: "#7a748e", marginTop: 2, fontWeight: 500 }}>
                Team Members
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "18px 22px",
              borderRadius: 14,
              border: "1px solid #eef0f5",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                background: "rgba(99, 102, 241, 0.12)",
                color: "#6366f1",
                padding: 14,
                borderRadius: 12,
                display: "flex",
              }}
            >
              <Icon name="roles" size={24} />
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#1e1b2e" }}>
                {uniqueRoles.length}
              </div>
              <div style={{ fontSize: 12, color: "#7a748e", marginTop: 2, fontWeight: 500 }}>
                Role Types
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "18px 22px",
              borderRadius: 14,
              border: "1px solid #eef0f5",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                background: "rgba(68, 191, 176, 0.12)",
                color: "#2b9385",
                padding: 14,
                borderRadius: 12,
                display: "flex",
              }}
            >
              <Icon name="branches" size={24} />
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#2b9385" }}>
                {managerTeamView.branch}
              </div>
              <div style={{ fontSize: 12, color: "#7a748e", marginTop: 2, fontWeight: 500 }}>
                Branch Scope
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Table */}
        <table className="clients-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Branch</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {team.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: 36, color: "#64748b" }}>
                  No team members under this manager.
                </td>
              </tr>
            ) : (
              team.map((member) => (
                <tr key={member.id}>
                  <td>
                    <strong style={{ color: "#1e293b" }}>{member.name}</strong>
                  </td>
                  <td>{member.branch}</td>
                  <td>{member.email}</td>
                  <td>{member.phone}</td>
                  <td>{member.role}</td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: 6,
                      }}
                    >
                      {["branch manager", "manager"].includes(
                        (member.role || "").toLowerCase()
                      )}
                      {["sales", "it", "admin", "market"].includes(
                        (member.role || "").toLowerCase()
                      ) && (
                        <button
                          className="table-action"
                          style={{
                            background: "rgba(99, 102, 241, 0.12)",
                            color: "#4f46e5",
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                          }}
                          onClick={() => {
                            setManagerTeamView(null);
                            setSalesClientsView(member);
                          }}
                        >
                          Clients under
                        </button>
                      )}
                      <button
                        className="table-action"
                        style={{ whiteSpace: "nowrap" }}
                        onClick={() => onOpenEmployeeInfo(member)}
                      >
                        Info
                      </button>
                      <button
                        className="table-action"
                        style={{ whiteSpace: "nowrap" }}
                        onClick={() => onOpenEditEmployee(member)}
                      >
                        Edit
                      </button>
                      <button
                        className="table-action danger"
                        style={{ whiteSpace: "nowrap" }}
                        onClick={() => onDeleteEmployee(member)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    );
  }

  // VIEW 2: Clients under Employee
  if (salesClientsView) {
    const managedClients = getClientsForEmployee(salesClientsView);
    const totalVal = managedClients.reduce((sum, c) => sum + (c.totalPayment || 0), 0);
    const avgProgress = Math.round(
      managedClients.reduce(
        (sum, c) =>
          sum +
          (c.progressPercent ||
            (c.paymentReceived >= c.totalPayment ? 100 : 70)),
        0
      ) / Math.max(1, managedClients.length)
    );

    return (
      <section style={{ animation: "fadeIn 0.25s ease-out" }}>
        {/* Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button
                type="button"
                className="table-action"
                onClick={() => setSalesClientsView(null)}
                style={{
                  padding: "7px 14px",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontWeight: 600,
                }}
              >
                ← Back to Employees
              </button>
              <div>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>
                  Clients Under — {salesClientsView.name}
                </h2>
                <div style={{ color: "#7a748e", fontSize: 13, marginTop: 2 }}>
                  Designation: {(salesClientsView.role || "").toUpperCase()} | Branch:{" "}
                  {salesClientsView.branch} | Email: {salesClientsView.email}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginBottom: 22,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "18px 22px",
              borderRadius: 14,
              border: "1px solid #eef0f5",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                background: "rgba(78, 124, 255, 0.12)",
                color: "#4e7cff",
                padding: 14,
                borderRadius: 12,
                display: "flex",
              }}
            >
              <Icon name="clients" size={24} />
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#1e1b2e" }}>
                {managedClients.length}
              </div>
              <div style={{ fontSize: 12, color: "#7a748e", marginTop: 2, fontWeight: 500 }}>
                Clients Managed
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "18px 22px",
              borderRadius: 14,
              border: "1px solid #eef0f5",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                background: "rgba(99, 102, 241, 0.12)",
                color: "#6366f1",
                padding: 14,
                borderRadius: 12,
                display: "flex",
              }}
            >
              <Icon name="revenue" size={24} />
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#1e1b2e" }}>
                ₹{totalVal.toLocaleString()}
              </div>
              <div style={{ fontSize: 12, color: "#7a748e", marginTop: 2, fontWeight: 500 }}>
                Total Billed Value
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "18px 22px",
              borderRadius: 14,
              border: "1px solid #eef0f5",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                background: "rgba(68, 191, 176, 0.12)",
                color: "#2b9385",
                padding: 14,
                borderRadius: 12,
                display: "flex",
              }}
            >
              <Icon name="overview" size={24} />
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#2b9385" }}>
                {avgProgress}%
              </div>
              <div style={{ fontSize: 12, color: "#7a748e", marginTop: 2, fontWeight: 500 }}>
                Avg Progress Completion
              </div>
            </div>
          </div>
        </div>

        {/* Managed Clients Table */}
        <table className="clients-table">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Company</th>
              <th>Service Line</th>
              <th>Total Billed</th>
              <th>Payment Received</th>
              <th style={{ width: 190 }}>Progress Percent</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {managedClients.map((client) => {
              const progress =
                client.progressPercent ||
                (client.paymentReceived >= client.totalPayment ? 100 : 70);
              const remaining = Math.max(
                0,
                (client.totalPayment || 0) - (client.paymentReceived || 0)
              );

              return (
                <tr key={client.id}>
                  <td>
                    <strong style={{ color: "#1e293b" }}>{client.name}</strong>
                  </td>
                  <td style={{ color: "#64748b" }}>{client.company}</td>
                  <td>
                    <span
                      style={{
                        padding: "3px 9px",
                        borderRadius: 6,
                        background: "#f1f5f9",
                        fontSize: 12,
                        fontWeight: 500,
                        color: "#475569",
                      }}
                    >
                      {client.serviceType} ({client.serviceName || "Standard"})
                    </span>
                  </td>
                  <td>
                    <strong style={{ color: "#0f172a" }}>
                      ₹{(client.totalPayment || 0).toLocaleString()}
                    </strong>
                  </td>
                  <td>
                    <span
                      style={{
                        color: remaining === 0 ? "#16a34a" : "#d97706",
                        fontWeight: 600,
                      }}
                    >
                      ₹{(client.paymentReceived || 0).toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          marginBottom: 4,
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            height: 8,
                            background: "#e2e8f0",
                            borderRadius: 999,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${progress}%`,
                              height: "100%",
                              background:
                                progress === 100
                                  ? "#10b981"
                                  : "linear-gradient(90deg, #10b981 0%, #059669 100%)",
                              borderRadius: 999,
                            }}
                          />
                        </div>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: progress === 100 ? "#10b981" : "#1e293b",
                            minWidth: 38,
                          }}
                        >
                          {progress}%
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                        {ACTIVITY_STAGES.map((st) => {
                          const isDone = (
                            client.completedSteps ||
                            ACTIVITY_STAGES.slice(
                              0,
                              Math.round(progress / 20)
                            ).map((s) => s.name)
                          ).includes(st.name);
                          return (
                            <span
                              key={st.name}
                              title={`${st.name} (${st.percent}%)`}
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: isDone ? "#10b981" : "#cbd5e1",
                              }}
                            />
                          );
                        })}
                        <span style={{ fontSize: 10, color: "#64748b", marginLeft: 2 }}>
                          {Math.round(progress / 20)}/5 Points
                        </span>
                      </div>
                    </div>
                  </td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    {onOpenClientInfo && (
                      <button
                        className="table-action"
                        style={{ whiteSpace: "nowrap" }}
                        onClick={() => onOpenClientInfo(client)}
                      >
                        Info &amp; Tracker
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    );
  }

  // MAIN VIEW: Employees Directory
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
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <label style={{ fontSize: 13, color: "#6b6b77", marginRight: 4, fontWeight: 500 }}>
            Filter by role:
          </label>
          <select
            value={selectedRole}
            onChange={(event) => {
              if (setSelectedRole) setSelectedRole(event.target.value);
              setEmployeesPage(1);
            }}
            style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 13 }}
          >
            {employeeRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <label style={{ fontSize: 13, color: "#6b6b77", margin: "0 4px 0 8px", fontWeight: 500 }}>
            Branch:
          </label>
          <select
            value={selectedBranch}
            onChange={(event) => {
              setSelectedBranch(event.target.value);
              setEmployeesPage(1);
            }}
            style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 13 }}
          >
            {branchOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ color: "#7a748e", fontSize: 13, fontWeight: 600 }}>
          {filteredEmployees.length} employees
        </div>
      </div>

      <table className="clients-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Branch</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeesPageItems.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: 36, color: "#64748b" }}>
                No employees found matching the filters.
              </td>
            </tr>
          ) : (
            employeesPageItems.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <strong style={{ color: "#1e293b" }}>{employee.name}</strong>
                </td>
                <td>{employee.branch}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
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
                <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: 6,
                    }}
                  >
                    {["branch manager", "manager"].includes(
                      (employee.role || "").toLowerCase()
                    ) && (
                      <button
                        className="table-action"
                        style={{
                          background: "rgba(16, 185, 129, 0.12)",
                          color: "#059669",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                        onClick={() => {
                          setSalesClientsView(null);
                          setManagerTeamView(employee);
                        }}
                      >
                        Team under
                      </button>
                    )}
                    {["sales", "it", "admin", "market"].includes(
                      (employee.role || "").toLowerCase()
                    ) && (
                      <button
                        className="table-action"
                        style={{
                          background: "rgba(99, 102, 241, 0.12)",
                          color: "#4f46e5",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                        onClick={() => {
                          setManagerTeamView(null);
                          setSalesClientsView(employee);
                        }}
                      >
                        Clients under
                      </button>
                    )}
                    <button
                      className="table-action"
                      style={{ whiteSpace: "nowrap" }}
                      onClick={() => onOpenEmployeeInfo(employee)}
                    >
                      Info
                    </button>
                    <button
                      className="table-action"
                      style={{ whiteSpace: "nowrap" }}
                      onClick={() => onOpenEditEmployee(employee)}
                    >
                      Edit
                    </button>
                    <button
                      className="table-action danger"
                      style={{ whiteSpace: "nowrap" }}
                      onClick={() => onDeleteEmployee(employee)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div
        className="table-pagination"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 14,
        }}
      >
        <div style={{ color: "#6b6b77", fontSize: 13 }}>
          Showing {filteredEmployees.length === 0 ? 0 : (employeesPage - 1) * PAGE_SIZE + 1} -{" "}
          {Math.min(employeesPage * PAGE_SIZE, filteredEmployees.length)} of{" "}
          {filteredEmployees.length}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button
            className="table-action"
            disabled={employeesPage <= 1}
            onClick={() => setEmployeesPage((page) => Math.max(1, page - 1))}
          >
            Prev
          </button>
          <span style={{ margin: "0 8px", fontSize: 13 }}>
            Page {employeesPage} / {employeesTotalPages}
          </span>
          <button
            className="table-action"
            disabled={employeesPage >= employeesTotalPages}
            onClick={() => setEmployeesPage((page) => Math.min(employeesTotalPages, page + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
