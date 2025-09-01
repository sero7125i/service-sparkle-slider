import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Settings, LogOut } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-2xl px-6 py-4 border-border-glass">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="text-2xl font-bold hover:opacity-80 transition-opacity duration-200">
              <span className="gradient-text">Service</span>
              <span className="text-foreground">Hub</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/services" className="text-foreground hover:text-primary transition-colors duration-200">
                Services
              </a>
              <a href="/kategorien" className="text-foreground hover:text-primary transition-colors duration-200">
                Kategorien
              </a>
              <a href="#experten" className="text-foreground hover:text-primary transition-colors duration-200">
                Experten
              </a>
              <a href="#preise" className="text-foreground hover:text-primary transition-colors duration-200">
                Preise
              </a>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Anmelden
              </Button>
              <Button className="bg-gradient-primary text-primary-foreground hover:shadow-xl transition-all duration-300">
                Registrieren
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-6 pt-6 border-t border-border-glass animate-fade-in">
              <div className="flex flex-col space-y-4">
                <a href="/services" className="text-foreground hover:text-primary transition-colors py-2">
                  Services
                </a>
                <a href="/kategorien" className="text-foreground hover:text-primary transition-colors py-2">
                  Kategorien
                </a>
                <a href="#experten" className="text-foreground hover:text-primary transition-colors py-2">
                  Experten
                </a>
                <a href="#preise" className="text-foreground hover:text-primary transition-colors py-2">
                  Preise
                </a>
                <div className="flex flex-col space-y-3 pt-4 border-t border-border-glass">
                  <Button variant="ghost" className="justify-start text-foreground hover:text-primary">
                    Anmelden
                  </Button>
                  <Button className="bg-gradient-primary text-primary-foreground">
                    Registrieren
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;