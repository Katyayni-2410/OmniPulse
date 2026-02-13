"use client"; 
// Required because this component runs on the client side
// (uses hooks like useMemo)

import { useMemo } from "react";

// Recharts components for building the chart
import { 
    ResponsiveContainer, 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend 
} from "recharts";

// Mock dataset
import { MOCK_DATA } from "../../mockData";

// Utility for class merging & currency typing
import { cn, Currency } from "../../utils";


// ================= Props Interface =================
interface ProfitMarginChartProps {
    className?: string;   // Optional styling
    currency?: Currency;  // (Currently unused, but scalable)
    startDate?: string;   // Optional filter start date
    endDate?: string;     // Optional filter end date
}


// ================= Profit Margin Chart Component =================
export function ProfitMarginChart({ 
    className, 
    currency = "USD", 
    startDate, 
    endDate 
}: ProfitMarginChartProps) {

    // ================= Memoized Data Filtering =================
    // Prevents unnecessary recalculation on every render
    const chartData = useMemo(() => {

        let data = MOCK_DATA.monthlyAnalytics;

        // If date range is provided → filter data
        if (startDate && endDate) {

            const start = new Date(startDate);
            const end = new Date(endDate);

            const startMonth = start.getMonth();
            const endMonth = end.getMonth();

            const months = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];

            // Filter only if same year (simple demo logic)
            if (start.getFullYear() === end.getFullYear()) {

                data = data.filter(d => {
                    const monthIndex = months.indexOf(d.month);

                    return (
                        monthIndex >= startMonth &&
                        monthIndex <= endMonth
                    );
                });
            }
        }

        return data;

    }, [startDate, endDate]); // Recalculate only when dates change



    return (
        <div
            className={cn(
                "rounded-xl border border-white/5 bg-white/5 p-6 shadow-2xl backdrop-blur-sm h-full flex flex-col",
                className
            )}
        >

            {/* ================= Header Section ================= */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">
                    Profit Margin Trend
                </h3>
                <p className="text-sm text-muted-foreground">
                    Profitability analysis over time
                </p>
            </div>


            {/* ================= Chart Container ================= */}
            <div className="flex-1 min-h-[300px] w-full">

                {/* Makes chart responsive */}
                <ResponsiveContainer width="100%" height="100%">

                    <AreaChart data={chartData}>

                        {/* Gradient Definition */}
                        <defs>
                            <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        {/* Grid */}
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255,255,255,0.05)"
                        />

                        {/* X Axis (Months) */}
                        <XAxis
                            dataKey="month"
                            stroke="#94a3b8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />

                        {/* Y Axis (Percentage Format) */}
                        <YAxis
                            stroke="#94a3b8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}%`}
                        />

                        {/* Tooltip (Hover Info) */}
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1e293b",
                                borderColor: "rgba(255,255,255,0.1)",
                                color: "#f8fafc"
                            }}
                            itemStyle={{ color: "#f8fafc" }}
                            formatter={(value: any) => [
                                `${value}%`,
                                "Margin"
                            ]}
                        />

                        {/* Legend */}
                        <Legend />

                        {/* Area Graph */}
                        <Area
                            type="monotone"
                            dataKey="margin"
                            stroke="#10b981"
                            fillOpacity={1}
                            fill="url(#colorMargin)"
                            name="Profit Margin"
                        />
                    </AreaChart>

                </ResponsiveContainer>
            </div>
        </div>
    );
}
