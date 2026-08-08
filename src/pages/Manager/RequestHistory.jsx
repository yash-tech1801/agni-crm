import React, { useMemo, useState } from "react";

const months = [
  'All', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function RequestHistory({ receivedRequests = [], sentRequests = [], onView }) {
  const [selectedType, setSelectedType] = useState('Received');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const activeRequests = useMemo(() => {
    return selectedType === 'Received' ? receivedRequests : sentRequests;
  }, [selectedType, receivedRequests, sentRequests]);

  const years = useMemo(() => {
    const yearSet = new Set(activeRequests.map((request) => new Date(request.createdAt).getFullYear()));
    return ['All', ...Array.from(yearSet).sort()];
  }, [activeRequests]);

  const filtered = useMemo(() => {
    return activeRequests.filter((request) => {
      if (selectedStatus !== 'All' && request.status !== selectedStatus) {
        return false;
      }

      const createdDate = new Date(request.createdAt);
      const monthName = months[createdDate.getMonth() + 1];
      if (selectedMonth !== 'All' && monthName !== selectedMonth) {
        return false;
      }

      if (selectedYear !== 'All' && String(createdDate.getFullYear()) !== selectedYear) {
        return false;
      }

      return true;
    });
  }, [activeRequests, selectedMonth, selectedYear, selectedStatus]);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
        <label style={{ display: 'inline-flex', flexDirection: 'column', fontSize: 13, color: '#6b6b77' }}>
          Type
          <select value={selectedType} onChange={(event) => setSelectedType(event.target.value)}>
            <option value="Received">Received</option>
            <option value="Sent">Sent</option>
          </select>
        </label>
        <label style={{ display: 'inline-flex', flexDirection: 'column', fontSize: 13, color: '#6b6b77' }}>
          Month
          <select value={selectedMonth} onChange={(event) => setSelectedMonth(event.target.value)}>
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </label>
        <label style={{ display: 'inline-flex', flexDirection: 'column', fontSize: 13, color: '#6b6b77' }}>
          Year
          <select value={selectedYear} onChange={(event) => setSelectedYear(event.target.value)}>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>
        <label style={{ display: 'inline-flex', flexDirection: 'column', fontSize: 13, color: '#6b6b77' }}>
          Status
          <select value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)}>
            <option value="All">All</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Pending">Pending</option>
          </select>
        </label>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="clients-table" style={{ minWidth: 900 }}>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>{selectedType === 'Received' ? 'Client Name' : 'Target'}</th>
              <th>{selectedType === 'Received' ? 'Salesperson' : 'Target Manager'}</th>
              <th>Request Type</th>
              <th>Status</th>
              <th>Decision Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{selectedType === 'Received' ? request.clientName : request.salespersonName}</td>
                <td>{selectedType === 'Received' ? request.salesPerson : request.managerName}</td>
                <td>{request.requestType}</td>
                <td>{request.status}</td>
                <td>{request.decisionDate || '-'}</td>
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
    </div>
  );
}
