"use client"; 
// Required because we are using React hooks (useMemo)
// and dynamic rendering on the client side

import { useMemo } from "react";

// Recharts components for combined chart (Bar + Line)
import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Bar,
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
interface RevenueGrowthComboChartProps {
    className?: string;     // Optional styling
    currency?: Currency;    // Selected currency
    startDate?: string;     // Optional start filter
    endDate?: string;       // Optional end filter
}


// ================= Revenue + Growth Combo Chart =================
export function RevenueGrowthComboChart({
    className,
    currency = "USD",
    startDate,
    endDate
}: RevenueGrowthComboChartProps) {

    // ================= Memoized Data Processing =================
    const chartData = useMemo(() => {

        let data = MOCK_DATA.monthlyAnalytics;

        // -------- Date Filtering --------
        if (startDate && endDate) {

            const start = new Date(startDate);
            const end = new Date(endDate);

            const startMonth = start.getMonth();
            const endMonth = end.getMonth();

            const months = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];

            // Only filter if same year (demo logic)
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
                    Revenue & Growth
                </h3>
                <p className="text-sm text-muted-foreground">
                    Performance vs Business Velocity ({currency})
                </p>
            </div>


            {/* ================= Chart Container ================= */}
            <div className="flex-1 min-h-[300px] w-full">

                <ResponsiveContainer width="100%" height="100%">

                    {/* ComposedChart allows Bar + Line in same chart */}
                    <ComposedChart data={chartData}>

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

                        {/* ================= Left Y Axis (Revenue) ================= */}
                        <YAxis
                            yAxisId="left"
                            stroke="#94a3b8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) =>
                                `${symbol}${value / 1000}k`
                            }
                            label={{
                                value: "Revenue",
                                angle: -90,
                                position: "insideLeft",
                                style: { fill: "#94a3b8" }
                            }}
                        />

                        {/* ================= Right Y Axis (Growth %) ================= */}
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="#94a3b8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}%`}
                            label={{
                                value: "Growth %",
                                angle: 90,
                                position: "insideRight",
                                style: { fill: "#94a3b8" }
                            }}
                        />

                        {/* Tooltip */}
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1e293b",
                                borderColor: "rgba(255,255,255,0.1)",
                                color: "#f8fafc"
                            }}
                            itemStyle={{ color: "#f8fafc" }}
                            formatter={(value: any, name: string) => {
                                if (name === "Revenue") {
                                    return [
                                        `${symbol}${value.toLocaleString()}`,
                                        name
                                    ];
                                }
                                return [`${value}%`, name];
                            }}
                        />

                        {/* Legend */}
                        <Legend />

                        {/* Revenue Bar */}
                        <Bar
                            yAxisId="left"
                            dataKey="revenue"
                            name="Revenue"
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                            barSize={20}
                        />

                        {/* Growth Line */}
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="growth"
                            name="Growth %"
                            stroke="#f59e0b"
                            strokeWidth={3}
                        />

                    </ComposedChart>

                </ResponsiveContainer>
            </div>
        </div>
    );
}
