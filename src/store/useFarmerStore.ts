import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  FarmerProfile, 
  OrchestratorOutput, 
  AgentStatus, 
  Language, 
  ViewMode, 
  AgentLog 
} from '@/types';
import { TN_FARMER_PRESETS, FarmerPreset } from '@/data/presets';

export interface PipelineState {
  intake: { status: AgentStatus; durationMs: number };
  diagnosis: { status: AgentStatus; durationMs: number };
  schemes: { status: AgentStatus; durationMs: number };
  market: { status: AgentStatus; durationMs: number };
  orchestrator: { status: AgentStatus; durationMs: number };
}

export interface SessionHistoryItem {
  id: string;
  timestamp: string;
  farmerName: string;
  district: string;
  crop: string;
  diseaseName: string;
  totalBenefitsInr: number;
  output: OrchestratorOutput;
}

interface FarmerStoreState {
  // Localization & View
  language: Language;
  viewMode: ViewMode;
  setLanguage: (lang: Language) => void;
  setViewMode: (mode: ViewMode) => void;

  // Active Query & Profile
  selectedPreset: FarmerPreset | null;
  activeProfile: FarmerProfile;
  rawQueryText: string;
  isListeningAudio: boolean;
  setSelectedPreset: (preset: FarmerPreset) => void;
  setActiveProfile: (profile: FarmerProfile) => void;
  setRawQueryText: (text: string) => void;
  setIsListeningAudio: (listening: boolean) => void;

  // Pipeline Execution State
  isPipelineRunning: boolean;
  pipelineProgress: number; // 0 - 100%
  pipelineState: PipelineState;
  agentLogs: AgentLog[];
  orchestratorOutput: OrchestratorOutput | null;

  // Actions
  resetPipeline: () => void;
  runFullPipeline: () => Promise<void>;

  // Session History
  history: SessionHistoryItem[];
  saveToHistory: (output: OrchestratorOutput) => void;
  loadFromHistory: (item: SessionHistoryItem) => void;
  clearHistory: () => void;
}

const initialProfile: FarmerProfile = TN_FARMER_PRESETS[0].farmerProfile;

export const useFarmerStore = create<FarmerStoreState>()(
  persist(
    (set, get) => ({
      language: 'en',
      viewMode: 'farmer',
      setLanguage: (language) => set({ language }),
      setViewMode: (viewMode) => set({ viewMode }),

      selectedPreset: TN_FARMER_PRESETS[0],
      activeProfile: initialProfile,
      rawQueryText: TN_FARMER_PRESETS[0].rawText,
      isListeningAudio: false,

      setSelectedPreset: (preset) => set({
        selectedPreset: preset,
        activeProfile: preset.farmerProfile,
        rawQueryText: get().language === 'ta' ? preset.rawTextTa : preset.rawText
      }),
      setActiveProfile: (activeProfile) => set({ activeProfile }),
      setRawQueryText: (rawQueryText) => set({ rawQueryText }),
      setIsListeningAudio: (isListeningAudio) => set({ isListeningAudio }),

      isPipelineRunning: false,
      pipelineProgress: 0,
      pipelineState: {
        intake: { status: 'idle', durationMs: 0 },
        diagnosis: { status: 'idle', durationMs: 0 },
        schemes: { status: 'idle', durationMs: 0 },
        market: { status: 'idle', durationMs: 0 },
        orchestrator: { status: 'idle', durationMs: 0 }
      },
      agentLogs: [],
      orchestratorOutput: null,

      resetPipeline: () => set({
        isPipelineRunning: false,
        pipelineProgress: 0,
        pipelineState: {
          intake: { status: 'idle', durationMs: 0 },
          diagnosis: { status: 'idle', durationMs: 0 },
          schemes: { status: 'idle', durationMs: 0 },
          market: { status: 'idle', durationMs: 0 },
          orchestrator: { status: 'idle', durationMs: 0 }
        },
        agentLogs: []
      }),

      runFullPipeline: async () => {
        const { rawQueryText, activeProfile } = get();
        if (!rawQueryText.trim()) return;

        set({
          isPipelineRunning: true,
          pipelineProgress: 10,
          orchestratorOutput: null,
          agentLogs: [],
          pipelineState: {
            intake: { status: 'running', durationMs: 0 },
            diagnosis: { status: 'idle', durationMs: 0 },
            schemes: { status: 'idle', durationMs: 0 },
            market: { status: 'idle', durationMs: 0 },
            orchestrator: { status: 'idle', durationMs: 0 }
          }
        });

        const log = (name: AgentLog['agentName'], status: AgentStatus, message: string, durationMs = 0) => {
          set((state) => ({
            agentLogs: [
              ...state.agentLogs,
              { agentName: name, status, durationMs, timestamp: new Date().toLocaleTimeString(), message }
            ]
          }));
        };

        try {
          // STEP 1: Intake Agent
          log('Intake', 'running', `Analyzing farmer input for ${activeProfile.name} in ${activeProfile.district}...`);
          const intakeStart = Date.now();
          
          const intakeRes = await fetch('/api/agents/intake', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rawText: rawQueryText, farmerProfile: activeProfile })
          });
          const intakeData = await intakeRes.json();
          const intakeMs = Date.now() - intakeStart;

          set((state) => ({
            pipelineProgress: 35,
            pipelineState: {
              ...state.pipelineState,
              intake: { status: 'success', durationMs: intakeMs },
              diagnosis: { status: 'running', durationMs: 0 },
              schemes: { status: 'running', durationMs: 0 }
            }
          }));
          log('Intake', 'success', `Extracted crop (${intakeData.crop}), ${intakeData.symptoms.length} symptoms, urgency: ${intakeData.urgency.toUpperCase()}`, intakeMs);

          // STEP 2: PARALLEL EXECUTION: Diagnosis + Schemes
          log('Diagnosis', 'running', `Matching foliar symptoms against TNAU / ICAR disease catalog...`);
          log('Schemes', 'running', `Evaluating 8 central/TN government schemes for ${activeProfile.landSizeAcres} acres...`);

          const parallelStart = Date.now();
          const [diagRes, schemeRes] = await Promise.all([
            fetch('/api/agents/diagnose', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(intakeData)
            }),
            fetch('/api/agents/schemes', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ farmerProfile: activeProfile, intake: intakeData })
            })
          ]);

          const diagData = await diagRes.json();
          const schemeData = await schemeRes.json();
          const parallelMs = Date.now() - parallelStart;

          set((state) => ({
            pipelineProgress: 75,
            pipelineState: {
              ...state.pipelineState,
              diagnosis: { status: 'success', durationMs: parallelMs },
              schemes: { status: 'success', durationMs: parallelMs },
              market: { status: 'running', durationMs: 0 }
            }
          }));

          log('Diagnosis', 'success', `Diagnosed '${diagData.diseaseName}' (${diagData.confidenceScore}% confidence)`, parallelMs);
          log('Schemes', 'success', `Unlocked ${schemeData.matchedSchemes.length} schemes totaling ₹${schemeData.totalEstimatedBenefitInr.toLocaleString('en-IN')}`, parallelMs);

          // STEP 3: Market Agent
          log('Market', 'running', `Analyzing 30-day time-series across APMC mandis for ${intakeData.crop}...`);
          const marketStart = Date.now();
          const marketRes = await fetch('/api/agents/market', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(intakeData)
          });
          const marketData = await marketRes.json();
          const marketMs = Date.now() - marketStart;

          set((state) => ({
            pipelineProgress: 90,
            pipelineState: {
              ...state.pipelineState,
              market: { status: 'success', durationMs: marketMs },
              orchestrator: { status: 'running', durationMs: 0 }
            }
          }));
          log('Market', 'success', `Generated market outlook: ${marketData.recommendation} at ${marketData.bestMandi.name}`, marketMs);

          // STEP 4: Orchestrator Synthesis
          log('Orchestrator', 'running', `Synthesizing final 7-day action plan...`);
          const orchStart = Date.now();
          const orchRes = await fetch('/api/agents/orchestrate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rawText: rawQueryText, farmerProfile: activeProfile })
          });
          const finalOutput: OrchestratorOutput = await orchRes.json();
          const orchMs = Date.now() - orchStart;

          set((state) => ({
            isPipelineRunning: false,
            pipelineProgress: 100,
            orchestratorOutput: finalOutput,
            pipelineState: {
              ...state.pipelineState,
              orchestrator: { status: 'success', durationMs: orchMs }
            }
          }));
          log('Orchestrator', 'success', `Full multi-agent pipeline completed in ${finalOutput.executionMetrics.totalDurationMs}ms`, orchMs);

          // Save to Session Memory
          get().saveToHistory(finalOutput);

        } catch (err: any) {
          console.error("Pipeline execution error:", err);
          set({
            isPipelineRunning: false,
            pipelineState: {
              intake: { status: 'error', durationMs: 0 },
              diagnosis: { status: 'error', durationMs: 0 },
              schemes: { status: 'error', durationMs: 0 },
              market: { status: 'error', durationMs: 0 },
              orchestrator: { status: 'error', durationMs: 0 }
            }
          });
          log('Orchestrator', 'error', `Pipeline execution failed: ${err.message || 'Unknown error'}`);
        }
      },

      history: [],
      saveToHistory: (output: OrchestratorOutput) => {
        const item: SessionHistoryItem = {
          id: `session-${Date.now()}`,
          timestamp: new Date().toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          farmerName: output.intake.crop ? get().activeProfile.name : "Farmer",
          district: output.intake.district,
          crop: output.intake.crop,
          diseaseName: output.diagnosis.diseaseName,
          totalBenefitsInr: output.schemes.totalEstimatedBenefitInr,
          output
        };
        set((state) => ({
          history: [item, ...state.history.slice(0, 9)] // Keep last 10
        }));
      },
      loadFromHistory: (item: SessionHistoryItem) => {
        set({
          orchestratorOutput: item.output,
          activeProfile: {
            ...get().activeProfile,
            name: item.farmerName,
            district: item.district,
            crop: item.crop
          },
          rawQueryText: item.output.intake.structuredSummary,
          pipelineProgress: 100,
          pipelineState: {
            intake: { status: 'success', durationMs: item.output.executionMetrics.agentTimings.intakeMs },
            diagnosis: { status: 'success', durationMs: item.output.executionMetrics.agentTimings.diagnosisMs },
            schemes: { status: 'success', durationMs: item.output.executionMetrics.agentTimings.schemesMs },
            market: { status: 'success', durationMs: item.output.executionMetrics.agentTimings.marketMs },
            orchestrator: { status: 'success', durationMs: item.output.executionMetrics.agentTimings.orchestrationMs }
          }
        });
      },
      clearHistory: () => set({ history: [] })
    }),
    {
      name: 'krishi-mitra-farmer-storage',
      partialize: (state) => ({ history: state.history, language: state.language, viewMode: state.viewMode })
    }
  )
);
