import React, { useState, useMemo } from "react";
import SimpleModal from "../../components/SimpleModal";
import ConfirmDialog from "../../components/ConfirmDialog";
import ManagerClientInfoModal from "./ManagerClientInfoModal";

export default function ManagerClientsPage({
  clients = [],
  setClients,
  salesPeople = [],
}) {
  const [selectedSalesPerson, setSelectedSalesPerson] = useState("all");
  const [selectedClient, setSelectedClient] = useState(null);
  const [deleteTargetClient, setDeleteTargetClient] = useState(null);

  const filteredClients = useMemo(() => {
    if (selectedSalesPerson === "all") {
      return clients;
    }
    const selectedId = Number(selectedSalesPerson);
    return clients.filter((client) => client.assignedSalesPersonId === selectedId);
  }, [clients, selectedSalesPerson]);

  function handleDeleteClient(clientId) {
    if (setClients) {
      setClients((prev) => prev.filter((client) => client.id !== clientId));
    }
    if (selectedClient?.id === clientId) {
      setSelectedClient(null);
    }
  }

  function confirmDeleteClient() {
    if (!deleteTargetClient) return;
    handleDeleteClient(deleteTargetClient.id);
    setDeleteTargetClient(null);
  }

  function handleSaveClientEdit(updatedClient) {
    if (setClients) {
      setClients((prev) =>
        prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
      );
    }
    setSelectedClient(updatedClient);
  }

  return (
    <section style={{ animation: "fadeIn 0.25s ease-out" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <p className="eyebrow">Branch clients</p>
          <h2>Clients under your sales team</h2>
          <p style={{ margin: 0, color: "#6b6b77", fontSize: 13 }}>
            Showing only clients managed by sales members in your branch.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{ color: "#7a748e", fontSize: 13 }}>
            {filteredClients.length} clients
          </div>
          <label className="field-label" style={{ minWidth: 220, margin: 0 }}>
            <span>Sales Person</span>
            <select
              value={selectedSalesPerson}
              onChange={(event) => setSelectedSalesPerson(event.target.value)}
            >
              <option value="all">All Sales Persons</option>
              {salesPeople.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <table className="clients-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Company</th>
            <th>Assigned rep</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Start</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.company}</td>
              <td>{client.salesRep}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>{client.startDate}</td>
              <td style={{ textAlign: "right" }}>
                <button
                  className="table-action"
                  type="button"
                  onClick={() => setSelectedClient(client)}
                >
                  Info
                </button>
                <button
                  className="table-action danger"
                  type="button"
                  onClick={() => setDeleteTargetClient(client)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedClient && (
        <ManagerClientInfoModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onSave={handleSaveClientEdit}
        />
      )}

      {deleteTargetClient && (
        <SimpleModal onClose={() => setDeleteTargetClient(null)} showCloseButton={false}>
          <ConfirmDialog
            message={`Delete ${deleteTargetClient.name} from clients?`}
            onConfirm={confirmDeleteClient}
            onCancel={() => setDeleteTargetClient(null)}
          />
        </SimpleModal>
      )}
    </section>
  );
}
