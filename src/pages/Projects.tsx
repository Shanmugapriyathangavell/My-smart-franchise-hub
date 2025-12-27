import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Calendar, MoreVertical } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

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

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [addingProject, setAddingProject] = useState(false);

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const [projectsRes, tasksRes] = await Promise.all([
      supabase.from("projects").select("*").eq("user_id", user.id),
      supabase.from("tasks").select("*").eq("user_id", user.id),
    ]);

    setProjects(projectsRes.data || []);
    setTasks(tasksRes.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addProject = async () => {
    if (!newProjectTitle.trim()) return;
    setAddingProject(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("projects").insert({
      title: newProjectTitle,
      user_id: user.id,
    });

    setNewProjectTitle("");
    setAddingProject(false);
    fetchData();
  };

  const removeProject = async (id: string) => {
    const ok = window.confirm("Remove this project? This action can’t be undone.");
    if (!ok) return;

    await supabase.from("projects").delete().eq("id", id);
    fetchData();
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Projects help you group related work.
          </p>
        </div>

        <GlassCard className="p-6 space-y-2">
          <Input
            placeholder="Project name"
            value={newProjectTitle}
            onChange={(e) => setNewProjectTitle(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Use a short name you’ll recognize later.
          </p>
          <Button onClick={addProject} disabled={addingProject}>
            Add project
          </Button>
        </GlassCard>

        <GlassCard className="p-6 space-y-4">
          {projects.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No projects yet. Add one to start organizing work.
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
      </div>
    </DashboardLayout>
  );
};

export default Projects;

