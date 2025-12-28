import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import { Briefcase, ArrowRight } from "lucide-react";

const Careers = () => {
  return (
    <div className="min-h-screen bg-gradient-mesh">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
            <span className="gradient-text">Careers</span>
          </h1>
          <p
            className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Join our team and help shape the future of workflow automation
          </p>
        </div>
      </section>

      {/* Demo Notice */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <GlassCard className="p-12 text-center">
            <Briefcase className="w-16 h-16 mx-auto mb-6 text-primary" />

            <h2 className="text-2xl font-bold mb-4">Demo Project</h2>

            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              This is a demonstration SaaS project. Hiring is not currently
              active. This page illustrates how a careers section would be
              structured in a production application.
            </p>

            <div className="p-4 glass rounded-lg text-left max-w-md mx-auto mb-8">
              <p className="font-medium mb-2">
                In a production environment, this would include:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Open positions listing</li>
                <li>• Company culture information</li>
                <li>• Benefits and perks</li>
                <li>• Application submission form</li>
              </ul>
            </div>

            <Link to="/about">
              <Button className="bg-gradient-primary text-primary-foreground hover:shadow-glow">
                Learn About the Project
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

export default Careers;
