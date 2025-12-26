import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import StatCard from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, MapPin, DollarSign, TrendingUp, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Franchise {
  id: string;
  name: string;
  location: string | null;
  manager: string | null;
  revenue: number | null;
  leads: number | null;
  sales: number | null;
}

const Franchise = () => {
  const [franchises, setFranchises] = useState<Franchise[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    location: "",
    manager: "",
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
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setFranchises(data || []);
  };

  const createFranchise = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("franchises").insert({
      user_id: user.id,
      name: form.name,
      location: form.location,
      manager: form.manager,
      revenue: Number(form.revenue) || null,
      leads: Number(form.leads) || null,
      sales: Number(form.sales) || null,
    });

    if (error) toast.error(error.message);
    else {
      toast.success("Franchise created");
      setForm({
        name: "",
        location: "",
        manager: "",
        revenue: "",
        leads: "",
        sales: "",
      });
      fetchFranchises();
    }
  };

  const updateFranchise = async (id: string) => {
    const { error } = await supabase
      .from("franchises")
      .update({
        revenue: Number(form.revenue),
        leads: Number(form.leads),
        sales: Number(form.sales),
      })
      .eq("id", id);

    if (error) toast.error(error.message);
    else {
      toast.success("Franchise updated");
      setEditingId(null);
      fetchFranchises();
    }
  };

  const deleteFranchise = async (id: string) => {
    const ok = window.confirm("Delete this franchise?");
    if (!ok) return;

    const { error } = await supabase
      .from("franchises")
      .delete()
      .eq("id", id);

    if (error) toast.error(error.message);
    else {
      toast.success("Franchise deleted");
      setFranchises((f) => f.filter((x) => x.id !== id));
    }
  };

  useEffect(() => {
    fetchFranchises();
  }, []);

  const totalRevenue = franchises.reduce((s, f) => s + (f.revenue ?? 0), 0);
  const totalLeads = franchises.reduce((s, f) => s + (f.leads ?? 0), 0);
  const totalSales = franchises.reduce((s, f) => s + (f.sales ?? 0), 0);
  const conversion =
    totalLeads > 0 ? Math.round((totalSales / totalLeads) * 100) : 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div className="grid md:grid-cols-4 gap-6">
          <StatCard title="Franchises" value={franchises.length} icon={MapPin} />
          <StatCard title="Revenue" value={`₹${totalRevenue}`} icon={DollarSign} />
          <StatCard title="Leads" value={totalLeads} icon={Users} />
          <StatCard title="Conversion" value={`${conversion}%`} icon={TrendingUp} />
        </div>

        <GlassCard className="p-4 space-y-2">
          <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <Input placeholder="Manager" value={form.manager} onChange={(e) => setForm({ ...form, manager: e.target.value })} />
          <Input placeholder="Revenue" type="number" value={form.revenue} onChange={(e) => setForm({ ...form, revenue: e.target.value })} />
          <Input placeholder="Leads" type="number" value={form.leads} onChange={(e) => setForm({ ...form, leads: e.target.value })} />
          <Input placeholder="Sales" type="number" value={form.sales} onChange={(e) => setForm({ ...form, sales: e.target.value })} />
          <Button onClick={createFranchise}><Plus className="w-4 h-4 mr-2" />Add Franchise</Button>
        </GlassCard>

        <div className="grid md:grid-cols-2 gap-6">
          {franchises.map((f) => (
            <GlassCard key={f.id} className="p-4 space-y-2">
              <h4 className="font-semibold">{f.name}</h4>
              <p className="text-sm text-muted-foreground">{f.location}</p>

              {editingId === f.id ? (
                <>
                  <Input placeholder="Revenue" type="number" value={form.revenue} onChange={(e) => setForm({ ...form, revenue: e.target.value })} />
                  <Input placeholder="Leads" type="number" value={form.leads} onChange={(e) => setForm({ ...form, leads: e.target.value })} />
                  <Input placeholder="Sales" type="number" value={form.sales} onChange={(e) => setForm({ ...form, sales: e.target.value })} />
                  <Button onClick={() => updateFranchise(f.id)}>Save</Button>
                </>
              ) : (
                <>
                  <p>Revenue: ₹{f.revenue ?? 0}</p>
                  <p>Leads: {f.leads ?? 0}</p>
                  <p>Sales: {f.sales ?? 0}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingId(f.id);
                        setForm({
                          ...form,
                          revenue: String(f.revenue ?? ""),
                          leads: String(f.leads ?? ""),
                          sales: String(f.sales ?? ""),
                        });
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteFranchise(f.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </GlassCard>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Franchise;
