import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { logActivity } from "@/lib/activity";
import { toast } from "sonner";
import { projectSchema } from "@/validation/schemas";

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
  const [adding, setAdding] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  /* ---------- LOAD DATA ---------- */

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setLoading(true);

    const [p, t] = await Promise.all([
      supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),

      supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id),
    ]);

    if (p.error) toast.error(p.error.message);
    else setProjects(p.data || []);

    if (t.error) toast.error(t.error.message);
    else setTasks(t.data || []);

    setLoading(false);
  };

  /* ---------- ADD PROJECT (ZOD PROTECTED) ---------- */

  const addProject = async () => {
    setErrorMsg("");

    const result = projectSchema.safeParse({
      name: newProjectTitle,
    });

    if (!result.success) {
      setErrorMsg(result.error.errors[0].message);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setAdding(true);

    const { error } = await supabase.from("projects").insert({
      title: result.data.name,
      user_id: user.id,
    });

    setAdding(false);

    if (error) {
      toast.error(error.message);
    } else {
      await logActivity(
        user.id,
        `Created project "${result.data.name}"`
      );
      setNewProjectTitle("");
      loadData();
    }
  };

  /* ---------- REMOVE PROJECT ---------- */

  const removeProject = async (project: Project) => {
    const ok = window.confirm("Delete this project?");
    if (!ok) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", project.id);

    if (error) {
      toast.error(error.message);
    } else {
      await logActivity(
        user.id,
        `Deleted project "${project.title}"`
      );
      loadData();
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ================= UI ================= */

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

          {errorMsg && (
            <p className="text-sm text-red-500">{errorMsg}</p>
          )}

          <Button onClick={addProject} disabled={adding}>
            {adding ? "Saving…" : "Add project"}
          </Button>
        </GlassCard>

        {/* Project List */}
        <GlassCard className="p-6 space-y-4">
          {projects.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No projects yet.
            </p>
          )}

          {projects.map((p) => (
            <div key={p.id} className="flex justify-between items-center">
              <span>{p.title}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => removeProject(p)}
              >
                Remove
              </Button>
            </div>
          ))}
        </GlassCard>

        {/* Tasks Preview (read-only, no Zod needed) */}
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
                      <p>{t.title}</p>
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
