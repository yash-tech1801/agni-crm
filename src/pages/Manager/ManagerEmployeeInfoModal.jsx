import React from "react";
import SimpleModal from "../../components/SimpleModal";

export default function ManagerEmployeeInfoModal({ member, onClose, managerName }) {
  if (!member) return null;

  return (
    <SimpleModal onClose={onClose}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div>
          <h3 style={{ margin: 0 }}>Employee — {member.name}</h3>
          <div style={{ color: '#7a748e', fontSize: 13 }}>{member.role}</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16, padding: '12px 0' }}>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Name</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{member.name}</div>
        </div>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Role</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{member.role}</div>
        </div>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Branch</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{member.branch}</div>
        </div>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Branch manager</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{member.branchManager || managerName || "Manager"}</div>
        </div>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Region</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{member.region}</div>
        </div>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Email</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{member.email}</div>
        </div>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Phone</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{member.phone}</div>
        </div>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Quota</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{member.quota}</div>
        </div>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Monthly sales</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{member.monthlySales}</div>
        </div>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8, gridColumn: '1 / -1' }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Joined</div>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{member.joiningDate}</div>
        </div>
      </div>
    </SimpleModal>
  );
}
