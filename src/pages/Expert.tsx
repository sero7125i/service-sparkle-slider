import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle, XCircle, Clock, User, Euro, Mail, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import ImpressumButton from "@/components/ImpressumButton";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Application {
  id: string;
  taskId: string;
  taskTitle: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  applicationText: string;
  proposedPrice: string;
  createdAt: string;
  status: "pending" | "accepted" | "rejected";
  taskOwnerId: string;
}

const Expert = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Application[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      // Lade Bewerbungen für Tasks des aktuellen Users
      const allApplications = JSON.parse(localStorage.getItem("applications") || "[]");
      const userApplications = allApplications.filter((app: Application) => 
        app.taskOwnerId === user.id || app.taskOwnerId === "demo-user"
      );
      
      const pending = userApplications.filter((app: Application) => app.status === "pending");
      const accepted = userApplications.filter((app: Application) => app.status === "accepted");
      
      setApplications(pending);
      setCompletedTasks(accepted);
    }
  }, [user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAcceptApplication = (applicationId: string) => {
    const allApplications = JSON.parse(localStorage.getItem("applications") || "[]");
    const updatedApplications = allApplications.map((app: Application) => 
      app.id === applicationId ? { ...app, status: "accepted" } : app
    );
    
    localStorage.setItem("applications", JSON.stringify(updatedApplications));
    
    // State aktualisieren
    const acceptedApp = applications.find(app => app.id === applicationId);
    if (acceptedApp) {
      setApplications(prev => prev.filter(app => app.id !== applicationId));
      setCompletedTasks(prev => [...prev, { ...acceptedApp, status: "accepted" }]);
    }
    
    toast({
      title: "Bewerbung angenommen",
      description: "Die Bewerbung wurde erfolgreich angenommen. Sie können nun die Zahlung über PayPal abwickeln."
    });
  };

  const handleRejectApplication = (applicationId: string) => {
    const allApplications = JSON.parse(localStorage.getItem("applications") || "[]");
    const updatedApplications = allApplications.map((app: Application) => 
      app.id === applicationId ? { ...app, status: "rejected" } : app
    );
    
    localStorage.setItem("applications", JSON.stringify(updatedApplications));
    
    // Aus aktueller Liste entfernen
    setApplications(prev => prev.filter(app => app.id !== applicationId));
    
    toast({
      title: "Bewerbung abgelehnt",
      description: "Die Bewerbung wurde abgelehnt."
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Anmeldung erforderlich</h1>
            <p className="text-muted-foreground mb-8">
              Sie müssen sich anmelden, um auf den Experten-Bereich zuzugreifen.
            </p>
            <Button className="bg-gradient-primary text-primary-foreground">
              Zur Anmeldung
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Experten</span>
              <span className="text-foreground"> Dashboard</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Verwalten Sie Ihre eingehenden Bewerbungen und abgeschlossene Projekte
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="applications" className="w-full">
            <TabsList className="grid w-full grid-cols-2 glass-card border-border-glass">
              <TabsTrigger value="applications" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Eingehende Anfragen ({applications.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Angenommene Projekte ({completedTasks.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="applications" className="space-y-6">
              {applications.length === 0 ? (
                <Card className="glass-card border-border-glass p-12 text-center">
                  <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Keine neuen Bewerbungen
                  </h3>
                  <p className="text-muted-foreground">
                    Sobald sich jemand auf Ihre Aufgaben bewirbt, werden die Anfragen hier angezeigt.
                  </p>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {applications.map((application) => (
                    <Card key={application.id} className="glass-card border-border-glass">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-2">
                              {application.taskTitle}
                            </h3>
                            <Badge variant="secondary">
                              <Clock className="w-3 h-3 mr-1" />
                              Wartend
                            </Badge>
                          </div>
                          <div className="text-right">
                            {application.proposedPrice && (
                              <div className="text-lg font-bold text-primary mb-1">
                                €{application.proposedPrice}
                              </div>
                            )}
                            <div className="text-sm text-muted-foreground">
                              {formatDate(application.createdAt)}
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>
                                {application.applicantName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-foreground">
                                {application.applicantName}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center">
                                <Mail className="w-3 h-3 mr-1" />
                                {application.applicantEmail}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                          <h4 className="font-medium text-foreground mb-2">Bewerbungstext:</h4>
                          <p className="text-muted-foreground">
                            {application.applicationText}
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleRejectApplication(application.id)}
                            variant="outline"
                            className="flex-1"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Ablehnen
                          </Button>
                          <Button
                            onClick={() => handleAcceptApplication(application.id)}
                            className="flex-1 bg-gradient-primary text-primary-foreground hover:shadow-lg transition-all duration-300"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Annehmen
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-6">
              {completedTasks.length === 0 ? (
                <Card className="glass-card border-border-glass p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Keine angenommenen Projekte
                  </h3>
                  <p className="text-muted-foreground">
                    Angenommene Projekte werden hier angezeigt. Sie können dann über PayPal bezahlen.
                  </p>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {completedTasks.map((task) => (
                    <Card key={task.id} className="glass-card border-border-glass">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-2">
                              {task.taskTitle}
                            </h3>
                            <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Angenommen
                            </Badge>
                          </div>
                          <div className="text-right">
                            {task.proposedPrice && (
                              <div className="text-lg font-bold text-primary mb-1">
                                €{task.proposedPrice}
                              </div>
                            )}
                            <div className="text-sm text-muted-foreground">
                              Angenommen: {formatDate(task.createdAt)}
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>
                                {task.applicantName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-foreground">
                                {task.applicantName}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center">
                                <Mail className="w-3 h-3 mr-1" />
                                {task.applicantEmail}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg mb-4">
                          <p className="text-sm text-muted-foreground">
                            Dieses Projekt wurde angenommen. Nach Fertigstellung können Sie die Zahlung über PayPal abwickeln.
                          </p>
                        </div>

                        <Button className="w-full bg-gradient-primary text-primary-foreground hover:shadow-lg transition-all duration-300">
                          <Euro className="w-4 h-4 mr-2" />
                          Mit PayPal bezahlen
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <ImpressumButton />
    </div>
  );
};

export default Expert;