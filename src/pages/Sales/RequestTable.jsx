import React from "react";

const statusBadge = {
  Pending: "#f2aa38",
  Approved: "#44bfb0",
  Rejected: "#ff5757",
  Cancelled: "#7c8490",
};

export default function RequestTable({ requests, onView, onCancel }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="clients-table" style={{ minWidth: 900 }}>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Client Name</th>
            <th>Request Type</th>
            <th>Assigned Manager</th>
            <th>Request Date</th>
            <th>Status</th>
            <th style={{ textAlign: "right" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.clientName}</td>
              <td>{request.requestType}</td>
              <td>{request.managerName}</td>
              <td>{request.createdAt}</td>
              <td>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 10px", borderRadius: 999, background: `${statusBadge[request.status]}22`, color: statusBadge[request.status], fontWeight: 700, fontSize: 12 }}>
                  {request.status}
                </span>
              </td>
              <td style={{ textAlign: "right" }}>
                <button className="table-action" type="button" onClick={() => onView(request)}>
                  View
                </button>
                {request.status === "Pending" && (
                  <button className="table-action danger" type="button" onClick={() => onCancel(request.id)}>
                    Cancel Request
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
