// ================= Utility Imports =================

// clsx → Handles conditional classNames
import { type ClassValue, clsx } from "clsx";

// twMerge → Merges Tailwind classes properly (avoids conflicts)
import { twMerge } from "tailwind-merge";


// ================= ClassName Utility =================
// Combines clsx + tailwind-merge
// Used throughout the app for clean conditional styling
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


// ================= Currency Types =================

// Supported currency types
export type Currency = "USD" | "EUR" | "GBP" | "INR";

// List of currencies (used in dropdowns)
export const CURRENCIES: Currency[] = ["USD", "EUR", "GBP", "INR"];


// ================= Exchange Rates =================
// Base currency = USD
// These are static demo values (not real-time API rates)
const EXCHANGE_RATES: Record<Currency, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.12,
};


// ================= Currency Symbols =================
export const CURRENCY_SYMBOLS: Record<Currency, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
};


// ================= Format Currency Function =================
// Converts USD base value → selected currency → formatted string
export function formatCurrency(value: number, currency: Currency): string {

    const rate = EXCHANGE_RATES[currency];

    // Convert value using exchange rate
    const convertedValue = value * rate;

    // Format using Intl API
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 0,
    }).format(convertedValue);
}


// ================= Currency Conversion Engine =================
// Converts between any two currencies
export function convertCurrencyValue(
    amount: number,
    from: Currency,
    to: Currency
): number {

    // Step 1: Convert source amount → USD (base)
    const amountInUSD = amount / EXCHANGE_RATES[from];

    // Step 2: Convert USD → target currency
    return amountInUSD * EXCHANGE_RATES[to];
}


// ================= Market Trend Interface =================
// Used for sector growth charts
export interface MarketTrend {
    industry: string;
    growth: number;  // % growth
    volume: number;  // Trade volume
}


// ================= Mock Market Trends Fetch =================
// Simulates API call with 1.5s delay
export const fetchMarketTrends = async (): Promise<MarketTrend[]> => {

    // Artificial delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return [
        { industry: "Tech", growth: 12.5, volume: 8500 },
        { industry: "Finance", growth: 8.2, volume: 6200 },
        { industry: "Health", growth: 15.8, volume: 7100 },
        { industry: "Retail", growth: -2.4, volume: 4300 },
        { industry: "Energy", growth: 5.6, volume: 5900 },
    ];
};


// ================= Market News Interface =================
export interface MarketNewsItem {
    id: string;
    title: string;
    summary: string;
    industry: "Tech" | "Finance" | "Health" | "Retail" | "Energy";
    sentiment: "positive" | "negative" | "neutral";
    timestamp: string;
}


// ================= Mock Market News Fetch =================
// Simulates real-time news API call
export const fetchMarketNews = async (): Promise<MarketNewsItem[]> => {

    // Artificial delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return [
        {
            id: "1",
            title: "AI Breakthrough in Logistics",
            summary: "New quantum algorithms reduce shipping times by 40%.",
            industry: "Tech",
            sentiment: "positive",
            timestamp: "2 mins ago"
        },
        {
            id: "2",
            title: "Global Markets Rally",
            summary: "Tech stocks surge as inflation data comes in lower than expected.",
            industry: "Finance",
            sentiment: "positive",
            timestamp: "15 mins ago"
        },
        {
            id: "3",
            title: "Retail Supply Chain Disruptions",
            summary: "Port strikes in major hubs cause delays for holiday season stock.",
            industry: "Retail",
            sentiment: "negative",
            timestamp: "1 hour ago"
        },
        {
            id: "4",
            title: "Green Energy Adoption Peaks",
            summary: "Solar and wind now account for 30% of global grid power.",
            industry: "Energy",
            sentiment: "positive",
            timestamp: "3 hours ago"
        },
        {
            id: "5",
            title: "Healthcare Data Privacy Concerns",
            summary: "New regulations proposed for handling patient AI data.",
            industry: "Health",
            sentiment: "neutral",
            timestamp: "5 hours ago"
        }
    ];
};
