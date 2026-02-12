"use client";
// This tells Next.js that this component runs on the browser side.
// It allows us to use hooks, animations, interactivity, etc.

import { motion } from "framer-motion";
// motion is used to add animations to components.

import { Users, DollarSign, TrendingUp, HardDrive } from "lucide-react";
// These are icon components from lucide-react library.

import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { StatCard } from "./StatCard";
import { AnalyticsChart } from "./AnalyticsChart";
// Importing custom components from your project.

import { Currency, formatCurrency } from "../utils";
// Currency → a type (like 'USD' | 'EUR' | 'INR')
// formatCurrency → function to format numbers into currency format.

import { MOCK_DATA } from "../mockData";
// Importing fake data for testing (instead of real backend data).


// This defines what props this component expects.
interface DashboardViewProps {
    currency: Currency; // Current selected currency
    onCurrencyChange: (c: Currency) => void; // Function to change currency
    onLogout: () => void; // Function to logout
}


// Main Dashboard Component
export function DashboardView({ currency, onCurrencyChange, onLogout }: DashboardViewProps) {

    // Convert total revenue based on selected currency
    const totalRevenue = formatCurrency(MOCK_DATA.kpi.totalRevenue, currency);


    // Convert workflow data costs according to selected currency
    const workflowData = MOCK_DATA.workflowData.map(d => ({
        ...d, // keep other properties same
        cost: d.cost * (
            currency === 'USD' ? 1 :
            currency === 'EUR' ? 0.92 :
            currency === 'GBP' ? 0.79 :
            83.12 // assume INR conversion rate
        )
    }));


    // Again converting workflow data but rounding values
    // (This one is actually used in chart)
    const convertedWorkflowData = MOCK_DATA.workflowData.map(item => ({
        ...item,
        cost: Math.round(
            item.cost * (
                currency === 'USD' ? 1 :
                currency === 'EUR' ? 0.92 :
                currency === 'GBP' ? 0.79 :
                83.12
            )
        )
    }));


    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            {/* Main container with full screen height */}

            <Sidebar className="hidden md:flex" />
            {/* Sidebar will be hidden on small screens (mobile) */}

            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* This is the main content area */}

                {/* Background glow effect */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                    <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
                </div>

                {/* Top navigation bar */}
                <TopBar
                    currentCurrency={currency}
                    onCurrencyChange={onCurrencyChange}
                    onLogout={onLogout}
                />

                {/* Main scrollable content */}
                <main className="flex-1 overflow-y-auto p-8 z-10">

                    {/* Animated heading using framer-motion */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}   // Start invisible and slightly down
                        animate={{ opacity: 1, y: 0 }}   // Animate to visible and normal position
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold text-white tracking-tight">
                            Executive Overview
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Real-time insights into your logistics performance.
                        </p>
                    </motion.div>


                    {/* KPI Cards Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                        {/* Total Revenue Card */}
                        <StatCard
                            title="Total Revenue"
                            value={totalRevenue}
                            icon={DollarSign}
                            trend="+12.5%"
                            trendUp={true}
                        />

                        {/* Active Users Card */}
                        <StatCard
                            title="Active Users"
                            value={MOCK_DATA.kpi.activeUsers.toLocaleString()}
                            icon={Users}
                            trend="+4.2%"
                            trendUp={true}
                        />

                        {/* Optimization Score Card */}
                        <StatCard
                            title="Optimization Score"
                            value={`${MOCK_DATA.kpi.optimizationScore}%`}
                            icon={TrendingUp}
                            trend="+2.1%"
                            trendUp={true}
                        />

                        {/* Data Processed Card */}
                        <StatCard
                            title="Data Processed"
                            value={`${MOCK_DATA.kpi.processedDataGB} GB`}
                            icon={HardDrive}
                        />
                    </div>


                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Area Chart */}
                        <AnalyticsChart
                            title={`Cost Reduction Trends (${currency})`}
                            data={convertedWorkflowData}
                            type="area"
                            dataKey1="cost"
                            color1="#8b5cf6" // Purple color
                        />

                        {/* Bar Chart */}
                        <AnalyticsChart
                            title="Data Refinement Volume"
                            data={MOCK_DATA.dataRefinement}
                            type="bar"
                            dataKey1="value"
                            color2="#06b6d4" // Cyan color
                        />
                    </div>

                </main>
            </div>
        </div>
    );
}
