import { useState, useEffect } from "react";
import { Search, Filter, MapPin, Star, Clock, Euro, Calendar, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import TaskApplicationModal from "@/components/TaskApplicationModal";
import TaskCreationModal from "@/components/TaskCreationModal";
import { useAuth } from "@/contexts/AuthContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  createdBy?: string;
  status: string;
  images?: string[];
}

const Categories = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [myTasks, setMyTasks] = useState<Task[]>([]);
  const [otherTasks, setOtherTasks] = useState<Task[]>([]);
  const [tasksByCategory, setTasksByCategory] = useState<Record<string, Task[]>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    // Lade Tasks aus localStorage
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
    
    // Teile Tasks in eigene und fremde auf
    if (user) {
      const mine = savedTasks.filter((task: Task) => task.createdBy === user.id);
      const others = savedTasks.filter((task: Task) => task.createdBy !== user.id);
      
      setMyTasks(mine);
      setOtherTasks(others);
      
      // Gruppiere fremde Tasks nach Kategorie
      const grouped: Record<string, Task[]> = {};
      others.forEach((task: Task) => {
        if (!grouped[task.category]) {
          grouped[task.category] = [];
        }
        grouped[task.category].push(task);
      });
      setTasksByCategory(grouped);
    } else {
      setMyTasks([]);
      setOtherTasks(savedTasks);
      
      // Gruppiere alle Tasks nach Kategorie wenn nicht eingeloggt
      const grouped: Record<string, Task[]> = {};
      savedTasks.forEach((task: Task) => {
        if (!grouped[task.category]) {
          grouped[task.category] = [];
        }
        grouped[task.category].push(task);
      });
      setTasksByCategory(grouped);
    }
  }, [user]);

  useEffect(() => {
    // Filter anwenden
    const tasksToFilter = user ? otherTasks : tasks;
    let filtered = tasksToFilter.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = !locationFilter || 
                             task.location.toLowerCase().includes(locationFilter.toLowerCase());
      
      const matchesPrice = !maxPrice || 
                          (task.budget && extractMaxPrice(task.budget) <= parseInt(maxPrice));

      return matchesSearch && matchesLocation && matchesPrice;
    });
    
    // Update tasksByCategory mit gefilterten Tasks
    const grouped: Record<string, Task[]> = {};
    filtered.forEach((task: Task) => {
      if (!grouped[task.category]) {
        grouped[task.category] = [];
      }
      grouped[task.category].push(task);
    });
    setTasksByCategory(grouped);
  }, [otherTasks, tasks, searchTerm, locationFilter, maxPrice, user]);

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

  const handleTaskCreated = () => {
    // Reload tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
    
    // Re-split tasks
    if (user) {
      const mine = savedTasks.filter((task: Task) => task.createdBy === user.id);
      const others = savedTasks.filter((task: Task) => task.createdBy !== user.id);
      
      setMyTasks(mine);
      setOtherTasks(others);
      
      // Gruppiere fremde Tasks nach Kategorie
      const grouped: Record<string, Task[]> = {};
      others.forEach((task: Task) => {
        if (!grouped[task.category]) {
          grouped[task.category] = [];
        }
        grouped[task.category].push(task);
      });
      setTasksByCategory(grouped);
    }
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
              
              <div className="text-center mt-6">
                <Button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-gradient-secondary text-secondary-foreground hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Neue Aufgabe erstellen
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Tasks Section */}
      {user && myTasks.length > 0 && (
        <section className="pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Meine Aufgaben
              </h2>
              <p className="text-muted-foreground">
                {myTasks.length} eigene Aufgabe{myTasks.length !== 1 ? 'n' : ''}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {myTasks.map((task) => (
                <TaskCard key={task.id} task={task} onApply={handleApplyToTask} formatDate={formatDate} showApplyButton={false} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Tasks by Category */}
      {Object.keys(tasksByCategory).length > 0 && (
        <section className="pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {user ? "Verfügbare Aufgaben" : "Alle Aufgaben"}
              </h2>
              <p className="text-muted-foreground">
                Nach Kategorien sortiert
              </p>
            </div>

            <div className="space-y-12">
              {Object.entries(tasksByCategory).map(([category, categoryTasks]) => (
                <div key={category} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold text-foreground">
                        {category}
                      </h3>
                      <Badge variant="secondary">
                        {categoryTasks.length} Aufgabe{categoryTasks.length !== 1 ? 'n' : ''}
                      </Badge>
                    </div>
                  </div>

                  <Carousel
                    opts={{
                      align: "start",
                      loop: false,
                    }}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-4">
                      {categoryTasks.map((task) => (
                        <CarouselItem key={task.id} className="pl-4 md:basis-1/2 lg:basis-1/2">
                          <TaskCard task={task} onApply={handleApplyToTask} formatDate={formatDate} showApplyButton={true} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-0" />
                    <CarouselNext className="right-0" />
                  </Carousel>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}



      {/* Task Application Modal */}
      <TaskApplicationModal 
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Task Creation Modal */}
      <TaskCreationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  );
};

// Task Card Component
interface TaskCardProps {
  task: Task;
  onApply: (task: Task) => void;
  formatDate: (dateString: string) => string;
  showApplyButton: boolean;
}

const TaskCard = ({ task, onApply, formatDate, showApplyButton }: TaskCardProps) => (
  <Card className="glass-card border-border-glass hover:shadow-xl transition-all duration-300 h-full flex flex-col">
    <div className="p-6 flex-1 flex flex-col">
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
      
      {/* Task images */}
      {task.images && task.images.length > 0 && (
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {task.images.slice(0, 3).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Task image ${index + 1}`}
              className="w-16 h-16 object-cover rounded-lg glass-card flex-shrink-0"
            />
          ))}
          {task.images.length > 3 && (
            <div className="w-16 h-16 rounded-lg glass-card flex items-center justify-center text-xs text-muted-foreground">
              +{task.images.length - 3}
            </div>
          )}
        </div>
      )}
      
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
        <div className="mb-4 flex-1">
          <h4 className="font-medium text-foreground mb-2">Anforderungen:</h4>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {task.requirements}
          </p>
        </div>
      )}
      
      {showApplyButton && (
        <div className="mt-auto pt-4">
          <Button 
            onClick={() => onApply(task)}
            className="w-full bg-gradient-primary text-primary-foreground hover:shadow-lg transition-all duration-300"
          >
            <User className="w-4 h-4 mr-2" />
            Bewerben
          </Button>
        </div>
      )}
    </div>
  </Card>
);

export default Categories;