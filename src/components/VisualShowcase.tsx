import { Sparkles, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const VisualShowcase = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-primary/5" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Visual Hero */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center animate-pulse">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                ✨
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Entdecken Sie</span>{" "}
            <span className="text-foreground">die Möglichkeiten</span>
          </h2>
        </div>

        {/* Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 - Community */}
          <div className="glass-card rounded-3xl p-8 text-center hover-glow group hover:scale-105 transition-all duration-300">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 text-2xl animate-bounce">👥</div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Starke Community
            </h3>
            <div className="text-3xl">🌟</div>
          </div>

          {/* Card 2 - Speed */}
          <div className="glass-card rounded-3xl p-8 text-center hover-glow group hover:scale-105 transition-all duration-300">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 text-2xl animate-pulse">⚡</div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Blitzschnell
            </h3>
            <div className="text-3xl">🚀</div>
          </div>

          {/* Card 3 - Quality */}
          <div className="glass-card rounded-3xl p-8 text-center hover-glow group hover:scale-105 transition-all duration-300">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 text-2xl animate-spin" style={{ animationDuration: '3s' }}>💎</div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Premium Qualität
            </h3>
            <div className="text-3xl">✨</div>
          </div>
        </div>

        {/* Simple CTA */}
        <div className="text-center">
          <div className="glass-card rounded-3xl p-12 hover-glow max-w-3xl mx-auto">
            <div className="text-6xl mb-6">🎯</div>
            <h3 className="text-3xl font-bold mb-6">
              <span className="gradient-text">Bereit loszulegen?</span>
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-primary text-primary-foreground hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => window.location.href = '/kategorien'}
              >
                🚀 Projekt starten
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => window.location.href = '/experten'}
              >
                👨‍💼 Experte werden
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualShowcase;