"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone,
  Video,
  MessageCircle,
  MapPin,
  Clock,
  PlayCircle,
  BookOpen, // For Knowledge Base
  Users, // For Community Forum
  Headphones, // For Support icon
  Search,
  Star, // For ratings
  Download, // For documents
  HelpCircle, // For FAQs, Email Support
  CheckCircle,
  ArrowRight,
  Lightbulb, // For AI Insights
  FileQuestion, // For more FAQs
  Building2, // For new support center
  GraduationCap // For training
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

export const Support = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const supportOptions = [
    {
      type: "call",
      title: "Talk to MSME Support",
      description: "Instant phone call support for urgent queries.",
      availability: "24/7 Available",
      responseTime: "Instant",
      icon: Phone,
      color: "bg-green-500",
      action: "Call Now"
    },
    {
      type: "video",
      title: "Video Call Support",
      description: "Screen sharing and visual guidance for complex issues.",
      availability: "9 AM - 9 PM (Mon-Sat)",
      responseTime: "2-3 minutes",
      icon: Video,
      color: "bg-blue-500",
      action: "Start Video Call"
    },
    {
      type: "chat",
      title: "WhatsApp Support",
      description: "Convenient chat, photos, and voice messages support.",
      availability: "24/7 Available",
      responseTime: "5-10 minutes",
      icon: MessageCircle,
      color: "bg-green-600",
      action: "Open WhatsApp"
    },
    {
      type: "center",
      title: "Find Nearby Center",
      description: "Personalized help and document assistance at local centers.",
      availability: "10 AM - 8 PM (Mon-Fri)",
      responseTime: "Same Day",
      icon: MapPin,
      color: "bg-orange-500",
      action: "View Centers"
    },
    {
      type: "email",
      title: "Email Support",
      description: "Detailed written assistance for non-urgent inquiries.",
      availability: "24/7 Available",
      responseTime: "2-4 hours",
      icon: HelpCircle,
      color: "bg-purple-500",
      action: "Send Email"
    },
    {
      type: "live",
      title: "Live Chat",
      description: "Real-time text support directly on our website.",
      availability: "9 AM - 9 PM (Mon-Sun)",
      responseTime: "1-2 minutes",
      icon: MessageCircle,
      color: "bg-cyan-500",
      action: "Start Chat"
    },
    {
      type: "community",
      title: "Community Forum",
      description: "Connect with other MSMEs and get peer support.",
      availability: "24/7",
      responseTime: "Varies",
      icon: Users,
      color: "bg-yellow-500",
      action: "Visit Forum"
    },
    {
      type: "knowledge",
      title: "Knowledge Base",
      description: "Self-serve articles and guides for common issues.",
      availability: "24/7",
      responseTime: "Instant",
      icon: BookOpen,
      color: "bg-red-500",
      action: "Read Articles"
    }
  ];

  const videoModules = [
    {
      id: 1,
      title: "How to Register on EkVyapar",
      duration: "5:32",
      views: "12,456",
      level: "Beginner",
      category: "Getting Started",
      thumbnail: "https://placehold.co/400x225/A78BFA/ffffff?text=Registration+Guide", // Placeholder image
      description: "A quick guide to completing your 2-minute registration with Udyam number."
    },
    {
      id: 2,
      title: "Filling Loan Application Form",
      duration: "8:15",
      views: "23,789",
      level: "Beginner",
      category: "Finance",
      thumbnail: "https://placehold.co/400x225/4CAF50/ffffff?text=Loan+Application", // Placeholder image
      description: "Learn the step-by-step process for a smooth loan application."
    },
    {
      id: 3,
      title: "How to Apply for GeM Tenders",
      duration: "12:45",
      views: "18,234",
      level: "Intermediate",
      category: "Marketplace",
      thumbnail: "https://placehold.co/400x225/3B82F6/ffffff?text=GeM+Tenders", // Placeholder image
      description: "A complete guide to successfully bidding on government tenders."
    },
    {
      id: 4,
      title: "ERP Lite - Voice Commands Guide",
      duration: "15:22",
      views: "31,567",
      level: "Advanced",
      category: "Business Tools",
      thumbnail: "https://placehold.co/400x225/8B5CF6/ffffff?text=Voice+ERP", // Placeholder image
      description: "Master managing your business operations using simple voice commands."
    },
    {
      id: 5,
      title: "GST Return Filing Simplified",
      duration: "10:18",
      views: "28,456",
      level: "Intermediate",
      category: "Business Tools",
      thumbnail: "https://placehold.co/400x225/10B981/ffffff?text=GST+Filing", // Placeholder image
      description: "Automate your GST filing process and ensure compliance effortlessly."
    },
    {
      id: 6,
      title: "Digital Marketing Basics for MSMEs",
      duration: "20:35",
      views: "15,789",
      level: "Beginner",
      category: "Marketing",
      thumbnail: "https://placehold.co/400x225/EF4444/ffffff?text=Digital+Marketing", // Placeholder image
      description: "Promote your business effectively on social media and Google."
    },
    {
      id: 7,
      title: "Understanding Your Credit Score",
      duration: "7:00",
      views: "9,876",
      level: "Beginner",
      category: "Finance",
      thumbnail: "https://placehold.co/400x225/F59E0B/ffffff?text=Credit+Score", // Placeholder image
      description: "Learn how your credit score impacts your loan eligibility."
    },
    {
      id: 8,
      title: "Inventory Management Best Practices",
      duration: "11:05",
      views: "21,000",
      level: "Intermediate",
      category: "Business Tools",
      thumbnail: "https://placehold.co/400x225/6366F1/ffffff?text=Inventory+Mgmt", // Placeholder image
      description: "Optimize your stock levels and reduce waste with smart strategies."
    }
  ];

  const faqs = [
    {
      question: "What is required for EkVyapar registration?",
      answer: "Just your Udyam registration number and mobile number. The registration process is quick and typically completed in under 2 minutes."
    },
    {
      question: "How long does loan approval take?",
      answer: "You can expect pre-approval within 48 hours. Final loan approval and disbursement usually take between 5-7 business days, depending on documentation."
    },
    {
      question: "Are all services available in English?",
      answer: "Yes, the entire EkVyapar platform, including all business tools, marketplace features, and support options, is fully available in English. Our voice commands also work seamlessly in English."
    },
    {
      question: "Is my business data secure on EkVyapar's ERP?",
      answer: "Absolutely. We employ bank-level security measures to protect your data. All your information is encrypted and safely stored in secure cloud servers."
    },
    {
      question: "Can I get a loan without collateral?",
      answer: "Yes, many of our business loan products, especially instant business loans, are designed to be collateral-free. Eligibility depends on your credit score and business history."
    },
    {
      question: "How do I apply for government tenders through EkVyapar?",
      answer: "Our Marketplace features a dedicated section for GeM tenders. You can find matching tenders, get assistance with documentation, and apply directly through our platform. Watch our 'How to Apply for GeM Tenders' video for a step-by-step guide."
    }
  ];

  const supportCenters = [
    {
      name: "Mayapuri Center",
      address: "B-14, Mayapuri Industrial Area, New Delhi - 110064",
      contact: "+91 98765-43210",
      timing: "10 AM - 8 PM (Mon-Sat)",
      services: ["Registration", "Loan Help", "Tech Support", "Document Verification"]
    },
    {
      name: "Lajpat Nagar Center",
      address: "Shop 45, Central Market, Lajpat Nagar II, New Delhi - 110024",
      contact: "+91 98765-43211",
      timing: "9 AM - 9 PM (Mon-Sun)",
      services: ["Video Call Assistance", "Training Workshops", "GST Filing Support"]
    },
    {
      name: "Karol Bagh Center",
      address: "15A, First Floor, Ajmal Khan Road, Karol Bagh, New Delhi - 110005",
      contact: "+91 98765-43212",
      timing: "10 AM - 7 PM (Mon-Fri)",
      services: ["Business Consulting", "Financial Advisory", "ERP Setup Help"]
    },
    {
      name: "Noida Sector 18 Center",
      address: "G-20, The Great India Place, Sector 18, Noida, UP - 201301",
      contact: "+91 98765-43213",
      timing: "11 AM - 9 PM (All Days)",
      services: ["Marketplace Onboarding", "Product Listing", "Tender Bidding Guidance"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <FadeInWhenVisible delay={0} duration="duration-1500" translateY="translate-y-24">
              <Badge className="bg-accent text-white mb-6 text-lg px-6 py-2">
                📚 Learn & Support
              </Badge>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={150} duration="duration-1500" translateY="translate-y-24">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                We're Here to Help,
                <span className="text-accent-light block">Every Step of the Way</span>
              </h1>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={300} duration="duration-1500" translateY="translate-y-24">
              <p className="text-xl lg:text-2xl mb-8 text-primary-foreground/80">
                24/7 support, free training videos, and local help centers
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={450} duration="duration-1500" translateY="translate-y-24">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="text-xl px-8 py-4 h-auto">
                  <Phone className="mr-2 h-5 w-5" />
                  Get Instant Help
                </Button>
                <Button variant="outline" size="lg" className="text-xl px-8 py-4 h-auto border-2 border-white text-white hover:bg-white hover:text-primary">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Watch Training Videos
                </Button>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible delay={0} duration="duration-1500" translateY="translate-y-24">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary mb-4">How Can We Help?</h2>
              <p className="text-xl text-muted-foreground">Choose support that works for you</p>
            </div>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => (
              <FadeInWhenVisible key={index} delay={index * 100} duration="duration-1000" translateY="translate-y-16">
                <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <option.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                    <CardDescription className="text-sm">{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span>{option.availability}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Headphones className="h-4 w-4 text-blue-600" />
                        <span>Response Time: {option.responseTime}</span>
                      </div>
                    </div>

                    <Button className="w-full">
                      {option.action}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Video Learning */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible delay={0} duration="duration-1500" translateY="translate-y-24">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary mb-4">📺 Video Training</h2>
              <p className="text-xl text-muted-foreground">Learn everything through short videos like YouTube</p>
            </div>
          </FadeInWhenVisible>

          {/* Search and Filter */}
          <FadeInWhenVisible delay={100} duration="duration-1000" translateY="translate-y-16">
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search videos..."
                    className="pl-10 text-lg"
                  />
                </div>
                <Button variant="outline">Filter</Button>
              </div>
            </div>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoModules.map((video, index) => (
              <FadeInWhenVisible key={video.id} delay={index * 100} duration="duration-1000" translateY="translate-y-16">
                <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <CardHeader>
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-40 object-cover rounded-lg"
                        onError={(e) => { 
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = "https://placehold.co/400x225/CCCCCC/000000?text=Video+Thumbnail";
                        }} // Fallback image
                      />
                      <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
                        <PlayCircle className="h-16 w-16 text-white" />
                      </div>
                      <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                        {video.duration}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-4">{video.title}</CardTitle>
                    <CardDescription>{video.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {video.views} views
                      </span>
                      <Badge variant="outline">{video.level}</Badge>
                    </div>

                    <Button className="w-full">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Watch Video
                    </Button>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible delay={0} duration="duration-1500" translateY="translate-y-24">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary mb-4">❓ Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground">Common questions and answers</p>
            </div>
          </FadeInWhenVisible>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <FadeInWhenVisible key={index} delay={index * 100} duration="duration-1000" translateY="translate-y-16">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      Q
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                </Card>
              </FadeInWhenVisible>
            ))}
          </div>

          <FadeInWhenVisible delay={faqs.length * 100 + 100} duration="duration-1000" translateY="translate-y-16">
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                <FileQuestion className="h-5 w-5 mr-2" /> {/* Changed icon */}
                View More Questions
              </Button>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Local Support Centers */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible delay={0} duration="duration-1500" translateY="translate-y-24">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary mb-4">📍 Nearby Help Centers</h2>
              <p className="text-xl text-muted-foreground">Personal help at local shops and CSCs</p>
            </div>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-3 gap-6">
            {supportCenters.map((center, index) => (
              <FadeInWhenVisible key={index} delay={index * 100} duration="duration-1000" translateY="translate-y-16">
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-red-500" />
                      {center.name}
                    </CardTitle>
                    <CardDescription>{center.address}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-green-600" />
                        <span>{center.contact}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span>{center.timing}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Services:</h4>
                      <div className="flex flex-wrap gap-1">
                        {center.services.map((service, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full">
                      <MapPin className="h-4 w-4 mr-2" />
                      View on Map
                    </Button>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <FadeInWhenVisible delay={0} duration="duration-1500" translateY="translate-y-24">
              <Card className="p-8">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold">📝 Send Feedback</CardTitle>
                  <CardDescription className="text-lg">
                    Your feedback is very important to us
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <FadeInWhenVisible delay={100} duration="duration-1000" translateY="translate-y-16">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" placeholder="Your name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Mobile Number</Label>
                          <Input id="phone" placeholder="+91 98765-43210" />
                        </div>
                      </div>
                    </FadeInWhenVisible>

                    <FadeInWhenVisible delay={200} duration="duration-1000" translateY="translate-y-16">
                      <div className="space-y-2">
                        <Label htmlFor="business">Business Name</Label>
                        <Input id="business" placeholder="Your business" />
                      </div>
                    </FadeInWhenVisible>

                    <FadeInWhenVisible delay={300} duration="duration-1000" translateY="translate-y-16">
                      <div className="space-y-2">
                        <Label htmlFor="category">Help Category</Label>
                        <select className="w-full p-3 border rounded-lg">
                          <option>Loan Related</option>
                          <option>Technical Support</option>
                          <option>Registration Help</option>
                          <option>General Query</option>
                          <option>Marketplace Issue</option>
                          <option>Feedback & Suggestions</option>
                        </select>
                      </div>
                    </FadeInWhenVisible>

                    <FadeInWhenVisible delay={400} duration="duration-1000" translateY="translate-y-16">
                      <div className="space-y-2">
                        <Label htmlFor="message">Your Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Please describe in detail what kind of help you need..."
                          rows={4}
                        />
                      </div>
                    </FadeInWhenVisible>

                    <FadeInWhenVisible delay={500} duration="duration-1000" translateY="translate-y-16">
                      <Button size="lg" className="w-full text-lg">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        Send Message
                      </Button>
                    </FadeInWhenVisible>
                  </form>
                </CardContent>
              </Card>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Emergency Support */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <FadeInWhenVisible delay={0} duration="duration-1500" translateY="translate-y-24">
              <h2 className="text-4xl font-bold text-white mb-6">
                🚨 Emergency Support
              </h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={150} duration="duration-1500" translateY="translate-y-24">
              <p className="text-xl text-red-100 mb-8">
                For urgent problems, call immediately
              </p>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={300} duration="duration-1500" translateY="translate-y-24">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" className="text-xl px-12 py-4 h-auto bg-white text-red-600 hover:bg-red-50">
                  <Phone className="mr-2 h-6 w-6" />
                  1800-123-MSME (6763)
                </Button>
                <Button variant="outline" size="lg" className="text-xl px-8 py-4 h-auto border-2 border-white text-white hover:bg-white hover:text-red-600">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp: +91-98765-HELP
                </Button>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>
    </div>
  );
};
