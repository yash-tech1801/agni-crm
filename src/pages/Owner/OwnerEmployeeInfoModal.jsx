import React from "react";
import SimpleModal from "../../components/SimpleModal";

export default function OwnerEmployeeInfoModal({
  selectedEmployeeInfo,
  onClose,
  onOpenTeamUnder,
  onOpenClientsUnder,
  onEditEmployee,
}) {
  if (!selectedEmployeeInfo) return null;

  const initials = selectedEmployeeInfo.name
    ? selectedEmployeeInfo.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "EM";

  return (
    <SimpleModal onClose={onClose}>
      <div className="owner-modal-profile">
        <div className="owner-modal-avatar">{initials}</div>
        <div>
          <h2 className="owner-header-title">{selectedEmployeeInfo.name}</h2>
          <span className="owner-role-tag">{selectedEmployeeInfo.role}</span>
        </div>
      </div>

      <div className="owner-modal-info-grid">
        <div className="owner-modal-card">
          <span className="owner-modal-card-label">Employee Name</span>
          <span className="owner-modal-card-val">{selectedEmployeeInfo.name}</span>
        </div>
        <div className="owner-modal-card">
          <span className="owner-modal-card-label">Email Address</span>
          <span className="owner-modal-card-val">{selectedEmployeeInfo.email}</span>
        </div>
        <div className="owner-modal-card">
          <span className="owner-modal-card-label">Mobile Contact</span>
          <span className="owner-modal-card-val owner-phone-text">{selectedEmployeeInfo.phone}</span>
        </div>
        <div className="owner-modal-card">
          <span className="owner-modal-card-label">Designation / Role</span>
          <span className="owner-modal-card-val">{selectedEmployeeInfo.role}</span>
        </div>
        <div className="owner-modal-card">
          <span className="owner-modal-card-label">Branch Territory</span>
          <span className="owner-modal-card-val">{selectedEmployeeInfo.branch} Branch</span>
        </div>
        {['sales', 'manager', 'admin', 'IT', 'market'].includes(selectedEmployeeInfo.role) && (
          <div className="owner-modal-card">
            <span className="owner-modal-card-label">Branch Manager</span>
            <span className="owner-modal-card-val">{selectedEmployeeInfo.branchManager || 'Ariana Lee'}</span>
          </div>
        )}
        {['sales', 'market', 'IT', 'admin'].includes(selectedEmployeeInfo.role) && (
          <div className="owner-modal-card">
            <span className="owner-modal-card-label">Reporting Manager</span>
            <span className="owner-modal-card-val">
              {selectedEmployeeInfo.role === 'sales'
                ? (selectedEmployeeInfo.reportingManager || 'Eli Brooks (Sales Lead)')
                : (selectedEmployeeInfo.branchManager || 'Ariana Lee (Branch Manager)')}
            </span>
          </div>
        )}
      </div>

      <div className="owner-modal-actions">
        {['branch manager', 'manager'].includes((selectedEmployeeInfo.role || '').toLowerCase()) && onOpenTeamUnder && (
          <button
            className="owner-btn-primary"
            type="button"
            style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
            onClick={() => {
              onOpenTeamUnder(selectedEmployeeInfo);
              onClose();
            }}
          >
            Team Under
          </button>
        )}
        {['sales', 'it', 'admin', 'market'].includes((selectedEmployeeInfo.role || '').toLowerCase()) && onOpenClientsUnder && (
          <button
            className="owner-btn-primary"
            type="button"
            onClick={() => {
              onOpenClientsUnder(selectedEmployeeInfo);
              onClose();
            }}
          >
            Clients Under
          </button>
        )}
        {onEditEmployee && (
          <button
            className="owner-btn-secondary"
            type="button"
            onClick={() => {
              onEditEmployee(selectedEmployeeInfo);
              onClose();
            }}
          >
            Edit Profile
          </button>
        )}
        <button className="owner-btn-secondary" type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </SimpleModal>
  );
}
