import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import GlassCard from "@/components/GlassCard";
import { FolderKanban, CheckCircle2, Users, Activity } from "lucide-react";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "@/lib/supabase";

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
    completed: 0,
    franchises: 0,
  });

  useEffect(() => {
    const load = async () => {
      const [{ count: projects }, { count: tasks }, { count: completed }, { count: franchises }] =
        await Promise.all([
          supabase.from("projects").select("*", { count: "exact", head: true }),
          supabase.from("tasks").select("*", { count: "exact", head: true }),
          supabase.from("tasks").select("*", { count: "exact", head: true }).eq("status", "done"),
          supabase.from("franchises").select("*", { count: "exact", head: true }),
        ]);

      setStats({
        projects: projects || 0,
        tasks: tasks || 0,
        completed: completed || 0,
        franchises: franchises || 0,
      });
    };

    load();
  }, []);

  const revenueData = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 5000 },
    { name: "Apr", value: 7800 },
  ];

  const taskData = [
    { name: "Completed", value: stats.completed, color: "hsl(var(--success))" },
    { name: "Pending", value: stats.tasks - stats.completed, color: "hsl(var(--primary))" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Summary of current work and activity.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Updated a few minutes ago
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Projects" value={stats.projects} icon={FolderKanban} />
          <StatCard title="Tasks" value={stats.tasks} icon={CheckCircle2} />
          <StatCard title="Completed" value={stats.completed} icon={Activity} />
          <StatCard title="Franchises" value={stats.franchises} icon={Users} />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8">
          <GlassCard hover={false} className="p-6">
            <h3 className="text-lg font-medium mb-4">Revenue (last months)</h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={revenueData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area dataKey="value" fill="hsl(var(--primary))" />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>

          <GlassCard hover={false} className="p-6">
            <h3 className="text-lg font-medium mb-4">Task status</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={taskData} dataKey="value" innerRadius={60}>
                  {taskData.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
