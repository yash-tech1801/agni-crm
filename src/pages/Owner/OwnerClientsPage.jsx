import React, { useState, useEffect } from "react";
import { services } from "./mockOwnerData";
import { ACTIVITY_STAGES } from "../Admin/mockAdminData";

const PAGE_SIZE = 15;

export default function OwnerClientsPage({
  clients = [],
  onOpenClientInfo,
  onDeleteClient,
}) {
  const [serviceFilter, setServiceFilter] = useState("");
  const [clientsPage, setClientsPage] = useState(1);

  const filteredClients = clients.filter(
    (c) => !serviceFilter || c.serviceType === serviceFilter
  );

  const clientsTotalPages = Math.max(1, Math.ceil(filteredClients.length / PAGE_SIZE));
  const clientsPageItems = filteredClients.slice(
    (clientsPage - 1) * PAGE_SIZE,
    clientsPage * PAGE_SIZE
  );

  useEffect(() => {
    setClientsPage(1);
  }, [serviceFilter]);

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
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <label style={{ fontSize: 13, color: "#6b6b77", marginRight: 4, fontWeight: 500 }}>
            Filter by service:
          </label>
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              border: "1px solid #cbd5e1",
              fontSize: 13,
              background: "#ffffff",
            }}
          >
            <option value="">All services</option>
            {services.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div style={{ color: "#7a748e", fontSize: 13, fontWeight: 600 }}>
          {filteredClients.length} clients
        </div>
      </div>

      <table className="clients-table">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Company</th>
            <th>Contact Info</th>
            <th>Service</th>
            <th>Activity Status (5 Points)</th>
            <th>Progress (%)</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clientsPageItems.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", padding: 36, color: "#64748b" }}>
                No clients found matching the selected filter.
              </td>
            </tr>
          ) : (
            clientsPageItems.map((client) => {
              const completed =
                client.completedSteps ||
                (client.progressPercent
                  ? ACTIVITY_STAGES.slice(
                      0,
                      Math.round(client.progressPercent / 20)
                    ).map((s) => s.name)
                  : ["Submission", "Doc Audit", "Manager Review"]);

              return (
                <tr key={client.id}>
                  <td>
                    <strong style={{ color: "#1e293b" }}>{client.name}</strong>
                  </td>
                  <td style={{ color: "#64748b" }}>{client.company}</td>
                  <td>
                    <div style={{ fontSize: 13 }}>{client.email}</div>
                    <div style={{ fontSize: 12, color: "#7a748e" }}>
                      {client.phone}
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: 6,
                        background: "#f1f5f9",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#475569",
                      }}
                    >
                      {client.serviceName || client.serviceType}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "2px 8px",
                          borderRadius: 999,
                          background: "rgba(16, 185, 129, 0.12)",
                          color: "#059669",
                          fontWeight: 700,
                          fontSize: 11.5,
                          width: "fit-content",
                        }}
                      >
                        ●{" "}
                        {client.applicationStatus ||
                          (completed.length > 0
                            ? completed[completed.length - 1]
                            : "Submission")}
                      </span>
                      {/* 5 mini dots */}
                      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                        {ACTIVITY_STAGES.map((st) => {
                          const isDone = completed.includes(st.name);
                          return (
                            <span
                              key={st.name}
                              title={`${st.name} (${st.percent}%) - ${
                                isDone ? "Completed" : "Pending"
                              }`}
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: isDone ? "#10b981" : "#cbd5e1",
                              }}
                            />
                          );
                        })}
                        <span
                          style={{
                            fontSize: 10.5,
                            color: "#64748b",
                            marginLeft: 4,
                          }}
                        >
                          {completed.length}/5 Points
                        </span>
                      </div>
                    </div>
                  </td>
                  <td style={{ minWidth: 130 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
                            width: `${client.progressPercent || 60}%`,
                            height: "100%",
                            background:
                              (client.progressPercent || 60) === 100
                                ? "#10b981"
                                : "linear-gradient(90deg, #10b981 0%, #059669 100%)",
                            borderRadius: 999,
                          }}
                        />
                      </div>
                      <strong
                        style={{
                          fontSize: 12,
                          color:
                            (client.progressPercent || 60) === 100
                              ? "#10b981"
                              : "#1e293b",
                        }}
                      >
                        {client.progressPercent || 60}%
                      </strong>
                    </div>
                  </td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <button
                      className="table-action"
                      onClick={() => onOpenClientInfo(client)}
                    >
                      Info &amp; Tracker
                    </button>
                    <button
                      className="table-action danger"
                      onClick={() => onDeleteClient(client)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
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
          Showing {filteredClients.length === 0 ? 0 : (clientsPage - 1) * PAGE_SIZE + 1} -{" "}
          {Math.min(clientsPage * PAGE_SIZE, filteredClients.length)} of{" "}
          {filteredClients.length}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button
            className="table-action"
            disabled={clientsPage <= 1}
            onClick={() => setClientsPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </button>
          <span style={{ margin: "0 8px", fontSize: 13 }}>
            Page {clientsPage} / {clientsTotalPages}
          </span>
          <button
            className="table-action"
            disabled={clientsPage >= clientsTotalPages}
            onClick={() => setClientsPage((p) => Math.min(clientsTotalPages, p + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
