import { Button } from "@/components/ui/button";
import { Search, Star, Zap, Shield } from "lucide-react";

const ModernHeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-2/3 left-1/2 w-64 h-64 bg-primary-glow/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
      
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Trust indicators */}
        <div className="flex justify-center items-center gap-6 mb-8 animate-fade-in">
          <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Verifizierte Experten</span>
          </div>
          <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
            <Star className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">4.9★ Bewertung</span>
          </div>
        </div>

        {/* Main headline */}
        <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fade-in-up">
          <span className="gradient-text block">Finde den</span>
          <span className="text-foreground block">perfekten</span>
          <span className="gradient-text block">Experten</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 animate-fade-in-up max-w-4xl mx-auto leading-relaxed" style={{ animationDelay: '0.2s' }}>
          Verbinde dich mit 10.000+ verifizierten Freelancern und bringe deine Projekte zum Erfolg
        </p>
        
        {/* Modern search interface */}
        <div className="max-w-3xl mx-auto mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="glass-card rounded-3xl p-3 hover-glow">
            <div className="flex items-center gap-4">
              <div className="flex-1 flex items-center gap-4 px-6">
                <Search className="w-6 h-6 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Was suchst du? z.B. Logo Design, Website, Marketing..."
                  className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-lg py-6"
                />
              </div>
              <Button size="lg" className="bg-gradient-primary text-primary-foreground px-10 py-6 text-lg font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl">
                <Zap className="w-5 h-5 mr-2" />
                Suchen
              </Button>
            </div>
          </div>
          
          {/* Popular searches */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <span className="text-muted-foreground text-sm">Beliebt:</span>
            {["Logo Design", "Website", "App Development", "SEO", "Content"].map((term) => (
              <button key={term} className="glass-card px-4 py-2 rounded-full text-sm hover:text-primary transition-colors">
                {term}
              </button>
            ))}
          </div>
        </div>
        
        {/* Social proof */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="glass-card p-8 rounded-2xl hover-glow">
            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">10k+</div>
            <div className="text-muted-foreground">Aktive Experten</div>
            <div className="text-xs text-muted-foreground mt-1">Täglich online</div>
          </div>
          <div className="glass-card p-8 rounded-2xl hover-glow">
            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">50k+</div>
            <div className="text-muted-foreground">Projekte abgeschlossen</div>
            <div className="text-xs text-muted-foreground mt-1">Letzten 12 Monate</div>
          </div>
          <div className="glass-card p-8 rounded-2xl hover-glow">
            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">24h</div>
            <div className="text-muted-foreground">Durchschnittliche Antwortzeit</div>
            <div className="text-xs text-muted-foreground mt-1">Oder schneller</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHeroSection;