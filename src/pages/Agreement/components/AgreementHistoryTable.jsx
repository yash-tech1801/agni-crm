import React from "react";
import Icon from "../../../components/Icon";
import {
  agreementStatusBadgeColors,
  TEMPLATE_TYPES,
  TEMPLATE_NAMES,
  normalizeAgreementData,
} from "../../../services/agreementService";

export default function AgreementHistoryTable({
  agreements = [],
  onReview,
}) {
  const normalizedList = agreements.map(normalizeAgreementData);

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
          <h3 style={{ margin: 0, fontSize: 16, color: "#1e293b" }}>Generated Agreement Records (History)</h3>
          <p style={{ margin: "3px 0 0", color: "#7a748e", fontSize: 12.5 }}>
            Read-only archive of all generated and dispatched scheme and private funding contracts.
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
          {normalizedList.length} Records
        </span>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="clients-table" style={{ minWidth: 860, margin: 0 }}>
          <thead>
            <tr>
              <th>Agreement ID</th>
              <th>Client &amp; Company</th>
              <th>Service / Scheme</th>
              <th>Template Used</th>
              <th>Date</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {normalizedList.map((agr) => {
              const isPrivate = agr.scheme?.type === TEMPLATE_TYPES.PRIVATE_FUNDING;
              const statusStyle =
                agreementStatusBadgeColors[agr.agreement?.status] || agreementStatusBadgeColors.Ready;
              const templateTitle =
                agr.agreement?.templateName ||
                (isPrivate ? TEMPLATE_NAMES.PRIVATE_FUNDING : TEMPLATE_NAMES.SCHEME);

              return (
                <tr key={agr.id}>
                  <td>
                    <strong>{agr.id}</strong>
                    <div style={{ fontSize: 11, color: "#7a748e" }}>Ref: {agr.applicationId}</div>
                  </td>
                  <td>
                    <strong>{agr.client?.clientName}</strong>
                    <div style={{ fontSize: 11.5, color: "#7a748e" }}>{agr.client?.companyName}</div>
                  </td>
                  <td>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "3px 9px",
                        borderRadius: 999,
                        fontSize: 11.5,
                        fontWeight: 750,
                        background: isPrivate ? "rgba(236, 72, 153, 0.12)" : "rgba(79, 70, 229, 0.12)",
                        color: isPrivate ? "#db2777" : "#4f46e5",
                        border: `1px solid ${isPrivate ? "#fbcfe8" : "#c7d2fe"}`,
                      }}
                    >
                      {agr.scheme?.name}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: 12, color: "#475569" }}>
                      📄 {templateTitle}
                    </span>
                  </td>
                  <td>
                    <strong style={{ fontSize: 12.5 }}>{agr.agreement?.date || agr.createdAt}</strong>
                    {agr.sentAt && (
                      <div style={{ fontSize: 11, color: "#059669" }}>
                        Sent: {agr.sentAt}
                      </div>
                    )}
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
                      ● {agr.agreement?.status}
                    </span>
                  </td>
                  {/* Actions column: Review ONLY */}
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <button
                      type="button"
                      className="table-action"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 5,
                        height: 32,
                        padding: "0 14px",
                        fontSize: 12,
                        fontWeight: 700,
                        borderRadius: 8,
                        margin: 0,
                        boxSizing: "border-box",
                      }}
                      onClick={() => onReview(agr)}
                      title={`Review agreement document for ${agr.client?.companyName}`}
                    >
                      <Icon name="eye" size={13} />
                      <span>Review</span>
                    </button>
                  </td>
                </tr>
              );
            })}

            {normalizedList.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "40px 16px", color: "#7a748e" }}>
                  No agreement records in history yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
