import React, { useMemo, useState } from "react";
import Modal from "../../components/Modal";
import Icon from "../../components/Icon";

const requestTypes = [
  {
    type: "Edit Salesperson",
    title: "Edit Representative",
    desc: "Update salesperson contact, territory region, or target quotas.",
    icon: "document",
  },
  {
    type: "Transfer Salesperson",
    title: "Transfer Representative",
    desc: "Reassign team member under a different branch manager.",
    icon: "team",
  },
  {
    type: "Delete Salesperson",
    title: "Delete Representative",
    desc: "Submit offboarding petition and account reallocations.",
    icon: "alert",
  },
];

const makeRequestId = () => `RQ-${Math.floor(1000 + Math.random() * 9000)}`;

// Mock list of other managers under the same branch manager
const mockTransferManagers = [
  { id: 1, name: "Arun Patel", branch: "North" },
  { id: 2, name: "Sneha Reddy", branch: "South" },
  { id: 3, name: "Rajesh Kumar", branch: "West" },
];

export default function ManagerCreateRequestModal({ salesPeople = [], onClose, onSubmit }) {
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
      name: selectedSalesperson.name || "",
      role: selectedSalesperson.role || "",
      email: selectedSalesperson.email || "",
      phone: selectedSalesperson.phone || "",
      region: selectedSalesperson.region || "",
      quota: selectedSalesperson.quota || "",
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

  const initials = selectedSalesperson?.name
    ? selectedSalesperson.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "SP";

  return (
    <Modal title="Create Change Request" onClose={onClose} closeLabel="Close">
      <div style={{ display: "grid", gap: 18, minWidth: 320, maxWidth: 660 }}>
        {!selectedType ? (
          <div>
            <p className="manager-header-eyebrow" style={{ margin: "0 0 6px" }}>Step 1: Select Request Category</p>
            <h2 style={{ margin: "0 0 14px", fontSize: 18, fontWeight: 800 }}>What change do you want to submit?</h2>
            
            <div className="manager-type-grid">
              {requestTypes.map((item) => (
                <button
                  key={item.type}
                  type="button"
                  className="manager-type-card"
                  onClick={() => setSelectedType(item.type)}
                >
                  <div className="manager-type-card-icon">
                    <Icon name={item.icon} size={18} />
                  </div>
                  <div>
                    <h3 className="manager-type-card-title">{item.title}</h3>
                    <p className="manager-type-card-desc">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 16 }}>
            {/* Type Header Pill & Change Button */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, paddingBottom: 14, borderBottom: "1px solid rgba(140, 95, 248, 0.14)" }}>
              <div>
                <p className="manager-header-eyebrow" style={{ margin: 0 }}>Category</p>
                <h3 style={{ margin: "2px 0 0", fontSize: 18, fontWeight: 800 }}>{selectedType}</h3>
              </div>
              <button
                type="button"
                className="manager-btn-secondary"
                onClick={() => setSelectedType("")}
              >
                Change Category
              </button>
            </div>

            {/* Salesperson Selector */}
            <label className="field-label" style={{ margin: 0 }}>
              <span>Target Sales Representative</span>
              <select
                className="manager-filter-select"
                value={selectedSalespersonId}
                onChange={(event) => setSelectedSalespersonId(event.target.value)}
              >
                <option value="">Choose a representative...</option>
                {salesPeople.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.name} ({person.role} • {person.branch || "Branch"})
                  </option>
                ))}
              </select>
            </label>

            {selectedSalesperson && (
              <div style={{ display: "grid", gap: 16 }}>
                {/* Profile mini-card */}
                <div className="manager-modal-profile" style={{ margin: 0, padding: 12, borderRadius: 12, background: "rgba(140, 95, 248, 0.06)", border: "1px solid rgba(140, 95, 248, 0.14)" }}>
                  <div className="manager-modal-avatar" style={{ width: 44, height: 44, fontSize: 15 }}>{initials}</div>
                  <div>
                    <strong style={{ fontSize: 15, display: "block" }}>{selectedSalesperson.name}</strong>
                    <span style={{ fontSize: 12.5, color: "#7a748e" }}>
                      {selectedSalesperson.role} • {selectedSalesperson.branch} Branch • Quota: {selectedSalesperson.quota || "₹100k"}
                    </span>
                  </div>
                </div>

                {selectedType === "Edit Salesperson" ? (
                  <>
                    <div className="manager-form-grid-2">
                      <label className="field-label" style={{ margin: 0 }}>
                        <span>Full Name</span>
                        <input name="name" value={formValues.name} onChange={handleFieldChange} />
                      </label>

                      <label className="field-label" style={{ margin: 0 }}>
                        <span>Designation / Role</span>
                        <input name="role" value={formValues.role} onChange={handleFieldChange} />
                      </label>

                      <label className="field-label" style={{ margin: 0 }}>
                        <span>Email Address</span>
                        <input name="email" value={formValues.email} onChange={handleFieldChange} />
                      </label>

                      <label className="field-label" style={{ margin: 0 }}>
                        <span>Phone Number</span>
                        <input name="phone" value={formValues.phone} onChange={handleFieldChange} />
                      </label>

                      <label className="field-label" style={{ margin: 0 }}>
                        <span>Assigned Territory</span>
                        <input name="region" value={formValues.region} onChange={handleFieldChange} />
                      </label>

                      <label className="field-label" style={{ margin: 0 }}>
                        <span>Monthly Target Quota</span>
                        <input name="quota" value={formValues.quota} onChange={handleFieldChange} />
                      </label>
                    </div>

                    <label className="field-label" style={{ margin: 0 }}>
                      <span>Justification & Reason for Edit</span>
                      <textarea
                        className="manager-textarea"
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        placeholder="Explain why these field changes are necessary..."
                        required
                      />
                    </label>
                  </>
                ) : selectedType === "Transfer Salesperson" ? (
                  <>
                    <label className="field-label" style={{ margin: 0 }}>
                      <span>Transfer to New Branch Manager</span>
                      <select
                        className="manager-filter-select"
                        value={transferManagerId}
                        onChange={(event) => setTransferManagerId(event.target.value)}
                      >
                        <option value="">Select destination manager...</option>
                        {mockTransferManagers.map((manager) => (
                          <option key={manager.id} value={manager.id}>
                            {manager.name} ({manager.branch} Zone)
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="field-label" style={{ margin: 0 }}>
                      <span>Reason for Territory Transfer</span>
                      <textarea
                        className="manager-textarea"
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        placeholder="Detail the operational reasons for transferring this representative..."
                        required
                      />
                    </label>
                  </>
                ) : (
                  <label className="field-label" style={{ margin: 0 }}>
                    <span>Reason for Account Deletion</span>
                    <textarea
                      className="manager-textarea"
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                      placeholder="Specify offboarding reasons and client account reallocation plan..."
                      required
                    />
                  </label>
                )}

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 8 }}>
                  <button className="manager-btn-secondary" type="button" onClick={onClose}>
                    Cancel
                  </button>
                  <button
                    className="manager-btn-primary"
                    type="button"
                    onClick={handleSubmit}
                    disabled={!reason.trim() || !selectedSalespersonId || (selectedType === "Transfer Salesperson" && !transferManagerId)}
                  >
                    <Icon name="check" size={15} />
                    <span>Submit Request</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
