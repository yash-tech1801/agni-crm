/**
 * Agni CRM — docxService (Refactored to API abstraction)
 * 
 * NOTE: Browser-side DOCX generation using PizZip / XML manipulation has been removed.
 * Actual document generation from "common agreement(2).docx" is handled by the future backend.
 * This service forwards requests to agreementService.
 */

import {
  agreementService,
  TEMPLATE_TYPES,
  TEMPLATE_NAMES,
  TEMPLATE_FILES,
  getTemplateTypeForService,
} from "../../services/agreementService";

export const TEMPLATES = {
  SCHEME: {
    name: TEMPLATE_NAMES.SCHEME,
    file: TEMPLATE_FILES.SCHEME,
  },
  PRIVATE_FUNDING: {
    name: TEMPLATE_NAMES.PRIVATE_FUNDING,
    file: TEMPLATE_FILES.PRIVATE_FUNDING,
  },
};

export { getTemplateTypeForService, TEMPLATE_TYPES, TEMPLATE_NAMES, TEMPLATE_FILES };

/**
 * Service method for requesting agreement generation
 */
export async function generateDocxAgreement(payload) {
  return agreementService.generateAgreement(payload);
}

/**
 * Triggers browser download of agreement document
 */
export function downloadDocxFile(base64OrBlobOrUrl, filename = "Agreement.docx") {
  if (typeof base64OrBlobOrUrl === "string" && (base64OrBlobOrUrl.startsWith("/") || base64OrBlobOrUrl.startsWith("http"))) {
    const a = document.createElement("a");
    a.href = base64OrBlobOrUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return;
  }

  let url;
  if (base64OrBlobOrUrl instanceof Blob) {
    url = URL.createObjectURL(base64OrBlobOrUrl);
  } else {
    url = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${base64OrBlobOrUrl}`;
  }

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  if (base64OrBlobOrUrl instanceof Blob) {
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

export default agreementService;
