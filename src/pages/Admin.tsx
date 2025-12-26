import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import StatCard from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Users, Activity, DollarSign, AlertCircle, MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const Admin = () => {
  const users = [
    { id: 1, name: "Sarah Johnson", email: "sarah@example.com", role: "Admin", status: "active", lastActive: "2 min ago" },
    { id: 2, name: "John Smith", email: "john@example.com", role: "Manager", status: "active", lastActive: "15 min ago" },
    { id: 3, name: "Mike Chen", email: "mike@example.com", role: "User", status: "active", lastActive: "1 hour ago" },
    { id: 4, name: "Emma Williams", email: "emma@example.com", role: "User", status: "inactive", lastActive: "2 days ago" },
    { id: 5, name: "David Brown", email: "david@example.com", role: "Manager", status: "active", lastActive: "5 min ago" },
  ];

  const systemAlerts = [
    { type: "warning", message: "High API usage detected - 85% of monthly quota used", time: "10 min ago" },
    { type: "info", message: "System maintenance scheduled for tonight at 2 AM", time: "1 hour ago" },
    { type: "error", message: "Failed login attempts from unknown IP", time: "2 hours ago" },
  ];

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-success/20 text-success">Active</Badge>
    ) : (
      <Badge className="bg-muted text-muted-foreground">Inactive</Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      Admin: "bg-primary/20 text-primary",
      Manager: "bg-accent/20 text-accent",
      User: "bg-muted text-muted-foreground"
    };
    return <Badge className={colors[role as keyof typeof colors]}>{role}</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">Manage users, permissions, and system settings</p>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground hover:shadow-glow">
            Add New User
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={1247}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Active Sessions"
            value={856}
            icon={Activity}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Monthly Revenue"
            value="$48.5k"
            icon={DollarSign}
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="System Alerts"
            value={3}
            icon={AlertCircle}
            trend={{ value: 2, isPositive: false }}
          />
        </div>

        {/* System Alerts */}
        <GlassCard hover={false}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              System Alerts
            </h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {systemAlerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  alert.type === "error"
                    ? "border-destructive/50 bg-destructive/10"
                    : alert.type === "warning"
                    ? "border-warning/50 bg-warning/10"
                    : "border-border/50 bg-muted/30"
                }`}
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm">{alert.message}</p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                    {alert.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* User Management Table */}
        <GlassCard hover={false}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">User Management</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Filter</Button>
              <Button variant="outline" size="sm">Export</Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Role</DropdownMenuItem>
                          <DropdownMenuItem>Reset Password</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Suspend User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default Admin;
