import React, { useMemo, useState } from "react";
import Modal from "../../components/Modal";

const requestTypes = ["Edit Salesperson", "Delete Salesperson", "Transfer Salesperson"];

const makeRequestId = () => `RQ-${Math.floor(1000 + Math.random() * 9000)}`;

// Mock list of other managers under the same branch manager
const mockTransferManagers = [
  { id: 1, name: "Arun Patel" },
  { id: 2, name: "Sneha Reddy" },
  { id: 3, name: "Rajesh Kumar" },
];

export default function ManagerCreateRequestModal({ salesPeople, onClose, onSubmit }) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedSalespersonId, setSelectedSalespersonId] = useState("");
  const [transferManagerId, setTransferManagerId] = useState("");
  const [reason, setReason] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    region: "",
    quota: "",
  });

  const selectedSalesperson = useMemo(
    () => salesPeople.find((person) => String(person.id) === String(selectedSalespersonId)),
    [salesPeople, selectedSalespersonId]
  );

  const transferManager = useMemo(
    () => mockTransferManagers.find((m) => String(m.id) === String(transferManagerId)),
    [transferManagerId]
  );

  React.useEffect(() => {
    if (!selectedSalesperson) {
      setFormValues({ name: "", role: "", email: "", phone: "", region: "", quota: "" });
      return;
    }

    setFormValues({
      name: selectedSalesperson.name,
      role: selectedSalesperson.role,
      email: selectedSalesperson.email,
      phone: selectedSalesperson.phone,
      region: selectedSalesperson.region,
      quota: selectedSalesperson.quota,
    });
  }, [selectedSalesperson]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!selectedType || !selectedSalesperson) return;
    if (selectedType === "Delete Salesperson" && !reason.trim()) return;
    if (selectedType === "Transfer Salesperson" && (!reason.trim() || !transferManagerId)) return;

    let requestedChanges = [];
    if (selectedType === "Edit Salesperson") {
      requestedChanges = [
        { field: "Name", oldValue: selectedSalesperson.name, newValue: formValues.name },
        { field: "Role", oldValue: selectedSalesperson.role, newValue: formValues.role },
        { field: "Email", oldValue: selectedSalesperson.email, newValue: formValues.email },
        { field: "Phone", oldValue: selectedSalesperson.phone, newValue: formValues.phone },
        { field: "Region", oldValue: selectedSalesperson.region, newValue: formValues.region },
        { field: "Quota", oldValue: selectedSalesperson.quota, newValue: formValues.quota },
      ].filter((change) => change.oldValue !== change.newValue);
    } else if (selectedType === "Transfer Salesperson") {
      requestedChanges = [
        { field: "Manager", oldValue: "Current Manager", newValue: transferManager.name }
      ];
    }

    const request = {
      id: makeRequestId(),
      salespersonId: selectedSalesperson.id,
      salespersonName: selectedSalesperson.name,
      managerId: 4, // Mock manager ID
      managerName: "Manager",
      requestType: selectedType,
      requestedChanges: requestedChanges,
      reason: reason.trim(),
      status: "Pending",
      createdAt: new Date().toISOString().split("T")[0],
      decisionDate: null,
      branchManagerRemarks: null,
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
                <h2 style={{ margin: 0 }}>
                  {selectedType === "Edit Salesperson" ? "Edit salesperson details" : selectedType === "Transfer Salesperson" ? "Transfer salesperson" : "Delete salesperson"}
                </h2>
              </div>
              <button className="table-action" type="button" onClick={() => setSelectedType("")}>Change type</button>
            </div>

            <label className="field-label">
              Salesperson
              <select value={selectedSalespersonId} onChange={(event) => setSelectedSalespersonId(event.target.value)}>
                <option value="">Select salesperson</option>
                {salesPeople.map((person) => (
                  <option key={person.id} value={person.id}>{person.name}</option>
                ))}
              </select>
            </label>

            {selectedSalesperson ? (
              <div style={{ display: "grid", gap: 16 }}>
                {selectedType === "Edit Salesperson" ? (
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
                        Name
                        <input name="name" value={formValues.name} onChange={handleFieldChange} />
                      </label>
                      <label className="field-label">
                        Role
                        <input name="role" value={formValues.role} onChange={handleFieldChange} />
                      </label>
                      <label className="field-label">
                        Email
                        <input name="email" value={formValues.email} onChange={handleFieldChange} />
                      </label>
                      <label className="field-label">
                        Phone
                        <input name="phone" value={formValues.phone} onChange={handleFieldChange} />
                      </label>
                      <label className="field-label">
                        Region
                        <input name="region" value={formValues.region} onChange={handleFieldChange} />
                      </label>
                      <label className="field-label">
                        Quota
                        <input name="quota" value={formValues.quota} onChange={handleFieldChange} />
                      </label>
                    </div>
                  </>
                ) : selectedType === "Transfer Salesperson" ? (
                  <>
                    <label className="field-label">
                      Transfer To (Manager)
                      <select value={transferManagerId} onChange={(event) => setTransferManagerId(event.target.value)}>
                        <option value="">Select new manager</option>
                        {mockTransferManagers.map((manager) => (
                          <option key={manager.id} value={manager.id}>{manager.name}</option>
                        ))}
                      </select>
                    </label>
                    <label className="field-label">
                      Reason for Transfer
                      <textarea
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        rows={4}
                        placeholder="Explain why this salesperson should be transferred"
                        style={{ resize: "vertical", minHeight: 110, padding: 12, borderRadius: 8, border: "1px solid #dedfe1", font: "inherit" }}
                        required
                      />
                    </label>
                  </>
                ) : (
                  <label className="field-label">
                    Reason for Deletion
                    <textarea
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                      rows={4}
                      placeholder="Explain why this salesperson should be deleted"
                      style={{ resize: "vertical", minHeight: 110, padding: 12, borderRadius: 8, border: "1px solid #dedfe1", font: "inherit" }}
                      required
                    />
                  </label>
                )}

                <div style={{ display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: 10 }}>
                  <button className="table-action" type="button" onClick={onClose}>Cancel</button>
                  <button 
                    className="primary-button" 
                    type="button" 
                    onClick={handleSubmit} 
                    disabled={!reason.trim() || !selectedSalespersonId || (selectedType === "Transfer Salesperson" && !transferManagerId)}
                  >
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
