"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calculator,
  FileText, // For GST Helper
  Mic,
  BarChart3, // For ERP Lite
  ShoppingCart, // Not used directly, but kept from original
  Users, // For Customer CRM, HR Management
  TrendingUp,
  Clock, // Not used directly, but kept from original
  CheckCircle,
  ArrowRight,
  Shield, // Not used directly, but kept from original
  Zap, // Not used directly, but kept from original
  Star,
  Lightbulb, // Not used directly, but kept from original
  TrendingDown, // Not used directly, but kept from original
  Play,
  Volume2,
  Smartphone, // For Digital Marketing Kit
  Bot, // For AI Accountant
  Settings, // General tool icon, kept from original
  Download,
  Cloud,
  Package, // For Smart Inventory
  Receipt, // For Quick Billing
  Brain, // Alternative for AI Accountant
  ClipboardList, // Alternative for GST Helper
  Warehouse, // Alternative for Smart Inventory
  CreditCard // Alternative for Quick Billing
} from "lucide-react";

// Reusable FadeInWhenVisible component (modified to re-trigger on scroll)
const FadeInWhenVisible = ({ children, delay = 0, duration = 'duration-1500', translateY = 'translate-y-24' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // Now toggles isVisible based on intersection, allowing re-triggering
        setIsVisible(entry.isIntersecting);
      });
    }, {
      threshold: 0.1 // Trigger when 10% of the element is visible
    });

    const currentRef = domRef.current; // Capture current ref for cleanup
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`
        transition-all ${duration} ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : `opacity-0 ${translateY}`}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const BusinessTools = () => {
  const [selectedTool, setSelectedTool] = useState("erp");

  const tools = [
    {
      id: "erp",
      name: "ERP Lite",
      description: "Complete business management with voice commands",
      icon: BarChart3, // Changed from "📊"
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
      icon: FileText, // Changed from "📋"
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
      icon: Bot, // Changed from "🤖"
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
      icon: Users, // Changed from "👥"
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
      icon: Package, // Changed from "📦"
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
      icon: Receipt, // Changed from "🧾"
      features: ["Quick Invoice", "Payment Tracking", "Digital Receipts", "Tax Calculation"],
      price: "Free",
      users: "35,200+",
      rating: 4.8,
      color: "bg-cyan-500"
    },
    {
      id: "hr",
      name: "HR Management",
      description: "Employee records and payroll simplified",
      icon: Users, // Using Users again for HR
      features: ["Employee Database", "Attendance Tracking", "Payroll Processing", "Leave Management"],
      price: "Free",
      users: "15,000+",
      rating: 4.4,
      color: "bg-pink-500"
    },
    {
      id: "marketing",
      name: "Digital Marketing Kit",
      description: "Tools for online presence and lead generation",
      icon: Smartphone, // Using Smartphone for marketing
      features: ["Social Media Scheduler", "Email Campaigns", "SEO Analyzer", "Ad Campaign Tracker"],
      price: "Free",
      users: "10,000+",
      rating: 4.3,
      color: "bg-red-500"
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
        "Sales Reports",
        "Multi-user Access"
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
        "Input Credit Tracking",
        "Invoice Matching"
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
        "Tax Alerts",
        "Bank Reconciliation"
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
        "Sales Pipeline",
        "Customer Segmentation"
      ]
    },
    inventory: {
      demo: [
        { step: "1", action: "Check Stock", command: "EkVyapar, check laptop stock", response: "Laptops: 25 units remaining" },
        { step: "2", action: "Add New Stock", command: "Received 10 units of mobile phones", response: "Stock updated. Mobile phones: 120 units" },
        { step: "3", action: "Generate Report", command: "Show low stock items", response: "Low stock: Printer ink, USB drives" }
      ],
      benefits: [
        "Real-time Tracking",
        "Low Stock Alerts",
        "Batch Management",
        "Barcode Scanning",
        "Multi-location Inventory"
      ]
    },
    billing: {
      demo: [
        { step: "1", action: "Create Invoice", command: "Create invoice for ABC Traders, 100 units of product X", response: "Invoice generated. Amount: ₹10,000" },
        { step: "2", action: "Track Payment", command: "Has ABC Traders paid?", response: "Payment pending. Due in 5 days" },
        { step: "3", action: "Send Reminder", command: "Send payment reminder to ABC Traders", response: "Reminder sent via SMS/Email" }
      ],
      benefits: [
        "Quick Invoice Generation",
        "Payment Tracking",
        "Digital Receipts",
        "Tax Calculation",
        "Customizable Templates"
      ]
    },
    hr: {
      demo: [
        { step: "1", action: "Add Employee", command: "Add new employee: Rahul, ID 101, Salary 30000", response: "Employee Rahul added successfully." },
        { step: "2", action: "Process Payroll", command: "Process payroll for this month", response: "Payroll processed. Generate payslips?" },
        { step: "3", action: "Check Leave Balance", command: "Rahul's leave balance", response: "Rahul has 5 sick leaves and 10 casual leaves remaining." }
      ],
      benefits: [
        "Employee Database",
        "Attendance Tracking",
        "Automated Payroll",
        "Leave Management",
        "Compliance Reporting"
      ]
    },
    marketing: {
      demo: [
        { step: "1", action: "Schedule Post", command: "Schedule Facebook post: New product launch tomorrow at 10 AM", response: "Post scheduled successfully." },
        { step: "2", action: "Check Campaign", command: "How is the Diwali campaign performing?", response: "Diwali campaign: 15% conversion rate, 200 new leads." },
        { step: "3", action: "Send Email Blast", command: "Send promotional email to all customers", response: "Email blast initiated. 5000 emails sent." }
      ],
      benefits: [
        "Social Media Scheduler",
        "Email Marketing Campaigns",
        "SEO Analysis",
        "Ad Campaign Tracking",
        "Lead Capture Forms"
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
    },
    {
      name: "Kiran Gupta",
      business: "Gupta Electronics",
      location: "Bengaluru",
      benefit: "Improved Inventory Accuracy",
      details: "Smart Inventory reduced stock discrepancies by 90%",
      tool: "Smart Inventory"
    },
    {
      name: "Sanjay Mehta",
      business: "Mehta Textiles",
      location: "Surat",
      benefit: "Faster Billing & Collections",
      details: "Quick Billing reduced invoice processing time by half",
      tool: "Quick Billing"
    }
  ];

  const currentTool = tools.find(t => t.id === selectedTool);
  // Ensure currentFeatures is defined, handle cases where selectedTool might not match
  const currentFeatures = features[selectedTool] || { demo: [], benefits: [] };


  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <FadeInWhenVisible delay={0} duration="duration-1500" translateY="translate-y-24">
              <Badge className="bg-accent text-white mb-6 text-lg px-6 py-2">
                🛠️ Business Tools
              </Badge>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={150} duration="duration-1500" translateY="translate-y-24">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Manage Your Business
                <span className="text-accent-light block">With Smart Tools</span>
              </h1>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={300} duration="duration-1500" translateY="translate-y-24">
              <p className="text-xl lg:text-2xl mb-8 text-primary-foreground/80">
                Complete ERP, GST, and accounting solutions with voice commands.
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={450} duration="duration-1500" translateY="translate-y-24">
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
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Tools Selection */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible delay={0} duration="duration-1500" translateY="translate-y-24">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary mb-4">Choose Your Tool</h2>
              <p className="text-xl text-muted-foreground">All tools with voice command support</p>
            </div>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {tools.map((tool, index) => (
              <FadeInWhenVisible key={tool.id} delay={index * 100} duration="duration-1000" translateY="translate-y-16">
                <Card
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 ${
                    selectedTool === tool.id ? 'border-2 border-primary shadow-lg' : ''
                  }`}
                  onClick={() => setSelectedTool(tool.id)}
                >
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-4">
                      {/* Render Lucide Icon component */}
                      <tool.icon className="h-10 w-10 mx-auto" />
                    </div>
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
              </FadeInWhenVisible>
            ))}
          </div>

          {/* Selected Tool Details */}
          {currentTool && (
            <FadeInWhenVisible key={selectedTool} delay={0} duration="duration-1500" translateY="translate-y-24"> {/* Key changed to selectedTool for re-animation on tab change */}
              <Card className="max-w-6xl mx-auto shadow-xl">
                <CardHeader className="bg-gradient-to-r from-primary to-primary-light text-white">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">
                      {/* Render Lucide Icon component */}
                      <currentTool.icon className="h-12 w-12" />
                    </div>
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
                        <FadeInWhenVisible delay={0} duration="duration-1000" translateY="translate-y-16">
                          <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold mb-4">🎤 Voice Commands Demo</h3>
                            <p className="text-muted-foreground">Press mic and speak, everything else is automatic</p>
                          </div>
                        </FadeInWhenVisible>

                        <div className="grid gap-6">
                          {currentFeatures.demo.map((item, index) => (
                            <FadeInWhenVisible key={index} delay={index * 150} duration="duration-1000" translateY="translate-y-16">
                              <Card className="p-6">
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
                            </FadeInWhenVisible>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="features" className="mt-6">
                      <div className="grid md:grid-cols-2 gap-8">
                        <FadeInWhenVisible delay={0} duration="duration-1000" translateY="translate-y-16">
                          <div>
                            <h3 className="text-2xl font-bold mb-6">Key Features</h3>
                            <div className="space-y-4">
                              {currentFeatures.benefits.map((benefit, index) => (
                                <FadeInWhenVisible key={index} delay={index * 100} duration="duration-800" translateY="translate-y-8">
                                  <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span className="text-lg">{benefit}</span>
                                  </div>
                                </FadeInWhenVisible>
                              ))}
                            </div>
                          </div>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={100} duration="duration-1000" translateY="translate-y-16">
                          <div>
                            <h3 className="text-2xl font-bold mb-6">Technical Features</h3>
                            <div className="space-y-4">
                              <FadeInWhenVisible delay={200} duration="duration-800" translateY="translate-y-8">
                                <div className="flex items-center gap-3">
                                  <Smartphone className="h-5 w-5 text-blue-500" />
                                  <span>Android & iOS Apps</span>
                                </div>
                              </FadeInWhenVisible>
                              <FadeInWhenVisible delay={300} duration="duration-800" translateY="translate-y-8">
                                <div className="flex items-center gap-3">
                                  <Cloud className="h-5 w-5 text-blue-500" />
                                  <span>Cloud Sync</span>
                                </div>
                              </FadeInWhenVisible>
                              <FadeInWhenVisible delay={400} duration="duration-800" translateY="translate-y-8">
                                <div className="flex items-center gap-3">
                                  <Volume2 className="h-5 w-5 text-blue-500" />
                                  <span>Voice AI</span>
                                </div>
                              </FadeInWhenVisible>
                              <FadeInWhenVisible delay={500} duration="duration-800" translateY="translate-y-8">
                                <div className="flex items-center gap-3">
                                  <Download className="h-5 w-5 text-blue-500" />
                                  <span>Offline Mode</span>
                                </div>
                              </FadeInWhenVisible>
                            </div>
                          </div>
                        </FadeInWhenVisible>
                      </div>
                    </TabsContent>

                    <TabsContent value="pricing" className="mt-6">
                      <div className="text-center space-y-6">
                        <FadeInWhenVisible delay={0} duration="duration-1000" translateY="translate-y-16">
                          <div className="text-4xl font-bold text-green-600">{currentTool.price}</div>
                        </FadeInWhenVisible>
                        <FadeInWhenVisible delay={100} duration="duration-1000" translateY="translate-y-16">
                          <p className="text-xl text-muted-foreground">Per month, including GST</p>
                        </FadeInWhenVisible>

                        <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                          <FadeInWhenVisible delay={200} duration="duration-1000" translateY="translate-y-16">
                            <Card className="p-4">
                              <div className="text-lg font-semibold">30 Day Free Trial</div>
                              <div className="text-sm text-muted-foreground">No limits</div>
                            </Card>
                          </FadeInWhenVisible>
                          <FadeInWhenVisible delay={300} duration="duration-1000" translateY="translate-y-16">
                            <Card className="p-4">
                              <div className="text-lg font-semibold">Free Setup</div>
                              <div className="text-sm text-muted-foreground">Expert help</div>
                            </Card>
                          </FadeInWhenVisible>
                          <FadeInWhenVisible delay={400} duration="duration-1000" translateY="translate-y-16">
                            <Card className="p-4">
                              <div className="text-lg font-semibold">24/7 Support</div>
                              <div className="text-sm text-muted-foreground">In English</div>
                            </Card>
                          </FadeInWhenVisible>
                        </div>

                        <FadeInWhenVisible delay={500} duration="duration-1000" translateY="translate-y-16">
                          <Button size="lg" className="text-2xl px-16 py-6 h-auto">
                            <ArrowRight className="mr-2 h-5 w-5" />
                            Start Free Trial
                          </Button>
                        </FadeInWhenVisible>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </FadeInWhenVisible>
          )}
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible delay={0} duration="duration-1500" translateY="translate-y-24">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary mb-4">Success Stories</h2>
              <p className="text-xl text-muted-foreground">Real reviews from MSMEs</p>
            </div>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <FadeInWhenVisible key={index} delay={index * 150} duration="duration-1000" translateY="translate-y-16">
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
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
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* All Tools Summary */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible delay={0} duration="duration-1500" translateY="translate-y-24">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary mb-4">Complete Toolkit</h2>
              <div className="text-6xl font-bold text-green-600 mb-4">FREE</div>
              <p className="text-xl text-muted-foreground">All 6 tools together absolutely free</p>
            </div>
          </FadeInWhenVisible>

          <div className="max-w-4xl mx-auto">
            <FadeInWhenVisible delay={100} duration="duration-1500" translateY="translate-y-24">
              <Card className="p-8 shadow-xl">
                <div className="text-center space-y-6">
                  <FadeInWhenVisible delay={200} duration="duration-1000" translateY="translate-y-16">
                    <h3 className="text-3xl font-bold">🎉 Complete Business Suite</h3>
                  </FadeInWhenVisible>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FadeInWhenVisible delay={300} duration="duration-1000" translateY="translate-y-16">
                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold">Included:</h4>
                        <div className="space-y-2">
                          {tools.map((tool, index) => (
                            <FadeInWhenVisible key={tool.id} delay={index * 100} duration="duration-800" translateY="translate-y-8">
                              <div className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span><tool.icon className="inline-block h-5 w-5 mr-2" />{tool.name}</span> {/* Render Lucide Icon */}
                              </div>
                            </FadeInWhenVisible>
                          ))}
                        </div>
                      </div>
                    </FadeInWhenVisible>

                    <FadeInWhenVisible delay={400} duration="duration-1000" translateY="translate-y-16">
                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold">Extra Benefits:</h4>
                        <div className="space-y-2">
                          <FadeInWhenVisible delay={500} duration="duration-800" translateY="translate-y-8">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 text-green-500" />
                              <span>Priority Support</span>
                            </div>
                          </FadeInWhenVisible>
                          <FadeInWhenVisible delay={600} duration="duration-800" translateY="translate-y-8">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 text-green-500" />
                              <span>Free Upgrades</span>
                            </div>
                          </FadeInWhenVisible>
                          <FadeInWhenVisible delay={700} duration="duration-800" translateY="translate-y-8">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 text-green-500" />
                              <span>Data Export</span>
                            </div>
                          </FadeInWhenVisible>
                          <FadeInWhenVisible delay={800} duration="duration-800" translateY="translate-y-8">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 text-green-500" />
                              <span>Custom Reports</span>
                            </div>
                          </FadeInWhenVisible>
                        </div>
                      </div>
                    </FadeInWhenVisible>
                  </div>

                  <FadeInWhenVisible delay={900} duration="duration-1000" translateY="translate-y-16">
                    <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
                      <div className="text-lg font-semibold text-yellow-800 mb-2">
                        🎁 Limited Time Offer
                      </div>
                      <div className="text-yellow-700">
                        First 100 customers get 6 months free! Just ₹199 for 1 year subscription
                      </div>
                    </div>
                  </FadeInWhenVisible>

                  <FadeInWhenVisible delay={1000} duration="duration-1000" translateY="translate-y-16">
                    <Button size="lg" className="text-2xl px-16 py-6 h-auto">
                      <TrendingUp className="mr-2 h-6 w-6" />
                      Start Now - Free Trial
                    </Button>
                  </FadeInWhenVisible>
                </div>
              </Card>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>
    </div>
  );
};
