import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import { 
  Search, 
  BookOpen, 
  MessageCircle, 
  Video, 
  FileText,
  HelpCircle,
  ArrowRight
} from "lucide-react";

const Help = () => {
  const { toast } = useToast();

  const showDemoMessage = () => {
    toast({
      title: "Available in Production",
      description: "This feature will be available in the production version.",
    });
  };

  const categories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn the basics and set up your account",
      articles: ["Quick Start Guide", "Account Setup", "First Project", "Invite Team"]
    },
    {
      icon: FileText,
      title: "Features & Tools",
      description: "Explore all features and capabilities",
      articles: ["AI Automation", "Workflow Builder", "Analytics Dashboard", "Integrations"]
    },
    {
      icon: MessageCircle,
      title: "Team Collaboration",
      description: "Work effectively with your team",
      articles: ["Team Chat", "Permissions", "Shared Workspaces", "Activity Feed"]
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      articles: ["Intro to WorkFlow.AI", "Advanced Automations", "AI Assistant Tips", "Best Practices"]
    }
  ];

  const popularArticles = [
    "How to create your first automation",
    "Understanding AI recommendations",
    "Setting up team permissions",
    "Connecting third-party integrations",
    "Customizing your dashboard",
    "Exporting reports and analytics"
  ];

  return (
    <div className="min-h-screen bg-gradient-mesh">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
            Help <span className="gradient-text">Center</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Find answers, learn best practices, and get the most out of WorkFlow.AI
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search for help articles..." 
                className="pl-12 h-14 text-lg"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    showDemoMessage();
                  }
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <GlassCard key={index} className="p-6">
                <div className="p-3 bg-gradient-primary rounded-lg w-fit mb-4">
                  <category.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.articles.map((article, aIndex) => (
                    <li 
                      key={aIndex} 
                      className="text-sm text-primary hover:underline cursor-pointer flex items-center gap-1"
                      onClick={showDemoMessage}
                    >
                      <ArrowRight className="w-3 h-3" />
                      {article}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-12 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-primary" />
            Popular Articles
          </h2>
          <GlassCard className="p-6">
            <ul className="divide-y divide-border">
              {popularArticles.map((article, index) => (
                <li key={index} className="py-4 first:pt-0 last:pb-0">
                  <button 
                    onClick={showDemoMessage}
                    className="w-full flex items-center justify-between cursor-pointer hover:text-primary transition-colors text-left"
                  >
                    {article}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <GlassCard className="text-center p-12 bg-gradient-secondary max-w-3xl mx-auto">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl font-bold mb-4">
              Still Need Help?
            </h2>
            <p className="text-muted-foreground mb-8">
              Our support team is available to help you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:shadow-glow">
                  Contact Support
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                onClick={showDemoMessage}
              >
                Live Chat
              </Button>
            </div>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Help;
