export const MOCK_DATA = {
    kpi: {
        totalRevenue: 124500, // in USD
        activeUsers: 4500,
        optimizationScore: 87, // Percentage
        processedDataGB: 1250,
    },
    workflowData: [
        { month: "Jan", cost: 5000, efficiency: 60 },
        { month: "Feb", cost: 4800, efficiency: 65 },
        { month: "Mar", cost: 4500, efficiency: 72 },
        { month: "Apr", cost: 4200, efficiency: 78 },
        { month: "May", cost: 3800, efficiency: 85 },
        { month: "Jun", cost: 3500, efficiency: 92 },
    ],
    dataRefinement: [
        { name: "Unstructured", value: 4000 },
        { name: "Structured", value: 2400 },
        { name: "Enriched", value: 2400 },
    ],
};
