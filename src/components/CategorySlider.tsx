import { useState } from "react";
import { ChevronLeft, ChevronRight, Code, Palette, Camera, Megaphone, TrendingUp, Shield, Headphones, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: 1,
    name: "Webentwicklung",
    icon: Code,
    description: "Moderne Websites & Apps",
    services: "2.3k Services",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    name: "Design & Grafik",
    icon: Palette,
    description: "Logo, UI/UX, Branding",
    services: "1.8k Services",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    name: "Fotografie",
    icon: Camera,
    description: "Professionelle Aufnahmen",
    services: "920 Services",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
    name: "Marketing",
    icon: Megaphone,
    description: "SEO, Social Media, Ads",
    services: "1.5k Services",
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: 5,
    name: "Business",
    icon: TrendingUp,
    description: "Beratung & Strategie",
    services: "750 Services",
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    id: 6,
    name: "Cybersecurity",
    icon: Shield,
    description: "Schutz & Sicherheit",
    services: "420 Services",
    gradient: "from-red-500 to-rose-500"
  },
  {
    id: 7,
    name: "Support",
    icon: Headphones,
    description: "Technischer Support",
    services: "650 Services",
    gradient: "from-teal-500 to-green-500"
  },
  {
    id: 8,
    name: "Übersetzung",
    icon: Globe,
    description: "Mehrsprachige Services",
    services: "380 Services",
    gradient: "from-violet-500 to-purple-500"
  }
];

const CategorySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;
  const maxIndex = Math.max(0, categories.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Kategorien</span>{" "}
            <span className="text-foreground">entdecken</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Finden Sie den perfekten Service für Ihr Projekt
          </p>
        </div>

        {/* Slider container */}
        <div className="relative">
          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 glass-card border-border-glass hover-glow"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 glass-card border-border-glass hover-glow"
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Slider */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
              }}
            >
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.id}
                    className="flex-shrink-0 w-1/4 px-3"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="glass-card rounded-3xl p-8 hover-glow cursor-pointer group transition-all duration-300 hover:scale-105 h-full">
                      {/* Icon with gradient background */}
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.gradient} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-full h-full text-white" />
                      </div>
                      
                      {/* Category info */}
                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:gradient-text transition-all duration-300">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {category.description}
                      </p>
                      <div className="text-sm font-semibold text-primary">
                        {category.services}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary w-8' 
                    : 'bg-muted hover:bg-primary/50'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySlider;