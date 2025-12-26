import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import { FileText } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-mesh">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Guidelines for using our platform
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <GlassCard className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <FileText className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Sample Terms of Service</h2>
            </div>
            
            <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
              <p className="text-sm bg-primary/10 p-4 rounded-lg border border-primary/20">
                <strong className="text-foreground">Note:</strong> This is a sample terms of service for demonstration purposes only. 
                This is not a legally binding document.
              </p>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">1. Acceptance of Terms</h3>
                <p>By accessing or using our services, you agree to be bound by these terms and conditions.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">2. Use of Services</h3>
                <p>You agree to use our services only for lawful purposes and in accordance with these terms.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">3. Account Responsibilities</h3>
                <p>You are responsible for maintaining the confidentiality of your account credentials and all activities under your account.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">4. Intellectual Property</h3>
                <p>All content, features, and functionality are owned by us and protected by intellectual property laws.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">5. Limitation of Liability</h3>
                <p>We shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">6. Changes to Terms</h3>
                <p>We reserve the right to modify these terms at any time. Continued use constitutes acceptance of modified terms.</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
