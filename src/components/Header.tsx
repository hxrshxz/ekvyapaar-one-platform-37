"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// Removed: import { useTheme } from "@/contexts/ThemeContext"; // This import caused the error
import { Menu, User, Sun, Moon, Monitor, Phone, Video } from "lucide-react";

// Mock ThemeContext and useTheme hook for demonstration purposes
// In a real application, this would be in a separate file like "@/contexts/ThemeContext"
const ThemeContext = createContext(null);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    // Provide a default or throw an error if the context is not provided
    // For this example, we'll return a default theme and a no-op setTheme
    console.warn("useTheme must be used within a ThemeProvider. Using default theme.");
    return { theme: 'light', setTheme: () => {} };
  }
  return context;
};

// A simple ThemeProvider to wrap the app, if needed for the mock context
// This can be placed higher up in your component tree (e.g., in App.js)
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system'); // Default theme

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // State to track scroll position
  const location = useLocation();
  const { theme, setTheme } = useTheme(); // Now using the mock useTheme

  useEffect(() => {
    const handleScroll = () => {
      // Set 'scrolled' to true if scrollY is greater than 50px, otherwise false
      setScrolled(window.scrollY > 50);
    };

    // Add scroll event listener when component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/finance", label: "Finance Hub" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/tools", label: "Business Tools" },
    { href: "/support", label: "Support" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <header
      className={`
        sticky top-0 z-50 w-full transition-all duration-500 ease-in-out // Increased duration for smoother transition
        ${scrolled
          ? "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-lg shadow-lg rounded-full px-6 py-2 max-w-7xl mx-auto mt-4"
          : "bg-background/95 border-b px-4 py-4" // Adjusted initial padding for a smoother transition
        }
      `}
    >
      <div className={`container flex items-center justify-between transition-all duration-500 ease-in-out ${scrolled ? "h-12" : "h-16"}`}> {/* Adjust height on scroll, increased duration */}
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200">
          <div className="h-8 w-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center shadow-card">
            <span className="text-primary-foreground font-bold text-sm">E</span>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">EkVyapaar</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`
                text-sm font-medium transition-all duration-200 hover:text-primary hover:scale-105
                ${scrolled ? "text-neutral-600 dark:text-neutral-300" : "text-muted-foreground"}
                ${location.pathname === item.href ? "text-primary font-semibold" : ""}
              `}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side buttons */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 w-9 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200">
                {theme === 'light' && <Sun className="h-4 w-4" />}
                {theme === 'dark' && <Moon className="h-4 w-4" />}
                {theme === 'system' && <Monitor className="h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-lg shadow-lg">
              <DropdownMenuItem onClick={() => setTheme('light')} className="cursor-pointer">
                <Sun className="h-4 w-4 mr-2" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')} className="cursor-pointer">
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')} className="cursor-pointer">
                <Monitor className="h-4 w-4 mr-2" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Support Button */}
          <div className="hidden md:flex items-center space-x-1">
            <Button variant="accent" size="sm" className="rounded-lg">
              <Phone className="h-4 w-4 mr-2" />
              Support
            </Button>
          </div>

          <Button variant="outline" size="sm" className="rounded-lg">
            <User className="h-4 w-4 mr-2" />
            Login
          </Button>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden rounded-lg">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 rounded-l-lg">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-all duration-200 hover:text-primary hover:scale-105 rounded-lg p-2 ${
                      location.pathname === item.href
                        ? "text-primary font-semibold bg-accent/20"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="pt-4 border-t space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-lg"
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  >
                    {theme === 'light' ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                    {theme === 'light' ? 'Dark' : 'Light'}
                  </Button>
                  <Button variant="ghost" className="w-full justify-start rounded-lg">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>

                  {/* Mobile Support Options */}
                  <div className="pt-4 mt-4 border-t">
                    <div className="flex space-x-2">
                      <Button variant="accent" size="sm" className="flex-1 rounded-lg">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 rounded-lg">
                        <Video className="h-4 w-4 mr-1" />
                        Video Call
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
