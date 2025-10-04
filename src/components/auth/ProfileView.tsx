import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Pencil, Save, X, MapPin, Mail, Star, Clock, MessageSquare, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
  projectTitle: string;
}

export const ProfileView = () => {
  const { user, profile, logout, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: profile?.name || '',
    location: profile?.location || '',
    description: profile?.description || ''
  });
  
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem(`reviews_${user?.id}`);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    author: '',
    projectTitle: ''
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      name: profile?.name || '',
      location: profile?.location || '',
      description: profile?.description || ''
    });
  };

  const handleSave = async () => {
    const { error } = await updateProfile(editData);
    if (!error) {
      toast({
        title: "Profil aktualisiert",
        description: "Ihre Änderungen wurden erfolgreich gespeichert."
      });
      setIsEditing(false);
    } else {
      toast({
        title: "Fehler",
        description: "Profil konnte nicht aktualisiert werden.",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setEditData({
      name: profile?.name || '',
      location: profile?.location || '',
      description: profile?.description || ''
    });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddReview = () => {
    if (!newReview.author || !newReview.comment || !newReview.projectTitle) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Felder aus.",
        variant: "destructive"
      });
      return;
    }
    
    const review: Review = {
      id: Date.now().toString(),
      rating: newReview.rating,
      comment: newReview.comment,
      author: newReview.author,
      projectTitle: newReview.projectTitle,
      date: new Date().toISOString()
    };
    
    const updatedReviews = [...reviews, review];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${user?.id}`, JSON.stringify(updatedReviews));
    
    setNewReview({
      rating: 5,
      comment: '',
      author: '',
      projectTitle: ''
    });
    
    toast({
      title: "Bewertung hinzugefügt",
      description: "Die Bewertung wurde erfolgreich gespeichert."
    });
  };
  
  const handleDeleteReview = (reviewId: string) => {
    const updatedReviews = reviews.filter(r => r.id !== reviewId);
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${user?.id}`, JSON.stringify(updatedReviews));
    
    toast({
      title: "Bewertung gelöscht",
      description: "Die Bewertung wurde erfolgreich entfernt."
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const getDaysJoined = () => {
    if (!profile?.created_at) return 0;
    const joined = new Date(profile.created_at);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - joined.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const getAverageRating = (): number => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return parseFloat((sum / reviews.length).toFixed(1));
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <Card className="max-w-4xl mx-auto p-8 text-center glass-card">
        <p className="text-muted-foreground">Bitte melden Sie sich an, um Ihr Profil zu sehen.</p>
      </Card>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header with Avatar and Basic Info */}
      <Card className="glass-card border-border-glass">
        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="w-32 h-32 border-4 border-primary/20 shadow-lg">
              <AvatarImage src={profile?.profile_image} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-3xl">
                {getInitials(profile?.name || user.email || 'U')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Name</label>
                    <Input
                      name="name"
                      value={editData.name}
                      onChange={handleChange}
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Standort</label>
                    <Input
                      name="location"
                      value={editData.location}
                      onChange={handleChange}
                      placeholder="z.B. Berlin, Deutschland"
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Über mich</label>
                    <Textarea
                      name="description"
                      value={editData.description}
                      onChange={handleChange}
                      placeholder="Beschreiben Sie Ihre Fähigkeiten und Erfahrungen..."
                      className="bg-background/50 min-h-[120px]"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="bg-gradient-primary">
                      <Save className="w-4 h-4 mr-2" />
                      Speichern
                    </Button>
                    <Button onClick={handleCancel} variant="outline">
                      <X className="w-4 h-4 mr-2" />
                      Abbrechen
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-4xl font-bold text-foreground mb-2">{profile?.name || user.email}</h2>
                    <div className="flex flex-wrap gap-4 text-muted-foreground">
                      {profile?.location && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {profile.location}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {profile?.email || user.email}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Dabei seit {getDaysJoined()} Tagen
                      </div>
                    </div>
                  </div>
                  
                  {profile?.description && (
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {profile.description}
                    </p>
                  )}
                  
                  <div className="flex gap-2 pt-2">
                    <Button onClick={handleEdit} className="bg-gradient-primary">
                      <Pencil className="w-4 h-4 mr-2" />
                      Profil bearbeiten
                    </Button>
                    <Button onClick={logout} variant="outline">
                      Abmelden
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card border-border-glass p-6 text-center hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Star className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground mb-1">{getAverageRating()}</div>
          <div className="text-sm text-muted-foreground">Durchschnittsbewertung</div>
          <div className="flex justify-center mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= getAverageRating()
                    ? 'fill-primary text-primary'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
        </Card>

        <Card className="glass-card border-border-glass p-6 text-center hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground mb-1">{reviews.length}</div>
          <div className="text-sm text-muted-foreground">Bewertungen</div>
        </Card>

        <Card className="glass-card border-border-glass p-6 text-center hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground mb-1">{getDaysJoined()}</div>
          <div className="text-sm text-muted-foreground">Tage Mitglied</div>
        </Card>
      </div>

      {/* Reviews Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add Review Card */}
        <Card className="glass-card border-border-glass">
          <div className="p-6">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-primary" />
              Neue Bewertung hinzufügen
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Bewertung</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 cursor-pointer ${
                          star <= newReview.rating
                            ? 'fill-primary text-primary'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Projekt Titel</label>
                <Input
                  value={newReview.projectTitle}
                  onChange={(e) => setNewReview(prev => ({ ...prev, projectTitle: e.target.value }))}
                  placeholder="z.B. Website Entwicklung"
                  className="bg-background/50"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Autor/Kunde</label>
                <Input
                  value={newReview.author}
                  onChange={(e) => setNewReview(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Name des Auftraggebers"
                  className="bg-background/50"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Kommentar</label>
                <Textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Beschreiben Sie die Zusammenarbeit..."
                  className="bg-background/50 min-h-[100px]"
                />
              </div>

              <Button onClick={handleAddReview} className="w-full bg-gradient-primary">
                <Star className="w-4 h-4 mr-2" />
                Bewertung hinzufügen
              </Button>
            </div>
          </div>
        </Card>

        {/* Reviews List */}
        <Card className="glass-card border-border-glass">
          <div className="p-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Bewertungen ({reviews.length})
            </h3>
            
            {reviews.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Noch keine Bewertungen vorhanden.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Fügen Sie Ihre erste Bewertung hinzu!
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {reviews.map((review) => (
                  <div key={review.id} className="glass-card p-4 rounded-xl border-border-glass">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating
                                    ? 'fill-primary text-primary'
                                    : 'text-muted-foreground'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-semibold text-foreground">
                            {review.rating}.0
                          </span>
                        </div>
                        <h4 className="font-bold text-foreground">{review.projectTitle}</h4>
                        <p className="text-sm text-muted-foreground">von {review.author}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteReview(review.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{review.comment}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(review.date)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};