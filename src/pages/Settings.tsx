import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account and preferences.
          </p>
        </div>

        {/* Profile */}
        <GlassCard className="p-6 space-y-6" hover={false}>
          <h2 className="text-lg font-medium">Profile</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First name</Label>
              <Input placeholder="First name" />
            </div>
            <div className="space-y-2">
              <Label>Last name</Label>
              <Input placeholder="Last name" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="you@example.com" />
          </div>

          <Button>Save changes</Button>
        </GlassCard>

        {/* Notifications */}
        <GlassCard className="p-6 space-y-6" hover={false}>
          <h2 className="text-lg font-medium">Notifications</h2>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Email updates</p>
              <p className="text-xs text-muted-foreground">
                Get notified about important changes.
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Task reminders</p>
              <p className="text-xs text-muted-foreground">
                Reminders for upcoming tasks.
              </p>
            </div>
            <Switch />
          </div>
        </GlassCard>

        {/* Security */}
        <GlassCard className="p-6 space-y-6" hover={false}>
          <h2 className="text-lg font-medium">Security</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Current password</Label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <Label>New password</Label>
              <Input type="password" />
            </div>
          </div>

          <Button variant="outline">Update password</Button>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
