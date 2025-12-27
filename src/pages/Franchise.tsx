import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

/* ========= TYPES ========= */

interface Franchise {
  id: string;
  name: string;
  created_at: string;
}

/* ========= COMPONENT ========= */

const Franchise = () => {
  const [items, setItems] = useState<Franchise[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFranchises();
  }, []);

  const loadFranchises = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("franchises")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const addFranchise = async () => {
    if (!name.trim()) return;

    const { error } = await supabase
      .from("franchises")
      .insert({ name });

    if (error) {
      toast.error(error.message);
    } else {
      setName("");
      loadFranchises();
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Franchises</h1>
          <p className="text-sm text-muted-foreground">
            Track locations and basic performance.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Updated a few minutes ago
          </p>
        </div>

        {/* Add */}
        <GlassCard className="p-5 space-y-3" hover={false}>
          <Input
            placeholder="Franchise name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={addFranchise}>Add franchise</Button>
        </GlassCard>

        {/* List */}
        <GlassCard className="p-5 space-y-3" hover={false}>
          {loading && (
            <p className="text-sm text-muted-foreground">Loading…</p>
          )}

          {!loading && items.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No franchises yet.
            </p>
          )}

          {items.map((f) => (
            <div key={f.id} className="text-sm">
              {f.name}
            </div>
          ))}
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default Franchise;
