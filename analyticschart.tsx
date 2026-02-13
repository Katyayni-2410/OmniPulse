"use client"; 
// Required because this chart runs on the client (uses dynamic rendering)

// ================= Recharts Components =================
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

// Utility function for conditional classNames
import { cn } from "../utils";


// ================= Props Interface =================
interface AnalyticsChartProps {
    title: string;          // Chart Title
    data: any[];            // Data array for chart
    type: "area" | "bar";   // Chart type selector
    dataKey1: string;       // Main data key (e.g., revenue, cost)
    dataKey2?: string;      // Optional second dataset (future scalability)
    color1?: string;        // Primary color
    color2?: string;        // Secondary color
    className?: string;     // Extra styling
    currency?: string;      // Currency code (USD, INR, etc.)
}


// ================= Analytics Chart Component =================
export function AnalyticsChart({
    title,
    data,
    type,
    dataKey1,
    dataKey2,
    color1 = "#8b5cf6", // Default Violet
    color2 = "#06b6d4", // Default Cyan
    className,
    currency = "$",
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

            {/* Chart Container */}
            <div className="h-[300px] w-full">

                {/* Makes chart responsive */}
                <ResponsiveContainer width="100%" height="100%">

                    {/* ================= Area Chart ================= */}
                    {type === "area" ? (
                        <AreaChart data={data}>

                            {/* Gradient Definition */}
                            <defs>
                                <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={color1} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={color1} stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            {/* Grid Lines */}
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

                            {/* Y Axis with Currency Formatting */}
                            <YAxis
                                stroke="#94a3b8"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => {
                                    return new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency:
                                            currency === "USD" ||
                                            currency === "EUR" ||
                                            currency === "GBP" ||
                                            currency === "INR"
                                                ? currency
                                                : "USD",
                                        maximumFractionDigits: 0,
                                    }).format(value);
                                }}
                            />

                            {/* Tooltip (Hover Info) */}
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1e293b",
                                    borderColor: "rgba(255,255,255,0.1)",
                                    color: "#f8fafc",
                                }}
                                itemStyle={{ color: "#f8fafc" }}
                                formatter={(value: any) => {
                                    if (typeof value === "number") {
                                        return new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency:
                                                currency === "USD" ||
                                                currency === "EUR" ||
                                                currency === "GBP" ||
                                                currency === "INR"
                                                    ? currency
                                                    : "USD",
                                            maximumFractionDigits: 0,
                                        }).format(value);
                                    }
                                    return value;
                                }}
                            />

                            {/* Main Area */}
                            <Area
                                type="monotone"
                                dataKey={dataKey1}
                                stroke={color1}
                                fillOpacity={1}
                                fill="url(#color1)"
                            />
                        </AreaChart>

                    ) : (

                        /* ================= Bar Chart ================= */
                        <BarChart data={data}>

                            <CartesianGrid 
                                strokeDasharray="3 3" 
                                stroke="rgba(255,255,255,0.05)" 
                            />

                            <XAxis
                                dataKey="name"
                                stroke="#94a3b8"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />

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
                                    color: "#f8fafc",
                                }}
                            />

                            {/* Bar Element */}
                            <Bar
                                dataKey={dataKey1}
                                fill={color2}
                                radius={[4, 4, 0, 0]} // Rounded top edges
                            />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
}
