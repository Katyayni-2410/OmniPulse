import type { Metadata } from "next";
// Metadata type is used to define SEO-related information (title, description, etc.)

import { Inter } from "next/font/google";
// Importing Inter font from Google Fonts using Next.js built-in optimization.

import "./globals.css";
// Importing global CSS file (applies to entire app).


// Load Inter font
const inter = Inter({ subsets: ["latin"] });
// This downloads and optimizes the font automatically.
// subsets: ["latin"] means only Latin characters are loaded (faster).


/* =============================
   Metadata (SEO Configuration)
   ============================= */

export const metadata: Metadata = {
  title: "Omni Pulse | Chaos to Clarity",
  // This appears in browser tab title

  description: "Advanced Logistics Intelligence Platform",
  // This appears in search engine preview (Google)
};


/* =============================
   Root Layout Component
   ============================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // children represents all pages inside this layout.

  return (
    <html lang="en">
      {/* lang="en" helps with accessibility and SEO */}

      <body
        className={`
          ${inter.className} 
          bg-background 
          text-foreground 
          antialiased
        `}
      >
        {/* 
          inter.className → applies Inter font globally
          bg-background → background color from Tailwind theme
          text-foreground → default text color
          antialiased → smoother font rendering
        */}

        {children}
        {/* This renders the actual page content */}
        
      </body>
    </html>
  );
}
