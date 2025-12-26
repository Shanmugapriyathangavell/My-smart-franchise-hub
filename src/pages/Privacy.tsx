import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import { Shield } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-mesh">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            How we handle and protect your information
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <GlassCard className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Sample Privacy Policy</h2>
            </div>
            
            <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
              <p className="text-sm bg-primary/10 p-4 rounded-lg border border-primary/20">
                <strong className="text-foreground">Note:</strong> This is a sample privacy policy for demonstration purposes only. 
                This is not a legally binding document.
              </p>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">1. Information We Collect</h3>
                <p>We collect information you provide directly, such as account details, preferences, and usage data to improve our services.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">2. How We Use Your Information</h3>
                <p>Your information is used to provide, maintain, and improve our services, communicate with you, and ensure platform security.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">3. Data Protection</h3>
                <p>We implement industry-standard security measures to protect your personal information from unauthorized access or disclosure.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">4. Your Rights</h3>
                <p>You have the right to access, correct, or delete your personal information at any time through your account settings.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">5. Contact Us</h3>
                <p>For any privacy-related questions, please contact us through our contact page.</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;
