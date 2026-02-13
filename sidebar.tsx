// Icons for navigation items
import { 
    LayoutDashboard, 
    Database, 
    BarChart2, 
    Layers, 
    Settings, 
    ChevronDown, 
    ChevronRight, 
    TrendingUp, 
    DollarSign, 
    PieChart, 
    Activity 
} from "lucide-react";

import { useState } from "react";

// Animation utilities for dropdown expansion
import { motion, AnimatePresence } from "framer-motion";

// Utility for conditional classNames
import { cn } from "../utils";


// ================= Props Interface =================
interface SidebarProps {
    className?: string; // Optional external styling
    activeItem?: string; // (Optional) controlled active item
    onNavigate?: (id: string) => void; // Callback when navigation changes
}


// ================= Sidebar Component =================
export function Sidebar({ 
    className, 
    activeItem: propActiveItem, 
    onNavigate 
}: SidebarProps) {

    // Local state to track active menu item
    const [activeItem, setActiveItem] = useState("dashboard");

    // Controls whether Analytics dropdown is open
    const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);


    // ================= Navigation Handler =================
    const handleNavigate = (id: string, isSubItem = false) => {

        // If clicking Analytics parent → toggle dropdown
        if (id === 'analytics') {
            setIsAnalyticsOpen(!isAnalyticsOpen);
            return;
        }

        // Otherwise update active item
        setActiveItem(id);

        // Notify parent component (DashboardView)
        if (onNavigate) onNavigate(id);
    };


    // ================= Main Navigation Items =================
    const mainNavItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "data-sources", label: "Data Sources", icon: Database },
    ];

    // ================= Analytics Sub Items =================
    const analyticsSubItems = [
        { id: "analytics-revenue", label: "Revenue Trend", icon: TrendingUp },
        { id: "analytics-cost-profit", label: "Cost vs Profit", icon: DollarSign },
        { id: "analytics-combo", label: "Revenue + Growth", icon: BarChart2 },
        { id: "analytics-margin", label: "Profit Margin", icon: PieChart },
    ];

    // ================= Bottom Navigation =================
    const bottomNavItems = [
        { id: "integrations", label: "Integrations", icon: Layers },
        { id: "settings", label: "Settings", icon: Settings },
    ];


    return (
        <div
            className={cn(
                "flex h-screen w-64 flex-col border-r border-white/10 bg-slate-900/50 backdrop-blur-xl",
                className
            )}
        >

            {/* ================= Logo Section ================= */}
            <div className="flex h-16 items-center px-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                    
                    {/* Logo Icon */}
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Activity className="h-5 w-5 text-white" />
                    </div>

                    {/* Brand Name */}
                    <span className="text-lg font-bold text-white tracking-wide">
                        OmniPulse
                    </span>
                </div>
            </div>


            {/* ================= Navigation Area ================= */}
            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">

                {/* ---------- Main Nav Items ---------- */}
                {mainNavItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                            activeItem === item.id
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-white/5 hover:text-white"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </button>
                ))}


                {/* ================= Analytics Dropdown ================= */}
                <div className="space-y-1">

                    {/* Parent Analytics Button */}
                    <button
                        onClick={() => handleNavigate('analytics')}
                        className={cn(
                            "flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                            isAnalyticsOpen
                                ? "text-white"
                                : "text-muted-foreground hover:bg-white/5 hover:text-white"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <BarChart2 className="h-5 w-5" />
                            <span>Analytics</span>
                        </div>

                        {/* Toggle Icon */}
                        {isAnalyticsOpen
                            ? <ChevronDown className="h-4 w-4" />
                            : <ChevronRight className="h-4 w-4" />
                        }
                    </button>


                    {/* Animated Submenu */}
                    <AnimatePresence>
                        {isAnalyticsOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden pl-4 space-y-1"
                            >

                                {analyticsSubItems.map((sub) => (
                                    <button
                                        key={sub.id}
                                        onClick={() => handleNavigate(sub.id, true)}
                                        className={cn(
                                            "flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                                            activeItem === sub.id
                                                ? "bg-primary/10 text-primary"
                                                : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <sub.icon className="h-4 w-4" />
                                        {sub.label}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>


                {/* ---------- Bottom Nav Items ---------- */}
                {bottomNavItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                            activeItem === item.id
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-white/5 hover:text-white"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </button>
                ))}
            </div>


            {/* ================= System Status Footer ================= */}
            <div className="p-4 border-t border-white/5">
                <div className="rounded-lg bg-gradient-to-r from-slate-800 to-slate-900 p-4">
                    
                    <h4 className="text-sm font-semibold text-white">
                        System Status
                    </h4>

                    <div className="mt-2 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs text-emerald-500">
                            All Systems Operational
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
}
