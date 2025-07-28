import { useState } from "react";
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
  BookOpen, 
  Users, 
  Headphones,
  Search,
  Star,
  Download,
  HelpCircle,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export const Support = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const supportOptions = [
    {
      type: "call",
      title: "Talk to MSME Support",
      description: "Instant phone call support",
      availability: "24/7 Available",
      responseTime: "Instant",
      icon: Phone,
      color: "bg-green-500",
      action: "Call Now"
    },
    {
      type: "video",
      title: "Video Call Support",
      description: "Screen sharing guidance",
      availability: "9 AM - 9 PM",
      responseTime: "2-3 minutes",
      icon: Video,
      color: "bg-blue-500",
      action: "Start Video Call"
    },
    {
      type: "chat",
      title: "WhatsApp Support",
      description: "Chat, photos and voice messages",
      availability: "24/7 Available",
      responseTime: "5-10 minutes",
      icon: MessageCircle,
      color: "bg-green-600",
      action: "Open WhatsApp"
    },
    {
      type: "center",
      title: "Find Nearby Center",
      description: "Personal help at local centers",
      availability: "10 AM - 8 PM",
      responseTime: "Same Day",
      icon: MapPin,
      color: "bg-orange-500",
      action: "View Centers"
    },
    {
      type: "email",
      title: "Email Support",
      description: "Detailed written assistance",
      availability: "24/7 Available",
      responseTime: "2-4 hours",
      icon: HelpCircle,
      color: "bg-purple-500",
      action: "Send Email"
    },
    {
      type: "live",
      title: "Live Chat",
      description: "Real-time text support",
      availability: "9 AM - 9 PM",
      responseTime: "1-2 minutes",
      icon: MessageCircle,
      color: "bg-cyan-500",
      action: "Start Chat"
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
      thumbnail: "📱",
      description: "2-minute registration with Udyam number"
    },
    {
      id: 2,
      title: "Filling Loan Application Form",
      duration: "8:15",
      views: "23,789",
      level: "Beginner",
      category: "Finance",
      thumbnail: "💰",
      description: "Learn step-by-step loan application process"
    },
    {
      id: 3,
      title: "How to Apply for GeM Tenders",
      duration: "12:45",
      views: "18,234",
      level: "Intermediate",
      category: "Marketplace",
      thumbnail: "📋",
      description: "Complete guide to bidding on government tenders"
    },
    {
      id: 4,
      title: "ERP Lite - Voice Commands Guide",
      duration: "15:22",
      views: "31,567",
      level: "Advanced",
      category: "Business Tools",
      thumbnail: "🎤",
      description: "Learn to manage business with voice commands"
    },
    {
      id: 5,
      title: "GST Return Filing",
      duration: "10:18",
      views: "28,456",
      level: "Intermediate",
      category: "Business Tools",
      thumbnail: "📊",
      description: "Auto GST filing and compliance"
    },
    {
      id: 6,
      title: "Digital Marketing Basics",
      duration: "20:35",
      views: "15,789",
      level: "Beginner",
      category: "Marketing",
      thumbnail: "📱",
      description: "Business promotion on social media and Google"
    }
  ];

  const faqs = [
    {
      question: "What is required for EkVyapar registration?",
      answer: "Just Udyam registration number and mobile number. Registration completed in 2 minutes."
    },
    {
      question: "How long does loan approval take?",
      answer: "Pre-approval within 48 hours. Final approval in 5-7 days."
    },
    {
      question: "Are all services available in English?",
      answer: "Yes, the entire platform is available in English. Voice commands also work in English."
    },
    {
      question: "Is ERP data secure?",
      answer: "Yes, bank-level security. Your data is encrypted and safely stored in the cloud."
    }
  ];

  const supportCenters = [
    {
      name: "Mayapuri Center",
      address: "B-14, Mayapuri Industrial Area",
      contact: "+91 98765-43210",
      timing: "10 AM - 8 PM",
      services: ["Registration", "Loan Help", "Tech Support"]
    },
    {
      name: "Lajpat Nagar Center",
      address: "Shop 45, Lajpat Nagar Market",
      contact: "+91 98765-43211",
      timing: "9 AM - 9 PM",
      services: ["Video Call", "Training", "Document Help"]
    },
    {
      name: "Karol Bagh Center",
      address: "15A, First Floor, Karol Bagh",
      contact: "+91 98765-43212",
      timing: "10 AM - 7 PM",
      services: ["GST Support", "Business Consulting"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="bg-accent text-white mb-6 text-lg px-6 py-2">
              📚 Learn & Support
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              We're Here to Help,
              <span className="text-accent-light block">Every Step of the Way</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-primary-foreground/80">
              24/7 support, free training videos, and local help centers
            </p>
            
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
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">How Can We Help?</h2>
            <p className="text-xl text-muted-foreground">Choose support that works for you</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
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
            ))}
          </div>
        </div>
      </section>

      {/* Video Learning */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">📺 Video Training</h2>
            <p className="text-xl text-muted-foreground">Learn everything through short videos like YouTube</p>
          </div>

          {/* Search and Filter */}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoModules.map((video) => (
              <Card key={video.id} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardHeader>
                  <div className="relative">
                    <div className="w-full h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-4xl">
                      {video.thumbnail}
                    </div>
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
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">❓ Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Common questions and answers</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
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
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              <HelpCircle className="h-5 w-5 mr-2" />
              View More Questions
            </Button>
          </div>
        </div>
      </section>

      {/* Local Support Centers */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">📍 Nearby Help Centers</h2>
            <p className="text-xl text-muted-foreground">Personal help at local shops and CSCs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {supportCenters.map((center, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
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
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">📝 Send Feedback</CardTitle>
                <CardDescription className="text-lg">
                  Your feedback is very important to us
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="business">Business Name</Label>
                    <Input id="business" placeholder="Your business" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Help Category</Label>
                    <select className="w-full p-3 border rounded-lg">
                      <option>Loan Related</option>
                      <option>Technical Support</option>
                      <option>Registration Help</option>
                      <option>General Query</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Please describe in detail what kind of help you need..."
                      rows={4}
                    />
                  </div>
                  
                  <Button size="lg" className="w-full text-lg">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Support */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              🚨 Emergency Support
            </h2>
            <p className="text-xl text-red-100 mb-8">
              For urgent problems, call immediately
            </p>
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
          </div>
        </div>
      </section>
    </div>
  );
};