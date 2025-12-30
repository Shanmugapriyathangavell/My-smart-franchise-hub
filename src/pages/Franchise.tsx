import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { franchiseSchema } from "@/validation/schemas";

/* ================= TYPES ================= */

interface Franchise {
  id: string;
  name: string;
  created_at: string;
  old_todos: number; // derived from SQL function
}

/* ================= HELPERS ================= */

const getHealthStatus = (count: number) => {
  if (count > 5) {
    return { label: "Needs Attention", color: "bg-red-500" };
  }
  if (count > 0) {
    return { label: "At Risk", color: "bg-yellow-500" };
  }
  return { label: "Healthy", color: "bg-green-500" };
};

/* ================= COMPONENT ================= */

const Franchise = () => {
  const [items, setItems] = useState<Franchise[]>([]);
  const [name, setName] = useState("");
  const [search, setSearch] = useState(""); // 🔍 search
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  /* ---------- LOAD FRANCHISES + HEALTH ---------- */

  const load = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    setLoading(true);

    const { data, error } = await supabase.rpc(
      "franchise_health_overview",
      { uid: user.id }
    );

    if (error) {
      toast.error(error.message);
    } else {
      setItems(data || []);
    }

    setLoading(false);
  };

  /* ---------- ADD FRANCHISE (ZOD PROTECTED) ---------- */

  const add = async () => {
    setErrorMsg("");

    const result = franchiseSchema.safeParse({ name });

    if (!result.success) {
      setErrorMsg(result.error.errors[0].message);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    setAdding(true);

    const { error } = await supabase.from("franchises").insert({
      name: result.data.name,
      user_id: user.id,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Franchise added");
      setName("");
      load();
    }

    setAdding(false);
  };

  useEffect(() => {
    load();
  }, []);

  /* ================= UI ================= */

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">Franchises</h1>
          <p className="text-sm text-muted-foreground">
            Track and monitor branch performance.
          </p>
        </div>

        {/* Add Franchise */}
        <GlassCard className="p-5 space-y-3" hover={false}>
          <Input
            placeholder="Franchise name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {errorMsg && (
            <p className="text-sm text-red-500">{errorMsg}</p>
          )}

          <Button onClick={add} disabled={adding}>
            {adding ? "Adding..." : "Add franchise"}
          </Button>
        </GlassCard>

        {/* Search */}
        {!loading && items.length > 0 && (
          <Input
            placeholder="Search franchises…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}

        {/* Franchise List */}
        <GlassCard className="p-5 space-y-3" hover={false}>
          {loading && (
            <p className="text-sm text-muted-foreground">
              Loading franchises…
            </p>
          )}

          {/* ✅ EMPTY STATE */}
          {!loading && items.length === 0 && (
            <div className="text-center py-10 space-y-4">
              <h3 className="text-lg font-semibold">Welcome 👋</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                You haven’t added any franchise locations yet.
                Start by creating your first branch to manage projects and tasks.
              </p>
              <Button onClick={() => document.querySelector("input")?.focus()}>
                Add your first franchise
              </Button>
            </div>
          )}

          {/* ✅ FILTERED LIST */}
          {!loading &&
            items
              .filter((f) =>
                f.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((f) => {
                const health = getHealthStatus(f.old_todos);

                return (
                  <div
                    key={f.id}
                    className="flex justify-between items-center border-b border-border/50 py-2"
                  >
                    <div>
                      <p className="font-medium">{f.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Created{" "}
                        {new Date(f.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <span
                      className={`text-xs text-white px-2 py-1 rounded ${health.color}`}
                    >
                      {health.label}
                    </span>
                  </div>
                );
              })}
        </GlassCard>

        {/* Interview Note */}
        <p className="text-xs text-muted-foreground">
          Franchise health is computed via PostgreSQL analytics (task age +
          status) and consumed through a secure RPC layer.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Franchise;
