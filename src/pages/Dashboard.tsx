import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import GlassCard from "@/components/GlassCard";
import {
  FolderKanban,
  CheckCircle2,
  Users,
  Activity,
} from "lucide-react";
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
import { toast } from "sonner";

const Dashboard = () => {
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalFranchises, setTotalFranchises] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Authentication required");
      return;
    }

    const [
      { count: projects },
      { count: tasks },
      { count: doneTasks },
      { count: franchises },
    ] = await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("tasks").select("*", { count: "exact", head: true }),
      supabase
        .from("tasks")
        .select("*", { count: "exact", head: true })
        .eq("status", "done"),
      supabase.from("franchises").select("*", { count: "exact", head: true }),
    ]);

    setTotalProjects(projects || 0);
    setTotalTasks(tasks || 0);
    setCompletedTasks(doneTasks || 0);
    setTotalFranchises(franchises || 0);

    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const revenueData = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 5000 },
    { name: "Apr", revenue: 7800 },
    { name: "May", revenue: 8900 },
    { name: "Jun", revenue: 11000 },
  ];

  const taskStatusData = [
    { name: "Completed", value: completedTasks, color: "hsl(var(--success))" },
    { name: "Pending", value: totalTasks - completedTasks, color: "hsl(var(--primary))" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of current activity and progress.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Updated a few minutes ago
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Projects" value={loading ? "…" : totalProjects} icon={FolderKanban} />
          <StatCard title="Tasks" value={loading ? "…" : totalTasks} icon={CheckCircle2} />
          <StatCard title="Completed" value={loading ? "…" : completedTasks} icon={Activity} />
          <StatCard title="Franchises" value={loading ? "…" : totalFranchises} icon={Users} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard hover={false}>
            <h3 className="text-lg font-medium mb-4">Revenue summary</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={revenueData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground mt-2">
              Values are estimates.
            </p>
          </GlassCard>

          <GlassCard hover={false}>
            <h3 className="text-lg font-medium mb-4">Task status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={taskStatusData} dataKey="value" innerRadius={60} outerRadius={90}>
                  {taskStatusData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
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

