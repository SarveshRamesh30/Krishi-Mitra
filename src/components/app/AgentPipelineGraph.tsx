"use client";

import React from "react";
import { useFarmerStore } from "@/store/useFarmerStore";
import { TRANSLATIONS } from "@/data/translations";
import { 
  Bot, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Zap, 
  ArrowDown, 
  Sparkles, 
  Cpu, 
  FileText, 
  TrendingUp, 
  ShieldCheck, 
  Activity,
  GitFork
} from "lucide-react";

export default function AgentPipelineGraph() {
  const { 
    language, 
    pipelineState, 
    pipelineProgress, 
    isPipelineRunning, 
    agentLogs, 
    orchestratorOutput 
  } = useFarmerStore();

  const t = TRANSLATIONS[language];

  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-emerald-900/60 bg-[#0b130e]/90 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
      {/* Top Header with Timing & Live Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-emerald-900/40">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white">
              {t.agentExecutionGraph}
            </h2>
            <p className="text-[11px] text-emerald-400/70">
              {language === "ta" ? "வரிசை மற்றும் இணை செயலாக்க வரைபடம்" : "Sequential & Parallel Handoff Architecture"}
            </p>
          </div>
        </div>

        {orchestratorOutput?.executionMetrics && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-950/80 border border-emerald-800/50 px-3 py-1 text-xs">
            <Clock className="h-3.5 w-3.5 text-amber-400" />
            <span className="font-semibold text-emerald-300">
              {orchestratorOutput.executionMetrics.totalDurationMs} ms
            </span>
            <span className="text-[10px] text-emerald-400/70">Total Latency</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#080d0a] rounded-full h-1.5 overflow-hidden border border-emerald-900/40">
        <div 
          className="bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-400 h-full transition-all duration-300"
          style={{ width: `${pipelineProgress}%` }}
        />
      </div>

      {/* Visual Multi-Agent Node Graph */}
      <div className="space-y-3 relative py-2">
        {/* AGENT 1: INTAKE AGENT */}
        <div className={`relative rounded-2xl border p-4 transition-all ${
          pipelineState.intake.status === "running"
            ? "border-amber-400 bg-[#1a150c] glow-amber"
            : pipelineState.intake.status === "success"
            ? "border-emerald-500/60 bg-[#0d1a12] glow-emerald"
            : "border-emerald-900/40 bg-[#080e0a]"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl font-bold text-xs ${
                pipelineState.intake.status === "success"
                  ? "bg-emerald-500 text-black"
                  : pipelineState.intake.status === "running"
                  ? "bg-amber-500 text-black animate-pulse"
                  : "bg-emerald-900/50 text-emerald-400"
              }`}>
                {pipelineState.intake.status === "success" ? <CheckCircle2 className="h-5 w-5" /> : "A1"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-white">Intake & Entity Extraction Agent</h3>
                  <span className="text-[10px] text-emerald-400 font-mono">/api/agents/intake</span>
                </div>
                <p className="text-[11px] text-emerald-300/70">
                  {language === "ta" ? "குரல்/உரை பிரித்தெடுத்தல் மற்றும் அவசர நிலை மதிப்பீடு" : "Parses farmer query & structures crop, acreage, urgency"}
                </p>
              </div>
            </div>

            <div className="text-right">
              {pipelineState.intake.status === "running" && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 animate-pulse">
                  <div className="h-2 w-2 rounded-full bg-amber-400" />
                  Extracting...
                </span>
              )}
              {pipelineState.intake.status === "success" && (
                <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                  {pipelineState.intake.durationMs}ms
                </span>
              )}
            </div>
          </div>
        </div>

        {/* PARALLEL BRANCH CONNECTOR */}
        <div className="flex items-center justify-center gap-2 py-1 text-[10px] font-bold tracking-wider text-amber-400/90 uppercase">
          <GitFork className="h-3.5 w-3.5 rotate-180" />
          <span>{t.parallelBranch}</span>
          {orchestratorOutput?.executionMetrics?.parallelExecutionSavingsMs && (
            <span className="rounded bg-amber-500/20 px-2 py-0.5 text-amber-300 font-mono normal-case">
              +{orchestratorOutput.executionMetrics.parallelExecutionSavingsMs}ms saved
            </span>
          )}
        </div>

        {/* PARALLEL AGENTS CONTAINER (Diagnosis + Schemes running simultaneously) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative">
          {/* AGENT 2: DIAGNOSIS AGENT */}
          <div className={`rounded-2xl border p-4 transition-all ${
            pipelineState.diagnosis.status === "running"
              ? "border-amber-400 bg-[#1a150c] glow-amber"
              : pipelineState.diagnosis.status === "success"
              ? "border-emerald-500/60 bg-[#0d1a12] glow-emerald"
              : "border-emerald-900/40 bg-[#080e0a]"
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`flex h-8 w-8 items-center justify-center rounded-xl font-bold text-xs ${
                  pipelineState.diagnosis.status === "success"
                    ? "bg-emerald-500 text-black"
                    : pipelineState.diagnosis.status === "running"
                    ? "bg-amber-500 text-black animate-pulse"
                    : "bg-emerald-900/50 text-emerald-400"
                }`}>
                  {pipelineState.diagnosis.status === "success" ? <CheckCircle2 className="h-4 w-4" /> : "A2"}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Diagnosis Agent</h3>
                  <span className="text-[9px] text-emerald-400 font-mono">TNAU Disease DB</span>
                </div>
              </div>
              {pipelineState.diagnosis.status === "success" && (
                <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                  {pipelineState.diagnosis.durationMs}ms
                </span>
              )}
            </div>
            <p className="mt-2 text-[10px] text-emerald-300/70">
              {language === "ta" ? "பயிர் நோய் மற்றும் பரிந்துரை" : "Cross-references symptoms against TNAU knowledge"}
            </p>
          </div>

          {/* AGENT 3: SCHEMES AGENT */}
          <div className={`rounded-2xl border p-4 transition-all ${
            pipelineState.schemes.status === "running"
              ? "border-amber-400 bg-[#1a150c] glow-amber"
              : pipelineState.schemes.status === "success"
              ? "border-amber-500/60 bg-[#181309] glow-amber"
              : "border-emerald-900/40 bg-[#080e0a]"
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`flex h-8 w-8 items-center justify-center rounded-xl font-bold text-xs ${
                  pipelineState.schemes.status === "success"
                    ? "bg-amber-500 text-black"
                    : pipelineState.schemes.status === "running"
                    ? "bg-amber-500 text-black animate-pulse"
                    : "bg-emerald-900/50 text-amber-400"
                }`}>
                  {pipelineState.schemes.status === "success" ? <CheckCircle2 className="h-4 w-4" /> : "A3"}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Scheme-Matching Agent</h3>
                  <span className="text-[9px] text-amber-400 font-mono">8 Schemes Engine</span>
                </div>
              </div>
              {pipelineState.schemes.status === "success" && (
                <span className="text-[10px] font-mono text-amber-400 font-semibold">
                  {pipelineState.schemes.durationMs}ms
                </span>
              )}
            </div>
            <p className="mt-2 text-[10px] text-amber-200/70">
              {language === "ta" ? "மானியம் & பயிர்க்காப்பீடு கணக்கீடு" : "Matches PM-KISAN, PMFBY, KCC & calculates ₹ benefits"}
            </p>
          </div>
        </div>

        {/* SEQUENTIAL CONNECTOR */}
        <div className="flex justify-center py-0.5">
          <ArrowDown className="h-4 w-4 text-emerald-700/60" />
        </div>

        {/* AGENT 4: MARKET INTELLIGENCE AGENT */}
        <div className={`rounded-2xl border p-4 transition-all ${
          pipelineState.market.status === "running"
            ? "border-amber-400 bg-[#1a150c] glow-amber"
            : pipelineState.market.status === "success"
            ? "border-emerald-500/60 bg-[#0d1a12] glow-emerald"
            : "border-emerald-900/40 bg-[#080e0a]"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl font-bold text-xs ${
                pipelineState.market.status === "success"
                  ? "bg-emerald-500 text-black"
                  : pipelineState.market.status === "running"
                  ? "bg-amber-500 text-black animate-pulse"
                  : "bg-emerald-900/50 text-emerald-400"
              }`}>
                {pipelineState.market.status === "success" ? <CheckCircle2 className="h-5 w-5" /> : "A4"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-white">Market Intelligence & Mandi Agent</h3>
                  <span className="text-[10px] text-emerald-400 font-mono">/api/agents/market</span>
                </div>
                <p className="text-[11px] text-emerald-300/70">
                  {language === "ta" ? "30 நாள் சந்தை விலை நிலவரம் மற்றும் விற்பனை ஆலோசனை" : "Analyzes 30-day time-series across APMC mandis + MSP floor check"}
                </p>
              </div>
            </div>

            <div className="text-right">
              {pipelineState.market.status === "running" && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 animate-pulse">
                  <div className="h-2 w-2 rounded-full bg-amber-400" />
                  Forecasting...
                </span>
              )}
              {pipelineState.market.status === "success" && (
                <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                  {pipelineState.market.durationMs}ms
                </span>
              )}
            </div>
          </div>
        </div>

        {/* SEQUENTIAL CONNECTOR */}
        <div className="flex justify-center py-0.5">
          <ArrowDown className="h-4 w-4 text-emerald-700/60" />
        </div>

        {/* MASTER ORCHESTRATOR NODE */}
        <div className={`rounded-2xl border p-4 transition-all ${
          pipelineState.orchestrator.status === "running"
            ? "border-amber-400 bg-[#1a150c] glow-amber"
            : pipelineState.orchestrator.status === "success"
            ? "border-emerald-400 bg-gradient-to-r from-[#0e2115] to-[#14291c] glow-emerald shadow-lg"
            : "border-emerald-900/40 bg-[#080e0a]"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl font-bold text-xs ${
                pipelineState.orchestrator.status === "success"
                  ? "bg-gradient-to-tr from-emerald-400 to-amber-300 text-black shadow-md"
                  : "bg-emerald-900/50 text-emerald-400"
              }`}>
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-white">Master Multi-Agent Orchestrator</h3>
                  <span className="text-[10px] text-amber-400 font-bold">SYNTHESIS</span>
                </div>
                <p className="text-[11px] text-emerald-300/70">
                  {language === "ta" ? "7 நாள் ஒருங்கிணைந்த வாராந்திர செயல் திட்டம் தயாரிப்பு" : "Synthesizes final unified 7-day action plan & PDF dossier"}
                </p>
              </div>
            </div>

            <div className="text-right">
              {pipelineState.orchestrator.status === "success" && (
                <span className="rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                  READY
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Live Agent Reasoning Transcript / Log Stream */}
      <div className="rounded-2xl border border-emerald-900/40 bg-[#070d09] p-3 text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-emerald-900/30 mb-2">
          <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-[11px]">
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            Live Agent Reasoning Stream
          </span>
          <span className="text-[10px] text-emerald-500/60 font-mono">
            {agentLogs.length} events
          </span>
        </div>

        <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 font-mono text-[11px]">
          {agentLogs.length === 0 ? (
            <p className="text-emerald-700/60 text-center py-4 font-sans text-xs">
              Awaiting trigger. Select a preset or hit &apos;Run Multi-Agent Pipeline&apos;.
            </p>
          ) : (
            agentLogs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2 text-emerald-300/90">
                <span className="text-emerald-500 text-[10px] whitespace-nowrap">[{log.timestamp}]</span>
                <span className="font-bold text-amber-400 whitespace-nowrap">{log.agentName}:</span>
                <span className="text-emerald-100/90 leading-tight">{log.message}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
