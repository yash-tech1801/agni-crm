import React, { useState, useEffect, useCallback, useMemo } from "react";
import Icon from "../../components/Icon";
import {
  agreementService,
  AGREEMENT_STATUSES,
  normalizeAgreementData,
} from "../../services/agreementService";
import CurrentAgreementsTable from "./components/CurrentAgreementsTable";
import AgreementHistoryTable from "./components/AgreementHistoryTable";
import ClientAgreementFormModal from "./components/ClientAgreementFormModal";
import AgreementDocumentViewer from "./components/AgreementDocumentViewer";
import AdminClientDossierModal from "../Admin/AdminClientDossierModal";
import "../Admin/AdminDashboard.css";

export default function AgreementPage({
  clients = [],
  onClientTrackerAdvance,
  showToast,
  selectedBranch,
}) {
  // State
  const [agreements, setAgreements] = useState([]);
  const [loadingAgreements, setLoadingAgreements] = useState(true);
  const [viewMode, setViewMode] = useState("current"); // "current" | "history"
  const [searchTerm, setSearchTerm] = useState("");

  // Modals state
  const [creatingClient, setCreatingClient] = useState(null);
  const [reviewingAgreement, setReviewingAgreement] = useState(null);
  const [viewingDetailsClient, setViewingDetailsClient] = useState(null);

  // Load agreements via agreementService abstraction
  const loadAgreements = useCallback(async () => {
    try {
      setLoadingAgreements(true);
      const list = await agreementService.getAgreements();
      setAgreements(list);
    } catch (err) {
      console.error("Failed to load agreements:", err);
      if (showToast) {
        showToast("⚠️ Could not load agreements");
      }
    } finally {
      setLoadingAgreements(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadAgreements();
  }, [loadAgreements]);

  // Handle Form Submission (after 7 fields entered & agreement generation requested)
  const handleSubmitAgreement = (newAgreement, client) => {
    const normalized = normalizeAgreementData(newAgreement);

    setAgreements((prev) => {
      const filtered = prev.filter(
        (a) => a.clientId !== normalized.clientId && a.id !== normalized.id
      );
      return [normalized, ...filtered];
    });

    setCreatingClient(null);

    if (showToast) {
      showToast(
        `✓ Generated ${normalized.agreement?.templateName || "Agreement"} for ${normalized.client?.companyName || "Client"} (${normalized.id})`
      );
    }

    // Advance client's tracker in the CRM if applicable
    if (onClientTrackerAdvance && client) {
      onClientTrackerAdvance(client, "Agreement", false);
    }
  };

  // Handle Send Action
  const handleSendAgreement = async (agr) => {
    const normalized = normalizeAgreementData(agr);
    const clientRecord = clients.find(
      (c) =>
        c.id === normalized.clientId ||
        c.appId === normalized.applicationId ||
        c.id === normalized.crmId
    );
    const recipientEmail =
      clientRecord?.email || normalized.client?.email || "client@company.com";

    try {
      const updated = await agreementService.sendAgreement(normalized.id, recipientEmail);
      const normalizedUpdated = normalizeAgreementData(updated);

      setAgreements((prev) =>
        prev.map((item) => (item.id === normalized.id ? normalizedUpdated : item))
      );

      if (showToast) {
        showToast(`✓ Agreement ${normalized.id} sent to ${recipientEmail}`);
      }

      // Complete the Agreement milestone in the CRM tracker
      if (onClientTrackerAdvance && clientRecord) {
        onClientTrackerAdvance(clientRecord, "Agreement", true);
      }
    } catch (err) {
      console.error("Failed to send agreement:", err);
      if (showToast) {
        showToast(`⚠️ Failed to send agreement: ${err.message}`);
      }
    }
  };

  // Handle Retry Action
  const handleRetryAgreement = async (agr) => {
    const normalized = normalizeAgreementData(agr);
    try {
      if (showToast) showToast(`Retrying agreement generation for ${normalized.id}...`);
      const retried = await agreementService.retryGeneration(normalized.id);
      const normalizedRetried = normalizeAgreementData(retried);
      setAgreements((prev) =>
        prev.map((item) => (item.id === normalized.id ? normalizedRetried : item))
      );
      if (showToast) showToast(`✓ Agreement generation successful for ${normalized.id}`);
    } catch (err) {
      console.error("Retry generation failed:", err);
      if (showToast) showToast(`⚠️ Retry failed: ${err.message}`);
    }
  };

  // Metrics computation
  const metrics = useMemo(() => {
    const totalClients = clients.length;
    const sentCount = agreements.filter((a) => a.status === AGREEMENT_STATUSES.SENT || a.agreement?.status === AGREEMENT_STATUSES.SENT).length;
    const readyCount = agreements.filter((a) => a.status === AGREEMENT_STATUSES.READY || a.agreement?.status === AGREEMENT_STATUSES.READY).length;
    const pendingCount = Math.max(0, totalClients - agreements.length);

    return {
      totalClients,
      sentCount,
      readyCount,
      pendingCount,
      totalAgreements: agreements.length,
    };
  }, [clients, agreements]);

  return (
    <section className="admin-page-container">
      {/* ── Frosted Glass Header Banner ── */}
      <div className="admin-header-banner">
        <div>
          <span className="admin-kicker">LEGAL &amp; COMMERCIAL CONTRACTS</span>
          <h2 className="admin-title">Legal Agreements &amp; Contracts</h2>
          <p className="admin-desc">
            Generate official scheme and private funding contracts, review clauses, and dispatch documents with automated milestone tracking.
          </p>
        </div>

        {/* View Mode Toggle Switch */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            type="button"
            className={viewMode === "current" ? "admin-btn-primary" : "admin-btn-secondary"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "9px 18px",
              fontSize: 13,
            }}
            onClick={() => setViewMode("current")}
          >
            <span>Active Queue</span>
            <span
              style={{
                fontSize: 11,
                padding: "1px 6px",
                borderRadius: 999,
                background: viewMode === "current" ? "rgba(255, 255, 255, 0.25)" : "rgba(154, 116, 233, 0.2)",
              }}
            >
              {clients.length}
            </span>
          </button>

          <button
            type="button"
            className={viewMode === "history" ? "admin-btn-primary" : "admin-btn-secondary"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "9px 18px",
              fontSize: 13,
            }}
            onClick={() => setViewMode("history")}
          >
            <Icon name="requests" size={15} />
            <span>History Archive</span>
            <span
              style={{
                fontSize: 11,
                padding: "1px 6px",
                borderRadius: 999,
                background: viewMode === "history" ? "rgba(255, 255, 255, 0.25)" : "rgba(154, 116, 233, 0.2)",
              }}
            >
              {agreements.length}
            </span>
          </button>
        </div>
      </div>

      {/* ── KPI Stat Cards Strip ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
        <div className="admin-subcard" style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span className="admin-kicker" style={{ fontSize: 11 }}>Client Roster</span>
            <strong style={{ display: "block", fontSize: 22, color: "inherit", margin: "2px 0 0" }}>
              {metrics.totalClients}
            </strong>
            <small style={{ color: "#64748b", fontSize: 11.5 }}>Total Registered Clients</small>
          </div>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: "rgba(78, 124, 255, 0.12)",
              color: "#4e7cff",
              display: "grid",
              placeItems: "center",
              fontSize: 18,
            }}
          >
            👥
          </div>
        </div>

        <div className="admin-subcard" style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span className="admin-kicker" style={{ fontSize: 11, color: "#10b981" }}>Dispatched &amp; Live</span>
            <strong style={{ display: "block", fontSize: 22, color: "#10b981", margin: "2px 0 0" }}>
              {metrics.sentCount}
            </strong>
            <small style={{ color: "#64748b", fontSize: 11.5 }}>Sent to Client Email</small>
          </div>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: "rgba(16, 185, 129, 0.12)",
              color: "#10b981",
              display: "grid",
              placeItems: "center",
              fontSize: 18,
            }}
          >
            ✓
          </div>
        </div>

        <div className="admin-subcard" style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span className="admin-kicker" style={{ fontSize: 11, color: "#6366f1" }}>Ready for Review</span>
            <strong style={{ display: "block", fontSize: 22, color: "#6366f1", margin: "2px 0 0" }}>
              {metrics.readyCount}
            </strong>
            <small style={{ color: "#64748b", fontSize: 11.5 }}>Generated &amp; Vetted</small>
          </div>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: "rgba(99, 102, 241, 0.12)",
              color: "#6366f1",
              display: "grid",
              placeItems: "center",
              fontSize: 18,
            }}
          >
            📄
          </div>
        </div>

        <div className="admin-subcard" style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span className="admin-kicker" style={{ fontSize: 11, color: "#f59e0b" }}>Pending Inception</span>
            <strong style={{ display: "block", fontSize: 22, color: "#f59e0b", margin: "2px 0 0" }}>
              {metrics.pendingCount}
            </strong>
            <small style={{ color: "#64748b", fontSize: 11.5 }}>Awaiting Agreement Draft</small>
          </div>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: "rgba(245, 158, 11, 0.12)",
              color: "#f59e0b",
              display: "grid",
              placeItems: "center",
              fontSize: 18,
            }}
          >
            ⏳
          </div>
        </div>
      </div>

      {/* ── Main View: Current Table vs History Table ── */}
      {viewMode === "history" ? (
        <AgreementHistoryTable
          agreements={agreements}
          onReview={(agr) => setReviewingAgreement(agr)}
        />
      ) : (
        <CurrentAgreementsTable
          clients={clients}
          agreements={agreements}
          onViewDetails={setViewingDetailsClient}
          onCreateAgreement={setCreatingClient}
          onReviewAgreement={(agr) => setReviewingAgreement(agr)}
          onSendAgreement={handleSendAgreement}
          onRetryAgreement={handleRetryAgreement}
        />
      )}

      {/* ── Modal 1: 7-Field Creation Form ── */}
      <ClientAgreementFormModal
        isOpen={Boolean(creatingClient)}
        onClose={() => setCreatingClient(null)}
        client={creatingClient}
        onSubmitAgreement={handleSubmitAgreement}
        existingAgreementsCount={agreements.length}
      />

      {/* ── Modal 2: Document Review with DOCX/PDF Download & Preview ── */}
      <AgreementDocumentViewer
        agreement={reviewingAgreement}
        onClose={() => setReviewingAgreement(null)}
        onSendAgreement={handleSendAgreement}
        isHistoryView={viewMode === "history"}
        showToast={showToast}
      />

      {/* ── Modal 3: View Details (Existing Client Dossier) ── */}
      <AdminClientDossierModal
        selectedClientForDossier={viewingDetailsClient}
        onClose={() => setViewingDetailsClient(null)}
      />
    </section>
  );
}
