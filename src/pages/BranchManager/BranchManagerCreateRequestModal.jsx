import React, { useMemo, useState } from "react";
import Modal from "../../components/Modal";
import Icon from "../../components/Icon";

const actionTypes = [
  {
    type: "Edit Profile",
    title: "Edit Staff Profile",
    desc: "Update employee designation, contact details, region, or targets.",
    icon: "document",
    accent: "#4e7cff",
  },
  {
    type: "Transfer Staff",
    title: "Transfer Staff Member",
    desc: "Reassign team member to another branch, zone, or manager.",
    icon: "team",
    accent: "#9a74e9",
  },
  {
    type: "Delete Staff",
    title: "Delete / Offboard Staff",
    desc: "Submit account deactivation petition and portfolio reallocation to Owner.",
    icon: "alert",
    accent: "#f43f5e",
  },
];

const departments = [
  { id: "Manager", label: "Managers", icon: "managers" },
  { id: "Admin", label: "Admin Team", icon: "settings" },
  { id: "IT", label: "IT Team", icon: "overview" },
  { id: "Marketing", label: "Marketing Team", icon: "leads" },
];

const availableBranches = ["North", "South", "East", "West"];

const makeRequestId = () => `BMR-${Math.floor(1000 + Math.random() * 9000)}`;

export default function BranchManagerCreateRequestModal({
  employeesList = [],
  branchAdmins = [],
  branchIT = [],
  branchMarketing = [],
  onClose,
  onSubmit,
}) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedDept, setSelectedDept] = useState("Manager");
  const [selectedStaffId, setSelectedStaffId] = useState("");
  const [destinationBranch, setDestinationBranch] = useState("North");
  const [receivingManager, setReceivingManager] = useState("Priya Menon");
  const [reason, setReason] = useState("");
  const [priority, setPriority] = useState("High");
  const [formValues, setFormValues] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    region: "",
    quota: "",
  });

  // Get department staff list
  const departmentStaff = useMemo(() => {
    if (selectedDept === "Manager") {
      return employeesList.filter((e) => e.role === "manager" || e.role?.toLowerCase().includes("manager"));
    }
    if (selectedDept === "Admin") {
      return branchAdmins;
    }
    if (selectedDept === "IT") {
      return branchIT;
    }
    if (selectedDept === "Marketing") {
      return branchMarketing;
    }
    return [];
  }, [selectedDept, employeesList, branchAdmins, branchIT, branchMarketing]);

  // Set default selected staff when dept changes
  React.useEffect(() => {
    if (departmentStaff.length > 0) {
      setSelectedStaffId(String(departmentStaff[0].id));
    } else {
      setSelectedStaffId("");
    }
  }, [selectedDept, departmentStaff]);

  const selectedStaff = useMemo(
    () => departmentStaff.find((s) => String(s.id) === String(selectedStaffId)) || departmentStaff[0],
    [departmentStaff, selectedStaffId]
  );

  React.useEffect(() => {
    if (!selectedStaff) {
      setFormValues({ name: "", role: "", email: "", phone: "", region: "", quota: "" });
      return;
    }

    setFormValues({
      name: selectedStaff.name || "",
      role: selectedStaff.role || "",
      email: selectedStaff.email || "",
      phone: selectedStaff.phone || "+91 91234 00000",
      region: selectedStaff.region || `${selectedStaff.branch || "East"} Zone`,
      quota: selectedStaff.quota || "₹120k",
    });
  }, [selectedStaff]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!selectedType || !selectedStaff) return;
    if (selectedType === "Delete Staff" && !reason.trim()) return;
    if (selectedType === "Transfer Staff" && !reason.trim()) return;

    let requestedChanges = [];
    if (selectedType === "Edit Profile") {
      requestedChanges = [
        { field: "Name", oldValue: selectedStaff.name || "—", newValue: formValues.name },
        { field: "Role / Designation", oldValue: selectedStaff.role || "—", newValue: formValues.role },
        { field: "Email", oldValue: selectedStaff.email || "—", newValue: formValues.email },
        { field: "Phone", oldValue: selectedStaff.phone || "—", newValue: formValues.phone },
        { field: "Territory / Region", oldValue: selectedStaff.region || `${selectedStaff.branch || "East"} Zone`, newValue: formValues.region },
        ...(selectedDept === "Manager"
          ? [{ field: "Target Quota", oldValue: selectedStaff.quota || "₹120k", newValue: formValues.quota }]
          : []),
      ].filter((change) => change.oldValue !== change.newValue);
    } else if (selectedType === "Transfer Staff") {
      requestedChanges = [
        { field: "Assigned Branch", oldValue: `${selectedStaff.branch || selectedStaff.region || "East"} Branch`, newValue: `${destinationBranch} Branch` },
        { field: "Reporting Authority", oldValue: "Current Branch Manager", newValue: receivingManager },
      ];
    }

    const request = {
      id: makeRequestId(),
      department: selectedDept,
      targetId: selectedStaff.id,
      targetName: selectedStaff.name,
      targetRole: selectedStaff.role,
      targetBranch: selectedStaff.branch || selectedStaff.region || "East",
      requestType: selectedType,
      recipient: "Owner",
      destinationBranch: selectedType === "Transfer Staff" ? destinationBranch : null,
      receivingManager: selectedType === "Transfer Staff" ? receivingManager : null,
      requestedChanges,
      reason: reason.trim() || `Submitted ${selectedType} request for ${selectedStaff.name} to Owner.`,
      priority,
      status: "Pending",
      createdAt: new Date().toISOString().split("T")[0],
      decisionDate: null,
      ownerRemarks: null,
    };

    onSubmit(request);
    onClose();
  };

  const initials = selectedStaff?.name
    ? selectedStaff.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "ST";

  return (
    <Modal title="Create Governance Request to Owner" onClose={onClose} closeLabel="Close">
      <div style={{ display: "grid", gap: 18, minWidth: 320, maxWidth: 680 }}>
        {!selectedType ? (
          <div>
            <p className="bm-header-eyebrow" style={{ margin: "0 0 6px" }}>Step 1: Select Request Category</p>
            <h2 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 800 }}>
              What request do you want to submit to Owner?
            </h2>
            <p style={{ margin: "0 0 16px", color: "#7a748e", fontSize: 13 }}>
              Select whether you are requesting a profile edit, an inter-branch transfer, or an offboarding deactivation for branch managers, admin, IT, or marketing team.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
              {actionTypes.map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setSelectedType(item.type)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    textAlign: "left",
                    padding: "20px 18px",
                    borderRadius: 16,
                    border: `1.5px solid ${item.accent}33`,
                    background: "linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                  className="sales-req-type-card"
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: `${item.accent}1a`,
                      color: item.accent,
                      display: "grid",
                      placeItems: "center",
                      fontSize: 18,
                      marginBottom: 12,
                    }}
                  >
                    <Icon name={item.icon} size={20} />
                  </div>
                  <strong style={{ fontSize: 15, marginBottom: 4, display: "block" }}>{item.title}</strong>
                  <small style={{ color: "#7a748e", fontSize: 12.5, lineHeight: 1.4, display: "block" }}>
                    {item.desc}
                  </small>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Header info banner with back button */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 12,
                padding: "12px 16px",
                borderRadius: 14,
                background: "linear-gradient(135deg, rgba(140, 95, 248, 0.08) 0%, rgba(78, 124, 255, 0.04) 100%)",
                border: "1px solid rgba(140, 95, 248, 0.18)",
              }}
            >
              <div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "2px 8px",
                    borderRadius: 6,
                    background: "rgba(140, 95, 248, 0.15)",
                    color: "#8c5ff8",
                    fontSize: 11,
                    fontWeight: 700,
                    marginBottom: 2,
                  }}
                >
                  Recipient: Owner
                </span>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>
                  {selectedType} Request
                </h3>
              </div>
              <button
                type="button"
                className="sales-btn-secondary"
                onClick={() => setSelectedType("")}
                style={{ padding: "6px 14px", fontSize: 12.5 }}
              >
                ← Change type
              </button>
            </div>

            {/* Department Selector Tabs */}
            <div>
              <label className="field-label" style={{ marginBottom: 6 }}>
                <span>Select Target Department / Team</span>
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                {departments.map((dept) => {
                  const isSelected = selectedDept === dept.id;
                  return (
                    <button
                      key={dept.id}
                      type="button"
                      onClick={() => setSelectedDept(dept.id)}
                      style={{
                        padding: "9px 10px",
                        borderRadius: 10,
                        border: isSelected ? "1.5px solid #8c5ff8" : "1px solid rgba(255, 255, 255, 0.14)",
                        background: isSelected ? "rgba(140, 95, 248, 0.15)" : "rgba(255, 255, 255, 0.03)",
                        color: isSelected ? "#8c5ff8" : "inherit",
                        fontWeight: isSelected ? 800 : 600,
                        fontSize: 12.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Icon name={dept.icon} size={14} />
                      <span>{dept.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Select Staff Member from that department */}
            <label className="field-label">
              <span>Select Employee from {selectedDept} Team <span style={{ color: "#f43f5e" }}>*</span></span>
              <select
                value={selectedStaffId}
                onChange={(e) => setSelectedStaffId(e.target.value)}
                style={{ padding: "10px 14px", borderRadius: 10 }}
                required
              >
                {departmentStaff.map((staff) => (
                  <option key={staff.id} value={staff.id}>
                    {staff.name} — {staff.role} ({staff.branch || staff.region || "East"})
                  </option>
                ))}
              </select>
            </label>

            {/* Selected staff card snapshot */}
            {selectedStaff && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "12px 16px",
                  borderRadius: 12,
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(140, 95, 248, 0.14)",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "linear-gradient(135deg, #172135 0%, #8c5ff8 100%)",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 14,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong style={{ fontSize: 14 }}>{selectedStaff.name}</strong>
                    <span className="stage-tag active" style={{ fontSize: 11 }}>
                      {selectedDept} Team
                    </span>
                  </div>
                  <small style={{ color: "#7a748e", fontSize: 12 }}>
                    Role: {selectedStaff.role} • Email: {selectedStaff.email} • Branch: {selectedStaff.branch || selectedStaff.region || "East"}
                  </small>
                </div>
              </div>
            )}

            {/* If Edit Profile: Show Editable Form */}
            {selectedType === "Edit Profile" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <label className="field-label">
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleFieldChange}
                    required
                  />
                </label>
                <label className="field-label">
                  <span>Role / Designation</span>
                  <input
                    type="text"
                    name="role"
                    value={formValues.role}
                    onChange={handleFieldChange}
                    required
                  />
                </label>
                <label className="field-label">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleFieldChange}
                    required
                  />
                </label>
                <label className="field-label">
                  <span>Phone Number</span>
                  <input
                    type="text"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleFieldChange}
                  />
                </label>
                <label className="field-label">
                  <span>Assigned Region / Zone</span>
                  <input
                    type="text"
                    name="region"
                    value={formValues.region}
                    onChange={handleFieldChange}
                  />
                </label>
                {selectedDept === "Manager" && (
                  <label className="field-label">
                    <span>Target Quota</span>
                    <input
                      type="text"
                      name="quota"
                      value={formValues.quota}
                      onChange={handleFieldChange}
                      placeholder="e.g. ₹150k"
                    />
                  </label>
                )}
              </div>
            )}

            {/* If Transfer Staff: Destination branch & manager */}
            {selectedType === "Transfer Staff" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <label className="field-label">
                  <span>Target Destination Branch</span>
                  <select
                    value={destinationBranch}
                    onChange={(e) => setDestinationBranch(e.target.value)}
                  >
                    {availableBranches.map((b) => (
                      <option key={b} value={b}>{b} Regional Branch</option>
                    ))}
                  </select>
                </label>
                <label className="field-label">
                  <span>Receiving Branch Manager</span>
                  <input
                    type="text"
                    value={receivingManager}
                    onChange={(e) => setReceivingManager(e.target.value)}
                    placeholder="e.g. Priya Menon"
                    required
                  />
                </label>
              </div>
            )}

            {/* Reason / Justification to Owner */}
            <label className="field-label">
              <span>
                Reason & Justification to Owner <span style={{ color: "#f43f5e" }}>*</span>
              </span>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={`Explain why this ${selectedType.toLowerCase()} is needed for ${selectedStaff?.name || "this employee"}...`}
                style={{ resize: "vertical", minHeight: 80, padding: 12, borderRadius: 8, border: "1px solid #dedfe1", font: "inherit" }}
                required
              />
            </label>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <label className="field-label">
                <span>Urgency / Priority</span>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="Normal">Normal Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Urgent">Urgent / Immediate</option>
                </select>
              </label>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <span style={{ fontSize: 12, color: "#7a748e", lineHeight: 1.4 }}>
                  💡 This request will be submitted directly to the <strong>Owner</strong> governance queue for review and final sign-off.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 6 }}>
              <button className="sales-btn-secondary" type="button" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className="manager-btn-primary"
                style={{ padding: "10px 24px", fontSize: 13.5 }}
              >
                <Icon name="checkCircle" size={15} />
                <span>Submit Request to Owner</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
