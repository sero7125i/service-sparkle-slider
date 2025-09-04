import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    title: "Professionelle Expertise",
    subtitle: "Finden Sie den perfekten Experten für Ihr Projekt",
    visual: "💼"
  },
  {
    title: "Schnelle Ergebnisse", 
    subtitle: "Von der Anfrage bis zur Fertigstellung in Rekordzeit",
    visual: "⚡"
  },
  {
    title: "Vertrauenswürdige Qualität",
    subtitle: "Geprüfte Experten mit nachgewiesener Exzellenz",
    visual: "✨"
  }
];

const ProfessionalSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Slider container with fading edges */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          {/* Slider content */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0 px-8">
                  <div className="glass-card rounded-3xl p-12 text-center hover-glow">
                    <div className="text-6xl mb-8 opacity-80">
                      {slide.visual}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      <span className="gradient-text">{slide.title}</span>
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Slide indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Simple CTA */}
        <div className="text-center mt-16">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              Starten Sie Ihr nächstes Projekt heute
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-primary text-primary-foreground hover:shadow-lg transition-all duration-300"
                onClick={() => window.location.href = '/kategorien'}
              >
                Projekt starten
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="hover:shadow-lg transition-all duration-300"
                onClick={() => window.location.href = '/experten'}
              >
                Als Experte anmelden
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalSlider;