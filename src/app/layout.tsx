import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#070c09",
};

export const metadata: Metadata = {
  title: "Krishi Mitra (விவசாயத் தோழன்) — Autonomous Multi-Agent AI for Tamil Nadu Farmers",
  description: "Production-grade multi-agent AI system orchestrating real-time crop disease diagnosis, government scheme eligibility calculation, and APMC mandi market intelligence for Tamil Nadu agriculture.",
  keywords: ["Krishi Mitra", "Tamil Nadu Farmers", "Multi-Agent AI", "TNAU Disease Diagnosis", "PM-KISAN", "PMFBY", "Mandi Prices", "AgriTech AI"],
  authors: [{ name: "Krishi Mitra Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#070c09] text-[#f1f5f3] antialiased selection:bg-emerald-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
