import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import { FileText, ArrowRight } from "lucide-react";

const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-mesh">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Product <span className="gradient-text">Updates</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed about the latest features and improvements
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <GlassCard className="p-12 text-center">
            <FileText className="w-16 h-16 mx-auto mb-6 text-primary" />

            <h2 className="text-2xl font-bold mb-4">Demo Project</h2>

            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              This is a demonstration SaaS project. Blog content shown here is
              illustrative and represents how a production blog would function.
            </p>

            <div className="space-y-4 text-left max-w-md mx-auto mb-8">
              <div className="p-4 glass rounded-lg">
                <p className="font-medium">Latest Update: v1.0 Release</p>
                <p className="text-sm text-muted-foreground">
                  Complete frontend implementation with all core features
                </p>
              </div>

              <div className="p-4 glass rounded-lg">
                <p className="font-medium">
                  Coming Soon: Backend Integration
                </p>
                <p className="text-sm text-muted-foreground">
                  Real-time data and authentication services
                </p>
              </div>
            </div>

            <Link to="/">
              <Button className="bg-gradient-primary text-primary-foreground hover:shadow-glow">
                Back to Home
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
