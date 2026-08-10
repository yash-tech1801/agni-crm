import React from "react";

const serviceGroups = [
  {
    categoryKey: "certification",
    title: "Certificate & Licensing",
    iconName: "cert",
    tone: "#4e7cff",
    grad: "linear-gradient(135deg, #4e7cff 0%, #6d60fa 100%)",
    items: [
      {
        id: "cert-1",
        name: "Digital Signature Certificate (Class 3)",
        description: "Issuance and activation of secure encrypted DSC tokens for directors, C-suite executives, and authorized signers.",
        tag: "Encrypted Token",
        turnaround: "Same-Day Activation",
        estimate: "₹2,500 / Token",
        features: ["FIPS-140-2 Level 2 Token", "Encrypted Key Storage", "Remote Identity Verification", "2-Year Validity"]
      },
      {
        id: "cert-2",
        name: "ISO & Compliance Certification Support",
        description: "End-to-end documentation audit, gap analysis, and fast-track processing for ISO 9001, ISO 27001, and Mudra certification.",
        tag: "Audit & Certification",
        turnaround: "5-7 Business Days",
        estimate: "Custom Proposal",
        features: ["Certified External Lead Auditor", "Gap Analysis Report", "Documentation Drafting", "Guaranteed Compliance Pass"]
      }
    ]
  },
  {
    categoryKey: "it",
    title: "IT Infrastructure & Security",
    iconName: "it",
    tone: "#9a74e9",
    grad: "linear-gradient(135deg, #9a74e9 0%, #bba3fb 100%)",
    items: [
      {
        id: "it-1",
        name: "Enterprise Web Portal & CRM Maintenance",
        description: "24/7 technical monitoring, database backup management, vulnerability patching, and SLA incident response for corporate web portals.",
        tag: "24/7 SLA Guarantee",
        turnaround: "Instant Onboarding",
        estimate: "₹15,000 / month",
        features: ["99.99% Guaranteed SLA Uptime", "Automated Hourly Database Backups", "Dedicated DevOps Lead", "Zero-Downtime Patching"]
      },
      {
        id: "it-2",
        name: "Cybersecurity Vulnerability & Pen-Test Audit",
        description: "Rigorous penetration testing, cloud firewall inspection, and threat surface auditing for enterprise IT infrastructure.",
        tag: "Security Penetration",
        turnaround: "48-Hour Audit",
        estimate: "₹35,000 / Audit",
        features: ["OWASP Top 10 Assessment", "Network Vulnerability Scan", "Executive Risk Report", "Remediation Checklist"]
      }
    ]
  },
  {
    categoryKey: "marketing",
    title: "Marketing & Brand Growth",
    iconName: "marketing",
    tone: "#44bfb0",
    grad: "linear-gradient(135deg, #44bfb0 0%, #2b9e90 100%)",
    items: [
      {
        id: "mk-1",
        name: "Brand Identity & Corporate Collateral Suite",
        description: "Professional brand style guides, pitch decks, investor presentations, stationery, and corporate identity design assets.",
        tag: "Brand Identity",
        turnaround: "3-5 Business Days",
        estimate: "₹25,000 Package",
        features: ["Vector Logo & Assets", "Comprehensive Brand Guidelines", "Interactive Pitch Deck Template", "Social Media Kit"]
      },
      {
        id: "mk-2",
        name: "Targeted B2B Digital Growth Campaign",
        description: "Multi-channel B2B digital acquisition campaigns across LinkedIn, Google Ads, and targeted industry media.",
        tag: "Growth Campaign",
        turnaround: "Bi-Weekly Cycles",
        estimate: "₹45,00,00 Active",
        features: ["Targeted Account Prospecting", "High-Converting Ad Creatives", "Bi-Weekly Performance Dashboard", "A/B Landing Page Testing"]
      }
    ]
  },
  {
    categoryKey: "legal",
    title: "Legal & Regulatory Compliance",
    iconName: "legal",
    tone: "#f2aa38",
    grad: "linear-gradient(135deg, #f2aa38 0%, #e08061 100%)",
    items: [
      {
        id: "lc-1",
        name: "Annual Corporate Statutory Filing",
        description: "End-to-end management of MCA annual filings, corporate governance reviews, tax compliance, and regulatory submissions.",
        tag: "Statutory Filing",
        turnaround: "Annual Retainer",
        estimate: "₹18,000 / Year",
        features: ["MCA Form AOC-4 & MGT-7", "Board Resolution Drafting", "Tax Compliance Review", "Zero Penalty Guarantee"]
      },
      {
        id: "lc-2",
        name: "Vendor & Contract Legal Inspection",
        description: "Legal inspection, risk assessment, and clause drafting for vendor master service agreements, SLAs, and commercial contracts.",
        tag: "Legal Risk Audit",
        turnaround: "24-48 Hours Review",
        estimate: "₹8,500 / Contract",
        features: ["Commercial Risk Assessment", "Liability Cap Auditing", "IP Ownership Rights", "Redline Draft Revisions"]
      }
    ]
  }
];

export default function MoreServicesPage() {
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [requestedService, setRequestedService] = React.useState(null);
  const [submittedService, setSubmittedService] = React.useState(null);
  const [priorityTier, setPriorityTier] = React.useState("Standard");
  const [requestNotes, setRequestNotes] = React.useState("");

  const filteredGroups = serviceGroups.filter(g => activeCategory === "all" || g.categoryKey === activeCategory);
  const totalServices = serviceGroups.reduce((acc, g) => acc + g.items.length, 0);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmittedService({
      name: requestedService.name,
      priority: priorityTier
    });
    setRequestedService(null);
    setRequestNotes("");
  }

  return (
    <div className="cd-subpage-container">
      {/* Header Intro */}
      <div className="cd-subpage-intro">
        <div>
          <span className="cd-kicker">ENTERPRISE SOLUTIONS MARKETPLACE</span>
          <h2>Explore Additional Services</h2>
          <p>Browse specialized corporate services across IT, compliance, marketing, and licensing tailored for Acme Industries.</p>
        </div>
        <span className="cd-count-pill">{totalServices} Services Available</span>
      </div>      {/* Category Filter Tabs */}
      <div className="cd-category-filter-tabs">
        <button
          type="button"
          className={`cd-filter-tab ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => setActiveCategory("all")}
        >
          All Categories ({totalServices})
        </button>
        <button
          type="button"
          className={`cd-filter-tab ${activeCategory === "certification" ? "active" : ""}`}
          onClick={() => setActiveCategory("certification")}
        >
          Certificate & Licensing
        </button>
        <button
          type="button"
          className={`cd-filter-tab ${activeCategory === "it" ? "active" : ""}`}
          onClick={() => setActiveCategory("it")}
        >
          IT & Security
        </button>
        <button
          type="button"
          className={`cd-filter-tab ${activeCategory === "marketing" ? "active" : ""}`}
          onClick={() => setActiveCategory("marketing")}
        >
          Marketing & Growth
        </button>
        <button
          type="button"
          className={`cd-filter-tab ${activeCategory === "legal" ? "active" : ""}`}
          onClick={() => setActiveCategory("legal")}
        >
          Legal & Compliance
        </button>
      </div>

      {/* Submitted Success Banner */}
      {submittedService && (
        <div className="cd-alert-success-banner">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
          <span>Service request for <strong>{submittedService.name}</strong> ({submittedService.priority} Priority) sent to your assigned sales lead, <strong>Mia Ross</strong>! She will contact you within 2 business hours.</span>
          <button type="button" onClick={() => setSubmittedService(null)}>×</button>
        </div>
      )}

      {/* Service Groups Grid */}
      <div className="cd-service-groups-layout">
        {filteredGroups.map(group => (
          <section key={group.title} className="cd-service-group-section">
            <div className="cd-service-group-head">
              <div className="cd-service-group-icon" style={{ background: group.grad, color: '#ffffff' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <h3>{group.title}</h3>
            </div>

            <div className="cd-service-items-grid">
              {group.items.map(service => (
                <article key={service.id} className="cd-service-card">
                  <div className="cd-service-card-top">
                    <span className="cd-match-badge" style={{ background: 'rgba(78, 124, 255, 0.12)', color: '#4e7cff' }}>
                      {service.tag}
                    </span>
                    <span className="cd-turnaround-pill">{service.turnaround}</span>
                  </div>

                  <h4>{service.name}</h4>
                  <p>{service.description}</p>

                  <div className="cd-service-meta-bar">
                    <span>Pricing Estimate</span>
                    <strong>{service.estimate}</strong>
                  </div>

                  <div className="cd-feature-bullets" style={{ marginBottom: 20 }}>
                    {service.features.map(f => (
                      <span key={f} className="cd-feature-chip">✓ {f}</span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="cd-req-service-btn"
                    onClick={() => setRequestedService(service)}
                  >
                    <span>Request Service</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
                  </button>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Service Request Wizard Modal */}
      {requestedService && (
        <div className="cd-modal-backdrop" onMouseDown={() => setRequestedService(null)}>
          <section className="cd-modal cd-modal-glass" onMouseDown={(e) => e.stopPropagation()}>
            <button type="button" className="cd-modal-close" onClick={() => setRequestedService(null)}>×</button>

            <div className="cd-modal-head-pill">
              <span className="cd-match-badge" style={{ background: 'rgba(78, 124, 255, 0.12)', color: '#4e7cff' }}>
                {requestedService.tag}
              </span>
              <span className="cd-turnaround-pill">{requestedService.turnaround}</span>
            </div>

            <h2 className="cd-modal-title">{requestedService.name}</h2>
            <p className="cd-modal-desc">{requestedService.description}</p>

            <div className="cd-scheme-meta-box" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: 24 }}>
              <div>
                <span>Pricing Estimate</span>
                <strong style={{ color: '#4e7cff' }}>{requestedService.estimate}</strong>
              </div>
              <div>
                <span>Assigned Sales Lead</span>
                <strong>Mia Ross (Senior Lead)</strong>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="cd-form">
              <label>
                <span>Select Priority & Turnaround Requirement</span>
                <select value={priorityTier} onChange={(e) => setPriorityTier(e.target.value)}>
                  <option value="Urgent (24 Hours)">Urgent (24 Hours Expedited SLA)</option>
                  <option value="Standard (3-5 Days)">Standard (3-5 Business Days)</option>
                  <option value="Flexible Schedule">Flexible Schedule</option>
                </select>
              </label>

              <label>
                <span>Specific Instructions / Corporate Scope</span>
                <textarea
                  rows="3"
                  value={requestNotes}
                  onChange={(e) => setRequestNotes(e.target.value)}
                  placeholder="Specify headcount, target dates, or specialized corporate scope..."
                />
              </label>

              <button type="submit" className="cd-submit-btn cd-submit-btn-glow">
                Send Request to Mia Ross
              </button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
