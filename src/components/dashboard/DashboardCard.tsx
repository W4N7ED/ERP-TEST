
import { cn } from "@/lib/utils";
import React from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  onClick?: () => void;
}

export function DashboardCard({
  title,
  value,
  icon,
  description,
  trend,
  className,
  onClick,
}: DashboardCardProps) {
  return (
    <div
      className={cn(
        "card-glass rounded-xl p-5 transition-all duration-300 h-full",
        onClick && "cursor-pointer hover:translate-y-[-2px]",
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && (
          <div className="text-primary bg-primary/10 p-2 rounded-full">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold">{value}</div>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        
        {trend && (
          <div 
            className={cn(
              "text-sm font-medium flex items-center",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}
          >
            <span>
              {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
