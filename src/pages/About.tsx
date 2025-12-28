import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import {
  Code2,
  Database,
  Users,
  Bot,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Code2,
      title: "Public Marketing Website",
      description:
        "Features, pricing, and franchise pages with responsive design",
    },
    {
      icon: Shield,
      title: "Authentication & Protected App",
      description:
        "Login/register flows with protected SaaS dashboard routes",
    },
    {
      icon: Zap,
      title: "Workflow Automation Builder",
      description:
        "Visual workflow creation with drag-and-drop interface",
    },
    {
      icon: Bot,
      title: "AI-Assisted Actions",
      description:
        "AI workspace with prompt suggestions (demo mode)",
    },
    {
      icon: Users,
      title: "Teams & Role-Based UI",
      description:
        "Team management with permissions and collaboration",
    },
    {
      icon: Database,
      title: "Billing & Admin UI",
      description:
        "Subscription management and admin dashboard",
    },
  ];

  const techStack = [
    "React + TypeScript",
    "Tailwind CSS",
    "Shadcn/UI Components",
    "React Router",
    "Recharts",
    "Vite",
  ];

  return (
    <div className="min-h-screen bg-gradient-mesh">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            About This <span className="gradient-text">Project</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive SaaS demonstration showcasing real-world product architecture
          </p>
        </div>
      </section>

      {/* Project Info */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <GlassCard className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Project Name
                </p>
                <p className="text-2xl font-bold gradient-text">
                  Workflow AI Suite
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Built By
                </p>
                <p className="text-2xl font-semibold">
                  Shanmugapriya Thangavel
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Purpose
              </p>
              <p className="text-lg">
                Interview-ready SaaS V1 demonstration showcasing production-grade
                frontend architecture, UI/UX patterns, and comprehensive feature
                implementation — built with an India-first (Chennai-based)
                product context.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            What This Project Demonstrates
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <GlassCard key={index} className="p-6">
                <div className="p-3 bg-gradient-primary rounded-lg w-fit mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-12 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-8">
            Technology Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 glass rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Status */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-success" />
              Project Status
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">Frontend:</span>{" "}
                Complete and fully functional with all pages, components, and navigation.
              </p>
              <p>
                <span className="font-semibold text-foreground">Backend:</span>{" "}
                Intentionally mocked for demonstration purposes. Architecture is production-ready.
              </p>
              <p>
                <span className="font-semibold text-foreground">Authentication:</span>{" "}
                UI flows implemented with mock handlers.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <GlassCard className="text-center p-12 bg-gradient-secondary max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Explore the Application
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Navigate through the marketing pages and SaaS dashboard to see the full scope of this project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/features">
                <Button size="lg" className="bg-gradient-primary text-primary-foreground">
                  View Features
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Try Dashboard
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
