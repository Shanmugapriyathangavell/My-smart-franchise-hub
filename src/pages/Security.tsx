import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import {
  ShieldCheck,
  Lock,
  Server,
  CheckCircle
} from "lucide-react";

const Security = () => {
  const securityPillars = [
    {
      icon: Lock,
      title: "Secure Authentication",
      description:
        "Industry-standard authentication flows with encrypted credential handling and protected routes."
    },
    {
      icon: ShieldCheck,
      title: "Data Protection",
      description:
        "End-to-end encryption for sensitive data in transit and at rest, following best practices."
    },
    {
      icon: Server,
      title: "Infrastructure Security",
      description:
        "Cloud-based infrastructure designed with regular monitoring, backups, and access controls."
    }
  ];

  const roadmap = [
    "SOC 2 Type II certification",
    "24/7 security monitoring",
    "Data backup and recovery",
    "Regular penetration testing",
    "Incident response procedures"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Security</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          How we protect your data and ensure platform security
        </p>
      </section>

      {/* Security Pillars */}
      <section className="py-12 px-4">
        <div className="container mx-auto grid md:grid-cols-3 gap-6 max-w-6xl">
          {securityPillars.map((item, index) => (
            <GlassCard key={index} className="p-6 text-center">
              <item.icon className="w-10 h-10 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" />
              Production Security Roadmap
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {roadmap.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-muted/40 rounded-md text-sm text-muted-foreground">
              <strong>Note:</strong> This is a demonstration project. The security
              features described represent the planned architecture for a
              production deployment.
            </div>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Security;
