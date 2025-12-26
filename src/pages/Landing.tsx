import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import {
  Sparkles,
  Zap,
  Brain,
  BarChart3,
  Users,
  Shield,
  ArrowRight,
  Check
} from "lucide-react";
import chennaiTeamIllustration from "@/assets/chennai-team-illustration.png";

const Landing = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Automation (Demo)",
      description: "Example AI‑assisted workflows shown for demonstration purposes"
    },
    {
      icon: BarChart3,
      title: "Operational Dashboards",
      description: "Clear visual dashboards using mocked business data"
    },
    {
      icon: Users,
      title: "Franchise Management UI",
      description: "Tools to view and compare multi‑branch performance"
    },
    {
      icon: Zap,
      title: "Team Collaboration UI",
      description: "Interface for team coordination and shared workflows"
    },
    {
      icon: Shield,
      title: "Role‑Based Access UI",
      description: "Frontend implementation of permissions and access control"
    },
    {
      icon: Sparkles,
      title: "AI Insights (Demo)",
      description: "Sample AI‑generated insights to demonstrate product vision"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "₹0",
      description: "For exploring the platform and UI flows",
      features: [
        "Up to 5 projects",
        "Sample AI features (demo)",
        "Community support",
        "Mocked data access"
      ]
    },
    {
      name: "Pro",
      price: "₹1,999",
      description: "For teams evaluating franchise operations tooling",
      features: [
        "Unlimited projects",
        "Advanced UI workflows",
        "Priority support (demo)",
        "Analytics dashboards",
        "Role‑based access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Contact us",
      description: "For organizations with custom requirements",
      features: [
        "All Pro features",
        "Custom workflows",
        "Extended permissions model",
        "Dedicated onboarding (concept)"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Workflow Automation Platform
              </span>

              <h1 className="text-4xl lg:text-5xl font-semibold leading-tight">
                Automate, Manage, and{" "}
                <span className="text-primary">Scale with Confidence</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl">
                A franchise operations dashboard built to demonstrate practical
                automation, operational visibility, and modern SaaS UX patterns.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link to="/register">
                  <Button size="lg" className="bg-primary text-primary-foreground">
                    Get Started Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/features">
                  <Button size="lg" variant="outline">
                    View Features
                  </Button>
                </Link>
              </div>
            </div>

            <img
              src={chennaiTeamIllustration}
              alt="Chennai‑based SaaS team illustration"
              className="w-full rounded-lg shadow-elevated"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold">
              Features Built for <span className="text-primary">Real Work</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Focused UI flows that reflect real‑world franchise operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, index) => (
              <GlassCard key={index} className="bg-background">
                <div className="p-2.5 bg-primary/10 rounded-lg w-fit mb-4">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold">
              Simple, <span className="text-primary">Transparent Pricing</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              India‑first pricing for demo and evaluation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <GlassCard
                key={index}
                className={`text-center ${plan.popular ? "ring-2 ring-primary" : ""}`}
              >
                {plan.popular && (
                  <div className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full mb-4">
                    Most Popular
                  </div>
                )}

                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-3">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== "Contact us" && (
                    <span className="text-muted-foreground text-sm"> / month</span>
                  )}
                </div>

                <p className="text-muted-foreground text-sm mb-5">{plan.description}</p>

                <ul className="space-y-2.5 mb-6 text-left">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-success mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/register">
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    Get Started
                  </Button>
                </Link>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
