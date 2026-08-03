import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  ChevronsUpDown,
  LogOut,
  Building2,
  Mail,
  ShieldCheck,
  Sun,
  Moon,
} from "lucide-react";

const Footer: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const { resolvedTheme, setTheme } = useTheme();

  // Dynamic user data checks
  const userName = user?.userName || user?.username || "Guest User";
  const userEmail = user?.email || "no-email@firm.com";
  const firmName = user?.firm || "Prix Partner Firm";
  const userRole = user?.role || "User";

  // Active theme states
  const isDarkMode = resolvedTheme === "dark";

  // Helper to generate initials for Avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <SidebarFooter className="border-t border-sidebar-border p-2">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:!p-0"
                tooltip="User Account"
              >
                {/* User Avatar */}
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs rounded-lg">
                    {getInitials(userName)}
                  </AvatarFallback>
                </Avatar>

                {/* User Details */}
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-semibold text-sidebar-foreground">
                    {userName}
                  </span>
                  <span className="truncate text-xs text-muted-foreground flex items-center gap-1">
                    <span className="truncate">{firmName}</span>
                  </span>
                </div>

                <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50 group-data-[collapsible=icon]:hidden" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            {/* Dropdown Menu Popup */}
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg p-1.5 shadow-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={8}
            >
              {/* Profile Header */}
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-3 p-2 text-left text-sm">
                  <Avatar className="h-9 w-9 rounded-lg">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm rounded-lg">
                      {getInitials(userName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-foreground">
                      {userName}
                    </span>
                    <span className="truncate text-xs text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3 shrink-0" />
                      {userEmail}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              {/* Extra Metadata Section */}
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-default text-xs text-muted-foreground focus:bg-transparent">
                  <Building2 className="mr-2 h-3.5 w-3.5" />
                  <span className="truncate">Firm: {firmName}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-default text-xs text-muted-foreground focus:bg-transparent">
                  <ShieldCheck className="mr-2 h-3.5 w-3.5" />
                  <span>Role: {userRole}</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              {/* Theme Toggle Section with Switch */}
              <DropdownMenuItem
                className="flex items-center justify-between cursor-pointer py-2 focus:bg-sidebar-accent"
                onSelect={(e) => {
                  // Prevents the dropdown menu from closing when toggling
                  e.preventDefault();
                  toggleTheme();
                }}
              >
                <div className="flex items-center gap-2">
                  {isDarkMode ? (
                    <Moon className="h-4 w-4 text-indigo-400" />
                  ) : (
                    <Sun className="h-4 w-4 text-amber-500" />
                  )}
                  <span className="text-sm font-medium">
                    {isDarkMode ? "Dark Mode" : "Light Mode"}
                  </span>
                </div>
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={toggleTheme}
                  aria-label="Toggle Theme"
                />
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Logout Action */}
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer font-medium"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default Footer;
