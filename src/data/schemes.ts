import { SchemeRule, FarmerProfile } from "@/types";

export const TN_GOVT_SCHEMES: SchemeRule[] = [
  {
    id: "pm-kisan",
    name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    nameTamil: "பிரதமர் கிசான் சம்மான் நிதி திட்டம்",
    provider: "Central Govt",
    category: "Direct Income Support",
    description: "Income support of ₹6,000 per year in three equal installments of ₹2,000 directly credited to the bank accounts of all landholding farmer families.",
    descriptionTamil: "நிலமுள்ள அனைத்து விவசாய குடும்பங்களுக்கும் ஆண்டுக்கு ₹6,000 நிதி உதவி, மூன்று தவணைகளில் வங்கி கணக்கில் நேரடியாக செலுத்தப்படுகிறது.",
    maxBenefitAmountInr: 6000,
    benefitCalculation: (farmer: FarmerProfile) => {
      // Direct 6000/yr for landholding farmers
      return 6000;
    },
    eligibilityCheck: (farmer: FarmerProfile) => {
      // Must have landholding and annual income under 10L
      const eligible = farmer.landSizeAcres > 0 && farmer.annualIncome < 1000000;
      return {
        eligible,
        score: eligible ? 98 : 20,
        matchReasons: [
          `Verified landholder with ${farmer.landSizeAcres} acres in ${farmer.district}`,
          "Aadhaar-linked bank account eligible for direct DBT credit",
          "Farmer category satisfies marginal/small farmer criteria"
        ],
        failReasons: farmer.landSizeAcres <= 0 ? ["Must be a registered landholder."] : []
      };
    },
    requiredDocuments: [
      "Land Ownership Document (Patta / Chitta)",
      "Aadhaar Card copy",
      "Bank Passbook with active IFSC & NPCI seeding",
      "Field Inspection / VAO Certificate"
    ],
    applicationPortal: "https://pmkisan.gov.in",
    helpline: "155261 / 011-24300606",
    turnaroundDays: 14
  },
  {
    id: "pmfby-insurance",
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY) - TN Cluster",
    nameTamil: "பிரதம மந்திரி பயிர் காப்பீட்டுத் திட்டம் (PMFBY)",
    provider: "Central Govt",
    category: "Crop Insurance",
    description: "Comprehensive risk insurance covering yield losses due to non-preventable risks: localized pests, disease epidemics, inundation, and drought.",
    descriptionTamil: "பூச்சி மற்றும் நோய் தாக்குதல், வெள்ளம், வறட்சி போன்ற இயற்கை இடர்பாடுகளால் ஏற்படும் மகசூல் இழப்பிற்கு முழுமையான இழப்பீடு வழங்கும் பயிர் காப்பீட்டுத் திட்டம்.",
    maxBenefitAmountInr: 45000,
    benefitCalculation: (farmer: FarmerProfile, cropLossPercent = 35) => {
      // e.g. Scale of finance approx ₹32,000/acre in TN for Paddy/Cotton
      const scaleOfFinance = farmer.crop.toLowerCase().includes("paddy") ? 34000 : 38000;
      const claimedLoss = Math.min(Math.max(cropLossPercent, 20), 80);
      return Math.round(farmer.landSizeAcres * scaleOfFinance * (claimedLoss / 100));
    },
    eligibilityCheck: (farmer: FarmerProfile) => {
      const eligible = farmer.landSizeAcres > 0;
      return {
        eligible,
        score: eligible ? 95 : 15,
        matchReasons: [
          `${farmer.crop} is a notified crop in ${farmer.district} district for current season`,
          "Premium subsidized by TN State Government (farmer pays only 1.5% - 2%)",
          "Automatic settlement trigger upon local VAO/TNAU survey endorsement"
        ],
        failReasons: []
      };
    },
    requiredDocuments: [
      "Crop Sowing Certificate issued by VAO (Village Administrative Officer)",
      "Adangal copy from TN e-Services",
      "Patta / Land Record extract",
      "Bank Account details with Aadhaar seeding"
    ],
    applicationPortal: "https://pmfby.gov.in / TN Agrisnet",
    helpline: "1800-180-1551 (Kisan Call Center)",
    turnaroundDays: 30
  },
  {
    id: "tn-micro-irrigation",
    name: "Tamil Nadu Micro Irrigation Scheme (TN-MIP / PMKSY)",
    nameTamil: "தமிழ்நாடு நுண்ணீர்ப் பாசனத் திட்டம் (100% மானியம்)",
    provider: "Tamil Nadu State Govt",
    category: "Irrigation Subsidy",
    description: "100% subsidy for Small & Marginal farmers (up to 5 acres) and 75% subsidy for other farmers for installing Drip / Sprinkler Irrigation Systems.",
    descriptionTamil: "சிறு, குறு விவசாயிகளுக்கு 100% முழு மானியத்திலும், மற்ற விவசாயிகளுக்கு 75% மானியத்திலும் சொட்டு நீர் / தெளிப்பு நீர் பாசனம் அமைக்கும் திட்டம்.",
    maxBenefitAmountInr: 135000,
    benefitCalculation: (farmer: FarmerProfile) => {
      const ratePerAcre = 42000;
      const subsidyPercent = farmer.landSizeAcres <= 5 ? 1.0 : 0.75;
      return Math.round(Math.min(farmer.landSizeAcres, 5) * ratePerAcre * subsidyPercent);
    },
    eligibilityCheck: (farmer: FarmerProfile) => {
      const eligible = farmer.irrigationSource === "Borewell" || farmer.irrigationSource === "Canal (Cauvery)" || farmer.landSizeAcres <= 10;
      const isSmallMarginal = farmer.landSizeAcres <= 5;
      return {
        eligible,
        score: isSmallMarginal ? 96 : 85,
        matchReasons: [
          isSmallMarginal 
            ? "Eligible for 100% FULL SUBSIDY (Small/Marginal Farmer under 5 acres)" 
            : "Eligible for 75% State Government Subsidy",
          `Applicable for ${farmer.crop} cultivation in ${farmer.district}`,
          "Saves 50-60% water while increasing crop yield by 25-30%"
        ],
        failReasons: []
      };
    },
    requiredDocuments: [
      "Small / Marginal Farmer Certificate from Tahsildar / Revenue Department",
      "Patta, Chitta, FMB Sketch of land",
      "Water & Soil Test Report from TNAU / Govt Testing Lab",
      "Borewell / Well possession proof"
    ],
    applicationPortal: "https://tnhorticulture.tn.gov.in / TN Micro Irrigation Portal",
    helpline: "044-28524894 / Local Assistant Director of Horticulture",
    turnaroundDays: 21
  },
  {
    id: "kalaignar-scheme",
    name: "Kalaignar All Village Integrated Agriculture Development Programme (KAVIADP)",
    nameTamil: "கலைஞரின் அனைத்து கிராம ஒருங்கிணைந்த வேளாண் வளர்ச்சி திட்டம்",
    provider: "Tamil Nadu State Govt",
    category: "Soil & Inputs",
    description: "Flagship TN scheme providing free high-yield seed kits, coconut seedlings, soil conditioning gypsum, sprayers, and dryland irrigation infrastructure.",
    descriptionTamil: "இலவச தரமான விதை தொகுப்புகள், தென்னங்கன்றுகள், ஜிப்சம் உரம், விசைத்தெளிப்பான்கள் மற்றும் பாசன நீர் கட்டமைப்பு வழங்கும் தமிழக அரசின் முன்னோடி திட்டம்.",
    maxBenefitAmountInr: 18000,
    benefitCalculation: (farmer: FarmerProfile) => {
      return farmer.landSizeAcres <= 5 ? 14500 : 9000;
    },
    eligibilityCheck: (farmer: FarmerProfile) => {
      return {
        eligible: true,
        score: 92,
        matchReasons: [
          `Active coverage in rural village panchayats of ${farmer.district}`,
          "Provides 50% to 100% input subsidies on certified seeds and bio-fertilizers",
          "Free battery-operated backpack sprayer allocated per eligible farmer"
        ],
        failReasons: []
      };
    },
    requiredDocuments: [
      "Ration Card / Smart Card",
      "Patta copy",
      "Aadhaar Card",
      "Uzhavan App Registration ID"
    ],
    applicationPortal: "Uzhavan App (உழவன் செயலி) / Block Agriculture Office",
    helpline: "1800-425-4444 (Uzhavan Helpline)",
    turnaroundDays: 10
  },
  {
    id: "kisan-credit-card",
    name: "Kisan Credit Card (KCC) - Low Interest Crop Loan",
    nameTamil: "கிசான் கிரெடிட் கார்டு (KCC) - 4% குறைந்த வட்டி பயிர்க்கடன்",
    provider: "NABARD",
    category: "Credit / Loan",
    description: "Revolving crop cash credit at 7% baseline interest, reduced to an effective 4% per annum upon prompt repayment with 3% prompt repayment incentive.",
    descriptionTamil: "வருடத்திற்கு வெறும் 4% குறைந்த வட்டியில் (சரியான நேரத்தில் திரும்பச் செலுத்தினால்) பயிர் சாகுபடி செலவுகளுக்கு உடனடி கடன் வழங்கும் திட்டம்.",
    maxBenefitAmountInr: 160000,
    benefitCalculation: (farmer: FarmerProfile) => {
      const scalePerAcre = 40000;
      return Math.min(Math.round(farmer.landSizeAcres * scalePerAcre), 300000);
    },
    eligibilityCheck: (farmer: FarmerProfile) => {
      return {
        eligible: true,
        score: 90,
        matchReasons: [
          `Credit limit scale calculated based on ${farmer.landSizeAcres} acres of ${farmer.crop}`,
          "Collateral-free loan up to ₹1.60 Lakhs via Primary Agricultural Co-op Society (PACCS)",
          "Interest subvention of 3% makes net interest rate only 4% per annum"
        ],
        failReasons: []
      };
    },
    requiredDocuments: [
      "Land Ownership Documents (Patta, Chitta, Adangal)",
      "No Objection / No Dues Certificate from adjacent PACCS bank",
      "Identity & Residence Proof (Aadhaar / Voter ID)",
      "2 Passport size photographs"
    ],
    applicationPortal: "Local PACCS / Canara Bank / Indian Bank / State Bank of India",
    helpline: "1800-11-2211 / Nearest Co-operative Bank Branch",
    turnaroundDays: 7
  },
  {
    id: "soil-health-card",
    name: "National Soil Health Card Scheme (SHC)",
    nameTamil: "மண் வள அட்டை திட்டம்",
    provider: "Central Govt",
    category: "Soil & Inputs",
    description: "Comprehensive 12-parameter soil fertility analysis report with customized fertilizer recommendations (NPK + micronutrients) saving up to ₹3,500/acre in wasted inputs.",
    descriptionTamil: "12 வகையான மண் சத்துக்களை பரிசோதித்து, தேவையான உரங்களை மட்டும் துல்லியமாக பரிந்துரைக்கும் திட்டம்.",
    maxBenefitAmountInr: 4000,
    benefitCalculation: (farmer: FarmerProfile) => {
      return Math.round(farmer.landSizeAcres * 1200);
    },
    eligibilityCheck: (farmer: FarmerProfile) => {
      return {
        eligible: true,
        score: 99,
        matchReasons: [
          "100% Free soil testing provided by Tamil Nadu Department of Agriculture",
          "Prevents soil degradation and reduces excess nitrogen expenditure",
          "Customized for the specific soil type in your taluk"
        ],
        failReasons: []
      };
    },
    requiredDocuments: [
      "Soil sample collected according to grid method",
      "Farmer survey number and field boundary details",
      "Aadhaar Number"
    ],
    applicationPortal: "https://soilhealth.dac.gov.in / Block Soil Testing Laboratory",
    helpline: "1800-180-1551",
    turnaroundDays: 12
  },
  {
    id: "smam-mechanization",
    name: "Sub-Mission on Agricultural Mechanization (SMAM - TN)",
    nameTamil: "வேளாண் இயந்திரமயமாக்கல் துணை இயக்கம் (SMAM)",
    provider: "Tamil Nadu State Govt",
    category: "Machinery",
    description: "50% to 70% subsidy on purchase of power tillers, rotavators, paddy transplanters, drone sprayers, and combine harvesters.",
    descriptionTamil: "பவர் டில்லர், ரோட்டவேட்டர், நெல் நடவு இயந்திரம் மற்றும் ட்ரோன் தெளிப்பான்களுக்கு 50% முதல் 70% வரை அரசு மானியம்.",
    maxBenefitAmountInr: 120000,
    benefitCalculation: (farmer: FarmerProfile) => {
      return farmer.landSizeAcres <= 5 ? 75000 : 45000;
    },
    eligibilityCheck: (farmer: FarmerProfile) => {
      const eligible = farmer.landSizeAcres >= 1;
      return {
        eligible,
        score: 82,
        matchReasons: [
          "Priority allocation for Small/Marginal farmers and SC/ST farmers (50% subsidy)",
          "Applicable for mechanizing weeders, multi-crop threshers, and power sprayers",
          "Reduces farm labor shortage bottlenecks in Cauvery delta"
        ],
        failReasons: []
      };
    },
    requiredDocuments: [
      "Land Record Documents (Patta/Chitta)",
      "Community Certificate (for higher SC/ST subsidy slab)",
      "Bank Account details",
      "Quotation from authorized agricultural machinery dealer"
    ],
    applicationPortal: "https://aed.tn.gov.in (Agricultural Engineering Department)",
    helpline: "044-24348702",
    turnaroundDays: 25
  },
  {
    id: "tn-dryland-scheme",
    name: "Tamil Nadu Chief Minister's Dry Land Development Mission",
    nameTamil: "முதலமைச்சரின் மானாவாரி நில மேம்பாட்டு இயக்கம்",
    provider: "Tamil Nadu State Govt",
    category: "Soil & Inputs",
    description: "Cluster-based financial and technical support for rainfed/dryland farmers cultivating millets, pulses, cotton, and oilseeds.",
    descriptionTamil: "மானாவாரி விவசாயிகளுக்கு சிறுதானியங்கள், பருப்பு வகைகள், பருத்தி சாகுபடிக்கு சிறப்பு நிதி மற்றும் இடுபொருள் உதவி.",
    maxBenefitAmountInr: 12500,
    benefitCalculation: (farmer: FarmerProfile) => {
      return farmer.irrigationSource === "Rainfed" ? 12000 : 6000;
    },
    eligibilityCheck: (farmer: FarmerProfile) => {
      const isRainfed = farmer.irrigationSource === "Rainfed" || farmer.crop.toLowerCase().includes("cotton") || farmer.crop.toLowerCase().includes("groundnut");
      return {
        eligible: isRainfed,
        score: isRainfed ? 94 : 40,
        matchReasons: [
          `Targeted for dryland/rainfed agricultural clusters in ${farmer.district}`,
          "Free distribution of bio-fertilizer capsules and summer ploughing subsidy",
          "Includes crop contingency planning support"
        ],
        failReasons: !isRainfed ? ["Primary eligibility applies to rainfed/dryland farmers."] : []
      };
    },
    requiredDocuments: [
      "Patta / Chitta",
      "VAO Rainfed Land Classification Certificate",
      "Aadhaar Card copy",
      "Bank Passbook"
    ],
    applicationPortal: "Uzhavan App / Joint Director of Agriculture Office",
    helpline: "1800-425-4444",
    turnaroundDays: 14
  }
];
