import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import { FileText } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-20">
        <GlassCard className="p-8 space-y-6">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-semibold">Terms of Service</h1>
          </div>

          <div className="p-4 rounded-lg bg-muted text-sm text-muted-foreground">
            <strong>Note:</strong> These terms are provided for demonstration
            purposes only and do not constitute a legally binding agreement.
          </div>

          <section className="space-y-2">
            <h2 className="font-semibold">1. Acceptance of Terms</h2>
            <p className="text-sm text-muted-foreground">
              By using this demo application, you acknowledge that it is a
              frontend‑only SaaS demonstration built for learning and interviews.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">2. Use of Service</h2>
            <p className="text-sm text-muted-foreground">
              This application is intended to showcase UI/UX, product thinking,
              and frontend architecture only.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">3. Account Responsibilities</h2>
            <p className="text-sm text-muted-foreground">
              Login and account data are simulated. No real authentication or
              billing occurs.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">4. Intellectual Property</h2>
            <p className="text-sm text-muted-foreground">
              All UI components, layouts, and code are part of a personal demo
              project and remain the property of the creator.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">5. Limitation of Liability</h2>
            <p className="text-sm text-muted-foreground">
              Since this is a demo project, no warranties or guarantees are
              provided.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">6. Changes to Terms</h2>
            <p className="text-sm text-muted-foreground">
              These demo terms may be updated at any time for improvement or
              presentation purposes.
            </p>
          </section>

          <p className="text-xs text-muted-foreground pt-6">
            Smart Franchise Hub — Built in Chennai 🇮🇳 for interview demonstration.
          </p>
        </GlassCard>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
