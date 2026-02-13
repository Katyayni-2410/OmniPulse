// Type for dynamic icon component
import { LucideIcon } from "lucide-react";

// Utility for conditional classNames
import { cn } from "../utils";


// ================= Props Interface =================
interface StatCardProps {
    title: string;              // KPI title (e.g., Total Revenue)
    value: string | number;     // KPI value
    icon: LucideIcon;           // Icon component
    trend?: string;             // Trend percentage (e.g., +12%)
    trendUp?: boolean;          // Whether trend is positive or negative
    className?: string;         // Optional extra styling
}


// ================= Stat Card Component =================
export function StatCard({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    trendUp, 
    className 
}: StatCardProps) {

    return (
        <div
            className={cn(
                // Base styling
                "relative overflow-hidden rounded-xl border border-white/5 bg-white/5 p-6 shadow-2xl backdrop-blur-sm transition-all hover:bg-white/10 group",
                className
            )}
        >

            {/* Decorative Background Glow */}
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl group-hover:bg-secondary/20 transition-colors duration-500" />

            
            {/* ================= Main Content ================= */}
            <div className="flex items-center justify-between">

                {/* Title & Value */}
                <div>
                    <p className="text-sm font-medium text-muted-foreground">
                        {title}
                    </p>

                    <h3 className="mt-2 text-3xl font-bold tracking-tight text-white">
                        {value}
                    </h3>
                </div>


                {/* Icon Section */}
                <div className="rounded-full bg-white/10 p-3 text-primary group-hover:text-secondary transition-colors duration-300">
                    <Icon size={24} />
                </div>
            </div>


            {/* ================= Trend Indicator ================= */}
            {trend && (
                <div className="mt-4 flex items-center gap-2">

                    {/* Trend Badge */}
                    <span
                        className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded-full",
                            trendUp
                                ? "bg-emerald-500/20 text-emerald-400"  // Positive
                                : "bg-red-500/20 text-red-400"        // Negative
                        )}
                    >
                        {trend}
                    </span>

                    {/* Comparison Label */}
                    <span className="text-xs text-muted-foreground">
                        vs last month
                    </span>
                </div>
            )}
        </div>
    );
}
