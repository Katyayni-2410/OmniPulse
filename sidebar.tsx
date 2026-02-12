import { LayoutDashboard, Database, Activity, Settings, BarChart2, Layers } from "lucide-react";
// Importing sidebar icons from lucide-react library.

import { cn } from "../utils";
// cn is a helper function used to combine multiple Tailwind class names safely.


// Sidebar component
// It accepts an optional className prop
export function Sidebar({ className }: { className?: string }) {

    // Navigation items array
    // Each object represents one sidebar button
    const navItems = [
        { icon: LayoutDashboard, label: "Dashboard", active: true },
        { icon: Database, label: "Data Sources", active: false },
        { icon: Activity, label: "Live Monitoring", active: false },
        { icon: BarChart2, label: "Analytics", active: false },
        { icon: Layers, label: "Integrations", active: false },
        { icon: Settings, label: "Settings", active: false },
    ];


    return (
        <aside 
            className={cn(
                // Base styling
                "flex h-full w-64 flex-col border-r border-white/5 bg-slate-900/50 backdrop-blur-xl",
                
                // Additional className passed from parent
                className
            )}
        >
            {/* ========== LOGO SECTION ========== */}
            <div className="flex h-16 items-center border-b border-white/5 px-6">

                {/* Small animated logo box */}
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary animate-pulse mr-3" />

                {/* App Name */}
                <span className="text-xl font-bold tracking-tight text-white">
                    Omni Pulse
                </span>
            </div>


            {/* ========== NAVIGATION SECTION ========== */}
            <nav className="flex-1 space-y-1 p-4">

                {/* Looping through navItems using map() */}
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        // Combine base classes + conditional classes
                        className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",

                            // If item is active → apply active styles
                            item.active
                                ? "bg-primary/10 text-primary shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                                : "text-muted-foreground hover:bg-white/5 hover:text-white"
                        )}
                    >
                        {/* Dynamic icon rendering */}
                        <item.icon size={18} />

                        {/* Navigation label */}
                        {item.label}
                    </button>
                ))}
            </nav>


            {/* ========== SYSTEM STATUS SECTION ========== */}
            <div className="p-4 border-t border-white/5">

                <div className="rounded-lg bg-gradient-to-r from-slate-800 to-slate-900 p-4">

                    <h4 className="text-sm font-semibold text-white">
                        System Status
                    </h4>

                    <div className="mt-2 flex items-center gap-2">

                        {/* Green blinking dot */}
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>

                        <span className="text-xs text-emerald-500">
                            All Systems Operational
                        </span>

                    </div>
                </div>

            </div>

        </aside>
    );
}
