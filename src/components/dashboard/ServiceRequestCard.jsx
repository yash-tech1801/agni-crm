export default function ServiceRequestCard({ service, onRequest }) {
  return (
    <article className="service-request-card">
      <div>
        <h4>{service.name}</h4>
        <p>{service.description}</p>
      </div>
      <button onClick={() => onRequest(service.name)}>
        Request <span aria-hidden="true">→</span>
      </button>
    </article>
  );
}
