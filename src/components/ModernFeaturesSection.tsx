import { Palette, Code, Megaphone, PenTool, Video, Briefcase } from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Webentwicklung",
    description: "Moderne Websites & Apps",
    gradient: "from-primary to-primary-glow"
  },
  {
    icon: Palette,
    title: "Design",
    description: "Kreative Lösungen & Branding",
    gradient: "from-accent to-accent-glow"
  },
  {
    icon: Megaphone,
    title: "Marketing",
    description: "Digitale Reichweite & Growth",
    gradient: "from-primary-glow to-accent"
  },
  {
    icon: PenTool,
    title: "Content",
    description: "Texte & Storytelling",
    gradient: "from-accent-glow to-primary"
  },
  {
    icon: Video,
    title: "Video",
    description: "Motion & Animation",
    gradient: "from-primary to-accent-glow"
  },
  {
    icon: Briefcase,
    title: "Beratung",
    description: "Strategie & Consulting",
    gradient: "from-accent to-primary-glow"
  }
];

const ModernFeaturesSection = () => {
  return (
    <section className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Alle Services</span>
            <span className="text-foreground"> an einem Ort</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Von der Idee bis zur Umsetzung – finde Experten für jeden Bereich deines Projekts
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="glass-card p-8 rounded-2xl hover-glow group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernFeaturesSection;