import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, Euro, User, Send } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

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
  createdBy?: string;
}

interface TaskApplicationModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

const TaskApplicationModal = ({ task, isOpen, onClose }: TaskApplicationModalProps) => {
  const [applicationText, setApplicationText] = useState("");
  const [proposedPrice, setProposedPrice] = useState("");
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE');
  };

  const handleSubmitApplication = () => {
    if (!user) {
      toast({
        title: "Anmeldung erforderlich",
        description: "Sie müssen sich anmelden, um sich auf Aufgaben zu bewerben.",
        variant: "destructive"
      });
      return;
    }

    if (!applicationText.trim()) {
      toast({
        title: "Bewerbungstext fehlt",
        description: "Bitte schreiben Sie einen Bewerbungstext.",
        variant: "destructive"
      });
      return;
    }

    // Application erstellen
    const application = {
      id: Date.now().toString(),
      taskId: task?.id,
      taskTitle: task?.title,
      applicantId: user.id,
      applicantName: profile?.name || user.email,
      applicantEmail: user.email,
      applicationText,
      proposedPrice,
      createdAt: new Date().toISOString(),
      status: "pending", // pending, accepted, rejected
      taskOwnerId: task?.createdBy || "demo-user"
    };

    // Applications in localStorage speichern
    const existingApplications = JSON.parse(localStorage.getItem("applications") || "[]");
    existingApplications.push(application);
    localStorage.setItem("applications", JSON.stringify(existingApplications));

    toast({
      title: "Bewerbung gesendet",
      description: "Ihre Bewerbung wurde erfolgreich versendet. Sie werden benachrichtigt, wenn der Auftraggeber antwortet."
    });

    // Modal schließen und Form zurücksetzen
    onClose();
    setApplicationText("");
    setProposedPrice("");
  };

  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Bewerbung schreiben</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Task Details */}
          <div className="glass-card p-6 rounded-lg border-border-glass">
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
            
            <p className="text-muted-foreground mb-4">
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
              <div>
                <h4 className="font-medium text-foreground mb-2">Anforderungen:</h4>
                <p className="text-sm text-muted-foreground">
                  {task.requirements}
                </p>
              </div>
            )}
          </div>

          {/* Application Form */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Ihr Preisvorschlag (optional)
              </label>
              <div className="relative">
                <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="z.B. 150"
                  value={proposedPrice}
                  onChange={(e) => setProposedPrice(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Bewerbungstext *
              </label>
              <Textarea
                placeholder="Beschreiben Sie, warum Sie der richtige Kandidat für diese Aufgabe sind. Erwähnen Sie relevante Erfahrungen, Fähigkeiten und Ihren Lösungsansatz..."
                value={applicationText}
                onChange={(e) => setApplicationText(e.target.value)}
                className="min-h-[150px] resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Minimum 50 Zeichen erforderlich
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Abbrechen
            </Button>
            <Button 
              onClick={handleSubmitApplication}
              className="flex-1 bg-gradient-primary text-primary-foreground hover:shadow-lg transition-all duration-300"
            >
              <Send className="w-4 h-4 mr-2" />
              Bewerbung abschicken
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskApplicationModal;