import React from "react";
import Icon from "../../../components/Icon";
import { agreementStatusBadgeColors, AGREEMENT_TYPES, AGREEMENT_STATUSES } from "../mockAgreementData";

export default function AgreementTable({
  agreements = [],
  onReview,
  onSend,
  onCreateClick,
}) {
  return (
    <div style={{ background: "#ffffff", borderRadius: 16, border: "1px solid #e7e7f5", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table className="clients-table" style={{ minWidth: 860, margin: 0 }}>
          <thead>
            <tr>
              <th>Agreement ID</th>
              <th>Client &amp; Company</th>
              <th>Agreement Type</th>
              <th>Assigned Scheme</th>
              <th>Created Date</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {agreements.map((agr) => {
              const isScheme = agr.agreementType === AGREEMENT_TYPES.SCHEME;
              const isSent = agr.status === AGREEMENT_STATUSES.SENT;
              const statusStyle = agreementStatusBadgeColors[agr.status] || agreementStatusBadgeColors.Ready;

              return (
                <tr key={agr.id}>
                  <td>
                    <strong>{agr.id}</strong>
                    <div style={{ fontSize: 11, color: "#7a748e" }}>Ref: {agr.appId}</div>
                  </td>
                  <td>
                    <strong>{agr.clientName}</strong>
                    <div style={{ fontSize: 12, color: "#7a748e" }}>{agr.companyName}</div>
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
                        background: isScheme ? "rgba(99, 102, 241, 0.12)" : "rgba(236, 72, 153, 0.12)",
                        color: isScheme ? "#4338ca" : "#be185d",
                        border: `1px solid ${isScheme ? "#c7d2fe" : "#fbcfe8"}`,
                      }}
                    >
                      {agr.agreementType}
                    </span>
                  </td>
                  <td>
                    <strong style={{ fontSize: 13, color: isScheme ? "#4f46e5" : "#db2777" }}>
                      {agr.scheme}
                    </strong>
                    <div style={{ fontSize: 11.5, color: "#7a748e" }}>
                      ₹{(agr.commercialValue || 0).toLocaleString("en-IN")}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: 12.5, fontWeight: 600 }}>{agr.createdAt}</span>
                    {agr.sentAt && (
                      <div style={{ fontSize: 11, color: "#059669" }}>
                        Sent: {agr.sentAt.split(" ")[0]}
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
                      ● {agr.status}
                    </span>
                  </td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <div style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                      {/* Review Action */}
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
                        onClick={() => onReview(agr)}
                        title={`Review complete agreement document for ${agr.companyName}`}
                      >
                        <Icon name="eye" size={13} />
                        <span>Review</span>
                      </button>

                      {/* Send Action */}
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
                          if (!isSent) onSend(agr);
                        }}
                        title={isSent ? `Agreement already sent to ${agr.email}` : `Send agreement to ${agr.email}`}
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
                  </td>
                </tr>
              );
            })}

            {agreements.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "48px 16px" }}>
                  <div style={{ maxWidth: 360, margin: "0 auto" }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: "#f1f5f9",
                        color: "#64748b",
                        display: "grid",
                        placeItems: "center",
                        margin: "0 auto 12px",
                      }}
                    >
                      <Icon name="document" size={24} />
                    </div>
                    <strong style={{ fontSize: 16, color: "#1e293b", display: "block", marginBottom: 4 }}>
                      No Agreements Found
                    </strong>
                    <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 16px" }}>
                      Create your first Scheme or Private Funding agreement for an existing client.
                    </p>
                    {onCreateClick && (
                      <button
                        type="button"
                        className="primary-button"
                        style={{ padding: "8px 20px" }}
                        onClick={onCreateClick}
                      >
                        Create Agreement
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
