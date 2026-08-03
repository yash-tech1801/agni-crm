import React from "react";
import Brand from "../../components/Brand";
import Icon from "../../components/Icon";

export default function DocumentForm({ email, onComplete }) {
  const [documentData, setDocumentData] = React.useState(() => {
    const saved = localStorage.getItem("agni_doc_temp");
    return saved
      ? JSON.parse(saved)
      : {
          companyName: "",
          registrationNumber: "",
          representativeName: "",
          contactNumber: "",
        };
  });

  React.useEffect(() => {
    localStorage.setItem("agni_doc_temp", JSON.stringify(documentData));
  }, [documentData]);

  function updateField(field, value) {
    setDocumentData((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    localStorage.setItem("agni_document_data", JSON.stringify(documentData));
    localStorage.setItem("agni_documents_submitted", "true");
    localStorage.removeItem("agni_doc_temp");
    onComplete();
  }

  return (
    <main className="auth-page">
      <section className="showcase" aria-label="Client documents required">
        <div className="mesh mesh-one" />
        <div className="mesh mesh-two" />
        <div className="showcase-inner">
          <Brand />
          <div className="showcase-copy">
            <p className="eyebrow">
              <span /> DOCUMENTS REQUIRED
            </p>
            <h1>Finish setup before landing on your dashboard.</h1>
            <p className="lede">
              Provide the requested details so your account can be initialized
              and you can continue to the dashboard.
            </p>
          </div>
        </div>
      </section>
      <section className="auth-area" aria-labelledby="document-form-title">
        <div className="mobile-brand">
          <Brand />
        </div>
        <div className="auth-panel">
          <div className="form-intro">
            <p className="eyebrow">WELCOME</p>
            <h2 id="document-form-title">Complete your profile</h2>
            <p>
              Client email: <strong>{email}</strong>
            </p>
          </div>
          <form onSubmit={submit} autoComplete="off">
            <label className="field-label">
              Company name
              <input
                name="companyName"
                value={documentData.companyName}
                onChange={(event) => updateField("companyName", event.target.value)}
                placeholder="Your company name"
                required
              />
            </label>
            <label className="field-label">
              Registration number
              <input
                name="registrationNumber"
                value={documentData.registrationNumber}
                onChange={(event) => updateField("registrationNumber", event.target.value)}
                placeholder="Business registration ID"
                required
              />
            </label>
            <label className="field-label">
              Representative name
              <input
                name="representativeName"
                value={documentData.representativeName}
                onChange={(event) => updateField("representativeName", event.target.value)}
                placeholder="Authorized representative"
                required
              />
            </label>
            <label className="field-label">
              Contact number
              <input
                name="contactNumber"
                value={documentData.contactNumber}
                onChange={(event) => updateField("contactNumber", event.target.value)}
                placeholder="Phone number"
                required
              />
            </label>
            <button className="primary-button" type="submit">
              Submit documents
              <Icon name="arrow" size={18} />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
