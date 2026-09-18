"use client";

import React, { useState } from "react";
import { useFarmerStore } from "@/store/useFarmerStore";
import { TRANSLATIONS } from "@/data/translations";
import { generateFarmerActionPlanPDF } from "@/lib/pdfGenerator";
import confetti from "canvas-confetti";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
  CartesianGrid
} from "recharts";
import {
  Stethoscope,
  Landmark,
  TrendingUp,
  CalendarCheck,
  Download,
  AlertOctagon,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Phone,
  Sparkles,
  Info,
  DollarSign,
  Leaf,
  FlaskConical,
  Award,
  ChevronRight,
  TrendingDown
} from "lucide-react";

export default function ResultsDashboard() {
  const { 
    language, 
    viewMode, 
    orchestratorOutput, 
    activeProfile 
  } = useFarmerStore();

  const [activeTab, setActiveTab] = useState<"diagnosis" | "schemes" | "market" | "actionPlan">("actionPlan");
  const t = TRANSLATIONS[language];

  if (!orchestratorOutput) {
    return (
      <div className="rounded-3xl border border-emerald-900/40 bg-[#0a120d]/80 p-12 text-center backdrop-blur-xl">
        <Sparkles className="h-10 w-10 mx-auto text-emerald-500/50 animate-pulse mb-3" />
        <h3 className="text-base font-bold text-white">
          {language === "ta" ? "முடிவுகள் தயாராக இல்லை" : "Awaiting Agent Pipeline Execution"}
        </h3>
        <p className="mt-1 text-xs text-emerald-400/60 max-w-md mx-auto">
          {language === "ta" 
            ? "இடதுபுறத்தில் உள்ள 'பல-முகவர் ஏஐ செயலாக்கத்தை இயக்கு' பொத்தானை கிளிக் செய்யவும்." 
            : "Click 'Run Multi-Agent Pipeline' on the left console or select a preset scenario to view the live dashboard."}
        </p>
      </div>
    );
  }

  const { diagnosis, schemes, market, weeklyActionPlan, executiveSummary, executiveSummaryTamil, simplifiedFarmerSummary, simplifiedFarmerSummaryTamil } = orchestratorOutput;

  const handleDownloadPDF = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    generateFarmerActionPlanPDF(orchestratorOutput, activeProfile);
  };

  // Color palette for recharts lines
  const mandiColors = ["#10b981", "#f59e0b", "#38bdf8", "#a855f7", "#ec4899"];

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-emerald-900/60 bg-[#0c140f]/95 p-5 sm:p-7 shadow-2xl backdrop-blur-2xl">
      {/* Top Banner: Executive Summary & PDF Action */}
      <div className="rounded-2xl border border-emerald-700/50 bg-gradient-to-br from-[#0e2417] via-[#0d1c13] to-[#09110c] p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                {language === "ta" ? "ஒருங்கிணைந்த உழவர் தீர்வு திட்டம்" : "Unified Multi-Agent Action Dossier"}
              </span>
              <span className="text-xs text-emerald-500 font-mono">
                (Confidence: {diagnosis.confidenceScore}%)
              </span>
            </div>
            
            {/* View Mode Switching: Plain Language vs Agronomist */}
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
              {viewMode === "farmer" 
                ? (language === "ta" ? simplifiedFarmerSummaryTamil : simplifiedFarmerSummary)
                : (language === "ta" ? executiveSummaryTamil : executiveSummary)
              }
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={handleDownloadPDF}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 px-4 py-2.5 text-xs font-bold text-black shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
            >
              <Download className="h-4 w-4" />
              <span>{t.downloadPdf}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-emerald-900/50 overflow-x-auto gap-2 pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab("actionPlan")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === "actionPlan"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
              : "text-emerald-300/70 hover:text-white hover:bg-emerald-950/40"
          }`}
        >
          <CalendarCheck className="h-4 w-4" />
          <span>{t.tabs.actionPlan}</span>
        </button>

        <button
          onClick={() => setActiveTab("diagnosis")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === "diagnosis"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
              : "text-emerald-300/70 hover:text-white hover:bg-emerald-950/40"
          }`}
        >
          <Stethoscope className="h-4 w-4" />
          <span>{t.tabs.diagnosis}</span>
        </button>

        <button
          onClick={() => setActiveTab("schemes")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === "schemes"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
              : "text-emerald-300/70 hover:text-white hover:bg-emerald-950/40"
          }`}
        >
          <Landmark className="h-4 w-4" />
          <span>{t.tabs.schemes}</span>
          <span className="rounded-full bg-amber-400 text-black px-1.5 py-0.2 text-[10px] font-extrabold">
            ₹{schemes.totalEstimatedBenefitInr.toLocaleString('en-IN')}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("market")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === "market"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
              : "text-emerald-300/70 hover:text-white hover:bg-emerald-950/40"
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          <span>{t.tabs.market}</span>
        </button>
      </div>

      {/* TAB 1: CROP DIAGNOSIS */}
      {activeTab === "diagnosis" && (
        <div className="space-y-5 animate-in fade-in duration-300">
          {/* Disease Header Card */}
          <div className="rounded-2xl border border-emerald-800/60 bg-[#0f1d15] p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider ${
                  diagnosis.severity === 'critical'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : diagnosis.severity === 'high'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                }`}>
                  <AlertOctagon className="h-3.5 w-3.5" />
                  {diagnosis.severity} Urgency
                </span>
                <h3 className="mt-2 text-xl sm:text-2xl font-black text-white">
                  {diagnosis.diseaseName}
                </h3>
                <p className="text-sm font-semibold text-emerald-400">
                  {diagnosis.diseaseNameTamil}
                </p>
                <p className="mt-1 text-xs text-emerald-300/70 font-mono">
                  Pathogen: {diagnosis.pathogen}
                </p>
              </div>

              <div className="text-right">
                <div className="inline-flex flex-col items-end rounded-xl bg-[#09120c] border border-emerald-900/60 p-3">
                  <span className="text-[10px] uppercase font-bold text-emerald-400">Agent Confidence</span>
                  <span className="text-2xl font-black text-emerald-400">{diagnosis.confidenceScore}%</span>
                  <span className="text-[10px] text-emerald-500/70">TNAU Validated</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-emerald-900/40">
              <p className="text-xs text-emerald-200/90 leading-relaxed">
                {viewMode === "farmer" ? diagnosis.farmerExplanation : diagnosis.expertExplanation}
              </p>
            </div>
          </div>

          {/* Treatment Options (Chemical vs Organic) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Chemical Treatment */}
            <div className="rounded-2xl border border-emerald-800/40 bg-[#0a140e] p-4">
              <div className="flex items-center gap-2 mb-3">
                <FlaskConical className="h-4 w-4 text-emerald-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  {t.chemicalTreatments}
                </h4>
              </div>
              {diagnosis.chemicalTreatments.map((chem, idx) => (
                <div key={idx} className="rounded-xl border border-emerald-900/50 bg-[#0f1d15]/60 p-3.5 mb-2 last:mb-0">
                  <p className="font-bold text-white text-sm">{chem.title}</p>
                  {chem.titleTa && <p className="text-xs font-medium text-emerald-400 mb-1">{chem.titleTa}</p>}
                  <p className="text-xs text-emerald-200/80">{chem.description}</p>
                  <div className="mt-2.5 flex flex-wrap items-center justify-between text-[11px] text-emerald-400/90 pt-2 border-t border-emerald-900/30">
                    <span>Dosage: <strong className="text-white">{chem.dosage}</strong></span>
                    <span>Cost: <strong className="text-amber-400">₹{chem.costEstimateInr}</strong></span>
                  </div>
                </div>
              ))}
            </div>

            {/* Organic & Bio-Control */}
            <div className="rounded-2xl border border-emerald-800/40 bg-[#0a140e] p-4">
              <div className="flex items-center gap-2 mb-3">
                <Leaf className="h-4 w-4 text-emerald-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  {t.organicTreatments}
                </h4>
              </div>
              {diagnosis.organicTreatments.map((org, idx) => (
                <div key={idx} className="rounded-xl border border-emerald-900/50 bg-[#0f1d15]/60 p-3.5 mb-2 last:mb-0">
                  <p className="font-bold text-white text-sm">{org.title}</p>
                  {org.titleTa && <p className="text-xs font-medium text-emerald-400 mb-1">{org.titleTa}</p>}
                  <p className="text-xs text-emerald-200/80">{org.description}</p>
                  <div className="mt-2.5 flex flex-wrap items-center justify-between text-[11px] text-emerald-400/90 pt-2 border-t border-emerald-900/30">
                    <span>Dosage: <strong className="text-white">{org.dosage || 'Foliar application'}</strong></span>
                    <span>Cost: <strong className="text-amber-400">₹{org.costEstimateInr}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TNAU Advisory Note */}
          <div className="rounded-2xl border border-emerald-800/40 bg-[#08120b] p-4 text-xs">
            <div className="flex items-center gap-2 mb-1 text-emerald-400 font-bold">
              <Award className="h-4 w-4" />
              <span>{t.tnauAdvisory}</span>
            </div>
            <p className="text-emerald-200/80">{diagnosis.tnauAdvisory}</p>
          </div>
        </div>
      )}

      {/* TAB 2: GOVERNMENT SCHEMES */}
      {activeTab === "schemes" && (
        <div className="space-y-5 animate-in fade-in duration-300">
          {/* Total Benefit Card */}
          <div className="rounded-2xl border border-amber-600/40 bg-gradient-to-r from-[#1c160b] to-[#120e06] p-5 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {t.totalBenefitsUnlocked}
                </span>
                <h3 className="mt-1 text-3xl font-black text-white">
                  ₹{schemes.totalEstimatedBenefitInr.toLocaleString('en-IN')}
                </h3>
                <p className="text-xs text-amber-200/80 mt-1">
                  {language === "ta" ? schemes.summaryNoteTamil : schemes.summaryNote}
                </p>
              </div>
              <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 text-center">
                <span className="text-xl font-bold text-amber-400">{schemes.matchedSchemes.length}</span>
                <span className="block text-[10px] text-amber-300/80 uppercase font-bold">Eligible Schemes</span>
              </div>
            </div>
          </div>

          {/* Scheme Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schemes.matchedSchemes.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl border border-emerald-900/60 bg-[#0b140e] p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                      {s.provider}
                    </span>
                    <span className="text-xs font-bold text-emerald-400">
                      {s.eligibilityScore}% Match
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white">{s.name}</h4>
                  <p className="text-xs font-semibold text-emerald-400 mb-2">{s.nameTamil}</p>
                  
                  <div className="rounded-xl bg-[#070e09] border border-emerald-900/40 p-2.5 text-xs text-amber-300 font-bold mb-3">
                    Benefit: ₹{s.estimatedBenefitInr.toLocaleString('en-IN')}
                  </div>

                  {/* Required Documents */}
                  <div className="text-[11px] text-emerald-200/80 space-y-1 mb-3">
                    <span className="font-bold text-emerald-400 block">{t.requiredDocs}:</span>
                    {s.requiredDocuments.slice(0, 3).map((doc, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3 w-3 text-emerald-400 flex-shrink-0" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-emerald-900/40 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-emerald-400/70 flex items-center gap-1">
                    <Phone className="h-3 w-3" /> {s.helpline}
                  </span>
                  <a
                    href={s.portalUrl.startsWith('http') ? s.portalUrl : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>Apply Portal</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MANDI MARKET INTELLIGENCE */}
      {activeTab === "market" && (
        <div className="space-y-5 animate-in fade-in duration-300">
          {/* AI Recommendation Verdict */}
          <div className="rounded-2xl border border-emerald-700/50 bg-[#0d1c13] p-5 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  {t.sellRecommendation}
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <h3 className="text-2xl font-black text-white">
                    {market.recommendation.replace(/_/g, " ")}
                  </h3>
                  <span className={`rounded-full px-3 py-0.5 text-xs font-extrabold uppercase ${
                    market.priceOutlook === "bullish"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-red-500/20 text-red-300 border border-red-500/40"
                  }`}>
                    {market.priceOutlook} Outlook
                  </span>
                </div>
                <p className="text-xs text-emerald-200/90 mt-2 leading-relaxed">
                  {language === "ta" ? market.recommendationReasonTamil : market.recommendationReason}
                </p>
              </div>

              <div className="rounded-xl bg-[#070e0a] border border-emerald-800/50 p-3.5 text-right">
                <span className="text-[10px] text-emerald-400 uppercase font-bold block">Best Mandi (Highest Net)</span>
                <span className="text-base font-bold text-white block">{market.bestMandi.name}</span>
                <span className="text-xl font-black text-emerald-400">₹{market.bestMandi.currentPrice}/Q</span>
              </div>
            </div>
          </div>

          {/* 30-Day Mandi Price Series Interactive Chart (Recharts) */}
          <div className="rounded-2xl border border-emerald-900/50 bg-[#09100c] p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                {t.mandiPriceTrends}
              </h4>
              <span className="text-xs text-amber-400 font-semibold font-mono">
                MSP Floor: ₹{market.mspPerQuintal}/Q
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={market.historical30Days}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#16281e" />
                  <XAxis dataKey="date" stroke="#4ade80" fontSize={10} tickLine={false} />
                  <YAxis stroke="#4ade80" fontSize={10} domain={['auto', 'auto']} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0a130e",
                      borderColor: "#1e382b",
                      borderRadius: "12px",
                      fontSize: "11px",
                      color: "#fff"
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                  <ReferenceLine
                    y={market.mspPerQuintal}
                    label={{ value: `MSP: ₹${market.mspPerQuintal}`, fill: "#f59e0b", fontSize: 10 }}
                    stroke="#f59e0b"
                    strokeDasharray="4 4"
                  />
                  {market.mandis.map((m, idx) => (
                    <Line
                      key={m.mandiName}
                      type="monotone"
                      dataKey={m.mandiName}
                      stroke={mandiColors[idx % mandiColors.length]}
                      strokeWidth={2}
                      dot={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: WEEKLY FARMER ACTION PLAN */}
      {activeTab === "actionPlan" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-900/40">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-emerald-400" />
              {t.weeklyTimeline}
            </h4>
            <span className="text-xs text-emerald-400/80 font-medium">
              4 Prioritized Steps
            </span>
          </div>

          <div className="space-y-3">
            {weeklyActionPlan.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-emerald-900/50 bg-[#0a130e] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-emerald-700/60 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-xs flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white text-xs">{item.day}</span>
                      <span className={`rounded px-1.5 py-0.2 text-[9px] font-bold uppercase ${
                        item.priority === 'Immediate' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {item.priority}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-medium">{item.category}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-100/90 font-medium">
                      {language === "ta" ? item.actionTamil : item.action}
                    </p>
                  </div>
                </div>

                <div className="sm:text-right pl-11 sm:pl-0">
                  <span className="inline-block rounded-lg bg-[#070e09] border border-emerald-800/40 px-3 py-1 text-xs font-bold text-amber-400">
                    {item.estimatedCostOrBenefit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
