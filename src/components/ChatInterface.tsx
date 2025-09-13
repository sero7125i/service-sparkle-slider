import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Image, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'client' | 'provider';
  timestamp: Date;
  attachments?: { name: string; url: string; type: string; size: number }[];
}

interface ChatInterfaceProps {
  taskTitle: string;
  partnerName: string;
  partnerAvatar?: string;
  onClose: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  taskTitle,
  partnerName,
  partnerAvatar,
  onClose
}) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [pendingAttachments, setPendingAttachments] = useState<{ name: string; url: string; type: string; size: number }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() || pendingAttachments.length > 0) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'provider',
        timestamp: new Date(),
        attachments: pendingAttachments.length > 0 ? [...pendingAttachments] : undefined
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      setPendingAttachments([]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    let hasError = false;
    
    files.forEach(file => {
      if (file.size > 20 * 1024 * 1024) { // 20MB limit
        hasError = true;
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        const attachment = {
          name: file.name,
          url: reader.result as string,
          type: file.type || 'application/octet-stream',
          size: file.size
        };
        
        setPendingAttachments(prev => [...prev, attachment]);
      };
      reader.readAsDataURL(file);
    });
    
    if (hasError) {
      toast({
        title: "Datei zu groß",
        description: "Dateien dürfen maximal 20MB groß sein.",
        variant: "destructive"
      });
    }
    
    // Reset input
    if (e.target) e.target.value = '';
  };

  const removeAttachment = (index: number) => {
    setPendingAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isImageFile = (type: string) => {
    return type.startsWith('image/');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('de-DE', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="glass-card h-full flex flex-col max-w-none mx-0 border border-border-glass backdrop-blur-md bg-background/80">
      <div className="flex flex-row items-center justify-between border-b border-border-glass p-4 bg-gradient-subtle backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-primary/20">
            <AvatarImage src={partnerAvatar} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {partnerName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{partnerName}</h3>
            <p className="text-sm text-muted-foreground">{taskTitle}</p>
          </div>
          <Badge variant="secondary" className="ml-2 bg-green-500/20 text-green-400 border-green-500/30">
            Aktiv
          </Badge>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center h-full min-h-[300px]">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Send className="w-8 h-8 text-primary/60" />
                </div>
                <h4 className="text-lg font-medium text-foreground">
                  Beginnen Sie die Unterhaltung
                </h4>
                <p className="text-muted-foreground max-w-sm">
                  Senden Sie eine Nachricht um mit {partnerName} über das Projekt "{taskTitle}" zu sprechen.
                </p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'provider' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-xl p-3 ${
                      message.sender === 'provider'
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'glass-card bg-background/60 border border-border-glass'
                    }`}
                  >
                    {message.text && <p className="text-sm leading-relaxed">{message.text}</p>}
                    
                    {/* Attachments */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {message.attachments.map((attachment, index) => (
                          <div key={index} className={`rounded-lg p-2 ${
                            message.sender === 'provider' 
                              ? 'bg-primary-foreground/10' 
                              : 'bg-muted/50'
                          }`}>
                            {isImageFile(attachment.type) ? (
                              <img
                                src={attachment.url}
                                alt={attachment.name}
                                className="max-w-full max-h-48 rounded-md object-cover"
                              />
                            ) : (
                              <div className="flex items-center gap-2">
                                <Paperclip className="w-4 h-4" />
                                <span className="text-sm truncate">{attachment.name}</span>
                                <span className="text-xs opacity-70">
                                  ({formatFileSize(attachment.size)})
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <p className={`text-xs mt-1 ${
                      message.sender === 'provider' 
                        ? 'text-primary-foreground/70' 
                        : 'text-muted-foreground'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="glass-card bg-background/60 border border-border-glass rounded-xl p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-border-glass p-4 bg-gradient-subtle backdrop-blur-sm">
          {/* Pending Attachments */}
          {pendingAttachments.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {pendingAttachments.map((attachment, index) => (
                <div key={index} className="flex items-center gap-2 bg-background/60 border border-border-glass rounded-lg p-2">
                  {isImageFile(attachment.type) ? (
                    <img
                      src={attachment.url}
                      alt={attachment.name}
                      className="w-8 h-8 rounded object-cover"
                    />
                  ) : (
                    <Paperclip className="w-4 h-4 text-primary" />
                  )}
                  <span className="text-sm truncate max-w-[120px]">{attachment.name}</span>
                  <button
                    onClick={() => removeAttachment(index)}
                    className="text-destructive hover:text-destructive/80 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nachricht eingeben..."
                className="min-h-[44px] bg-background/60 border-border-glass focus:border-primary/50 rounded-xl"
              />
            </div>
            <div className="flex gap-2">
              {/* Hidden file inputs */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept="*/*"
              />
              <input
                ref={imageInputRef}
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*"
              />
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => fileInputRef.current?.click()}
                className="hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                title="Datei anhängen"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => imageInputRef.current?.click()}
                className="hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                title="Bild anhängen"
              >
                <Image className="h-4 w-4" />
              </Button>
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim() && pendingAttachments.length === 0}
                size="sm"
                className="px-4 rounded-xl"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-3 flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-background/50 border-border-glass">
              🔄 Echtzeit-Chat verfügbar mit Supabase
            </Badge>
            {pendingAttachments.length > 0 && (
              <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                {pendingAttachments.length} Anhang{pendingAttachments.length > 1 ? 'e' : ''}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};