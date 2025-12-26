import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  onMenuClick?: () => void;
  showMenu?: boolean;
}

const Navbar = ({ onMenuClick, showMenu = false }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Features", to: "/features" },
    { label: "Pricing", to: "/pricing" },
    { label: "Franchise", to: "/franchise" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">WorkFlow.AI</span>
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

        {/* CTA Buttons */}
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
          
          {/* Mobile menu toggle */}
          {!showMenu && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          )}
          
          <Link to="/login" className="hidden sm:inline-block">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Log In
            </Button>
          </Link>
          
          <Link to="/register">
            <Button size="sm" className="bg-primary hover:bg-primary-dark text-primary-foreground">
              Get Started
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              to="/login" 
              className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors sm:hidden"
              onClick={() => setMobileMenuOpen(false)}
            >
              Log In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
