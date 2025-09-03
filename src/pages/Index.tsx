import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ServiceSlider from "@/components/ServiceSlider";
import ImpressiveStats from "@/components/ImpressiveStats";
import ImpressumButton from "@/components/ImpressumButton";
import heroImage from "@/assets/hero-collaboration.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero with Image */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Professional collaboration workspace" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-7xl font-bold mb-8">
            <span className="gradient-text">Finden Sie den</span>
            <br />
            <span className="text-foreground">perfekten Experten</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            Verbinden Sie sich mit talentierten Freelancern und Agenturen für alle Ihre Projekte. 
            Von Webentwicklung bis Marketing - hier finden Sie die Expertise, die Sie brauchen.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-gradient-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Projekt starten
            </button>
            <button className="glass-card border-border-glass px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300">
              Als Experte registrieren
            </button>
          </div>
        </div>
      </section>

      {/* Service Slider */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Entdecken Sie</span>
              <span className="text-foreground"> unsere Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Von der Idee bis zur Umsetzung - unsere Experten begleiten Sie bei jedem Schritt
            </p>
          </div>
          
          <ServiceSlider />
        </div>
      </section>

      <ImpressiveStats />
      <ImpressumButton />
    </div>
  );
};

export default Index;
