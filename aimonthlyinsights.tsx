"use client";
// Required because we are using animations (framer-motion)
// and this component runs on the client side

import { motion } from "framer-motion";

// Icons used for different AI insights
import {
    Sparkles,
    ArrowRight,
    CheckCircle2,
    AlertTriangle,
    TrendingUp,
    TrendingDown
} from "lucide-react";

// Utility for conditional classNames
import { cn } from "../utils";


// ================= Props Interface =================
interface AIMonthlyInsightsProps {
    className?: string; // Optional external styling
}


// ================= AI Monthly Insights Component =================
export function AIMonthlyInsights({ className }: AIMonthlyInsightsProps) {

    // Static AI-generated insights (mocked for demo)
    const insights = [
        {
            icon: TrendingUp,
            color: "text-green-400",
            text: "Fuel optimization saved ₹24.5L this month",
        },
        {
            icon: CheckCircle2,
            color: "text-blue-400",
            text: "Warehouse efficiency improved by 6%",
        },
        {
            icon: AlertTriangle,
            color: "text-amber-400",
            text: "Supplier risk increased in North Zone",
        },
        {
            icon: Sparkles,
            color: "text-purple-400",
            text: "AI routing reduced delays by 14%",
        },
    ];

    return (
        <div
            className={cn(
                "rounded-xl border border-white/5 bg-white/5 p-6 shadow-2xl backdrop-blur-sm flex flex-col h-full",
                className
            )}
        >

            {/* ================= Header ================= */}
            <div className="flex items-center gap-3 mb-6">

                {/* Icon Container */}
                <div className="p-2 rounded-lg bg-primary/10">
                    <Sparkles className="text-primary h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white">
                    AI Monthly Insights
                </h3>
            </div>


            {/* ================= Insights List ================= */}
            <div className="flex-1 space-y-4">

                {insights.map((insight, index) => (

                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }} // Stagger animation
                        className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
                    >

                        {/* Dynamic Insight Icon */}
                        <insight.icon
                            className={cn(
                                "mt-1 h-5 w-5 shrink-0",
                                insight.color
                            )}
                        />

                        {/* Insight Text */}
                        <span className="text-slate-200 font-medium">
                            {insight.text}
                        </span>

                    </motion.div>
                ))}

            </div>


            {/* ================= CTA Section ================= */}
            <div className="mt-8 pt-6 border-t border-white/10">

                <button
                    className="w-full group flex items-center justify-center gap-2 rounded-lg bg-white py-3 text-slate-900 font-bold hover:bg-slate-200 transition-all active:scale-[0.98]"
                >
                    View Recommended Actions

                    <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    />
                </button>

            </div>
        </div>
    );
}
