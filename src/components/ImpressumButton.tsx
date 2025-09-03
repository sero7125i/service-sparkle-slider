import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Info } from "lucide-react";

const ImpressumButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size="sm"
        variant="ghost"
        className="fixed bottom-4 right-4 z-40 glass-card border-border-glass hover:shadow-lg transition-all duration-300 px-3 py-2"
      >
        <Info className="w-4 h-4" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Impressum</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Angaben gemäß § 5 TMG</h3>
              <p className="text-muted-foreground">
                ServiceHub GmbH<br />
                Musterstraße 123<br />
                12345 Musterstadt<br />
                Deutschland
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Kontakt</h3>
              <p className="text-muted-foreground">
                Telefon: +49 (0) 123 456789<br />
                E-Mail: info@servicehub.de
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Registereintrag</h3>
              <p className="text-muted-foreground">
                Eintragung im Handelsregister<br />
                Registergericht: Amtsgericht Musterstadt<br />
                Registernummer: HRB 12345
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Umsatzsteuer-ID</h3>
              <p className="text-muted-foreground">
                Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
                DE123456789
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
              <p className="text-muted-foreground">
                Max Mustermann<br />
                Musterstraße 123<br />
                12345 Musterstadt
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Haftungsausschluss</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>Haftung für Inhalte:</strong> Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.</p>
                <p><strong>Haftung für Links:</strong> Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.</p>
                <p><strong>Urheberrecht:</strong> Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImpressumButton;