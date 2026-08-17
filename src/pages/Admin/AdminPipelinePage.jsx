import React from "react";
import { ACTIVITY_STAGES } from "./mockAdminData";

export default function AdminPipelinePage({
  selectedBranch,
  branchClients,
  onOpenStatusUpdate,
}) {
  return (
    <section className="admin-page-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
        <div>
          <p className="dashboard-eyebrow">{selectedBranch}</p>
          <h1>5-Stage Application Workflow Pipeline</h1>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, alignItems: "start" }}>
        {ACTIVITY_STAGES.map((stage) => {
          const stageClients = branchClients.filter((c) => c.applicationStatus === stage.name);
          return (
            <div
              key={stage.name}
              style={{
                background: "#fff",
                borderRadius: 16,
                border: "1px solid #e7e7f5",
                padding: 16,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                minHeight: 400,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, borderBottom: "1px solid #f0f0f5" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "#10b981",
                      color: "#fff",
                      display: "grid",
                      placeItems: "center",
                      fontSize: 11,
                      fontWeight: 800,
                    }}
                  >
                    {stage.step}
                  </span>
                  <div>
                    <strong style={{ fontSize: 13.5 }}>{stage.name}</strong>
                    <span style={{ fontSize: 11, color: "#64748b", marginLeft: 4 }}>({stage.percent}%)</span>
                  </div>
                </div>
                <span style={{ background: "#f0f0fa", padding: "2px 8px", borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
                  {stageClients.length}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {stageClients.map((client) => (
                  <div
                    key={client.id}
                    style={{
                      padding: 12,
                      borderRadius: 10,
                      background: "#fbfbfe",
                      border: "1px solid #e7e7f5",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <strong style={{ fontSize: 13 }}>{client.name}</strong>
                        <div style={{ fontSize: 11.5, color: "#7a748e" }}>{client.company}</div>
                      </div>
                      <span style={{ fontSize: 11, color: "#10b981", fontWeight: 700 }}>{client.progress}%</span>
                    </div>

                    <div style={{ fontSize: 12, color: "#555" }}>
                      Scheme: <strong>{client.scheme}</strong>
                    </div>

                    <div style={{ height: 5, background: "#e7e7f5", borderRadius: 999, overflow: "hidden" }}>
                      <div style={{ width: `${client.progress}%`, height: "100%", background: "#10b981" }} />
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                      <span style={{ fontSize: 11, color: "#9a94ad" }}>{client.assignedSalesPerson}</span>
                      <button
                        type="button"
                        className="table-action"
                        style={{ padding: "4px 10px", fontSize: 11 }}
                        onClick={() => onOpenStatusUpdate(client)}
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                ))}

                {stageClients.length === 0 && (
                  <div style={{ textAlign: "center", padding: "40px 10px", color: "#a0a0b0", fontSize: 12.5 }}>
                    No applications in {stage.name}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
