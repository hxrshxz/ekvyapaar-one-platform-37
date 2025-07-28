import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  FileText, 
  Mic, 
  BarChart3, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Play,
  Volume2,
  Smartphone,
  Bot,
  Settings,
  Download,
  Cloud
} from "lucide-react";

export const BusinessTools = () => {
  const [selectedTool, setSelectedTool] = useState("erp");

  const tools = [
    {
      id: "erp",
      name: "ERP Lite",
      description: "Complete business management with voice commands",
      icon: "📊",
      features: ["Inventory Management", "Billing", "Customer Records", "Voice Commands"],
      price: "Free",
      users: "45,000+",
      rating: 4.8,
      color: "bg-blue-500"
    },
    {
      id: "gst",
      name: "GST Helper",
      description: "GST return filing and input credit tracker",
      icon: "📋",
      features: ["Auto GST Calculation", "Return Filing", "Input Credit", "Compliance Alerts"],
      price: "Free",
      users: "32,000+",
      rating: 4.9,
      color: "bg-green-500"
    },
    {
      id: "accountant",
      name: "AI Accountant",
      description: "Voice expense entry with auto categorization",
      icon: "🤖",
      features: ["Voice Expense Entry", "Auto Categorization", "Tax Reminders", "Financial Reports"],
      price: "Free",
      users: "28,000+",
      rating: 4.7,
      color: "bg-purple-500"
    },
    {
      id: "crm",
      name: "Customer CRM",
      description: "Customer data and follow-up management",
      icon: "👥",
      features: ["Customer Database", "Follow-up Reminders", "Lead Management", "WhatsApp Integration"],
      price: "Free",
      users: "22,000+",
      rating: 4.6,
      color: "bg-orange-500"
    },
    {
      id: "inventory",
      name: "Smart Inventory",
      description: "Real-time stock tracking and alerts",
      icon: "📦",
      features: ["Real-time Tracking", "Low Stock Alerts", "Batch Management", "Barcode Scanning"],
      price: "Free",
      users: "18,500+",
      rating: 4.5,
      color: "bg-indigo-500"
    },
    {
      id: "billing",
      name: "Quick Billing",
      description: "Fast invoicing and payment tracking",
      icon: "🧾",
      features: ["Quick Invoice", "Payment Tracking", "Digital Receipts", "Tax Calculation"],
      price: "Free",
      users: "35,200+",
      rating: 4.8,
      color: "bg-cyan-500"
    }
  ];

  const features = {
    erp: {
      demo: [
        { step: "1", action: "Check Stock", command: "EkVyapar, check steel rod stock", response: "Steel Rod: 150 kg remaining" },
        { step: "2", action: "Add New Order", command: "New order: Ram Construction, 500 bricks", response: "Order saved. Delivery date?" },
        { step: "3", action: "Generate Bill", command: "Create bill for Ram Construction", response: "Bill ready. Send via WhatsApp?" }
      ],
      benefits: [
        "English Voice Commands",
        "Auto Stock Alerts", 
        "WhatsApp Billing",
        "Sales Reports"
      ]
    },
    gst: {
      demo: [
        { step: "1", action: "Sales Entry", command: "Today's sale 50,000 rupees, CGST 9%", response: "Entry saved. Total tax: ₹9,000" },
        { step: "2", action: "Check Returns", command: "How much GST to pay this month?", response: "GSTR-1: ₹45,000, GSTR-3B: ₹38,000" },
        { step: "3", action: "Auto Filing", command: "File the return", response: "Return successfully filed" }
      ],
      benefits: [
        "Auto GST Calculation",
        "Return Filing",
        "Compliance Alerts",
        "Input Credit Tracking"
      ]
    },
    accountant: {
      demo: [
        { step: "1", action: "Add Expense", command: "Spent 5000 rupees on petrol today", response: "Added to transport expenses" },
        { step: "2", action: "Request Report", command: "Show this month's profit", response: "Total Profit: ₹1,25,000 (15% increase)" },
        { step: "3", action: "Tax Reminder", command: "When is the tax due date?", response: "GST: 20th, ITR: 31st July" }
      ],
      benefits: [
        "Voice Expense Entry",
        "Smart Categorization",
        "P&L Reports",
        "Tax Alerts"
      ]
    },
    crm: {
      demo: [
        { step: "1", action: "Add New Lead", command: "New customer: Suresh, mobile 98765", response: "Customer added. When to follow up?" },
        { step: "2", action: "Check Follow-ups", command: "Who to call today?", response: "5 customers pending follow-up" },
        { step: "3", action: "Send WhatsApp", command: "Send quotation to Suresh", response: "Quotation sent via WhatsApp" }
      ],
      benefits: [
        "Customer Database",
        "Auto Follow-up",
        "WhatsApp Integration",
        "Sales Pipeline"
      ]
    }
  };

  const successStories = [
    {
      name: "Rajesh Patel",
      business: "Patel Steel Works",
      location: "Ahmedabad",
      benefit: "40% Time Saved with ERP",
      details: "Used to take 4 hours for billing, now just 1 hour",
      tool: "ERP Lite"
    },
    {
      name: "Sunita Devi",
      business: "Devi Garments",
      location: "Delhi",
      benefit: "Zero GST Penalties",
      details: "Auto reminders ensure returns are never late",
      tool: "GST Helper"
    },
    {
      name: "Amit Sharma",
      business: "Sharma Engineering",
      location: "Gurgaon",
      benefit: "25% Profit Increase",
      details: "AI Accountant helped control expenses",
      tool: "AI Accountant"
    }
  ];

  const currentTool = tools.find(t => t.id === selectedTool);
  const currentFeatures = features[selectedTool];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="bg-accent text-white mb-6 text-lg px-6 py-2">
              🛠️ Business Tools
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Manage Your Business
              <span className="text-accent-light block">With Smart Tools</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-primary-foreground/80">
              Complete ERP, GST, and accounting solutions with voice commands.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="text-xl px-8 py-4 h-auto">
                <Play className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="text-xl px-8 py-4 h-auto border-2 border-white text-white hover:bg-white hover:text-primary">
                <Volume2 className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Selection */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Choose Your Tool</h2>
            <p className="text-xl text-muted-foreground">All tools with voice command support</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {tools.map((tool) => (
              <Card 
                key={tool.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 ${
                  selectedTool === tool.id ? 'border-2 border-primary shadow-lg' : ''
                }`}
                onClick={() => setSelectedTool(tool.id)}
              >
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <CardTitle className="text-xl">{tool.name}</CardTitle>
                  <CardDescription className="text-sm">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="text-2xl font-bold text-green-600">{tool.price}</div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Users:</span>
                      <span className="font-semibold">{tool.users}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Rating:</span>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">{tool.rating}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {tool.features.slice(0, 2).map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    className="w-full"
                    variant={selectedTool === tool.id ? "default" : "outline"}
                  >
                    {selectedTool === tool.id ? "Selected" : "Select"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Tool Details */}
          {currentTool && (
            <Card className="max-w-6xl mx-auto shadow-xl">
              <CardHeader className="bg-gradient-to-r from-primary to-primary-light text-white">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{currentTool.icon}</div>
                  <div>
                    <CardTitle className="text-3xl">{currentTool.name}</CardTitle>
                    <CardDescription className="text-blue-100 text-lg">
                      {currentTool.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <Tabs defaultValue="demo" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="demo">Voice Demo</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="demo" className="mt-6">
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold mb-4">🎤 Voice Commands Demo</h3>
                        <p className="text-muted-foreground">Press mic and speak, everything else is automatic</p>
                      </div>

                      <div className="grid gap-6">
                        {currentFeatures.demo.map((item, index) => (
                          <Card key={index} className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                                {item.step}
                              </div>
                              <div className="flex-1 space-y-3">
                                <h4 className="font-semibold text-lg">{item.action}</h4>
                                
                                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Mic className="h-4 w-4 text-blue-600" />
                                    <span className="text-sm font-semibold text-blue-700">You say:</span>
                                  </div>
                                  <p className="text-blue-800">"{item.command}"</p>
                                </div>

                                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Bot className="h-4 w-4 text-green-600" />
                                    <span className="text-sm font-semibold text-green-700">AI Response:</span>
                                  </div>
                                  <p className="text-green-800">"{item.response}"</p>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">
                                <Play className="h-4 w-4" />
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="features" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-2xl font-bold mb-6">Key Features</h3>
                        <div className="space-y-4">
                          {currentFeatures.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 text-green-500" />
                              <span className="text-lg">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold mb-6">Technical Features</h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Smartphone className="h-5 w-5 text-blue-500" />
                            <span>Android & iOS Apps</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Cloud className="h-5 w-5 text-blue-500" />
                            <span>Cloud Sync</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Volume2 className="h-5 w-5 text-blue-500" />
                            <span>Voice AI</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Download className="h-5 w-5 text-blue-500" />
                            <span>Offline Mode</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="pricing" className="mt-6">
                    <div className="text-center space-y-6">
                      <div className="text-4xl font-bold text-green-600">{currentTool.price}</div>
                      <p className="text-xl text-muted-foreground">Per month, including GST</p>
                      
                      <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                        <Card className="p-4">
                          <div className="text-lg font-semibold">30 Day Free Trial</div>
                          <div className="text-sm text-muted-foreground">No limits</div>
                        </Card>
                        <Card className="p-4">
                          <div className="text-lg font-semibold">Free Setup</div>
                          <div className="text-sm text-muted-foreground">Expert help</div>
                        </Card>
                        <Card className="p-4">
                          <div className="text-lg font-semibold">24/7 Support</div>
                          <div className="text-sm text-muted-foreground">In English</div>
                        </Card>
                      </div>

                      <Button size="lg" className="text-xl px-12 py-4 h-auto">
                        <ArrowRight className="mr-2 h-5 w-5" />
                        Start Free Trial
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground">Real reviews from MSMEs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-500 text-white">{story.tool}</Badge>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">★</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-2xl font-bold text-primary">{story.benefit}</div>
                  <p className="text-muted-foreground italic">"{story.details}"</p>
                  
                  <div className="pt-4 border-t">
                    <div className="font-bold">{story.name}</div>
                    <div className="text-sm text-muted-foreground">{story.business}</div>
                    <div className="text-sm text-muted-foreground">{story.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Tools Summary */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Complete Toolkit</h2>
            <div className="text-6xl font-bold text-green-600 mb-4">FREE</div>
            <p className="text-xl text-muted-foreground">All 6 tools together absolutely free</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 shadow-xl">
              <div className="text-center space-y-6">
                <h3 className="text-3xl font-bold">🎉 Complete Business Suite</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Included:</h4>
                    <div className="space-y-2">
                      {tools.map((tool) => (
                        <div key={tool.id} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span>{tool.icon} {tool.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Extra Benefits:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Priority Support</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Free Upgrades</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Data Export</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Custom Reports</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
                  <div className="text-lg font-semibold text-yellow-800 mb-2">
                    🎁 Limited Time Offer
                  </div>
                  <div className="text-yellow-700">
                    First 100 customers get 6 months free! Just ₹199 for 1 year subscription
                  </div>
                </div>

                <Button size="lg" className="text-2xl px-16 py-6 h-auto">
                  <TrendingUp className="mr-2 h-6 w-6" />
                  Start Now - Free Trial
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};