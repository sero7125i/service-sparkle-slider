import { Shield, Zap, Star } from "lucide-react";

const features = [
  {
    title: "Sicher & Vertrauensvoll",
    icon: Shield
  },
  {
    title: "Schnell & Effizient", 
    icon: Zap
  },
  {
    title: "Erstklassige Qualität",
    icon: Star
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Clean header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-foreground">Warum</span>{" "}
            <span className="gradient-text">ServiceHub</span>
          </h2>
        </div>

        {/* Minimal features */}
        <div className="flex justify-center">
          <div className="glass-card rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-center md:text-left"
                  >
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-foreground">
                      {feature.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;