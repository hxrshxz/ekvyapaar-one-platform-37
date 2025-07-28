import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  IndianRupee, 
  Users, 
  ShoppingCart, 
  Bell, 
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  Target,
  Briefcase,
  Star,
  ArrowRight,
  Calendar,
  FileText,
  Wallet,
  Package
} from "lucide-react";
import dashboardHero from "@/assets/dashboard-hero.jpg";

export function Dashboard() {
  const quickActions = [
    { label: "View Profile", icon: Eye },
    { label: "New Order", icon: Package },
    { label: "Apply for Loan", icon: Wallet },
    { label: "GST Filing", icon: FileText },
    { label: "View Tenders", icon: Target },
    { label: "Update Inventory", icon: Package }
  ];

  const activities = [
    { icon: CheckCircle2, text: "Loan Approved - ₹5,00,000", time: "2 hours ago", color: "text-success" },
    { icon: Target, text: "New Tender Match - LED Bulb Supply", time: "4 hours ago", color: "text-primary" },
    { icon: ShoppingCart, text: "New Order Received - 1000 Units", time: "6 hours ago", color: "text-accent" },
    { icon: AlertCircle, text: "GST Filing Due - 20th July", time: "1 day ago", color: "text-warning" },
    { icon: Eye, text: "Your profile viewed 25 times", time: "2 days ago", color: "text-muted-foreground" },
    { icon: IndianRupee, text: "Payment Received - ₹75,000", time: "3 days ago", color: "text-success" }
  ];

  const growthData = [
    { month: "January", revenue: "₹2.5L" },
    { month: "February", revenue: "₹3.2L" },
    { month: "March", revenue: "₹4.1L" },
    { month: "April", revenue: "₹3.8L" },
    { month: "May", revenue: "₹4.5L" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden rounded-b-2xl">
        <img 
          src={dashboardHero} 
          alt="Business Dashboard" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Business Dashboard
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Complete overview of your business in one place
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-20 relative z-10">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Revenue</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-success to-success-light bg-clip-text text-transparent">₹45,230</p>
                </div>
                <div className="p-3 bg-success/10 rounded-xl">
                  <IndianRupee className="h-6 w-6 text-success" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm text-success">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+12.5%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">New Orders</p>
                  <p className="text-2xl font-bold">28</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-xl">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm text-success">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+8.2%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Customers</p>
                  <p className="text-2xl font-bold">1,247</p>
                </div>
                <div className="p-3 bg-accent/10 rounded-xl">
                  <Users className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm text-success">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+15.3%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Growth Rate</p>
                  <p className="text-2xl font-bold">23.5%</p>
                </div>
                <div className="p-3 bg-warning/10 rounded-xl">
                  <Target className="h-6 w-6 text-warning" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm text-success">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+3.1%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card className="rounded-2xl border-0 shadow-card hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => (
                    <Button 
                      key={index}
                      variant="outline" 
                      className="h-16 flex-col gap-2 hover:shadow-md hover:-translate-y-1 transition-all duration-200 rounded-lg"
                    >
                      <action.icon className="h-5 w-5" />
                      <span className="text-xs">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Business Health Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="rounded-2xl border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Financial Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Cash Flow</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Profitability</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Liquidity</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Credit Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-success mb-2">742</div>
                    <div className="text-sm text-muted-foreground mb-4">Excellent Credit Score</div>
                    <div className="flex items-center justify-center gap-1">
                      {[1,2,3,4].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-warning text-warning" />
                      ))}
                      <Star className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="rounded-2xl border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <activity.icon className={`h-5 w-5 ${activity.color}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.text}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card className="rounded-2xl border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                  <Badge variant="destructive">3</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                  <p className="text-sm font-medium text-destructive">GST Filing Delay</p>
                  <p className="text-xs text-muted-foreground">File by 20th July</p>
                </div>
                <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
                  <p className="text-sm font-medium text-warning">New Tender Opportunity</p>
                  <p className="text-xs text-muted-foreground">LED Supply - ₹50L</p>
                </div>
                <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                  <p className="text-sm font-medium text-success">Payment Received</p>
                  <p className="text-xs text-muted-foreground">ABC Company - ₹75,000</p>
                </div>
              </CardContent>
            </Card>

            {/* Market Opportunities */}
            <Card className="rounded-2xl border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Market Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <h4 className="font-medium text-sm">Auto Parts Export</h4>
                  <p className="text-xs text-muted-foreground">New market in Germany</p>
                  <Badge variant="secondary" className="mt-2">High Priority</Badge>
                </div>
                <div className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <h4 className="font-medium text-sm">Government Tender</h4>
                  <p className="text-xs text-muted-foreground">School Furniture Supply</p>
                  <Badge variant="outline" className="mt-2">Medium Priority</Badge>
                </div>
                <div className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <h4 className="font-medium text-sm">E-commerce Partnership</h4>
                  <p className="text-xs text-muted-foreground">Amazon B2B</p>
                  <Badge variant="outline" className="mt-2">Low Priority</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Business Growth Chart */}
            <Card className="rounded-2xl border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Business Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {growthData.map((data, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{data.month}</span>
                      <span className={index === growthData.length - 1 ? "text-success font-medium" : ""}>
                        {data.revenue}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}