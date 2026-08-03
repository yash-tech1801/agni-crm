import React from "react";
import EligibleSchemeCard from "../components/dashboard/EligibleSchemeCard";

const eligibleSchemes = [
  {
    name: "Group Health Insurance",
    description: "Health protection for your employees and their families.",
    cover: "Rs. 10L",
    price: "Rs. 899/mo",
    icon: "GH",
  },
  {
    name: "Business Protection Plan",
    description: "Keep your business prepared for unexpected disruptions.",
    cover: "Rs. 25L",
    price: "Rs. 1,250/mo",
    icon: "BP",
  },
  {
    name: "Employee Wellness Cover",
    description: "Support wellbeing with preventive health benefits.",
    cover: "Rs. 5L",
    price: "Rs. 549/mo",
    icon: "EW",
  },
];

export default function EligibilityPage() {
  const [selectedScheme, setSelectedScheme] = React.useState("");
  return (
    <section className="eligibility-page" aria-labelledby="eligibility-title">
      <div className="eligibility-intro">
        <div>
          <p className="page-kicker">SCHEME MATCHING</p>
          <h2 id="eligibility-title">Eligible schemes</h2>
          <p>
            Based on your company profile, these schemes are available for Acme
            Industries Pvt. Ltd.
          </p>
        </div>
        <span className="eligibility-count">
          {eligibleSchemes.length} schemes found
        </span>
      </div>
      <div className="eligible-scheme-grid">
        {eligibleSchemes.map((scheme) => (
          <EligibleSchemeCard
            key={scheme.name}
            scheme={scheme}
            onApply={setSelectedScheme}
          />
        ))}
      </div>
      {selectedScheme && (
        <p className="service-request-message">
          {selectedScheme} is selected. You can now continue with the
          application process.
        </p>
      )}
    </section>
  );
}
