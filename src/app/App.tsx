import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import AppRoutes from "@/routes/AppRoutes";
import { TooltipProvider } from "@/components/ui/tooltip";

const App: React.FC = () => {
  return (
    <TooltipProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </TooltipProvider>
  );
};

export default App;
