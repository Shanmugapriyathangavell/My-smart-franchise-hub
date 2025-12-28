import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import { Shield } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-20">
        <GlassCard className="p-8 space-y-6">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-semibold">Privacy Policy</h1>
          </div>

          <div className="p-4 rounded-lg bg-muted text-sm text-muted-foreground">
            <strong>Note:</strong> This is a sample privacy policy for demonstration
            purposes only. This project is a UI‑only SaaS demo and is not a legally
            binding document.
          </div>

          <section className="space-y-2">
            <h2 className="font-semibold">1. Information We Collect</h2>
            <p className="text-sm text-muted-foreground">
              We collect information you provide directly, such as account details
              and preferences, to demonstrate application workflows.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">2. How We Use Your Information</h2>
            <p className="text-sm text-muted-foreground">
              Information is used to improve UI flows, demonstrate dashboards,
              and simulate real SaaS product behavior.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">3. Data Protection</h2>
            <p className="text-sm text-muted-foreground">
              This demo follows standard frontend security practices. No real
              personal data is stored or processed.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">4. Your Rights</h2>
            <p className="text-sm text-muted-foreground">
              As this is a demonstration project, data shown is sample data only.
              In a production environment, users would be able to manage their data
              through account settings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">5. Contact</h2>
            <p className="text-sm text-muted-foreground">
              For questions related to this demo, please use the Contact page.
            </p>
          </section>

          <p className="text-xs text-muted-foreground pt-6">
            Built in Chennai 🇮🇳 as an interview‑ready SaaS demonstration.
          </p>
        </GlassCard>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
