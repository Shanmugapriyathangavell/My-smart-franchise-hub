import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Calendar, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  const [search, setSearch] = useState("");

  // Create project
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [creatingProject, setCreatingProject] = useState(false);

  // Edit project
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [saving, setSaving] = useState(false);

  // Create task
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

  /* ---------- CREATE PROJECT ---------- */

  const handleCreateProject = async () => {
    if (!newProjectTitle.trim()) {
      toast.error("Project title required");
      return;
    }

    setCreatingProject(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("projects").insert({
      title: newProjectTitle,
      user_id: user.id,
    });

    setCreatingProject(false);

    if (error) toast.error(error.message);
    else {
      toast.success("Project created");
      setNewProjectTitle("");
      fetchProjects();
    }
  };

  /* ---------- EDIT PROJECT ---------- */

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
      toast.success("Project updated");
      setEditingProjectId(null);
      setEditingTitle("");
      fetchProjects();
    }
  };

  /* ---------- DELETE PROJECT ---------- */

  const handleDeleteProject = async (projectId: string) => {
    const ok = window.confirm(
      "Delete this project and all its tasks?"
    );
    if (!ok) return;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (error) toast.error(error.message);
    else {
      toast.success("Project deleted");
      setProjects((p) => p.filter((x) => x.id !== projectId));
      setTasks((t) => t.filter((x) => x.project_id !== projectId));
    }
  };

  /* ---------- CREATE TASK ---------- */

  const handleCreateTask = async () => {
    if (!taskTitle.trim() || !selectedProjectId) {
      toast.error("Select project and title");
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
      toast.success("Task created");
      setTaskTitle("");
      setTaskDescription("");
      fetchTasks();
    }
  };

  /* ---------- DELETE TASK ---------- */

  const deleteTask = async (id: string) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Task deleted");
      setTasks((t) => t.filter((x) => x.id !== id));
    }
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
      <div className="space-y-6">

        {/* Create Project */}
        <GlassCard className="p-4 flex gap-2">
          <Input
            placeholder="New project title"
            value={newProjectTitle}
            onChange={(e) => setNewProjectTitle(e.target.value)}
          />
          <Button onClick={handleCreateProject} disabled={creatingProject}>
            {creatingProject ? "Creating..." : "Create"}
          </Button>
        </GlassCard>

        {/* Project List */}
        <GlassCard className="p-4 space-y-3">
          <h3 className="font-semibold">Projects</h3>
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
                      variant="destructive"
                      onClick={() => handleDeleteProject(p.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </GlassCard>

        {/* Create Task */}
        <GlassCard className="p-4 space-y-2">
          <select
            className="w-full border rounded p-2"
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>

          <Input
            placeholder="Task title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />

          <Input
            placeholder="Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />

          <Button onClick={handleCreateTask}>
            <Plus className="w-4 h-4 mr-2" /> Add Task
          </Button>
        </GlassCard>

        {/* Tasks */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {["todo", "progress", "done"].map((status) => (
              <div key={status}>
                <h4 className="font-semibold capitalize">{status}</h4>
                {tasks
                  .filter(
                    (t) =>
                      t.status === status &&
                      t.title.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((t) => (
                    <GlassCard key={t.id} className="p-3 mt-2">
                      <div className="flex justify-between">
                        <span>{t.title}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteTask(t.id)}
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
