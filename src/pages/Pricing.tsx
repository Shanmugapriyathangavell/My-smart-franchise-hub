import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import { Check, ArrowRight, HelpCircle } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "For exploring the product UI and core workflows",
      features: [
        "Up to 5 projects",
        "Sample AI features (demo)",
        "Community support",
        "Mocked data access",
        "Basic dashboards"
      ],
      cta: "Get Started Free"
    },
    {
      name: "Pro",
      price: "₹1,999",
      period: "per month",
      description: "For teams evaluating franchise operations tooling",
      features: [
        "Unlimited projects",
        "Advanced UI workflows",
        "Analytics dashboards",
        "Role‑based access",
        "Team collaboration UI",
        "Export & reports (demo)"
      ],
      popular: true,
      cta: "Start Pro"
    },
    {
      name: "Enterprise",
      price: "Contact us",
      period: "",
      description: "For organizations with custom requirements",
      features: [
        "All Pro features",
        "Custom workflows",
        "Extended permissions model",
        "Dedicated onboarding (concept)",
        "Compliance‑ready architecture"
      ],
      cta: "Contact Sales"
    }
  ];

  const faqs = [
    {
      question: "Is this a real product or a demo?",
      answer:
        "This is an interview‑ready SaaS V1. Frontend and product flows are complete. Backend services and AI responses are intentionally mocked."
    },
    {
      question: "Is payment required to use this app?",
      answer:
        "No. Pricing is shown to demonstrate SaaS structure and user flows. Payments are not enabled."
    },
    {
      question: "Can this be connected to a real backend later?",
      answer:
        "Yes. The frontend architecture is production‑ready and can be integrated with real services."
    },
    {
      question: "Who is this product built for?",
      answer:
        "Multi‑branch businesses and franchise operators looking for operational visibility and reporting."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-mesh">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            India‑first pricing designed to demonstrate SaaS product structure
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <GlassCard
                key={index}
                className={`text-center relative ${
                  plan.popular ? "ring-2 ring-primary" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm rounded-full">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2 mt-2">{plan.name}</h3>

                <div className="mb-4">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground ml-2">
                      /{plan.period}
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground mb-6">
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-8 text-left">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-success" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to={plan.name === "Enterprise" ? "/contact" : "/register"}>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            <HelpCircle className="w-8 h-8 inline mr-2" />
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <GlassCard key={index} className="p-6">
                <h4 className="font-semibold mb-2">{faq.question}</h4>
                <p className="text-muted-foreground">{faq.answer}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
