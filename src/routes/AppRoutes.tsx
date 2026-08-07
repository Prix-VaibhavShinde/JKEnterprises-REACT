import React from "react";
import { Routes, Route } from "react-router-dom";

// Standard Pages
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";

// Master Pages
import CompanyHeader from "@/pages/company/CompanyHeader";
import Customer from "@/pages/Customer";
import Employee from "@/pages/Employee";

// Route Guards
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import CustomerHeader from "@/pages/customer/CustomerHeader";

// Temporary fallback component for unbuilt pages
const PagePlaceholder: React.FC<{ title: string }> = ({ title }) => (
  <div className="p-6">
    <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
    <p className="text-muted-foreground mt-2">
      This page is currently under development.
    </p>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* ---------------- PUBLIC ROUTES ---------------- */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* ---------------- PROTECTED ROUTES ---------------- */}
      <Route element={<ProtectedRoute />}>
        {/* Overview */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Section 2: Master Management */}
        <Route path="/master">
          <Route path="company" element={<CompanyHeader />} />
          <Route path="customer" element={<CustomerHeader />} />
          <Route path="employee" element={<Employee />} />
          <Route
            path="raw_material"
            element={<PagePlaceholder title="Raw Material Master" />}
          />
        </Route>

        {/* Section 3: Transactions */}
        <Route path="/transaction">
          <Route
            path="attendance"
            element={<PagePlaceholder title="Attendance Transaction" />}
          />
          <Route
            path="employee_invoice"
            element={<PagePlaceholder title="Employee Invoice" />}
          />
          <Route
            path="tendor"
            element={<PagePlaceholder title="Tender Management" />}
          />
          <Route
            path="sale_invoice"
            element={<PagePlaceholder title="Sale Invoice" />}
          />
        </Route>

        {/* Section 4: Reports */}
        <Route path="/report">
          <Route
            path="attendance"
            element={<PagePlaceholder title="Attendance Report" />}
          />
        </Route>
      </Route>

      {/* ---------------- 404 CATCH-ALL ---------------- */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
