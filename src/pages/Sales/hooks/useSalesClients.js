import { useState, useMemo } from "react";
import {
  GST_RATE,
  schemeOptions,
  serviceTypeSchemes,
  initialSalesClients,
  initialNewClientState,
  salesLeads,
} from "../mockSalesData";
import { salesTeam } from "../../Manager/mockManagerData";
import { getTrackerState } from "../../../utils/schemeTracker";

export function useSalesClients(salesPersonName, onClientAdded) {
  const [clients, setClients] = useState(initialSalesClients);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientSearch, setClientSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [newClient, setNewClient] = useState(initialNewClientState);

  // Filtered clients list for directory table in Details tab
  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const q = clientSearch.trim().toLowerCase();
      const matchesSearch =
        !q ||
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.company && c.company.toLowerCase().includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.phone && c.phone.toLowerCase().includes(q)) ||
        (c.scheme && c.scheme.toLowerCase().includes(q)) ||
        (c.serviceType && c.serviceType.toLowerCase().includes(q));

      const matchesStage = stageFilter === "all" || c.stage === stageFilter;

      let matchesPayment = true;
      const pending = parseFloat(c.paymentPending) || 0;
      const received = parseFloat(c.paymentReceived) || 0;
      if (paymentFilter === "paid") {
        matchesPayment = pending === 0 && received > 0;
      } else if (paymentFilter === "partial") {
        matchesPayment = pending > 0 && received > 0;
      } else if (paymentFilter === "pending") {
        matchesPayment = received === 0;
      }

      return matchesSearch && matchesStage && matchesPayment;
    });
  }, [clients, clientSearch, stageFilter, paymentFilter]);

  const totalActiveClients = clients.filter((client) => client.stage === "Active").length;
  const totalClosedDeals = salesLeads.filter((lead) => lead.status === "Closed").length;

  const quotaMetrics = useMemo(() => {
    const member = salesTeam.find(
      (m) => m.name.toLowerCase() === (salesPersonName || "").toLowerCase()
    );
    if (member) {
      const quotaNum = parseInt(member.quota.replace(/[^0-9]/g, ""), 10) * 1000;
      const salesNum = parseInt(member.monthlySales.replace(/[^0-9]/g, ""), 10) * 1000;
      const leftNum = Math.max(quotaNum - salesNum, 0);
      const progressPct = quotaNum > 0 ? Math.round((salesNum / quotaNum) * 100) : 0;
      return {
        achieved: `₹${salesNum.toLocaleString("en-IN")}`,
        left: `₹${leftNum.toLocaleString("en-IN")}`,
        progress: `${progressPct}%`,
      };
    }
    return {
      achieved: "₹76,000",
      left: "₹24,000",
      progress: "76%",
    };
  }, [salesPersonName]);

  const kpiCards = useMemo(() => [
    { label: "Active clients", value: `${totalActiveClients}`, trend: "+6%", description: "Currently active", accent: "#4e7cff", icon: "clients" },
    { label: "Total closed", value: `${totalClosedDeals || 3}`, trend: "+3%", description: "Closed deals", accent: "#44bfb0", icon: "checkCircle" },
    { label: "Quota achieved", value: quotaMetrics.achieved, trend: "+8%", description: "Realized this month", accent: "#10b981", icon: "currency" },
    { label: "Quota left", value: quotaMetrics.left, trend: "Remaining gap", description: "To reach target", accent: "#f43f5e", icon: "wallet" },
    { label: "Quota progress", value: quotaMetrics.progress, trend: "+4%", description: "Towards target", accent: "#9a74e9", icon: "revenue" },
    { label: "New contacts", value: "28", trend: "+22%", description: "Added this week", accent: "#f2aa38", icon: "users" },
  ], [totalActiveClients, totalClosedDeals, quotaMetrics]);

  const handleNewClientChange = (event) => {
    const { name, value } = event.target;
    setNewClient((prev) => {
      let next = { ...prev, [name]: value };

      if (name === "serviceType") {
        const available = serviceTypeSchemes[value] || serviceTypeSchemes.Certificate || [];
        if (!available.includes(next.scheme)) {
          next.scheme = available[0] || "";
        }
      }

      const amountNum = parseFloat(next.amount) || 0;
      const receivedNum = parseFloat(next.paymentReceived) || 0;
      const gstAmount = next.paymentMode === "Online" ? Math.round(amountNum * GST_RATE) : 0;
      const totalPayment = amountNum + gstAmount;
      const paymentPending = Math.max(totalPayment - receivedNum, 0);

      return {
        ...next,
        gstAmount,
        totalPayment,
        paymentPending,
      };
    });
  };

  const handleClearClientForm = () => {
    setNewClient(initialNewClientState);
  };

  const handleAddClient = (event) => {
    event.preventDefault();
    const nextId = clients.length ? Math.max(...clients.map((client) => client.id)) + 1 : 1;

    const documentDetails = [
      {
        label: "PAN Number",
        value: newClient.panNumber ? newClient.panNumber.toUpperCase() : "ABCDE1234F",
        available: newClient.panNumber ? "Yes" : "Pending",
      },
      {
        label: "Aadhar Number",
        value: newClient.aadharNumber ? newClient.aadharNumber : "1234 5678 9012",
        available: newClient.aadharNumber ? "Yes" : "Pending",
      },
      {
        label: "GST Number",
        value: newClient.gstNumber ? newClient.gstNumber.toUpperCase() : "27ABCDE1234F1Z5",
        available: newClient.gstNumber ? "Yes" : "Pending",
      },
      {
        label: "KYC Documents",
        value: newClient.kycStatus || "Submitted",
        available: newClient.kycStatus === "Submitted" ? "Yes" : "Pending",
      },
    ];

    const tracker = getTrackerState(newClient.scheme, ["CRM Creation"]);

    const newlyCreatedClient = {
      id: nextId,
      name: newClient.name,
      contactPerson: newClient.contactPerson || newClient.name,
      company: newClient.company,
      email: newClient.email,
      phone: newClient.phone,
      address: newClient.address || "Main Street, Metro City",
      serviceType: newClient.serviceType || "Certificate",
      stage: newClient.stage || "Active",
      owner: salesPersonName,
      scheme: newClient.scheme,
      amount: newClient.amount || "0",
      paymentMode: newClient.paymentMode,
      gstAmount: newClient.gstAmount,
      totalPayment: newClient.totalPayment,
      paymentReceived: newClient.paymentReceived || "0",
      paymentPending: newClient.paymentPending,
      notes: newClient.notes || "Client profile registered by salesperson.",
      documentDetails,
      completedSteps: ["CRM Creation"],
      progress: tracker.progressPercent,
      applicationStatus: "CRM Creation",
      processType: tracker.processType,
    };

    setClients((prev) => [newlyCreatedClient, ...prev]);
    setNewClient(initialNewClientState);

    if (onClientAdded) {
      onClientAdded(newlyCreatedClient);
    }
  };

  return {
    clients,
    setClients,
    selectedClient,
    setSelectedClient,
    clientSearch,
    setClientSearch,
    stageFilter,
    setStageFilter,
    paymentFilter,
    setPaymentFilter,
    newClient,
    setNewClient,
    filteredClients,
    kpiCards,
    handleNewClientChange,
    handleClearClientForm,
    handleAddClient,
  };
}

export default useSalesClients;
