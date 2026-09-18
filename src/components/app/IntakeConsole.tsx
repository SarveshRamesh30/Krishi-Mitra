"use client";

import React, { useState, useEffect } from "react";
import { useFarmerStore } from "@/store/useFarmerStore";
import { TRANSLATIONS } from "@/data/translations";
import { TN_FARMER_PRESETS } from "@/data/presets";
import { 
  Mic, 
  MicOff, 
  Play, 
  RotateCcw, 
  Sparkles, 
  User, 
  MapPin, 
  Layers, 
  Droplets, 
  AlertTriangle,
  Send,
  Volume2,
  FileCheck
} from "lucide-react";

export default function IntakeConsole() {
  const { 
    language, 
    rawQueryText, 
    setRawQueryText, 
    activeProfile, 
    setActiveProfile,
    selectedPreset, 
    setSelectedPreset,
    isPipelineRunning, 
    runFullPipeline,
    resetPipeline,
    orchestratorOutput
  } = useFarmerStore();

  const [isRecording, setIsRecording] = useState(false);
  const [audioTimer, setAudioTimer] = useState(0);
  const t = TRANSLATIONS[language];

  // Voice recording simulation timer
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setAudioTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setAudioTimer(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate voice capture
      setTimeout(() => {
        setIsRecording(false);
      }, 4500);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-emerald-900/60 bg-[#0c140f]/90 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
      {/* Top Header & Scenario Presets Selector */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <Mic className="h-4 w-4" />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white">
              {language === "ta" ? "விவசாயி குரல் / உரை உள்ளீடு (Intake)" : "Farmer Voice / Text Intake Console"}
            </h2>
          </div>
          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">
            Agent 1 of 4
          </span>
        </div>

        {/* Quick Scenario Pills */}
        <div className="mt-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400/80 mb-2">
            {language === "ta" ? "மாதிரி சூழல் தேர்வு செய்க:" : "1-Click Hackathon Presets:"}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {TN_FARMER_PRESETS.map((preset) => {
              const isSelected = selectedPreset?.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPreset(preset)}
                  className={`flex flex-col items-start rounded-xl p-2.5 text-left text-xs transition-all border ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-950/70 text-white shadow-md shadow-emerald-950/50"
                      : "border-emerald-900/40 bg-[#101913]/60 text-emerald-300/70 hover:border-emerald-700/60 hover:text-white"
                  }`}
                >
                  <span className="font-semibold text-emerald-300 text-[11px]">{preset.district}</span>
                  <span className="text-[10px] text-emerald-400/80 truncate w-full">{preset.crop}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Voice Simulation Waveform Area */}
      <div className={`relative overflow-hidden rounded-2xl border transition-all ${
        isRecording 
          ? "border-amber-500 bg-[#1f170c]/80 shadow-lg shadow-amber-500/10" 
          : "border-emerald-900/40 bg-[#09100b]/80"
      } p-4`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleRecording}
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                isRecording 
                  ? "bg-amber-500 text-black animate-pulse shadow-lg shadow-amber-500/40" 
                  : "bg-emerald-600 hover:bg-emerald-500 text-black shadow-md shadow-emerald-600/30"
              }`}
              title={isRecording ? "Stop voice listening" : "Simulate farmer voice query"}
            >
              {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
            <div>
              <p className="text-xs font-semibold text-white">
                {isRecording 
                  ? (language === "ta" ? "விவசாயியின் குரலை பதிவு செய்கிறது..." : "Listening to Tamil / English Voice...") 
                  : (language === "ta" ? "குரல்வழி கேட்கவும்" : "Simulate Voice Audio Input")}
              </p>
              <p className="text-[10px] text-emerald-400/70">
                {isRecording ? `Recording 00:0${audioTimer}s` : "Supports Tamil, Tanglish & English"}
              </p>
            </div>
          </div>

          {isRecording && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              TRANSCRIBING
            </span>
          )}
        </div>

        {/* Animated Waveform Bars */}
        {isRecording && (
          <div className="flex h-12 items-center justify-center gap-1.5 py-2">
            {[40, 70, 90, 60, 100, 80, 50, 95, 75, 85, 60, 90, 45, 80, 100, 70, 50].map((h, i) => (
              <div
                key={i}
                className="w-1 rounded-full bg-amber-400 wave-bar"
                style={{
                  height: `${h}%`,
                  animationDelay: `${(i % 5) * 0.15}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Text Input / Transcription Box */}
        <div className="mt-2">
          <textarea
            value={rawQueryText}
            onChange={(e) => setRawQueryText(e.target.value)}
            rows={4}
            className="w-full resize-none rounded-xl border border-emerald-900/50 bg-[#070c09] p-3 text-xs sm:text-sm text-emerald-100 placeholder-emerald-700/60 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder={language === "ta" ? "உங்கள் பயிரின் பிரச்சனையை விவரிக்கவும்..." : "Describe crop symptoms, district, land size, or loan requirements..."}
          />
        </div>
      </div>

      {/* Active Farmer Profile Overview */}
      <div className="rounded-2xl border border-emerald-900/40 bg-[#0a120d] p-3.5 text-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-emerald-400" />
            {activeProfile.name}
          </span>
          <span className="text-[10px] text-amber-400 font-medium bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
            {activeProfile.category}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-[11px] text-emerald-200/70 pt-2 border-t border-emerald-900/30">
          <div>
            <span className="text-emerald-500 block text-[9px] uppercase font-bold">District</span>
            <span className="text-white font-medium">{activeProfile.district}</span>
          </div>
          <div>
            <span className="text-emerald-500 block text-[9px] uppercase font-bold">Landholding</span>
            <span className="text-white font-medium">{activeProfile.landSizeAcres} Acres</span>
          </div>
          <div>
            <span className="text-emerald-500 block text-[9px] uppercase font-bold">Irrigation</span>
            <span className="text-white font-medium truncate">{activeProfile.irrigationSource}</span>
          </div>
        </div>
      </div>

      {/* Extraction Preview (Live Structured Output Signals) */}
      {orchestratorOutput && (
        <div className="rounded-2xl border border-emerald-700/40 bg-[#0d1c13] p-3.5 text-xs animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-emerald-300 flex items-center gap-1.5">
              <FileCheck className="h-3.5 w-3.5 text-emerald-400" />
              {language === "ta" ? "பிரித்தெடுக்கப்பட்ட காரணிகள்" : "Intake Extraction Output"}
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold">
              {orchestratorOutput.intake.confidenceScore}% Confidence
            </span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-emerald-400/80">Identified Crop:</span>
              <span className="font-semibold text-white">{orchestratorOutput.intake.crop}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-400/80">Urgency Level:</span>
              <span className={`font-bold uppercase ${
                orchestratorOutput.intake.urgency === 'critical' ? 'text-red-400' : 'text-amber-400'
              }`}>
                {orchestratorOutput.intake.urgency}
              </span>
            </div>
            <div className="pt-1.5 border-t border-emerald-900/30">
              <span className="text-emerald-400/80 block mb-1">Extracted Symptoms:</span>
              <div className="flex flex-wrap gap-1">
                {orchestratorOutput.intake.symptoms.map((sym, idx) => (
                  <span key={idx} className="rounded bg-emerald-950 px-1.5 py-0.5 text-[10px] text-emerald-200 border border-emerald-800/40">
                    {sym}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pipeline Trigger Action Button */}
      <div className="flex gap-2">
        <button
          onClick={runFullPipeline}
          disabled={isPipelineRunning || !rawQueryText.trim()}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 px-5 py-3.5 text-sm font-bold text-black shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPipelineRunning ? (
            <>
              <div className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
              <span>{t.processingPipeline}</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4 fill-current" />
              <span>{t.runPipeline}</span>
            </>
          )}
        </button>

        {orchestratorOutput && (
          <button
            onClick={resetPipeline}
            className="rounded-xl border border-emerald-800/50 bg-[#0d1611] p-3 text-emerald-400 hover:bg-emerald-900/40 transition-colors"
            title="Reset Pipeline"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
