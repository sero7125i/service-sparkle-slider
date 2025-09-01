import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { User, Edit, Save, X, MapPin, Calendar, Globe, Linkedin, Github, Twitter, Eye, TrendingUp, Award, ExternalLink } from 'lucide-react';

export const ProfileView = () => {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    location: user?.location || '',
    description: user?.description || '',
    links: {
      website: user?.links?.website || '',
      linkedin: user?.links?.linkedin || '',
      github: user?.links?.github || '',
      twitter: user?.links?.twitter || ''
    }
  });

  if (!user) return null;

  const handleEdit = () => {
    setEditData({
      name: user.name,
      location: user.location,
      description: user.description,
      links: {
        website: user.links?.website || '',
        linkedin: user.links?.linkedin || '',
        github: user.links?.github || '',
        twitter: user.links?.twitter || ''
      }
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    updateProfile(editData);
    setIsEditing(false);
    toast({
      title: "Profil aktualisiert",
      description: "Ihre Änderungen wurden erfolgreich gespeichert",
    });
  };

  const handleCancel = () => {
    setEditData({
      name: user.name,
      location: user.location,
      description: user.description,
      links: {
        website: user.links?.website || '',
        linkedin: user.links?.linkedin || '',
        github: user.links?.github || '',
        twitter: user.links?.twitter || ''
      }
    });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('links.')) {
      const linkKey = name.split('.')[1];
      setEditData(prev => ({
        ...prev,
        links: {
          ...prev.links,
          [linkKey]: value
        }
      }));
    } else {
      setEditData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getDaysJoined = () => {
    const joinDate = new Date(user.createdAt);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - joinDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const renderLinkIcon = (type: string) => {
    switch (type) {
      case 'website': return <Globe className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'github': return <Github className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Main Profile Card */}
      <Card className="glass-card hover-glow">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-6">
            <Avatar className="w-32 h-32 ring-4 ring-primary/20">
              <AvatarFallback className="text-3xl bg-gradient-primary text-primary-foreground">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-3xl gradient-text mb-2">{user.name}</CardTitle>
          <CardDescription className="flex items-center justify-center gap-2 text-lg">
            <MapPin className="w-5 h-5" />
            {user.location}
          </CardDescription>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-2">
            <Calendar className="w-4 h-4" />
            Mitglied seit {getDaysJoined()} Tagen
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                    className="bg-background/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-location">Standort</Label>
                  <Input
                    id="edit-location"
                    name="location"
                    value={editData.location}
                    onChange={handleChange}
                    className="bg-background/50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-description">Beschreibung</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={editData.description}
                  onChange={handleChange}
                  className="min-h-[100px] bg-background/50"
                  placeholder="Erzählen Sie uns etwas über sich..."
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Social Links</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-website" className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Website
                    </Label>
                    <Input
                      id="edit-website"
                      name="links.website"
                      value={editData.links.website}
                      onChange={handleChange}
                      placeholder="https://your-website.com"
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-linkedin" className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </Label>
                    <Input
                      id="edit-linkedin"
                      name="links.linkedin"
                      value={editData.links.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/username"
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-github" className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      GitHub
                    </Label>
                    <Input
                      id="edit-github"
                      name="links.github"
                      value={editData.links.github}
                      onChange={handleChange}
                      placeholder="https://github.com/username"
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-twitter" className="flex items-center gap-2">
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </Label>
                    <Input
                      id="edit-twitter"
                      name="links.twitter"
                      value={editData.links.twitter}
                      onChange={handleChange}
                      placeholder="https://twitter.com/username"
                      className="bg-background/50"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button onClick={handleSave} className="flex-1 bg-gradient-primary hover:opacity-90">
                  <Save className="w-4 h-4 mr-2" />
                  Speichern
                </Button>
                <Button variant="outline" onClick={handleCancel} className="flex-1">
                  <X className="w-4 h-4 mr-2" />
                  Abbrechen
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      E-Mail
                    </h3>
                    <p className="text-foreground">{user.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-muted-foreground mb-2">Beschreibung</h3>
                    <p className="text-foreground leading-relaxed">{user.description || 'Noch keine Beschreibung hinzugefügt.'}</p>
                  </div>

                  {/* Social Links */}
                  {user.links && Object.values(user.links).some(link => link) && (
                    <div>
                      <h3 className="font-semibold text-muted-foreground mb-3">Links</h3>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(user.links).map(([key, value]) => 
                          value && (
                            <Badge key={key} variant="secondary" className="hover-glow cursor-pointer">
                              <a 
                                href={value} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 no-underline"
                              >
                                {renderLinkIcon(key)}
                                <span className="capitalize">{key}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Statistics Sidebar */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Statistiken
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Eye className="w-4 h-4" />
                        Profilaufrufe
                      </div>
                      <div className="text-xl font-semibold text-primary">{user.stats?.profileViews || 0}</div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Calendar className="w-4 h-4" />
                        Dabei seit
                      </div>
                      <div className="text-xl font-semibold text-accent">{getDaysJoined()} Tagen</div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Award className="w-4 h-4" />
                        Projekte
                      </div>
                      <div className="text-xl font-semibold text-accent-glow">{user.stats?.completedProjects || 0}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="bg-border-glass" />
              
              <div className="flex gap-3">
                <Button onClick={handleEdit} variant="outline" className="flex-1 hover-glow">
                  <Edit className="w-4 h-4 mr-2" />
                  Profil bearbeiten
                </Button>
                <Button variant="destructive" onClick={logout} className="flex-1">
                  Abmelden
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Public Profile Preview */}
      <Card className="glass-card hover-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Öffentliche Profilvorschau
          </CardTitle>
          <CardDescription>
            So sehen andere Benutzer Ihr Profil
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-gradient-glass rounded-lg border border-border-glass">
            <div className="flex items-start gap-6">
              <Avatar className="w-16 h-16 ring-2 ring-primary/20">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <div>
                  <h4 className="font-semibold text-lg gradient-text">{user.name}</h4>
                  <p className="text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" />
                    {user.location}
                  </p>
                </div>
                
                {user.description && (
                  <p className="text-foreground leading-relaxed">{user.description}</p>
                )}
                
                {user.links && Object.values(user.links).some(link => link) && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {Object.entries(user.links).map(([key, value]) => 
                      value && (
                        <Badge key={key} variant="outline" className="text-xs">
                          {renderLinkIcon(key)}
                          <span className="ml-1 capitalize">{key}</span>
                        </Badge>
                      )
                    )}
                  </div>
                )}
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {getDaysJoined()} Tage dabei
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {user.stats?.profileViews || 0} Aufrufe
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};