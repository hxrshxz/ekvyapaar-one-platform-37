"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Star,
  MapPin,
  Clock,
  Users,
  ShoppingCart,
  FileText,
  TrendingUp,
  ArrowRight,
  Filter,
  Heart,
  Eye,
  MessageCircle,
  Award,
  Download,
  Sparkles, // For All Services
  Factory, // For Manufacturing
  Palette, // For Design Services
  Smartphone, // For Digital Marketing
  Truck, // For Logistics
  Briefcase, // For Accounting
  Laptop, // For Tech Support
  User, // For Freelancer image
  Building, // For Product image (Construction)
  Lightbulb, // For Product image (Electronics)
  ClipboardList, // For Tenders
  Package, // For Inventory
  Settings // For Industrial Valves
} from "lucide-react";
import marketplaceHero from "@/assets/marketplace-hero.jpg";

// Reusable FadeInWhenVisible component
const FadeInWhenVisible = ({ children, delay = 0, duration = 'duration-1500', translateY = 'translate-y-24' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // Changed: Now toggles isVisible based on intersection, allowing re-triggering
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

export const Marketplace = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const serviceCategories = [
    { id: "all", name: "All Services", icon: Sparkles, count: 2847 },
    { id: "manufacturing", name: "Manufacturing", icon: Factory, count: 845 },
    { id: "design", name: "Design Services", icon: Palette, count: 456 },
    { id: "digital", name: "Digital Marketing", icon: Smartphone, count: 289 },
    { id: "logistics", name: "Logistics", icon: Truck, count: 234 },
    { id: "finance", name: "Accounting", icon: Briefcase, count: 178 },
    { id: "tech", name: "Tech Support", icon: Laptop, count: 156 },
    { id: "legal", name: "Legal Services", icon: FileText, count: 98 },
    { id: "hr", name: "HR & Recruitment", icon: Users, count: 72 },
  ];

  const freelancers = [
    {
      name: "Rajesh Kumar",
      title: "CAD Designer & Manufacturing Expert",
      location: "Gurgaon, Haryana",
      rating: 4.9,
      reviews: 127,
      hourlyRate: "₹500/hour",
      skills: ["AutoCAD", "SolidWorks", "3D Modeling", "Manufacturing"],
      image: User, // Lucide Icon
      completedProjects: 89,
      responseTime: "Within 2 hours",
      category: "manufacturing"
    },
    {
      name: "Priya Sharma",
      title: "Digital Marketing Specialist",
      location: "Delhi, India",
      rating: 4.8,
      reviews: 94,
      hourlyRate: "₹400/hour",
      skills: ["Social Media", "SEO", "Content Marketing", "Analytics"],
      image: User, // Lucide Icon
      completedProjects: 156,
      responseTime: "Within 1 hour",
      category: "digital"
    },
    {
      name: "Amit Verma",
      title: "Web Developer & Tech Consultant",
      location: "Bangalore, Karnataka",
      rating: 4.7,
      reviews: 203,
      hourlyRate: "₹600/hour",
      skills: ["React", "Node.js", "MongoDB", "AWS"],
      image: User, // Lucide Icon
      completedProjects: 142,
      responseTime: "Within 3 hours",
      category: "tech"
    },
    {
      name: "Sneha Patel",
      title: "Financial Advisor & CA",
      location: "Mumbai, Maharashtra",
      rating: 4.9,
      reviews: 85,
      hourlyRate: "₹800/hour",
      skills: ["Taxation", "Financial Planning", "GST", "Auditing"],
      image: User, // Lucide Icon
      completedProjects: 67,
      responseTime: "Within 4 hours",
      category: "finance"
    },
    {
      name: "Rohit Singh",
      title: "Logistics & Supply Chain Expert",
      location: "Chennai, Tamil Nadu",
      rating: 4.6,
      reviews: 112,
      hourlyRate: "₹450/hour",
      skills: ["Supply Chain", "Inventory", "Transportation", "Warehousing"],
      image: User, // Lucide Icon
      completedProjects: 98,
      responseTime: "Within 2 hours",
      category: "logistics"
    },
    {
      name: "Kavya Reddy",
      title: "Graphic Designer & Brand Consultant",
      location: "Hyderabad, Telangana",
      rating: 4.8,
      reviews: 156,
      hourlyRate: "₹350/hour",
      skills: ["Graphic Design", "Branding", "UI/UX", "Adobe Creative"],
      image: User, // Lucide Icon
      completedProjects: 234,
      responseTime: "Within 1 hour",
      category: "design"
    },
    {
      name: "Suresh Rao",
      title: "Corporate Lawyer",
      location: "Bengaluru, Karnataka",
      rating: 4.7,
      reviews: 78,
      hourlyRate: "₹1200/hour",
      skills: ["Contract Law", "IP Law", "Business Law"],
      image: User,
      completedProjects: 55,
      responseTime: "Within 6 hours",
      category: "legal"
    },
    {
      name: "Deepa Singh",
      title: "HR Consultant",
      location: "Pune, Maharashtra",
      rating: 4.5,
      reviews: 42,
      hourlyRate: "₹700/hour",
      skills: ["Recruitment", "Payroll", "Employee Relations"],
      image: User,
      completedProjects: 30,
      responseTime: "Within 5 hours",
      category: "hr"
    }
  ];

  const products = [
    {
      name: "Steel Rods - TMT 16mm",
      seller: "Kumar Steel Works",
      price: "₹45,000/ton",
      location: "Mumbai, Maharashtra",
      rating: 4.7,
      reviews: 89,
      image: Building, // Lucide Icon
      inStock: true,
      minOrder: "1 ton"
    },
    {
      name: "LED Bulbs - 9W Pack",
      seller: "Bright Electronics",
      price: "₹120/piece",
      location: "Delhi, India",
      rating: 4.5,
      reviews: 156,
      image: Lightbulb, // Lucide Icon
      inStock: true,
      minOrder: "50 pieces"
    },
    {
      name: "Cement - OPC 53 Grade",
      seller: "BuildMax Supplies",
      price: "₹350/bag",
      location: "Pune, Maharashtra",
      rating: 4.8,
      reviews: 203,
      image: Package, // Lucide Icon
      inStock: false,
      minOrder: "100 bags"
    },
    {
      name: "Industrial Valves - DN50",
      seller: "Precision Engineering",
      price: "₹8,500/unit",
      location: "Ahmedabad, Gujarat",
      rating: 4.6,
      reviews: 75,
      image: Settings, // Lucide Icon
      inStock: true,
      minOrder: "5 units"
    },
    {
      name: "Office Chairs - Ergonomic",
      seller: "Comfort Furnishings",
      price: "₹4,200/piece",
      location: "Hyderabad, Telangana",
      rating: 4.9,
      reviews: 110,
      image: Users, // Lucide Icon (representing office workers)
      inStock: true,
      minOrder: "10 pieces"
    }
  ];

  const tenders = [
    {
      title: "Supply of Office Furniture",
      organization: "Municipal Corporation Delhi",
      value: "₹25,00,000",
      deadline: "15 Feb 2024",
      status: "Open",
      category: "Furniture",
      location: "Delhi",
      documents: 5
    },
    {
      title: "Construction of School Building",
      organization: "Education Department Maharashtra",
      value: "₹1,50,00,000",
      deadline: "28 Feb 2024",
      status: "Open",
      category: "Construction",
      location: "Maharashtra",
      documents: 12
    },
    {
      title: "IT Equipment Procurement",
      organization: "State Bank of India",
      value: "₹75,00,000",
      deadline: "10 Mar 2024",
      status: "Open",
      category: "Technology",
      location: "Pan India",
      documents: 8
    },
    {
      title: "Digital Marketing Services",
      organization: "Ministry of MSME",
      value: "₹50,00,000",
      deadline: "20 Mar 2024",
      status: "Open",
      category: "Marketing",
      location: "Delhi",
      documents: 6
    },
    {
      title: "Logistics Services for FMCG",
      organization: "Reliance Retail",
      value: "₹2,00,00,000",
      deadline: "5 Apr 2024",
      status: "Open",
      category: "Logistics",
      location: "Gujarat",
      documents: 10
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={marketplaceHero}
          alt="Marketplace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          {/* Staggered fade-in for hero content */}
          <div className="flex flex-col items-center">
            <FadeInWhenVisible delay={0} duration="duration-1500" translateY="translate-y-24">
              <h1 className="text-5xl font-bold mb-4">Marketplace</h1>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={200} duration="duration-1500" translateY="translate-y-24">
              <p className="text-xl mb-8">Find services, products, and business opportunities</p>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={400} duration="duration-1500" translateY="translate-y-24">
              <Button variant="secondary" size="lg" className="rounded-lg">
                Explore Market
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="services" className="w-full">
          {/* TabsList with FadeInWhenVisible */}
          <FadeInWhenVisible delay={0} duration="duration-1500" translateY="translate-y-16">
            <TabsList className="grid w-full grid-cols-3 rounded-lg">
              <TabsTrigger value="services">Service Gigs</TabsTrigger>
              <TabsTrigger value="products">Product Store</TabsTrigger>
              <TabsTrigger value="tenders">Tenders & Orders</TabsTrigger>
            </TabsList>
          </FadeInWhenVisible>

          <TabsContent value="services" className="space-y-8">
            {/* Service Categories with FadeInWhenVisible */}
            <FadeInWhenVisible delay={100} duration="duration-1500" translateY="translate-y-16">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {serviceCategories.map((category, index) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    onClick={() => setActiveCategory(category.id)}
                    className="h-auto p-4 flex-col gap-2 rounded-lg"
                  >
                    <category.icon className="h-8 w-8" /> {/* Render Lucide Icon */}
                    <span className="text-xs">{category.name}</span>
                    <Badge variant="secondary" className="text-xs">{category.count}</Badge>
                  </Button>
                ))}
              </div>
            </FadeInWhenVisible>

            {/* Freelancer Cards with staggered FadeInWhenVisible */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freelancers.map((freelancer, index) => (
                <FadeInWhenVisible key={index} delay={index * 100} duration="duration-1000" translateY="translate-y-16">
                  <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-2xl border-0 shadow-card">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <freelancer.image className="h-10 w-10" /> {/* Render Lucide Icon */}
                          <div>
                            <h3 className="font-bold">{freelancer.name}</h3>
                            <p className="text-sm text-muted-foreground">{freelancer.title}</p>
                          </div>
                        </div>
                        <Heart className="h-5 w-5 text-muted-foreground hover:text-red-500 cursor-pointer" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{freelancer.rating}</span>
                          <span className="text-muted-foreground">({freelancer.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{freelancer.location}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {freelancer.skills.slice(0, 3).map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">{skill}</Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-lg font-bold text-primary">{freelancer.hourlyRate}</div>
                        <Button size="sm" className="rounded-lg">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </FadeInWhenVisible>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <FadeInWhenVisible key={index} delay={index * 100} duration="duration-1000" translateY="translate-y-16">
                  <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <product.image className="h-10 w-10" /> {/* Render Lucide Icon */}
                          <div>
                            <h3 className="font-bold">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.seller}</p>
                          </div>
                        </div>
                        <Badge variant={product.inStock ? "secondary" : "destructive"}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{product.rating}</span>
                          <span className="text-muted-foreground">({product.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{product.location}</span>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        Min Order: {product.minOrder}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-lg font-bold text-primary">{product.price}</div>
                        <Button size="sm" disabled={!product.inStock}>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {product.inStock ? "Add to Cart" : "Notify Me"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </FadeInWhenVisible>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tenders" className="space-y-8">
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              {tenders.map((tender, index) => (
                <FadeInWhenVisible key={index} delay={index * 100} duration="duration-1000" translateY="translate-y-16">
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {tender.title}
                          </CardTitle>
                          <CardDescription>{tender.organization}</CardDescription>
                        </div>
                        <Badge variant="secondary">{tender.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Value:</span>
                          <div className="font-semibold text-green-600">
                            {tender.value}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Deadline:</span>
                          <div className="font-semibold text-red-600">
                            {tender.deadline}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Category:</span>
                          <div className="font-semibold">{tender.category}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Location:</span>
                          <div className="font-semibold">{tender.location}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{tender.documents} documents required</span>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </FadeInWhenVisible>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
