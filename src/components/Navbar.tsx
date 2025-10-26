import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, FileText, Map, AlertCircle, User, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import mmcEmblem from "@/assets/mmc-emblem.png";

const navItems = [
  { name: "Home", path: "/dashboard", icon: Home },
  { name: "City Complaints", path: "/city-complaints", icon: FileText },
  { name: "My Complaints", path: "/my-complaints", icon: AlertCircle },
  { name: "City Announcements", path: "/announcements", icon: Megaphone },
  { name: "Explore Mumbai", path: "/explore", icon: Map },
  { name: "Profile", path: "/profile", icon: User },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-card border-b border-border shadow-card sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-3">
            <img src={mmcEmblem} alt="Mumbai ABC Corporation" className="h-10 w-10" />
            <div className="hidden md:block">
              <h1 className="text-lg font-heading font-bold text-foreground">Improve My City</h1>
              <p className="text-xs text-muted-foreground">Mumbai ABC Corporation</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
