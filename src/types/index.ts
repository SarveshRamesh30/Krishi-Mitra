export type UrgencyLevel = 'low' | 'moderate' | 'high' | 'critical';
export type AgentStatus = 'idle' | 'running' | 'success' | 'error';
export type Language = 'en' | 'ta';
export type ViewMode = 'farmer' | 'technical';

export interface FarmerProfile {
  id: string;
  name: string;
  phone?: string;
  district: string;
  taluk?: string;
  landSizeAcres: number;
  crop: string;
  annualIncome: number;
  category: 'Marginal (<2.5 acres)' | 'Small (2.5-5 acres)' | 'Medium/Large (>5 acres)';
  irrigationSource: 'Canal (Cauvery)' | 'Borewell' | 'Rainfed' | 'Drip/Sprinkler';
}

export interface FarmerQuery {
  rawText: string;
  farmerProfile: FarmerProfile;
  audioSimulated?: boolean;
}

export interface IntakeOutput {
  crop: string;
  cropTamil?: string;
  district: string;
  acreage: number;
  symptoms: string[];
  durationDays: number;
  urgency: UrgencyLevel;
  urgencyReason: string;
  financialSignals: {
    estimatedCropLossPercent: number;
    hasLoan: boolean;
    seekingDripSubsidy: boolean;
  };
  structuredSummary: string;
  confidenceScore: number;
}

export interface TreatmentItem {
  type: 'organic' | 'chemical' | 'cultural' | 'preventative';
  title: string;
  titleTa?: string;
  description: string;
  descriptionTa?: string;
  dosage?: string;
  schedule: string;
  costEstimateInr: number;
  safetyNote?: string;
}

export interface DiseaseKnowledgeItem {
  id: string;
  crop: string;
  diseaseName: string;
  diseaseNameTamil: string;
  pathogen: string;
  favorableConditions: string;
  symptoms: string[];
  severityDefault: UrgencyLevel;
  treatments: TreatmentItem[];
  preventionAdvisory: string;
  tnauAdvisoryUrl?: string;
}

export interface DiagnosisOutput {
  diseaseName: string;
  diseaseNameTamil: string;
  pathogen: string;
  confidenceScore: number;
  severity: UrgencyLevel;
  urgencyReason: string;
  symptomMatches: string[];
  organicTreatments: TreatmentItem[];
  chemicalTreatments: TreatmentItem[];
  preventativeSteps: string[];
  tnauAdvisory: string;
  expertExplanation: string;
  farmerExplanation: string;
  farmerExplanationTamil: string;
}

export interface SchemeRule {
  id: string;
  name: string;
  nameTamil: string;
  provider: 'Central Govt' | 'Tamil Nadu State Govt' | 'NABARD';
  description: string;
  descriptionTamil: string;
  category: 'Direct Income Support' | 'Crop Insurance' | 'Irrigation Subsidy' | 'Credit / Loan' | 'Soil & Inputs' | 'Machinery';
  maxBenefitAmountInr: number;
  benefitCalculation: (farmer: FarmerProfile, cropLossPercent?: number) => number;
  eligibilityCheck: (farmer: FarmerProfile) => { eligible: boolean; score: number; matchReasons: string[]; failReasons: string[] };
  requiredDocuments: string[];
  applicationPortal: string;
  helpline: string;
  turnaroundDays: number;
}

export interface MatchedScheme {
  id: string;
  name: string;
  nameTamil: string;
  provider: string;
  category: string;
  eligibilityScore: number; // 0 - 100%
  isEligible: boolean;
  estimatedBenefitInr: number;
  benefitDescription: string;
  benefitDescriptionTamil?: string;
  matchReasons: string[];
  requiredDocuments: string[];
  applicationSteps: string[];
  applicationStepsTamil?: string[];
  portalUrl: string;
  helpline: string;
}

export interface SchemeMatchingOutput {
  totalEstimatedBenefitInr: number;
  matchedSchemes: MatchedScheme[];
  topRecommendationId: string;
  immediateActionRequired: string;
  summaryNote: string;
  summaryNoteTamil: string;
}

export interface MandiPricePoint {
  date: string;
  pricePerQuintal: number;
  modalPrice: number;
  arrivalsTonnes: number;
}

export interface MandiDataSeries {
  mandiName: string;
  district: string;
  distanceKm: number;
  currentPricePerQuintal: number;
  sevenDayTrendPercent: number;
  dataPoints: MandiPricePoint[];
}

export interface MarketOutput {
  crop: string;
  mspPerQuintal: number;
  bestMandi: {
    name: string;
    district: string;
    currentPrice: number;
    netBenefitPerQuintal: number; // vs MSP or local mandi
  };
  mandis: MandiDataSeries[];
  historical30Days: {
    date: string;
    [mandiKey: string]: number | string;
  }[];
  priceOutlook: 'bullish' | 'bearish' | 'stable';
  recommendation: 'SELL_IMMEDIATELY' | 'HOLD_1_WEEK' | 'SPLIT_LOT_50_50';
  recommendationReason: string;
  recommendationReasonTamil: string;
  mspViolationDetected: boolean;
  mspViolationDetails?: string;
  potentialRevenueGainInr: number;
}

export interface ActionPlanItem {
  day: string;
  category: 'Disease Action' | 'Govt Scheme' | 'Market & Mandi' | 'Preventative';
  priority: 'Immediate' | 'High' | 'Routine';
  action: string;
  actionTamil: string;
  estimatedCostOrBenefit: string;
}

export interface OrchestratorOutput {
  farmerId: string;
  intake: IntakeOutput;
  diagnosis: DiagnosisOutput;
  schemes: SchemeMatchingOutput;
  market: MarketOutput;
  weeklyActionPlan: ActionPlanItem[];
  executiveSummary: string;
  executiveSummaryTamil: string;
  simplifiedFarmerSummary: string;
  simplifiedFarmerSummaryTamil: string;
  executionMetrics: {
    totalDurationMs: number;
    agentTimings: {
      intakeMs: number;
      diagnosisMs: number;
      schemesMs: number;
      marketMs: number;
      orchestrationMs: number;
    };
    parallelExecutionSavingsMs: number;
    modelUsed: string;
    timestamp: string;
  };
}

export interface AgentLog {
  agentName: 'Intake' | 'Diagnosis' | 'Schemes' | 'Market' | 'Orchestrator';
  status: AgentStatus;
  durationMs: number;
  timestamp: string;
  message: string;
  outputSummary?: string;
}
