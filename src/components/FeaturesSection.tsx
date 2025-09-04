import { Shield, Zap, Star, Users, Heart, Sparkles } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Sicher & Vertrauensvoll",
    emoji: "🛡️"
  },
  {
    icon: Zap,
    title: "Schnell & Effizient", 
    emoji: "⚡"
  },
  {
    icon: Star,
    title: "Erstklassige Qualität",
    emoji: "⭐"
  },
  {
    icon: Heart,
    title: "Persönlicher Support",
    emoji: "💝"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Simple header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">Einfach</span>{" "}
            <span className="gradient-text">Besser</span>
          </h2>
        </div>

        {/* Visual features grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            return (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 text-center hover-glow animate-fade-in group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.emoji}
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;