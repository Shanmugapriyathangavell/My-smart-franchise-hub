import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/GlassCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Home, LayoutDashboard, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-mesh flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4 pt-16">
        <div className="text-center max-w-lg">
          <GlassCard className="p-12">
            {/* 404 Illustration */}
            <div className="mb-8">
              <div className="text-8xl font-bold gradient-text mb-4">404</div>
              <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">
              Page Not Found
            </h1>
            
            <p className="text-muted-foreground mb-8">
              Oops! The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-primary text-primary-foreground hover:shadow-glow">
                  <Home className="w-4 h-4 mr-2" />
                  Go to Home
                </Button>
              </Link>
              
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Go to Dashboard
                </Button>
              </Link>
            </div>

            {/* Additional Help */}
            <div className="mt-8 pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-4">
                Need help finding something?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/help" className="text-primary hover:underline flex items-center justify-center gap-1">
                  <Search className="w-4 h-4" />
                  Search Help Center
                </Link>
                <span className="hidden sm:inline text-muted-foreground">•</span>
                <Link to="/contact" className="text-primary hover:underline">
                  Contact Support
                </Link>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-6">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.history.back()}
                className="text-muted-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </GlassCard>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
