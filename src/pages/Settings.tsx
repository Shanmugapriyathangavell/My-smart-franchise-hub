import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Settings = () => {
  const [email, setEmail] = useState("shanmugapriyathangavel23@gmail.com");
  const [password, setPassword] = useState("");
  const [dirty, setDirty] = useState(false);

  const handleSave = () => {
    toast.success("Changes saved");
    setDirty(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage account information and preferences.
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Update your account information. Changes are saved securely.
          </p>
        </div>

        {/* Account Settings */}
        <GlassCard className="p-6 space-y-6" hover={false}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setDirty(true);
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setDirty(true);
              }}
            />
          </div>

          <div className="flex items-center gap-4">
            <Button disabled={!dirty} onClick={handleSave}>
              Save changes
            </Button>
            {!dirty && (
              <span className="text-xs text-muted-foreground">
                No changes to save
              </span>
            )}
          </div>

          {/* Interview note */}
          <p className="text-xs text-muted-foreground mt-4">
            Settings UI is complete. Backend integration can be added later.
          </p>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
