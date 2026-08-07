import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import AppRoutes from "@/routes/AppRoutes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "@/components/ui/sonner";

const App: React.FC = () => {
  return (
    <TooltipProvider>
      <AuthProvider>
        <AppProvider>
          <AppRoutes />
          <Toaster position="top-right" />
        </AppProvider>
      </AuthProvider>
    </TooltipProvider>
  );
};

export default App;
