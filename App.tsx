import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/theme-toggle";
import LoadingScreen from "@/components/loading-screen";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import ScrollNavigator from "@/components/scroll-navigator";
import AdsBanner from "@/components/ads-banner";
import smqLogo from "@assets/smq_logo_transparent.png";
import HomePage from "@/pages/home";
import PropertiesPage from "@/pages/properties";
import ArticlesPage from "@/pages/articles";
import AboutPage from "@/pages/about";
import ContactPage from "@/pages/contact";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import PartnersPage from "@/pages/partners";
import AdminPage from "@/pages/admin";
import NotFound from "@/pages/not-found";

function GlobalWatermark() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0" style={{ opacity: 0.05 }}>
      <img
        src={smqLogo}
        alt=""
        className="w-[500px] h-auto"
      />
    </div>
  );
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      html.style.scrollBehavior = "smooth";
    });
  }, [location]);
  return null;
}

function AppContent() {
  const [location] = useLocation();
  const isAdminPage = location.startsWith("/admin");
  const isAuthPage = location === "/login" || location === "/register";

  const isHomePage = location === "/";

  return (
    <>
      <ScrollToTop />
      <GlobalWatermark />
      {!isAdminPage && !isAuthPage && <Navbar />}
      {!isAdminPage && !isAuthPage && <AdsBanner />}
      <div className="relative z-[1]">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/properties" component={PropertiesPage} />
          <Route path="/articles" component={ArticlesPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/partners" component={PartnersPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/admin" component={AdminPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
      {!isAdminPage && !isAuthPage && <Footer />}
      {!isAdminPage && <WhatsappButton />}
      {!isAdminPage && !isAuthPage && <ScrollNavigator />}
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const visited = sessionStorage.getItem("smq_loaded");
    if (visited) {
      setLoading(false);
      setHasLoaded(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
    setHasLoaded(true);
    sessionStorage.setItem("smq_loaded", "1");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AnimatePresence mode="wait">
            {loading && !hasLoaded && <LoadingScreen onComplete={handleLoadingComplete} />}
          </AnimatePresence>
          {(!loading || hasLoaded) && <AppContent />}
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
