// React hook for state management
import { useState } from "react";

// Animation library for smooth UI transitions
import { motion } from "framer-motion";

// Icons used inside KPI cards
import { Users, DollarSign, TrendingUp, HardDrive } from "lucide-react";

// Layout Components
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { StatCard } from "./StatCard";

// Dashboard Widgets
import { AIMonthlyInsights } from "./AIMonthlyInsights";
import { MarketTrendsWidget } from "./MarketTrendsWidget";

// Chart Components
import { RevenueTrendChart } from "./charts/RevenueTrendChart";
import { CostProfitComparisonChart } from "./charts/CostProfitComparisonChart";
import { RevenueGrowthComboChart } from "./charts/RevenueGrowthComboChart";
import { ProfitMarginChart } from "./charts/ProfitMarginChart";

// Utility functions for currency formatting & conversion
import { Currency, formatCurrency, convertCurrencyValue } from "../utils";

// Mock data fallback
import { MOCK_DATA } from "../mockData";


// Props Interface for Dashboard
interface DashboardViewProps {
    currency: Currency; // Current selected currency
    onCurrencyChange: (c: Currency) => void; // Function to change currency
    onLogout: () => void; // Logout handler
    userData?: { name: string; email: string; businessType: string }; // Logged-in user info
    businessData?: { 
        revenue: string; 
        products: any[]; 
        inputCurrency: Currency; 
        startDate?: string; 
        endDate?: string 
    };
}


// Main Dashboard Component
export function DashboardView({ 
    currency, 
    onCurrencyChange, 
    onLogout, 
    userData, 
    businessData 
}: DashboardViewProps) {

    // Track currently selected sidebar item
    const [activeSidebarItem, setActiveSidebarItem] = useState("dashboard");


    // ==============================
    // Compute Key Metrics (Revenue)
    // ==============================

    // Default revenue from mock data
    let revenueValue = MOCK_DATA.kpi.totalRevenue;

    if (businessData?.revenue) {

        // If real business data exists:
        // Convert from input currency → selected display currency
        revenueValue = convertCurrencyValue(
            parseFloat(businessData.revenue),
            businessData.inputCurrency,
            currency
        );

    } else {

        // If no real data → convert mock USD revenue to selected currency
        revenueValue = convertCurrencyValue(
            MOCK_DATA.kpi.totalRevenue, 
            'USD', 
            currency
        );
    }


    // Format revenue into proper currency format
    const totalRevenue = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 0,
    }).format(revenueValue);


    // ======================================
    // Function to Render Content Dynamically
    // ======================================
    const renderContent = () => {

        switch (activeSidebarItem) {

            // ---------------- Dashboard Overview ----------------
            case "dashboard":
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}  // Animation start
                        animate={{ opacity: 1, y: 0 }}   // Animation end
                    >
                        {/* Page Title */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-white tracking-tight">
                                Executive Overview
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                Real-time insights into your logistics performance.
                            </p>
                        </div>

                        {/* KPI Grid Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                            {/* Revenue KPI */}
                            <StatCard
                                title="Total Revenue"
                                value={totalRevenue}
                                icon={DollarSign}
                                trend="+12.5%"
                                trendUp={true}
                            />

                            {/* Active Users KPI */}
                            <StatCard
                                title="Active Users"
                                value={MOCK_DATA.kpi.activeUsers.toLocaleString()}
                                icon={Users}
                                trend="+4.2%"
                                trendUp={true}
                            />

                            {/* Optimization Score KPI */}
                            <StatCard
                                title="Optimization Score"
                                value={`${MOCK_DATA.kpi.optimizationScore}%`}
                                icon={TrendingUp}
                                trend="+2.1%"
                                trendUp={true}
                            />

                            {/* Data Processed KPI */}
                            <StatCard
                                title="Data Processed"
                                value={`${MOCK_DATA.kpi.processedDataGB} GB`}
                                icon={HardDrive}
                            />
                        </div>

                        {/* AI Insights & Market Trends */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            <AIMonthlyInsights className="h-full" />
                            <MarketTrendsWidget />
                        </div>
                    </motion.div>
                );


            // ---------------- Analytics Pages ----------------
            case "analytics-revenue":
                return (
                    <RevenueTrendChart 
                        currency={currency} 
                        startDate={businessData?.startDate} 
                        endDate={businessData?.endDate} 
                    />
                );

            case "analytics-cost-profit":
                return (
                    <CostProfitComparisonChart 
                        currency={currency} 
                        startDate={businessData?.startDate} 
                        endDate={businessData?.endDate} 
                    />
                );

            case "analytics-combo":
                return (
                    <RevenueGrowthComboChart 
                        currency={currency} 
                        startDate={businessData?.startDate} 
                        endDate={businessData?.endDate} 
                    />
                );

            case "analytics-margin":
                return (
                    <ProfitMarginChart 
                        currency={currency} 
                        startDate={businessData?.startDate} 
                        endDate={businessData?.endDate} 
                    />
                );

            // ---------------- Default View ----------------
            default:
                return (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        Select an item from the sidebar
                    </div>
                );
        }
    };


    // ======================
    // Main Layout Structure
    // ======================
    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">

            {/* Sidebar (Hidden on mobile) */}
            <Sidebar
                className="hidden md:flex"
                activeItem={activeSidebarItem}
                onNavigate={setActiveSidebarItem}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">

                {/* Background Ambient Glow Effects */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                    <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
                </div>

                {/* Top Navigation Bar */}
                <TopBar
                    currentCurrency={currency}
                    onCurrencyChange={onCurrencyChange}
                    onLogout={onLogout}
                    user={userData}
                />

                {/* Dynamic Content Area */}
                <main className="flex-1 overflow-y-auto p-8 z-10">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}
