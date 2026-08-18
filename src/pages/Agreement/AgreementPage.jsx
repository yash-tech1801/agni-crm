import React, { useState, useEffect, useCallback } from "react";
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

  return (
    <section className="admin-page-section">
      {/* ── Page Header with ONLY [ History ] at Top-Right ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div>
          <p className="dashboard-eyebrow">{selectedBranch || "Agni CRM"}</p>
          <h1 style={{ margin: 0 }}>Agreement</h1>
          <p style={{ margin: "4px 0 0", color: "#7a748e", fontSize: 13 }}>
            Generate and manage legal agreement contracts from official templates for CRM client services.
          </p>
        </div>

        {/* Top-Right Action: Strictly [ History ] (or [ Active Agreements ]) */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            type="button"
            className={viewMode === "history" ? "primary-button" : "table-action"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 18px",
              fontSize: 13,
              fontWeight: 700,
              borderRadius: 8,
              height: 38,
            }}
            onClick={() => setViewMode((prev) => (prev === "history" ? "current" : "history"))}
          >
            <Icon name="requests" size={15} />
            <span>
              {viewMode === "history" ? "← Active Agreements" : `History (${agreements.length})`}
            </span>
          </button>
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
