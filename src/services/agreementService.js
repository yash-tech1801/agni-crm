/**
 * Agni CRM — Agreement Service
 * 
 * Clean frontend API abstraction for agreement lifecycle operations.
 * When the backend API is implemented, the internal mock methods can be replaced
 * with HTTP fetch/axios requests to endpoints like:
 *   - GET  /api/agreements
 *   - GET  /api/agreements/:id
 *   - POST /api/agreements/:id/generate
 *   - GET  /api/agreements/:id/preview
 *   - GET  /api/agreements/:id/download/docx
 *   - GET  /api/agreements/:id/download/pdf
 *   - POST /api/agreements/:id/send
 */

export const AGREEMENT_STATUSES = {
  PENDING: "Pending",
  GENERATING: "Generating",
  READY: "Ready",
  SENT: "Sent",
  FAILED: "Failed",
};

export const TEMPLATE_TYPES = {
  SCHEME: "SCHEME",
  PRIVATE_FUNDING: "PRIVATE_FUNDING",
};

export const TEMPLATE_NAMES = {
  SCHEME: "Common Scheme Agreement",
  PRIVATE_FUNDING: "Private Funding Agreement",
};

export const TEMPLATE_FILES = {
  SCHEME: "/templates/common_agreement.docx",
  PRIVATE_FUNDING: "/templates/private_funding.docx",
};

export const agreementStatusBadgeColors = {
  Pending: { bg: "rgba(245, 158, 11, 0.12)", color: "#b45309", border: "#fde68a" },
  Generating: { bg: "rgba(59, 130, 246, 0.12)", color: "#2563eb", border: "#bfdbfe" },
  Ready: { bg: "rgba(79, 70, 229, 0.12)", color: "#3730a3", border: "#c7d2fe" },
  Sent: { bg: "rgba(16, 185, 129, 0.14)", color: "#059669", border: "#a7f3d0" },
  Failed: { bg: "rgba(239, 68, 68, 0.12)", color: "#b91c1c", border: "#fecaca" },
};

/**
 * Determine template type from service name
 */
export function getTemplateTypeForService(serviceName) {
  if (!serviceName) return TEMPLATE_TYPES.SCHEME;
  return serviceName.toLowerCase().includes("private funding")
    ? TEMPLATE_TYPES.PRIVATE_FUNDING
    : TEMPLATE_TYPES.SCHEME;
}

/**
 * Helper to normalize and ensure full backward/forward compatibility
 * between nested backend-ready schema and flat convenience getters.
 */
export function normalizeAgreementData(agr) {
  if (!agr) return null;

  const isPrivate =
    agr.scheme?.type === TEMPLATE_TYPES.PRIVATE_FUNDING ||
    agr.templateType === TEMPLATE_TYPES.PRIVATE_FUNDING ||
    (agr.scheme?.name && agr.scheme.name.toLowerCase().includes("private funding")) ||
    (agr.serviceType && agr.serviceType.toLowerCase().includes("private funding"));

  const templateType = isPrivate ? TEMPLATE_TYPES.PRIVATE_FUNDING : TEMPLATE_TYPES.SCHEME;
  const templateName =
    agr.agreement?.templateName ||
    agr.templateName ||
    (isPrivate ? TEMPLATE_NAMES.PRIVATE_FUNDING : TEMPLATE_NAMES.SCHEME);

  const status = agr.agreement?.status || agr.status || AGREEMENT_STATUSES.READY;
  const agreementDate = agr.agreement?.date || agr.agreementDate || "";
  const appId = agr.applicationId || agr.appId || "";
  const clientId = agr.client?.id || agr.clientId || agr.crmId || "";
  const companyName = agr.client?.companyName || agr.companyName || "";
  const clientName = agr.client?.clientName || agr.clientName || companyName;
  const email = agr.client?.email || agr.email || "";
  const phone = agr.client?.phone || agr.phone || "";
  const address = agr.client?.address || agr.companyAddress || agr.address || "";
  const schemeName = agr.scheme?.name || agr.scheme || agr.serviceType || "PMEGP";

  const pricingPitched = agr.agreement?.pricing?.pitched ?? agr.pitchedMoney ?? "";
  const pricingReceived = agr.agreement?.pricing?.received ?? agr.paymentReceived ?? "";
  const pricingLeft = agr.agreement?.pricing?.left ?? agr.paymentLeft ?? "";
  const pricingRate = agr.agreement?.pricing?.successRate ?? agr.disbursementRate ?? "";

  const docxUrl =
    agr.documents?.docxUrl ||
    agr.docxUrl ||
    (isPrivate ? TEMPLATE_FILES.PRIVATE_FUNDING : TEMPLATE_FILES.SCHEME);
  const pdfUrl = agr.documents?.pdfUrl || agr.pdfUrl || null;

  return {
    id: agr.id,
    applicationId: appId,
    appId: appId,
    clientId: clientId,
    crmId: clientId,

    client: {
      id: clientId,
      companyName: companyName,
      clientName: clientName,
      email: email,
      phone: phone,
      address: address,
    },

    // Convenience flat properties for legacy components
    companyName: companyName,
    clientName: clientName,
    email: email,
    phone: phone,
    companyAddress: address,
    address: address,

    scheme: {
      name: schemeName,
      type: templateType,
    },
    serviceType: schemeName,

    agreement: {
      templateName: templateName,
      templateType: templateType,
      status: status,
      date: agreementDate,
      pricing: {
        pitched: pricingPitched,
        received: pricingReceived,
        left: pricingLeft,
        successRate: pricingRate,
      },
    },

    // Flat compatibility fields
    templateName: templateName,
    templateType: templateType,
    status: status,
    agreementDate: agreementDate,
    pitchedMoney: pricingPitched,
    paymentReceived: pricingReceived,
    paymentLeft: pricingLeft,
    disbursementRate: pricingRate,

    documents: {
      docxUrl: docxUrl,
      pdfUrl: pdfUrl,
    },
    docxUrl: docxUrl,
    pdfUrl: pdfUrl,

    createdAt: agr.createdAt || new Date().toISOString().replace("T", " ").substring(0, 16),
    sentAt: agr.sentAt || null,
    sentTo: agr.sentTo || null,
  };
}

// Initial backend-ready mock data
const initialMockAgreements = [
  {
    id: "AGR-WZ-2026-001",
    applicationId: "APP-WZ-2026-001",
    client: {
      id: "1",
      companyName: "Reliance Retail Ltd",
      clientName: "Reliance Mart",
      email: "contact@reliancemart.in",
      phone: "+91 98765 43210",
      address: "101 MG Road, Fort, Mumbai, Maharashtra 400001",
    },
    scheme: {
      name: "PMEGP",
      type: TEMPLATE_TYPES.SCHEME,
    },
    agreement: {
      templateName: TEMPLATE_NAMES.SCHEME,
      status: AGREEMENT_STATUSES.SENT,
      date: "05/08/2026",
      pricing: {
        pitched: "₹50,000",
        received: "₹20,000",
        left: "₹30,000",
        successRate: "5%",
      },
    },
    documents: {
      docxUrl: TEMPLATE_FILES.SCHEME,
      pdfUrl: null,
    },
    createdAt: "2026-08-05 11:30",
    sentAt: "2026-08-05 14:15",
    sentTo: "contact@reliancemart.in",
  },
].map(normalizeAgreementData);

const STORAGE_KEY = "agni_crm_agreements_v4";

function loadFromStorage() {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(normalizeAgreementData);
        }
      }
    }
  } catch (e) {
    console.warn("Could not load agreements from local storage", e);
  }
  return initialMockAgreements;
}

function saveToStorage(list) {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
  } catch (e) {
    console.warn("Could not save agreements to local storage", e);
  }
}

/**
 * Main Agreement Service API Abstraction
 */
export const agreementService = {
  /**
   * Fetch all agreements
   * Future: GET /api/agreements
   */
  async getAgreements() {
    // Simulates API round-trip
    await new Promise((r) => setTimeout(r, 60));
    return loadFromStorage();
  },

  /**
   * Fetch a single agreement by ID
   * Future: GET /api/agreements/:id
   */
  async getAgreement(id) {
    await new Promise((r) => setTimeout(r, 60));
    const all = loadFromStorage();
    const found = all.find((a) => a.id === id || a.applicationId === id || a.clientId === id);
    if (!found) {
      throw new Error(`Agreement with ID "${id}" not found.`);
    }
    return normalizeAgreementData(found);
  },

  /**
   * Request agreement generation from the backend
   * Future: POST /api/agreements/:id/generate
   * 
   * The backend will:
   * 1. Load the original DOCX template
   * 2. Populate placeholders with client/pricing data
   * 3. Generate the final DOCX and convert to PDF if required
   * 4. Return the generated document metadata
   */
  async generateAgreement({
    client,
    agreementDate,
    companyName,
    companyAddress,
    pitchedMoney,
    paymentReceived,
    paymentLeft,
    disbursementRate,
    templateType,
    existingCount = 0,
  }) {
    // Simulate generation latency (future backend response time)
    await new Promise((r) => setTimeout(r, 600));

    const isPrivate = templateType === TEMPLATE_TYPES.PRIVATE_FUNDING;
    const templateName = isPrivate ? TEMPLATE_NAMES.PRIVATE_FUNDING : TEMPLATE_NAMES.SCHEME;
    const templateFile = isPrivate ? TEMPLATE_FILES.PRIVATE_FUNDING : TEMPLATE_FILES.SCHEME;

    const nextNum = existingCount + 1;
    const branchCode = client?.branch && client.branch.includes("Mumbai") ? "WZ" : "NZ";
    const agreementId = `AGR-${branchCode}-2026-${String(nextNum).padStart(3, "0")}`;
    const nowStr = new Date().toISOString().replace("T", " ").substring(0, 16);

    const newAgreement = normalizeAgreementData({
      id: agreementId,
      applicationId: client?.appId || `APP-${client?.id || nextNum}`,
      client: {
        id: client?.id || String(nextNum),
        companyName: companyName || client?.company || client?.name || "",
        clientName: client?.name || companyName || "",
        email: client?.email || "client@company.com",
        phone: client?.phone || "",
        address: companyAddress || client?.address || "Corporate Office",
      },
      scheme: {
        name: client?.scheme || client?.serviceName || "PMEGP",
        type: isPrivate ? TEMPLATE_TYPES.PRIVATE_FUNDING : TEMPLATE_TYPES.SCHEME,
      },
      agreement: {
        templateName: templateName,
        status: AGREEMENT_STATUSES.READY,
        date: agreementDate || nowStr.split(" ")[0],
        pricing: {
          pitched: pitchedMoney,
          received: paymentReceived,
          left: paymentLeft,
          successRate: disbursementRate,
        },
      },
      documents: {
        docxUrl: templateFile,
        pdfUrl: null, // Ready for real backend PDF URL
      },
      createdAt: nowStr,
      sentAt: null,
      sentTo: null,
    });

    // Save to mock storage
    const all = loadFromStorage();
    const filtered = all.filter((a) => a.id !== newAgreement.id && a.clientId !== newAgreement.clientId);
    const updated = [newAgreement, ...filtered];
    saveToStorage(updated);

    return newAgreement;
  },

  /**
   * Fetch agreement preview metadata
   * Future: GET /api/agreements/:id/preview
   */
  async getAgreementPreview(agreementId) {
    const agr = await this.getAgreement(agreementId);
    return {
      id: agr.id,
      pdfUrl: agr.documents?.pdfUrl || null,
      docxUrl: agr.documents?.docxUrl || null,
      isGenerated: agr.agreement?.status === AGREEMENT_STATUSES.READY || agr.agreement?.status === AGREEMENT_STATUSES.SENT,
      templateName: agr.agreement?.templateName,
      status: agr.agreement?.status,
    };
  },

  /**
   * Download DOCX file
   * Future: GET /api/agreements/:id/download/docx
   */
  async downloadAgreementDocx(agreementId, customFilename) {
    const agr = await this.getAgreement(agreementId);
    const filename =
      customFilename ||
      `${(agr.client?.companyName || "Agreement").replace(/[^a-zA-Z0-9_-]/g, "_")}_${agr.id}.docx`;

    const docxUrl = agr.documents?.docxUrl || TEMPLATE_FILES.SCHEME;

    const link = document.createElement("a");
    link.href = docxUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return { success: true, filename };
  },

  /**
   * Download PDF file
   * Future: GET /api/agreements/:id/download/pdf
   */
  async downloadAgreementPdf(agreementId, customFilename) {
    const agr = await this.getAgreement(agreementId);
    const filename =
      customFilename ||
      `${(agr.client?.companyName || "Agreement").replace(/[^a-zA-Z0-9_-]/g, "_")}_${agr.id}.pdf`;

    if (agr.documents?.pdfUrl) {
      const link = document.createElement("a");
      link.href = agr.documents.pdfUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return { success: true, filename };
    } else {
      // In mock mode without a backend PDF generator, provide clear feedback
      return {
        success: false,
        message: "PDF generation will be processed by the backend once connected.",
      };
    }
  },

  /**
   * Dispatch agreement to client
   * Future: POST /api/agreements/:id/send
   */
  async sendAgreement(agreementId, recipientEmail) {
    await new Promise((r) => setTimeout(r, 400));
    const all = loadFromStorage();
    const target = all.find((a) => a.id === agreementId);

    if (!target) {
      throw new Error(`Agreement "${agreementId}" not found to send.`);
    }

    const emailToSend = recipientEmail || target.client?.email || "client@company.com";
    const nowStr = new Date().toISOString().replace("T", " ").substring(0, 16);

    const updatedAgr = normalizeAgreementData({
      ...target,
      agreement: {
        ...target.agreement,
        status: AGREEMENT_STATUSES.SENT,
      },
      status: AGREEMENT_STATUSES.SENT,
      sentAt: nowStr,
      sentTo: emailToSend,
    });

    const updatedList = all.map((item) => (item.id === agreementId ? updatedAgr : item));
    saveToStorage(updatedList);

    return updatedAgr;
  },

  /**
   * Retry failed agreement generation
   */
  async retryGeneration(agreementId) {
    const agr = await this.getAgreement(agreementId);
    return this.generateAgreement({
      client: {
        id: agr.clientId,
        appId: agr.applicationId,
        name: agr.client?.clientName,
        company: agr.client?.companyName,
        email: agr.client?.email,
        phone: agr.client?.phone,
        address: agr.client?.address,
      },
      agreementDate: agr.agreement?.date,
      companyName: agr.client?.companyName,
      companyAddress: agr.client?.address,
      pitchedMoney: agr.agreement?.pricing?.pitched,
      paymentReceived: agr.agreement?.pricing?.received,
      paymentLeft: agr.agreement?.pricing?.left,
      disbursementRate: agr.agreement?.pricing?.successRate,
      templateType: agr.scheme?.type,
    });
  },
};

export default agreementService;
