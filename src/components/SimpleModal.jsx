import React from 'react';
import Icon from './Icon';

export default function SimpleModal({ children, onClose, showCloseButton = true }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div
        className="modal-content"
        style={{
          position: "relative",
          overflowY: "auto",
          maxHeight: "calc(100vh - 48px)",
          padding: "24px 26px",
          borderRadius: 22,
        }}
      >
        {showCloseButton && (
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: "absolute",
              top: 18,
              right: 18,
              zIndex: 10,
            }}
          >
            <Icon name="close" size={15} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
