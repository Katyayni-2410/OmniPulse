"use client";
// This tells Next.js that this component runs in the browser.
// It allows animations, button clicks, and interactivity.

import { motion } from "framer-motion";
// motion is used for animations (fade, slide, scale, etc.)

import { ArrowRight, Boxes, Zap, ShieldCheck } from "lucide-react";
// These are icon components from lucide-react library.

import { cn } from "../utils";
// cn is usually a helper function used to combine class names.
// (In this file it is imported but not used — can be removed.)


// This defines what props this component expects.
interface LandingViewProps {
    onGetStarted: () => void; 
    // Function that runs when user clicks "Get Started"
}


// Main Landing Page Component
export function LandingView({ onGetStarted }: LandingViewProps) {

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background text-white selection:bg-primary selection:text-white">
            {/* 
                Main container:
                - min-h-screen → full screen height
                - overflow-hidden → prevents scrolling overflow
                - bg-background → background color
                - selection:bg-primary → text selection color
            */}

            {/* Background Glow Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[128px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[128px] animate-pulse delay-700" />
            </div>

            {/* Main Content Section */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center">

                {/* Small Animated Badge (v2.0 Available) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} // start invisible & lower
                    animate={{ opacity: 1, y: 0 }} // fade in & move up
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
                        <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
                        <span className="text-xs font-medium text-secondary tracking-wide uppercase">
                            v2.0 Now Available
                        </span>
                    </div>
                </motion.div>


                {/* Main Heading */}
                <motion.h1
                    className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl mb-6 leading-tight"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    From 
                    <span className="text-muted-foreground line-through decoration-destructive decoration-4 opacity-50">
                        Chaos
                    </span>
                    {" "}
                    to{" "}
                    <span className="text-chaos-to-clarity bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-secondary">
                        Clarity
                    </span>
                </motion.h1>

                {/* Subheading / Description */}
                <motion.p
                    className="mx-auto mt-4 max-w-2xl text-xl text-muted-foreground sm:mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    Transform unstructured logistical nightmares into actionable business intelligence.
                    Real-time insights, powered by advanced AI algorithms.
                </motion.p>


                {/* Buttons Section */}
                <motion.div
                    className="mt-10 flex items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                >

                    {/* Get Started Button */}
                    <button
                        onClick={onGetStarted} 
                        // When clicked → calls function from parent
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-base font-bold text-slate-900 transition-all hover:bg-slate-200 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                    >
                        Get Started
                        <ArrowRight 
                            className="transition-transform group-hover:translate-x-1" 
                            size={20} 
                        />
                        {/* Arrow moves slightly right on hover */}

                        {/* Shimmer hover animation layer */}
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-slate-300/50 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
                    </button>

                    {/* Secondary Button */}
                    <button className="px-8 py-4 text-sm font-semibold text-white transition-all hover:text-primary">
                        View Documentation
                    </button>
                </motion.div>


                {/* Feature Cards Section */}
                <motion.div
                    className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-5xl"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                >
                    {/* Array of feature objects */}
                    {[
                        { icon: Boxes, title: "Data Integration", desc: "Seamlessly connect disparate data sources." },
                        { icon: Zap, title: "Real-time Analytics", desc: "Process millions of events per second." },
                        { icon: ShieldCheck, title: "Enterprise Security", desc: "Bank-grade encryption for your data." }
                    ].map((feature, idx) => (
                        // Looping through features using map()
                        <div 
                            key={idx} 
                            className="group rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10 hover:-translate-y-1"
                        >
                            <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 text-primary group-hover:text-secondary transition-colors">
                                <feature.icon size={24} />
                                {/* Dynamic icon rendering */}
                            </div>

                            <h3 className="text-lg font-semibold text-white">
                                {feature.title}
                            </h3>

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
