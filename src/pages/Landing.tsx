import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import {
  BarChart3,
  Users,
  Shield,
  Zap,
  ArrowRight,
  Check
} from "lucide-react";
import chennaiTeamIllustration from "@/assets/chennai-team-illustration.png";

const Landing = () => {
  const features = [
    {
      icon: Zap,
      title: "Workflow automation",
      description: "Automated task flows configured through the interface"
    },
    {
      icon: BarChart3,
      title: "Reports and summaries",
      description: "High-level summaries based on available project data"
    },
    {
      icon: Users,
      title: "Franchise tracking",
      description: "View and compare performance across multiple locations"
    },
    {
      icon: Shield,
      title: "Access control",
      description: "Role-based access and permission handling"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "₹0",
      description: "For exploring the interface and basic flows",
      features: [
        "Up to 5 projects",
        "Basic reports",
        "Sample data access"
      ]
    },
    {
      name: "Pro",
      price: "₹1,999",
      description: "For teams evaluating operational workflows",
      features: [
        "Unlimited projects",
        "Advanced reports",
        "Role-based access",
        "Priority support"
      ]
    },
    {
      name: "Enterprise",
      price: "Contact us",
      description: "For organizations with custom requirements",
      features: [
        "All Pro features",
        "Custom workflows",
        "Extended permission model"
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
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-muted border">
                Internal operations tool
              </span>

              <h1 className="text-4xl lg:text-5xl font-semibold leading-tight">
                Manage projects and franchise operations
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl">
                A web application for tracking projects, teams, and franchise activity in one place.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link to="/register">
                  <Button size="lg">
                    Create account
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/features">
                  <Button size="lg" variant="outline">
                    View details
                  </Button>
                </Link>
              </div>
            </div>

            <img
              src={chennaiTeamIllustration}
              alt="Team collaboration illustration"
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
              Core features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Common tools used to manage daily operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, index) => (
              <GlassCard key={index} className="bg-background">
                <div className="p-2.5 bg-muted rounded-lg w-fit mb-4">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
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
              Plans
            </h2>
            <p className="text-lg text-muted-foreground">
              Example plans for evaluation purposes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <GlassCard key={index} className="text-center">
                <h3 className="text-xl font-semibold mb-2">
                  {plan.name}
                </h3>

                <div className="mb-3">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== "Contact us" && (
                    <span className="text-muted-foreground text-sm"> / month</span>
                  )}
                </div>

                <p className="text-muted-foreground text-sm mb-5">
                  {plan.description}
                </p>

                <ul className="space-y-2.5 mb-6 text-left">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-success mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/register">
                  <Button className="w-full" variant="outline">
                    Create account
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

