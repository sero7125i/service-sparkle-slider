import { Search, Filter, MapPin, Star, Clock, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const categories = [
  {
    id: 1,
    name: "Webentwicklung",
    description: "Frontend, Backend & Full-Stack Entwicklung",
    icon: "💻",
    jobCount: 234,
    avgPrice: "150-300",
    rating: 4.8
  },
  {
    id: 2,
    name: "Grafikdesign",
    description: "Logos, Branding & visuelle Identität",
    icon: "🎨",
    jobCount: 187,
    avgPrice: "80-200",
    rating: 4.9
  },
  {
    id: 3,
    name: "Digital Marketing",
    description: "SEO, Social Media & Online Werbung",
    icon: "📈",
    jobCount: 156,
    avgPrice: "100-250",
    rating: 4.7
  },
  {
    id: 4,
    name: "Content Writing",
    description: "Texterstellung & Content Strategy",
    icon: "✍️",
    jobCount: 203,
    avgPrice: "50-150",
    rating: 4.6
  },
  {
    id: 5,
    name: "Video Editing",
    description: "Schnitt, Animation & Post-Production",
    icon: "🎬",
    jobCount: 98,
    avgPrice: "120-280",
    rating: 4.8
  },
  {
    id: 6,
    name: "Beratung",
    description: "Business & Strategieberatung",
    icon: "💼",
    jobCount: 145,
    avgPrice: "200-500",
    rating: 4.9
  }
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Service</span>
            <span className="text-foreground"> Kategorien</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Entdecken Sie unsere vielfältigen Service-Kategorien und finden Sie den perfekten Experten für Ihr Projekt
          </p>
          
          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-6 rounded-2xl border-border-glass">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Service suchen..."
                    className="pl-10 bg-background/50 border-border-glass"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Ort eingeben..."
                    className="pl-10 bg-background/50 border-border-glass"
                  />
                </div>
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Max. Preis"
                    className="pl-10 bg-background/50 border-border-glass"
                  />
                </div>
                <Button className="bg-gradient-primary text-primary-foreground hover:shadow-xl transition-all duration-300">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtern
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={category.id} className="glass-card border-border-glass hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <div className="p-8">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {category.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Verfügbare Jobs:</span>
                      <span className="font-semibold text-foreground">{category.jobCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Durchschnittspreis:</span>
                      <span className="font-semibold text-primary">€{category.avgPrice}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Bewertung:</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-semibold text-foreground">{category.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-primary text-primary-foreground hover:shadow-lg transition-all duration-300">
                    Kategorie erkunden
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-2xl p-12 border-border-glass text-center">
            <h2 className="text-3xl font-bold text-foreground mb-12">
              Warum ServiceHub wählen?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="text-4xl font-bold gradient-text">1000+</div>
                <div className="text-muted-foreground">Aktive Projekte</div>
              </div>
              <div className="space-y-4">
                <div className="text-4xl font-bold gradient-text">500+</div>
                <div className="text-muted-foreground">Verifizierte Experten</div>
              </div>
              <div className="space-y-4">
                <div className="text-4xl font-bold gradient-text">4.8★</div>
                <div className="text-muted-foreground">Durchschnittsbewertung</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;