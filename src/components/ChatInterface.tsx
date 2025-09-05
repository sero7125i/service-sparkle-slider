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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hallo! Vielen Dank für die Annahme meines Angebots. Wann können wir beginnen?',
      sender: 'client',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      text: 'Gerne! Ich kann bereits morgen anfangen. Haben Sie schon alle benötigten Materialien?',
      sender: 'provider',
      timestamp: new Date(Date.now() - 3000000)
    },
    {
      id: '3',
      text: 'Ja, alles ist bereit. Soll ich Ihnen die Adresse per Nachricht senden?',
      sender: 'client',
      timestamp: new Date(Date.now() - 1800000)
    }
  ]);
  
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
        sender: 'provider', // Current user is assumed to be provider
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate typing indicator and response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Add a simulated response (remove this when connecting to real backend)
        const responses = [
          'Verstanden, vielen Dank!',
          'Das klingt gut, ich freue mich auf die Zusammenarbeit.',
          'Perfekt, dann bis morgen!',
          'Alles klar, ich melde mich bei Fragen.'
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: 'client',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, responseMessage]);
      }, 2000);
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
    <Card className="fixed inset-4 z-50 flex flex-col max-w-4xl mx-auto bg-background border shadow-2xl">
      <CardHeader className="flex flex-row items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={partnerAvatar} />
            <AvatarFallback>{partnerName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{partnerName}</CardTitle>
            <p className="text-sm text-muted-foreground">{taskTitle}</p>
          </div>
          <Badge variant="secondary" className="ml-2">Aktiv</Badge>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'provider' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === 'provider'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.text}</p>
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
              <div className="bg-muted rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nachricht eingeben..."
                className="min-h-[40px]"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" disabled>
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" disabled>
                <Image className="h-4 w-4" />
              </Button>
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              💡 Mock-Chat - Wird mit Supabase real-time
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};