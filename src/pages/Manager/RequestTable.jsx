import React from "react";
import Icon from "../../components/Icon";

export default function RequestTable({ requests = [], onView }) {
  return (
    <div className="analytics-card manager-table-card">
      <div className="manager-table-scroll">
        <table className="manager-team-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Client Name</th>
              <th>Salesperson</th>
              <th>Request Type</th>
              <th>Created Date</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => {
              const statusClass = (request.status || "Pending").toLowerCase();
              const initials = request.clientName
                ? request.clientName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                : "CL";

              return (
                <tr key={request.id}>
                  <td>
                    <span className="manager-id-pill">{request.id}</span>
                  </td>
                  <td>
                    <div className="manager-member-avatar-cell">
                      <div className="manager-member-avatar">{initials}</div>
                      <div className="manager-member-details">
                        <strong className="manager-member-name">{request.clientName}</strong>
                        <span className="manager-member-branch">{request.company || "Client Account"}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="manager-rep-pill">
                      <Icon name="user" size={12} />
                      {request.salesPerson}
                    </span>
                  </td>
                  <td>
                    <span className="manager-service-pill">
                      {request.requestType}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: 12.5, color: "#7a748e" }}>{request.createdAt}</span>
                  </td>
                  <td>
                    <span className={`manager-status-badge ${statusClass}`}>
                      <span className="manager-status-dot" />
                      {request.status}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      className="manager-view-btn"
                      type="button"
                      onClick={() => onView(request)}
                    >
                      <Icon name="eye" size={13} />
                      <span>Review</span>
                    </button>
                  </td>
                </tr>
              );
            })}
            {requests.length === 0 && (
              <tr>
                <td colSpan={7} className="manager-empty-state">
                  No requests in this view.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
