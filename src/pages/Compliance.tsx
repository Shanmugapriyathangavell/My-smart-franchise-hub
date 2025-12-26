import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import { Scale, Globe, Shield, FileCheck, CheckCircle } from "lucide-react";

const Compliance = () => {
  const complianceAreas = [
    {
      icon: Globe,
      title: "GDPR-Ready Architecture",
      description: "Designed with data privacy principles including consent management, data portability, and right to erasure"
    },
    {
      icon: Shield,
      title: "Data Protection",
      description: "Infrastructure designed for compliance with international data protection standards"
    },
    {
      icon: FileCheck,
      title: "Audit Trail",
      description: "Comprehensive logging and audit capabilities for regulatory requirements"
    }
  ];

  const plannedCompliance = [
    "GDPR compliance certification",
    "CCPA readiness",
    "HIPAA compliance (where applicable)",
    "ISO 27001 certification",
    "Regular compliance audits"
  ];

  return (
    <div className="min-h-screen bg-gradient-mesh">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
            <span className="gradient-text">Compliance</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Our commitment to regulatory compliance and data governance
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {complianceAreas.map((area, index) => (
              <GlassCard key={index} className="p-6 text-center">
                <div className="p-3 bg-gradient-primary rounded-lg w-fit mx-auto mb-4">
                  <area.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{area.title}</h3>
                <p className="text-muted-foreground">{area.description}</p>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Compliance Roadmap</h2>
            </div>
            
            <p className="text-muted-foreground mb-6">
              The following compliance certifications and standards are planned for production:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {plannedCompliance.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 glass rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <strong className="text-foreground">Note:</strong> This is a demonstration project. 
              Compliance features described represent the planned architecture for production deployment.
            </p>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Compliance;
