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

  return (
    <SimpleModal onClose={onClose}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div>
          <h3 style={{ margin: 0 }}>Employee — {selectedEmployeeInfo.name}</h3>
          <div style={{ color: '#7a748e', fontSize: 13 }}>{selectedEmployeeInfo.role}</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16, padding: '12px 0' }}>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Name</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.name}</div>
        </div>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Email</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.email}</div>
        </div>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Mobile</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.phone}</div>
        </div>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Designation</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.role}</div>
        </div>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Branch</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.branch}</div>
        </div>
        {['sales', 'manager', 'admin', 'IT', 'market'].includes(selectedEmployeeInfo.role) && (
          <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
            <div style={{ color: '#6b6b77', fontSize: 12 }}>Branch manager</div>
            <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedEmployeeInfo.branchManager || 'Ariana Lee'}</div>
          </div>
        )}
        {['sales', 'market', 'IT', 'admin'].includes(selectedEmployeeInfo.role) && (
          <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
            <div style={{ color: '#6b6b77', fontSize: 12 }}>Reporting manager</div>
            <div style={{ marginTop: 6, fontWeight: 600 }}>
              {selectedEmployeeInfo.role === 'sales'
                ? (selectedEmployeeInfo.reportingManager || 'Eli Brooks (Sales Lead)')
                : (selectedEmployeeInfo.branchManager || 'Ariana Lee (Branch Manager)')}
            </div>
          </div>
        )}
      </div>
      <div className="modal-actions" style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 18 }}>
        {['branch manager', 'manager'].includes((selectedEmployeeInfo.role || '').toLowerCase()) && onOpenTeamUnder && (
          <button
            className="table-action"
            type="button"
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              padding: '6px 14px',
              borderRadius: 6
            }}
            onClick={() => {
              onOpenTeamUnder(selectedEmployeeInfo);
              onClose();
            }}
          >
            Team under
          </button>
        )}
        {['sales', 'it', 'admin', 'market'].includes((selectedEmployeeInfo.role || '').toLowerCase()) && onOpenClientsUnder && (
          <button
            className="table-action"
            type="button"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              padding: '6px 14px',
              borderRadius: 6
            }}
            onClick={() => {
              onOpenClientsUnder(selectedEmployeeInfo);
              onClose();
            }}
          >
            Clients under
          </button>
        )}
        {onEditEmployee && (
          <button
            className="table-action"
            type="button"
            onClick={() => {
              onEditEmployee(selectedEmployeeInfo);
              onClose();
            }}
          >
            Edit
          </button>
        )}
        <button className="table-action" type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </SimpleModal>
  );
}
