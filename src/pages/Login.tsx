import React, { FormEvent } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

export function Login() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from: string = location.state?.from || "/dashboard";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = (formData.get("username") as string) || "Guest";
    login(username.trim() || "Guest");
    navigate(from, { replace: true });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">
      <Card className="w-full max-w-md bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-2xl">{t('login.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400 mb-6">{t('login.subtitle')}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{t('login.username')}</Label>
              <Input id="username" name="username" placeholder="jane_doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('login.password')}</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-500">{t('login.submit')}</Button>
            <div className="text-center text-sm text-slate-400">
              <span>Back to </span>
              <Link to="/" className="text-sky-400 hover:underline">{t('login.back')}</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default Login;
