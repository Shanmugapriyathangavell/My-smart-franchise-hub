import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import GlassCard from "@/components/GlassCard";
import { FolderKanban, CheckCircle2, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";

const Dashboard = () => {
  const [projects, setProjects] = useState(0);
  const [franchises, setFranchises] = useState(0);
  const [tasks, setTasks] = useState(0);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [p, f, t] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("franchises").select("id", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("tasks").select("id", { count: "exact", head: true }).eq("user_id", user.id),
      ]);

      setProjects(p.count || 0);
      setFranchises(f.count || 0);
      setTasks(t.count || 0);
    };

    load();
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">

        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of your workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Projects" value={projects} icon={FolderKanban} />
          <StatCard title="Tasks" value={tasks} icon={CheckCircle2} />
          <StatCard title="Franchises" value={franchises} icon={Users} />
        </div>

        {projects === 0 && (
          <GlassCard className="p-6" hover={false}>
            <p className="text-sm text-muted-foreground">
              Add your first project to see analytics here.
            </p>
          </GlassCard>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

