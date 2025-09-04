import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
              <a href="/experten" className="text-foreground hover:text-primary transition-colors duration-200">
                Experten
              </a>
              <a href="/paypal" className="text-foreground hover:text-primary transition-colors duration-200">
                PayPal
              </a>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/20 text-pink-600 hover:bg-pink-500/20"
                onClick={() => window.open('https://paypal.me', '_blank')}
              >
                💝 Spenden
              </Button>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 h-auto p-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs bg-gradient-primary text-primary-foreground">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-foreground">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-md border-border-glass">
                    <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Profil anzeigen
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />
                      Abmelden
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className="text-foreground hover:text-primary"
                    onClick={() => navigate('/login')}
                  >
                    Anmelden
                  </Button>
                  <Button 
                    className="bg-gradient-primary text-primary-foreground hover:shadow-xl transition-all duration-300"
                    onClick={() => navigate('/register')}
                  >
                    Registrieren
                  </Button>
                </>
              )}
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
                <a href="/experten" className="text-foreground hover:text-primary transition-colors py-2">
                  Experten
                </a>
                <a href="/paypal" className="text-foreground hover:text-primary transition-colors py-2">
                  PayPal
                </a>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/20 text-pink-600 hover:bg-pink-500/20 justify-start"
                  onClick={() => window.open('https://paypal.me', '_blank')}
                >
                  💝 Spenden
                </Button>
                <div className="flex flex-col space-y-3 pt-4 border-t border-border-glass">
                  {user ? (
                    <>
                      <div className="flex items-center space-x-3 px-2 py-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs bg-gradient-primary text-primary-foreground">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-foreground font-medium">{user.name}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="justify-start text-foreground hover:text-primary"
                        onClick={handleProfileClick}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profil anzeigen
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="justify-start text-destructive hover:text-destructive"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Abmelden
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="ghost" 
                        className="justify-start text-foreground hover:text-primary"
                        onClick={() => navigate('/login')}
                      >
                        Anmelden
                      </Button>
                      <Button 
                        className="bg-gradient-primary text-primary-foreground"
                        onClick={() => navigate('/register')}
                      >
                        Registrieren
                      </Button>
                    </>
                  )}
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