import { LucideIcon } from "lucide-react";
import GlassCard from "./GlassCard";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard = ({ title, value, icon: Icon, trend, className }: StatCardProps) => {
  return (
    <GlassCard className={cn("relative overflow-hidden", className)}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-full blur-3xl" />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-gradient-primary rounded-lg">
            <Icon className="w-6 h-6 text-primary-foreground" />
          </div>
          
          {trend && (
            <div className={cn(
              "text-sm font-medium",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </div>
          )}
        </div>
        
        <h3 className="text-sm text-muted-foreground mb-1">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </GlassCard>
  );
};

export default StatCard;
