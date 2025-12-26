import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, BarChart3, PieChart as PieChartIcon, Calendar } from "lucide-react";
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";

const Reports = () => {
  const performanceData = [
    { month: "Jan", tasks: 65, revenue: 4000, satisfaction: 85 },
    { month: "Feb", tasks: 78, revenue: 5500, satisfaction: 88 },
    { month: "Mar", tasks: 90, revenue: 6200, satisfaction: 92 },
    { month: "Apr", tasks: 81, revenue: 5800, satisfaction: 89 },
    { month: "May", tasks: 95, revenue: 7200, satisfaction: 94 },
    { month: "Jun", tasks: 103, revenue: 8100, satisfaction: 96 },
  ];

  const franchiseData = [
    { name: "North Region", value: 35 },
    { name: "South Region", value: 28 },
    { name: "East Region", value: 22 },
    { name: "West Region", value: 15 },
  ];

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--accent))",
    "hsl(var(--secondary))",
    "hsl(var(--success))"
  ];

  const teamPerformance = [
    { subject: "Productivity", A: 120, B: 110, fullMark: 150 },
    { subject: "Quality", A: 98, B: 130, fullMark: 150 },
    { subject: "Speed", A: 86, B: 130, fullMark: 150 },
    { subject: "Communication", A: 99, B: 100, fullMark: 150 },
    { subject: "Innovation", A: 85, B: 90, fullMark: 150 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
            <p className="text-muted-foreground">Comprehensive insights into your business performance</p>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground hover:shadow-glow">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>

        {/* Date Range Selector */}
        <GlassCard hover={false} className="p-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium">Date Range:</span>
            <Button variant="outline" size="sm">Last 6 Months</Button>
            <Button variant="outline" size="sm">This Year</Button>
            <Button variant="outline" size="sm">Custom</Button>
          </div>
        </GlassCard>

        {/* Performance Summary */}
        <GlassCard hover={false}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                Performance Summary
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                6-month trend analysis
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="tasks" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Tasks Completed"
              />
              <Line 
                type="monotone" 
                dataKey="satisfaction" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                name="Customer Satisfaction"
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Franchise Distribution */}
          <GlassCard hover={false}>
            <div className="flex items-center gap-2 mb-6">
              <PieChartIcon className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold">Franchise Trends</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={franchiseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {franchiseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </GlassCard>

          {/* Revenue Analysis */}
          <GlassCard hover={false}>
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-semibold">Revenue Analysis</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="revenue" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>

          {/* Team Performance Radar */}
          <GlassCard hover={false} className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-secondary" />
              <h3 className="text-xl font-semibold">Team Performance Comparison</h3>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={teamPerformance}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" stroke="hsl(var(--foreground))" />
                <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" />
                <Radar 
                  name="Team A" 
                  dataKey="A" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.3} 
                />
                <Radar 
                  name="Team B" 
                  dataKey="B" 
                  stroke="hsl(var(--secondary))" 
                  fill="hsl(var(--secondary))" 
                  fillOpacity={0.3} 
                />
                <Legend />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        {/* AI Predictions */}
        <GlassCard hover={false} className="bg-gradient-secondary">
          <div className="text-center space-y-4 py-8">
            <h3 className="text-2xl font-bold">AI Predictions</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Based on current trends, your revenue is projected to increase by <span className="text-success font-semibold">23%</span> next quarter. 
              Team productivity shows consistent improvement with an average growth rate of <span className="text-primary font-semibold">15%</span> per month.
            </p>
            <Button className="bg-gradient-primary text-primary-foreground">
              View Detailed Predictions
            </Button>
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
