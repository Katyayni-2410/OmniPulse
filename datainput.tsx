"use client";
// Required because we are using React state + animations

import { useState } from "react";
import { motion } from "framer-motion";

// Icons used in the form UI
import {
    ArrowRight,
    Calendar,
    DollarSign,
    MapPin,
    Store,
    Plus,
    Trash2,
    Package
} from "lucide-react";

import { Currency, CURRENCIES } from "../utils";


// ================= Product Interface =================
interface Product {
    type: string;
    costPrice: string;
    sellingPrice: string;
    warehouseCost: string;
}


// ================= Props Interface =================
interface DataInputViewProps {
    onAnalyze: (data: {
        startDate: string;
        endDate: string;
        revenue: string;
        storeId: string;
        region: string;
        products: Product[];
        inputCurrency: Currency;
    }) => void;
    onBack: () => void;
}


// ================= Data Input Component =================
export function DataInputView({ onAnalyze, onBack }: DataInputViewProps) {

    // ---------------- Form States ----------------
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [revenue, setRevenue] = useState("");
    const [storeId, setStoreId] = useState("");
    const [region, setRegion] = useState("");
    const [inputCurrency, setInputCurrency] = useState<Currency>("USD");

    // Dynamic product list
    const [products, setProducts] = useState<Product[]>([
        { type: "", costPrice: "", sellingPrice: "", warehouseCost: "" }
    ]);

    const [error, setError] = useState("");


    // ================= Add Product =================
    const addProduct = () => {
        setProducts([
            ...products,
            { type: "", costPrice: "", sellingPrice: "", warehouseCost: "" }
        ]);
    };


    // ================= Remove Product =================
    const removeProduct = (index: number) => {
        if (products.length > 1) {
            setProducts(products.filter((_, i) => i !== index));
        }
    };


    // ================= Update Product Field =================
    const updateProduct = (
        index: number,
        field: keyof Product,
        value: string
    ) => {
        const newProducts = [...products];
        newProducts[index][field] = value;
        setProducts(newProducts);
    };


    // ================= Form Submit Handler =================
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!startDate || !endDate || !revenue || !storeId || !region) {
            setError("Please fill in all main fields.");
            return;
        }

        // Validate each product
        for (const p of products) {
            if (!p.type || !p.costPrice || !p.sellingPrice || !p.warehouseCost) {
                setError("Please fill in all product details.");
                return;
            }
        }

        // Clear error and send data to parent
        setError("");

        onAnalyze({
            startDate,
            endDate,
            revenue,
            storeId,
            region,
            products,
            inputCurrency
        });
    };


    return (
        <div className="flex min-h-screen items-center justify-center bg-background text-white p-6">

            {/* Animated Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl rounded-2xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-xl shadow-2xl max-h-[90vh] overflow-y-auto"
            >

                {/* ================= Header ================= */}
                <div className="mb-8 border-b border-white/10 pb-4">
                    <h2 className="text-2xl font-bold text-white">
                        Business Data Input
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Provide your operational data for AI analysis.
                    </p>
                </div>


                {/* ================= Form ================= */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded">
                            {error}
                        </p>
                    )}


                    {/* ================= General Info Grid ================= */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Currency Selector */}
                        <div className="space-y-2">
                            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground ml-1">
                                Input Currency
                            </label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <select
                                    value={inputCurrency}
                                    onChange={(e) =>
                                        setInputCurrency(e.target.value as Currency)
                                    }
                                    className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 py-2 text-white focus:border-primary focus:outline-none appearance-none"
                                >
                                    {CURRENCIES.map(c => (
                                        <option
                                            key={c}
                                            value={c}
                                            className="bg-slate-900"
                                        >
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Start Date */}
                        <div className="space-y-2">
                            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground ml-1">
                                Start Date
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 py-2 text-white focus:border-primary focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* End Date */}
                        {/* (Similar pattern as Start Date) */}

                        {/* Revenue Input */}
                        {/* Numeric input for total revenue */}

                        {/* Store ID */}
                        {/* Text input for store identifier */}

                        {/* Region */}
                        {/* Text input for geographical region */}

                    </div>


                    {/* ================= Products Section ================= */}
                    <div className="space-y-4 pt-4 border-t border-white/10">

                        {/* Section Header */}
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Package size={18} />
                                Product Inventory
                            </h3>

                            <button
                                type="button"
                                onClick={addProduct}
                                className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                            >
                                <Plus size={14} /> Add Product
                            </button>
                        </div>

                        {/* Product List */}
                        <div className="space-y-3">
                            {products.map((product, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4 rounded-xl bg-white/5 border border-white/5 relative group"
                                >

                                    {/* Product Fields */}
                                    {/* Type, Cost Price, Selling Price, Warehouse Cost */}

                                    {/* Remove Button */}
                                    {products.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeProduct(index)}
                                            className="text-red-400 hover:text-red-300 p-1"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* ================= Action Buttons ================= */}
                    <div className="pt-6 flex gap-4 border-t border-white/10 mt-6">

                        {/* Back Button */}
                        <button
                            type="button"
                            onClick={onBack}
                            className="flex-none rounded-lg border border-white/10 bg-white/5 py-3 px-6 font-semibold text-white hover:bg-white/10 transition-all"
                        >
                            Back
                        </button>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary py-3 font-bold text-white shadow-lg hover:shadow-primary/25 transition-all hover:scale-[1.01]"
                        >
                            Analyze Data & Generate Dashboard
                            <ArrowRight size={18} />
                        </button>

                    </div>

                </form>
            </motion.div>
        </div>
    );
}
