import React, { useMemo, useState } from "react";
import Icon from "../../components/Icon";
import BranchManagerCreateRequestModal from "./BranchManagerCreateRequestModal";
import BranchManagerRequestModal from "./BranchManagerRequestModal";
import { initialManagerReceivedRequests, initialBranchSentRequests } from "./mockBranchRequests";

export default function BranchManagerRequestsPage({
  employeesList = [],
  branchAdmins = [],
  branchIT = [],
  branchMarketing = [],
  myBranch = "East",
}) {
  const [activeTab, setActiveTab] = useState("My Requests");
  const [sentRequests, setSentRequests] = useState(initialBranchSentRequests);
  const [receivedRequests, setReceivedRequests] = useState(initialManagerReceivedRequests);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedIsManagerReq, setSelectedIsManagerReq] = useState(false);
  const [notification, setNotification] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const pendingReceivedCount = useMemo(
    () => receivedRequests.filter((r) => r.status === "Pending").length,
    [receivedRequests]
  );

  const pendingSentCount = useMemo(
    () => sentRequests.filter((r) => r.status === "Pending").length,
    [sentRequests]
  );

  const historyList = useMemo(() => {
    const all = [
      ...sentRequests.map((r) => ({ ...r, flowType: "Sent to Owner" })),
      ...receivedRequests.map((r) => ({ ...r, flowType: "Received from Manager" })),
    ];
    return all.filter((r) => {
      const matchStatus = statusFilter === "All" || r.status === statusFilter;
      const matchDept = deptFilter === "All" || r.department === deptFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        (r.id && r.id.toLowerCase().includes(q)) ||
        (r.targetName && r.targetName.toLowerCase().includes(q)) ||
        (r.requesterName && r.requesterName.toLowerCase().includes(q)) ||
        (r.requestType && r.requestType.toLowerCase().includes(q));
      return matchStatus && matchDept && matchSearch;
    });
  }, [sentRequests, receivedRequests, statusFilter, deptFilter, searchQuery]);

  const handleApproveManagerRequest = (requestId, remarks) => {
    const now = new Date().toISOString().split("T")[0];
    setReceivedRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? { ...req, status: "Approved", decisionDate: now, decisionRemarks: remarks || "Approved by Branch Manager" }
          : req
      )
    );
    setNotification(`Request ${requestId} approved successfully.`);
    setTimeout(() => setNotification(""), 4200);
  };

  const handleRejectManagerRequest = (requestId, remarks) => {
    const now = new Date().toISOString().split("T")[0];
    setReceivedRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? { ...req, status: "Rejected", decisionDate: now, decisionRemarks: remarks || "Rejected by Branch Manager" }
          : req
      )
    );
    setNotification(`Request ${requestId} rejected.`);
    setTimeout(() => setNotification(""), 4200);
  };

  const handleCreateSentRequest = (newReq) => {
    setSentRequests((prev) => [newReq, ...prev]);
    setNotification(`Governance request ${newReq.id} submitted to Owner successfully.`);
    setTimeout(() => setNotification(""), 4500);
  };

  const statusBadge = (status) => {
    const color =
      status === "Approved"
        ? "#10b981"
        : status === "Rejected"
        ? "#f43f5e"
        : "#f59e0b";
    return (
      <span
        className="stage-tag"
        style={{
          background: `${color}1a`,
          color: color,
          border: `1px solid ${color}33`,
          fontWeight: 800,
          fontSize: 11.5,
          padding: "3px 10px",
          borderRadius: 999,
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: 999, background: color }} />
        {status}
      </span>
    );
  };

  return (
    <section className="bm-page-view">
      {/* Header Banner */}
      <div className="bm-header-banner">
        <div className="bm-header-info">
          <p className="bm-header-eyebrow">Governance & Team Requests</p>
          <h1 className="bm-header-title">Branch Requests & Approvals</h1>
          <p className="bm-header-subtitle">
            Review operational requests from Regional Managers and submit Edit, Delete, or Transfer petitions for Manager, Admin, IT, and Marketing staff to the Owner.
          </p>
        </div>

        <button
          type="button"
          className="manager-btn-primary"
          onClick={() => setShowCreateModal(true)}
          style={{ padding: "10px 22px", fontSize: 13.5 }}
        >
          <Icon name="plus" size={16} />
          <span>Create Request</span>
        </button>
      </div>

      {/* KPI Stats Ribbon */}
      <div className="bm-kpi-ribbon">
        <div className="analytics-card bm-kpi-tile" style={{ borderLeft: "4px solid #8c5ff8" }}>
          <div className="bm-kpi-tile-top">
            <span className="bm-kpi-tile-label">Pending Owner Decisions</span>
            <Icon name="clock" size={16} />
          </div>
          <h2 className="bm-kpi-tile-value" style={{ margin: "8px 0 2px", fontSize: 24, fontWeight: 800, color: "#8c5ff8" }}>
            {pendingSentCount}
          </h2>
          <span className="bm-kpi-tile-trend" style={{ fontSize: 12, color: "#7a748e" }}>Sent to Owner queue</span>
        </div>

        <div className="analytics-card bm-kpi-tile" style={{ borderLeft: "4px solid #f2aa38" }}>
          <div className="bm-kpi-tile-top">
            <span className="bm-kpi-tile-label">Manager Requests to Review</span>
            <Icon name="alert" size={16} />
          </div>
          <h2 className="bm-kpi-tile-value" style={{ margin: "8px 0 2px", fontSize: 24, fontWeight: 800, color: "#f2aa38" }}>
            {pendingReceivedCount}
          </h2>
          <span className="bm-kpi-tile-trend" style={{ fontSize: 12, color: "#7a748e" }}>Awaiting Branch approval</span>
        </div>

        <div className="analytics-card bm-kpi-tile" style={{ borderLeft: "4px solid #10b981" }}>
          <div className="bm-kpi-tile-top">
            <span className="bm-kpi-tile-label">Approved Governance Actions</span>
            <Icon name="checkCircle" size={16} />
          </div>
          <h2 className="bm-kpi-tile-value" style={{ margin: "8px 0 2px", fontSize: 24, fontWeight: 800, color: "#10b981" }}>
            {sentRequests.filter((r) => r.status === "Approved").length + receivedRequests.filter((r) => r.status === "Approved").length}
          </h2>
          <span className="bm-kpi-tile-trend" style={{ fontSize: 12, color: "#7a748e" }}>Active across branch</span>
        </div>

        <div className="analytics-card bm-kpi-tile" style={{ borderLeft: "4px solid #4e7cff" }}>
          <div className="bm-kpi-tile-top">
            <span className="bm-kpi-tile-label">Total Governed Teams</span>
            <Icon name="team" size={16} />
          </div>
          <h2 className="bm-kpi-tile-value" style={{ margin: "8px 0 2px", fontSize: 24, fontWeight: 800, color: "#4e7cff" }}>
            4 Depts
          </h2>
          <span className="bm-kpi-tile-trend" style={{ fontSize: 12, color: "#7a748e" }}>Manager, Admin, IT, Marketing</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="manager-tabs-strip">
        <button
          type="button"
          className={`manager-tab-btn ${activeTab === "My Requests" ? "active" : ""}`}
          onClick={() => setActiveTab("My Requests")}
        >
          <Icon name="document" size={15} />
          <span>My Requests (To Owner)</span>
          <span className="manager-tab-count">{sentRequests.length}</span>
        </button>

        <button
          type="button"
          className={`manager-tab-btn ${activeTab === "Manager Requests" ? "active" : ""}`}
          onClick={() => setActiveTab("Manager Requests")}
        >
          <Icon name="alert" size={15} />
          <span>Manager Requests (To Review)</span>
          <span className="manager-tab-count">{receivedRequests.length}</span>
        </button>

        <button
          type="button"
          className={`manager-tab-btn ${activeTab === "Decision History" ? "active" : ""}`}
          onClick={() => setActiveTab("Decision History")}
        >
          <Icon name="history" size={15} />
          <span>Decision History</span>
          <span className="manager-tab-count">{sentRequests.length + receivedRequests.length}</span>
        </button>
      </div>

      {notification && (
        <div className="manager-alert-banner" style={{ margin: "0 0 8px" }}>
          <Icon name="checkCircle" size={16} />
          <span>{notification}</span>
          <button type="button" onClick={() => setNotification("")} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "inherit" }}>✕</button>
        </div>
      )}

      {/* TAB 1: MY REQUESTS (SENT TO OWNER) */}
      {activeTab === "My Requests" && (
        <div className="analytics-card sales-table-card">
          <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Governance Petitions Submitted to Owner</h3>
              <p style={{ margin: "4px 0 0", color: "#7a748e", fontSize: 12.5 }}>
                Edit, Delete, and Transfer requests created for Managers, Admin, IT, and Marketing staff.
              </p>
            </div>
            <span style={{ fontSize: 12, color: "#8c5ff8", fontWeight: 700 }}>
              Recipient: Business Owner
            </span>
          </div>

          <div className="sales-table-scroll">
            <table className="sales-clients-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Target Employee</th>
                  <th>Department</th>
                  <th>Request Action</th>
                  <th>Submission Date</th>
                  <th>Priority</th>
                  <th>Owner Status</th>
                  <th style={{ textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {sentRequests.map((req) => (
                  <tr key={req.id}>
                    <td><strong>{req.id}</strong></td>
                    <td>
                      <div>
                        <strong>{req.targetName}</strong>
                        <small style={{ color: "#7a748e", display: "block", fontSize: 11.5 }}>
                          {req.targetRole} ({req.targetBranch} Branch)
                        </small>
                      </div>
                    </td>
                    <td>
                      <span className="stage-tag" style={{ background: "rgba(140, 95, 248, 0.12)", color: "#8c5ff8" }}>
                        {req.department}
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: req.requestType.includes("Delete") ? "#f43f5e" : req.requestType.includes("Transfer") ? "#9a74e9" : "#4e7cff" }}>
                        {req.requestType}
                      </strong>
                    </td>
                    <td>{req.createdAt}</td>
                    <td>
                      <span style={{ fontSize: 12, fontWeight: 700, color: req.priority === "High" ? "#f43f5e" : "inherit" }}>
                        {req.priority || "Normal"}
                      </span>
                    </td>
                    <td>{statusBadge(req.status)}</td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        type="button"
                        className="sales-view-btn"
                        onClick={() => {
                          setSelectedRequest(req);
                          setSelectedIsManagerReq(false);
                        }}
                      >
                        <Icon name="eye" size={13} />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {sentRequests.length === 0 && (
                  <tr>
                    <td colSpan={8} className="sales-empty-cell">
                      No requests submitted to Owner yet. Click "+ Create Request" to submit a petition.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: MANAGER REQUESTS (RECEIVED FROM MANAGERS) */}
      {activeTab === "Manager Requests" && (
        <div className="analytics-card sales-table-card">
          <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Requests Received from Regional Managers</h3>
              <p style={{ margin: "4px 0 0", color: "#7a748e", fontSize: 12.5 }}>
                Review and approve client modifications or operational petitions submitted by branch managers.
              </p>
            </div>
            <span style={{ fontSize: 12, color: "#f2aa38", fontWeight: 700 }}>
              {pendingReceivedCount} Pending Review
            </span>
          </div>

          <div className="sales-table-scroll">
            <table className="sales-clients-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Submitted By Manager</th>
                  <th>Target Entity</th>
                  <th>Request Type</th>
                  <th>Date</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {receivedRequests.map((req) => (
                  <tr key={req.id}>
                    <td><strong>{req.id}</strong></td>
                    <td>
                      <div>
                        <strong>{req.requesterName}</strong>
                        <small style={{ color: "#7a748e", display: "block", fontSize: 11.5 }}>
                          {req.requesterRole} ({req.requesterBranch || "South"} Branch)
                        </small>
                      </div>
                    </td>
                    <td>
                      <div>
                        <strong>{req.targetName}</strong>
                        <small style={{ color: "#7a748e", display: "block", fontSize: 11.5 }}>
                          {req.targetType || "Client"}
                        </small>
                      </div>
                    </td>
                    <td><strong>{req.requestType}</strong></td>
                    <td>{req.createdAt}</td>
                    <td>
                      <span style={{ fontSize: 12, fontWeight: 700, color: req.priority === "High" ? "#f43f5e" : "inherit" }}>
                        {req.priority || "Normal"}
                      </span>
                    </td>
                    <td>{statusBadge(req.status)}</td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: 6 }}>
                        <button
                          type="button"
                          className="sales-view-btn"
                          onClick={() => {
                            setSelectedRequest(req);
                            setSelectedIsManagerReq(true);
                          }}
                        >
                          <Icon name="eye" size={13} />
                          <span>Review</span>
                        </button>
                        {req.status === "Pending" && (
                          <>
                            <button
                              type="button"
                              className="sales-view-btn"
                              style={{ color: "#10b981", borderColor: "rgba(16, 185, 129, 0.3)" }}
                              onClick={() => handleApproveManagerRequest(req.id)}
                              title="Quick Approve"
                            >
                              <Icon name="check" size={13} />
                            </button>
                            <button
                              type="button"
                              className="sales-view-btn"
                              style={{ color: "#f43f5e", borderColor: "rgba(244, 63, 94, 0.3)" }}
                              onClick={() => handleRejectManagerRequest(req.id)}
                              title="Quick Reject"
                            >
                              <Icon name="close" size={13} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {receivedRequests.length === 0 && (
                  <tr>
                    <td colSpan={8} className="sales-empty-cell">
                      No manager requests in queue.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: DECISION HISTORY */}
      {activeTab === "Decision History" && (
        <div className="analytics-card sales-table-card">
          {/* History Filters Toolbar */}
          <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700 }}>
                <span>Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ padding: "6px 12px", borderRadius: 8, fontSize: 12.5 }}
                >
                  <option value="All">All Statuses</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700 }}>
                <span>Department:</span>
                <select
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                  style={{ padding: "6px 12px", borderRadius: 8, fontSize: 12.5 }}
                >
                  <option value="All">All Departments</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                </select>
              </label>
            </div>

            <div style={{ minWidth: 200 }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search history records..."
                style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12.5, width: "100%" }}
              />
            </div>
          </div>

          <div className="sales-table-scroll">
            <table className="sales-clients-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Flow Category</th>
                  <th>Target / Entity</th>
                  <th>Action Type</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Decided Date</th>
                  <th style={{ textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {historyList.map((item) => (
                  <tr key={`${item.id}-${item.flowType}`}>
                    <td><strong>{item.id}</strong></td>
                    <td>
                      <span className="stage-tag" style={{ background: item.flowType.includes("Owner") ? "rgba(140, 95, 248, 0.12)" : "rgba(68, 191, 176, 0.12)", color: item.flowType.includes("Owner") ? "#8c5ff8" : "#44bfb0" }}>
                        {item.flowType}
                      </span>
                    </td>
                    <td>
                      <strong>{item.targetName}</strong>
                      <small style={{ color: "#7a748e", display: "block", fontSize: 11.5 }}>
                        {item.department || "Client"}
                      </small>
                    </td>
                    <td><strong>{item.requestType}</strong></td>
                    <td>{item.createdAt}</td>
                    <td>{statusBadge(item.status)}</td>
                    <td>{item.decisionDate || "Pending Review"}</td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        type="button"
                        className="sales-view-btn"
                        onClick={() => {
                          setSelectedRequest(item);
                          setSelectedIsManagerReq(item.flowType.includes("Manager"));
                        }}
                      >
                        <Icon name="eye" size={13} />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {historyList.length === 0 && (
                  <tr>
                    <td colSpan={8} className="sales-empty-cell">
                      No historical request records found matching filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE GOVERNANCE REQUEST MODAL */}
      {showCreateModal && (
        <BranchManagerCreateRequestModal
          employeesList={employeesList}
          branchAdmins={branchAdmins}
          branchIT={branchIT}
          branchMarketing={branchMarketing}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateSentRequest}
        />
      )}

      {/* INSPECT & DECIDE REQUEST MODAL */}
      {selectedRequest && (
        <BranchManagerRequestModal
          request={selectedRequest}
          isManagerRequest={selectedIsManagerReq}
          onClose={() => setSelectedRequest(null)}
          onApprove={handleApproveManagerRequest}
          onReject={handleRejectManagerRequest}
        />
      )}
    </section>
  );
}
