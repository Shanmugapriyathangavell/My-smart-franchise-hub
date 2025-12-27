import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MoreVertical } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

/* ================= TYPES ================= */

interface Project {
  id: string;
  title: string;
  created_at: string;
}

interface Task {
  id: string;
  project_id: string;
  title: string;
  status: "todo" | "progress" | "done";
  created_at: string;
}

/* ================= COMPONENT ================= */

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [adding, setAdding] = useState(false);

  /* ---------- FETCH ---------- */

  const fetchProjects = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) toast.error(error.message);
    else setProjects(data || []);
  };

  const fetchTasks = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id);

    if (error) toast.error(error.message);
    else setTasks(data || []);
  };

  /* ---------- ADD PROJECT ---------- */

  const addProject = async () => {
    if (!newProjectTitle.trim()) return;

    setAdding(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("projects").insert({
      title: newProjectTitle,
      user_id: user.id,
    });

    setAdding(false);

    if (error) toast.error(error.message);
    else {
      setNewProjectTitle("");
      fetchProjects();
    }
  };

  /* ---------- REMOVE PROJECT ---------- */

  const removeProject = async (id: string) => {
    const ok = window.confirm("Delete this project?");
    if (!ok) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) toast.error(error.message);
    else setProjects((p) => p.filter((x) => x.id !== id));
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchProjects(), fetchTasks()]);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">

        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Group related work under projects.
          </p>
        </div>

        {/* Add Project */}
        <GlassCard className="p-6 space-y-3">
          <Input
            placeholder="Project name"
            value={newProjectTitle}
            onChange={(e) => setNewProjectTitle(e.target.value)}
          />
          <Button onClick={addProject} disabled={adding}>
            {adding ? "Saving…" : "Add project"}
          </Button>
        </GlassCard>

        {/* List */}
        <GlassCard className="p-6 space-y-4">
          {projects.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No projects yet. Create your first project to get started.
            </p>
          )}

          {projects.map((p) => (
            <div key={p.id} className="flex justify-between items-center">
              <span>{p.title}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => removeProject(p.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </GlassCard>

        {/* Tasks */}
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {["todo", "progress", "done"].map((status) => (
              <div key={status}>
                <h4 className="font-medium capitalize mb-2">{status}</h4>
                {tasks
                  .filter((t) => t.status === status)
                  .map((t) => (
                    <GlassCard key={t.id} className="p-3 mb-2">
                      <div className="flex justify-between">
                        <span>{t.title}</span>
                        <MoreVertical className="w-4 h-4" />
                      </div>
                      <div className="text-xs text-muted-foreground mt-2 flex gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(t.created_at).toLocaleDateString()}
                      </div>
                    </GlassCard>
                  ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Projects;
