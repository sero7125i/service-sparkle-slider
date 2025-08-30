import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-muted opacity-50" />
      
      {/* Floating orbs for visual interest */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-700" />
      
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Hero heading with gradient text */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
          <span className="gradient-text">Moderne</span>{" "}
          <span className="text-foreground">Dienstleistungen</span>
          <br />
          <span className="text-foreground">für die</span>{" "}
          <span className="gradient-text">Zukunft</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 animate-fade-in-up max-w-3xl mx-auto leading-relaxed" style={{ animationDelay: '0.2s' }}>
          Entdecken Sie erstklassige Services von verifizierten Experten. 
          Von Design bis Entwicklung – alles an einem Ort.
        </p>
        
        {/* Search bar */}
        <div className="glass-card rounded-2xl p-2 max-w-2xl mx-auto mb-8 animate-fade-in-up hover-glow" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-4">
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search className="w-6 h-6 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Welchen Service suchen Sie?"
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-lg py-4"
              />
            </div>
            <Button size="lg" className="bg-gradient-primary text-primary-foreground px-8 py-4 text-lg font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105">
              Suchen
            </Button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text">10k+</div>
            <div className="text-muted-foreground">Experten</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text">50k+</div>
            <div className="text-muted-foreground">Projekte</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text">98%</div>
            <div className="text-muted-foreground">Zufriedenheit</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;