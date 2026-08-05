import React from "react";
import Modal from "../../components/Modal";

const formatDate = (value) => value || "-";

export default function RequestModal({ request, onClose, onApprove, onReject, readOnly }) {
  if (!request) return null;

  const isDelete = request.requestType === "Delete Client";
  const actionLabel = isDelete ? "Approve Delete" : "Approve";

  return (
    <Modal title={`Request ${request.id}`} onClose={onClose} closeLabel="Close">
      <div style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ fontSize: 12, color: '#6b6b77', margin: 0 }}>Client</p>
            <strong>{request.clientName}</strong>
          </div>
          <div>
            <p style={{ fontSize: 12, color: '#6b6b77', margin: 0 }}>Salesperson</p>
            <strong>{request.salesPerson}</strong>
          </div>
          <div>
            <p style={{ fontSize: 12, color: '#6b6b77', margin: 0 }}>Request Type</p>
            <strong>{request.requestType}</strong>
          </div>
        </div>

        <div style={{ background: '#fbfbfe', padding: 14, borderRadius: 12, border: '1px solid #e7e7f5' }}>
          <p style={{ fontSize: 12, color: '#6b6b77', margin: 0 }}>Reason</p>
          <div style={{ marginTop: 8, fontWeight: 600 }}>{request.reason}</div>
        </div>

        {isDelete ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: '#fbfbfe', padding: 14, borderRadius: 12, border: '1px solid #e7e7f5' }}>
              <p style={{ fontSize: 12, color: '#6b6b77', margin: 0 }}>Request Date</p>
              <div style={{ marginTop: 8, fontWeight: 600 }}>{formatDate(request.createdAt)}</div>
            </div>
            <div style={{ background: '#fbfbfe', padding: 14, borderRadius: 12, border: '1px solid #e7e7f5' }}>
              <p style={{ fontSize: 12, color: '#6b6b77', margin: 0 }}>Status</p>
              <div style={{ marginTop: 8, fontWeight: 600 }}>{request.status}</div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 10 }}>
            <p style={{ fontSize: 12, color: '#6b6b77', margin: 0 }}>Requested changes</p>
            <div style={{ display: 'grid', gap: 10 }}>
              {request.requestedChanges.map((change) => (
                <div key={change.field} style={{ background: '#fff', padding: 12, borderRadius: 10, border: '1px solid #e7e7f5' }}>
                  <div style={{ fontSize: 13, color: '#6b6b77' }}>{change.field}</div>
                  <div style={{ marginTop: 8, display: 'grid', gap: 6 }}>
                    <div style={{ display: 'grid', gap: 4 }}>
                      <span style={{ color: '#6b6b77', fontSize: 12 }}>Old Value</span>
                      <strong>{change.oldValue}</strong>
                    </div>
                    <div style={{ color: '#7a748e', textAlign: 'center' }}>↓</div>
                    <div style={{ display: 'grid', gap: 4 }}>
                      <span style={{ color: '#6b6b77', fontSize: 12 }}>New Value</span>
                      <strong>{change.newValue}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gap: 10, marginTop: 8 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: '#fbfbfe', padding: 14, borderRadius: 12, border: '1px solid #e7e7f5' }}>
              <p style={{ fontSize: 12, color: '#6b6b77', margin: 0 }}>Created</p>
              <div style={{ marginTop: 8, fontWeight: 600 }}>{formatDate(request.createdAt)}</div>
            </div>
            <div style={{ background: '#fbfbfe', padding: 14, borderRadius: 12, border: '1px solid #e7e7f5' }}>
              <p style={{ fontSize: 12, color: '#6b6b77', margin: 0 }}>Current status</p>
              <div style={{ marginTop: 8, fontWeight: 600 }}>{request.status}</div>
            </div>
          </div>
        </div>

        {request.status !== 'Pending' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 10 }}>
            <div style={{ background: '#fbfbfe', padding: 14, borderRadius: 12, border: '1px solid #e7e7f5' }}>
              <p style={{ fontSize: 12, color: '#6b6b77', margin: 0 }}>Approved By</p>
              <div style={{ marginTop: 8, fontWeight: 600 }}>{request.approvedBy || '-'}</div>
            </div>
            <div style={{ background: '#fbfbfe', padding: 14, borderRadius: 12, border: '1px solid #e7e7f5' }}>
              <p style={{ fontSize: 12, color: '#6b6b77', margin: 0 }}>Decision Date</p>
              <div style={{ marginTop: 8, fontWeight: 600 }}>{formatDate(request.decisionDate)}</div>
            </div>
          </div>
        )}

        {!readOnly && request.status === 'Pending' && (
          <div className="modal-actions" style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 12 }}>
            <button className="table-action danger" type="button" onClick={() => onReject(request.id)}>
              Reject
            </button>
            <button className="table-action" type="button" onClick={() => onApprove(request.id)}>
              {actionLabel}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
