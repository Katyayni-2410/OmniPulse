import { LucideIcon } from "lucide-react";
import { cn } from "../utils";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, trendUp, className }: StatCardProps) {
    return (
        <div className={cn(
            "relative overflow-hidden rounded-xl border border-white/5 bg-white/5 p-6 shadow-2xl backdrop-blur-sm transition-all hover:bg-white/10 group",
            className
        )}>
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl group-hover:bg-secondary/20 transition-colors duration-500" />

            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <h3 className="mt-2 text-3xl font-bold tracking-tight text-white">{value}</h3>
                </div>
                <div className="rounded-full bg-white/10 p-3 text-primary group-hover:text-secondary transition-colors duration-300">
                    <Icon size={24} />
                </div>
            </div>

            {trend && (
                <div className="mt-4 flex items-center gap-2">
                    <span className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        trendUp ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                    )}>
                        {trend}
                    </span>
                    <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
            )}
        </div>
    );
}
