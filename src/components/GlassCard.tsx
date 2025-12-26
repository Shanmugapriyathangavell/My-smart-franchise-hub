import { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard = ({ children, className, hover = true, ...props }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "bg-card rounded-lg p-6 border border-border shadow-card",
        hover && "hover:shadow-elevated hover:border-primary/20 transition-shadow duration-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
