"use client";
// This makes the component run on client side (browser).
// Required because charts are interactive.

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend,
} from "recharts";
// Importing chart components from recharts library.

import { cn } from "../utils";
// Utility function for merging class names.


/* =========================
   Component Props Interface
   ========================= */

interface AnalyticsChartProps {
    title: string;          // Title of chart
    data: any[];            // Data array for chart
    type: "area" | "bar";   // Chart type
    dataKey1: string;       // Main data field (like "cost" or "value")
    dataKey2?: string;      // Optional second data field (not used here yet)
    color1?: string;        // Primary color
    color2?: string;        // Secondary color
    className?: string;     // Optional extra styling
}


/* =========================
   Main Chart Component
   ========================= */

export function AnalyticsChart({
    title,
    data,
    type,
    dataKey1,
    dataKey2,
    color1 = "#8b5cf6", // Default Violet
    color2 = "#06b6d4", // Default Cyan
    className,
}: AnalyticsChartProps) {

    return (
        <div 
            className={cn(
                "rounded-xl border border-white/5 bg-white/5 p-6 shadow-2xl backdrop-blur-sm",
                className
            )}
        >
            {/* Chart Title */}
            <h3 className="text-lg font-semibold text-white mb-6">
                {title}
            </h3>

            {/* Fixed height container */}
            <div className="h-[300px] w-full">

                {/* Makes chart responsive */}
                <ResponsiveContainer width="100%" height="100%">

                    {/* ========== AREA CHART ========== */}
                    {type === "area" ? (

                        <AreaChart data={data}>

                            {/* Gradient definition */}
                            <defs>
                                <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={color1} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={color1} stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            {/* Grid lines */}
                            <CartesianGrid 
                                strokeDasharray="3 3" 
                                stroke="rgba(255,255,255,0.05)" 
                            />

                            {/* X Axis */}
                            <XAxis 
                                dataKey="month" 
                                stroke="#94a3b8" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false} 
                            />

                            {/* Y Axis */}
                            <YAxis 
                                stroke="#94a3b8" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false}
                                tickFormatter={(value) => `$${value}`}
                                // Adds $ before numbers
                            />

                            {/* Tooltip (hover popup) */}
                            <Tooltip
                                contentStyle={{ 
                                    backgroundColor: "#1e293b", 
                                    borderColor: "rgba(255,255,255,0.1)", 
                                    color: "#f8fafc" 
                                }}
                                itemStyle={{ color: "#f8fafc" }}
                            />

                            {/* Area line */}
                            <Area
                                type="monotone"
                                dataKey={dataKey1}
                                stroke={color1}
                                fillOpacity={1}
                                fill="url(#color1)"
                            />

                        </AreaChart>

                    ) : (

                        /* ========== BAR CHART ========== */

                        <BarChart data={data}>

                            {/* Grid */}
                            <CartesianGrid 
                                strokeDasharray="3 3" 
                                stroke="rgba(255,255,255,0.05)" 
                            />

                            {/* X Axis */}
                            <XAxis 
                                dataKey="name" 
                                stroke="#94a3b8" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false} 
                            />

                            {/* Y Axis */}
                            <YAxis 
                                stroke="#94a3b8" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false} 
                            />

                            {/* Tooltip */}
                            <Tooltip
                                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                                contentStyle={{ 
                                    backgroundColor: "#1e293b", 
                                    borderColor: "rgba(255,255,255,0.1)", 
                                    color: "#f8fafc" 
                                }}
                            />

                            {/* Bar */}
                            <Bar 
                                dataKey={dataKey1} 
                                fill={color2} 
                                radius={[4, 4, 0, 0]} 
                            />

                        </BarChart>
                    )}

                </ResponsiveContainer>
            </div>
        </div>
    );
}
