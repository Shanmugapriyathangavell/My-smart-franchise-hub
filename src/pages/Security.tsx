import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import { Shield, Lock, Eye, Server, CheckCircle } from "lucide-react";

const Security = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: "Secure Authentication",
      description: "Industry-standard authentication flows with encrypted credential handling"
    },
    {
      icon: Eye,
      title: "Data Protection",
      description: "End-to-end encryption for sensitive data in transit and at rest"
    },
    {
      icon: Server,
      title: "Infrastructure Security",
      description: "Cloud infrastructure with regular security audits and monitoring"
    }
  ];

  const roadmap = [
    "SOC 2 Type II certification",
    "Regular penetration testing",
    "24/7 security monitoring",
    "Incident response procedures",
    "Data backup and recovery"
  ];

  return (
    <div className="min-h-screen bg-gradient-mesh">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
            <span className="gradient-text">Security</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            How we protect your data and ensure platform security
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {securityFeatures.map((feature, index) => (
              <GlassCard key={index} className="p-6 text-center">
                <div className="p-3 bg-gradient-primary rounded-lg w-fit mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Production Security Roadmap</h2>
            </div>
            
            <p className="text-muted-foreground mb-6">
              The following security measures are planned for the production deployment of this application:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {roadmap.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 glass rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <strong className="text-foreground">Note:</strong> This is a demonstration project. 
              The security features described represent the planned architecture for a production deployment.
            </p>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Security;
