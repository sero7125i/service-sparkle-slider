import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { MapPin, Euro, Clock, Plus, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const categories = [
  "Webentwicklung",
  "Grafikdesign", 
  "Digital Marketing",
  "Content Writing",
  "Video Editing",
  "Beratung",
  "Übersetzung",
  "Fotografie"
];

const Services = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    budget: "",
    duration: "",
    requirements: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Pflichtfelder aus.",
        variant: "destructive"
      });
      return;
    }

    // Erstelle neue Task
    const newTask = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
      status: "open"
    };

    // Speichere in localStorage (temporär bis Supabase aktiviert ist)
    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = [...existingTasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    toast({
      title: "Erfolg!",
      description: "Ihre Aufgabe wurde erfolgreich erstellt.",
    });

    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      location: "",
      budget: "",
      duration: "",
      requirements: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Service</span>
            <span className="text-foreground"> erstellen</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Beschreiben Sie Ihr Projekt und finden Sie den perfekten Experten für Ihre Aufgabe
          </p>
        </div>
      </section>

      {/* Task Creation Form */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card border-border-glass p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground flex items-center">
                  <Plus className="w-6 h-6 mr-3 text-primary" />
                  Projekt Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Projekttitel *</Label>
                    <Input
                      id="title"
                      placeholder="z.B. Moderne Website für Startup"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="bg-background/50 border-border-glass"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategorie *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className="bg-background/50 border-border-glass">
                        <SelectValue placeholder="Kategorie wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Projektbeschreibung *</Label>
                  <Textarea
                    id="description"
                    placeholder="Beschreiben Sie Ihr Projekt im Detail..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="bg-background/50 border-border-glass"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-primary" />
                  Zusätzliche Informationen
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Standort
                    </Label>
                    <Input
                      id="location"
                      placeholder="z.B. Berlin, Remote"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="bg-background/50 border-border-glass"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="flex items-center">
                      <Euro className="w-4 h-4 mr-2" />
                      Budget (€)
                    </Label>
                    <Input
                      id="budget"
                      placeholder="z.B. 500-1500"
                      value={formData.budget}
                      onChange={(e) => handleInputChange("budget", e.target.value)}
                      className="bg-background/50 border-border-glass"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Zeitrahmen
                    </Label>
                    <Input
                      id="duration"
                      placeholder="z.B. 2-4 Wochen"
                      value={formData.duration}
                      onChange={(e) => handleInputChange("duration", e.target.value)}
                      className="bg-background/50 border-border-glass"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Besondere Anforderungen</Label>
                  <Textarea
                    id="requirements"
                    placeholder="Spezielle Fähigkeiten, Technologien oder Anforderungen..."
                    rows={3}
                    value={formData.requirements}
                    onChange={(e) => handleInputChange("requirements", e.target.value)}
                    className="bg-background/50 border-border-glass"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-border-glass">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary text-primary-foreground hover:shadow-xl transition-all duration-300 py-6 text-lg"
                >
                  Projekt erstellen und Experten finden
                </Button>
              </div>
            </form>
          </Card>

          {/* Info Section */}
          <div className="mt-12 glass-card rounded-2xl p-8 border-border-glass">
            <h3 className="text-xl font-bold text-foreground mb-4">So funktioniert's</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary-foreground font-bold">1</span>
                </div>
                <h4 className="font-semibold text-foreground">Projekt beschreiben</h4>
                <p className="text-muted-foreground text-sm">Teilen Sie uns mit, was Sie benötigen</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary-foreground font-bold">2</span>
                </div>
                <h4 className="font-semibold text-foreground">Angebote erhalten</h4>
                <p className="text-muted-foreground text-sm">Qualifizierte Experten melden sich bei Ihnen</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary-foreground font-bold">3</span>
                </div>
                <h4 className="font-semibold text-foreground">Experten wählen</h4>
                <p className="text-muted-foreground text-sm">Wählen Sie den besten Kandidaten aus</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;