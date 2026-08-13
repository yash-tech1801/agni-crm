 import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AuthScreen from "./Auth/AuthScreen";
import ClientDashboard from "../ClientDashboard";
import OwnerDashboard from "./Owner/OwnerDashboard";
import ManagerDashboard from "./Manager/ManagerDashboard";
import BranchManagerDashboard from "./BranchManager/BranchManagerDashboard";
import SalesDashboard from "./Sales/SalesDashboard";

export default function App() {
  const navigate = useNavigate();

  const [userRole, setUserRole] = React.useState(() => localStorage.getItem("agni_user_role") || "");
  const [userEmail, setUserEmail] = React.useState(() => localStorage.getItem("agni_user_email") || "");

  const rolePathMap = {
    "Owner": "/owner",
    "Client": "/client",
    "Manager": "/manager",
    "Sales Person": "/sales",
    "Branch Manager": "/branch-manager"
  };

  React.useEffect(() => {
    const email = localStorage.getItem("agni_user_email");
    const role = localStorage.getItem("agni_user_role");
    const validRoles = ["Owner", "Client", "Manager", "Sales Person", "Branch Manager"];

    if (email && validRoles.includes(role)) {
      setUserEmail(email);
      setUserRole(role);
    } else {
      localStorage.removeItem("agni_user_email");
      localStorage.removeItem("agni_user_role");
      setUserEmail("");
      setUserRole("");
    }
  }, []);

  function handleLogin(email, role) {
    // Clear any stale session before writing the new one so an old
    // cached role can never leak into this login.
    localStorage.removeItem("agni_user_email");
    localStorage.removeItem("agni_user_role");

    localStorage.setItem("agni_user_email", email);
    localStorage.setItem("agni_user_role", role);
    setUserEmail(email);
    setUserRole(role);
    const targetPath = rolePathMap[role] || "/login";
    navigate(targetPath, { replace: true });
  }

  function handleSignOut() {
    localStorage.removeItem("agni_user_email");
    localStorage.removeItem("agni_user_role");
    setUserRole("");
    setUserEmail("");
    navigate("/login");
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={<AuthScreen onLogin={handleLogin} />}
      />

      <Route
        path="/owner/*"
        element={
          userRole === "Owner" ? (
            <OwnerDashboard onSignOut={handleSignOut} userEmail={userEmail} />
          ) : (
            <Navigate to={userRole ? (rolePathMap[userRole] || "/login") : "/login"} replace />
          )
        }
      />

      <Route
        path="/branch-manager/*"
        element={
          userRole === "Branch Manager" ? (
            <BranchManagerDashboard onSignOut={handleSignOut} userEmail={userEmail} />
          ) : (
            <Navigate to={userRole ? (rolePathMap[userRole] || "/login") : "/login"} replace />
          )
        }
      />

      <Route
        path="/manager/*"
        element={
          userRole === "Manager" ? (
            <ManagerDashboard onSignOut={handleSignOut} userEmail={userEmail} />
          ) : (
            <Navigate to={userRole ? (rolePathMap[userRole] || "/login") : "/login"} replace />
          )
        }
      />

      <Route
        path="/sales/*"
        element={
          userRole === "Sales Person" ? (
            <SalesDashboard onSignOut={handleSignOut} userEmail={userEmail} />
          ) : (
            <Navigate to={userRole ? (rolePathMap[userRole] || "/login") : "/login"} replace />
          )
        }
      />

      <Route
        path="/client/*"
        element={
          userRole === "Client" ? (
            <ClientDashboard onSignOut={handleSignOut} />
          ) : (
            <Navigate to={userRole ? (rolePathMap[userRole] || "/login") : "/login"} replace />
          )
        }
      />

      <Route
        path="*"
        element={
          <Navigate to={userRole ? (rolePathMap[userRole] || "/login") : "/login"} replace />
        }
      />
    </Routes>
  );
}
