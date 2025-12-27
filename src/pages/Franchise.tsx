import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import StatCard from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, DollarSign, Users, TrendingUp, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Franchise {
  id: string;
  name: string;
  revenue: number | null;
  leads: number | null;
  sales: number | null;
}

const Franchise = () => {
  const [franchises, setFranchises] = useState<Franchise[]>([]);
  const [form, setForm] = useState({
    name: "",
    revenue: "",
    leads: "",
    sales: "",
  });

  const fetchFranchises = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("franchises")
      .select("*")
      .eq("user_id", user.id);

    setFranchises(data || []);
  };

  useEffect(() => {
    fetchFranchises();
  }, []);

  const addFranchise = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("franchises").insert({
      user_id: user.id,
      name: form.name,
      revenue: Number(form.revenue) || null,
      leads: Number(form.leads) || null,
      sales: Number(form.sales) || null,
    });

    setForm({ name: "", revenue: "", leads: "", sales: "" });
    fetchFranchises();
  };

  const totalRevenue = franchises.reduce((s, f) => s + (f.revenue ?? 0), 0);
  const totalLeads = franchises.reduce((s, f) => s + (f.leads ?? 0), 0);
  const totalSales = franchises.reduce((s, f) => s + (f.sales ?? 0), 0);
  const conversion = totalLeads ? Math.round((totalSales / totalLeads) * 100) : 0;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        <div>
          <h1 className="text-2xl font-semibold">Franchises</h1>
          <p className="text-sm text-muted-foreground">
            Track performance across locations.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <StatCard title="Locations" value={franchises.length} icon={MapPin} />
          <StatCard title="Revenue" value={`₹${totalRevenue}`} icon={DollarSign} />
          <StatCard title="Leads" value={totalLeads} icon={Users} />
          <StatCard title="Conversion" value={`${conversion}%`} icon={TrendingUp} />
        </div>

        <GlassCard className="p-6 space-y-3">
          <Input placeholder="Franchise name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="Revenue (monthly)" value={form.revenue} onChange={(e) => setForm({ ...form, revenue: e.target.value })} />
          <Input placeholder="Leads" value={form.leads} onChange={(e) => setForm({ ...form, leads: e.target.value })} />
          <Input placeholder="Sales" value={form.sales} onChange={(e) => setForm({ ...form, sales: e.target.value })} />
          <p className="text-xs text-muted-foreground">
            Monthly estimates are fine.
          </p>
          <Button onClick={addFranchise}>
            <Plus className="w-4 h-4 mr-2" />
            Add franchise
          </Button>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default Franchise;
