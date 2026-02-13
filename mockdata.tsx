// ================= Mock Data Object =================
// Used as fallback data when no real API/business data is available
// Helps in UI testing, development, and demo presentations

export const MOCK_DATA = {

    // ================= KPI Section =================
    // High-level dashboard metrics
    kpi: {
        totalRevenue: 124500,      // Total revenue (Base currency: USD)
        activeUsers: 4500,         // Number of active users
        optimizationScore: 87,     // System optimization score (%)
        processedDataGB: 1250,     // Data processed in GB
    },


    // ================= Workflow Data =================
    // Represents operational efficiency vs cost over months
    workflowData: [
        { month: "Jan", cost: 5000, efficiency: 60 },
        { month: "Feb", cost: 4800, efficiency: 65 },
        { month: "Mar", cost: 4500, efficiency: 72 },
        { month: "Apr", cost: 4200, efficiency: 78 },
        { month: "May", cost: 3800, efficiency: 85 },
        { month: "Jun", cost: 3500, efficiency: 92 },
    ],


    // ================= Data Refinement Breakdown =================
    // Used for pie charts or data distribution visualizations
    dataRefinement: [
        { name: "Unstructured", value: 4000 },
        { name: "Structured", value: 2400 },
        { name: "Enriched", value: 2400 },
    ],


    // ================= Monthly Financial Analytics =================
    // Core dataset for analytics charts
    monthlyAnalytics: [

        // Format:
        // month → Month name
        // revenue → Total revenue
        // cost → Total cost
        // profit → Revenue - Cost
        // growth → Month-over-month growth %
        // margin → Profit margin %

        { month: 'Jan', revenue: 120000, cost: 85000, profit: 35000, growth: 2.5,  margin: 29 },
        { month: 'Feb', revenue: 135000, cost: 90000, profit: 45000, growth: 12.5, margin: 33 },
        { month: 'Mar', revenue: 128000, cost: 92000, profit: 36000, growth: -5.2, margin: 28 },
        { month: 'Apr', revenue: 145000, cost: 95000, profit: 50000, growth: 13.3, margin: 34 },
        { month: 'May', revenue: 155000, cost: 98000, profit: 57000, growth: 6.9,  margin: 37 },
        { month: 'Jun', revenue: 160000, cost: 102000, profit: 58000, growth: 3.2,  margin: 36 },
        { month: 'Jul', revenue: 175000, cost: 105000, profit: 70000, growth: 9.4,  margin: 40 },
        { month: 'Aug', revenue: 170000, cost: 108000, profit: 62000, growth: -2.9, margin: 36 },
        { month: 'Sep', revenue: 185000, cost: 110000, profit: 75000, growth: 8.8,  margin: 41 },
        { month: 'Oct', revenue: 195000, cost: 115000, profit: 80000, growth: 5.4,  margin: 41 },
        { month: 'Nov', revenue: 210000, cost: 120000, profit: 90000, growth: 7.7,  margin: 43 },
        { month: 'Dec', revenue: 240000, cost: 130000, profit: 110000, growth: 14.3, margin: 46 },
    ],
};
