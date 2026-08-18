import React from "react";
import ActivityStatusBar from "../../components/dashboard/ActivityStatusBar";
import { ACTIVITY_STAGES, stageBadgeColors } from "./mockAdminData";
import { getTrackerState } from "../../utils/schemeTracker";

export default function AdminOverviewPage({
  selectedBranch,
  branchClients,
  metrics,
  onOpenClients,
  onOpenStatusUpdate,
  onQuickStepToggle,
  onOpenDossier,
}) {
  return (
    <section className="admin-page-section">
      {/* Branch Header Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #172135 0%, #20335e 100%)",
          color: "#fff",
          padding: "20px 24px",
          borderRadius: 16,
          marginBottom: 22,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <span style={{ fontSize: 11.5, textTransform: "uppercase", letterSpacing: 1, color: "#8c5ff8", fontWeight: 700 }}>
            Active Branch Command
          </span>
          <h2 style={{ margin: "4px 0 2px", color: "#fff", fontSize: 22 }}>{selectedBranch}</h2>
          <p style={{ margin: 0, color: "#a8b7dd", fontSize: 13 }}>
            Admin workspace for reviewing, verifying, and updating 5-point client milestones (20% each) across the branch.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            className="primary-button"
            onClick={onOpenClients}
            style={{ background: "#4e7cff", borderColor: "#4e7cff" }}
          >
            View All {branchClients.length} Clients
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16, marginBottom: 24 }}>
        <div style={{ background: "#fff", padding: 20, borderRadius: 16, border: "1px solid #e7e7f5" }}>
          <p className="eyebrow" style={{ margin: "0 0 6px", color: "#4e7cff" }}>Branch Clients</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>{metrics.total}</h2>
            <span style={{ fontSize: 12, color: "#10b981", fontWeight: 700 }}>100% Tracked</span>
          </div>
          <small style={{ color: "#7a748e", marginTop: 4, display: "block" }}>Under {selectedBranch}</small>
        </div>

        <div style={{ background: "#fff", padding: 20, borderRadius: 16, border: "1px solid #e7e7f5" }}>
          <p className="eyebrow" style={{ margin: "0 0 6px", color: "#f2aa38" }}>In Active Pipeline</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>{metrics.inProgress}</h2>
            <span style={{ fontSize: 12, color: "#f2aa38", fontWeight: 700 }}>● 20% - 80% Progress</span>
          </div>
          <small style={{ color: "#7a748e", marginTop: 4, display: "block" }}>Milestone checkpoints in work</small>
        </div>

        <div style={{ background: "#fff", padding: 20, borderRadius: 16, border: "1px solid #e7e7f5" }}>
          <p className="eyebrow" style={{ margin: "0 0 6px", color: "#26a69a" }}>Manager Review Stage</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>{metrics.managerReview}</h2>
            <span style={{ fontSize: 12, color: "#26a69a", fontWeight: 700 }}>60% Milestone</span>
          </div>
          <small style={{ color: "#7a748e", marginTop: 4, display: "block" }}>Commercial sign-off clearance</small>
        </div>

        <div style={{ background: "#fff", padding: 20, borderRadius: 16, border: "1px solid #e7e7f5" }}>
          <p className="eyebrow" style={{ margin: "0 0 6px", color: "#10b981" }}>Fully Approved (100%)</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>{metrics.completed}</h2>
            <span style={{ fontSize: 12, color: "#10b981", fontWeight: 700 }}>5/5 Points Done</span>
          </div>
          <small style={{ color: "#7a748e", marginTop: 4, display: "block" }}>Disbursed & live agreements</small>
        </div>
      </div>

      {/* Application Progress Grid & Quick Review Queue */}
      <div style={{ display: "grid", gridTemplateColumns: "1.45fr 1fr", gap: 20 }}>
        {/* Left: Active Applications Pipeline Table with 5-Point Stepper Cards */}
        <div style={{ background: "#fff", padding: 22, borderRadius: 16, border: "1px solid #e7e7f5" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h3 style={{ margin: 0 }}>Client Application Progress Queue</h3>
                <span style={{ fontSize: 11.5, fontWeight: 700, background: "rgba(99, 102, 241, 0.1)", color: "#4f46e5", padding: "2px 8px", borderRadius: 999 }}>
                  Top 3 Recent
                </span>
              </div>
              <p style={{ margin: "4px 0 0", color: "#7a748e", fontSize: 13 }}>
                Recently updated client milestones. Direct interactive status updates enabled.
              </p>
            </div>
            <button type="button" className="table-action" onClick={onOpenClients}>
              Manage All ({branchClients.length})
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {(() => {
              // Strictly show only the 3 most recently updated or added cards
              const recentClients = [...branchClients]
                .sort((a, b) => {
                  const timeA = new Date(a.lastUpdated || a.submissionDate || 0).getTime();
                  const timeB = new Date(b.lastUpdated || b.submissionDate || 0).getTime();
                  return timeB - timeA;
                })
                .slice(0, 3);

              if (recentClients.length === 0) {
                return (
                  <div style={{ padding: "32px 16px", textAlign: "center", color: "#7a748e", fontSize: 13 }}>
                    No client applications found in this branch.
                  </div>
                );
              }

              return recentClients.map((client) => {
                const tracker = getTrackerState(client);

                return (
                  <div
                    key={client.id}
                    style={{
                      padding: 16,
                      borderRadius: 16,
                      background: "#fbfbfe",
                      border: "1px solid #e7e7f5",
                      display: "flex",
                      flexDirection: "column",
                      gap: 14,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <strong style={{ fontSize: 15 }}>{client.name}</strong> <span style={{ color: "#7a748e", fontSize: 12 }}>({client.company})</span>
                        <div style={{ fontSize: 12, color: "#7a748e", marginTop: 2 }}>
                          ID: <code>{client.appId}</code> • Scheme: <strong>{client.scheme}</strong> • Officer: <span>{client.assignedSalesPerson}</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "4px 12px",
                            borderRadius: 999,
                            background: `${stageBadgeColors[client.applicationStatus || tracker.currentStage] || "#4e7cff"}18`,
                            color: stageBadgeColors[client.applicationStatus || tracker.currentStage] || "#4e7cff",
                            fontWeight: 750,
                            fontSize: 12,
                            border: `1px solid ${stageBadgeColors[client.applicationStatus || tracker.currentStage] || "#4e7cff"}33`,
                          }}
                        >
                          ● {client.applicationStatus || tracker.currentStage}
                        </span>

                        <button
                          type="button"
                          className="primary-button"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: 32,
                            padding: "0 12px",
                            fontSize: 12,
                            fontWeight: 700,
                            borderRadius: 8,
                            margin: 0,
                            boxSizing: "border-box",
                          }}
                          onClick={() => onOpenStatusUpdate(client)}
                        >
                          Update Status
                        </button>

                        <button
                          type="button"
                          className="admin-dossier-btn"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 5,
                            height: 32,
                            padding: "0 12px",
                            fontSize: 12,
                            fontWeight: 700,
                            borderRadius: 8,
                            background: "#f0f4ff",
                            color: "#3730a3",
                            border: "1px solid #c7d2fe",
                            cursor: "pointer",
                            margin: 0,
                            boxSizing: "border-box",
                            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                            boxShadow: "0 1px 2px rgba(55, 48, 163, 0.06)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#4338ca";
                            e.currentTarget.style.color = "#ffffff";
                            e.currentTarget.style.borderColor = "#4338ca";
                            e.currentTarget.style.transform = "translateY(-1px)";
                            e.currentTarget.style.boxShadow = "0 4px 12px rgba(67, 56, 202, 0.22)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#f0f4ff";
                            e.currentTarget.style.color = "#3730a3";
                            e.currentTarget.style.borderColor = "#c7d2fe";
                            e.currentTarget.style.transform = "none";
                            e.currentTarget.style.boxShadow = "0 1px 2px rgba(55, 48, 163, 0.06)";
                          }}
                          onClick={() => onOpenDossier(client)}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                          </svg>
                          <span>Dossier</span>
                        </button>
                      </div>
                    </div>

                    {/* Dynamic Scheme-Based Activity Stepper Bar */}
                    <ActivityStatusBar
                      scheme={client.scheme}
                      stages={tracker.stages}
                      completedSteps={tracker.completedStages}
                      progress={tracker.progressPercent}
                      interactive={true}
                      size="normal"
                      onStepToggle={(stepName, nextSteps, newPercent) =>
                        onQuickStepToggle(client, stepName, nextSteps, newPercent)
                      }
                    />

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "#7a748e", paddingTop: 4, borderTop: "1px dashed #e7e7f5" }}>
                      <span>Last Milestone Audit: <strong>{client.lastUpdated}</strong></span>
                      <span>{tracker.completedStages.length} of {tracker.totalStages} points completed ({tracker.progressPercent}%)</span>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>

        {/* Right Column: Document Checklist & Milestone Distribution */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Document Verification Checklist */}
          <div style={{ background: "#fff", padding: 22, borderRadius: 16, border: "1px solid #e7e7f5" }}>
            <h3 style={{ margin: "0 0 4px" }}>Document Verification Checklist</h3>
            <p style={{ margin: "0 0 14px", color: "#7a748e", fontSize: 13 }}>
              Audit KYC, PAN, GST, and trade licenses per client
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {branchClients.slice(0, 5).map((client) => {
                const verifiedDocs = (client.documents || []).filter((d) => d.status === "Verified").length;
                const totalDocs = (client.documents || []).length;
                const isAllDone = totalDocs > 0 && verifiedDocs === totalDocs;

                return (
                  <div
                    key={client.id}
                    style={{
                      padding: 12,
                      borderRadius: 12,
                      background: "#fbfbfe",
                      border: "1px solid #e7e7f5",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: 13.5 }}>{client.name}</strong>
                      <div style={{ fontSize: 12, color: "#7a748e" }}>
                        {verifiedDocs} of {totalDocs} Documents Verified
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        style={{
                          fontSize: 11.5,
                          fontWeight: 700,
                          padding: "3px 8px",
                          borderRadius: 6,
                          background: isAllDone ? "rgba(16, 185, 129, 0.12)" : "rgba(242, 170, 56, 0.14)",
                          color: isAllDone ? "#059669" : "#a16207",
                        }}
                      >
                        {isAllDone ? "All Verified ✓" : "Audit Pending"}
                      </span>
                      <button
                        type="button"
                        className="table-action"
                        style={{ padding: "4px 8px", fontSize: 11 }}
                        onClick={() => onOpenStatusUpdate(client)}
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity Stages Breakdown Widget */}
          <div style={{ background: "#fff", padding: 22, borderRadius: 16, border: "1px solid #e7e7f5" }}>
            <h3 style={{ margin: "0 0 14px" }}>5 Activity Stages Breakdown</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {ACTIVITY_STAGES.map((stage) => {
                const count = branchClients.filter((c) => c.applicationStatus === stage.name).length;
                return (
                  <div
                    key={stage.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      borderRadius: 8,
                      background: "#fbfbfe",
                      border: "1px solid #e7e7f5",
                      fontSize: 13,
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: stage.badgeColor || "#10b981",
                          color: "#fff",
                          display: "grid",
                          placeItems: "center",
                          fontSize: 10,
                          fontWeight: 800,
                        }}
                      >
                        {stage.step}
                      </span>
                      <strong>{stage.name}</strong> ({stage.percent}%)
                    </span>
                    <span style={{ fontWeight: 800, color: "#1e293b", background: "#f1f5f9", padding: "2px 8px", borderRadius: 999 }}>
                      {count} Clients
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status Update Feed */}
          <div style={{ background: "#fff", padding: 22, borderRadius: 16, border: "1px solid #e7e7f5" }}>
            <h3 style={{ margin: "0 0 14px" }}>Recent Milestone History</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {branchClients.flatMap((c) => (c.history || []).map((h) => ({ ...h, clientName: c.name, appId: c.appId }))).slice(0, 5).map((entry, idx) => (
                <div key={idx} style={{ padding: 10, background: "#fbfbfe", borderRadius: 8, border: "1px solid #e7e7f5", fontSize: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, marginBottom: 2 }}>
                    <span>{entry.clientName}</span>
                    <span style={{ color: stageBadgeColors[entry.status] || "#10b981" }}>{entry.status}</span>
                  </div>
                  <p style={{ margin: "2px 0 0", color: "#6b6b77" }}>{entry.notes}</p>
                  <small style={{ color: "#9a94ad" }}>{entry.date} by {entry.updatedBy}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
