import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Plus, Euro, MapPin, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface TaskCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated?: () => void;
}

const categories = [
  "Webentwicklung",
  "Grafikdesign", 
  "Digital Marketing",
  "Content Writing",
  "Video Editing",
  "Beratung"
];

const TaskCreationModal = ({ isOpen, onClose, onTaskCreated }: TaskCreationModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    budget: "",
    duration: "",
    requirements: ""
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (images.length + files.length > 5) {
      toast({
        title: "Zu viele Bilder",
        description: "Sie können maximal 5 Bilder hochladen.",
        variant: "destructive"
      });
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    // Create preview URLs
    const newPreviews = [...imagePreviews];
    files.forEach(file => {
      const url = URL.createObjectURL(file);
      newPreviews.push(url);
    });
    setImagePreviews(newPreviews);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    // Revoke the URL to free memory
    URL.revokeObjectURL(imagePreviews[index]);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = () => {
    if (!user) {
      toast({
        title: "Anmeldung erforderlich",
        description: "Sie müssen sich anmelden, um eine Aufgabe zu erstellen.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.title.trim() || !formData.description.trim() || !formData.category) {
      toast({
        title: "Pflichtfelder fehlen",
        description: "Bitte füllen Sie alle Pflichtfelder aus.",
        variant: "destructive"
      });
      return;
    }

    // Create new task
    const newTask = {
      id: Date.now().toString(),
      ...formData,
      createdBy: user.id,
      createdAt: new Date().toISOString(),
      status: "open",
      images: imagePreviews // Store image URLs (in real app, upload to server)
    };

    // Save to localStorage
    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    existingTasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(existingTasks));

    toast({
      title: "Aufgabe erstellt",
      description: "Ihre Aufgabe wurde erfolgreich veröffentlicht."
    });

    // Reset form and close
    setFormData({
      title: "",
      description: "",
      category: "",
      location: "",
      budget: "",
      duration: "",
      requirements: ""
    });
    setImages([]);
    setImagePreviews([]);
    onClose();
    onTaskCreated?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Neue Aufgabe erstellen</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Titel der Aufgabe *
                </label>
                <Input
                  placeholder="z.B. Logo für Startup gesucht"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Kategorie *
                </label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
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

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Standort
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="z.B. Berlin, Remote"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Budget
                </label>
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="z.B. 500-1000"
                    value={formData.budget}
                    onChange={(e) => handleInputChange("budget", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Zeitraum
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="z.B. 2 Wochen, 1 Monat"
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Beschreibung *
            </label>
            <Textarea
              placeholder="Beschreiben Sie Ihr Projekt detailliert. Je genauer die Beschreibung, desto bessere Bewerbungen erhalten Sie..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Anforderungen
            </label>
            <Textarea
              placeholder="Welche Fähigkeiten und Erfahrungen sollte der Freelancer haben?"
              value={formData.requirements}
              onChange={(e) => handleInputChange("requirements", e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Bilder (optional)
            </label>
            <div className="space-y-4">
              {/* Upload area */}
              <div className="glass-card border-2 border-dashed border-border-glass rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <div className="text-foreground font-medium mb-2">
                    Bilder hochladen
                  </div>
                  <div className="text-sm text-muted-foreground">
                    PNG, JPG bis zu 5MB • Maximal 5 Bilder
                  </div>
                </label>
              </div>

              {/* Image previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg glass-card"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Abbrechen
            </Button>
            <Button 
              onClick={handleSubmit}
              className="flex-1 bg-gradient-primary text-primary-foreground hover:shadow-lg transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Aufgabe erstellen
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskCreationModal;