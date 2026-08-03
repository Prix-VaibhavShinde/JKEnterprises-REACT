import React from "react";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { Building2, ShieldCheck } from "lucide-react";
import logoImg from "@/assets/prixlogo.png";

const Header: React.FC = () => {
  const { user } = useAuth();
  const firmName = user?.firm || "Prix Partner Firm";
  return (
    <SidebarHeader className="border-b border-sidebar-border/60 p-2 group-data-[collapsible=icon]:p-2">
      <SidebarMenu>
        <SidebarMenuItem className="flex items-center justify-between gap-2">
          <div className="flex items-center justify-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50/80 border border-indigo-100 p-1 dark:bg-indigo-950/30 dark:border-indigo-900/50">
              <img
                src={logoImg}
                alt="Prix Corporation"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="grid text-left text-sm leading-tight min-w-0 group-data-[collapsible=icon]:hidden">
              <span className="truncate font-bold text-sidebar-foreground flex items-center gap-1.5">
                Prix Corporation
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
              </span>
              <span className="truncate text-[11px] text-sidebar-foreground/60 font-medium">
                Enterprise Suite
              </span>
            </div>
          </div>

          <SidebarTrigger className="h-8 w-8 group-data-[collapsible=icon]:hidden text-sidebar-foreground/70 hover:text-sidebar-foreground hidden md:block" />
        </SidebarMenuItem>
      </SidebarMenu>

      <div className="hidden group-data-[state=expanded]:flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-sidebar-accent/50 border border-sidebar-border/40 text-sidebar-accent-foreground">
        <Building2 className="h-4 w-4 text-indigo-500 shrink-0" />
        <span className="text-xs font-semibold tracking-wide truncate">
          {firmName}
        </span>
      </div>
    </SidebarHeader>
  );
};

export default Header;
