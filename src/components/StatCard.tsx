import GlassCard from "@/components/GlassCard";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
}

const StatCard = ({ title, value, icon: Icon }: StatCardProps) => {
  return (
    <GlassCard className="p-6" hover={false}>
      <div className="flex items-center gap-4">
        
        {/* Icon */}
        <div className="p-3 rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>

        {/* Text */}
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>

      </div>
    </GlassCard>
  );
};

export default StatCard;
