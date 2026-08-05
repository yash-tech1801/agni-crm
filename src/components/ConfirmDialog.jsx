import React from 'react';

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="confirm-dialog">
      <p>{message}</p>
      <div className="confirm-actions">
        <button type="button" className="table-action" onClick={onCancel}>Cancel</button>
        <button type="button" className="table-action danger" onClick={onConfirm}>Delete</button>
      </div>
    </div>
  );
}
