"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFarmerStore } from "@/store/useFarmerStore";
import { TRANSLATIONS } from "@/data/translations";
import { TN_FARMER_PRESETS } from "@/data/presets";
import { 
  Sprout, 
  Bot, 
  Sparkles, 
  TrendingUp, 
  ShieldAlert, 
  Coins, 
  Layers, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Building2, 
  ChevronRight,
  BarChart3
} from "lucide-react";

export default function LandingHero() {
  const { language, setSelectedPreset } = useFarmerStore();
  const router = useRouter();
  const t = TRANSLATIONS[language];

  const handleLaunchPreset = (preset: typeof TN_FARMER_PRESETS[0]) => {
    setSelectedPreset(preset);
    router.push("/app");
  };

  return (
    <div className="relative overflow-hidden pt-6 pb-20 sm:pt-10 sm:pb-28">
      {/* Background glowing orb accents */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-emerald-600/20 via-emerald-400/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 right-[-200px] -z-10 h-[400px] w-[600px] rounded-full bg-gradient-to-br from-amber-500/10 via-emerald-600/10 to-transparent blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Hero Title & Pitch */}
        <div className="mx-auto mt-6 max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl sm:leading-[1.15]">
            {language === "ta" ? (
              <>
                தமிழ்நாடு விவசாயிகளுக்கான <br />
                <span className="bg-gradient-to-r from-emerald-400 via-emerald-200 to-amber-300 bg-clip-text text-transparent">
                  தன்னாட்சி பல-முகவர் செயற்கை நுண்ணறிவு
                </span>
              </>
            ) : (
              <>
                Empowering Tamil Nadu Farmers with <br />
                <span className="bg-gradient-to-r from-emerald-400 via-emerald-200 to-amber-300 bg-clip-text text-transparent">
                  Autonomous Multi-Agent AI
                </span>
              </>
            )}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-emerald-100/70 leading-relaxed">
            {t.heroSubheading}
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/app"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 px-6 py-3.5 text-sm font-bold text-black shadow-xl shadow-emerald-600/25 transition-all hover:scale-105 active:scale-95"
            >
              <Sprout className="h-5 w-5" />
              <span>{t.launchAppBtn}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="#scenarios"
              className="flex items-center gap-2 rounded-xl border border-emerald-700/50 bg-[#0d1610] hover:bg-emerald-950/60 px-6 py-3.5 text-sm font-semibold text-emerald-200 transition-all hover:border-emerald-500"
            >
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>{t.explorePresets}</span>
            </a>
          </div>
        </div>

        {/* Live Impact Counters Ticker */}
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border border-emerald-900/50 bg-[#0d1611]/80 p-5 text-center backdrop-blur-md">
            <p className="text-3xl font-extrabold text-emerald-400">{t.impactStats.farmersHelped}</p>
            <p className="mt-1 text-xs text-emerald-200/70 font-medium">{t.impactStats.farmersLabel}</p>
          </div>
          <div className="rounded-2xl border border-amber-900/40 bg-[#16120b]/80 p-5 text-center backdrop-blur-md">
            <p className="text-3xl font-extrabold text-amber-400">{t.impactStats.benefitsUnlocked}</p>
            <p className="mt-1 text-xs text-amber-200/70 font-medium">{t.impactStats.benefitsLabel}</p>
          </div>
          <div className="rounded-2xl border border-emerald-900/50 bg-[#0d1611]/80 p-5 text-center backdrop-blur-md">
            <p className="text-3xl font-extrabold text-emerald-400">{t.impactStats.accuracyRate}</p>
            <p className="mt-1 text-xs text-emerald-200/70 font-medium">{t.impactStats.accuracyLabel}</p>
          </div>
          <div className="rounded-2xl border border-emerald-900/50 bg-[#0d1611]/80 p-5 text-center backdrop-blur-md">
            <p className="text-3xl font-extrabold text-emerald-400">{t.impactStats.mandisCovered}</p>
            <p className="mt-1 text-xs text-emerald-200/70 font-medium">{t.impactStats.mandisLabel}</p>
          </div>
        </div>

        {/* Ground Reality: Crisis Statistics in Tamil Nadu */}
        <div className="mt-16 rounded-3xl border border-emerald-900/60 bg-gradient-to-b from-[#0f1a14] to-[#0a110d] p-6 sm:p-10 shadow-2xl">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>{language === "ta" ? "கள யதார்த்தம்" : "Ground Reality & Market Failure"}</span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {t.crisisStats.title}
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-red-900/40 bg-[#160d0e]/60 p-6">
              <span className="text-4xl font-black text-red-400">{t.crisisStats.stat1Number}</span>
              <p className="mt-3 text-sm text-red-200/80 leading-relaxed font-normal">{t.crisisStats.stat1Text}</p>
            </div>
            <div className="rounded-2xl border border-amber-900/40 bg-[#17120a]/60 p-6">
              <span className="text-4xl font-black text-amber-400">{t.crisisStats.stat2Number}</span>
              <p className="mt-3 text-sm text-amber-200/80 leading-relaxed font-normal">{t.crisisStats.stat2Text}</p>
            </div>
            <div className="rounded-2xl border border-emerald-900/40 bg-[#0d1611]/60 p-6">
              <span className="text-4xl font-black text-emerald-400">{t.crisisStats.stat3Number}</span>
              <p className="mt-3 text-sm text-emerald-200/80 leading-relaxed font-normal">{t.crisisStats.stat3Text}</p>
            </div>
          </div>
        </div>

        {/* Multi-Agent Architecture vs LLM Wrapper (Judge Wow Factor) */}
        <div className="mt-20">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              {language === "ta" ? "கட்டமைப்பு வேறுபாடு" : "Core Technical Differentiator"}
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              {language === "ta" ? "ஏன் இது ஒரு சாதாரண சாட்பாட் அல்ல? (True Multi-Agent System)" : "Why Krishi Mitra is True Agentic AI — Not a Chatbot Wrapper"}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-emerald-200/70">
              {language === "ta" 
                ? "தனித்தனி முகவர்கள் தங்களுக்குரிய சிறப்பு பணிகளை வரிசையாகவும், இணையாகவும் செய்து துல்லியமான முடிவுகளை வழங்குகின்றன."
                : "Four autonomous, specialized agents with dedicated system roles executing in parallel and sequential pipelines."}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Agent 1 */}
            <div className="rounded-2xl border border-emerald-800/40 bg-[#0d1612] p-5 shadow-lg relative group hover:border-emerald-500/60 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 font-bold mb-4">
                1
              </div>
              <h3 className="font-bold text-white text-base">Intake Agent</h3>
              <p className="text-xs text-emerald-400 mt-0.5">/api/agents/intake</p>
              <p className="mt-3 text-xs text-emerald-200/70 leading-relaxed">
                Parses colloquial Tamil/English voice input. Extracts crop, district, acreage, and urgency signals into typed JSON.
              </p>
            </div>

            {/* Agent 2 */}
            <div className="rounded-2xl border border-emerald-800/40 bg-[#0d1612] p-5 shadow-lg relative group hover:border-emerald-500/60 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 font-bold mb-4">
                2
              </div>
              <div className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 mb-1">
                Parallel Branch
              </div>
              <h3 className="font-bold text-white text-base">Diagnosis Agent</h3>
              <p className="text-xs text-emerald-400 mt-0.5">/api/agents/diagnose</p>
              <p className="mt-3 text-xs text-emerald-200/70 leading-relaxed">
                Cross-references TNAU & ICAR pathology database. Computes disease confidence, organic & chemical dosage, and urgency.
              </p>
            </div>

            {/* Agent 3 */}
            <div className="rounded-2xl border border-emerald-800/40 bg-[#0d1612] p-5 shadow-lg relative group hover:border-emerald-500/60 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 font-bold mb-4">
                3
              </div>
              <div className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 mb-1">
                Parallel Branch
              </div>
              <h3 className="font-bold text-white text-base">Scheme Matching Agent</h3>
              <p className="text-xs text-amber-400 mt-0.5">/api/agents/schemes</p>
              <p className="mt-3 text-xs text-emerald-200/70 leading-relaxed">
                Evaluates farmer demographics against 8 Central/TN schemes. Calculates exact INR benefits, eligibility %, and docs checklist.
              </p>
            </div>

            {/* Agent 4 */}
            <div className="rounded-2xl border border-emerald-800/40 bg-[#0d1612] p-5 shadow-lg relative group hover:border-emerald-500/60 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 font-bold mb-4">
                4
              </div>
              <h3 className="font-bold text-white text-base">Market Intelligence Agent</h3>
              <p className="text-xs text-emerald-400 mt-0.5">/api/agents/market</p>
              <p className="mt-3 text-xs text-emerald-200/70 leading-relaxed">
                Analyzes 30-day time-series across 5 APMC mandis. Flags MSP violations and outputs &ldquo;Sell Now&rdquo; vs &ldquo;Hold&rdquo; reasoning.
              </p>
            </div>
          </div>
        </div>

        {/* Preset Scenarios Selector Section */}
        <div id="scenarios" className="mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                {language === "ta" ? "நேரடி மாதிரி சூழல்கள்" : "Instant Hackathon Demonstration"}
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-white">
                {language === "ta" ? "தமிழக விவசாயிகளின் நிஜ வாழ்க்கை சூழல்கள்" : "Test Real Tamil Nadu Farmer Scenarios"}
              </h2>
            </div>
            <Link
              href="/app"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
            >
              <span>{language === "ta" ? "செயலிக்குச் செல்" : "Open Console"}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TN_FARMER_PRESETS.map((preset) => (
              <div
                key={preset.id}
                onClick={() => handleLaunchPreset(preset)}
                className="group cursor-pointer rounded-2xl border border-emerald-900/50 bg-[#0c140f] p-6 transition-all hover:border-emerald-500/80 hover:bg-emerald-950/30 hover:shadow-xl hover:shadow-emerald-950/50"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 text-xs font-semibold text-emerald-300">
                    {language === "ta" ? preset.badgeTa : preset.badge}
                  </span>
                  <span className="text-xs text-emerald-400/80 font-medium">
                    {preset.district} &bull; {preset.crop}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {language === "ta" ? preset.titleTa : preset.title}
                </h3>

                <p className="mt-2 text-xs text-emerald-200/70 line-clamp-2">
                  &ldquo;{language === "ta" ? preset.rawTextTa : preset.rawText}&rdquo;
                </p>

                <div className="mt-4 pt-4 border-t border-emerald-900/40 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400/90 font-medium">
                    <Zap className="h-3.5 w-3.5 text-amber-400" />
                    <span>{preset.farmerProfile.landSizeAcres} Acres &bull; {preset.farmerProfile.category}</span>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                    {language === "ta" ? "முகவர்களை இயக்கு" : "Launch Agents"} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
