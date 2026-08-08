import React, { useMemo, useState } from "react";
import RequestTable from "./RequestTable";
import RequestHistory from "./RequestHistory";
import RequestModal from "./RequestModal";
import { mockRequests } from "./mockRequests";
import ManagerCreateRequestModal from "./ManagerCreateRequestModal";
import { mockClients } from "../Sales/mockClients";

export default function ManagerRequests({ branchTeamNames, managedRegion, branchTeam }) {
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
    const now = new Date().toISOString().split('T')[0];
    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: nextStatus,
              decisionDate: now,
              approvedAt: now,
              approvedBy: 'Manager',
            }
          : request
      )
    );
    setSelectedRequest((current) =>
      current && current.id === requestId ? { ...current, status: nextStatus, decisionDate: now, approvedAt: now, approvedBy: 'Manager' } : current
    );
  };

  const handleApprove = (requestId) => updateStatus(requestId, 'Approved');
  const handleReject = (requestId) => updateStatus(requestId, 'Rejected');

  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <div>
          <p className="dashboard-eyebrow">Client Requests</p>
          <h1 style={{ margin: 0 }}>Client Requests</h1>
          <p className="dashboard-copy" style={{ maxWidth: 640, marginTop: 8 }}>
            Review pending requests from your sales team and track historical decisions for completed requests.
          </p>
        </div>
        <button type="button" className="primary-button" onClick={() => setShowCreateModal(true)}>
          + Create Request
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
        {['Pending', 'Review', 'History'].map((tab) => (
          <button
            key={tab}
            type="button"
            className="table-action"
            style={{
              background: activeTab === tab ? '#4e7cff' : '#fff',
              color: activeTab === tab ? '#fff' : '#1b1b23',
              border: activeTab === tab ? '1px solid #4e7cff' : '1px solid #e7e7f5',
              minWidth: 160,
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'Pending' ? 'Pending Requests' : tab === 'Review' ? 'Review Request' : 'Request History'}
          </button>
        ))}
      </div>

      {notification ? (
        <div style={{ marginBottom: 18, padding: 16, borderRadius: 16, background: "#e7f6ff", color: "#175f8f", border: "1px solid #c7e5f7" }}>
          {notification}
        </div>
      ) : null}

      {activeTab === 'Pending' ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
            <div>
              <p className="eyebrow">Pending requests</p>
              <p style={{ margin: 0, color: '#6b6b77', fontSize: 13 }}>
                {myRequests.length === 0 ? "No pending requests." : `${myRequests.length} pending requests created by you.`}
              </p>
            </div>
          </div>
          {myRequests.length > 0 && <RequestTable requests={myRequests} onView={handleViewRequest} />}
        </div>
      ) : activeTab === 'Review' ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
            <div>
              <p className="eyebrow">Review requests</p>
              <p style={{ margin: 0, color: '#6b6b77', fontSize: 13 }}>
                {pendingRequests.length} requests to review from your sales team in {managedRegion}.
              </p>
            </div>
          </div>
          <RequestTable requests={pendingRequests} onView={handleViewRequest} />
        </div>
      ) : (
        <div>
          <RequestHistory receivedRequests={historyRequests} sentRequests={myRequests} onView={handleViewRequest} />
        </div>
      )}

      {selectedRequest && (
        <RequestModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onApprove={handleApprove}
          onReject={handleReject}
          readOnly={activeTab === 'History' || activeTab === 'Pending'}
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
