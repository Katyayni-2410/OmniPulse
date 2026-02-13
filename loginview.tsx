"use client";
// Required because we are using React state (useState)
// and animations (framer-motion)

import { useState } from "react";
import { motion } from "framer-motion";

// Icons used in the login form
import { ArrowRight, User, Building2, Mail } from "lucide-react";


// ================= Props Interface =================
interface LoginViewProps {
    onNext: (userData: {
        name: string;
        email: string;
        businessType: string;
    }) => void;
    onBack: () => void;
}


// ================= Login Component =================
export function LoginView({ onNext, onBack }: LoginViewProps) {

    // ---------------- Form States ----------------
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [businessType, setBusinessType] = useState("");
    const [error, setError] = useState("");


    // ================= Submit Handler =================
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!name || !email || !businessType) {
            setError("Please fill in all fields.");
            return;
        }

        // Clear error and pass data to parent component
        setError("");

        onNext({ name, email, businessType });
    };


    return (
        <div className="flex min-h-screen items-center justify-center bg-background text-white p-4">

            {/* Animated Card Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-xl shadow-2xl"
            >

                {/* ================= Header ================= */}
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Login Portal
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Enter your details to access OmniPulse.
                    </p>
                </div>


                {/* ================= Login Form ================= */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-400 text-sm text-center">
                            {error}
                        </p>
                    )}


                    {/* -------- Full Name -------- */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground ml-1">
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-white placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>


                    {/* -------- Email -------- */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground ml-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-white placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>


                    {/* -------- Business Type -------- */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground ml-1">
                            Business Type
                        </label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <select
                                value={businessType}
                                onChange={(e) => setBusinessType(e.target.value)}
                                className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none transition-all"
                            >
                                <option value="" disabled className="bg-slate-900">
                                    Select Business Type
                                </option>
                                <option value="Retail" className="bg-slate-900">
                                    Retail
                                </option>
                                <option value="Logistics" className="bg-slate-900">
                                    Logistics
                                </option>
                                <option value="E-commerce" className="bg-slate-900">
                                    E-commerce
                                </option>
                                <option value="Manufacturing" className="bg-slate-900">
                                    Manufacturing
                                </option>
                            </select>
                        </div>
                    </div>


                    {/* ================= Action Buttons ================= */}
                    <div className="pt-4 flex gap-3">

                        {/* Back Button */}
                        <button
                            type="button"
                            onClick={onBack}
                            className="flex-1 rounded-lg border border-white/10 bg-white/5 py-3 font-semibold text-white hover:bg-white/10 transition-all"
                        >
                            Back
                        </button>

                        {/* Next Button */}
                        <button
                            type="submit"
                            className="flex-[2] flex items-center justify-center gap-2 rounded-lg bg-primary py-3 font-bold text-white hover:bg-primary/90 transition-all hover:scale-[1.02]"
                        >
                            Next Step
                            <ArrowRight size={18} />
                        </button>

                    </div>

                </form>
            </motion.div>
        </div>
    );
}
