import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  LayoutDashboard,
  Database,
  Building,
  Users,
  UserCheck,
  Package,
  Receipt,
  FileSpreadsheet,
  FileCheck,
  FileText,
  BarChart3,
  ChevronRight,
  ClipboardList,
} from "lucide-react";

const Content: React.FC = () => {
  const { pathname } = useLocation();
  const isSubActive = (path: string) => pathname === path;
  const isGroupActive = (prefix: string) => pathname.startsWith(prefix);

  return (
    <SidebarContent className="">
      {/* ---------------- SECTION 1: DASHBOARD ---------------- */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-[11px] font-semibold tracking-wider text-sidebar-foreground/60 uppercase">
          Overview
        </SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard"}
              tooltip="Dashboard"
            >
              <NavLink
                to="/dashboard"
                className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      {/* ---------------- SECTION 2: MASTER ---------------- */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-[11px] font-semibold tracking-wider text-sidebar-foreground/60 uppercase">
          Management
        </SidebarGroupLabel>
        <SidebarMenu>
          <Collapsible
            asChild
            defaultOpen={isGroupActive("/master")}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip="Master"
                  isActive={isGroupActive("/master")}
                >
                  <Database className="h-4 w-4 text-indigo-500" />
                  <span>Master</span>
                  <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {/* Company */}
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      isActive={isSubActive("/master/company")}
                    >
                      <NavLink
                        to="/master/company"
                        className="flex items-center gap-3"
                      >
                        <Building className="h-3.5 w-3.5" />
                        <span>Company</span>
                      </NavLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>

                  {/* Customer */}
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      isActive={isSubActive("/master/customer")}
                    >
                      <NavLink
                        to="/master/customer"
                        className="flex items-center gap-3"
                      >
                        <Users className="h-3.5 w-3.5" />
                        <span>Customer</span>
                      </NavLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>

                  {/* Employee */}
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      isActive={isSubActive("/master/employee")}
                    >
                      <NavLink
                        to="/master/employee"
                        className="flex items-center gap-3"
                      >
                        <UserCheck className="h-3.5 w-3.5" />
                        <span>Employee</span>
                      </NavLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>

                  {/* Raw Material */}
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      isActive={isSubActive("/master/raw_material")}
                    >
                      <NavLink
                        to="/master/raw_material"
                        className="flex items-center gap-3"
                      >
                        <Package className="h-3.5 w-3.5" />
                        <span>Raw Material</span>
                      </NavLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          {/* ---------------- SECTION 3: TRANSACTION ---------------- */}
          <Collapsible
            asChild
            defaultOpen={isGroupActive("/transaction")}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip="Transaction"
                  isActive={isGroupActive("/transaction")}
                >
                  <Receipt className="h-4 w-4 text-emerald-500" />
                  <span>Transaction</span>
                  <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {/* Attendance */}
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      isActive={isSubActive("/transaction/attendance")}
                    >
                      <NavLink
                        to="/transaction/attendance"
                        className="flex items-center gap-3"
                      >
                        <ClipboardList className="h-3.5 w-3.5" />
                        <span>Attendance</span>
                      </NavLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>

                  {/* Employee Invoice */}
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      isActive={isSubActive("/transaction/employee_invoice")}
                    >
                      <NavLink
                        to="/transaction/employee_invoice"
                        className="flex items-center gap-3"
                      >
                        <FileSpreadsheet className="h-3.5 w-3.5" />
                        <span>Employee Invoice</span>
                      </NavLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>

                  {/* Tendor */}
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      isActive={isSubActive("/transaction/tendor")}
                    >
                      <NavLink
                        to="/transaction/tendor"
                        className="flex items-center gap-3"
                      >
                        <FileCheck className="h-3.5 w-3.5" />
                        <span>Tendor</span>
                      </NavLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>

                  {/* Sale Invoice */}
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      isActive={isSubActive("/transaction/sale_invoice")}
                    >
                      <NavLink
                        to="/transaction/sale_invoice"
                        className="flex items-center gap-3"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        <span>Sale Invoice</span>
                      </NavLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          {/* ---------------- SECTION 4: REPORT ---------------- */}
          <Collapsible
            asChild
            defaultOpen={isGroupActive("/report")}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip="Report"
                  isActive={isGroupActive("/report")}
                >
                  <BarChart3 className="h-4 w-4 text-amber-500" />
                  <span>Report</span>
                  <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {/* Attendance Report */}
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      isActive={isSubActive("/report/attendance")}
                    >
                      <NavLink
                        to="/report/attendance"
                        className="flex items-center gap-3"
                      >
                        <ClipboardList className="h-3.5 w-3.5" />
                        <span>Attendance</span>
                      </NavLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default Content;
