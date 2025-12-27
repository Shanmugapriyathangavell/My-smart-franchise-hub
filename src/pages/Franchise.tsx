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

  const load = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("franchises")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) toast.error(error.message);
    else setItems(data || []);
    setLoading(false);
  };

  const add = async () => {
    if (!name.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("franchises").insert({
      name,
      user_id: user.id,
    });

    if (error) toast.error(error.message);
    else {
      setName("");
      load();
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">

        <div>
          <h1 className="text-2xl font-semibold">Franchises</h1>
          <p className="text-sm text-muted-foreground">
            Track franchise locations.
          </p>
        </div>

        <GlassCard className="p-5 space-y-3" hover={false}>
          <Input
            placeholder="Franchise name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={add}>Add franchise</Button>
        </GlassCard>

        <GlassCard className="p-5 space-y-3" hover={false}>
          {loading && <p className="text-sm text-muted-foreground">Loading…</p>}

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
