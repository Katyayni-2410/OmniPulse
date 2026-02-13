"use client"; 
// Required because we are using useState and useEffect (client-side logic)

import { useEffect, useState } from "react";

// For smooth entry animations
import { motion } from "framer-motion";

// Utility function to fetch market news data
import { fetchMarketNews, MarketNewsItem } from "../utils";

// Icons for UI feedback
import { Loader2, TrendingUp, TrendingDown, Minus, Clock, Tag } from "lucide-react";


// Market Intelligence Widget Component
export function MarketTrendsWidget() {

    // State to store fetched news
    const [news, setNews] = useState<MarketNewsItem[]>([]);

    // Loading state for async fetch
    const [loading, setLoading] = useState(true);


    // ================= Fetch News On Mount =================
    useEffect(() => {

        const loadNews = async () => {
            const data = await fetchMarketNews(); // Fetch data from API/mock
            setNews(data);                        // Store news
            setLoading(false);                    // Stop loading spinner
        };

        loadNews();

    }, []); // Empty dependency array → runs once on component mount



    // ================= Loading UI =================
    if (loading) {
        return (
            <div className="flex h-[300px] items-center justify-center rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm">
                
                {/* Spinner */}
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                
                <span className="ml-3 text-sm text-muted-foreground">
                    Fetching latest market intel...
                </span>
            </div>
        );
    }



    // ================= Main Widget UI =================
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}  // Animation start
            animate={{ opacity: 1, y: 0 }}   // Animation end
            className="rounded-xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm"
        >

            {/* Header Section */}
            <div className="mb-6 flex items-center justify-between">
                
                <div>
                    <h3 className="text-lg font-semibold text-white">
                        Market Intelligence Feed
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Live updates across key sectors
                    </p>
                </div>

                {/* LIVE Indicator */}
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-mono text-green-400">LIVE</span>
                </div>
            </div>



            {/* ================= News Feed ================= */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">

                {news.map((item, index) => (

                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }} // Stagger animation
                        className="group relative overflow-hidden rounded-lg border border-white/5 bg-white/5 p-4 transition-all hover:bg-white/10 hover:border-white/10 hover:shadow-lg"
                    >

                        {/* Top Row: Industry + Time + Sentiment */}
                        <div className="flex justify-between items-start mb-2">

                            <div className="flex items-center gap-2">

                                {/* Industry Tag with Dynamic Color */}
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                                    ${item.industry === 'Tech' ? 'bg-blue-500/20 text-blue-400' :
                                      item.industry === 'Finance' ? 'bg-emerald-500/20 text-emerald-400' :
                                      item.industry === 'Health' ? 'bg-rose-500/20 text-rose-400' :
                                      item.industry === 'Retail' ? 'bg-amber-500/20 text-amber-400' :
                                      'bg-purple-500/20 text-purple-400'}
                                `}>
                                    {item.industry}
                                </span>

                                {/* Timestamp */}
                                <span className="flex items-center text-[10px] text-muted-foreground gap-1">
                                    <Clock size={10} />
                                    {item.timestamp}
                                </span>
                            </div>


                            {/* Sentiment Indicator */}
                            {item.sentiment === 'positive' && 
                                <TrendingUp size={16} className="text-emerald-500" />
                            }
                            {item.sentiment === 'negative' && 
                                <TrendingDown size={16} className="text-red-500" />
                            }
                            {item.sentiment === 'neutral' && 
                                <Minus size={16} className="text-slate-500" />
                            }
                        </div>


                        {/* News Title */}
                        <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-primary transition-colors">
                            {item.title}
                        </h4>

                        {/* News Summary */}
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            {item.summary}
                        </p>


                        {/* Left Accent Bar Based on Sentiment */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 
                            ${item.sentiment === 'positive' ? 'bg-emerald-500' :
                              item.sentiment === 'negative' ? 'bg-red-500' :
                              'bg-slate-500'} 
                            opacity-0 group-hover:opacity-100 transition-opacity`}
                        />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
