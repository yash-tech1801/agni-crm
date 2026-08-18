import React, { useState } from "react";
import SimpleModal from "../../components/SimpleModal";
import EditForm from "../../components/EditForm";

export default function ManagerClientInfoModal({ client, onClose, onSave }) {
  const [editMode, setEditMode] = useState(false);
  const [editValues, setEditValues] = useState(client);

  if (!client) return null;

  function handleChange(event) {
    const { name, value } = event.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    if (onSave) {
      onSave(editValues);
    }
    setEditMode(false);
  }

  function handleCancel() {
    setEditValues(client);
    setEditMode(false);
  }

  return (
    <SimpleModal onClose={onClose}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div>
          <h3 style={{ margin: 0 }}>Client — {client.name}</h3>
          <div style={{ color: '#7a748e', fontSize: 13 }}>{client.company}</div>
        </div>
      </div>

      {editMode ? (
        <div style={{ display: 'grid', gap: 16, marginTop: 16 }}>
          <EditForm values={editValues} onChange={handleChange} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <button className="table-action" type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="table-action" type="button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16, padding: '12px 0' }}>
            <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
              <div style={{ color: '#6b6b77', fontSize: 12 }}>Client</div>
              <div style={{ marginTop: 6, fontWeight: 600 }}>{client.name}</div>
            </div>
            <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
              <div style={{ color: '#6b6b77', fontSize: 12 }}>Company</div>
              <div style={{ marginTop: 6, fontWeight: 600 }}>{client.company}</div>
            </div>
            <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
              <div style={{ color: '#6b6b77', fontSize: 12 }}>Assigned rep</div>
              <div style={{ marginTop: 6, fontWeight: 600 }}>{client.salesRep}</div>
            </div>
            <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
              <div style={{ color: '#6b6b77', fontSize: 12 }}>Email</div>
              <div style={{ marginTop: 6, fontWeight: 600 }}>{client.email}</div>
            </div>
            <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
              <div style={{ color: '#6b6b77', fontSize: 12 }}>Phone</div>
              <div style={{ marginTop: 6, fontWeight: 600 }}>{client.phone}</div>
            </div>
            <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
              <div style={{ color: '#6b6b77', fontSize: 12 }}>Service</div>
              <div style={{ marginTop: 6, fontWeight: 600 }}>{client.service}</div>
            </div>
            <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
              <div style={{ color: '#6b6b77', fontSize: 12 }}>Start date</div>
              <div style={{ marginTop: 6, fontWeight: 600 }}>{client.startDate}</div>
            </div>
            <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8 }}>
              <div style={{ color: '#6b6b77', fontSize: 12 }}>Revenue</div>
              <div style={{ marginTop: 6, fontWeight: 600 }}>{client.revenue}</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
            <button className="table-action" type="button" onClick={() => setEditMode(true)}>
              Edit
            </button>
          </div>
        </>
      )}
    </SimpleModal>
  );
}
