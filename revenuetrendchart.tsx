"use client"; 
// Required because we use React hooks (useMemo)
// and dynamic client-side rendering

import { useMemo } from "react";

// Recharts components for Line Chart
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

// Mock dataset
import { MOCK_DATA } from "../../mockData";

// Utilities for styling + currency conversion
import { cn, Currency, convertCurrencyValue, CURRENCY_SYMBOLS } from "../../utils";


// ================= Props Interface =================
interface RevenueTrendChartProps {
    className?: string;     // Optional extra styling
    currency?: Currency;    // Selected currency
    startDate?: string;     // Start date filter
    endDate?: string;       // End date filter
}


// ================= Revenue Trend Chart =================
export function RevenueTrendChart({
    className,
    currency = "USD",
    startDate,
    endDate
}: RevenueTrendChartProps) {

    // ================= Memoized Data Processing =================
    const chartData = useMemo(() => {

        let data = MOCK_DATA.monthlyAnalytics;

        // -------- Date Filtering --------
        if (startDate && endDate) {

            const start = new Date(startDate);
            const end = new Date(endDate);

            const startMonth = start.getMonth(); // 0-11
            const endMonth = end.getMonth();     // 0-11

            // Mapping month names → index
            const months = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];

            // Simple filtering logic (single year assumption)
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

        // -------- Currency Conversion --------
        // Convert revenue from USD → selected currency
        return data.map(d => ({
            ...d,
            revenue: convertCurrencyValue(d.revenue, "USD", currency)
        }));

    }, [currency, startDate, endDate]);


    // Currency symbol (₹, $, €, etc.)
    const symbol = CURRENCY_SYMBOLS[currency];


    return (
        <div
            className={cn(
                "rounded-xl border border-white/5 bg-white/5 p-6 shadow-2xl backdrop-blur-sm h-full flex flex-col",
                className
            )}
        >

            {/* ================= Header ================= */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">
                    Revenue Trend
                </h3>
                <p className="text-sm text-muted-foreground">
                    Month-wise revenue performance ({currency})
                </p>
            </div>


            {/* ================= Chart Container ================= */}
            <div className="flex-1 min-h-[300px] w-full">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart data={chartData}>

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

                        {/* Y Axis (Formatted Currency) */}
                        <YAxis
                            stroke="#94a3b8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) =>
                                `${symbol}${value / 1000}k`
                            }
                        />

                        {/* Tooltip */}
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1e293b",
                                borderColor: "rgba(255,255,255,0.1)",
                                color: "#f8fafc"
                            }}
                            itemStyle={{ color: "#f8fafc" }}
                            formatter={(value: any) => [
                                `${symbol}${value.toLocaleString()}`,
                                "Revenue"
                            ]}
                        />

                        {/* Legend */}
                        <Legend />

                        {/* Revenue Line */}
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            dot={{ fill: "#8b5cf6", r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>

                </ResponsiveContainer>
            </div>
        </div>
    );
}
