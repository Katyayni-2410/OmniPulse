"use client"; 
// Required because we are using animations (framer-motion)
// This component runs on the client side

import { motion } from "framer-motion"; 
// Used for smooth animations

import { ArrowRight, Boxes, Zap, ShieldCheck } from "lucide-react"; 
// Icons for buttons & feature cards

import { cn } from "../utils"; 
// Utility function (usually used for conditional classNames)


// Props Interface
interface LandingViewProps {
    onGetStarted: () => void; // Function when "Get Started" is clicked
    onLogin: () => void;      // Function when "Login Portal" is clicked
}


// Landing Page Component
export function LandingView({ onGetStarted, onLogin }: LandingViewProps) {

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background text-white selection:bg-primary selection:text-white">
            
            {/* ================= Background Glow Effects ================= */}
            <div className="absolute inset-0 z-0">
                {/* Top Glow */}
                <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[128px] animate-pulse" />
                
                {/* Bottom Glow */}
                <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[128px] animate-pulse delay-700" />
            </div>


            {/* ================= Main Content ================= */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center">

                {/* Animated Container (Optional Wrapper) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} // Start state
                    animate={{ opacity: 1, y: 0 }}  // End state
                    transition={{ duration: 0.5 }}  // Animation duration
                    className="mb-8"
                >
                </motion.div>


                {/* ================= Main Heading ================= */}
                <motion.h1
                    className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl mb-6 leading-tight"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    From 
                    <span className="text-muted-foreground line-through decoration-destructive decoration-4 opacity-50">
                        {" "}Chaos
                    </span> 
                    {" "}to{" "}
                    <span className="text-chaos-to-clarity bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-secondary">
                        Clarity
                    </span>
                </motion.h1>


                {/* ================= Subheading ================= */}
                <motion.p
                    className="mx-auto mt-4 max-w-2xl text-xl text-muted-foreground sm:mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    Transform unstructured logistical nightmares into actionable business intelligence.
                    Real-time insights, powered by advanced AI algorithms.
                </motion.p>


                {/* ================= CTA Buttons ================= */}
                <motion.div
                    className="mt-10 flex items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                >
                    
                    {/* Get Started Button */}
                    <button
                        onClick={onGetStarted} // Trigger parent function
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-base font-bold text-slate-900 transition-all hover:bg-slate-200 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                    >
                        Get Started
                        <ArrowRight 
                            className="transition-transform group-hover:translate-x-1" 
                            size={20} 
                        />
                        
                        {/* Shimmer Hover Effect */}
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-slate-300/50 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
                    </button>

                    
                    {/* Login Button */}
                    <button
                        onClick={onLogin} // Trigger login navigation
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105"
                    >
                        Login Portal
                    </button>
                </motion.div>


                {/* ================= Feature Cards Section ================= */}
                <motion.div
                    className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-5xl"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                >

                    {/* Feature List (Mapped Dynamically) */}
                    {[
                        { icon: Boxes, title: "Data Integration", desc: "Seamlessly connect disparate data sources." },
                        { icon: Zap, title: "Real-time Analytics", desc: "Process millions of events per second." },
                        { icon: ShieldCheck, title: "Enterprise Security", desc: "Bank-grade encryption for your data." }
                    ].map((feature, idx) => (

                        <div 
                            key={idx} 
                            className="group rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10 hover:-translate-y-1"
                        >
                            {/* Feature Icon */}
                            <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 text-primary group-hover:text-secondary transition-colors">
                                <feature.icon size={24} />
                            </div>

                            {/* Feature Title */}
                            <h3 className="text-lg font-semibold text-white">
                                {feature.title}
                            </h3>

                            {/* Feature Description */}
                            <p className="mt-2 text-sm text-muted-foreground">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
