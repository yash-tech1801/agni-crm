import React, { useMemo, useState } from "react";
import Modal from "../../components/Modal";
import { mockClients } from "./mockClients";

const requestTypes = ["Edit Client", "Delete Client"];

const makeRequestId = () => `RQ-${Math.floor(1000 + Math.random() * 9000)}`;

export default function CreateRequestModal({ clients, onClose, onSubmit }) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [reason, setReason] = useState("");
  const [formValues, setFormValues] = useState({
    company: "",
    contactPerson: "",
    phone: "",
    email: "",
    gstNumber: "",
    address: "",
  });

  const selectedClient = useMemo(
    () => clients.find((client) => String(client.id) === String(selectedClientId)),
    [clients, selectedClientId]
  );

  React.useEffect(() => {
    if (!selectedClient) {
      setFormValues({ company: "", contactPerson: "", phone: "", email: "", gstNumber: "", address: "" });
      return;
    }

    setFormValues({
      company: selectedClient.company,
      contactPerson: selectedClient.contactPerson,
      phone: selectedClient.phone,
      email: selectedClient.email,
      gstNumber: selectedClient.gstNumber,
      address: selectedClient.address,
    });
  }, [selectedClient]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!selectedType || !selectedClient) return;
    if (selectedType === "Delete Client" && !reason.trim()) return;

    const request = {
      id: makeRequestId(),
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      managerId: selectedClient.managerId,
      managerName: selectedClient.managerName,
      requestType: selectedType,
      requestedChanges: selectedType === "Delete Client" ? [] : [
        { field: "Company Name", oldValue: selectedClient.company, newValue: formValues.company },
        { field: "Contact Person", oldValue: selectedClient.contactPerson, newValue: formValues.contactPerson },
        { field: "Phone Number", oldValue: selectedClient.phone, newValue: formValues.phone },
        { field: "Email", oldValue: selectedClient.email, newValue: formValues.email },
        { field: "GST Number", oldValue: selectedClient.gstNumber, newValue: formValues.gstNumber },
        { field: "Address", oldValue: selectedClient.address, newValue: formValues.address },
      ].filter((change) => change.oldValue !== change.newValue),
      reason: reason.trim(),
      status: "Pending",
      createdAt: new Date().toISOString().split("T")[0],
      decisionDate: null,
      managerRemarks: null,
    };

    onSubmit(request);
    onClose();
  };

  return (
    <Modal title="Create Request" onClose={onClose} closeLabel="Close">
      <div style={{ display: "grid", gap: 18, minWidth: 320, maxWidth: 680 }}>
        {!selectedType ? (
          <div style={{ display: "grid", gap: 14 }}>
            <p className="dashboard-eyebrow">Select request type</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
              {requestTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  className="table-action"
                  style={{
                    minHeight: 120,
                    display: "grid",
                    placeItems: "center",
                    padding: 18,
                    borderRadius: 20,
                    border: "1px solid #e7e7f5",
                    background: "#fff",
                    color: "#1d2330",
                    fontWeight: 700,
                  }}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div>
                <p className="dashboard-eyebrow">{selectedType}</p>
                <h2 style={{ margin: 0 }}>{selectedType === "Edit Client" ? "Edit client details" : "Delete client request"}</h2>
              </div>
              <button className="table-action" type="button" onClick={() => setSelectedType("")}>Change type</button>
            </div>

            <label className="field-label">
              Client
              <select value={selectedClientId} onChange={(event) => setSelectedClientId(event.target.value)}>
                <option value="">Select client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
            </label>

            {selectedClient ? (
              <div style={{ display: "grid", gap: 16 }}>
                {selectedType === "Edit Client" ? (
                  <>
                    <label className="field-label">
                      Reason for Edit
                      <textarea
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        rows={4}
                        placeholder="Explain why these changes are needed"
                        style={{ resize: "vertical", minHeight: 110, padding: 12, borderRadius: 8, border: "1px solid #dedfe1", font: "inherit" }}
                        required
                      />
                    </label>

                    <div style={{ display: "grid", gap: 18 }}>
                      <label className="field-label">
                        Company Name
                        <input name="company" value={formValues.company} onChange={handleFieldChange} />
                      </label>
                      <label className="field-label">
                        Contact Person
                        <input name="contactPerson" value={formValues.contactPerson} onChange={handleFieldChange} />
                      </label>
                      <label className="field-label">
                        Phone Number
                        <input name="phone" value={formValues.phone} onChange={handleFieldChange} />
                      </label>
                      <label className="field-label">
                        Email
                        <input name="email" value={formValues.email} onChange={handleFieldChange} />
                      </label>
                      <label className="field-label">
                        GST Number
                        <input name="gstNumber" value={formValues.gstNumber} onChange={handleFieldChange} />
                      </label>
                      <label className="field-label">
                        Address
                        <input name="address" value={formValues.address} onChange={handleFieldChange} />
                      </label>
                    </div>
                  </>
                ) : (
                  <label className="field-label">
                    Reason for Deletion
                    <textarea
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                      rows={4}
                      placeholder="Explain why this client should be deleted"
                      style={{ resize: "vertical", minHeight: 110, padding: 12, borderRadius: 8, border: "1px solid #dedfe1", font: "inherit" }}
                      required
                    />
                  </label>
                )}

                <label className="field-label">
                  Assigned Manager
                  <input value={selectedClient.managerName} readOnly />
                </label>

                <div style={{ display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: 10 }}>
                  <button className="table-action" type="button" onClick={onClose}>Cancel</button>
                  <button className="primary-button" type="button" onClick={handleSubmit} disabled={!reason.trim() || !selectedClientId}>
                    Submit Request
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </Modal>
  );
}
