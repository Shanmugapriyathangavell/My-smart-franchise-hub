import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";

import chennaiImage from "@/assets/chennai.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-20 space-y-24">
        {/* ================= HERO ================= */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-6">
            <h1 className="text-3xl font-semibold text-foreground">
              Franchise and project tracking in one place
            </h1>

            <p className="text-sm text-muted-foreground max-w-md">
              A simple internal tool to track projects, tasks, and franchise
              performance over time.
            </p>

            {/* Chennai subtitle */}
            <p className="text-sm text-muted-foreground max-w-md">
              Built with ❤️ in Chennai — inspired by fast‑moving teams, busy
              streets, and everyday hustle.
            </p>

            <div className="flex gap-3">
              <Link to="/register">
                <Button>Add account</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline">Log in</Button>
              </Link>
            </div>

            <p className="text-xs text-muted-foreground">
              Used by small teams to stay organized.
            </p>
          </div>

          {/* Image */}
          <div>
            <img
              src={chennaiImage}
              alt="Everyday work life in Chennai"
              className="rounded-lg object-cover w-full"
            />
          </div>
        </section>

        {/* ================= WHAT IT DOES ================= */}
        <section className="grid md:grid-cols-3 gap-6">
          <GlassCard className="p-6 space-y-2" hover={false}>
            <h3 className="text-lg font-medium text-foreground">Projects</h3>
            <p className="text-sm text-muted-foreground">
              Group related work and track progress over time.
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-2" hover={false}>
            <h3 className="text-lg font-medium text-foreground">Tasks</h3>
            <p className="text-sm text-muted-foreground">
              Break work into manageable steps.
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-2" hover={false}>
            <h3 className="text-lg font-medium text-foreground">Franchises</h3>
            <p className="text-sm text-muted-foreground">
              Track revenue and basic performance metrics.
            </p>
          </GlassCard>
        </section>

        {/* ================= CHENNAI TOUCH ================= */}
        <section className="grid md:grid-cols-3 gap-6">
          <GlassCard className="p-6 space-y-2" hover={false}>
            <h3 className="text-lg font-medium">Fast‑paced</h3>
            <p className="text-sm text-muted-foreground">
              Inspired by Chennai traffic — quick decisions, constant movement,
              real‑world execution.
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-2" hover={false}>
            <h3 className="text-lg font-medium">Reliable</h3>
            <p className="text-sm text-muted-foreground">
              Like filter coffee ☕ — simple, consistent, and dependable.
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-2" hover={false}>
            <h3 className="text-lg font-medium">People‑first</h3>
            <p className="text-sm text-muted-foreground">
              Designed for real teams, not just dashboards.
            </p>
          </GlassCard>
        </section>

        {/* ================= FOOTER NOTE ================= */}
        <section className="text-xs text-muted-foreground">
          Built as a practical internal tool. Data shown may be sample data.
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
