import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Shield, Cookie } from "lucide-react";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookie-consent");
    if (!hasConsented) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowConsent(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:max-w-md">
      <Card className="glass-card border-border-glass p-6 shadow-xl">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Cookie className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Cookie-Einstellungen</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={rejectCookies}
            className="h-6 w-6 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Durch die Nutzung unserer Website stimmen Sie unseren Nutzungsbedingungen zu.
          </p>
          
          <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-yellow-700 dark:text-yellow-300">
                <p className="font-medium mb-1">Haftungsausschluss</p>
                <p>
                  Wir übernehmen keine Haftung für Schäden oder Verluste, die durch die Nutzung 
                  unserer Plattform entstehen. Alle Transaktionen erfolgen auf eigene Verantwortung.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={rejectCookies}
              className="flex-1"
            >
              Ablehnen
            </Button>
            <Button
              size="sm"
              onClick={acceptCookies}
              className="flex-1 bg-gradient-primary text-primary-foreground"
            >
              Akzeptieren
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieConsent;