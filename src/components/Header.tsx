"use client";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, Phone, Rocket, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "./contexts/LanguageContext";
import { Link as Scroll } from "react-scroll";
import ekvyapaarLogo from "@/assets/ekvyapaar-logo.png";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const { lang, setLang, t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();

  // MODIFICATION: Set the initial active link to "home" if the path is "/"
  const [activeLink, setActiveLink] = useState(
    location.pathname === "/" ? "home" : location.pathname
  );

  // MODIFICATION: Ensure navigation back to "/" also sets the active link to "home"
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

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center space-x-2">
          {/* Added alt text for accessibility */}
          <img src={ekvyapaarLogo} alt="EkVyapaar Logo" className="h-11 rounded w-auto" />
          <span className="font-bold text-xl text-slate-100">EkVyapaar</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 bg-slate-800/50 border border-slate-700 rounded-full p-2 backdrop-blur-lg">
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
                className={`cursor-pointer relative text-sm font-medium transition-colors duration-300 rounded-full px-4 py-2 ${
                  activeLink === item.href
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {activeLink === item.href && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-sky-600"
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
                className={`relative text-sm font-medium transition-colors duration-300 rounded-full px-4 py-2 ${
                  activeLink === item.href
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {activeLink === item.href && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-sky-600"
                    style={{ borderRadius: 9999 }}
                    transition={{ duration: 0.6, type: "spring" }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            )
          )}
        </nav>

        {/* Right side buttons */}
        <div className="flex items-center space-x-2">
          {/* Language Toggle */}
          <div className="flex items-center rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-lg">
            <Button
              variant={lang === "en" ? "default" : "ghost"}
              size="sm"
              className="rounded-full px-3"
              onClick={() => setLang("en")}
            >
              {t("header.actions.lang.en")}
            </Button>
            <Button
              variant={lang === "hi" ? "default" : "ghost"}
              size="sm"
              className="rounded-full px-3"
              onClick={() => setLang("hi")}
            >
              {t("header.actions.lang.hi")}
            </Button>
          </div>

          {!isAuthenticated && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden md:inline-flex rounded-full bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white backdrop-blur-lg"
            >
              <Link to="/login">
                <User className="h-4 w-4 mr-2" />
                {t("header.actions.login")}
              </Link>
            </Button>
          )}

          {isAuthenticated && (
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="hidden md:inline-flex rounded-full bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white backdrop-blur-lg"
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
                className="md:hidden h-10 w-10 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white backdrop-blur-lg"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-slate-900/80 backdrop-blur-xl border-l-slate-700 text-white"
            >
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) =>
                  item.scroll ? (
                    <Scroll
                      key={item.href}
                      to={item.href}
                      smooth={true}
                      duration={600}
                      offset={-80}
                      className={`cursor-pointer text-lg font-medium transition-colors duration-200 rounded-lg p-3 ${
                        activeLink === item.href
                          ? "text-sky-400 bg-slate-800"
                          : "text-slate-300 hover:bg-slate-800"
                      }`}
                      onClick={() => setIsOpen(false)}
                      onSetActive={() => setActiveLink(item.href)} 
                    >
                      {item.label}
                    </Scroll>
                  ) : (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors duration-200 rounded-lg p-3 ${
                        activeLink === item.href
                          ? "text-sky-400 bg-slate-800"
                          : "text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                )}

                <div className="pt-4 border-t border-slate-700 space-y-2">
                  {!isAuthenticated && (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full justify-start rounded-lg text-lg p-3 h-auto bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <Link to="/login">
                        <User className="h-5 w-5 mr-3" />
                        {t("header.actions.login")}
                      </Link>
                    </Button>
                  )}
                  <Button
                    asChild
                    variant="default"
                    className="w-full justify-start rounded-lg text-lg p-3 h-auto bg-sky-600 hover:bg-sky-500"
                  >
                    <Link to={isAuthenticated ? "/support" : "/login"}>
                      <Phone className="h-5 w-5 mr-3" />
                      {t("header.actions.support")}
                    </Link>
                  </Button>
                  {isAuthenticated && (
                    <Button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      variant="outline"
                      className="w-full justify-start rounded-lg text-lg p-3 h-auto bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
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
  );
}