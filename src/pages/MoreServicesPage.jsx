import React from "react";
import ServiceRequestCard from "../components/dashboard/ServiceRequestCard";

const serviceGroups = [
  {
    title: "Certificate",
    icon: "CE",
    tone: "certificate",
    items: [
      {
        name: "Digital Certificate",
        description: "Create verified digital certificates for your clients.",
      },
      {
        name: "Compliance Certificate",
        description: "Request documentation support for compliance needs.",
      },
    ],
  },
  {
    title: "IT",
    icon: "IT",
    tone: "it",
    items: [
      { name: "Website Support", description: "Get help with your website." },
      { name: "CRM Support", description: "Set up secure business CRM." },
    ],
  },
  {
    title: "Marketing",
    icon: "MK",
    tone: "marketing",
    items: [
      {
        name: "Brand & Design",
        description:
          "Build brand assets that make your business instantly recognisable.",
      },
      {
        name: "Social Media Campaign",
        description:
          "Plan and manage focused campaigns for your target audience.",
      },
    ],
  },
];

export default function MoreServicesPage() {
  const [requestedService, setRequestedService] = React.useState("");

  return (
    <section
      className="more-services-page"
      aria-labelledby="more-services-title"
    >
      <div className="more-services-intro">
        <div>
          <p className="page-kicker">EXPAND YOUR SUPPORT</p>
          <h2 id="more-services-title">More Services</h2>
          <p>
            Choose the services your company needs next. Our team will help you
            get started.
          </p>
        </div>
        <span className="services-count">
          {serviceGroups.length} services available
        </span>
      </div>
      <div className="service-groups">
        {serviceGroups.map((group) => (
          <section key={group.title} className="service-group">
            <header>
              <span className={`service-icon ${group.tone}`}>{group.icon}</span>
              <h3>{group.title}</h3>
            </header>
            <div className="service-request-list">
              {group.items.map((service) => (
                <ServiceRequestCard
                  key={service.name}
                  service={service}
                  onRequest={setRequestedService}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
      {requestedService && (
        <p className="service-request-message">
          Your request for {requestedService} has been noted. Our team will
          contact you shortly.
        </p>
      )}
    </section>
  );
}
