import React, { useState, useMemo } from "react";
import Icon from "../../../components/Icon";
import { agreementStatusBadgeColors, AGREEMENT_TYPES } from "../mockAgreementData";

export default function AgreementHistoryView({
  agreements = [],
  onReview,
  onBackToCurrent,
}) {
  const [filterType, setFilterType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHistory = useMemo(() => {
    return agreements.filter((agr) => {
      const matchesType = filterType === "All" || agr.agreementType === filterType;
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        agr.clientName.toLowerCase().includes(q) ||
        agr.companyName.toLowerCase().includes(q) ||
        agr.id.toLowerCase().includes(q) ||
        agr.appId.toLowerCase().includes(q) ||
        (agr.scheme && agr.scheme.toLowerCase().includes(q)) ||
        (agr.email && agr.email.toLowerCase().includes(q));

      return matchesType && matchesSearch;
    });
  }, [agreements, filterType, searchTerm]);

  return (
    <div style={{ display: "grid", gap: 20 }}>
      {/* Top Filter and Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          background: "#ffffff",
          padding: "14px 18px",
          borderRadius: 14,
          border: "1px solid #e7e7f5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#64748b" }}>Filter:</span>
          {["All", AGREEMENT_TYPES.SCHEME, AGREEMENT_TYPES.PRIVATE_FUNDING].map((type) => (
            <button
              key={type}
              type="button"
              className="table-action"
              style={{
                fontSize: 12,
                padding: "5px 12px",
                borderRadius: 8,
                background: filterType === type ? "#4f46e5" : "#ffffff",
                color: filterType === type ? "#ffffff" : "#475569",
                borderColor: filterType === type ? "#4f46e5" : "#dcdfe6",
                fontWeight: filterType === type ? 700 : 500,
              }}
              onClick={() => setFilterType(type)}
            >
              {type} ({type === "All" ? agreements.length : agreements.filter((a) => a.agreementType === type).length})
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input
            type="text"
            placeholder="Search agreement history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "7px 12px",
              borderRadius: 8,
              border: "1px solid #dcdfe6",
              fontSize: 13,
              width: 220,
              outline: "none",
            }}
          />
          {onBackToCurrent && (
            <button
              type="button"
              className="table-action"
              style={{ fontSize: 12, padding: "7px 14px", fontWeight: 700 }}
              onClick={onBackToCurrent}
            >
              ← Active Records
            </button>
          )}
        </div>
      </div>

      {/* History Table */}
      <div style={{ background: "#ffffff", borderRadius: 16, border: "1px solid #e7e7f5", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="clients-table" style={{ minWidth: 900, margin: 0 }}>
            <thead>
              <tr>
                <th>Agreement ID</th>
                <th>Client &amp; Company</th>
                <th>Type &amp; Scheme</th>
                <th>Created Date</th>
                <th>Sent Date &amp; Recipient</th>
                <th>Lifecycle Status</th>
                <th style={{ textAlign: "right" }}>Document View</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((agr) => {
                const isScheme = agr.agreementType === AGREEMENT_TYPES.SCHEME;
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
                          padding: "2px 8px",
                          borderRadius: 999,
                          fontSize: 11,
                          fontWeight: 750,
                          background: isScheme ? "rgba(99, 102, 241, 0.12)" : "rgba(236, 72, 153, 0.12)",
                          color: isScheme ? "#4338ca" : "#be185d",
                          marginRight: 6,
                        }}
                      >
                        {agr.agreementType}
                      </span>
                      <strong style={{ fontSize: 12.5, color: isScheme ? "#4f46e5" : "#db2777" }}>
                        {agr.scheme}
                      </strong>
                    </td>
                    <td>
                      <span style={{ fontSize: 12.5, fontWeight: 600 }}>{agr.createdAt}</span>
                    </td>
                    <td>
                      {agr.sentAt ? (
                        <div>
                          <strong style={{ fontSize: 12, color: "#059669" }}>{agr.sentAt}</strong>
                          <div style={{ fontSize: 11, color: "#7a748e" }}>To: {agr.sentTo || agr.email}</div>
                        </div>
                      ) : (
                        <span style={{ fontSize: 12, color: "#94a3b8" }}>— Not sent yet —</span>
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
                        }}
                        onClick={() => onReview(agr)}
                        title={`Review legal agreement for ${agr.companyName}`}
                      >
                        <Icon name="eye" size={13} />
                        <span>Review</span>
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredHistory.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "36px 16px", color: "#7a748e" }}>
                    No agreement records found matching your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
