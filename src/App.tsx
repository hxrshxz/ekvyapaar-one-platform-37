import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./components/contexts/LanguageContext";
import { Header } from "./components/Header";
import { Homepage } from "./pages/Homepage";
import { FinanceHub } from "./pages/FinanceHub";
import {Marketplace} from "./pages/MarketPlace";
import { BusinessTools } from "./pages/BusinessTools";
import { Support } from "./pages/Support";
import { Dashboard } from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
// Removed LoginModal as it's not used in routing
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/RequireAuth";
import PublicOnly from "./components/PublicOnly";

// **** IMPORT THE NEW COMPONENT ****
import {AIAccountant} from "./pages/AIAccountant";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<PublicOnly><Homepage /></PublicOnly>} />
                <Route path="/finance" element={<RequireAuth><FinanceHub /></RequireAuth>} />
                <Route path="/marketplace" element={<RequireAuth><Marketplace /></RequireAuth>} />
                <Route path="/tools" element={<RequireAuth><BusinessTools /></RequireAuth>} />
                
                {/* **** ADD THE NEW ROUTE FOR THE TOOL **** */}
                <Route path="/tools" element={<RequireAuth><AIAccountant/></RequireAuth>} />
                
                <Route path="/support" element={<RequireAuth><Support /></RequireAuth>} />
                <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;