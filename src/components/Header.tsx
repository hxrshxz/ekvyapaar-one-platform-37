"use client";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, Phone, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "./contexts/LanguageContext";
import { Link as Scroll } from "react-scroll";
import { toast } from "sonner";
import ekvyapaarLogo from "@/assets/ekvyapaar-logo.png";
import { LoginModal } from "@/pages/LoginModal";
import { useState, useEffect } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const [activeLink, setActiveLink] = useState(
    location.pathname === "/" ? "home" : location.pathname
  );

  useEffect(() => {
    setActiveLink(location.pathname === "/" ? "home" : location.pathname);
  }, [location.pathname]);

  const navItems = isAuthenticated
    ? [
        { href: "/dashboard", label: t("header.nav.dashboard"), scroll: false },
        { href: "/finance", label: t("header.nav.finance"), scroll: false },
        { href: "/marketplace", label: t("header.nav.marketplace"), scroll: false },
        { href: "/tools", label: t("header.nav.tools"), scroll: false },
        { href: "/support", label: t("header.nav.support"), scroll: false },
      ]
    : [
        { href: "home", label: t("header.nav.home"), scroll: true },
        { href: "features", label: "Features", scroll: true },
        { href: "testimonials", label: "Testimonials", scroll: true },
      ];

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logged out successfully!");
  };
  
  return (
    <>
      <header className="sticky top-4 z-50 w-full">
        {/* --- MODIFIED: Updated background to a visible gray glass effect, removed animation logic --- */}
        <div className="container flex items-center justify-between h-16 bg-slate-100/60 backdrop-blur-2xl border border-slate-200/80 shadow-lg rounded-full px-4">
          <Link to="/" className="flex items-center space-x-2">
            <img src={ekvyapaarLogo} alt="EkVyapaar Logo" className="h-11 rounded w-auto" />
            <span className="font-bold text-xl text-slate-800">EkVyapaar</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 bg-white/50 rounded-full p-1">
            {navItems.map((item) =>
              item.scroll ? (
                <Scroll
                  key={item.href}
                  to={item.href}
                  spy={true}
                  smooth={true}
                  duration={600}
                  offset={-80}
                  onSetActive={() => setActiveLink(item.href)}
                  // --- MODIFIED: Added hover effect for non-active links ---
                  className={`cursor-pointer relative text-sm font-medium transition-colors duration-300 rounded-full px-4 py-2 ${
                    activeLink === item.href
                      ? "text-white"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/60"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {activeLink === item.href && (
                    <motion.div
                      layoutId="active-pill-header"
                      className="absolute inset-0 bg-sky-500"
                      style={{ borderRadius: 9999 }}
                      transition={{ duration: 0.6, type: "spring" }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Scroll>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  // --- MODIFIED: Added hover effect for non-active links ---
                  className={`relative text-sm font-medium transition-colors duration-300 rounded-full px-4 py-2 ${
                    activeLink === item.href
                      ? "text-white"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/60"
                  }`}
                >
                  {activeLink === item.href && (
                    <motion.div
                      layoutId="active-pill-header"
                      className="absolute inset-0 bg-sky-500"
                      style={{ borderRadius: 9999 }}
                      transition={{ duration: 0.6, type: "spring" }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center rounded-full p-1 bg-white/50">
              <Button
                variant={lang === "en" ? "secondary" : "ghost"}
                size="sm"
                className="rounded-full px-3"
                onClick={() => setLang("en")}
              >
                {t("header.actions.lang.en")}
              </Button>
              <Button
                variant={lang === "hi" ? "secondary" : "ghost"}
                size="sm"
                className="rounded-full px-3"
                onClick={() => setLang("hi")}
              >
                {t("header.actions.lang.hi")}
              </Button>
            </div>

            {!isAuthenticated && (
              <Button
                variant="outline"
                size="sm"
                className="hidden md:inline-flex rounded-full bg-white/50 border-slate-300/70 text-slate-700 hover:bg-slate-100/70 hover:text-slate-900"
                onClick={() => setShowLoginModal(true)}
              >
                <User className="h-4 w-4 mr-2" />
                {t("header.actions.login")}
              </Button>
            )}

            {isAuthenticated && (
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="hidden md:inline-flex rounded-full bg-white/50 border-slate-300/70 text-slate-700 hover:bg-slate-100/70 hover:text-slate-900"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            )}

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-10 w-10 rounded-full bg-white/50 border border-slate-300/70 text-slate-700 hover:bg-slate-100/70 hover:text-slate-900"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] bg-white/80 backdrop-blur-xl border-l-slate-200/80 text-slate-900"
              >
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) =>
                    item.scroll ? (
                      <Scroll key={item.href} to={item.href} spy={true} smooth={true} duration={500} offset={-80} onClick={() => setIsOpen(false)} className="cursor-pointer text-lg text-slate-700 hover:text-sky-500 transition-colors">{item.label}</Scroll>
                    ) : (
                      <Link key={item.href} to={item.href} onClick={() => setIsOpen(false)} className="text-lg text-slate-700 hover:text-sky-500 transition-colors">{item.label}</Link>
                    )
                  )}

                  <div className="pt-4 border-t border-slate-200/80 space-y-2">
                    {!isAuthenticated && (
                      <Button
                        variant="outline"
                        className="w-full justify-start rounded-lg text-lg p-3 h-auto bg-transparent border-slate-200/80 text-slate-700 hover:bg-slate-100/70 hover:text-slate-900"
                        onClick={() => {
                          setShowLoginModal(true);
                          setIsOpen(false);
                        }}
                      >
                        <User className="h-5 w-5 mr-3" />
                        {t("header.actions.login")}
                      </Button>
                    )}
                    <Button
                      asChild
                      variant="default"
                      className="w-full justify-start rounded-lg text-lg p-3 h-auto bg-sky-500 hover:bg-sky-600"
                    >
                      <Link to={isAuthenticated ? "/support" : "#"} onClick={!isAuthenticated ? () => {setShowLoginModal(true); setIsOpen(false);} : undefined}>
                        <Phone className="h-5 w-5 mr-3" />
                        {isAuthenticated ? t("header.actions.support") : 'Support'}
                      </Link>
                    </Button>
                    {isAuthenticated && (
                      <Button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        variant="outline"
                        className="w-full justify-start rounded-lg text-lg p-3 h-auto bg-transparent border-slate-200/80 text-slate-700 hover:bg-slate-100/70 hover:text-slate-900"
                      >
                        <LogOut className="h-5 w-5 mr-3" />
                        Logout
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}