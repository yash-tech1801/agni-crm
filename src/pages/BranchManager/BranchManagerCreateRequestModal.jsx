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
      role: selectedStaff.role || selectedStaff.designation || "",
      email: selectedStaff.email || "",
      phone: selectedStaff.phone || "",
      region: selectedStaff.branch || selectedStaff.region || "East",
      quota: selectedStaff.quota || "",
    });
  }, [selectedStaff]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedStaff) return;

    const requestedChanges = [];

    if (selectedType === "Edit Profile") {
      if (formValues.name && formValues.name !== selectedStaff.name) {
        requestedChanges.push({ field: "Name", oldValue: selectedStaff.name || "-", newValue: formValues.name });
      }
      if (formValues.role && formValues.role !== selectedStaff.role) {
        requestedChanges.push({ field: "Role / Designation", oldValue: selectedStaff.role || "-", newValue: formValues.role });
      }
      if (formValues.email && formValues.email !== selectedStaff.email) {
        requestedChanges.push({ field: "Email Address", oldValue: selectedStaff.email || "-", newValue: formValues.email });
      }
      if (formValues.phone && formValues.phone !== selectedStaff.phone) {
        requestedChanges.push({ field: "Phone Number", oldValue: selectedStaff.phone || "-", newValue: formValues.phone });
      }
      if (formValues.region && formValues.region !== (selectedStaff.branch || selectedStaff.region)) {
        requestedChanges.push({ field: "Branch / Region", oldValue: selectedStaff.branch || selectedStaff.region || "-", newValue: formValues.region });
      }
      if (formValues.quota && formValues.quota !== selectedStaff.quota) {
        requestedChanges.push({ field: "Target Quota", oldValue: selectedStaff.quota || "-", newValue: formValues.quota });
      }
    } else if (selectedType === "Transfer Staff") {
      requestedChanges.push({
        field: "Branch Transfer",
        oldValue: `${selectedStaff.branch || selectedStaff.region || "Current"} Branch`,
        newValue: `${destinationBranch} Regional Branch`,
      });
      requestedChanges.push({
        field: "Reporting Manager",
        oldValue: "Vikramaditya Sharma (West BM)",
        newValue: `${receivingManager} (${destinationBranch} BM)`,
      });
    } else if (selectedType === "Delete Staff") {
      requestedChanges.push({
        field: "Account Status",
        oldValue: "Active Personnel",
        newValue: "Deactivated / Offboarded",
      });
    }

    const request = {
      id: makeRequestId(),
      targetId: selectedStaff.id,
      targetName: selectedStaff.name,
      targetRole: selectedStaff.role,
      targetBranch: selectedStaff.branch || selectedStaff.region || "East",
      department: selectedDept,
      requestType: selectedType,
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
      <div className="bm-modal-wrapper">
        {!selectedType ? (
          <div>
            <p className="bm-header-eyebrow bm-modal-step-eyebrow">Step 1: Select Request Category</p>
            <h2 className="bm-modal-heading">
              What request do you want to submit to Owner?
            </h2>
            <p className="bm-modal-desc">
              Select whether you are requesting a profile edit, an inter-branch transfer, or an offboarding deactivation for branch managers, admin, IT, or marketing team.
            </p>

            <div className="bm-modal-cards-grid">
              {actionTypes.map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setSelectedType(item.type)}
                  style={{ border: `1.5px solid ${item.accent}33` }}
                  className="bm-modal-type-btn sales-req-type-card"
                >
                  <div
                    className="bm-modal-type-icon"
                    style={{
                      background: `${item.accent}1a`,
                      color: item.accent,
                    }}
                  >
                    <Icon name={item.icon} size={20} />
                  </div>
                  <strong className="bm-modal-type-title">{item.title}</strong>
                  <small className="bm-modal-type-sub">
                    {item.desc}
                  </small>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bm-modal-form">
            {/* Header info banner with back button */}
            <div className="bm-modal-recipient-banner">
              <div>
                <span className="bm-modal-recipient-tag">
                  Recipient: Owner
                </span>
                <h3 className="bm-req-card-title">
                  {selectedType} Request
                </h3>
              </div>
              <button
                type="button"
                className="sales-btn-secondary bm-modal-change-type-btn"
                onClick={() => setSelectedType("")}
              >
                ← Change type
              </button>
            </div>

            {/* Department Selector Tabs */}
            <div>
              <label className="field-label bm-modal-step-eyebrow">
                <span>Select Target Department / Team</span>
              </label>
              <div className="bm-modal-dept-grid">
                {departments.map((dept) => {
                  const isSelected = selectedDept === dept.id;
                  return (
                    <button
                      key={dept.id}
                      type="button"
                      onClick={() => setSelectedDept(dept.id)}
                      className="bm-modal-dept-btn"
                      style={{
                        border: isSelected ? "1.5px solid #8c5ff8" : "1px solid rgba(255, 255, 255, 0.14)",
                        background: isSelected ? "rgba(140, 95, 248, 0.15)" : "rgba(255, 255, 255, 0.03)",
                        color: isSelected ? "#8c5ff8" : "inherit",
                        fontWeight: isSelected ? 800 : 600,
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
              <span>Select Employee from {selectedDept} Team <span className="bm-req-action-del">*</span></span>
              <select
                value={selectedStaffId}
                onChange={(e) => setSelectedStaffId(e.target.value)}
                className="bm-req-filter-select-input"
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
              <div className="bm-modal-staff-preview">
                <div className="bm-modal-staff-avatar">
                  {initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong style={{ fontSize: 14 }}>{selectedStaff.name}</strong>
                    <span className="stage-tag active" style={{ fontSize: 11 }}>
                      {selectedDept} Team
                    </span>
                  </div>
                  <small className="bm-req-subtext">
                    Role: {selectedStaff.role} • Email: {selectedStaff.email} • Branch: {selectedStaff.branch || selectedStaff.region || "East"}
                  </small>
                </div>
              </div>
            )}

            {/* If Edit Profile: Show Editable Form */}
            {selectedType === "Edit Profile" && (
              <div className="bm-modal-fields-grid">
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
              <div className="bm-modal-fields-grid">
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
                Reason &amp; Justification to Owner <span className="bm-req-action-del">*</span>
              </span>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={`Explain why this ${selectedType.toLowerCase()} is needed for ${selectedStaff?.name || "this employee"}...`}
                className="sales-textarea"
                required
              />
            </label>

            <div className="bm-modal-fields-grid">
              <label className="field-label">
                <span>Urgency / Priority</span>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="Normal">Normal Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Urgent">Urgent / Immediate</option>
                </select>
              </label>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <span className="bm-req-subtext" style={{ fontSize: 12, lineHeight: 1.4 }}>
                  💡 This request will be submitted directly to the <strong>Owner</strong> governance queue for review and final sign-off.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bm-modal-footer">
              <button className="sales-btn-secondary" type="button" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className="manager-btn-primary bm-modal-submit-btn"
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
