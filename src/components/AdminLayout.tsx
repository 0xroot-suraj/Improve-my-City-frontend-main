import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Clock, CheckCircle2, Megaphone, User, AlertCircle, List } from "lucide-react";
import mmcEmblem from "@/assets/mmc-emblem.png";

const navItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: Home },
  { name: "All Complaints", path: "/admin/complaints", icon: List },
  { name: "Pending Issues", path: "/admin/pending", icon: AlertCircle },
  { name: "In Progress", path: "/admin/in-progress", icon: Clock },
  { name: "Resolved", path: "/admin/resolved", icon: CheckCircle2 },
  { name: "Announcements", path: "/admin/announcements", icon: Megaphone },
  { name: "Profile", path: "/admin/profile", icon: User },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary border-b border-border shadow-card sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 h-16">
            {/* Logo and Title */}
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <img src={mmcEmblem} alt="Mumbai ABC Corporation" className="h-10 w-10" />
              <div>
                <h1 className="text-lg font-heading font-bold text-primary-foreground">
                  Admin Portal
                </h1>
                <p className="text-xs text-primary-foreground/80">Improve My City</p>
              </div>
            </Link>

            {/* Navigation Tabs */}
            <nav className="flex items-center gap-1 overflow-x-auto flex-1 justify-end">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 animate-fade-in">
        {children}
      </main>
    </div>
  );
}
