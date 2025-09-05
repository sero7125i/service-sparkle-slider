import Navigation from "@/components/Navigation";

const Impressum = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/50">
      <Navigation />
      <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto">
        <div className="glass-card p-8 rounded-2xl">
          <h1 className="text-3xl font-bold mb-8 gradient-text">Impressum</h1>
          
          <div className="space-y-6 text-foreground/80">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Angaben gemäß § 5 TMG</h2>
              <p>
                [Firmenname]<br />
                [Straße und Hausnummer]<br />
                [PLZ und Ort]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Vertreten durch</h2>
              <p>[Name des Vertretungsberechtigten]</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Kontakt</h2>
              <p>
                Telefon: [Telefonnummer]<br />
                E-Mail: [E-Mail-Adresse]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Registereintrag</h2>
              <p>
                Eintragung im Handelsregister.<br />
                Registergericht: [Registergericht]<br />
                Registernummer: [Registernummer]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Umsatzsteuer-ID</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                [USt-IdNr.]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Haftungsausschluss</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground">Haftung für Inhalte</h3>
                  <p className="text-sm">
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">Haftung für Links</h3>
                  <p className="text-sm">
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">Urheberrecht</h3>
                  <p className="text-sm">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impressum;