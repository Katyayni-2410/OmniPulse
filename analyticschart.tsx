"use client";

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
import { cn } from "../utils";

interface AnalyticsChartProps {
    title: string;
    data: any[];
    type: "area" | "bar";
    dataKey1: string; // e.g., 'cost' or 'value'
    dataKey2?: string;
    color1?: string; // hex or var
    color2?: string;
    className?: string;
}

export function AnalyticsChart({
    title,
    data,
    type,
    dataKey1,
    dataKey2,
    color1 = "#8b5cf6", // Default Primary (Violet)
    color2 = "#06b6d4", // Default Secondary (Cyan)
    className,
}: AnalyticsChartProps) {
    return (
        <div className={cn(
            "rounded-xl border border-white/5 bg-white/5 p-6 shadow-2xl backdrop-blur-sm",
            className
        )}>
            <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    {type === "area" ? (
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={color1} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={color1} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#1e293b", borderColor: "rgba(255,255,255,0.1)", color: "#f8fafc" }}
                                itemStyle={{ color: "#f8fafc" }}
                            />
                            <Area
                                type="monotone"
                                dataKey={dataKey1}
                                stroke={color1}
                                fillOpacity={1}
                                fill="url(#color1)"
                            />
                        </AreaChart>
                    ) : (
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                                contentStyle={{ backgroundColor: "#1e293b", borderColor: "rgba(255,255,255,0.1)", color: "#f8fafc" }}
                            />
                            <Bar dataKey={dataKey1} fill={color2} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
}
