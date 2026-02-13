import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export type Currency = "USD" | "EUR" | "GBP" | "INR";

export const CURRENCIES: Currency[] = ["USD", "EUR", "GBP", "INR"];

const EXCHANGE_RATES: Record<Currency, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.12,
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
};

export function formatCurrency(value: number, currency: Currency): string {
    const rate = EXCHANGE_RATES[currency];
    const convertedValue = value * rate;

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 0,
    }).format(convertedValue);
}

export interface MarketTrend {
    industry: string;
    growth: number;
    volume: number;
}

export const fetchMarketTrends = async (): Promise<MarketTrend[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return [
        { industry: "Tech", growth: 12.5, volume: 8500 },
        { industry: "Finance", growth: 8.2, volume: 6200 },
        { industry: "Health", growth: 15.8, volume: 7100 },
        { industry: "Retail", growth: -2.4, volume: 4300 },
        { industry: "Energy", growth: 5.6, volume: 5900 },
    ];
};

export interface MarketNewsItem {
    id: string;
    title: string;
    summary: string;
    industry: "Tech" | "Finance" | "Health" | "Retail" | "Energy";
    sentiment: "positive" | "negative" | "neutral";
    timestamp: string;
}

export const fetchMarketNews = async (): Promise<MarketNewsItem[]> => {
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
