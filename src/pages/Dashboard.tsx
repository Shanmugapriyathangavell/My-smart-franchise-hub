import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import GlassCard from "@/components/GlassCard";
import {
  FolderKanban,
  DollarSign,
  CheckCircle2,
  Brain,
  TrendingUp,
  Users,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const Dashboard = () => {
  // 🔹 REAL STATS STATE
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalFranchises, setTotalFranchises] = useState(0);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch real stats
  const fetchStats = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Not authenticated");
      return;
    }

    const [{ count: projects }, { count: tasks }, { count: doneTasks }, { count: franchises }] =
      await Promise.all([
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

  // 🔹 MOCK CHART DATA (OK FOR V1)
  const revenueData = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 5000 },
    { name: "Apr", revenue: 7800 },
    { name: "May", revenue: 8900 },
    { name: "Jun", revenue: 11000 },
  ];

  const projectStatusData = [
    { name: "Completed", value: completedTasks, color: "hsl(var(--success))" },
    { name: "Pending", value: totalTasks - completedTasks, color: "hsl(var(--primary))" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening today.
            </p>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground">
            <Brain className="w-4 h-4 mr-2" />
            AI Insights
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Projects"
            value={loading ? "…" : totalProjects}
            icon={FolderKanban}
          />
          <StatCard
            title="Total Tasks"
            value={loading ? "…" : totalTasks}
            icon={CheckCircle2}
          />
          <StatCard
            title="Tasks Completed"
            value={loading ? "…" : completedTasks}
            icon={Activity}
          />
          <StatCard
            title="Franchises"
            value={loading ? "…" : totalFranchises}
            icon={Users}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard hover={false}>
            <h3 className="text-xl font-semibold mb-4">Revenue Overview</h3>
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
          </GlassCard>

          <GlassCard hover={false}>
            <h3 className="text-xl font-semibold mb-4">Task Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={projectStatusData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={90}
                >
                  {projectStatusData.map((entry, i) => (
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
