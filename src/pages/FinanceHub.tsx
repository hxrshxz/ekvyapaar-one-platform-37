"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
// Recharts for the pie chart
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  CreditCard, TrendingUp, Calculator, FileText, Clock, CheckCircle, ArrowRight, Shield, Zap, Star, Lightbulb, TrendingDown
} from "lucide-react";
import financeHero from "@/assets/finance-hero.jpg";

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

export const FinanceHub = () => {
  const [loanAmount, setLoanAmount] = useState("500000");
  const [downPayment, setDownPayment] = useState("50000"); // New input for down payment
  const [loanTenure, setLoanTenure] = useState("12"); // in months
  const [annualInterestRate, setAnnualInterestRate] = useState("12"); // in percentage
  const [businessTurnover, setBusinessTurnover] = useState("2000000"); // Kept from original, but not used in new calc

  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPrincipal, setTotalPrincipal] = useState(0); // New state for principal
  const [totalAmountPayable, setTotalAmountPayable] = useState(0);

  const [currentCreditScore, setCurrentCreditScore] = useState("700");
  const [businessAge, setBusinessAge] = useState("3"); // in years
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  // Function to calculate EMI
  const calculateEMI = () => {
    const P_loan = parseFloat(loanAmount);
    const DP = parseFloat(downPayment);
    const P = P_loan - DP; // Principal amount to be financed
    const R = parseFloat(annualInterestRate) / (12 * 100); // Monthly interest rate
    const N = parseFloat(loanTenure); // Number of months

    if (P > 0 && R >= 0 && N > 0) {
      const emi = P * R * Math.pow((1 + R), N) / (Math.pow((1 + R), N) - 1);
      setMonthlyEMI(emi);
      const totalAmount = emi * N;
      setTotalAmountPayable(totalAmount);
      setTotalInterest(totalAmount - P);
      setTotalPrincipal(P); // Set the calculated principal
    } else {
      setMonthlyEMI(0);
      setTotalAmountPayable(0);
      setTotalInterest(0);
      setTotalPrincipal(0);
    }
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, downPayment, loanTenure, annualInterestRate]); // Recalculate EMI when inputs change

  const getAiInsights = () => {
    const score = parseInt(currentCreditScore);
    const age = parseInt(businessAge);
    let suggestions = [];

    if (isNaN(score) || score < 300 || score > 900) {
      suggestions.push("Please enter a valid credit score between 300 and 900.");
    } else if (score < 650) {
      suggestions.push("Improve your credit score by paying bills on time.");
      suggestions.push("Reduce outstanding debts to lower credit utilization.");
      suggestions.push("Avoid applying for multiple new credit accounts simultaneously.");
    } else if (score >= 650 && score < 750) {
      suggestions.push("Maintain good credit habits for consistent improvement.");
      suggestions.push("Consider diversifying your credit mix (e.g., secured and unsecured loans).");
      suggestions.push("Regularly check your credit report for errors.");
    } else {
      suggestions.push("Your credit score is excellent! Keep up the great work.");
      suggestions.push("You are highly likely to be eligible for competitive loan rates.");
      suggestions.push("Leverage your strong credit profile for better loan terms.");
    }

    if (isNaN(age) || age < 0) {
      suggestions.push("Please enter a valid business age in years.");
    } else if (age < 2) {
      suggestions.push("Focus on building a strong business history and consistent revenue.");
      suggestions.push("Secure initial small loans and repay them diligently to build a credit history.");
    } else if (age >= 2 && age < 5) {
      suggestions.push("Show consistent revenue growth and profitability.");
      suggestions.push("Maintain clear financial records and audited statements.");
      suggestions.push("Explore government schemes for growing MSMEs.");
    } else {
      suggestions.push("Your business has a solid history, which is a strong positive for lenders.");
      suggestions.push("Explore larger loan amounts or specialized business financing options.");
      suggestions.push("Highlight your business stability and growth in your loan application.");
    }

    setAiSuggestions(suggestions);
    setShowAiSuggestions(true);
  };

  // Data for the pie chart
  const pieChartData = [
    { name: 'Principal', value: totalPrincipal },
    { name: 'Total Interest', value: totalInterest },
  ];

  const COLORS = ['#4CAF50', '#F44336']; // Green for Principal, Red for Interest

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
      color: "bg-green-500" // Changed to a specific green
    },
    {
      name: "Equipment Finance",
      minAmount: "₹5 Lakh",
      maxAmount: "₹50 Lakh",
      rate: "11% onwards",
      processing: "5 days",
      features: ["Asset-backed", "New/Used Equipment", "Longer Tenure"],
      color: "bg-purple-500"
    },
    {
      name: "Working Capital Loan",
      minAmount: "₹1 Lakh",
      maxAmount: "₹25 Lakh",
      rate: "13% onwards",
      processing: "3 days",
      features: ["Flexible Drawdowns", "Short-term Needs", "Revolving Credit"],
      color: "bg-orange-500"
    },
    {
      name: "MSME Project Loan",
      minAmount: "₹10 Lakh",
      maxAmount: "₹5 Crore",
      rate: "9% onwards",
      processing: "10 days",
      features: ["Long-term Investment", "Project Based", "Subsidies Available"],
      color: "bg-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={financeHero}
          alt="Finance Hub"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="flex flex-col items-center">
            <FadeInWhenVisible delay={0} duration="duration-1500" translateY="translate-y-24">
              <h1 className="text-5xl font-bold mb-4">Finance Hub</h1>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={200} duration="duration-1500" translateY="translate-y-24">
              <p className="text-xl mb-8">Get loans, build credit, and grow your business</p>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={400} duration="duration-1500" translateY="translate-y-24">
              <Button variant="accent" size="lg" className="rounded-lg">
                Apply for Loan
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Loan Products */}
        <FadeInWhenVisible delay={0} duration="duration-1500" translateY="translate-y-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Loan Products</h2>
            <p className="text-xl text-muted-foreground">Tailored financing solutions for your business needs</p>
          </div>
        </FadeInWhenVisible>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {loanProducts.map((product, index) => (
            <FadeInWhenVisible key={index} delay={index * 100} duration="duration-1000" translateY="translate-y-16">
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-2xl border-0 shadow-card">
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
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full rounded-lg" variant="default">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            </FadeInWhenVisible>
          ))}
        </div>

        {/* Loan Calculator */}
        <FadeInWhenVisible delay={0} duration="duration-1500" translateY="translate-y-24">
          <Card className="mb-16 rounded-2xl border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">Loan Calculator</CardTitle>
              <CardDescription>Estimate your monthly EMI and total payable amount</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Adjusted grid for pie chart */}
                <div className="space-y-6 col-span-2 lg:col-span-1"> {/* Take 1 column on large screens */}
                  <div>
                    <Label htmlFor="loanAmount">Total Loan Required (₹)</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="downPayment">Down Payment (Optional, ₹)</Label>
                    <Input
                      id="downPayment"
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="loanTenure">Loan Tenure (Months)</Label>
                    <Input
                      id="loanTenure"
                      type="number"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(e.target.value)}
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="annualInterestRate">Annual Interest Rate (%)</Label>
                    <Input
                      id="annualInterestRate"
                      type="number"
                      step="0.1"
                      value={annualInterestRate}
                      onChange={(e) => setAnnualInterestRate(e.target.value)}
                      className="rounded-lg"
                    />
                  </div>
                  <Button onClick={calculateEMI} className="w-full rounded-lg">
                    <Calculator className="mr-2 h-4 w-4" />
                    Recalculate EMI
                  </Button>
                </div>

                <div className="space-y-4 col-span-2 lg:col-span-1"> {/* Take 1 column on large screens */}
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="text-sm text-muted-foreground">Monthly EMI</div>
                    <div className="text-2xl font-bold text-primary">₹{monthlyEMI.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="text-sm text-muted-foreground">Principal Amount</div>
                    <div className="text-2xl font-bold text-blue-600">₹{totalPrincipal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="text-sm text-muted-foreground">Total Interest Payable</div>
                    <div className="text-2xl font-bold text-red-600">₹{totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="text-sm text-muted-foreground">Total Amount Payable</div>
                    <div className="text-2xl font-bold text-green-600">₹{totalAmountPayable.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                </div>

                {/* Pie Chart */}
                <div className="col-span-2 lg:col-span-1 flex items-center justify-center min-h-[250px] lg:min-h-0"> {/* Occupy 1 column on large screens */}
                  {totalAmountPayable > 0 && (
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                  {totalAmountPayable === 0 && (
                    <p className="text-muted-foreground text-center">Enter loan details to see breakdown.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeInWhenVisible>

        {/* AI-Powered Loan Eligibility */}
        <FadeInWhenVisible delay={0} duration="duration-1500" translateY="translate-y-24">
          <Card className="mb-16 rounded-2xl border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-500" />
                AI-Powered Loan Eligibility
              </CardTitle>
              <CardDescription>Get personalized insights to improve your loan approval chances.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="currentCreditScore">Current Credit Score (e.g., CIBIL)</Label>
                    <Input
                      id="currentCreditScore"
                      type="number"
                      value={currentCreditScore}
                      onChange={(e) => setCurrentCreditScore(e.target.value)}
                      className="rounded-lg"
                      min="300"
                      max="900"
                    />
                    <Badge variant="outline" className="mt-2">Typical range: 300-900</Badge>
                  </div>
                  <div>
                    <Label htmlFor="businessAge">Business Age (Years)</Label>
                    <Input
                      id="businessAge"
                      type="number"
                      value={businessAge}
                      onChange={(e) => setBusinessAge(e.target.value)}
                      className="rounded-lg"
                      min="0"
                    />
                  </div>
                  <Button onClick={getAiInsights} className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Get AI Insights
                  </Button>
                </div>
                <div className="space-y-4">
                  {showAiSuggestions && (
                    <FadeInWhenVisible delay={0} duration="duration-1000" translateY="translate-y-0">
                      <h3 className="text-xl font-bold mb-4">AI Suggestions:</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Credit Score Health:</span>
                          <Progress
                            value={(parseInt(currentCreditScore) / 900) * 100}
                            className={`w-2/3 ${
                              parseInt(currentCreditScore) < 650
                                ? "progress-bar-red"
                                : parseInt(currentCreditScore) < 750
                                ? "progress-bar-yellow"
                                : "progress-bar-green"
                            }`}
                          />
                        </div>
                        {aiSuggestions.map((suggestion, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                            <p className="text-muted-foreground text-sm">{suggestion}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-sm text-center text-muted-foreground">
                        <p>These are AI-generated suggestions and not financial advice. Consult a professional for personalized guidance.</p>
                      </div>
                    </FadeInWhenVisible>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeInWhenVisible>
      </div>
    </div>
  );
};
