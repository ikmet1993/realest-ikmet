import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ApiKeyModal from "@/components/ApiKeyModal";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [apiKey, setApiKey] = useState<string | null>(
    localStorage.getItem("openrouter_api_key")
  );

  const handleApiKeySave = (key: string) => {
    setApiKey(key);
    localStorage.setItem("openrouter_api_key", key);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Index apiKey={apiKey} onApiKeySave={handleApiKeySave} />
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
