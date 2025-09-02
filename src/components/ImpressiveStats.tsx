import { Users, Star, TrendingUp, Shield, Globe, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "50.000+",
    label: "Aktive Experten",
    description: "Qualifizierte Fachkräfte weltweit"
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Kundenbewertung",
    description: "Basierend auf 25.000+ Bewertungen"
  },
  {
    icon: TrendingUp,
    value: "€2.5M+",
    label: "Ausgezahlt",
    description: "An unsere Experten"
  },
  {
    icon: Shield,
    value: "99.8%",
    label: "Erfolgsrate",
    description: "Projekte erfolgreich abgeschlossen"
  }
];

const testimonials = [
  {
    name: "Sarah Schmidt",
    role: "Marketing Director",
    company: "TechStart GmbH",
    content: "Die Qualität der Experten hier ist außergewöhnlich. Mein Projekt wurde in Rekordzeit perfekt umgesetzt.",
    rating: 5
  },
  {
    name: "Michael Weber",
    role: "CEO",
    company: "Weber Consulting",
    content: "Endlich eine Plattform, die hält was sie verspricht. Faire Preise, schnelle Abwicklung, Top-Ergebnisse.",
    rating: 5
  },
  {
    name: "Anna Müller",
    role: "Startup Gründerin",
    company: "InnovateLab",
    content: "Von der ersten Anfrage bis zur Fertigstellung - alles war professionell und transparent.",
    rating: 5
  }
];

const ImpressiveStats = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-primary/5" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Stats Section */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Zahlen</span>{" "}
            <span className="text-foreground">die überzeugen</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Vertrauen Sie auf eine Plattform, die bereits tausende von Projekten erfolgreich vermittelt hat
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="glass-card rounded-3xl p-8 text-center hover-glow group transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary p-4 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-full h-full text-white" />
                </div>
                <div className="text-4xl font-bold gradient-text mb-3">
                  {stat.value}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {stat.label}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Testimonials Section */}
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Was unsere</span>{" "}
            <span className="gradient-text">Kunden sagen</span>
          </h3>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card rounded-3xl p-8 hover-glow transition-all duration-500 hover:scale-105"
              style={{ animationDelay: `${(index + 4) * 0.1}s` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              
              {/* Author */}
              <div className="border-t border-border-glass pt-6">
                <div className="font-semibold text-foreground">
                  {testimonial.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="glass-card rounded-3xl p-12 hover-glow max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-primary p-5">
                <Award className="w-full h-full text-white" />
              </div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-foreground">Werden Sie Teil der</span>{" "}
              <span className="gradient-text">Erfolgsgeschichte</span>
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Schließen Sie sich tausenden zufriedener Kunden an und finden Sie den perfekten Experten für Ihr Projekt
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-primary text-white rounded-2xl font-semibold hover-glow transition-all duration-300 hover:scale-105">
                Projekt starten
              </button>
              <button className="px-8 py-4 glass-card border-border-glass text-foreground rounded-2xl font-semibold hover-glow transition-all duration-300 hover:scale-105">
                Experte werden
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpressiveStats;