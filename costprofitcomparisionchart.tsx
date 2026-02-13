"use client"; 
// Required because we are using React hooks (useMemo)
// and dynamic client-side rendering

import { useMemo } from "react";

// Recharts components for Bar Chart
import {
    ResponsiveContainer,
    BarChart,
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
interface CostProfitComparisonChartProps {
    className?: string;     // Optional extra styling
    currency?: Currency;    // Selected currency
    startDate?: string;     // Start date filter
    endDate?: string;       // End date filter
}


// ================= Cost vs Profit Chart =================
export function CostProfitComparisonChart({
    className,
    currency = "USD",
    startDate,
    endDate
}: CostProfitComparisonChartProps) {

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

            // Filter only if same year (demo logic)
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
        // Convert cost & profit from USD → selected currency
        return data.map(d => ({
            ...d,
            cost: convertCurrencyValue(d.cost, "USD", currency),
            profit: convertCurrencyValue(d.profit, "USD", currency)
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
                    Cost vs Profit
                </h3>
                <p className="text-sm text-muted-foreground">
                    Operational efficiency analysis ({currency})
                </p>
            </div>


            {/* ================= Chart Container ================= */}
            <div className="flex-1 min-h-[300px] w-full">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart data={chartData}>

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
                            cursor={{ fill: "rgba(255,255,255,0.05)" }}
                            formatter={(value: any) => [
                                `${symbol}${value.toLocaleString()}`,
                                "Amount"
                            ]}
                        />

                        {/* Legend */}
                        <Legend />

                        {/* Cost Bar (Red) */}
                        <Bar
                            dataKey="cost"
                            name="Cost"
                            fill="#ef4444"
                            radius={[4, 4, 0, 0]}
                        />

                        {/* Profit Bar (Green) */}
                        <Bar
                            dataKey="profit"
                            name="Profit"
                            fill="#22c55e"
                            radius={[4, 4, 0, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>
            </div>
        </div>
    );
}
