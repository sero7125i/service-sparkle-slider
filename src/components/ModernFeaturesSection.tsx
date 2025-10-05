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
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Alle Services</span>
            <span className="text-foreground"> an einem Ort</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Von der Idee bis zur Umsetzung – finde Experten für jeden Bereich deines Projekts
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div 
              key={feature.title} 
              className="bg-card border border-border p-6 rounded-lg hover-glow cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
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