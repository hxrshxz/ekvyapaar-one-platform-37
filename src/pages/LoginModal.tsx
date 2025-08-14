"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext"; // Assuming this is the correct path
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Lock, Loader2 } from "lucide-react";

export const LoginModal = ({ isOpen, onClose }) => {
  // ✨ State for the form, auto-filled with demo credentials
  const [email, setEmail] = useState("demo@ekvyapaar.com");
  const [password, setPassword] = useState("password123");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return; // Basic validation

    setIsLoading(true);

    // ✨ Demo Login Logic: Simulate a network request
    setTimeout(() => {
      // Any non-empty credentials will work for the prototype
      login(email); // Call the real login function from your auth context
      
      setIsLoading(false);
      onClose(); // Close the modal on successful login
    }, 10); // 1-second delay
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome Back</DialogTitle>
          <DialogDescription className="text-slate-400">
            Enter any credentials to log in to the demo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin} className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 bg-slate-800 border-slate-600 focus:border-sky-500"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 bg-slate-800 border-slate-600 focus:border-sky-500"
              />
            </div>
          </div>
          <Button type="submit" disabled={isLoading} className="w-full bg-sky-600 hover:bg-sky-500">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isLoading ? "Logging In..." : "Login"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};