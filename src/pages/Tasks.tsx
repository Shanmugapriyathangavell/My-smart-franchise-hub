import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { logActivity } from "@/lib/activity";
import { toast } from "sonner";
import { taskSchema } from "@/validation/schemas";

/* dnd-kit */
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* Skeleton */
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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

/* ========= DRAGGABLE CARD ========= */

const TaskCard = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-3 bg-white rounded-md border shadow-sm text-sm cursor-grab"
    >
      {task.title}
    </div>
  );
};

/* ========= COMPONENT ========= */

const Tasks = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  /* ---------- LOAD DATA ---------- */

  const load = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setLoading(true);

    const [p, t] = await Promise.all([
      supabase.from("projects").select("id, title").eq("user_id", user.id),
      supabase.from("tasks").select("*").eq("user_id", user.id),
    ]);

    if (p.error) toast.error(p.error.message);
    else setProjects(p.data || []);

    if (t.error) toast.error(t.error.message);
    else setTasks(t.data || []);

    setLoading(false);
  };

  /* ---------- ADD TASK (ZOD) ---------- */

  const addTask = async () => {
    setErrorMsg("");

    const result = taskSchema.safeParse({ title });
    if (!result.success) {
      setErrorMsg(result.error.errors[0].message);
      return;
    }

    if (!projectId) {
      setErrorMsg("Please select a project");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("tasks").insert({
      title: result.data.title,
      project_id: projectId,
      user_id: user.id,
      status: "todo",
    });

    if (error) {
      toast.error(error.message);
    } else {
      await logActivity(user.id, `Added task "${result.data.title}"`);
      toast.success("Task added");
      setTitle("");
      setProjectId("");
      load();
    }
  };

  /* ---------- DRAG END (OPTIMISTIC UI) ---------- */

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    const oldTask = tasks.find((t) => t.id === taskId);
    if (!oldTask || oldTask.status === newStatus) return;

    /* 1️⃣ Optimistic UI */
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      )
    );

    /* 2️⃣ DB update */
    const { error } = await supabase
      .from("tasks")
      .update({ status: newStatus })
      .eq("id", taskId);

    /* 3️⃣ Rollback if failed */
    if (error) {
      toast.error("Failed to update task");
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, status: oldTask.status } : t
        )
      );
    } else {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await logActivity(
          user.id,
          `Moved task "${oldTask.title}" to ${newStatus}`
        );
      }
    }
  };

  useEffect(() => {
    load();
  }, []);

  /* ========= UI ========= */

  const columns: Task["status"][] = ["todo", "progress", "done"];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <p className="text-sm text-muted-foreground">
            Drag tasks between columns to update status.
          </p>
        </div>

        {/* Add Task */}
        <GlassCard className="p-5 space-y-3">
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

          {errorMsg && (
            <p className="text-sm text-red-500">{errorMsg}</p>
          )}

          <Button onClick={addTask}>Add task</Button>
        </GlassCard>

        {/* Kanban Board */}
        {loading ? (
          <Skeleton height={120} count={3} />
        ) : (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
          >
            <div className="grid md:grid-cols-3 gap-6">
              {columns.map((status) => (
                <div key={status}>
                  <h3 className="font-medium capitalize mb-3">
                    {status === "todo"
                      ? "To do"
                      : status === "progress"
                      ? "In progress"
                      : "Completed"}
                  </h3>

                  <SortableContext
                    items={tasks
                      .filter((t) => t.status === status)
                      .map((t) => t.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-2 min-h-[100px]">
                      {tasks
                        .filter((t) => t.status === status)
                        .map((t) => (
                          <TaskCard key={t.id} task={t} />
                        ))}
                    </div>
                  </SortableContext>
                </div>
              ))}
            </div>
          </DndContext>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Tasks;
