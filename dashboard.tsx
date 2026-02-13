"use client";

import { motion } from "framer-motion";
import { Users, DollarSign, TrendingUp, HardDrive } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { StatCard } from "./StatCard";
import { AnalyticsChart } from "./AnalyticsChart";
import { MarketTrendsWidget } from "./MarketTrendsWidget";
import { Currency, formatCurrency } from "../utils";
import { MOCK_DATA } from "../mockData";

interface DashboardViewProps {
    currency: Currency;
    onCurrencyChange: (c: Currency) => void;
    onLogout: () => void;
}

export function DashboardView({ currency, onCurrencyChange, onLogout }: DashboardViewProps) {
    // Compute Key Metrics based on Currency
    const totalRevenue = formatCurrency(MOCK_DATA.kpi.totalRevenue, currency);

    // For this mock, let's assume 'Active Users' and 'Optimization Score' are not monetary, 
    // but 'Process Data Value' could be implied as monetary or just generic. 
    // Let's treat valid monetary values.

    const workflowData = MOCK_DATA.workflowData.map(d => ({
        ...d,
        cost: d.cost * (currency === 'USD' ? 1 :
            currency === 'EUR' ? 0.92 :
                currency === 'GBP' ? 0.79 : 83.12)
    }));

    // Re-map chart data specifically for the values
    const convertedWorkflowData = MOCK_DATA.workflowData.map(item => ({
        ...item,
        cost: Math.round(item.cost * (
            currency === 'USD' ? 1 :
                currency === 'EUR' ? 0.92 :
                    currency === 'GBP' ? 0.79 :
                        83.12
        ))
    }));


    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            <Sidebar className="hidden md:flex" />

            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Background Ambient Glow */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                    <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
                </div>

                <TopBar
                    currentCurrency={currency}
                    onCurrencyChange={onCurrencyChange}
                    onLogout={onLogout}
                />

                <main className="flex-1 overflow-y-auto p-8 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold text-white tracking-tight">Executive Overview</h1>
                        <p className="text-muted-foreground mt-1">Real-time insights into your logistics performance.</p>
                    </motion.div>

                    {/* KPI Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title="Total Revenue"
                            value={totalRevenue}
                            icon={DollarSign}
                            trend="+12.5%"
                            trendUp={true}
                        />
                        <StatCard
                            title="Active Users"
                            value={MOCK_DATA.kpi.activeUsers.toLocaleString()}
                            icon={Users}
                            trend="+4.2%"
                            trendUp={true}
                        />
                        <StatCard
                            title="Optimization Score"
                            value={`${MOCK_DATA.kpi.optimizationScore}%`}
                            icon={TrendingUp}
                            trend="+2.1%"
                            trendUp={true}
                        />
                        <StatCard
                            title="Data Processed"
                            value={`${MOCK_DATA.kpi.processedDataGB} GB`}
                            icon={HardDrive}
                        />
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <AnalyticsChart
                            title={`Cost Reduction Trends (${currency})`}
                            data={convertedWorkflowData}
                            type="area"
                            dataKey1="cost"
                            color1="#8b5cf6" // Primary
                        />
                        <AnalyticsChart
                            title="Data Refinement Volume"
                            data={MOCK_DATA.dataRefinement}
                            type="bar"
                            dataKey1="value"
                            color2="#06b6d4" // Secondary
                        />
                    </div>

                    {/* Market Trends Section */}
                    <div className="mt-8">
                        <MarketTrendsWidget />
