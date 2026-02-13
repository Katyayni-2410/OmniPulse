// Import Metadata type from Next.js (used to define page title & description)
import type { Metadata } from "next";

// Import Google Font (Inter) from Next.js font optimization
import { Inter } from "next/font/google";

// Import global CSS file (applies styles to entire app)
import "./globals.css";

// Initialize the Inter font with latin subset
// This helps in performance optimization (only loads required characters)
const inter = Inter({ subsets: ["latin"] });

// Metadata object used by Next.js
// This sets the default title and description for your website
export const metadata: Metadata = {
  title: "OmniPulse | Chaos to Clarity", // Browser tab title
  description: "Advanced Logistics Intelligence Platform", // SEO description
};

// RootLayout component
// This wraps all pages of your application
// Every page will be rendered inside this layout
export default function RootLayout({
  children, // 'children' represents the content of individual pages
}: Readonly<{
  children: React.ReactNode; // ReactNode means any valid React element
}>) {
  return (
    // Main HTML structure of the app
    <html lang="en">
      <body 
        // Apply Inter font + background color + text color + smoother font rendering
        className={`${inter.className} bg-background text-foreground antialiased`}
      >
        {/* This renders the page-specific content inside layout */}
        {children}
      </body>
    </html>
  );
}
