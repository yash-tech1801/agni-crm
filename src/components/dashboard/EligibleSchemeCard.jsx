export default function EligibleSchemeCard({ scheme, onApply }) {
  return (
    <article className="eligible-scheme-card">
      <div className="eligible-card-top">
        <span className="eligible-icon">{scheme.icon}</span>
        <span className="eligible-badge">Eligible</span>
      </div>
      <h3>{scheme.name}</h3>
      <p>{scheme.description}</p>
      <div className="eligible-details">
        <span>
          Cover <b>{scheme.cover}</b>
        </span>
        <span>
          From <b>{scheme.price}</b>
        </span>
      </div>
      <button onClick={() => onApply(scheme.name)}>
        Request scheme <span aria-hidden="true">→</span>
      </button>
    </article>
  );
}
