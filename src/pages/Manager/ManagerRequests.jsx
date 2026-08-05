import React, { useMemo, useState } from "react";
import RequestTable from "./RequestTable";
import RequestHistory from "./RequestHistory";
import RequestModal from "./RequestModal";
import { mockRequests } from "./mockRequests";

export default function ManagerRequests({ branchTeamNames, managedRegion }) {
  const [activeTab, setActiveTab] = useState("Pending");
  const [requests, setRequests] = useState(mockRequests);
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
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
        {['Pending', 'History'].map((tab) => (
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
            {tab === 'Pending' ? 'Pending Requests' : 'Request History'}
          </button>
        ))}
      </div>

      {activeTab === 'Pending' ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
            <div>
              <p className="eyebrow">Pending requests</p>
              <p style={{ margin: 0, color: '#6b6b77', fontSize: 13 }}>
                {pendingRequests.length} pending requests from your sales team in {managedRegion}.
              </p>
            </div>
          </div>
          <RequestTable requests={pendingRequests} onView={handleViewRequest} />
        </div>
      ) : (
        <div>
          <RequestHistory requests={historyRequests} onView={handleViewRequest} />
        </div>
      )}

      {selectedRequest && (
        <RequestModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onApprove={handleApprove}
          onReject={handleReject}
          readOnly={activeTab === 'History'}
        />
      )}
    </section>
  );
}
