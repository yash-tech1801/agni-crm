import { useState, useMemo, useRef, useEffect } from "react";

export function useSalesDashboard(userEmail) {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [dark, setDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const notificationWrapRef = useRef(null);
  const notificationsListRef = useRef(null);
  const notificationsPauseTimer = useRef(null);

  const salesPersonName = useMemo(() => {
    if (!userEmail) return "Sales Person";
    const raw = userEmail.split("@")[0];
    const cleaned = raw.replace(/\d+$/, "");
    const parts = cleaned.split(/[^a-zA-Z]+/).filter(Boolean);
    if (!parts.length) return "Sales Person";
    return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(" ");
  }, [userEmail]);

  const showToast = (message, duration = 5000) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), duration);
  };

  // Close notifications on outside click
  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        notificationsOpen &&
        notificationWrapRef.current &&
        !notificationWrapRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [notificationsOpen]);

  // Notifications auto-scroller
  useEffect(() => {
    if (!notificationsOpen) return undefined;
    const list = notificationsListRef.current;
    if (!list) return undefined;

    const intervalId = window.setInterval(() => {
      const maxScroll = list.scrollHeight - list.clientHeight;
      if (maxScroll <= 0) return;
      const nextScrollTop = Math.min(list.scrollTop + 76, maxScroll);
      list.scrollTo({ top: nextScrollTop, behavior: "smooth" });
      if (list.scrollTop >= maxScroll - 2) {
        list.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 2600);

    return () => window.clearInterval(intervalId);
  }, [notificationsOpen]);

  // Cleanup pause timer
  useEffect(() => {
    return () => {
      if (notificationsPauseTimer.current) {
        window.clearTimeout(notificationsPauseTimer.current);
      }
    };
  }, []);

  function handleNotificationsListScroll() {
    if (notificationsPauseTimer.current) {
      window.clearTimeout(notificationsPauseTimer.current);
    }
    notificationsPauseTimer.current = window.setTimeout(() => {
      notificationsPauseTimer.current = null;
    }, 3000);
  }

  return {
    activeNav,
    setActiveNav,
    dark,
    setDark,
    searchOpen,
    setSearchOpen,
    notificationsOpen,
    setNotificationsOpen,
    query,
    setQuery,
    toastMessage,
    setToastMessage,
    showToast,
    salesPersonName,
    notificationWrapRef,
    notificationsListRef,
    handleNotificationsListScroll,
  };
}

export default useSalesDashboard;
