"use-client";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, Sun, Moon, Phone, Rocket } from "lucide-react";

// NOTE: This component assumes it is wrapped in a real ThemeProvider.
// For demo purposes, we'll mock a simple theme toggle.

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // A simplified theme state for this component's demo
  const [theme, setTheme] = useState('dark');

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/finance", label: "Finance Hub" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/tools", label: "Business Tools" },
    { href: "/support", label: "Support" },
    { href: "/dashboard", label: "Dashboard" },
  ];
  
  const activePath = location.pathname;

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-9 w-9 bg-gradient-to-br from-sky-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Rocket className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl text-slate-100">EkVyapaar</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 bg-slate-800/50 border border-slate-700 rounded-full p-2 backdrop-blur-lg">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`relative text-sm font-medium transition-colors duration-300 rounded-full px-4 py-2 ${
                activePath === item.href ? "text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {/* This is the animation you wanted to keep */}
              {activePath === item.href && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-sky-600"
                  style={{ borderRadius: 9999 }}
                  transition={{ duration: 0.6, type: "spring" }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right side buttons */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white backdrop-blur-lg">
            {theme === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button variant="outline" size="sm" className="hidden md:inline-flex rounded-full bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white backdrop-blur-lg">
            <User className="h-4 w-4 mr-2" />
            Login
          </Button>
          
          <Button size="sm" className="hidden md:inline-flex rounded-full bg-sky-600 hover:bg-sky-500">
            <Phone className="h-4 w-4 mr-2" />
            Support
          </Button>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-10 w-10 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white backdrop-blur-lg">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-slate-900/80 backdrop-blur-xl border-l-slate-700 text-white">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors duration-200 rounded-lg p-3 ${
                      activePath === item.href ? "text-sky-400 bg-slate-800" : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-slate-700 space-y-2">
                  <Button variant="outline" className="w-full justify-start rounded-lg text-lg p-3 h-auto bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                    <User className="h-5 w-5 mr-3" />
                    Login
                  </Button>
                  <Button variant="default" className="w-full justify-start rounded-lg text-lg p-3 h-auto bg-sky-600 hover:bg-sky-500">
                    <Phone className="h-5 w-5 mr-3" />
                    Contact Support
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}