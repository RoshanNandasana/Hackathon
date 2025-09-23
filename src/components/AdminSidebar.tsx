import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  ShieldCheck,
  BarChart2,
  ClipboardList,
  LogOut,
  Menu,
  X,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const adminNavigationItems = [
  {
    title: "Credential Verification",
    url: "/dashboard/credentials",
    icon: ShieldCheck,
  },
  {
    title: "Clinic Performance",
    url: "/dashboard/clinic-analytics",
    icon: BarChart2,
  },
  {
    title: "Site Analytics",
    url: "/dashboard/site-analytics",
    icon: ClipboardList,
  },
];

export const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const getNavClassName = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive(path)
        ? "bg-primary text-primary-foreground shadow-md"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    }`;

  const SidebarContent = () => (
    <>
      {/* Profile Section */}
      <div className="p-6 border-b">
        <NavLink
          to="/admin/credentials"
          className="flex items-center gap-3 hover:opacity-80"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-medium">{user?.name || "Admin"}</p>
            <p className="text-sm text-muted-foreground">Administrator</p>
          </div>
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 flex-1">
        {adminNavigationItems.map((item) => (
          <NavLink key={item.title} to={item.url} className={getNavClassName(item.url)}>
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={logout}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50 bg-background shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-80 bg-card border-r border-border flex-col h-screen">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative flex flex-col w-80 bg-card border-r border-border h-screen">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
};
