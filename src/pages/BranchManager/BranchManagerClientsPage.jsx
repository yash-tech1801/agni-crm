import React, { useState } from "react";
import SimpleModal from "../../components/SimpleModal";
import EditForm from "../../components/EditForm";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function BranchManagerClientsPage({
  clients,
  setClients,
}) {
  const [selectedClient, setSelectedClient] = useState(null);
  const [editClientValues, setEditClientValues] = useState(null);
  const [deleteTargetClient, setDeleteTargetClient] = useState(null);

  function openClientInfo(client) {
    setSelectedClient(client);
    setEditClientValues(null);
  }

  function closeClientInfo() {
    setSelectedClient(null);
    setEditClientValues(null);
  }

  function openDeleteConfirm(client) {
    setDeleteTargetClient(client);
  }

  function closeDeleteConfirm() {
    setDeleteTargetClient(null);
  }

  function handleDeleteClient(clientId) {
    setClients((prev) => prev.filter((client) => client.id !== clientId));
    if (selectedClient?.id === clientId) {
      setSelectedClient(null);
      setEditClientValues(null);
    }
  }

  function confirmDeleteClient() {
    if (!deleteTargetClient) return;
    handleDeleteClient(deleteTargetClient.id);
    closeDeleteConfirm();
  }

  function startClientEdit() {
    setEditClientValues(selectedClient);
  }

  function handleEditClientChange(event) {
    const { name, value } = event.target;
    setEditClientValues((prev) => ({ ...prev, [name]: value }));
  }

  function saveClientEdit() {
    setClients((prev) =>
      prev.map((client) => (client.id === editClientValues.id ? editClientValues : client))
    );
    setSelectedClient(editClientValues);
    setEditClientValues(null);
  }

  function cancelClientEdit() {
    setEditClientValues(null);
  }

  return (
    <section className="bm-page-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <div>
          <p className="eyebrow">Branch clients</p>
          <h2>Clients under your branch</h2>
          <p style={{ margin: 0, color: "#6b6b77", fontSize: 13 }}>Showing clients managed by sales members in your branch.</p>
        </div>
        <div style={{ color: "#7a748e", fontSize: 13 }}>{clients.length} clients</div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="clients-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Company</th>
              <th>Assigned rep</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Start</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td><strong>{client.name}</strong></td>
                <td>{client.company}</td>
                <td>{client.salesRep}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.startDate}</td>
                <td style={{ textAlign: "right" }}>
                  <div style={{ display: "inline-flex", gap: 6 }}>
                    <button className="table-action" type="button" onClick={() => openClientInfo(client)}>
                      Info
                    </button>
                    <button className="table-action danger" type="button" onClick={() => openDeleteConfirm(client)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedClient && (
        <SimpleModal onClose={closeClientInfo}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <div>
              <h3 style={{ margin: 0 }}>Client — {selectedClient.name}</h3>
              <div style={{ color: "#7a748e", fontSize: 13 }}>{selectedClient.company}</div>
            </div>
          </div>

          {editClientValues ? (
            <div style={{ display: "grid", gap: 16, marginTop: 16 }}>
              <EditForm values={editClientValues} onChange={handleEditClientChange} />
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button className="table-action" type="button" onClick={cancelClientEdit}>
                  Cancel
                </button>
                <button className="table-action" type="button" onClick={saveClientEdit}>
                  Save
                </button>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16, padding: "12px 0" }}>
                <div style={{ background: "#fbfbfe", padding: 12, borderRadius: 8 }}>
                  <div style={{ color: "#6b6b77", fontSize: 12 }}>Client</div>
                  <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.name}</div>
                </div>
                <div style={{ background: "#fbfbfe", padding: 12, borderRadius: 8 }}>
                  <div style={{ color: "#6b6b77", fontSize: 12 }}>Company</div>
                  <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.company}</div>
                </div>
                <div style={{ background: "#fbfbfe", padding: 12, borderRadius: 8 }}>
                  <div style={{ color: "#6b6b77", fontSize: 12 }}>Assigned rep</div>
                  <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.salesRep}</div>
                </div>
                <div style={{ background: "#fbfbfe", padding: 12, borderRadius: 8 }}>
                  <div style={{ color: "#6b6b77", fontSize: 12 }}>Email</div>
                  <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.email}</div>
                </div>
                <div style={{ background: "#fbfbfe", padding: 12, borderRadius: 8 }}>
                  <div style={{ color: "#6b6b77", fontSize: 12 }}>Phone</div>
                  <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.phone}</div>
                </div>
                <div style={{ background: "#fbfbfe", padding: 12, borderRadius: 8 }}>
                  <div style={{ color: "#6b6b77", fontSize: 12 }}>Service</div>
                  <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.service}</div>
                </div>
                <div style={{ background: "#fbfbfe", padding: 12, borderRadius: 8 }}>
                  <div style={{ color: "#6b6b77", fontSize: 12 }}>Start date</div>
                  <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.startDate}</div>
                </div>
                <div style={{ background: "#fbfbfe", padding: 12, borderRadius: 8 }}>
                  <div style={{ color: "#6b6b77", fontSize: 12 }}>Revenue</div>
                  <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.revenue}</div>
                </div>
                <div style={{ background: "#eef0fb", padding: 12, borderRadius: 8, border: "1px solid #d4d8f0" }}>
                  <div style={{ color: "#4e5579", fontSize: 12, fontWeight: 500 }}>Region name</div>
                  <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.region}</div>
                </div>
                <div style={{ background: "#eef0fb", padding: 12, borderRadius: 8, border: "1px solid #d4d8f0" }}>
                  <div style={{ color: "#4e5579", fontSize: 12, fontWeight: 500 }}>Manager name</div>
                  <div style={{ marginTop: 6, fontWeight: 600 }}>{selectedClient.managerName}</div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
                <button className="table-action" type="button" onClick={startClientEdit}>
                  Edit
                </button>
              </div>
            </>
          )}
        </SimpleModal>
      )}

      {deleteTargetClient && (
        <SimpleModal onClose={closeDeleteConfirm} showCloseButton={false}>
          <ConfirmDialog
            message={`Delete ${deleteTargetClient.name} from clients?`}
            onConfirm={confirmDeleteClient}
            onCancel={closeDeleteConfirm}
          />
        </SimpleModal>
      )}
    </section>
  );
}
