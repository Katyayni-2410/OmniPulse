"use client"; 
// This tells Next.js that this component should run on the client side (browser).
// It allows us to use React hooks like useState.

import { useState } from "react";
// useState is a React Hook that lets us create and manage state (data that can change).

import { LandingView } from "./components/LandingView";
// Importing LandingView component from components folder.

import { DashboardView } from "./components/DashboardView";
// Importing DashboardView component from components folder.

import { Currency } from "./utils";
// Importing Currency type from utils file (probably a type like "USD" | "INR" etc).

export default function Home() {
  // This is the main component of this page.
  // In Next.js, this will be rendered as the homepage.

  // activeView stores which screen is currently shown: landing or dashboard.
  // setActiveView is the function used to change it.
  const [activeView, setActiveView] = useState<"landing" | "dashboard">("landing");
  // By default, it starts with "landing".

  // currency stores the selected currency (like USD, INR etc).
  // setCurrency is the function used to change the currency.
  const [currency, setCurrency] = useState<Currency>("USD");
  // Default currency is USD.

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      {/* 
        <main> is the main container of the page.
        className contains Tailwind CSS classes:
        - min-h-screen → makes the height at least full screen
        - bg-background → sets background color
        - text-foreground → sets text color
        - font-sans → sets font style
      */}

      {activeView === "landing" ? (
        // If activeView is "landing", show LandingView component
        <LandingView 
          onGetStarted={() => setActiveView("dashboard")} 
          // When user clicks "Get Started",
          // this function runs and changes activeView to "dashboard"
        />
      ) : (
        // Otherwise, show DashboardView component
        <DashboardView
          currency={currency}
          // Passing current currency as a prop

          onCurrencyChange={setCurrency}
          // Passing function so DashboardView can update currency

          onLogout={() => setActiveView("landing")}
          // When logout is clicked, it switches back to landing page
        />
      )}
    </main>
  );
}
