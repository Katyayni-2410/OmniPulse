import { useState } from "react";
import { Search, Bell, User, LogOut, ChevronDown } from "lucide-react";
import { Currency, CURRENCIES } from "../utils";

interface TopBarProps {
    currentCurrency: Currency;
    onCurrencyChange: (currency: Currency) => void;
    onLogout: () => void;
}

export function TopBar({ currentCurrency, onCurrencyChange, onLogout }: TopBarProps) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);

    return (
        <header className="flex h-16 items-center justify-between border-b border-white/5 bg-slate-900/50 px-8 backdrop-blur-xl z-20">
            <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                    type="text"
                    placeholder="Search analytics, logs, or settings..."
                    className="h-9 w-full rounded-md border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                />
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Currency</label>
                    <select
                        value={currentCurrency}
                        onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                        className="h-8 rounded-md border border-white/10 bg-slate-800 px-3 text-xs font-medium text-white focus:border-primary focus:outline-none"
                    >
                        {CURRENCIES.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </div>

                <button className="relative text-muted-foreground hover:text-white transition-colors">
                    <Bell size={20} />
                    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-secondary animate-pulse" />
                </button>

                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 rounded-full border border-white/5 bg-white/5 pl-2 pr-4 py-1.5 hover:bg-white/10 transition-colors"
                    >
                        <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-tr from-primary to-secondary p-[1px]">
                            <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
                                <User size={16} className="text-white" />
                            </div>
                        </div>
                        <div className="text-left hidden lg:block">
                            <p className="text-xs font-medium text-white leading-none">Alex Morgan</p>
                            <p className="text-[10px] text-muted-foreground leading-none mt-1">ID: OMNI-8821</p>
                        </div>
                        <ChevronDown size={14} className="text-muted-foreground" />
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-white/10 bg-slate-900 p-2 shadow-xl backdrop-blur-xl">
                            <div className="px-3 py-2 border-b border-white/5 mb-2">
                                <p className="text-sm font-medium text-white">Alex Morgan</p>
                                <p className="text-xs text-muted-foreground">alex.m@omnipulse.io</p>
                            </div>

                            <div className="space-y-1">
                                <button
                                    onClick={() => setIsSettingsExpanded(!isSettingsExpanded)}
                                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-white transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <User size={16} />
                                        Profile Settings
                                    </div>
                                    <ChevronDown size={14} className={`transition-transform duration-200 ${isSettingsExpanded ? "rotate-180" : ""}`} />
                                </button>

                                {isSettingsExpanded && (
                                    <div className="ml-2 pl-4 border-l border-white/10 space-y-2 my-2 animate-in slide-in-from-top-2 fade-in duration-200">
                                        <div className="py-1">
                                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Full Name</p>
                                            <p className="text-sm text-white">Alex Morgan</p>
                                        </div>
                                        <div className="py-1">
                                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Email ID</p>
                                            <p className="text-sm text-white">alex.m@omnipulse.io</p>
                                        </div>
                                        <div className="py-1">
                                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Business ID</p>
                                            <p className="text-sm text-white font-mono text-primary">OMNI-8821</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-2 pt-2 border-t border-white/5">
                                <button
                                    onClick={onLogout}
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                                >
                                    <LogOut size={16} />
                                    Log Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
