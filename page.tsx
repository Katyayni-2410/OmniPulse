"use client";

import { useState } from "react";
import { LandingView } from "./components/LandingView";
import { DashboardView } from "./components/DashboardView";
import { Currency } from "./utils";

export default function Home() {
  const [activeView, setActiveView] = useState<"landing" | "dashboard">("landing");
  const [currency, setCurrency] = useState<Currency>("USD");

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      {activeView === "landing" ? (
        <LandingView onGetStarted={() => setActiveView("dashboard")} />
      ) : (
        <DashboardView
          currency={currency}
          onCurrencyChange={setCurrency}
          onLogout={() => setActiveView("landing")}
        />
      )}
    </main>
  );
}
