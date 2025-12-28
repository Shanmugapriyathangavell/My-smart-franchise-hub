import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { supabase } from "@/lib/supabase";

interface Activity {
  id: string;
  action: string;
  created_at: string;
}

export default function ActivityPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("activities")
        .select("*")
        .order("created_at", { ascending: false });

      setActivities(data || []);
      setLoading(false);
    };

    load();
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Activity</h1>
          <p className="text-sm text-muted-foreground">
            A log of everything you’ve done in the app.
          </p>
        </div>

        {loading && (
          <p className="text-sm text-muted-foreground">Loading activity…</p>
        )}

        {!loading && activities.length === 0 && (
          <GlassCard className="p-4">
            <p className="text-sm text-muted-foreground">
              No activity yet. Start by creating a project or task.
            </p>
          </GlassCard>
        )}

        {!loading &&
          activities.map((a) => (
            <GlassCard key={a.id} className="p-4">
              <p className="font-medium">{a.action}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(a.created_at).toLocaleString()}
              </p>
            </GlassCard>
          ))}
      </div>
    </DashboardLayout>
  );
}
