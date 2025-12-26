import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Shield, Palette, Key, Link as LinkIcon } from "lucide-react";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="glass">
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Palette className="w-4 h-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="integrations">
              <LinkIcon className="w-4 h-4 mr-2" />
              Integrations
            </TabsTrigger>
          </TabsList>

          {/* Profile */}
          <TabsContent value="profile" className="space-y-6 mt-6">
            <GlassCard hover={false}>
              <h3 className="text-xl font-semibold mb-6">Profile Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                    JD
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">Upload Photo</Button>
                    <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Project Manager" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" defaultValue="Passionate about workflow automation and AI" />
                </div>

                <Button className="bg-gradient-primary text-primary-foreground">
                  Save Changes
                </Button>
              </div>
            </GlassCard>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <GlassCard hover={false}>
              <h3 className="text-xl font-semibold mb-6">Notification Preferences</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive email updates about your projects</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Task Reminders</p>
                    <p className="text-sm text-muted-foreground">Get reminded about upcoming tasks and deadlines</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Team Updates</p>
                    <p className="text-sm text-muted-foreground">Notifications when team members complete tasks</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">AI Insights</p>
                    <p className="text-sm text-muted-foreground">Receive AI-generated insights and recommendations</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </GlassCard>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="space-y-6 mt-6">
            <GlassCard hover={false}>
              <h3 className="text-xl font-semibold mb-6">Security Settings</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Change Password</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button>Update Password</Button>
                  </div>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <h4 className="font-medium mb-4 flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    API Keys
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/30 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="font-mono text-sm">sk_live_***************************</p>
                        <p className="text-xs text-muted-foreground mt-1">Created on Jan 15, 2025</p>
                      </div>
                      <Button variant="destructive" size="sm">Revoke</Button>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4">Generate New API Key</Button>
                </div>
              </div>
            </GlassCard>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance" className="space-y-6 mt-6">
            <GlassCard hover={false}>
              <h3 className="text-xl font-semibold mb-6">Appearance Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Compact Mode</p>
                    <p className="text-sm text-muted-foreground">Reduce spacing for more content</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Animations</p>
                    <p className="text-sm text-muted-foreground">Enable smooth transitions and effects</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </GlassCard>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations" className="space-y-6 mt-6">
            <GlassCard hover={false}>
              <h3 className="text-xl font-semibold mb-6">Connected Services</h3>
              <div className="space-y-4">
                {[
                  { name: "Slack", description: "Team communication", connected: true },
                  { name: "Google Drive", description: "File storage", connected: true },
                  { name: "Notion", description: "Documentation", connected: false },
                  { name: "GitHub", description: "Code repository", connected: false },
                  { name: "Zapier", description: "Automation", connected: false },
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                    <Button
                      variant={service.connected ? "destructive" : "default"}
                      size="sm"
                    >
                      {service.connected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                ))}
              </div>
            </GlassCard>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
