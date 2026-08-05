import React from "react";

export default function RequestTable({ requests, onView }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="clients-table" style={{ minWidth: 900 }}>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Client Name</th>
            <th>Salesperson</th>
            <th>Request Type</th>
            <th>Request Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.clientName}</td>
              <td>{request.salesPerson}</td>
              <td>{request.requestType}</td>
              <td>{request.createdAt}</td>
              <td>{request.status}</td>
              <td style={{ textAlign: 'right' }}>
                <button className="table-action" type="button" onClick={() => onView(request)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
