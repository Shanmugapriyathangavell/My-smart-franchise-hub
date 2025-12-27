import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

/* ========= TYPES ========= */

interface Project {
  id: string;
  title: string;
}

interface Task {
  id: string;
  title: string;
  status: "todo" | "progress" | "done";
  project_id: string;
  created_at: string;
}

/* ========= COMPONENT ========= */

const Tasks = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");

  /* ---------- LOAD ---------- */

  const load = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setLoading(true);

    const [p, t] = await Promise.all([
      supabase
        .from("projects")
        .select("id, title")
        .eq("user_id", user.id),

      supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
    ]);

    if (p.error) toast.error(p.error.message);
    else setProjects(p.data || []);

    if (t.error) toast.error(t.error.message);
    else setTasks(t.data || []);

    setLoading(false);
  };

  /* ---------- ADD TASK ---------- */

  const addTask = async () => {
    if (!title.trim() || !projectId) {
      toast.error("Select a project and enter a task name");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("tasks").insert({
      title,
      project_id: projectId,
      user_id: user.id,
      status: "todo",
    });

    if (error) toast.error(error.message);
    else {
      setTitle("");
      setProjectId("");
      load();
    }
  };

  /* ---------- UPDATE STATUS ---------- */

  const updateStatus = async (id: string, status: Task["status"]) => {
    await supabase.from("tasks").update({ status }).eq("id", id);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        <div>
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <p className="text-sm text-muted-foreground">
            Tasks belong to projects and track work progress.
          </p>
        </div>

        {/* Add Task */}
        <GlassCard className="p-5 space-y-3" hover={false}>
          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="">Select project</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>

          <Button onClick={addTask}>Add task</Button>
        </GlassCard>

        {/* Task Board */}
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : tasks.length === 0 ? (
          <GlassCard className="p-5" hover={false}>
            <p className="text-sm text-muted-foreground">
              No tasks yet. Add one to get started.
            </p>
          </GlassCard>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {["todo", "progress", "done"].map((status) => (
              <div key={status}>
                <h3 className="font-medium capitalize mb-3">
                  {status === "todo"
                    ? "To do"
                    : status === "progress"
                    ? "In progress"
                    : "Completed"}
                </h3>

                {tasks
                  .filter((t) => t.status === status)
                  .map((t) => (
                    <GlassCard key={t.id} className="p-3 mb-2">
                      <p className="text-sm">{t.title}</p>

                      <div className="flex gap-2 mt-2">
                        {status !== "todo" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(t.id, "todo")}
                          >
                            Todo
                          </Button>
                        )}
                        {status !== "progress" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(t.id, "progress")}
                          >
                            Progress
                          </Button>
                        )}
                        {status !== "done" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(t.id, "done")}
                          >
                            Done
                          </Button>
                        )}
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

export default Tasks;
