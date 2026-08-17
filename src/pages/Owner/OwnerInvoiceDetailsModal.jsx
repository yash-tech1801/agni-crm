import React from "react";
import SimpleModal from "../../components/SimpleModal";

export default function OwnerInvoiceDetailsModal({
  selectedInvoice,
  onClose,
  onDownload,
}) {
  if (!selectedInvoice) return null;

  return (
    <SimpleModal onClose={onClose}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div>
          <h3 style={{ margin: 0 }}>Invoice Details — {selectedInvoice.id}</h3>
          <div style={{ color: '#7a748e', fontSize: 13 }}>{selectedInvoice.company}</div>
        </div>
        <span style={{
          padding: '6px 12px',
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 600,
          background: selectedInvoice.status === 'Paid' ? 'rgba(68, 191, 176, 0.15)' : selectedInvoice.status === 'Pending' ? 'rgba(242, 170, 56, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          color: selectedInvoice.status === 'Paid' ? '#2b9385' : selectedInvoice.status === 'Pending' ? '#b87b14' : '#dc2626'
        }}>
          {selectedInvoice.status}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16, padding: '12px 0' }}>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Client Name</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedInvoice.clientName}</div>
        </div>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>GST / Reg No</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedInvoice.gstNo}</div>
        </div>

        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Branch</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedInvoice.branch}</div>
        </div>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Region Name</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedInvoice.region}</div>
        </div>

        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Service Line</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedInvoice.serviceName}</div>
        </div>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Account Manager</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedInvoice.accountManager}</div>
        </div>

        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Issue Date</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedInvoice.issueDate}</div>
        </div>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Due Date</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedInvoice.dueDate}</div>
        </div>

        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Base Fee</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedInvoice.amount}</div>
        </div>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Tax</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedInvoice.tax}</div>
        </div>

        <div style={{ background: '#eef2ff', padding: 12, borderRadius: 8, gridColumn: '1 / -1' }}>
          <div style={{ color: '#4e7cff', fontSize: 12, fontWeight: 600 }}>Total Billed Amount</div>
          <div style={{ marginTop: 4, fontWeight: 700, fontSize: 18, color: '#4e7cff' }}>{selectedInvoice.totalAmount}</div>
        </div>
      </div>

      <div className="modal-actions" style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 18 }}>
        {onDownload && (
          <button className="table-action" type="button" onClick={() => onDownload(selectedInvoice)}>
            Download Invoice
          </button>
        )}
        <button className="table-action" type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </SimpleModal>
  );
}
