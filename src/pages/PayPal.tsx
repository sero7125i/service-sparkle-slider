import { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  CheckCircle, 
  AlertCircle, 
  Wallet, 
  ArrowRight,
  DollarSign,
  Shield,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PAYPAL_CLIENT_ID = "AZDxjDuaDdwV5aV6-VtMmPyTH5J2eMpw8iMlXX8GqeNRk-JvbYQWY7pKKLVjE8-gWzBqAjJmDlvSRt5Z"; // Sandbox ID

interface PayPalAccount {
  email: string;
  merchantId: string;
  status: 'connected' | 'pending' | 'disconnected';
  connectedAt?: string;
}

interface PendingPayment {
  id: string;
  taskTitle: string;
  amount: number;
  clientEmail: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
}

const PayPal = () => {
  const { toast } = useToast();
  const [paypalAccount, setPaypalAccount] = useState<PayPalAccount | null>(null);
  const [connectEmail, setConnectEmail] = useState("");
  const [pendingPayments, setPendingPayments] = useState<PendingPayment[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Lade gespeicherte PayPal-Verbindung
    const savedAccount = localStorage.getItem("paypal_account");
    if (savedAccount) {
      setPaypalAccount(JSON.parse(savedAccount));
    }

    // Lade ausstehende Zahlungen
    const savedPayments = localStorage.getItem("pending_payments");
    if (savedPayments) {
      setPendingPayments(JSON.parse(savedPayments));
    }
  }, []);

  const connectPayPal = () => {
    if (!connectEmail) {
      toast({
        title: "E-Mail erforderlich",
        description: "Bitte geben Sie Ihre PayPal E-Mail-Adresse ein.",
        variant: "destructive"
      });
      return;
    }

    setIsConnecting(true);
    
    // Simuliere PayPal-Verbindung
    setTimeout(() => {
      const newAccount: PayPalAccount = {
        email: connectEmail,
        merchantId: `MP${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        status: 'connected',
        connectedAt: new Date().toISOString()
      };
      
      setPaypalAccount(newAccount);
      localStorage.setItem("paypal_account", JSON.stringify(newAccount));
      setIsConnecting(false);
      setConnectEmail("");
      
      toast({
        title: "PayPal erfolgreich verbunden!",
        description: `Ihr PayPal-Konto ${connectEmail} wurde erfolgreich verknüpft.`
      });
    }, 2000);
  };

  const disconnectPayPal = () => {
    setPaypalAccount(null);
    localStorage.removeItem("paypal_account");
    toast({
      title: "PayPal getrennt",
      description: "Ihr PayPal-Konto wurde erfolgreich getrennt."
    });
  };

  const processPayment = (paymentId: string) => {
    setPendingPayments(prev =>
      prev.map(payment =>
        payment.id === paymentId
          ? { ...payment, status: 'processing' as const }
          : payment
      )
    );

    // Simuliere Zahlungsverarbeitung
    setTimeout(() => {
      setPendingPayments(prev => {
        const updated = prev.map(payment =>
          payment.id === paymentId
            ? { ...payment, status: 'completed' as const }
            : payment
        );
        localStorage.setItem("pending_payments", JSON.stringify(updated));
        return updated;
      });

      toast({
        title: "Zahlung erfolgreich!",
        description: "Die Zahlung wurde erfolgreich verarbeitet."
      });
    }, 3000);
  };

  // Beispiel ausstehende Zahlungen hinzufügen (für Demo)
  const addSamplePayment = () => {
    const newPayment: PendingPayment = {
      id: Math.random().toString(36).substr(2, 9),
      taskTitle: "Website Redesign",
      amount: 150,
      clientEmail: "kunde@beispiel.de",
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setPendingPayments(prev => {
      const updated = [...prev, newPayment];
      localStorage.setItem("pending_payments", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Zahlungen
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-6">
            PayPal Integration
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Verbinden Sie Ihr PayPal-Konto und verwalten Sie Zahlungen für erledigte Aufgaben
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* PayPal Verbindung */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle>PayPal-Konto</CardTitle>
                  <CardDescription>
                    Verbinden Sie Ihr PayPal-Konto für Zahlungsabwicklung
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              {paypalAccount ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium text-green-700 dark:text-green-300">
                          Verbunden
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          {paypalAccount.email}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      {paypalAccount.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label className="text-muted-foreground">Merchant ID</Label>
                      <p className="font-mono text-xs bg-muted p-2 rounded">
                        {paypalAccount.merchantId}
                      </p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Verbunden seit</Label>
                      <p className="text-sm">
                        {paypalAccount.connectedAt && 
                          new Date(paypalAccount.connectedAt).toLocaleDateString('de-DE')
                        }
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={disconnectPayPal}
                    className="w-full"
                  >
                    PayPal trennen
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="paypal-email">PayPal E-Mail-Adresse</Label>
                    <Input
                      id="paypal-email"
                      type="email"
                      placeholder="ihre@paypal-email.de"
                      value={connectEmail}
                      onChange={(e) => setConnectEmail(e.target.value)}
                      className="bg-background/50"
                    />
                  </div>
                  
                  <Button 
                    onClick={connectPayPal}
                    disabled={isConnecting}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg"
                  >
                    {isConnecting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Verbinde...
                      </>
                    ) : (
                      <>
                        <Wallet className="w-4 h-4 mr-2" />
                        PayPal verbinden
                      </>
                    )}
                  </Button>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div className="text-sm text-blue-700 dark:text-blue-300">
                        <p className="font-medium mb-1">Sicherheitshinweis</p>
                        <p>Ihre PayPal-Daten werden sicher verschlüsselt und nur für Zahlungsabwicklung verwendet.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Vorteile
              </CardTitle>
              <CardDescription>
                Warum PayPal für Ihre Zahlungen nutzen?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-primary/10 rounded-full mt-1">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Schnelle Auszahlung</h4>
                  <p className="text-sm text-muted-foreground">
                    Erhalten Sie Ihr Geld sofort nach Aufgabenerledigung
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 bg-primary/10 rounded-full mt-1">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Käuferschutz</h4>
                  <p className="text-sm text-muted-foreground">
                    PayPal bietet umfassenden Schutz für alle Transaktionen
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 bg-primary/10 rounded-full mt-1">
                  <DollarSign className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Niedrige Gebühren</h4>
                  <p className="text-sm text-muted-foreground">
                    Nur 3,4% + 0,35€ pro Transaktion
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ausstehende Zahlungen */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Ausstehende Zahlungen
              </CardTitle>
              <CardDescription>
                Verwalten Sie Zahlungen für erledigte Aufgaben
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {pendingPayments.length === 0 ? (
              <div className="text-center py-12">
                <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Keine ausstehenden Zahlungen</h3>
                <p className="text-muted-foreground">
                  Zahlungen erscheinen hier, sobald Sie Aufgaben erfolgreich abgeschlossen haben.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingPayments.map((payment) => (
                  <div 
                    key={payment.id}
                    className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium">{payment.taskTitle}</h4>
                        <Badge 
                          variant={
                            payment.status === 'completed' ? 'default' :
                            payment.status === 'processing' ? 'secondary' :
                            payment.status === 'failed' ? 'destructive' : 'outline'
                          }
                        >
                          {payment.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Kunde: {payment.clientEmail}</span>
                        <span>Erstellt: {new Date(payment.createdAt).toLocaleDateString('de-DE')}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-bold">€{payment.amount}</p>
                        <p className="text-xs text-muted-foreground">
                          Nach Gebühren: €{(payment.amount * 0.966 - 0.35).toFixed(2)}
                        </p>
                      </div>
                      
                      {payment.status === 'pending' && paypalAccount && (
                        <PayPalScriptProvider options={{ 
                          clientId: PAYPAL_CLIENT_ID, 
                          currency: "EUR" 
                        }}>
                          <div className="w-48">
                            <PayPalButtons
                              style={{ 
                                layout: "horizontal",
                                color: "blue",
                                shape: "rect",
                                label: "paypal",
                                height: 35
                              }}
                              createOrder={(data, actions) => {
                                return actions.order.create({
                                  intent: "CAPTURE",
                                  purchase_units: [{
                                    amount: {
                                      value: payment.amount.toString(),
                                      currency_code: "EUR"
                                    },
                                    description: `Zahlung für: ${payment.taskTitle}`
                                  }]
                                });
                              }}
                              onApprove={(data, actions) => {
                                return actions.order!.capture().then(() => {
                                  processPayment(payment.id);
                                });
                              }}
                              onError={(err) => {
                                console.error("PayPal Fehler:", err);
                                toast({
                                  title: "Zahlung fehlgeschlagen",
                                  description: "Es gab ein Problem bei der Zahlung.",
                                  variant: "destructive"
                                });
                              }}
                            />
                          </div>
                        </PayPalScriptProvider>
                      )}
                      
                      {payment.status === 'processing' && (
                        <div className="flex items-center gap-2 text-blue-600">
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                          <span className="text-sm">Verarbeitung...</span>
                        </div>
                      )}
                      
                      {payment.status === 'completed' && (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm">Abgeschlossen</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Setup Anleitung */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Setup-Anleitung</CardTitle>
            <CardDescription>
              So richten Sie PayPal für Ihr Freelancer-Geschäft ein
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">1. PayPal Business Account</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 mt-0.5 text-primary" />
                    <span>Erstellen Sie einen PayPal Business Account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 mt-0.5 text-primary" />
                    <span>Verifizieren Sie Ihr Konto und Ihre Bankdaten</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 mt-0.5 text-primary" />
                    <span>Aktivieren Sie PayPal Payments für Ihr Business</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">2. Integration</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 mt-0.5 text-primary" />
                    <span>Verbinden Sie Ihr PayPal-Konto hier auf der Plattform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 mt-0.5 text-primary" />
                    <span>Zahlungen werden automatisch nach Aufgabenerledigung freigeschaltet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 mt-0.5 text-primary" />
                    <span>Geld wird sofort auf Ihr PayPal-Konto überwiesen</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PayPal;