import React, { useMemo, useState } from "react";

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function SchemeCard({ scheme, onToggle }) {
  return (
    <article className="eligible-scheme-card sales-eligible-card">
      <div className="eligible-card-top">
        <div className="eligible-icon">{scheme.schemeName.slice(0, 2).toUpperCase()}</div>
        <span className="eligible-badge">Eligible</span>
      </div>

      <h3>{scheme.schemeName}</h3>
      <p>{scheme.description}</p>

      <div className="eligible-meta-row">
        <div>
          <span className="eligible-meta-label">Visibility</span>
          <strong>{scheme.visibleToClient ? "Visible" : "Hidden"}</strong>
        </div>
        <div>
          <span className="eligible-meta-label">Updated</span>
          <strong>{formatDate(scheme.lastUpdated)}</strong>
        </div>
      </div>

      <label className="toggle-row" htmlFor={`scheme-${scheme.id}`}>
        <span>Show to Client</span>
        <button
          id={`scheme-${scheme.id}`}
          type="button"
          className={`toggle-pill ${scheme.visibleToClient ? "active" : ""}`}
          onClick={() => onToggle(scheme.id)}
          aria-pressed={scheme.visibleToClient}
        >
          <i />
        </button>
      </label>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="eligible-empty-state">
      <div className="eligible-empty-icon">✦</div>
      <h3>No eligible schemes were found for this client.</h3>
      <p>Eligible recommendations will appear here once the system generates them.</p>
    </div>
  );
}

export default function EligibleSchemes({ initialSchemes = [], onSave } ) {
  const [schemes, setSchemes] = useState(initialSchemes);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [savedMessage, setSavedMessage] = useState("");

  const filteredSchemes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const nextSchemes = (schemes || []).filter((scheme) => {
      if (!scheme.eligible) return false;
      if (!query) return true;
      return scheme.schemeName.toLowerCase().includes(query);
    });

    const sorted = [...nextSchemes].sort((left, right) => {
      if (sortBy === "az") {
        return left.schemeName.localeCompare(right.schemeName);
      }
      if (sortBy === "za") {
        return right.schemeName.localeCompare(left.schemeName);
      }
      if (sortBy === "oldest") {
        return new Date(left.lastUpdated) - new Date(right.lastUpdated);
      }
      return new Date(right.lastUpdated) - new Date(left.lastUpdated);
    });

    return sorted;
  }, [schemes, searchQuery, sortBy]);

  const recommendedSchemes = useMemo(
    () => filteredSchemes.filter((scheme) => scheme.visibleToClient),
    [filteredSchemes]
  );

  const hiddenSchemes = useMemo(
    () => filteredSchemes.filter((scheme) => !scheme.visibleToClient),
    [filteredSchemes]
  );

  const handleToggle = (schemeId) => {
    setSchemes((prev) => prev.map((scheme) =>
      scheme.id === schemeId ? { ...scheme, visibleToClient: !scheme.visibleToClient, updatedBy: "Sales Person" } : scheme
    ));
  };

  const handleSave = () => {
    setSavedMessage("Recommended schemes updated successfully.");
    window.setTimeout(() => setSavedMessage(""), 2200);
    if (typeof onSave === 'function') {
      onSave();
    }
  };

  return (
    <section className="eligible-schemes-section">
      <div className="eligible-schemes-card">
        <div className="panel-header eligible-panel-header">
          <div>
            <p className="eyebrow">Client recommendation workflow</p>
            <h2>Eligible Schemes</h2>
            <p className="eligible-section-description">
              These schemes are generated based on the client’s submitted information. You can choose which eligible schemes should be visible to the client.
            </p>
          </div>
        </div>

        <div className="eligible-controls">
          <label className="field-label eligible-control-field">
            <span>Search schemes</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search schemes..."
            />
          </label>
          <label className="field-label eligible-control-field">
            <span>Sort by</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </select>
          </label>
        </div>

        {filteredSchemes.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="eligible-scheme-grid sales-eligible-grid">
            {filteredSchemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} onToggle={handleToggle} />
            ))}
          </div>
        )}

        <button type="button" className="primary-button eligible-save-button" onClick={handleSave}>
          Save Recommendations
        </button>

        {savedMessage ? <p className="eligible-toast">{savedMessage}</p> : null}

        <div className="eligible-summary-grid">
          <div className="eligible-summary-card">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Visible to client</p>
                <h3>Recommended Schemes</h3>
              </div>
            </div>
            {recommendedSchemes.length === 0 ? (
              <p className="eligible-summary-empty">No schemes are currently recommended for this client.</p>
            ) : (
              <ul className="eligible-summary-list">
                {recommendedSchemes.map((scheme) => (
                  <li key={scheme.id}>{scheme.schemeName}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="eligible-summary-card">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Hidden from client</p>
                <h3>Hidden Eligible Schemes</h3>
              </div>
            </div>
            {hiddenSchemes.length === 0 ? (
              <p className="eligible-summary-empty">All eligible schemes are currently visible to the client.</p>
            ) : (
              <ul className="eligible-summary-list">
                {hiddenSchemes.map((scheme) => (
                  <li key={scheme.id}>{scheme.schemeName}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
