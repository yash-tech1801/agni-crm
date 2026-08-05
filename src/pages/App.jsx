import React from "react";
import AuthScreen from "./Auth/AuthScreen";
import ClientDashboard from "../ClientDashboard";
import OwnerDashboard from "./Owner/OwnerDashboard";
import ManagerDashboard from "./Manager/ManagerDashboard";
import SalesDashboard from "./Sales/SalesDashboard";

export default function App() {
  const [screen, setScreen] = React.useState("login");
  const [userRole, setUserRole] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");

  React.useEffect(() => {
    const email = localStorage.getItem("agni_user_email");
    const role = localStorage.getItem("agni_user_role");
    const validRoles = ["Owner", "Client", "Manager", "Sales Person"];
    if (email && validRoles.includes(role)) {
      setUserEmail(email);
      setUserRole(role);
      setScreen("dashboard");
    } else {
      localStorage.removeItem("agni_user_email");
      localStorage.removeItem("agni_user_role");
      setScreen("login");
    }
  }, []);

  function handleLogin(email, role) {
    localStorage.setItem("agni_user_email", email);
    localStorage.setItem("agni_user_role", role);
    setUserEmail(email);
    setUserRole(role);
    setScreen("dashboard");
  }

  function handleSignOut() {
    localStorage.removeItem("agni_user_email");
    localStorage.removeItem("agni_user_role");
    setUserRole("");
    setScreen("login");
  }

  if (screen === "dashboard") {
    if (userRole === "Owner") {
      return <OwnerDashboard onSignOut={handleSignOut} userEmail={userEmail} />;
    }
    if (userRole === "Client") {
      return <ClientDashboard onSignOut={handleSignOut} />;
    }
    if (userRole === "Manager") {
      return <ManagerDashboard onSignOut={handleSignOut} userEmail={userEmail} />;
    }
    if (userRole === "Sales Person") {
      return <SalesDashboard onSignOut={handleSignOut} />;
    }
    return <AuthScreen onLogin={handleLogin} />;
  }

  return <AuthScreen onLogin={handleLogin} />;
}
