import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Image, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  text: string;
  sender: 'client' | 'provider';
  timestamp: Date;
  attachments?: string[];
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
  const [messages, setMessages] = useState<Message[]>([]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'provider',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
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
                    <p className="text-sm leading-relaxed">{message.text}</p>
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
              <Button 
                variant="ghost" 
                size="sm" 
                disabled
                className="hover:bg-primary/10 text-muted-foreground"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                disabled
                className="hover:bg-primary/10 text-muted-foreground"
              >
                <Image className="h-4 w-4" />
              </Button>
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
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
          </div>
        </div>
      </div>
    </div>
  );
};