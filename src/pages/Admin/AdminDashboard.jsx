import React, { useState, useMemo, useRef, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import HeaderSearch from "../../components/dashboard/HeaderSearch";
import UserProfileMenu from "../../components/dashboard/UserProfileMenu";
import Icon from "../../components/Icon";
import {
  initialBranches,
  initialBranchClients,
  initialBranchTeam,
  ACTIVITY_STAGES,
  getTrackerState,
} from "./mockAdminData";

// Modular Page Components
import AdminOverviewPage from "./AdminOverviewPage";
import AdminClientsPage from "./AdminClientsPage";
import AdminPipelinePage from "./AdminPipelinePage";
import AdminHistoryPage from "./AdminHistoryPage";
import AdminTeamPage from "./AdminTeamPage";
import AdminRequestsPage from "./AdminRequestsPage";
import AgreementPage from "../Agreement/AgreementPage";

// Dedicated Modals
import AdminStatusModal from "./AdminStatusModal";
import AdminClientDossierModal from "./AdminClientDossierModal";
import AdminCreateRequestModal from "./AdminCreateRequestModal";
import "./AdminDashboard.css";

import {
  canCompleteStage,
  getTrackerStages,
  normalizeCompletedStages,
} from "../../utils/schemeTracker";

// Navigation items
const adminNavItems = [
  { icon: "dashboard", label: "Dashboard" },
  { icon: "clients", label: "Clients" },
  { icon: "overview", label: "Pipeline" },
  { icon: "agreement", label: "Agreement" },
  { icon: "requests", label: "Requests" },
  { icon: "history", label: "History" },
  { icon: "team", label: "Team" },
];

export default function AdminDashboard({ onSignOut, userEmail }) {
  const navigate = useNavigate();
  const location = useLocation();

  const urlToNavMap = useMemo(() => ({
    dashboard: "Dashboard",
    overview: "Dashboard",
    clients: "Clients",
    pipeline: "Pipeline",
    agreement: "Agreement",
    agreements: "Agreement",
    requests: "Requests",
    history: "History",
    team: "Team",
  }), []);

  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentSlug = pathParts[1] || "dashboard";
  const activeNav = urlToNavMap[currentSlug.toLowerCase()] || "Dashboard";

  const handleNavChange = (label) => {
    const slug = label.toLowerCase();
    navigate(`/admin/${slug}`);
  };

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

  const [teamMembers] = useState(initialBranchTeam);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("agni_branch_clients", JSON.stringify(clients));
    } catch (e) {
      console.warn("Failed to save clients to localStorage", e);
    }
  }, [clients]);

  // Filter States for Clients Page
  const [statusTab, setStatusTab] = useState("All");
  const [clientSearch, setClientSearch] = useState("");

  // Modals State
  const [selectedClientForDossier, setSelectedClientForDossier] = useState(null);
  const [updatingClient, setUpdatingClient] = useState(null);
  const [rollbackRequestData, setRollbackRequestData] = useState(null);
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

  // Filtered clients list for Clients Page based on statusTab and search
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
    const tracker = getTrackerState({ scheme: client.scheme, completedSteps: nextCompletedSteps });
    const activeStageName = tracker.completedStages.length > 0
      ? tracker.completedStages[tracker.completedStages.length - 1]
      : "CRM Creation";
    const nowStr = new Date().toISOString().replace("T", " ").substring(0, 16);
    const historyEntry = {
      date: nowStr.split(" ")[0],
      status: activeStageName,
      updatedBy: `${adminName} (Branch Admin)`,
      notes: `Updated milestone to "${activeStageName}" (${tracker.progressPercent}% completion - ${tracker.completedStages.length}/${tracker.totalStages} points checked).`,
    };

    setClients((prev) =>
      prev.map((c) => {
        if (c.id === client.id) {
          return {
            ...c,
            completedSteps: tracker.completedStages,
            applicationStatus: activeStageName,
            progress: tracker.progressPercent,
            lastUpdated: nowStr,
            history: [historyEntry, ...(c.history || [])],
          };
        }
        return c;
      })
    );

    showToast(`✓ Updated ${client.name} to "${activeStageName}" (${tracker.progressPercent}% — ${tracker.completedStages.length}/${tracker.totalStages} points completed)`);
  };

  // Advance client CRM activity tracker upon agreement creation/dispatch
  const handleClientAgreementAdvance = (client, milestoneName, isComplete) => {
    if (!client) return;
    const stages = getTrackerStages(client.scheme);
    const currentCompleted = client.completedSteps || ["CRM Creation"];
    let nextCompleted = [...currentCompleted];

    if (isComplete) {
      if (!nextCompleted.includes("Agreement") && canCompleteStage("Agreement", stages, nextCompleted)) {
        nextCompleted.push("Agreement");
      }
    }

    const normalized = normalizeCompletedStages(nextCompleted, stages);
    const tracker = getTrackerState({ scheme: client.scheme, completedSteps: normalized });
    const nowStr = new Date().toISOString().replace("T", " ").substring(0, 16);

    const historyEntry = {
      date: nowStr.split(" ")[0],
      status: isComplete ? "Agreement" : "CRM Creation",
      updatedBy: `${adminName} (Branch Admin)`,
      notes: isComplete
        ? `Legal agreement executed and dispatched. Milestone "Agreement" completed (${tracker.progressPercent}%).`
        : `Agreement draft initialized and prepared for ${client.name}.`,
    };

    setClients((prev) =>
      prev.map((c) => {
        if (c.id === client.id) {
          return {
            ...c,
            completedSteps: tracker.completedStages,
            applicationStatus: isComplete && tracker.completedStages.includes("Agreement") ? "Agreement" : c.applicationStatus,
            progress: tracker.progressPercent,
            lastUpdated: nowStr,
            history: [historyEntry, ...(c.history || [])],
          };
        }
        return c;
      })
    );
  };

  // Open Status Update Modal
  const handleOpenStatusUpdate = (client) => {
    setUpdatingClient(client);
    const tracker = getTrackerState(client);

    setStatusFormData({
      status: client.applicationStatus || tracker.currentStage,
      completedSteps: tracker.completedStages,
      progress: tracker.progressPercent,
      notes: client.adminNotes || "",
      documentUpdates: (client.documents || []).reduce((acc, doc) => {
        acc[doc.name] = doc.status;
        return acc;
      }, {}),
    });
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
        onNavChange={handleNavChange}
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
            <HeaderSearch
              query={query}
              setQuery={setQuery}
              isOpen={searchOpen}
              setIsOpen={setSearchOpen}
              placeholder="Search client applications..."
            />

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

            <UserProfileMenu
              user={{
                name: adminName || "Rajesh Kumar",
                email: "rajesh.admin@agnicrm.com",
                phone: "+91 98203 11223",
                branch: selectedBranch || "West Zone (Mumbai)",
                designation: "Branch Lead Administrator",
                empId: "EMP-ADM-3001",
                reportingManager: "Vikramaditya Sharma (Branch Manager)",
              }}
              role="Branch Admin"
              roleBadge="Branch Admin"
              initials="AD"
              avatarColor="linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
              onSignOut={onSignOut}
              showToast={(msg) => showToast(msg)}
            />
          </div>
        </DashboardHeader>

        {/* Global Toast Alert */}
        {toastMessage && (
          <div
            style={{
              padding: "14px 20px",
              marginBottom: 18,
              borderRadius: 14,
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "13.5px",
              boxShadow: "0 6px 20px rgba(16, 185, 129, 0.35)",
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

        {/* Dynamic Nested Routes for Admin Section */}
        <Routes>
          <Route
            index
            element={
              <AdminOverviewPage
                selectedBranch={selectedBranch}
                branchClients={branchClients}
                metrics={metrics}
                dark={dark}
                onOpenClients={() => handleNavChange("Clients")}
                onOpenPipeline={() => handleNavChange("Pipeline")}
                onOpenAgreement={() => handleNavChange("Agreement")}
                onOpenHistory={() => handleNavChange("History")}
                onOpenStatusUpdate={handleOpenStatusUpdate}
                onQuickStepToggle={handleQuickStepToggle}
                onOpenDossier={setSelectedClientForDossier}
              />
            }
          />
          <Route
            path="dashboard"
            element={
              <AdminOverviewPage
                selectedBranch={selectedBranch}
                branchClients={branchClients}
                metrics={metrics}
                dark={dark}
                onOpenClients={() => handleNavChange("Clients")}
                onOpenPipeline={() => handleNavChange("Pipeline")}
                onOpenAgreement={() => handleNavChange("Agreement")}
                onOpenHistory={() => handleNavChange("History")}
                onOpenStatusUpdate={handleOpenStatusUpdate}
                onQuickStepToggle={handleQuickStepToggle}
                onOpenDossier={setSelectedClientForDossier}
              />
            }
          />
          <Route
            path="overview"
            element={
              <AdminOverviewPage
                selectedBranch={selectedBranch}
                branchClients={branchClients}
                metrics={metrics}
                dark={dark}
                onOpenClients={() => handleNavChange("Clients")}
                onOpenPipeline={() => handleNavChange("Pipeline")}
                onOpenAgreement={() => handleNavChange("Agreement")}
                onOpenHistory={() => handleNavChange("History")}
                onOpenStatusUpdate={handleOpenStatusUpdate}
                onQuickStepToggle={handleQuickStepToggle}
                onOpenDossier={setSelectedClientForDossier}
              />
            }
          />
          <Route
            path="clients"
            element={
              <AdminClientsPage
                selectedBranch={selectedBranch}
                statusTab={statusTab}
                setStatusTab={setStatusTab}
                clientSearch={clientSearch}
                setClientSearch={setClientSearch}
                filteredClients={filteredClients}
                dark={dark}
                onOpenStatusUpdate={handleOpenStatusUpdate}
                onOpenDossier={setSelectedClientForDossier}
              />
            }
          />
          <Route
            path="pipeline"
            element={
              <AdminPipelinePage
                selectedBranch={selectedBranch}
                branchClients={branchClients}
                dark={dark}
                onOpenStatusUpdate={handleOpenStatusUpdate}
              />
            }
          />
          <Route
            path="agreement"
            element={
              <AgreementPage
                clients={branchClients}
                onClientTrackerAdvance={handleClientAgreementAdvance}
                showToast={showToast}
                selectedBranch={selectedBranch}
              />
            }
          />
          <Route
            path="requests"
            element={
              <AdminRequestsPage
                clients={branchClients}
                onRollbackApproved={(req) => {
                  showToast(`Rollback request ${req.id} approved.`);
                }}
              />
            }
          />
          <Route
            path="history"
            element={
              <AdminHistoryPage
                selectedBranch={selectedBranch}
                branchClients={branchClients}
                dark={dark}
                onOpenDossier={setSelectedClientForDossier}
              />
            }
          />
          <Route
            path="team"
            element={
              <AdminTeamPage
                selectedBranch={selectedBranch}
                teamMembers={teamMembers}
                branchClients={branchClients}
                dark={dark}
                onOpenDossier={setSelectedClientForDossier}
                onOpenStatusUpdate={handleOpenStatusUpdate}
              />
            }
          />
          <Route
            path="*"
            element={<Navigate to="/admin/dashboard" replace />}
          />
        </Routes>

        {/* MODAL: UPDATE APPLICATION STATUS & 5-POINT MILESTONES */}
        <AdminStatusModal
          updatingClient={updatingClient}
          statusFormData={statusFormData}
          setStatusFormData={setStatusFormData}
          onClose={() => setUpdatingClient(null)}
          onSave={handleSaveStatusUpdate}
          onRequestRollback={(client, targetStage) => {
            setUpdatingClient(null);
            setRollbackRequestData({ client, targetStage });
          }}
        />

        {/* MODAL: CLIENT APPLICATION DOSSIER */}
        <AdminClientDossierModal
          selectedClientForDossier={selectedClientForDossier}
          onClose={() => setSelectedClientForDossier(null)}
          onOpenStatusUpdate={(client) => {
            setSelectedClientForDossier(null);
            handleOpenStatusUpdate(client);
          }}
        />

        {/* MODAL: STAGE ROLLBACK & GOVERNANCE REQUEST TO BRANCH MANAGER */}
        {rollbackRequestData && (
          <AdminCreateRequestModal
            clients={branchClients}
            preselectedClient={rollbackRequestData.client}
            preselectedTargetStage={rollbackRequestData.targetStage}
            onClose={() => setRollbackRequestData(null)}
            onSubmit={(newReq) => {
              setRollbackRequestData(null);
              showToast(`Rollback request for ${newReq.clientName} submitted to Branch Manager.`);
              navigate("/admin/requests");
            }}
          />
        )}
      </section>
    </main>
  );
}
