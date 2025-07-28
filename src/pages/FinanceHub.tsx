import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, TrendingUp, Calculator, FileText, Clock, CheckCircle, ArrowRight, Shield, Zap, Star } from "lucide-react";
import financeHero from "@/assets/finance-hero.jpg";

export const FinanceHub = () => {
  const [loanAmount, setLoanAmount] = useState("500000");
  const [businessTurnover, setBusinessTurnover] = useState("2000000");

  const loanProducts = [
    {
      name: "Instant Business Loan",
      minAmount: "₹25,000",
      maxAmount: "₹10 Lakh",
      rate: "12% onwards",
      processing: "48 hours",
      features: ["No Collateral", "Digital Process", "Flexible EMI"],
      color: "bg-primary"
    },
    {
      name: "Invoice Discounting",
      minAmount: "₹50,000", 
      maxAmount: "₹50 Lakh",
      rate: "15% onwards",
      processing: "24 hours",
      features: ["Invoice Based", "Quick Cash", "No Credit History"],
      color: "bg-accent"
    },
    {
      name: "Supply Chain Finance",
      minAmount: "₹1 Lakh",
      maxAmount: "₹1 Crore",
      rate: "10% onwards",
      processing: "72 hours",
      features: ["Purchase Order Based", "Extended Credit", "Supplier Network"],
      color: "bg-success"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={financeHero} 
          alt="Finance Hub" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">Finance Hub</h1>
            <p className="text-xl mb-8">Get loans, build credit, and grow your business</p>
            <Button variant="accent" size="lg" className="rounded-lg">
              Apply for Loan
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Loan Products */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {loanProducts.map((product, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-2xl border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <div className={`w-12 h-1 ${product.color} rounded-full`}></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Amount Range</span>
                    <span className="font-medium">{product.minAmount} - {product.maxAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Interest Rate</span>
                    <span className="font-medium">{product.rate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Processing Time</span>
                    <span className="font-medium">{product.processing}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full rounded-lg" variant="default">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Loan Calculator */}
        <Card className="mb-16 rounded-2xl border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl">Loan Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                  <Input
                    id="loanAmount"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="businessTurnover">Annual Turnover (₹)</Label>
                  <Input
                    id="businessTurnover"
                    value={businessTurnover}
                    onChange={(e) => setBusinessTurnover(e.target.value)}
                    className="rounded-lg"
                  />
                </div>
                <Button className="w-full rounded-lg">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate EMI
                </Button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="text-sm text-muted-foreground">Monthly EMI</div>
                  <div className="text-2xl font-bold">₹45,678</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="text-sm text-muted-foreground">Total Interest</div>
                  <div className="text-2xl font-bold">₹2,34,560</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="text-sm text-muted-foreground">Total Amount</div>
                  <div className="text-2xl font-bold">₹7,34,560</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};