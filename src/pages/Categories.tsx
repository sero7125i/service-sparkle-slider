import { useState, useEffect } from "react";
import { Search, Filter, MapPin, Star, Clock, Euro, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import TaskApplicationModal from "@/components/TaskApplicationModal";

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

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  budget: string;
  duration: string;
  requirements: string;
  createdAt: string;
  status: string;
}

const Categories = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Lade Tasks aus localStorage
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
    setFilteredTasks(savedTasks);
  }, []);

  useEffect(() => {
    // Filter Tasks basierend auf Suchkriterien
    let filtered = tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = !locationFilter || 
                             task.location.toLowerCase().includes(locationFilter.toLowerCase());
      
      const matchesPrice = !maxPrice || 
                          (task.budget && extractMaxPrice(task.budget) <= parseInt(maxPrice));

      return matchesSearch && matchesLocation && matchesPrice;
    });
    
    setFilteredTasks(filtered);
  }, [tasks, searchTerm, locationFilter, maxPrice]);

  const extractMaxPrice = (budget: string): number => {
    const numbers = budget.match(/\d+/g);
    if (!numbers) return 0;
    return Math.max(...numbers.map(Number));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE');
  };

  const handleApplyToTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background/50 border-border-glass"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Ort eingeben..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="pl-10 bg-background/50 border-border-glass"
                  />
                </div>
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Max. Preis"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
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

      {/* Available Tasks Section */}
      {filteredTasks.length > 0 && (
        <section className="pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Verfügbare Aufgaben
              </h2>
              <p className="text-muted-foreground">
                {filteredTasks.length} Aufgabe{filteredTasks.length !== 1 ? 'n' : ''} gefunden
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTasks.map((task) => (
                <Card key={task.id} className="glass-card border-border-glass hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {task.title}
                        </h3>
                        <Badge variant="secondary" className="mb-3">
                          {task.category}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          €{task.budget || "Verhandelbar"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {task.duration || "Flexibel"}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {task.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      {task.location && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {task.location}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(task.createdAt)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {task.status === "open" ? "Offen" : "Geschlossen"}
                      </div>
                    </div>
                    
                    {task.requirements && (
                      <div className="mb-4">
                        <h4 className="font-medium text-foreground mb-2">Anforderungen:</h4>
                        <p className="text-sm text-muted-foreground">
                          {task.requirements}
                        </p>
                      </div>
                    )}
                    
                    <Button 
                      onClick={() => handleApplyToTask(task)}
                      className="w-full bg-gradient-primary text-primary-foreground hover:shadow-lg transition-all duration-300"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Bewerben
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Service Kategorien
            </h2>
            <p className="text-muted-foreground">
              Entdecken Sie alle verfügbaren Service-Kategorien
            </p>
          </div>
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

      {/* Task Application Modal */}
      <TaskApplicationModal 
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Categories;