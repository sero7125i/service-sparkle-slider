import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { User, Edit, Save, X, MapPin, Calendar } from 'lucide-react';

export const ProfileView = () => {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    location: user?.location || '',
    description: user?.description || ''
  });

  if (!user) return null;

  const handleEdit = () => {
    setEditData({
      name: user.name,
      location: user.location,
      description: user.description
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
      description: user.description
    });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="glass-card">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="text-2xl bg-gradient-primary text-primary-foreground">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <CardDescription className="flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" />
            {user.location}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-location">Standort</Label>
                <Input
                  id="edit-location"
                  name="location"
                  value={editData.location}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-description">Beschreibung</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={editData.description}
                  onChange={handleChange}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex-1">
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
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">E-Mail</h3>
                <p>{user.email}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Beschreibung</h3>
                <p className="text-sm leading-relaxed">{user.description}</p>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Mitglied seit {new Date(user.createdAt).toLocaleDateString('de-DE')}
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={handleEdit} variant="outline" className="flex-1">
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
      
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Öffentliches Profil</CardTitle>
          <CardDescription>
            Ihr Profil ist für andere Benutzer sichtbar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-start gap-4">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-medium">{user.name}</h4>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {user.location}
                </p>
                <p className="text-sm mt-2">{user.description}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};