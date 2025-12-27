import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Shield, Palette, Key } from "lucide-react";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold mb-1">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Update your account and preferences.
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          {/* Profile */}
          <TabsContent value="profile" className="mt-6">
            <GlassCard hover={false}>
              <h3 className="text-lg font-medium mb-4">Profile</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>

              <div className="mt-4">
                <Label htmlFor="role">Role</Label>
                <Input id="role" defaultValue="Project manager" />
              </div>

              <Button className="mt-6">Save</Button>
            </GlassCard>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="mt-6">
            <GlassCard hover={false}>
              <h3 className="text-lg font-medium mb-4">Notifications</h3>

              <div className="space-y-4">
                <SettingRow
                  title="Email updates"
                  description="Receive updates about activity."
                />
                <SettingRow
                  title="Task reminders"
                  description="Get reminders for upcoming tasks."
                />
                <SettingRow
                  title="Team activity"
                  description="Notify when teammates complete work."
                />
              </div>
            </GlassCard>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="mt-6">
            <GlassCard hover={false}>
              <h3 className="text-lg font-medium mb-4">Security</h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current password</Label>
                  <Input id="currentPassword" type="password" />
                </div>

                <div>
                  <Label htmlFor="newPassword">New password</Label>
                  <Input id="newPassword" type="password" />
                </div>

                <Button>Update password</Button>
              </div>

              <div className="mt-6 border-t pt-4">
                <SettingRow
                  title="Two‑factor authentication"
                  description="Require a second step when signing in."
                />
              </div>

              <div className="mt-6 border-t pt-4">
                <h4 className="text-sm font-medium mb-2">API keys</h4>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                  <span className="text-xs font-mono">
                    sk_live_********************
                  </span>
                  <Button size="sm" variant="destructive">
                    Revoke
                  </Button>
                </div>
              </div>
            </GlassCard>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance" className="mt-6">
            <GlassCard hover={false}>
              <h3 className="text-lg font-medium mb-4">Appearance</h3>

              <div className="space-y-4">
                <SettingRow
                  title="Dark mode"
                  description="Use a dark color scheme."
                />
                <SettingRow
                  title="Compact layout"
                  description="Reduce spacing to show more content."
                />
                <SettingRow
                  title="Animations"
                  description="Enable interface animations."
                  defaultChecked
                />
              </div>
            </GlassCard>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

const SettingRow = ({
  title,
  description,
  defaultChecked = false,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
    <Switch defaultChecked={defaultChecked} />
  </div>
);

export default Settings;
