import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Header } from "./components/Header";
import { Homepage } from "./pages/Homepage";
import { FinanceHub } from "./pages/FinanceHub";
import { Marketplace } from "./pages/Marketplace";
import { BusinessTools } from "./pages/BusinessTools";
import { Support } from "./pages/Support";
import { Dashboard } from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/RequireAuth";
import PublicOnly from "./components/PublicOnly";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<PublicOnly><Homepage /></PublicOnly>} />
              <Route path="/login" element={<Login />} />
              <Route path="/finance" element={<RequireAuth><FinanceHub /></RequireAuth>} />
              <Route path="/marketplace" element={<RequireAuth><Marketplace /></RequireAuth>} />
              <Route path="/tools" element={<RequireAuth><BusinessTools /></RequireAuth>} />
              <Route path="/support" element={<RequireAuth><Support /></RequireAuth>} />
              <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
