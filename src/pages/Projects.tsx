import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Calendar, MoreVertical } from "lucide-react";
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
  description: string | null;
  status: "todo" | "progress" | "done";
  created_at: string;
}

/* ================= COMPONENT ================= */

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Add project
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [addingProject, setAddingProject] = useState(false);

  // Edit project
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [saving, setSaving] = useState(false);

  // Add task
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");

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
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) toast.error(error.message);
    else setTasks(data || []);
  };

  /* ---------- ADD PROJECT ---------- */

  const handleAddProject = async () => {
    if (!newProjectTitle.trim()) {
      toast.error("Project name is required");
      return;
    }

    setAddingProject(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("projects").insert({
      title: newProjectTitle,
      user_id: user.id,
    });

    setAddingProject(false);

    if (error) toast.error(error.message);
    else {
      setNewProjectTitle("");
      fetchProjects();
    }
  };

  /* ---------- UPDATE PROJECT ---------- */

  const handleUpdateProject = async () => {
    if (!editingProjectId || !editingTitle.trim()) return;

    setSaving(true);

    const { error } = await supabase
      .from("projects")
      .update({ title: editingTitle })
      .eq("id", editingProjectId);

    setSaving(false);

    if (error) toast.error(error.message);
    else {
      setEditingProjectId(null);
      setEditingTitle("");
      fetchProjects();
    }
  };

  /* ---------- REMOVE PROJECT ---------- */

  const handleRemoveProject = async (projectId: string) => {
    const ok = window.confirm(
      "Remove this project? This action can’t be undone."
    );
    if (!ok) return;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (error) toast.error(error.message);
    else {
      setProjects((p) => p.filter((x) => x.id !== projectId));
      setTasks((t) => t.filter((x) => x.project_id !== projectId));
    }
  };

  /* ---------- ADD TASK ---------- */

  const handleAddTask = async () => {
    if (!taskTitle.trim() || !selectedProjectId) {
      toast.error("Select a project and enter a task name");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("tasks").insert({
      title: taskTitle,
      description: taskDescription,
      project_id: selectedProjectId,
      user_id: user.id,
      status: "todo",
    });

    if (error) toast.error(error.message);
    else {
      setTaskTitle("");
      setTaskDescription("");
      fetchTasks();
    }
  };

  /* ---------- REMOVE TASK ---------- */

  const handleRemoveTask = async (id: string) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) toast.error(error.message);
    else setTasks((t) => t.filter((x) => x.id !== id));
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
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Projects help you group related work.
          </p>
        </div>

        {/* Add Project */}
        <GlassCard className="p-6 space-y-3">
          <Input
            placeholder="Project name"
            value={newProjectTitle}
            onChange={(e) => setNewProjectTitle(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Use a short name you’ll recognize later.
          </p>
          <Button onClick={handleAddProject} disabled={addingProject}>
            {addingProject ? "Saving…" : "Add project"}
          </Button>
        </GlassCard>

        {/* Project List */}
        <GlassCard className="p-6 space-y-4">
          <h3 className="text-lg font-medium">Projects</h3>

          {projects.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No projects yet. Add one to start organizing work.
            </p>
          )}

          {projects.map((p) => (
            <div key={p.id} className="flex justify-between items-center">
              {editingProjectId === p.id ? (
                <div className="flex gap-2 w-full">
                  <Input
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                  />
                  <Button size="sm" onClick={handleUpdateProject} disabled={saving}>
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingProjectId(null)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <>
                  <span>{p.title}</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingProjectId(p.id);
                        setEditingTitle(p.title);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRemoveProject(p.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </GlassCard>

        {/* Tasks */}
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading data…</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {["todo", "progress", "done"].map((status) => (
              <div key={status}>
                <h4 className="font-medium capitalize mb-2">
                  {status === "todo"
                    ? "To do"
                    : status === "progress"
                    ? "In progress"
                    : "Completed"}
                </h4>

                {tasks
                  .filter((t) => t.status === status)
                  .map((t) => (
                    <GlassCard key={t.id} className="p-3 mb-2">
                      <div className="flex justify-between">
                        <span>{t.title}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleRemoveTask(t.id)}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground flex gap-1 mt-2">
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
