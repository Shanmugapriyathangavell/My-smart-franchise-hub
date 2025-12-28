import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Franchise {
  id: string;
  name: string;
  created_at: string;
}

const Franchise = () => {
  const [items, setItems] = useState<Franchise[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const load = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("franchises")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
    } else {
      setItems(data || []);
    }

    setLoading(false);
  };

  const add = async () => {
    if (!name.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setAdding(true);

    const { error } = await supabase.from("franchises").insert({
      name: name.trim(),
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

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">Franchises</h1>
          <p className="text-sm text-muted-foreground">
            Track and manage franchise locations.
          </p>
        </div>

        {/* Add Franchise */}
        <GlassCard className="p-5 space-y-3" hover={false}>
          <Input
            placeholder="Franchise name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            onClick={add}
            disabled={!name.trim() || adding}
          >
            {adding ? "Adding..." : "Add franchise"}
          </Button>
        </GlassCard>

        {/* Franchise List */}
        <GlassCard className="p-5 space-y-3" hover={false}>
          {loading && (
            <p className="text-sm text-muted-foreground">
              Loading franchises…
            </p>
          )}

          {!loading && items.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No franchises yet. Add your first franchise above.
            </p>
          )}

          {!loading &&
            items.map((f) => (
              <div
                key={f.id}
                className="flex justify-between text-sm border-b border-border/50 py-2"
              >
                <span className="font-medium">{f.name}</span>
                <span className="text-muted-foreground">
                  {new Date(f.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
        </GlassCard>

        {/* Interview note */}
        <p className="text-xs text-muted-foreground">
          Franchise management UI is complete. Additional actions
          (edit, delete, analytics) can be added as product evolves.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Franchise;

