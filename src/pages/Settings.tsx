import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-10">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage account information and preferences.
          </p>
        </div>

        <GlassCard className="p-6 space-y-4" hover={false}>
          <div>
            <label className="text-sm">Email</label>
            <Input />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <Input type="password" />
          </div>

          <Button>Save changes</Button>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
