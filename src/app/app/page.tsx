"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import IntakeConsole from "@/components/app/IntakeConsole";
import AgentPipelineGraph from "@/components/app/AgentPipelineGraph";
import ResultsDashboard from "@/components/app/ResultsDashboard";

export default function AppPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#070c09] text-white">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Split View: Left Intake & Right Pipeline Graph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Voice & Text Intake Console (5 cols) */}
          <div className="lg:col-span-5 w-full">
            <IntakeConsole />
          </div>

          {/* Right Column: Live Multi-Agent Execution Graph (7 cols) */}
          <div className="lg:col-span-7 w-full">
            <AgentPipelineGraph />
          </div>
        </div>

        {/* Results Dashboard Section */}
        <div className="w-full">
          <ResultsDashboard />
        </div>
      </main>

      {/* App Footer */}
      <footer className="border-t border-emerald-950/60 bg-[#050906] py-6 text-center text-xs text-emerald-400/60">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>Krishi Mitra — Autonomous Multi-Agent AI System for Tamil Nadu Farmers</p>
          <p className="text-[11px] text-emerald-600">Model: Claude 3.5 Sonnet + Autonomous Local Agronomic Fallback Engine</p>
        </div>
      </footer>
    </div>
  );
}
