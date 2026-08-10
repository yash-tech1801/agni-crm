import React from "react";

const eligibleSchemesData = [
  {
    id: 1,
    name: "Group Health Insurance",
    matchScore: "98% Match",
    matchNum: 98,
    categoryKey: "health",
    description: "Comprehensive health protection for your employees and their families with cashless pan-India coverage.",
    cover: "₹10,00,000",
    price: "₹899/mo per member",
    icon: "GH",
    tag: "Health & Benefits",
    features: ["Cashless Hospitalization", "Pre/Post Hospitalization", "Maternity Benefit", "24/7 Claim Desk"]
  },
  {
    id: 2,
    name: "Business Continuity Shield",
    matchScore: "95% Match",
    matchNum: 95,
    categoryKey: "commercial",
    description: "Keep your business operations prepared against unexpected property loss, cyber risk, and operational delays.",
    cover: "₹25,00,000",
    price: "₹1,250/mo",
    icon: "BP",
    tag: "Commercial Asset",
    features: ["Property Protection", "Cyber Liability", "Business Interruption", "Legal Defense Support"]
  },
  {
    id: 3,
    name: "Executive Wellness Cover",
    matchScore: "92% Match",
    matchNum: 92,
    categoryKey: "health",
    description: "Support team wellbeing with preventive healthcare checkups, mental wellness, and outpatient consultation benefits.",
    cover: "₹5,00,000",
    price: "₹549/mo",
    icon: "EW",
    tag: "Wellness & Outpatient",
    features: ["Annual Full Health Checkup", "Tele-consultation Pass", "Pharmacy Discounts", "Fitness Allowance"]
  },
  {
    id: 4,
    name: "Director & Officer Liability",
    matchScore: "89% Match",
    matchNum: 89,
    categoryKey: "commercial",
    description: "Protects executive leadership against personal liability arising from legal claims and managerial actions.",
    cover: "₹50,00,000",
    price: "₹2,400/mo",
    icon: "DO",
    tag: "Leadership Liability",
    features: ["Regulatory Defense", "Legal Fee Cover", "Worldwide Jurisdiction", "Crisis PR Support"]
  }
];

export default function EligibilityPage() {
  const [selectedScheme, setSelectedScheme] = React.useState(null);
  const [appliedScheme, setAppliedScheme] = React.useState(null);
  const [activeFilter, setActiveFilter] = React.useState("all");

  const filteredSchemes = eligibleSchemesData.filter(s => {
    if (activeFilter === "high") return s.matchNum >= 95;
    if (activeFilter === "health") return s.categoryKey === "health";
    if (activeFilter === "commercial") return s.categoryKey === "commercial";
    return true;
  });

  function handleApply(scheme) {
    setAppliedScheme(scheme.name);
    setSelectedScheme(null);
  }

  return (
    <div className="cd-subpage-container">
      {/* Page Header Intro */}
      <div className="cd-subpage-intro">
        <div>
          <span className="cd-kicker">SCHEME MATCHING & ELIGIBILITY</span>
          <h2>Eligible Schemes for Acme Industries</h2>
          <p>Based on your corporate profile and active headcount (120 members), these verified schemes are pre-qualified for immediate activation.</p>
        </div>
        <span className="cd-count-pill">{eligibleSchemesData.length} Schemes Pre-Qualified</span>
      </div>

      {/* Corporate Compatibility Banner */}
      <div className="cd-eligibility-compatibility-card">
        <div className="cd-compat-icon-wrap">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
        <div className="cd-compat-info">
          <div className="cd-compat-title">
            <h3>98% Corporate Eligibility Compatibility Index</h3>
            <span className="cd-match-badge" style={{ background: 'rgba(68, 191, 176, 0.18)', color: '#44bfb0' }}>
              ● Profile Verified
            </span>
          </div>
          <p>Verified against Acme Industries Pvt. Ltd. (Client ID: CLI-2026-8942). Pre-approved for group underwriting with zero waiting period.</p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="cd-category-filter-tabs">
        <button
          type="button"
          className={`cd-filter-tab ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => setActiveFilter("all")}
        >
          All Schemes ({eligibleSchemesData.length})
        </button>
        <button
          type="button"
          className={`cd-filter-tab ${activeFilter === "high" ? "active" : ""}`}
          onClick={() => setActiveFilter("high")}
        >
          Top Match (95%+)
        </button>
        <button
          type="button"
          className={`cd-filter-tab ${activeFilter === "health" ? "active" : ""}`}
          onClick={() => setActiveFilter("health")}
        >
          Health & Wellness
        </button>
        <button
          type="button"
          className={`cd-filter-tab ${activeFilter === "commercial" ? "active" : ""}`}
          onClick={() => setActiveFilter("commercial")}
        >
          Commercial & Leadership
        </button>
      </div>

      {/* Applied Banner Notice */}
      {appliedScheme && (
        <div className="cd-alert-success-banner">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
          <span>Application for <strong>{appliedScheme}</strong> sent to your assigned sales lead, <strong>Mia Ross</strong>! She will contact you regarding onboarding.</span>
          <button type="button" onClick={() => setAppliedScheme(null)}>×</button>
        </div>
      )}

      {/* Schemes Grid */}
      <div className="cd-eligibility-grid">
        {filteredSchemes.map((scheme) => (
          <article key={scheme.id} className="cd-eligibility-card cd-eligibility-card-enhanced">
            <div className="cd-eligibility-card-head">
              <span className="cd-match-badge cd-match-glow">
                <i className="cd-pulse-green" style={{ width: 7, height: 7, background: '#44bfb0' }} />
                {scheme.matchScore}
              </span>
              <span className="cd-scheme-tag">{scheme.tag}</span>
            </div>

            <h3>{scheme.name}</h3>
            <p>{scheme.description}</p>

            <div className="cd-eligibility-meta-grid">
              <div>
                <span>Max Coverage</span>
                <strong className="cd-cover-amount">{scheme.cover}</strong>
              </div>
              <div>
                <span>Starting Premium</span>
                <strong>{scheme.price}</strong>
              </div>
            </div>

            <div className="cd-feature-bullets">
              {scheme.features.map(f => (
                <span key={f} className="cd-feature-chip">✓ {f}</span>
              ))}
            </div>

            <button
              type="button"
              className="cd-req-service-btn"
              onClick={() => setSelectedScheme(scheme)}
            >
              <span>Apply For Scheme</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
            </button>
          </article>
        ))}
      </div>

      {/* Scheme Application Modal */}
      {selectedScheme && (
        <div className="cd-modal-backdrop" onMouseDown={() => setSelectedScheme(null)}>
          <section className="cd-modal cd-modal-glass" onMouseDown={(e) => e.stopPropagation()}>
            <button type="button" className="cd-modal-close" onClick={() => setSelectedScheme(null)}>×</button>

            <div className="cd-modal-head-pill">
              <span className="cd-match-badge" style={{ background: 'rgba(68, 191, 176, 0.15)', color: '#44bfb0' }}>
                ● {selectedScheme.matchScore} Pre-Approved
              </span>
              <span className="cd-scheme-tag">{selectedScheme.tag}</span>
            </div>

            <h2 className="cd-modal-title">Apply for {selectedScheme.name}</h2>
            <p className="cd-modal-desc">{selectedScheme.description}</p>

            <div className="cd-scheme-meta-box" style={{ gridTemplateColumns: '1fr 1fr 1fr', marginBottom: 24 }}>
              <div>
                <span>Coverage Limit</span>
                <strong style={{ color: '#4e7cff' }}>{selectedScheme.cover}</strong>
              </div>
              <div>
                <span>Estimated Premium</span>
                <strong>{selectedScheme.price}</strong>
              </div>
              <div>
                <span>Assigned Sales Lead</span>
                <strong>Mia Ross (Senior Lead)</strong>
              </div>
            </div>

            <div className="cd-modal-benefits" style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 13, textTransform: 'uppercase', color: 'var(--cd-muted)', margin: '0 0 10px 0' }}>Pre-Qualified Policy Benefits</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {selectedScheme.features.map(f => (
                  <li key={f} style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--cd-ink)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#44bfb0" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              className="cd-submit-btn cd-submit-btn-glow"
              onClick={() => handleApply(selectedScheme)}
            >
              Send Application to Mia Ross
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
