import GlassCard from "@/components/GlassCard";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  type?: "count" | "currency"; // 👈 NEW
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  type = "count",
}: StatCardProps) => {
  const displayValue =
    type === "currency"
      ? value.toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        })
      : value.toString();

  return (
    <GlassCard className="p-6" hover={false}>
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-primary/15">
          <Icon className="h-6 w-6 text-primary" />
        </div>

        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{displayValue}</p>
        </div>
      </div>
    </GlassCard>
  );
};

export default StatCard;
