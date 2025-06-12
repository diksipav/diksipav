import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "@/components/Header";
import Home from "./pages/Home";
import Photography from "./pages/Photography";
import NotFound from "./pages/NotFound";
import Read from "@/pages/Read";
import BlogPost from "./pages/BlogPost";
import Footer from "./components/Footer";
import BgLayout from "./components/BgLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <BgLayout>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/photography" element={<Photography />} />
              <Route path="/articles" element={<Read />} />
              <Route path="/articles/:title" element={<BlogPost />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </BgLayout>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
