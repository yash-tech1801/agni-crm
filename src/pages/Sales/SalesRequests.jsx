import React, { useMemo, useState } from "react";
import RequestTable from "./RequestTable";
import RequestHistory from "./RequestHistory";
import CreateRequestModal from "./CreateRequestModal";
import RequestDetailsModal from "./RequestDetailsModal";
import { mockRequests } from "./mockRequests";
import { mockClients } from "./mockClients";

const TABS = ["Pending Requests", "Request History"];

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

  const addRequest = (newRequest) => {
    setRequests((prev) => [newRequest, ...prev]);
    setNotification(newRequest.requestType === "Edit Client"
      ? "Your edit request has been submitted successfully and is awaiting manager approval."
      : "Your delete request has been submitted successfully and is awaiting manager approval.");
    setTimeout(() => setNotification(""), 4200);
  };

  const cancelPendingRequest = (requestId) => {
    setRequests((prev) => prev.map((request) => (
      request.id === requestId
        ? { ...request, status: "Cancelled", decisionDate: new Date().toISOString().split("T")[0], managerRemarks: "Cancelled by salesperson." }
        : request
    )));
  };

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
        <div>
          <p className="dashboard-eyebrow">Requests</p>
          <h1>My Requests</h1>
        </div>
        <button type="button" className="primary-button" onClick={() => setShowCreateModal(true)}>
          + Create Request
        </button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className="table-action"
            style={{
              background: activeTab === tab ? "#4e7cff" : "#fff",
              color: activeTab === tab ? "#fff" : "#1d2330",
              border: activeTab === tab ? "1px solid #4e7cff" : "1px solid #e7e7f5",
              minWidth: 170,
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {notification ? (
        <div style={{ marginBottom: 18, padding: 16, borderRadius: 16, background: "#e7f6ff", color: "#175f8f", border: "1px solid #c7e5f7" }}>
          {notification}
        </div>
      ) : null}

      {activeTab === "Pending Requests" ? (
        <RequestTable requests={pendingRequests} onView={setSelectedRequest} onCancel={cancelPendingRequest} />
      ) : (
        <RequestHistory requests={historyRequests} onView={setSelectedRequest} />
      )}

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
