import React from "react";
import Icon from "../../../components/Icon";
import {
  agreementStatusBadgeColors,
  AGREEMENT_STATUSES,
  TEMPLATE_TYPES,
  getTemplateTypeForService,
  normalizeAgreementData,
} from "../../../services/agreementService";

export default function CurrentAgreementsTable({
  clients = [],
  agreements = [],
  onViewDetails,
  onCreateAgreement,
  onReviewAgreement,
  onSendAgreement,
  onRetryAgreement,
}) {
  // Map of clientId / appId to normalized agreement record
  const agreementMap = new Map();
  agreements.forEach((agr) => {
    const normalized = normalizeAgreementData(agr);
    if (normalized.clientId) agreementMap.set(normalized.clientId, normalized);
    if (normalized.crmId) agreementMap.set(normalized.crmId, normalized);
    if (normalized.applicationId) agreementMap.set(normalized.applicationId, normalized);
    if (normalized.appId) agreementMap.set(normalized.appId, normalized);
  });

  return (
    <div style={{ background: "#ffffff", borderRadius: 16, border: "1px solid #e7e7f5", overflow: "hidden" }}>
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid #eef2f6",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: 16, color: "#1e293b" }}>Agreement Records &amp; Queue</h3>
          <p style={{ margin: "3px 0 0", color: "#7a748e", fontSize: 12.5 }}>
            Client agreement generation, backend-ready review, and client dispatch.
          </p>
        </div>
        <span
          style={{
            fontSize: 12,
            fontWeight: 800,
            padding: "4px 12px",
            borderRadius: 999,
            background: "rgba(79, 70, 229, 0.12)",
            color: "#4338ca",
            border: "1px solid #c7d2fe",
          }}
        >
          {clients.length} Clients
        </span>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="clients-table" style={{ minWidth: 860, margin: 0 }}>
          <thead>
            <tr>
              <th>Client</th>
              <th>Company</th>
              <th>Service / Scheme</th>
              <th>Agreement Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => {
              const agreement =
                agreementMap.get(client.id) ||
                agreementMap.get(client.appId) ||
                agreementMap.get(String(client.id)) ||
                null;
              const hasAgreement = Boolean(agreement);
              const status = agreement ? agreement.agreement?.status || agreement.status : AGREEMENT_STATUSES.PENDING;
              const isSent = status === AGREEMENT_STATUSES.SENT;
              const isGenerating = status === AGREEMENT_STATUSES.GENERATING;
              const isFailed = status === AGREEMENT_STATUSES.FAILED;
              const statusStyle = agreementStatusBadgeColors[status] || agreementStatusBadgeColors.Pending;

              const serviceName = client.scheme || client.serviceName || "PMEGP";
              const isPrivate = getTemplateTypeForService(serviceName) === TEMPLATE_TYPES.PRIVATE_FUNDING;

              return (
                <tr key={client.id || client.appId}>
                  <td>
                    <strong>{client.name}</strong>
                    <div style={{ fontSize: 11.5, color: "#7a748e" }}>
                      ID: <code>{client.appId}</code>
                    </div>
                  </td>
                  <td>
                    <strong>{client.company || "—"}</strong>
                    <div style={{ fontSize: 11.5, color: "#7a748e" }}>{client.email}</div>
                  </td>
                  <td>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "3px 9px",
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 750,
                        background: isPrivate ? "rgba(236, 72, 153, 0.12)" : "rgba(79, 70, 229, 0.12)",
                        color: isPrivate ? "#be185d" : "#4338ca",
                        border: `1px solid ${isPrivate ? "#fbcfe8" : "#c7d2fe"}`,
                      }}
                    >
                      {serviceName}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "3px 10px",
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 750,
                        background: statusStyle.bg,
                        color: statusStyle.color,
                        border: `1px solid ${statusStyle.border}`,
                      }}
                    >
                      ● {status}
                    </span>
                  </td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    {!hasAgreement ? (
                      /* ── BEFORE CREATION: [ View Details ] [ Create Agreement ] ── */
                      <div style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
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
                          }}
                          onClick={() => onViewDetails(client)}
                          title={`View CRM and service details for ${client.name}`}
                        >
                          <Icon name="eye" size={13} />
                          <span>View Details</span>
                        </button>

                        <button
                          type="button"
                          className="primary-button"
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
                            margin: 0,
                            boxSizing: "border-box",
                            background: "#4f46e5",
                          }}
                          onClick={() => onCreateAgreement(client)}
                          title={`Generate agreement for ${client.company || client.name}`}
                        >
                          <Icon name="plus" size={13} />
                          <span>Create Agreement</span>
                        </button>
                      </div>
                    ) : isGenerating ? (
                      /* ── GENERATING STATE ── */
                      <div style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            fontSize: 12,
                            color: "#2563eb",
                            fontWeight: 600,
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              width: 12,
                              height: 12,
                              border: "2px solid #93c5fd",
                              borderTopColor: "#2563eb",
                              borderRadius: "50%",
                              animation: "spin 0.8s linear infinite",
                            }}
                          />
                          Generating Agreement...
                        </span>
                      </div>
                    ) : isFailed ? (
                      /* ── FAILED STATE: [ Retry ] ── */
                      <div style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                        <button
                          type="button"
                          className="primary-button"
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
                            background: "#ef4444",
                          }}
                          onClick={() => onRetryAgreement && onRetryAgreement(agreement)}
                        >
                          <span>Retry</span>
                        </button>
                      </div>
                    ) : (
                      /* ── READY OR SENT: [ Review ] [ Send ] ── */
                      <div style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                        <button
                          type="button"
                          className="table-action"
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
                            margin: 0,
                            boxSizing: "border-box",
                          }}
                          onClick={() => onReviewAgreement(agreement)}
                          title={`Review agreement document for ${agreement.client?.companyName || agreement.companyName}`}
                        >
                          <Icon name="eye" size={13} />
                          <span>Review</span>
                        </button>

                        <button
                          type="button"
                          className={isSent ? "table-action" : "primary-button"}
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
                            margin: 0,
                            boxSizing: "border-box",
                            background: isSent ? "rgba(16, 185, 129, 0.1)" : undefined,
                            color: isSent ? "#059669" : undefined,
                            borderColor: isSent ? "#a7f3d0" : undefined,
                            cursor: isSent ? "default" : "pointer",
                          }}
                          disabled={isSent}
                          onClick={() => {
                            if (!isSent) onSendAgreement(agreement);
                          }}
                          title={
                            isSent
                              ? `Agreement already sent to ${agreement.sentTo || client.email}`
                              : `Send agreement to ${client.email}`
                          }
                        >
                          {isSent ? (
                            <>
                              <Icon name="check" size={13} />
                              <span>Sent ✓</span>
                            </>
                          ) : (
                            <>
                              <Icon name="mail" size={13} />
                              <span>Send</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}

            {clients.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "40px 16px", color: "#7a748e" }}>
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
