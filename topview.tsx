import { useState } from "react";

// Icons for profile & logout section
import { User, LogOut, ChevronDown } from "lucide-react";

// Currency types and supported currency list
import { Currency, CURRENCIES } from "../utils";


// Props Interface
interface TopBarProps {
    currentCurrency: Currency; // Currently selected currency
    onCurrencyChange: (currency: Currency) => void; // Function to change currency
    onLogout: () => void; // Logout handler
    user?: { name: string; email: string; businessType: string }; // Logged-in user info
}


// Top Navigation Bar Component
export function TopBar({ 
    currentCurrency, 
    onCurrencyChange, 
    onLogout, 
    user 
}: TopBarProps) {

    // State to control profile dropdown visibility
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // State to expand/collapse profile settings section
    const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);


    return (
        <header className="flex h-16 items-center justify-between border-b border-white/5 bg-slate-900/50 px-8 backdrop-blur-xl z-20">
            
            {/* Tagline / Branding Section */}
            <div>
                <span className="text-sm font-medium text-muted-foreground italic tracking-wide">
                    From Chaos to Clarity
                </span>
            </div>


            {/* Right Side Controls */}
            <div className="flex items-center gap-6">

                {/* ================= Currency Selector ================= */}
                <div className="flex items-center gap-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Currency
                    </label>

                    <select
                        value={currentCurrency} // Controlled component
                        onChange={(e) => 
                            onCurrencyChange(e.target.value as Currency)
                        }
                        className="h-8 rounded-md border border-white/10 bg-slate-800 px-3 text-xs font-medium text-white focus:border-primary focus:outline-none"
                    >
                        {/* Dynamically render available currencies */}
                        {CURRENCIES.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </div>



                {/* ================= Profile Section ================= */}
                <div className="relative">

                    {/* Profile Button */}
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 rounded-full border border-white/5 bg-white/5 pl-2 pr-4 py-1.5 hover:bg-white/10 transition-colors"
                    >

                        {/* Avatar Circle */}
                        <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-tr from-primary to-secondary p-[1px]">
                            <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
                                <User size={16} className="text-white" />
                            </div>
                        </div>

                        {/* User Info (Hidden on small screens) */}
                        <div className="text-left hidden lg:block">
                            <p className="text-xs font-medium text-white leading-none">
                                {user?.name || "Guest User"}
                            </p>
                            <p className="text-[10px] text-muted-foreground leading-none mt-1">
                                {user?.businessType || "Visitor"}
                            </p>
                        </div>

                        {/* Dropdown Icon */}
                        <ChevronDown size={14} className="text-muted-foreground" />
                    </button>


                    {/* ================= Dropdown Menu ================= */}
                    {isProfileOpen && (
                        <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-white/10 bg-slate-900 p-2 shadow-xl backdrop-blur-xl">

                            {/* User Info Section */}
                            <div className="px-3 py-2 border-b border-white/5 mb-2">
                                <p className="text-sm font-medium text-white">
                                    {user?.name || "Guest User"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {user?.email || "guest@omnipulse.io"}
                                </p>
                            </div>


                            {/* ================= Profile Settings ================= */}
                            <div className="space-y-1">
                                
                                {/* Toggle Profile Settings */}
                                <button
                                    onClick={() => setIsSettingsExpanded(!isSettingsExpanded)}
                                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-white transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <User size={16} />
                                        Profile Settings
                                    </div>

                                    {/* Rotate icon when expanded */}
                                    <ChevronDown
                                        size={14}
                                        className={`transition-transform duration-200 ${
                                            isSettingsExpanded ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>


                                {/* Expanded Settings Content */}
                                {isSettingsExpanded && (
                                    <div className="ml-2 pl-4 border-l border-white/10 space-y-2 my-2 animate-in slide-in-from-top-2 fade-in duration-200">
                                        
                                        {/* Full Name */}
                                        <div className="py-1">
                                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                                Full Name
                                            </p>
                                            <p className="text-sm text-white">
                                                {user?.name || "Guest"}
                                            </p>
                                        </div>

                                        {/* Email */}
                                        <div className="py-1">
                                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                                Email ID
                                            </p>
                                            <p className="text-sm text-white">
                                                {user?.email || "guest@omnipulse.io"}
                                            </p>
                                        </div>

                                        {/* Static Business ID */}
                                        <div className="py-1">
                                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                                Business ID
                                            </p>
                                            <p className="text-sm text-white font-mono text-primary">
                                                OMNI-8821
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>


                            {/* ================= Logout Section ================= */}
                            <div className="mt-2 pt-2 border-t border-white/5">
                                <button
                                    onClick={onLogout} // Trigger logout function
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
