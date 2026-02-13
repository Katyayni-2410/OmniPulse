"use client"; 
// This tells Next.js that this component runs on the client side
// Required because we are using React hooks like useState

import { useState } from "react";

// Importing different views (pages/sections of your app)
import { LandingView } from "./components/LandingView";
import { DashboardView } from "./components/DashboardView";
import { LoginView } from "./components/LoginView";
import { DataInputView } from "./components/DataInputView";

// Import Currency type (probably a union like "USD" | "INR" etc.)
import { Currency } from "./utils";

export default function Home() {

  // State to control which screen is currently visible
  // Default view is "landing"
  const [activeView, setActiveView] = useState<
    "landing" | "login" | "dataInput" | "dashboard"
  >("landing");

  // State to store selected currency (default USD)
  const [currency, setCurrency] = useState<Currency>("USD");

  // State to store user login details
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    businessType: string;
  } | undefined>(undefined);

  // State to store business-related input data
  const [businessData, setBusinessData] = useState<any>(undefined);


  // Function triggered after LoginView "Next" button
  // Stores user data and moves to Data Input screen
  const handleLoginNext = (data: {
    name: string;
    email: string;
    businessType: string;
  }) => {
    setUserData(data);           // Save user details
    setActiveView("dataInput");  // Switch to data input page
  };


  // Function triggered when business data is analyzed
  // Stores business data and moves to Dashboard
  const handleDataAnalyze = (data: any) => {
    setBusinessData(data);       // Save business analysis data
    setActiveView("dashboard");  // Switch to dashboard
  };


  return (
    // Main wrapper of the app
    <main className="min-h-screen bg-background text-foreground font-sans">

      {/* LANDING PAGE */}
      {activeView === "landing" && (
        <LandingView
          onGetStarted={() => setActiveView("dashboard")} 
          // Directly go to dashboard

          onLogin={() => setActiveView("login")} 
          // Go to login page
        />
      )}

      {/* LOGIN PAGE */}
      {activeView === "login" && (
        <LoginView
          onNext={handleLoginNext} 
          // After login, move to data input

          onBack={() => setActiveView("landing")} 
          // Go back to landing
        />
      )}

      {/* DATA INPUT PAGE */}
      {activeView === "dataInput" && (
        <DataInputView
          onAnalyze={handleDataAnalyze} 
          // After analysis, move to dashboard

          onBack={() => setActiveView("login")} 
          // Go back to login
        />
      )}

      {/* DASHBOARD PAGE */}
      {activeView === "dashboard" && (
        <DashboardView
          currency={currency} 
          // Pass selected currency

          onCurrencyChange={setCurrency} 
          // Allow dashboard to update currency

          onLogout={() => setActiveView("landing")} 
          // Logout returns to landing

          userData={userData} 
          // Pass user info

          businessData={businessData} 
          // Pass analyzed business data
        />
      )}

    </main>
  );
}
