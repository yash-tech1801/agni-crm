import React from "react";
import SimpleModal from "../../components/SimpleModal";

export default function OwnerInvoiceDetailsModal({
  selectedInvoice,
  onClose,
  onDownload,
}) {
  if (!selectedInvoice) return null;

  const statusClass = (selectedInvoice.status || "pending").toLowerCase();

  return (
    <SimpleModal onClose={onClose}>
      <div className="owner-modal-profile">
        <div className="owner-modal-avatar">INV</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <div>
              <h2 className="owner-header-title">Invoice — {selectedInvoice.id}</h2>
              <span className="owner-header-subtitle">{selectedInvoice.company}</span>
            </div>
            <span className={`owner-status-pill ${statusClass}`}>
              ● {selectedInvoice.status}
            </span>
          </div>
        </div>
      </div>

      <div className="owner-modal-info-grid">
        <div className="owner-modal-card">
          <span className="owner-modal-card-label">Client Name</span>
          <span className="owner-modal-card-val">{selectedInvoice.clientName}</span>
        </div>
        <div className="owner-modal-card">
          <span className="owner-modal-card-label">GST / Reg No</span>
          <span className="owner-modal-card-val owner-phone-text">{selectedInvoice.gstNo}</span>
        </div>

        <div className="owner-modal-card">
          <span className="owner-modal-card-label">Branch</span>
          <span className="owner-modal-card-val">{selectedInvoice.branch}</span>
        </div>
        <div className="owner-modal-card">
          <span className="owner-modal-card-label">Region Name</span>
          <span className="owner-modal-card-val">{selectedInvoice.region}</span>
        </div>

        <div className="owner-modal-card">
          <span className="owner-modal-card-label">Service Line</span>
          <span className="owner-modal-card-val">{selectedInvoice.serviceName}</span>
        </div>
        <div className="owner-modal-card">
          <span className="owner-modal-card-label">Account Manager</span>
          <span className="owner-modal-card-val">{selectedInvoice.accountManager}</span>
        </div>

        <div className="owner-modal-card">
          <span className="owner-modal-card-label">Issue Date</span>
          <span className="owner-modal-card-val">{selectedInvoice.issueDate}</span>
        </div>
        <div className="owner-modal-card">
          <span className="owner-modal-card-label">Due Date</span>
          <span className="owner-modal-card-val">{selectedInvoice.dueDate}</span>
        </div>

        <div className="owner-modal-card">
          <span className="owner-modal-card-label">Base Fee</span>
          <span className="owner-modal-card-val">{selectedInvoice.amount}</span>
        </div>
        <div className="owner-modal-card">
          <span className="owner-modal-card-label">Tax</span>
          <span className="owner-modal-card-val">{selectedInvoice.tax}</span>
        </div>

        <div className="owner-modal-card" style={{ gridColumn: '1 / -1' }}>
          <span className="owner-modal-card-label">Total Billed Amount</span>
          <span className="owner-modal-card-val owner-revenue-text" style={{ fontSize: 20 }}>
            {selectedInvoice.totalAmount}
          </span>
        </div>
      </div>

      <div className="owner-modal-actions">
        {onDownload && (
          <button className="owner-btn-primary" type="button" onClick={() => onDownload(selectedInvoice)}>
            Download Invoice PDF
          </button>
        )}
        <button className="owner-btn-secondary" type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </SimpleModal>
  );
}
