import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  onMenuClick?: () => void;
  showMenu?: boolean;
}

const Navbar = ({ onMenuClick, showMenu = false }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Projects", to: "/projects" },
    { label: "Franchises", to: "/franchise" },
    { label: "Reports", to: "/reports" },
    { label: "Settings", to: "/settings" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-base font-medium">
          Workflow
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {showMenu && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="md:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}

          {!showMenu && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          )}

          <Link to="/login" className="hidden sm:inline-block">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>

          <Link to="/register">
            <Button size="sm">
              Create account
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="container mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              className="block py-2 text-sm text-muted-foreground hover:text-foreground sm:hidden"
              onClick={() => setMobileMenuOpen(false)}
            >
              Log in
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
