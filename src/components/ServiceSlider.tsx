import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight, Users, TrendingUp, Clock } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Webentwicklung & Design",
    description: "Professionelle Websites und Web-Anwendungen von erfahrenen Entwicklern",
    icon: "💻",
    rating: 4.9,
    projects: 234,
    category: "Entwicklung",
    trending: true
  },
  {
    id: 2,
    title: "Marketing & SEO",
    description: "Steigern Sie Ihre Reichweite mit gezielten Marketing-Strategien",
    icon: "📈",
    rating: 4.8,
    projects: 187,
    category: "Marketing",
    trending: true
  },
  {
    id: 3,
    title: "Grafikdesign",
    description: "Kreative Designs für Ihre Marke - von Logos bis hin zu kompletten Corporate Designs",
    icon: "🎨",
    rating: 4.9,
    projects: 156,
    category: "Design",
    trending: false
  },
  {
    id: 4,
    title: "Content Creation",
    description: "Hochwertige Texte und Inhalte für Ihre Online-Präsenz",
    icon: "✍️",
    rating: 4.7,
    projects: 203,
    category: "Content",
    trending: true
  },
  {
    id: 5,
    title: "Video Produktion",
    description: "Professionelle Video-Inhalte für Marketing und Unternehmenskommunikation",
    icon: "🎬",
    rating: 4.8,
    projects: 98,
    category: "Video",
    trending: false
  },
  {
    id: 6,
    title: "Business Beratung",
    description: "Strategische Beratung für Ihr Unternehmenswachstum",
    icon: "💼",
    rating: 4.9,
    projects: 145,
    category: "Beratung",
    trending: true
  }
];

const ServiceSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const visibleServices = [
    services[currentIndex],
    services[(currentIndex + 1) % services.length],
    services[(currentIndex + 2) % services.length]
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Fade overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div className="flex transition-all duration-1000 ease-in-out gap-6">
        {visibleServices.map((service, index) => (
          <Card 
            key={`${service.id}-${currentIndex}-${index}`}
            className={`
              glass-card border-border-glass hover:shadow-xl transition-all duration-700 flex-shrink-0 w-80 group cursor-pointer
              ${index === 1 ? 'scale-105 shadow-lg' : 'scale-95 opacity-75'}
            `}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <div className="flex items-center gap-2">
                  {service.trending && (
                    <Badge variant="secondary" className="bg-orange-500/20 text-orange-600 border-orange-500/30">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                  <Badge variant="outline">
                    {service.category}
                  </Badge>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                {service.description}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium text-foreground">{service.rating}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="w-4 h-4 mr-1" />
                    {service.projects}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Indicators */}
      <div className="flex justify-center mt-8 gap-2">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${index === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30'}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceSlider;