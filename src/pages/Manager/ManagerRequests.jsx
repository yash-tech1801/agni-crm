import React, { useMemo, useState } from "react";
import Icon from "../../components/Icon";
import RequestTable from "./RequestTable";
import RequestHistory from "./RequestHistory";
import RequestModal from "./RequestModal";
import { mockRequests } from "./mockRequests";
import ManagerCreateRequestModal from "./ManagerCreateRequestModal";

export default function ManagerRequests({ branchTeamNames = [], managedRegion = "East Zone", branchTeam = [] }) {
  const [activeTab, setActiveTab] = useState("Pending");
  const [requests, setRequests] = useState(mockRequests);
  const [myRequests, setMyRequests] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [notification, setNotification] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const branchRequests = useMemo(
    () => requests.filter((request) => branchTeamNames.includes(request.salesPerson)),
    [requests, branchTeamNames]
  );

  const pendingRequests = useMemo(
    () => branchRequests.filter((request) => request.status === "Pending"),
    [branchRequests]
  );

  const historyRequests = useMemo(
    () => branchRequests,
    [branchRequests]
  );

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
  };

  const updateStatus = (requestId, nextStatus) => {
    const now = new Date().toISOString().split("T")[0];
    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: nextStatus,
              decisionDate: now,
              approvedAt: now,
              approvedBy: "Manager",
            }
          : request
      )
    );
    setSelectedRequest((current) =>
      current && current.id === requestId
        ? { ...current, status: nextStatus, decisionDate: now, approvedAt: now, approvedBy: "Manager" }
        : current
    );
  };

  const handleApprove = (requestId) => updateStatus(requestId, "Approved");
  const handleReject = (requestId) => updateStatus(requestId, "Rejected");

  return (
    <section className="manager-page-view">
      {/* Header Banner */}
      <div className="manager-header-banner">
        <div className="manager-header-info">
          <p className="manager-header-eyebrow">Approvals & Workflow</p>
          <h1 className="manager-header-title">Client Change Requests</h1>
          <p className="manager-header-subtitle">
            Review sales team modification requests, handle client deletion petitions, and track approval histories.
          </p>
        </div>
        <button
          type="button"
          className="manager-btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          <Icon name="plus" size={15} />
          <span>Create Request</span>
        </button>
      </div>

      {/* Segmented Tabs Strip */}
      <div className="manager-tabs-strip">
        <button
          type="button"
          className={`manager-tab-btn ${activeTab === "Pending" ? "active" : ""}`}
          onClick={() => setActiveTab("Pending")}
        >
          <Icon name="clock" size={15} />
          <span>My Requests</span>
          <span className="manager-tab-count">{myRequests.length}</span>
        </button>

        <button
          type="button"
          className={`manager-tab-btn ${activeTab === "Review" ? "active" : ""}`}
          onClick={() => setActiveTab("Review")}
        >
          <Icon name="alert" size={15} />
          <span>Pending Team Review</span>
          <span className="manager-tab-count">{pendingRequests.length}</span>
        </button>

        <button
          type="button"
          className={`manager-tab-btn ${activeTab === "History" ? "active" : ""}`}
          onClick={() => setActiveTab("History")}
        >
          <Icon name="history" size={15} />
          <span>Decision History</span>
          <span className="manager-tab-count">{historyRequests.length}</span>
        </button>
      </div>

      {notification && (
        <div className="manager-alert-banner">
          <Icon name="checkCircle" size={16} />
          <span>{notification}</span>
        </div>
      )}

      {activeTab === "Pending" ? (
        <div>
          {myRequests.length > 0 ? (
            <RequestTable requests={myRequests} onView={handleViewRequest} />
          ) : (
            <div className="analytics-card manager-empty-state">
              <Icon name="document" size={32} style={{ margin: "0 auto 12px", opacity: 0.5, display: "block" }} />
              <strong>No pending manager requests created yet.</strong>
              <p style={{ margin: "6px 0 0", color: "#7a748e", fontSize: 13 }}>
                Click "+ Create Request" at the top right to submit a new account transfer or client update request.
              </p>
            </div>
          )}
        </div>
      ) : activeTab === "Review" ? (
        <div>
          <RequestTable requests={pendingRequests} onView={handleViewRequest} />
        </div>
      ) : (
        <div>
          <RequestHistory
            receivedRequests={historyRequests}
            sentRequests={myRequests}
            onView={handleViewRequest}
          />
        </div>
      )}

      {selectedRequest && (
        <RequestModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onApprove={handleApprove}
          onReject={handleReject}
          readOnly={activeTab === "History" || activeTab === "Pending"}
        />
      )}

      {showCreateModal && (
        <ManagerCreateRequestModal
          salesPeople={branchTeam}
          onClose={() => setShowCreateModal(false)}
          onSubmit={(newReq) => {
            setMyRequests([newReq, ...myRequests]);
            setNotification("Your request has been submitted successfully.");
            setTimeout(() => setNotification(""), 4200);
          }}
        />
      )}
    </section>
  );
}
