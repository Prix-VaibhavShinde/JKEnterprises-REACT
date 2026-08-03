import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/AppSidebar";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <SidebarProvider>
      <div className="flex min-h-screen w-full relative">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="fixed top-3 right-3 z-50 md:hidden">
            <SidebarTrigger className="bg-background/80 backdrop-blur border shadow-sm rounded-md h-9 w-9 p-0" />
          </div>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
