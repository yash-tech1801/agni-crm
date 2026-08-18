import React from "react";
import SimpleModal from "../../components/SimpleModal";
import ActivityStatusBar from "../../components/dashboard/ActivityStatusBar";
import { getTrackerState, getProcessTypeLabel } from "../../utils/schemeTracker";

export default function OwnerClientInfoModal({
  selectedClient,
  onClose,
  onEditClient,
}) {
  if (!selectedClient) return null;

  const isPaid = (selectedClient.paymentReceived || 0) >= (selectedClient.totalPayment || 0);
  const remaining = Math.max(0, (selectedClient.totalPayment || 0) - (selectedClient.paymentReceived || 0));

  const clientScheme = selectedClient.scheme || selectedClient.serviceName || selectedClient.serviceType || "PMEGP";
  const tracker = getTrackerState({ scheme: clientScheme, completedSteps: selectedClient.completedSteps });
  const processLabel = tracker.processTypeLabel || getProcessTypeLabel(tracker.processType);

  return (
    <SimpleModal onClose={onClose}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, borderBottom: '1px solid #eef0f5', paddingBottom: 14 }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.8, color: "#6366f1" }}>
            CLIENT DOSSIER &amp; TRACKER
          </span>
          <h3 style={{ margin: "2px 0 0", fontSize: 18, fontWeight: 700 }}>{selectedClient.name}</h3>
          <div style={{ color: '#7a748e', fontSize: 13, marginTop: 2 }}>
            {selectedClient.company} {selectedClient.appId ? `• ID: ${selectedClient.appId}` : ''}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ background: '#eef2ff', color: '#4e7cff', padding: '6px 12px', borderRadius: 999, fontWeight: 600, fontSize: 12 }}>
            ● {tracker.currentStage}
          </span>
          <span style={{ background: '#f3f6f9', color: '#475569', padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>
            {tracker.progressPercent}%
          </span>
        </div>
      </div>

      {/* Client Info Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8, border: '1.5px solid #8c5ff833' }}>
          <div style={{ color: '#8c5ff8', fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>Selected Scheme</div>
          <div style={{ marginTop: 4, fontWeight: 700, fontSize: 14, color: '#1e293b' }}>{clientScheme}</div>
        </div>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8, border: '1.5px solid #4e7cff33' }}>
          <div style={{ color: '#4e7cff', fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>Process Type</div>
          <div style={{ marginTop: 4, fontWeight: 700, fontSize: 14, color: '#4e7cff' }}>{processLabel} ({tracker.totalStages} Stages)</div>
        </div>

        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8, border: '1px solid #eef0f5' }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Mobile</div>
          <div style={{ marginTop: 4, fontWeight: 600 }}>{selectedClient.phone}</div>
        </div>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8, border: '1px solid #eef0f5' }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Email</div>
          <div style={{ marginTop: 4, fontWeight: 600 }}>{selectedClient.email}</div>
        </div>

        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8, border: '1px solid #eef0f5' }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Service Start Date</div>
          <div style={{ marginTop: 4, fontWeight: 600 }}>{selectedClient.serviceStart || '—'}</div>
        </div>
        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8, border: '1px solid #eef0f5' }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Total Payment</div>
          <div style={{ marginTop: 4, fontWeight: 600 }}>₹{(selectedClient.totalPayment || 0).toLocaleString()}</div>
        </div>

        <div style={{ background: '#fbfbfe', padding: 12, borderRadius: 8, border: '1px solid #eef0f5' }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Payment Received</div>
          <div style={{ marginTop: 4, fontWeight: 600, color: '#16a34a' }}>₹{(selectedClient.paymentReceived || 0).toLocaleString()}</div>
        </div>

        <div style={{ background: remaining > 0 ? '#fff7f6' : '#f0fdf4', padding: 12, borderRadius: 8, border: remaining > 0 ? '1px solid #fee2e2' : '1px solid #dcfce7' }}>
          <div style={{ color: '#6b6b77', fontSize: 12 }}>Payment Remaining</div>
          <div style={{ marginTop: 4, fontWeight: 700, color: remaining > 0 ? '#d0433b' : '#16a34a' }}>
            {remaining > 0 ? `₹${remaining.toLocaleString()}` : 'Fully Paid ✓'}
          </div>
        </div>
      </div>

      {/* Dynamic Activity Status Stepper */}
      <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #eef0f5' }}>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', color: '#6366f1', textTransform: 'uppercase' }}>
            WORK COMPLETION PIPELINE
          </span>
          <h4 style={{ margin: '4px 0 0', fontSize: 15, fontWeight: 700, color: '#1e293b' }}>
            {tracker.totalStages}-Point Sequential Activity Tracker ({clientScheme})
          </h4>
        </div>
        <ActivityStatusBar
          scheme={clientScheme}
          stages={tracker.stages}
          completedSteps={tracker.completedStages}
          progress={tracker.progressPercent}
          interactive={false}
        />
      </div>

      <div className="modal-actions" style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 20 }}>
        {onEditClient && (
          <button
            className="table-action"
            onClick={() => onEditClient(selectedClient)}
          >
            Edit Client
          </button>
        )}
        <button className="primary-button" onClick={onClose}>
          Close
        </button>
      </div>
    </SimpleModal>
  );
}
