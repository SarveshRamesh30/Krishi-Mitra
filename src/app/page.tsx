import React from "react";
import Navbar from "@/components/layout/Navbar";
import LandingHero from "@/components/landing/LandingHero";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#070c09]">
      <Navbar />
      <main className="flex-1">
        <LandingHero />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-emerald-950/60 bg-[#050906] py-8 text-center text-xs text-emerald-400/60">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Krishi Mitra (விவசாயத் தோழன்). Built with Anthropic Multi-Agent Architecture for Tamil Nadu Farmers.</p>
          <div className="flex items-center gap-4 text-emerald-400/80">
            <span>TNAU Agronomic KB</span>
            <span>&bull;</span>
            <span>APMC Mandi Real-Time Series</span>
            <span>&bull;</span>
            <span>Direct DBT Welfare</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
