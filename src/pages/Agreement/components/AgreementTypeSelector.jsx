import React from "react";
import Modal from "../../../components/Modal";
import Icon from "../../../components/Icon";
import { AGREEMENT_TYPES } from "../mockAgreementData";

export default function AgreementTypeSelector({ isOpen, onClose, onSelectType }) {
  if (!isOpen) return null;

  return (
    <Modal title="Choose Agreement Type" onClose={onClose} closeLabel="Cancel">
      <div style={{ padding: "8px 0", maxWidth: 540 }}>
        <p style={{ margin: "0 0 20px", color: "#64748b", fontSize: 13.5 }}>
          Select the category of legal engagement agreement to generate for an existing CRM client.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* Scheme Agreement Card */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => onSelectType(AGREEMENT_TYPES.SCHEME)}
            style={{
              padding: 20,
              borderRadius: 14,
              border: "2px solid #e0e7ff",
              background: "linear-gradient(180deg, #f8faff 0%, #ffffff 100%)",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 12,
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 2px 8px rgba(99, 102, 241, 0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#6366f1";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(99, 102, 241, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e0e7ff";
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(99, 102, 241, 0.05)";
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "rgba(99, 102, 241, 0.12)",
                color: "#4f46e5",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Icon name="document" size={22} />
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <strong style={{ fontSize: 16, color: "#1e293b" }}>Scheme</strong>
                <span
                  style={{
                    fontSize: 10.5,
                    fontWeight: 800,
                    padding: "2px 6px",
                    borderRadius: 4,
                    background: "#e0e7ff",
                    color: "#4338ca",
                  }}
                >
                  Govt &amp; Grants
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 12.5, color: "#64748b", lineHeight: 1.45 }}>
                PMEGP, PM MUDRA, CGTMSE, CSR, Grants, and Subsidized Capital representation agreements.
              </p>
            </div>

            <button
              type="button"
              className="primary-button"
              style={{
                width: "100%",
                height: 36,
                fontSize: 12.5,
                fontWeight: 700,
                marginTop: 6,
                background: "#4f46e5",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectType(AGREEMENT_TYPES.SCHEME);
              }}
            >
              Create Scheme Agreement →
            </button>
          </div>

          {/* Private Funding Agreement Card */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => onSelectType(AGREEMENT_TYPES.PRIVATE_FUNDING)}
            style={{
              padding: 20,
              borderRadius: 14,
              border: "2px solid #fce7f3",
              background: "linear-gradient(180deg, #fffafc 0%, #ffffff 100%)",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 12,
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 2px 8px rgba(236, 72, 153, 0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ec4899";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(236, 72, 153, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#fce7f3";
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(236, 72, 153, 0.05)";
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "rgba(236, 72, 153, 0.12)",
                color: "#db2777",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Icon name="revenue" size={22} />
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <strong style={{ fontSize: 16, color: "#1e293b" }}>Private Funding</strong>
                <span
                  style={{
                    fontSize: 10.5,
                    fontWeight: 800,
                    padding: "2px 6px",
                    borderRadius: 4,
                    background: "#fce7f3",
                    color: "#be185d",
                  }}
                >
                  Equity &amp; Debt
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 12.5, color: "#64748b", lineHeight: 1.45 }}>
                Angel syndication, Series Seed, Convertible Notes, and Private Equity investment advisory.
              </p>
            </div>

            <button
              type="button"
              className="primary-button"
              style={{
                width: "100%",
                height: 36,
                fontSize: 12.5,
                fontWeight: 700,
                marginTop: 6,
                background: "#db2777",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectType(AGREEMENT_TYPES.PRIVATE_FUNDING);
              }}
            >
              Create Private Funding Agreement →
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
