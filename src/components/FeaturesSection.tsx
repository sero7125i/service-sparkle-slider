import { Shield, Zap, Star, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Sicher",
    description: "Alle Zahlungen sind durch modernste Verschlüsselung geschützt"
  },
  {
    icon: Zap,
    title: "Blitzschnell",
    description: "Projekte starten in unter 24 Stunden mit sofortiger Kommunikation"
  },
  {
    icon: Star,
    title: "Top Qualität",
    description: "Nur verifizierte Experten mit nachgewiesener Exzellenz"
  },
  {
    icon: Users,
    title: "24/7 Support",
    description: "Unser Team steht Ihnen rund um die Uhr zur Verfügung"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Warum</span>{" "}
            <span className="gradient-text">ServiceHub</span>
            <span className="text-foreground">?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Die moderne Plattform für erstklassige Dienstleistungen
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="glass-card rounded-3xl p-8 text-center hover-glow animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;