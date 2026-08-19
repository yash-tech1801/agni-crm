import React, { useMemo, useState } from "react";
import RequestTable from "./RequestTable";
import RequestHistory from "./RequestHistory";
import CreateRequestModal from "./CreateRequestModal";
import RequestDetailsModal from "./RequestDetailsModal";
import Icon from "../../components/Icon";
import { mockRequests } from "./mockRequests";
import { mockClients } from "./mockClients";

const TABS = [
  { id: "Pending Requests", label: "Pending Requests", icon: "clock" },
  { id: "Request History", label: "Request History", icon: "history" },
];

export default function SalesRequests() {
  const [activeTab, setActiveTab] = useState("Pending Requests");
  const [requests, setRequests] = useState(mockRequests);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [notification, setNotification] = useState("");

  const pendingRequests = useMemo(
    () => requests.filter((request) => request.status === "Pending"),
    [requests]
  );

  const historyRequests = useMemo(
    () => requests.filter((request) => request.status !== "Pending"),
    [requests]
  );

  const stats = useMemo(() => {
    const total = requests.length;
    const pending = pendingRequests.length;
    const approved = requests.filter((r) => r.status === "Approved").length;
    const cancelled = requests.filter((r) => r.status === "Cancelled" || r.status === "Rejected").length;
    return { total, pending, approved, cancelled };
  }, [requests, pendingRequests]);

  const addRequest = (newRequest) => {
    setRequests((prev) => [newRequest, ...prev]);
    setNotification(
      newRequest.requestType === "Edit Client"
        ? `✓ Edit request for "${newRequest.clientName}" (${newRequest.id}) submitted successfully!`
        : `✓ Deletion request for "${newRequest.clientName}" (${newRequest.id}) submitted successfully!`
    );
    setTimeout(() => setNotification(""), 4500);
  };

  const cancelPendingRequest = (requestId) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: "Cancelled",
              decisionDate: new Date().toISOString().split("T")[0],
              managerRemarks: "Cancelled by salesperson.",
            }
          : request
      )
    );
    setNotification(`Request ${requestId} has been cancelled.`);
    setTimeout(() => setNotification(""), 3500);
  };

  return (
    <section className="sales-page-view">
      {/* Header section */}
      <div className="sales-header-banner">
        <div className="sales-header-info">
          <p className="sales-header-eyebrow">
            Workflow & Approvals
          </p>
          <h1 className="sales-header-title">
            My Requests
          </h1>
          <p className="sales-header-subtitle">
            Track client profile edits and account deletion requests submitted for manager authorization.
          </p>
        </div>

        <button
          type="button"
          className="sales-add-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>
          <span>Create Request</span>
        </button>
      </div>

      {/* KPI Stats Ribbon */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 14,
          marginBottom: 20,
        }}
      >
        <div className="analytics-card" style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(140, 95, 248, 0.12)", color: "#8c5ff8", display: "grid", placeItems: "center", fontWeight: 700 }}>
            {stats.total}
          </div>
          <div>
            <span style={{ fontSize: 11.5, color: "#7a748e", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>Total Requests</span>
            <strong style={{ display: "block", fontSize: 16 }}>{stats.total}</strong>
          </div>
        </div>

        <div className="analytics-card" style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(245, 158, 11, 0.14)", color: "#f59e0b", display: "grid", placeItems: "center", fontWeight: 700 }}>
            {stats.pending}
          </div>
          <div>
            <span style={{ fontSize: 11.5, color: "#7a748e", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>Pending Approval</span>
            <strong style={{ display: "block", fontSize: 16, color: "#f59e0b" }}>{stats.pending}</strong>
          </div>
        </div>

        <div className="analytics-card" style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(16, 185, 129, 0.14)", color: "#10b981", display: "grid", placeItems: "center", fontWeight: 700 }}>
            {stats.approved}
          </div>
          <div>
            <span style={{ fontSize: 11.5, color: "#7a748e", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>Approved</span>
            <strong style={{ display: "block", fontSize: 16, color: "#10b981" }}>{stats.approved}</strong>
          </div>
        </div>

        <div className="analytics-card" style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(100, 116, 139, 0.14)", color: "#64748b", display: "grid", placeItems: "center", fontWeight: 700 }}>
            {stats.cancelled}
          </div>
          <div>
            <span style={{ fontSize: 11.5, color: "#7a748e", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>Closed / Cancelled</span>
            <strong style={{ display: "block", fontSize: 16, color: "#64748b" }}>{stats.cancelled}</strong>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: 4,
          borderRadius: 12,
          background: "rgba(140, 95, 248, 0.08)",
          border: "1px solid rgba(140, 95, 248, 0.14)",
          marginBottom: 18,
        }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const count = tab.id === "Pending Requests" ? pendingRequests.length : historyRequests.length;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 18px",
                borderRadius: 9,
                border: "none",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: isActive ? "linear-gradient(135deg, #8c5ff8 0%, #6d3bf5 100%)" : "transparent",
                color: isActive ? "#ffffff" : "#7a748e",
                boxShadow: isActive ? "0 4px 12px rgba(109, 59, 245, 0.3)" : "none",
              }}
            >
              <span>{tab.label}</span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 18,
                  height: 18,
                  padding: "0 6px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 700,
                  background: isActive ? "rgba(255, 255, 255, 0.25)" : "rgba(140, 95, 248, 0.12)",
                  color: isActive ? "#ffffff" : "#8c5ff8",
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {notification && (
        <div
          style={{
            marginBottom: 18,
            padding: "12px 18px",
            borderRadius: 12,
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 100%)",
            color: "#059669",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            fontWeight: 600,
            fontSize: 13,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            animation: "fadeIn 0.2s ease",
          }}
        >
          <span>{notification}</span>
          <button
            type="button"
            onClick={() => setNotification("")}
            style={{ background: "transparent", border: "none", color: "#059669", cursor: "pointer", fontSize: 14 }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Table Card Container */}
      <div className="analytics-card" style={{ padding: 0, overflow: "hidden" }}>
        {activeTab === "Pending Requests" ? (
          <RequestTable requests={pendingRequests} onView={setSelectedRequest} onCancel={cancelPendingRequest} />
        ) : (
          <RequestHistory requests={historyRequests} onView={setSelectedRequest} />
        )}
      </div>

      {showCreateModal && (
        <CreateRequestModal
          clients={mockClients}
          onClose={() => setShowCreateModal(false)}
          onSubmit={addRequest}
        />
      )}

      {selectedRequest && (
        <RequestDetailsModal request={selectedRequest} onClose={() => setSelectedRequest(null)} />
      )}
    </section>
  );
}

