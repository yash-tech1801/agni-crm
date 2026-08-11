import React from 'react';

export default function SimpleModal({ children, onClose, showCloseButton = true }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-content" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 48px)' }}>
        {showCloseButton && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="table-action" onClick={onClose}>Close</button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
