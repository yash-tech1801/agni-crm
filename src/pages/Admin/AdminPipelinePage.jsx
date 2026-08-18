import React from "react";
import {
  TRACKER_STAGES_DEFINITIONS,
  TRACKER_STAGE_IDS,
  getTrackerState,
} from "../../utils/schemeTracker";
import { stageBadgeColors } from "./mockAdminData";

const PIPELINE_STAGES = [
  TRACKER_STAGES_DEFINITIONS[TRACKER_STAGE_IDS.CRM_CREATION],
  TRACKER_STAGES_DEFINITIONS[TRACKER_STAGE_IDS.AGREEMENT],
  TRACKER_STAGES_DEFINITIONS[TRACKER_STAGE_IDS.REPORTS],
  TRACKER_STAGES_DEFINITIONS[TRACKER_STAGE_IDS.APPLICATION],
  TRACKER_STAGES_DEFINITIONS[TRACKER_STAGE_IDS.INTERVIEW],
  TRACKER_STAGES_DEFINITIONS[TRACKER_STAGE_IDS.FINAL],
];

export default function AdminPipelinePage({
  selectedBranch,
  branchClients = [],
  onOpenStatusUpdate,
}) {
  return (
    <section className="admin-page-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
        <div>
          <p className="dashboard-eyebrow">{selectedBranch}</p>
          <h1>Scheme-Based Workflow Pipeline</h1>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, alignItems: "start" }}>
        {PIPELINE_STAGES.map((stage, sIdx) => {
          const stageClients = branchClients.filter((c) => {
            const tracker = getTrackerState(c);
            // Match current active stage or applicationStatus
            const status = c.applicationStatus || tracker.currentStage;
            return status === stage.name;
          });

          return (
            <div
              key={stage.id}
              style={{
                background: "#fff",
                borderRadius: 16,
                border: "1px solid #e7e7f5",
                padding: 16,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                minHeight: 380,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, borderBottom: "1px solid #f0f0f5" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: stage.badgeColor || "#10b981",
                      color: "#fff",
                      display: "grid",
                      placeItems: "center",
                      fontSize: 11,
                      fontWeight: 800,
                    }}
                  >
                    {sIdx + 1}
                  </span>
                  <div>
                    <strong style={{ fontSize: 13.5 }}>{stage.name}</strong>
                  </div>
                </div>
                <span style={{ background: "#f0f0fa", padding: "2px 8px", borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
                  {stageClients.length}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {stageClients.map((client) => {
                  const tracker = getTrackerState(client);

                  return (
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
                        <span style={{ fontSize: 11, color: "#10b981", fontWeight: 700 }}>
                          {tracker.progressPercent}%
                        </span>
                      </div>

                      <div style={{ fontSize: 12, color: "#555" }}>
                        Scheme: <strong>{client.scheme}</strong>
                      </div>

                      <div style={{ height: 5, background: "#e7e7f5", borderRadius: 999, overflow: "hidden" }}>
                        <div
                          style={{
                            width: `${tracker.progressPercent}%`,
                            height: "100%",
                            background: tracker.progressPercent === 100 ? "#10b981" : "linear-gradient(90deg, #4e7cff 0%, #10b981 100%)",
                          }}
                        />
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                        <span style={{ fontSize: 11, color: "#9a94ad" }}>{client.assignedSalesPerson}</span>
                        {onOpenStatusUpdate && (
                          <button
                            type="button"
                            className="table-action"
                            style={{ padding: "4px 10px", fontSize: 11 }}
                            onClick={() => onOpenStatusUpdate(client)}
                          >
                            Update Status
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {stageClients.length === 0 && (
                  <div style={{ textAlign: "center", padding: "28px 8px", color: "#94a3b8", fontSize: 12.5 }}>
                    No clients in this stage
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
