"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useFarmerStore } from "@/store/useFarmerStore";
import { TRANSLATIONS } from "@/data/translations";
import { 
  Sprout, 
  Languages, 
  Sparkles, 
  History, 
  FileText, 
  Activity, 
  ChevronRight,
  X,
  ExternalLink,
  Bot
} from "lucide-react";

export default function Navbar() {
  const { 
    language, 
    setLanguage, 
    viewMode, 
    setViewMode, 
    history, 
    loadFromHistory, 
    clearHistory 
  } = useFarmerStore();
  
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const t = TRANSLATIONS[language];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-emerald-900/40 bg-[#070c09]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-700 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sprout className="h-6 w-6 text-black" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  {t.appTitle}
                </span>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                  Multi-Agent v1.0
                </span>
              </div>
              <p className="text-[11px] text-emerald-400/70 hidden sm:block">
                {language === "ta" ? "தமிழ்நாடு உழவர் வழிகாட்டி" : "Tamil Nadu Agronomic AI Hub"}
              </p>
            </div>
          </Link>

          {/* Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Mode Toggle: Farmer Plain Language vs Technical Agronomist */}
            <div className="hidden md:flex items-center rounded-lg bg-emerald-950/60 p-1 border border-emerald-800/40 text-xs">
              <button
                onClick={() => setViewMode("farmer")}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition-all ${
                  viewMode === "farmer"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-emerald-300/70 hover:text-emerald-200"
                }`}
                title="Simple plain language for village farmers"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span>{language === "ta" ? "எளிய விளக்கம்" : "Farmer Mode"}</span>
              </button>
              <button
                onClick={() => setViewMode("technical")}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition-all ${
                  viewMode === "technical"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-emerald-300/70 hover:text-emerald-200"
                }`}
                title="Deep technical agronomist breakdown"
              >
                <Bot className="h-3.5 w-3.5 text-emerald-300" />
                <span>{language === "ta" ? "தொழில்நுட்ப பார்வை" : "Agronomist View"}</span>
              </button>
            </div>

            {/* Language Switcher Toggle */}
            <button
              onClick={() => setLanguage(language === "en" ? "ta" : "en")}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-900/30 hover:bg-emerald-900/60 border border-emerald-700/40 px-3 py-1.5 text-xs font-semibold text-emerald-300 transition-colors"
              title="Toggle between English and Tamil"
            >
              <Languages className="h-3.5 w-3.5 text-amber-400" />
              <span>{language === "en" ? "தமிழ் (TA)" : "English (EN)"}</span>
            </button>

            {/* Session History Drawer Button */}
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="relative flex items-center gap-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900/60 border border-emerald-800/50 px-3 py-1.5 text-xs font-medium text-emerald-300 transition-colors"
              title="View past consultation memory"
            >
              <History className="h-3.5 w-3.5 text-emerald-400" />
              <span className="hidden sm:inline">{language === "ta" ? "பதிவுகள்" : "History"}</span>
              {history.length > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-black">
                  {history.length}
                </span>
              )}
            </button>

            {/* App Launch / Home Link */}
            <Link
              href="/app"
              className="hidden sm:flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 px-3.5 py-1.5 text-xs font-semibold text-black shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <span>{language === "ta" ? "செயலி" : "Launch App"}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Session Memory Drawer Modal */}
      {isHistoryOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="h-full w-full max-w-md bg-[#0a110d] border-l border-emerald-900/60 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-emerald-900/40">
                <div className="flex items-center gap-2">
                  <History className="h-5 w-5 text-emerald-400" />
                  <h3 className="font-bold text-white text-base">
                    {language === "ta" ? "முந்தைய விவசாய ஆலோசனைகள்" : "Session Memory & Consultations"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsHistoryOpen(false)}
                  className="rounded-lg p-1 text-emerald-400/70 hover:bg-emerald-900/40 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {history.length === 0 ? (
                  <div className="py-12 text-center text-sm text-emerald-400/60">
                    <Activity className="h-8 w-8 mx-auto mb-2 text-emerald-600/50" />
                    <p>{language === "ta" ? "இன்னும் பதிவுகள் எதுவும் இல்லை." : "No consultations recorded yet."}</p>
                    <p className="text-xs text-emerald-500/50 mt-1">
                      {language === "ta" ? "ஒரு மாதிரி சூழலை இயக்கி ஆலோசனையை தொடங்கவும்." : "Run a multi-agent pipeline to save consultations."}
                    </p>
                  </div>
                ) : (
                  history.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        loadFromHistory(item);
                        setIsHistoryOpen(false);
                      }}
                      className="group cursor-pointer rounded-xl border border-emerald-900/50 bg-[#101914] p-3.5 transition-all hover:border-emerald-500/60 hover:bg-emerald-950/40"
                    >
                      <div className="flex items-center justify-between text-xs text-emerald-400/80 mb-1">
                        <span className="font-semibold text-emerald-300">{item.farmerName} ({item.district})</span>
                        <span className="text-[10px] text-emerald-500/60">{item.timestamp}</span>
                      </div>
                      <p className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">
                        {item.crop}: {item.diseaseName}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-amber-400 font-medium">
                          ₹{item.totalBenefitsInr.toLocaleString("en-IN")} Benefit
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-emerald-400 underline opacity-0 group-hover:opacity-100 transition-opacity">
                          Restore Plan <ChevronRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {history.length > 0 && (
              <div className="pt-4 border-t border-emerald-900/40 flex justify-end">
                <button
                  onClick={clearHistory}
                  className="text-xs text-red-400/80 hover:text-red-300 underline"
                >
                  {language === "ta" ? "அனைத்து பதிவுகளையும் அழி" : "Clear All History"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
