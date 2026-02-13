"use client";

import { motion } from "framer-motion";
import { ArrowRight, Boxes, Zap, ShieldCheck } from "lucide-react";
import { cn } from "../utils";

interface LandingViewProps {
    onGetStarted: () => void;
}

export function LandingView({ onGetStarted }: LandingViewProps) {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background text-white selection:bg-primary selection:text-white">
            {/* Abstract Background Emitter */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[128px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[128px] animate-pulse delay-700" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >

                </motion.div>

                <motion.h1
                    className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl mb-6 leading-tight"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    From <span className="text-muted-foreground line-through decoration-destructive decoration-4 opacity-50">Chaos</span> to{" "}
                    <span className="text-chaos-to-clarity bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-secondary">
                        Clarity
                    </span>
                </motion.h1>

                <motion.p
                    className="mx-auto mt-4 max-w-2xl text-xl text-muted-foreground sm:mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    Transform unstructured logistical nightmares into actionable business intelligence.
                    Real-time insights, powered by advanced AI algorithms.
                </motion.p>

                <motion.div
                    className="mt-10 flex items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                >
                    <button
                        onClick={onGetStarted}
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-base font-bold text-slate-900 transition-all hover:bg-slate-200 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                    >
                        Get Started
                        <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-slate-300/50 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
                    </button>


                </motion.div>

                {/* Feature Cards Showcase */}
                <motion.div
                    className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-5xl"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                >
                    {[
                        { icon: Boxes, title: "Data Integration", desc: "Seamlessly connect disparate data sources." },
                        { icon: Zap, title: "Real-time Analytics", desc: "Process millions of events per second." },
                        { icon: ShieldCheck, title: "Enterprise Security", desc: "Bank-grade encryption for your data." }
                    ].map((feature, idx) => (
                        <div key={idx} className="group rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10 hover:-translate-y-1">
                            <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 text-primary group-hover:text-secondary transition-colors">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{feature.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
