import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import StatCard from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import {
  Users,
  Activity,
  TrendingUp,
  AlertCircle,
  MoreVertical,
} from "lucide-react";
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

/* =========================
   MOCK ADMIN DATA (INDIA)
   ========================= */

const users = [
  {
    id: 1,
    name: "Shanmuga Priya T",
    email: "shanmuga.priya@workfast.ai",
    role: "Admin",
    status: "active",
    lastActive: "2 min ago",
  },
  {
    id: 2,
    name: "Arun Kumar",
    email: "arun.kumar@workfast.ai",
    role: "Manager",
    status: "active",
    lastActive: "15 min ago",
  },
  {
    id: 3,
    name: "Priya Lakshmi",
    email: "priya.lakshmi@workfast.ai",
    role: "User",
    status: "active",
    lastActive: "1 hour ago",
  },
];

const systemAlerts = [
  {
    type: "warning",
    message: "High API usage detected – 85% of monthly quota used",
    time: "10 min ago",
  },
  {
    type: "info",
    message: "System maintenance scheduled tonight at 2:00 AM IST",
    time: "1 hour ago",
  },
  {
    type: "error",
    message: "Multiple failed login attempts detected",
    time: "2 hours ago",
  },
];

/* =========================
   HELPERS
   ========================= */

const getStatusBadge = (status: string) =>
  status === "active" ? (
    <Badge className="bg-success/20 text-success">Active</Badge>
  ) : (
    <Badge className="bg-muted text-muted-foreground">Inactive</Badge>
  );

const getRoleBadge = (role: string) => {
  const colors = {
    Admin: "bg-primary/20 text-primary",
    Manager: "bg-accent/20 text-accent",
    User: "bg-muted text-muted-foreground",
  };
  return (
    <Badge className={colors[role as keyof typeof colors]}>
      {role}
    </Badge>
  );
};

/* =========================
   COMPONENT
   ========================= */

const Admin = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">
              System overview & user administration
            </p>
          </div>
          <Button>Add New User</Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Total Users" value={1247} icon={Users} />
          <StatCard title="Active Sessions" value={856} icon={Activity} />
          <StatCard title="Monthly Revenue" value={48500} icon={TrendingUp} />
          <StatCard title="System Alerts" value={systemAlerts.length} icon={AlertCircle} />
        </div>

        {/* System Alerts */}
        <GlassCard>
          <h3 className="text-xl font-semibold mb-4">System Alerts</h3>
          <div className="space-y-3">
            {systemAlerts.map((alert, i) => (
              <div key={i} className="p-3 border rounded-md">
                <div className="flex justify-between">
                  <p className="text-sm">{alert.message}</p>
                  <span className="text-xs text-muted-foreground">
                    {alert.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* User Management Table */}
        <GlassCard>
          <h3 className="text-xl font-semibold mb-4">User Management</h3>
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
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Suspend
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </GlassCard>

      </div>
    </DashboardLayout>
  );
};

export default Admin;

