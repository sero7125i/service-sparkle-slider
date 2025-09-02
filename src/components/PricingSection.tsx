import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PAYPAL_CLIENT_ID = "AZDxjDuaDdwV5aV6-VtMmPyTH5J2eMpw8iMlXX8GqeNRk-JvbYQWY7pKKLVjE8-gWzBqAjJmDlvSRt5Z"; // Sandbox ID für Demo

const pricingPlans = [
  {
    id: "basic",
    name: "Basic",
    price: 29,
    originalPrice: 39,
    description: "Perfekt für Einsteiger und kleine Projekte",
    features: [
      "Bis zu 5 Projekte",
      "Email Support",
      "Basis Dashboard",
      "Community Access",
      "Mobile App"
    ],
    recommended: false,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "pro",
    name: "Professional",
    price: 79,
    originalPrice: 99,
    description: "Ideal für Freelancer und kleine Teams",
    features: [
      "Unbegrenzte Projekte",
      "Priority Support",
      "Erweiterte Analytics",
      "Team Collaboration",
      "API Zugang",
      "Custom Branding"
    ],
    recommended: true,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    originalPrice: 249,
    description: "Für große Teams und Unternehmen",
    features: [
      "Alles aus Professional",
      "Dedicated Support",
      "Advanced Security",
      "Custom Integrations",
      "SLA Garantie",
      "Training Sessions"
    ],
    recommended: false,  
    color: "from-orange-500 to-red-500"
  }
];

const PricingSection = () => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // 7% PayPal Provision berechnen
  const calculateTotal = (price: number) => {
    const commission = price * 0.07; // 7% Provision
    return {
      subtotal: price,
      commission: parseFloat(commission.toFixed(2)),
      total: parseFloat((price + commission).toFixed(2))
    };
  };

  const handlePayPalSuccess = (details: any, planName: string) => {
    console.log("PayPal Payment erfolgreich:", details);
    toast({
      title: "Zahlung erfolgreich!",
      description: `${planName} Plan wurde erfolgreich erworben. Transaktions-ID: ${details.id}`,
    });
    setSelectedPlan(null);
  };

  const handlePayPalError = (err: any) => {
    console.error("PayPal Fehler:", err);
    toast({
      title: "Zahlung fehlgeschlagen",
      description: "Es gab ein Problem bei der Zahlung. Bitte versuchen Sie es erneut.",
      variant: "destructive"
    });
  };

  return (
    <section id="preise" className="py-20 bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Pricing
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-6">
            Wählen Sie Ihren Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transparente Preise mit 7% PayPal-Provision bereits eingerechnet
          </p>
        </div>

        {/* PayPal Integration Info */}
        <div className="mb-12 p-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl border border-border-glass">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Info className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">PayPal Integration - Beispiel</h3>
              <p className="text-muted-foreground mb-4">
                Diese Demo zeigt eine vollständige PayPal-Integration mit 7% Provision. 
                Die angezeigten Preise enthalten bereits alle Gebühren.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-medium">Beispielberechnung (Professional Plan):</h4>
                  <div className="space-y-1 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Basispreis:</span>
                      <span>€79.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PayPal Provision (7%):</span>
                      <span>€5.53</span>
                    </div>
                    <div className="flex justify-between font-medium text-foreground border-t pt-1">
                      <span>Gesamtpreis:</span>
                      <span>€84.53</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Setup-Anleitung:</h4>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• PayPal Developer Account erstellen</li>
                    <li>• Client-ID aus PayPal Dashboard kopieren</li>
                    <li>• Sandbox für Tests verwenden</li>
                    <li>• Webhooks für Bestätigungen einrichten</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <PayPalScriptProvider options={{ 
          clientId: PAYPAL_CLIENT_ID, 
          currency: "EUR",
          intent: "capture"
        }}>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => {
              const pricing = calculateTotal(plan.price);
              
              return (
                <Card 
                  key={plan.id}
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                    plan.recommended 
                      ? 'ring-2 ring-primary shadow-xl' 
                      : 'hover:shadow-lg'
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-foreground" />
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    {plan.recommended && (
                      <Badge className="w-fit mx-auto mb-4 bg-primary text-primary-foreground">
                        <Star className="w-3 h-3 mr-1" />
                        Empfohlen
                      </Badge>
                    )}
                    
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <CardDescription className="text-base mb-6">
                      {plan.description}
                    </CardDescription>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-3xl font-bold">€{pricing.total}</span>
                        <span className="text-muted-foreground line-through">€{plan.originalPrice}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        inkl. €{pricing.commission} PayPal Gebühr
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="p-1 bg-primary/10 rounded-full">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4">
                      {selectedPlan === plan.id ? (
                        <div className="space-y-4">
                          <PayPalButtons
                            style={{ 
                              layout: "vertical",
                              color: "blue",
                              shape: "rect",
                              label: "paypal"
                            }}
                            createOrder={(data, actions) => {
                              return actions.order.create({
                                intent: "CAPTURE",
                                purchase_units: [{
                                  amount: {
                                    value: pricing.total.toString(),
                                    currency_code: "EUR"
                                  },
                                  description: `${plan.name} Plan - ${plan.description}`
                                }]
                              });
                            }}
                            onApprove={(data, actions) => {
                              return actions.order!.capture().then((details) => {
                                handlePayPalSuccess(details, plan.name);
                              });
                            }}
                            onError={handlePayPalError}
                            onCancel={() => {
                              setSelectedPlan(null);
                              toast({
                                title: "Zahlung abgebrochen",
                                description: "Die Zahlung wurde vom Benutzer abgebrochen."
                              });
                            }}
                          />
                          <Button 
                            variant="outline" 
                            onClick={() => setSelectedPlan(null)}
                            className="w-full"
                          >
                            Abbrechen
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          className={`w-full bg-gradient-to-r ${plan.color} hover:shadow-lg transition-all duration-300`}
                          onClick={() => setSelectedPlan(plan.id)}
                        >
                          Plan wählen
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </PayPalScriptProvider>

        {/* Setup Anleitung */}
        <div className="mt-20 p-8 bg-gradient-to-r from-muted/50 to-muted/30 rounded-2xl border border-border-glass">
          <h3 className="text-2xl font-bold mb-6 text-center">PayPal Integration Setup</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">1. PayPal Developer Setup</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <span>Erstellen Sie einen Account auf <strong>developer.paypal.com</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <span>Erstellen Sie eine neue App im Dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <span>Kopieren Sie die Client-ID für Sandbox/Live</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">2. Code Integration</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <span>Installieren: <code className="bg-muted px-2 py-1 rounded">npm install @paypal/react-paypal-js</code></span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <span>Client-ID in der Komponente ersetzen</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <span>Webhooks für Zahlungsbestätigungen einrichten</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;