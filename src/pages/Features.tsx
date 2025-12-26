import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import { 
  Brain, 
  BarChart3, 
  Users, 
  Zap, 
  Shield, 
  Sparkles,
  Workflow,
  Bot,
  Bell,
  Globe,
  Lock,
  Layers,
  ArrowRight
} from "lucide-react";

const Features = () => {
  const mainFeatures = [
    {
      icon: Brain,
      title: "AI Automation",
      description: "Intelligent workflows that learn and adapt to your business needs. Our AI analyzes patterns and suggests optimizations automatically."
    },
    {
      icon: BarChart3,
      title: "Smart Dashboards",
      description: "Real-time analytics and insights at your fingertips. Customizable widgets and comprehensive reporting tools."
    },
    {
      icon: Users,
      title: "Franchise Analytics",
      description: "Comprehensive tools to manage and scale your franchise network. Monitor performance across all locations."
    },
    {
      icon: Zap,
      title: "Real-time Chat",
      description: "Instant collaboration with your team and AI assistant. Share files, voice notes, and get AI-powered suggestions."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance with industry standards. SOC 2 Type II certified."
    },
    {
      icon: Sparkles,
      title: "AI Insights",
      description: "Predictive analytics and data-driven recommendations to help you make better business decisions."
    }
  ];

  const additionalFeatures = [
    { icon: Workflow, title: "Visual Workflow Builder", description: "Drag-and-drop automation creation" },
    { icon: Bot, title: "AI Assistant", description: "24/7 intelligent support and suggestions" },
    { icon: Bell, title: "Smart Notifications", description: "Context-aware alerts and reminders" },
    { icon: Globe, title: "Multi-location Support", description: "Manage franchises worldwide" },
    { icon: Lock, title: "Role-based Access", description: "Granular permission controls" },
    { icon: Layers, title: "Integrations", description: "Connect with 100+ popular tools" }
  ];

  return (
    <div className="min-h-screen bg-gradient-mesh">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
            Powerful Features for <span className="gradient-text">Modern Teams</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Everything you need to automate workflows, manage franchises, and scale your business with AI-powered intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/register">
              <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:shadow-glow">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <GlassCard key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="p-4 bg-gradient-primary rounded-lg w-fit mb-4">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            And Much More...
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {additionalFeatures.map((feature, index) => (
              <GlassCard key={index} className="text-center p-6">
                <feature.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-1">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <GlassCard className="text-center p-12 bg-gradient-secondary">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using WorkFlow.AI to automate and scale their operations.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:shadow-glow">
                Start Free Trial
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

export default Features;
