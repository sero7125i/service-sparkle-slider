import { Button } from "@/components/ui/button";
import { Search, Star, Zap, Shield } from "lucide-react";

const ModernHeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent" />
      </div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-2 bg-card/50 px-4 py-2 rounded-lg border border-border">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Verifizierte Experten</span>
          </div>
          <div className="flex items-center gap-2 bg-card/50 px-4 py-2 rounded-lg border border-border">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">4.9★ Bewertung</span>
          </div>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="block text-foreground mb-2">Finden Sie Top</span>
          <span className="block gradient-text mb-2">Freelance Experten</span>
          <span className="block text-foreground">Für Ihr Projekt</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Verbinden Sie sich mit verifizierten Experten in Design, Entwicklung, Marketing und mehr.
        </p>

        {/* Professional Search Interface */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-card border border-border rounded-lg p-2">
            <div className="flex gap-2 flex-col sm:flex-row">
              <input
                type="text"
                placeholder="Suchen Sie nach Services oder Experten..."
                className="flex-1 px-5 py-3 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
              />
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <span>Suchen</span>
                <Zap className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Popular searches */}
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            <span className="text-sm text-muted-foreground">Beliebt:</span>
            {["Logo Design", "Webentwicklung", "SEO", "Content Writing"].map((term) => (
              <button
                key={term}
                className="text-sm px-3 py-1 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Social proof stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-card border border-border p-6 rounded-lg text-center hover-glow">
            <div className="text-3xl font-bold text-primary mb-2">10.000+</div>
            <div className="text-sm text-muted-foreground">Aktive Experten</div>
          </div>
          <div className="bg-card border border-border p-6 rounded-lg text-center hover-glow">
            <div className="text-3xl font-bold text-primary mb-2">50.000+</div>
            <div className="text-sm text-muted-foreground">Abgeschlossene Projekte</div>
          </div>
          <div className="bg-card border border-border p-6 rounded-lg text-center hover-glow">
            <div className="text-3xl font-bold text-primary mb-2">2 Stunden</div>
            <div className="text-sm text-muted-foreground">Durchschnittliche Antwortzeit</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHeroSection;