import React, { useState, useMemo, useRef, useEffect } from "react";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Icon from "../../components/Icon";
import Modal from "../../components/Modal";
import ActivityStatusBar from "../../components/dashboard/ActivityStatusBar";
import {
  initialBranches,
  initialBranchClients,
  APPLICATION_STAGES,
  ACTIVITY_STAGES,
  initialBranchTeam,
} from "./mockAdminData";

// Navigation items without "Settings" as explicitly requested by user
const adminNavItems = [
  { icon: "dashboard", label: "Dashboard" },
  { icon: "clients", label: "Clients" },
  { icon: "overview", label: "Pipeline" },
  { icon: "requests", label: "History" },
  { icon: "team", label: "Team" },
];

const stageBadgeColors = {
  Submission: "#4e7cff",
  "Doc Audit": "#9a74e9",
  "Manager Review": "#f2aa38",
  Agreement: "#26a69a",
  "Final Approval": "#10b981",
  "Active & Disbursed": "#10b981",
  "Document Verification": "#9a74e9",
  Underwriting: "#f2aa38",
  Approved: "#26a69a",
  Submitted: "#4e7cff",
  "On Hold": "#ff9800",
  Rejected: "#ff5757",
};

const formatCurrency = (val) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

export default function AdminDashboard({ onSignOut, userEmail }) {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [dark, setDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const notificationWrapRef = useRef(null);

  // Admin Name
  const adminName = useMemo(() => {
    if (!userEmail) return "Branch Admin";
    const raw = userEmail.split("@")[0];
    const cleaned = raw.replace(/\d+$/, "");
    const parts = cleaned.split(/[^a-zA-Z]+/).filter(Boolean);
    if (!parts.length) return "Branch Admin";
    return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join(" ");
  }, [userEmail]);

  // Selected Branch (every branch has its own admin team)
  const [selectedBranch, setSelectedBranch] = useState("West Zone (Mumbai)");
  
  // Clients state with localStorage persistence
  const [clients, setClients] = useState(() => {
    try {
      const saved = localStorage.getItem("agni_branch_clients");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Failed to load saved clients from localStorage", e);
    }
    return initialBranchClients;
  });

  const [teamMembers, setTeamMembers] = useState(initialBranchTeam);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("agni_branch_clients", JSON.stringify(clients));
    } catch (e) {
      console.warn("Failed to save clients to localStorage", e);
    }
  }, [clients]);

  // Filter States
  const [statusTab, setStatusTab] = useState("All");
  const [clientSearch, setClientSearch] = useState("");

  // Modals
  const [selectedClientForDossier, setSelectedClientForDossier] = useState(null);
  const [updatingClient, setUpdatingClient] = useState(null);
  const [statusFormData, setStatusFormData] = useState({
    status: "Doc Audit",
    completedSteps: ["Submission", "Doc Audit"],
    progress: 40,
    notes: "",
    documentUpdates: {},
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4500);
  };

  // Branch Clients (filtered by selected branch)
  const branchClients = useMemo(() => {
    return clients.filter((c) => c.branch === selectedBranch);
  }, [clients, selectedBranch]);

  // Filtered clients list based on statusTab and search
  const filteredClients = useMemo(() => {
    return branchClients.filter((c) => {
      const matchesStatus = statusTab === "All" || c.applicationStatus === statusTab;
      const q = clientSearch.trim().toLowerCase();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.appId.toLowerCase().includes(q) ||
        c.scheme.toLowerCase().includes(q) ||
        c.assignedSalesPerson.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [branchClients, statusTab, clientSearch]);

  // Status Metrics for current branch
  const metrics = useMemo(() => {
    const total = branchClients.length;
    const completed = branchClients.filter((c) => c.progress === 100 || c.applicationStatus === "Final Approval").length;
    const inProgress = branchClients.filter((c) => c.progress > 0 && c.progress < 100).length;
    const managerReview = branchClients.filter((c) => c.applicationStatus === "Manager Review").length;
    const docAudit = branchClients.filter((c) => c.applicationStatus === "Doc Audit").length;
    return { total, completed, inProgress, managerReview, docAudit };
  }, [branchClients]);

  // Handle direct quick interactive point toggle on client card
  const handleQuickStepToggle = (client, stepName, nextCompletedSteps, newPercent) => {
    const activeStageName = nextCompletedSteps.length > 0
      ? nextCompletedSteps[nextCompletedSteps.length - 1]
      : "Submission";
    const nowStr = new Date().toISOString().replace("T", " ").substring(0, 16);
    const historyEntry = {
      date: nowStr.split(" ")[0],
      status: activeStageName,
      updatedBy: `${adminName} (Branch Admin)`,
      notes: `Updated milestone to "${activeStageName}" (${newPercent}% completion - ${nextCompletedSteps.length}/5 points checked).`,
    };

    setClients((prev) =>
      prev.map((c) => {
        if (c.id === client.id) {
          return {
            ...c,
            completedSteps: nextCompletedSteps,
            applicationStatus: activeStageName,
            progress: newPercent,
            lastUpdated: nowStr,
            history: [historyEntry, ...(c.history || [])],
          };
        }
        return c;
      })
    );

    showToast(`✓ Updated ${client.name} to "${activeStageName}" (${newPercent}% — ${nextCompletedSteps.length}/5 points completed)`);
  };

  // Open Status Update Modal
  const handleOpenStatusUpdate = (client) => {
    setUpdatingClient(client);
    const completed = client.completedSteps && Array.isArray(client.completedSteps)
      ? client.completedSteps
      : ACTIVITY_STAGES.slice(0, Math.round((client.progress || 20) / 20)).map((s) => s.name);

    setStatusFormData({
      status: client.applicationStatus || completed[completed.length - 1] || "Submission",
      completedSteps: completed,
      progress: completed.length * 20,
      notes: "",
      documentUpdates: (client.documents || []).reduce((acc, doc) => {
        acc[doc.name] = doc.status;
        return acc;
      }, {}),
    });
  };

  // Toggle a single step checkbox inside the Status Update Modal
  const handleModalStepCheckboxToggle = (stepName) => {
    setStatusFormData((prev) => {
      let updated;
      if (prev.completedSteps.includes(stepName)) {
        updated = prev.completedSteps.filter((s) => s !== stepName);
      } else {
        updated = [...prev.completedSteps, stepName];
      }
      const newPercent = Math.min(100, Math.max(0, updated.length * 20));
      // Determine highest completed stage name
      const sortedCompleted = ACTIVITY_STAGES.filter((s) => updated.includes(s.name));
      const latestStage = sortedCompleted.length > 0 ? sortedCompleted[sortedCompleted.length - 1].name : "Submission";

      return {
        ...prev,
        completedSteps: updated,
        progress: newPercent,
        status: latestStage,
      };
    });
  };

  // Handle stage selection in modal (auto-checks all points up to that stage)
  const handleModalStageSelect = (stageName, stageIdx) => {
    const nextSteps = ACTIVITY_STAGES.slice(0, stageIdx + 1).map((s) => s.name);
    const newPercent = (stageIdx + 1) * 20;
    setStatusFormData((prev) => ({
      ...prev,
      status: stageName,
      completedSteps: nextSteps,
      progress: newPercent,
    }));
  };

  // Save Application Status Update
  const handleSaveStatusUpdate = (e) => {
    e.preventDefault();
    if (!updatingClient) return;

    const newStatus = statusFormData.status;
    const newProgress = Number(statusFormData.progress);
    const newCompletedSteps = statusFormData.completedSteps;
    const nowStr = new Date().toISOString().replace("T", " ").substring(0, 16);

    const historyEntry = {
      date: nowStr.split(" ")[0],
      status: newStatus,
      updatedBy: `${adminName} (Branch Admin)`,
      notes: statusFormData.notes || `Milestones updated: ${newCompletedSteps.length}/5 points checked (${newProgress}% completed).`,
    };

    const updatedDocuments = (updatingClient.documents || []).map((doc) => {
      if (statusFormData.documentUpdates[doc.name]) {
        return { ...doc, status: statusFormData.documentUpdates[doc.name] };
      }
      return doc;
    });

    setClients((prev) =>
      prev.map((c) => {
        if (c.id === updatingClient.id) {
          return {
            ...c,
            applicationStatus: newStatus,
            completedSteps: newCompletedSteps,
            progress: newProgress,
            lastUpdated: nowStr,
            adminNotes: statusFormData.notes || c.adminNotes,
            documents: updatedDocuments,
            history: [historyEntry, ...(c.history || [])],
          };
        }
        return c;
      })
    );

    // Also update selectedClientForDossier if open
    if (selectedClientForDossier && selectedClientForDossier.id === updatingClient.id) {
      setSelectedClientForDossier((prev) => ({
        ...prev,
        applicationStatus: newStatus,
        completedSteps: newCompletedSteps,
        progress: newProgress,
        lastUpdated: nowStr,
        adminNotes: statusFormData.notes || prev.adminNotes,
        documents: updatedDocuments,
        history: [historyEntry, ...(prev.history || [])],
      }));
    }

    showToast(`✓ Application ${updatingClient.appId} (${updatingClient.name}) saved: "${newStatus}" (${newProgress}% — ${newCompletedSteps.length}/5 points).`);
    setUpdatingClient(null);
  };

  return (
    <main className={`owner-dashboard admin-dashboard ${dark ? "dashboard-dark" : ""}`}>
      <DashboardSidebar
        navItems={adminNavItems}
        activeNav={activeNav}
        onNavChange={(nav) => setActiveNav(nav)}
        dark={dark}
        onToggleDark={() => setDark((v) => !v)}
        onSignOut={onSignOut}
        IconComponent={Icon}
        brandMark="A"
        navLabel="Branch admin navigation"
      />

      <section className="dashboard-content">
        <DashboardHeader
          eyebrow="Branch Admin Portal"
          title={`Hello, ${adminName}`}
          className="admin-dashboard-top"
        >
          <div className="top-actions">
            {/* Branch Selector Dropdown */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", padding: "4px 10px", borderRadius: 10, border: "1px solid #dedfe1" }}>
              <Icon name="branches" size={15} />
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                style={{ border: "none", background: "transparent", font: "inherit", fontWeight: 700, color: "#1d2330", cursor: "pointer", outline: "none" }}
              >
                {initialBranches.map((b) => (
                  <option key={b.id} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {searchOpen ? (
              <div className="search-field">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search client applications..."
                />
                <button type="button" onClick={() => setSearchOpen(false)}>
                  <Icon name="search" size={16} />
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => setSearchOpen(true)}>
                <Icon name="search" size={16} />
              </button>
            )}

            <div className="notification-wrap" ref={notificationWrapRef}>
              <button
                className="notification"
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="Branch Notifications"
              >
                <Icon name="bell" size={16} />
                <i />
              </button>
              {notificationsOpen && (
                <section className="notifications-popover" aria-label="Notifications">
                  <header>
                    <h2>Branch Alerts</h2>
                    <span>{metrics.inProgress} In Progress</span>
                  </header>
                  <div className="notifications-scroll">
                    {branchClients.slice(0, 4).map((c) => (
                      <article key={c.id}>
                        <span className="notice-dot green" />
                        <div>
                          <strong>{c.name}</strong>
                          <p>Status: {c.applicationStatus} ({c.progress}% - {(c.completedSteps || []).length}/5 points)</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <button className="profile" type="button" style={{ background: "#4e7cff", color: "#fff" }}>
              AD
            </button>
            <span className="role-badge" style={{ background: "rgba(78, 124, 255, 0.15)", color: "#4e7cff", borderColor: "#4e7cff" }}>
              Branch Admin
            </span>
          </div>
        </DashboardHeader>

        {/* Global Toast Alert */}
        {toastMessage && (
          <div
            style={{
              padding: "14px 20px",
              marginBottom: 18,
              borderRadius: 12,
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "13.5px",
              boxShadow: "0 4px 18px rgba(16, 185, 129, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              animation: "fadeIn 0.25s ease",
            }}
          >
            <span>{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage("")}
              style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontSize: 16 }}
            >
              ✕
            </button>
          </div>
        )}

        {/* =========================================================
            1. DASHBOARD OVERVIEW TAB
           ========================================================= */}
        {activeNav === "Dashboard" ? (
          <section>
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
                  onClick={() => setActiveNav("Clients")}
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
                    <h3 style={{ margin: 0 }}>Client Application Progress Queue</h3>
                    <p style={{ margin: "4px 0 0", color: "#7a748e", fontSize: 13 }}>
                      Interactive 5-point activity status (20% per point). Click any point to quickly update milestone.
                    </p>
                  </div>
                  <button type="button" className="table-action" onClick={() => setActiveNav("Clients")}>
                    Manage All
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {branchClients.map((client) => {
                    const completed = client.completedSteps || (
                      client.progress ? ACTIVITY_STAGES.slice(0, Math.round(client.progress / 20)).map(s => s.name) : ["Submission"]
                    );

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
                                background: `${stageBadgeColors[client.applicationStatus] || "#4e7cff"}18`,
                                color: stageBadgeColors[client.applicationStatus] || "#4e7cff",
                                fontWeight: 750,
                                fontSize: 12,
                                border: `1px solid ${stageBadgeColors[client.applicationStatus] || "#4e7cff"}33`,
                              }}
                            >
                              ● {client.applicationStatus}
                            </span>

                            <button
                              type="button"
                              className="primary-button"
                              style={{ padding: "6px 12px", fontSize: 12 }}
                              onClick={() => handleOpenStatusUpdate(client)}
                            >
                              Update Status
                            </button>
                          </div>
                        </div>

                        {/* 5-Points Activity Status Stepper matching the reference picture */}
                        <ActivityStatusBar
                          completedSteps={completed}
                          progress={client.progress}
                          interactive={true}
                          onStepToggle={(stepName, nextSteps, newPct) =>
                            handleQuickStepToggle(client, stepName, nextSteps, newPct)
                          }
                          stepDates={{
                            Submission: client.submissionDate ? client.submissionDate.slice(5) : "10 Aug",
                            "Doc Audit": "12 Aug",
                            "Manager Review": "14 Aug",
                            Agreement: "Pending",
                            "Final Approval": "Pending",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Stage Summary & Recent Audit Feed */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* 5-Point Application Stage Breakdown */}
                <div style={{ background: "#fff", padding: 22, borderRadius: 16, border: "1px solid #e7e7f5" }}>
                  <h3 style={{ margin: "0 0 14px" }}>Branch 5-Stage Breakdown</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {ACTIVITY_STAGES.map((stage) => {
                      const count = branchClients.filter((c) => (c.completedSteps || []).includes(stage.name)).length;
                      return (
                        <div key={stage.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                            <span
                              style={{
                                width: 18,
                                height: 18,
                                borderRadius: "50%",
                                background: "#10b981",
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
        ) : null}

        {/* =========================================================
            2. BRANCH CLIENTS TAB
           ========================================================= */}
        {activeNav === "Clients" ? (
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
              <div>
                <p className="dashboard-eyebrow">{selectedBranch}</p>
                <h1>Branch Client Directory & Progress</h1>
              </div>
            </div>

            {/* Filter Tabs & Search */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["All", ...ACTIVITY_STAGES.map((s) => s.name)].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className="table-action"
                    style={{
                      background: statusTab === tab ? "#4e7cff" : "#fff",
                      color: statusTab === tab ? "#fff" : "#1d2330",
                      border: statusTab === tab ? "1px solid #4e7cff" : "1px solid #e7e7f5",
                      minWidth: 100,
                    }}
                    onClick={() => setStatusTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div style={{ minWidth: 260 }}>
                <input
                  type="text"
                  placeholder="Search client, company, app ID..."
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  style={{ width: "100%", padding: "9px 14px", borderRadius: 8, border: "1px solid #dedfe1" }}
                />
              </div>
            </div>

            {/* Clients Table */}
            <div style={{ overflowX: "auto" }}>
              <table className="clients-table" style={{ minWidth: 980 }}>
                <thead>
                  <tr>
                    <th>Application ID</th>
                    <th>Client & Company</th>
                    <th>Scheme / Value</th>
                    <th>Sales Officer</th>
                    <th>Activity Status (5 Points)</th>
                    <th>Progress (%)</th>
                    <th>Last Verified</th>
                    <th style={{ textAlign: "right" }}>Admin Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client) => {
                    const completed = client.completedSteps || (
                      client.progress ? ACTIVITY_STAGES.slice(0, Math.round(client.progress / 20)).map(s => s.name) : ["Submission"]
                    );

                    return (
                      <tr key={client.id}>
                        <td><strong>{client.appId}</strong></td>
                        <td>
                          <strong>{client.name}</strong>
                          <div style={{ fontSize: 12, color: "#7a748e" }}>{client.company}</div>
                        </td>
                        <td>
                          <div>{client.scheme}</div>
                          <strong style={{ color: "#4e7cff", fontSize: 12.5 }}>{formatCurrency(client.totalPayment)}</strong>
                        </td>
                        <td>{client.assignedSalesPerson}</td>
                        <td>
                          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                padding: "3px 9px",
                                borderRadius: 999,
                                background: `${stageBadgeColors[client.applicationStatus] || "#10b981"}18`,
                                color: stageBadgeColors[client.applicationStatus] || "#10b981",
                                fontWeight: 700,
                                fontSize: 11.5,
                                width: "fit-content",
                              }}
                            >
                              ● {client.applicationStatus}
                            </span>
                            {/* 5 mini dots indicator */}
                            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                              {ACTIVITY_STAGES.map((st) => {
                                const isDone = completed.includes(st.name);
                                return (
                                  <span
                                    key={st.name}
                                    title={`${st.name} (${st.percent}%) - ${isDone ? "Completed" : "Pending"}`}
                                    style={{
                                      width: 8,
                                      height: 8,
                                      borderRadius: "50%",
                                      background: isDone ? "#10b981" : "#cbd5e1",
                                    }}
                                  />
                                );
                              })}
                              <span style={{ fontSize: 10.5, color: "#64748b", marginLeft: 4 }}>
                                {completed.length}/5 Points
                              </span>
                            </div>
                          </div>
                        </td>
                        <td style={{ minWidth: 130 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ flex: 1, height: 8, background: "#e7e7f5", borderRadius: 999, overflow: "hidden" }}>
                              <div
                                style={{
                                  width: `${client.progress}%`,
                                  height: "100%",
                                  background: client.progress === 100 ? "#10b981" : "linear-gradient(90deg, #10b981, #059669)",
                                  borderRadius: 999,
                                }}
                              />
                            </div>
                            <strong style={{ fontSize: 12, color: client.progress === 100 ? "#10b981" : "#1e293b" }}>
                              {client.progress}%
                            </strong>
                          </div>
                        </td>
                        <td style={{ fontSize: 12, color: "#7a748e" }}>{client.lastUpdated}</td>
                        <td style={{ textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: 6 }}>
                            <button
                              className="primary-button"
                              type="button"
                              style={{ padding: "6px 12px", fontSize: 12 }}
                              onClick={() => handleOpenStatusUpdate(client)}
                            >
                              Update Status
                            </button>
                            <button
                              className="table-action"
                              type="button"
                              onClick={() => setSelectedClientForDossier(client)}
                            >
                              Dossier
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredClients.length === 0 && (
                    <tr>
                      <td colSpan={8} style={{ textAlign: "center", padding: "36px 16px", color: "#7a748e" }}>
                        No clients found for {selectedBranch} under {statusTab}.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {/* =========================================================
            3. APPLICATION PIPELINE (KANBAN / 5 ACTIVITY STAGES)
           ========================================================= */}
        {activeNav === "Pipeline" ? (
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
              <div>
                <p className="dashboard-eyebrow">{selectedBranch}</p>
                <h1>5-Stage Application Workflow Pipeline</h1>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, alignItems: "start" }}>
              {ACTIVITY_STAGES.map((stage, sIdx) => {
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
                              onClick={() => handleOpenStatusUpdate(client)}
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
        ) : null}

        {/* =========================================================
            4. STATUS HISTORY & AUDIT TRAIL TAB
           ========================================================= */}
        {activeNav === "History" ? (
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
              <div>
                <p className="dashboard-eyebrow">{selectedBranch}</p>
                <h1>Application Milestone Audit Trail</h1>
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table className="clients-table" style={{ minWidth: 900 }}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Application</th>
                    <th>Client Name</th>
                    <th>Milestone Stage</th>
                    <th>Updated By</th>
                    <th>Admin Notes & Verification Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {branchClients
                    .flatMap((c) =>
                      (c.history || []).map((h, i) => ({
                        ...h,
                        clientName: c.name,
                        company: c.company,
                        appId: c.appId,
                        rowKey: `${c.id}-${i}`,
                      }))
                    )
                    .map((item) => (
                      <tr key={item.rowKey}>
                        <td><strong>{item.date}</strong></td>
                        <td><code>{item.appId}</code></td>
                        <td>
                          <strong>{item.clientName}</strong>
                          <div style={{ fontSize: 12, color: "#7a748e" }}>{item.company}</div>
                        </td>
                        <td>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              padding: "4px 10px",
                              borderRadius: 999,
                              background: `${stageBadgeColors[item.status] || "#10b981"}22`,
                              color: stageBadgeColors[item.status] || "#10b981",
                              fontWeight: 700,
                              fontSize: 12,
                            }}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td><strong>{item.updatedBy}</strong></td>
                        <td>{item.notes}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {/* =========================================================
            5. BRANCH TEAM TAB
           ========================================================= */}
        {activeNav === "Team" ? (
          <section>
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
        ) : null}

        {/* =========================================================
            MODAL: UPDATE APPLICATION STATUS & 5-POINT MILESTONES
           ========================================================= */}
        {updatingClient && (
          <Modal
            title={`Update Milestones: ${updatingClient.name} (${updatingClient.appId})`}
            onClose={() => setUpdatingClient(null)}
            closeLabel="Close"
          >
            <form onSubmit={handleSaveStatusUpdate} style={{ display: "grid", gap: 18, minWidth: 320, maxWidth: 660 }}>
              <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <p className="eyebrow" style={{ margin: "0 0 2px" }}>Client & Company</p>
                  <strong>{updatingClient.name}</strong> — {updatingClient.company}
                </div>
                <div>
                  <p className="eyebrow" style={{ margin: "0 0 2px" }}>Assigned Scheme</p>
                  <strong>{updatingClient.scheme}</strong> ({formatCurrency(updatingClient.totalPayment)})
                </div>
              </div>

              {/* 5-Points Live Interactive Checklist & Visual Stepper */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <label className="field-label" style={{ margin: 0 }}>
                    5 Activity Points (20% per completed point):
                  </label>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#10b981" }}>
                    {statusFormData.completedSteps.length} of 5 Points ({statusFormData.progress}%)
                  </span>
                </div>

                {/* Checklist Cards */}
                <div style={{ display: "grid", gap: 8, marginBottom: 14 }}>
                  {ACTIVITY_STAGES.map((s, idx) => {
                    const isChecked = statusFormData.completedSteps.includes(s.name);
                    return (
                      <div
                        key={s.name}
                        className={`activity-modal-step-card ${isChecked ? "is-checked" : ""}`}
                        onClick={() => handleModalStepCheckboxToggle(s.name)}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div className="activity-modal-step-checkbox">
                            {isChecked ? "✓" : idx + 1}
                          </div>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <strong style={{ fontSize: 13.5 }}>{s.name}</strong>
                              <span style={{ fontSize: 11, fontWeight: 750, color: isChecked ? "#10b981" : "#64748b" }}>
                                (+20%)
                              </span>
                            </div>
                            <small style={{ color: "#7a748e", display: "block" }}>{s.description}</small>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="table-action"
                          style={{
                            fontSize: 11,
                            padding: "4px 10px",
                            background: isChecked ? "rgba(16, 185, 129, 0.12)" : "#f1f5f9",
                            color: isChecked ? "#059669" : "#1e293b",
                            borderColor: isChecked ? "#10b981" : "#cbd5e1",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleModalStageSelect(s.name, idx);
                          }}
                        >
                          {isChecked ? "Completed ✓" : `Set to Stage ${idx + 1}`}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Live Stepper Preview */}
                <div style={{ background: "#f8fafc", padding: 14, borderRadius: 14, border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.8, color: "#64748b", display: "block", marginBottom: 10 }}>
                    Live Stepper Preview:
                  </span>
                  <ActivityStatusBar
                    completedSteps={statusFormData.completedSteps}
                    progress={statusFormData.progress}
                    interactive={false}
                    size="compact"
                  />
                </div>
              </div>

              {/* Document Verification Checklist */}
              {updatingClient.documents && updatingClient.documents.length > 0 && (
                <div>
                  <label className="field-label" style={{ marginBottom: 6, display: "block" }}>
                    Document Verification Checklist:
                  </label>
                  <div style={{ display: "grid", gap: 8 }}>
                    {updatingClient.documents.map((doc) => (
                      <div
                        key={doc.name}
                        style={{
                          padding: "8px 12px",
                          borderRadius: 8,
                          background: "#fbfbfe",
                          border: "1px solid #e7e7f5",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <strong>{doc.name}</strong>
                          <span style={{ marginLeft: 8, fontSize: 12, color: "#7a748e" }}>({doc.number})</span>
                        </div>
                        <select
                          value={statusFormData.documentUpdates[doc.name] || doc.status}
                          onChange={(e) =>
                            setStatusFormData({
                              ...statusFormData,
                              documentUpdates: {
                                ...statusFormData.documentUpdates,
                                [doc.name]: e.target.value,
                              },
                            })
                          }
                          style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #dedfe1", font: "inherit", fontSize: 12 }}
                        >
                          <option value="Verified">Verified ✓</option>
                          <option value="Pending Review">Pending Review</option>
                          <option value="Rejected">Rejected ✕</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Admin Remarks */}
              <label className="field-label">
                Admin Verification Remarks / Notes:
                <textarea
                  rows={3}
                  required
                  placeholder="Enter details of milestone completion, audit notes, or reasons for status change..."
                  value={statusFormData.notes}
                  onChange={(e) => setStatusFormData({ ...statusFormData, notes: e.target.value })}
                  style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #dedfe1", font: "inherit", marginTop: 4 }}
                />
              </label>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 6 }}>
                <button className="table-action" type="button" onClick={() => setUpdatingClient(null)}>
                  Cancel
                </button>
                <button className="primary-button" type="submit" style={{ background: "#10b981", borderColor: "#10b981" }}>
                  Save & Update Status ({statusFormData.progress}%)
                </button>
              </div>
            </form>
          </Modal>
        )}

        {/* =========================================================
            MODAL: CLIENT APPLICATION DOSSIER VIEW
           ========================================================= */}
        {selectedClientForDossier && (
          <Modal
            title={`Application Dossier: ${selectedClientForDossier.name}`}
            onClose={() => setSelectedClientForDossier(null)}
            closeLabel="Close"
          >
            <div style={{ display: "grid", gap: 18, maxWidth: 680 }}>
              {/* Header Info */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h2 style={{ margin: 0 }}>{selectedClientForDossier.name}</h2>
                  <p style={{ margin: "2px 0 0", color: "#7a748e" }}>{selectedClientForDossier.company} • App ID: {selectedClientForDossier.appId}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "4px 12px",
                      borderRadius: 999,
                      background: `${stageBadgeColors[selectedClientForDossier.applicationStatus] || "#10b981"}22`,
                      color: stageBadgeColors[selectedClientForDossier.applicationStatus] || "#10b981",
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  >
                    ● {selectedClientForDossier.applicationStatus}
                  </span>
                  <div style={{ fontSize: 12, color: "#10b981", fontWeight: 700, marginTop: 4 }}>
                    {selectedClientForDossier.progress}% Completed ({(selectedClientForDossier.completedSteps || []).length}/5 Points)
                  </div>
                </div>
              </div>

              {/* 5-Points Stepper Bar matching reference picture */}
              <ActivityStatusBar
                completedSteps={selectedClientForDossier.completedSteps || []}
                progress={selectedClientForDossier.progress}
                interactive={false}
              />

              {/* Commercials & Scheme */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
                <div style={{ background: "#fbfbfe", padding: 12, borderRadius: 10, border: "1px solid #e7e7f5" }}>
                  <p className="eyebrow" style={{ margin: "0 0 2px" }}>Assigned Scheme</p>
                  <strong>{selectedClientForDossier.scheme}</strong>
                </div>
                <div style={{ background: "#fbfbfe", padding: 12, borderRadius: 10, border: "1px solid #e7e7f5" }}>
                  <p className="eyebrow" style={{ margin: "0 0 2px" }}>Total Commercial</p>
                  <strong style={{ color: "#4e7cff" }}>{formatCurrency(selectedClientForDossier.totalPayment)}</strong>
                </div>
                <div style={{ background: "#fbfbfe", padding: 12, borderRadius: 10, border: "1px solid #e7e7f5" }}>
                  <p className="eyebrow" style={{ margin: "0 0 2px" }}>Assigned Sales Officer</p>
                  <strong>{selectedClientForDossier.assignedSalesPerson}</strong>
                </div>
              </div>

              {/* Verified Documents */}
              <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
                <p className="eyebrow" style={{ margin: "0 0 8px" }}>Compliance & Verified Documents</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {(selectedClientForDossier.documents || []).map((doc) => (
                    <div key={doc.name} style={{ background: "#fff", padding: 10, borderRadius: 8, border: "1px solid #e7e7f5" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                        <strong>{doc.name}</strong>
                        <span style={{ fontSize: 11, fontWeight: 700, color: doc.status === "Verified" ? "#44bfb0" : "#f2aa38" }}>
                          {doc.status}
                        </span>
                      </div>
                      <small style={{ color: "#7a748e" }}>{doc.number}</small>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status History Timeline */}
              <div style={{ background: "#fbfbfe", padding: 14, borderRadius: 12, border: "1px solid #e7e7f5" }}>
                <p className="eyebrow" style={{ margin: "0 0 8px" }}>Application Timeline & History</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {(selectedClientForDossier.history || []).map((h, i) => (
                    <div key={i} style={{ padding: 8, background: "#fff", borderRadius: 6, border: "1px solid #eee", fontSize: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                        <span style={{ color: stageBadgeColors[h.status] || "#10b981" }}>{h.status}</span>
                        <span style={{ color: "#9a94ad" }}>{h.date}</span>
                      </div>
                      <p style={{ margin: "2px 0 0", color: "#555" }}>{h.notes}</p>
                      <small style={{ color: "#888" }}>By {h.updatedBy}</small>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button
                  className="primary-button"
                  type="button"
                  onClick={() => {
                    handleOpenStatusUpdate(selectedClientForDossier);
                  }}
                >
                  Update Application Status
                </button>
                <button className="table-action" type="button" onClick={() => setSelectedClientForDossier(null)}>
                  Close
                </button>
              </div>
            </div>
          </Modal>
        )}
      </section>
    </main>
  );
}
