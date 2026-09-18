import { MarketOutput, MandiDataSeries } from "@/types";

export interface CropMarketData {
  crop: string;
  mspPerQuintal: number;
  unit: string;
  trend: 'bullish' | 'bearish' | 'stable';
  recommendation: 'SELL_IMMEDIATELY' | 'HOLD_1_WEEK' | 'SPLIT_LOT_50_50';
  recommendationReason: string;
  recommendationReasonTamil: string;
  potentialGainPerQuintal: number;
  mandis: {
    name: string;
    district: string;
    distanceKm: number;
    basePrice: number;
    volatility: number;
  }[];
}

export const CROP_MARKET_CONFIG: Record<string, CropMarketData> = {
  "paddy": {
    crop: "Paddy (Ponni / IR-20)",
    mspPerQuintal: 2320, // 2024-25 MSP for Grade A Paddy is ₹2,320
    unit: "₹/Quintal",
    trend: "bullish",
    recommendation: "HOLD_1_WEEK",
    recommendationReason: "Cauvery delta arrivals are projected to tighten over the next 10 days due to festival mill procurement demand. Holding stock for 7-10 days yields an estimated +₹180/quintal upside over local village aggregator prices.",
    recommendationReasonTamil: "அடுத்த 10 நாட்களில் காவேரி டெல்டா நெல் வரத்து குறைந்து ஆலை கொள்முதல் தேவை அதிகரிக்கும். 1 வாரம் இருப்பு வைத்தால் குவிண்டாலுக்கு ₹180 கூடுதல் லாபம் பெறலாம்.",
    potentialGainPerQuintal: 180,
    mandis: [
      { name: "Kumbakonam Regulated Market", district: "Thanjavur", distanceKm: 24, basePrice: 2480, volatility: 25 },
      { name: "Tiruchirappalli Gandhi Market", district: "Tiruchirappalli", distanceKm: 58, basePrice: 2550, volatility: 35 },
      { name: "Madurai Mattuthavani Central Market", district: "Madurai", distanceKm: 140, basePrice: 2620, volatility: 40 },
      { name: "Koyambedu Wholesale Market", district: "Chennai", distanceKm: 320, basePrice: 2710, volatility: 50 },
      { name: "Erode APMC Market", district: "Erode", distanceKm: 185, basePrice: 2520, volatility: 30 }
    ]
  },
  "turmeric": {
    crop: "Turmeric (Erode Finger / Salem)",
    mspPerQuintal: 8500, // Benchmark floor price
    unit: "₹/Quintal",
    trend: "bullish",
    recommendation: "HOLD_1_WEEK",
    recommendationReason: "Export queries from UAE & Southeast Asia are surging with lower crop estimates from Nizamabad and Sangli. Erode mandi prices have broken resistance above ₹14,800/quintal.",
    recommendationReasonTamil: "ஏற்றுமதி தேவை உயர்வு மற்றும் மகசூல் குறைவு காரணமாக ஈரோடு சந்தையில் மஞ்சள் விலை தொடர்ந்து ஏறுமுகத்தில் உள்ளது. 1-2 வாரங்கள் வைத்திருக்க பரிந்துரைக்கப்படுகிறது.",
    potentialGainPerQuintal: 850,
    mandis: [
      { name: "Erode Agricultural Producers Co-op", district: "Erode", distanceKm: 12, basePrice: 15200, volatility: 180 },
      { name: "Salem Shevapet Market", district: "Salem", distanceKm: 65, basePrice: 14950, volatility: 150 },
      { name: "Gobichettipalayam Regulated Market", district: "Erode", distanceKm: 38, basePrice: 14800, volatility: 140 },
      { name: "Coimbatore MGR Wholesale Market", district: "Coimbatore", distanceKm: 95, basePrice: 14600, volatility: 120 },
      { name: "Tiruchirappalli Gandhi Market", district: "Tiruchirappalli", distanceKm: 145, basePrice: 14400, volatility: 110 }
    ]
  },
  "cotton": {
    crop: "Cotton (MCU-5 / DCH-32)",
    mspPerQuintal: 7121, // 2024-25 Medium Staple MSP
    unit: "₹/Quintal",
    trend: "bearish",
    recommendation: "SELL_IMMEDIATELY",
    recommendationReason: "Textile mill spinning demand in Tirupur/Coimbatore has softened due to yarn inventory backlogs. Incoming Gujarat harvest arrivals will exert further downward price pressure in 10 days.",
    recommendationReasonTamil: "நூற்பாலைகளில் நூல் தேவை குறைந்துள்ளதாலும், வெளிமாநில வரத்து அதிகரிக்க உள்ளதாலும் தற்போதைய விலையிலேயே உடனடியாக விற்பனை செய்வது சிறந்தது.",
    potentialGainPerQuintal: 0,
    mandis: [
      { name: "Pollachi Regulated Market", district: "Coimbatore", distanceKm: 28, basePrice: 7650, volatility: 60 },
      { name: "Rajapalayam Cotton Market", district: "Virudhunagar", distanceKm: 190, basePrice: 7780, volatility: 80 },
      { name: "Thevaram Regulated Market", district: "Theni", distanceKm: 160, basePrice: 7540, volatility: 70 },
      { name: "Tiruchengode Co-op Market", district: "Namakkal", distanceKm: 110, basePrice: 7490, volatility: 55 },
      { name: "Madurai Mattuthavani Central Market", district: "Madurai", distanceKm: 175, basePrice: 7600, volatility: 65 }
    ]
  },
  "banana": {
    crop: "Banana (Robusta / Grand Naine)",
    mspPerQuintal: 1800,
    unit: "₹/Quintal",
    trend: "stable",
    recommendation: "SPLIT_LOT_50_50",
    recommendationReason: "Stable daily retail consumption in Chennai and Madurai. Liquidate 50% lot immediately to maintain cash flow while holding 50% for upcoming weekend festive spike at Chinnamanur market.",
    recommendationReasonTamil: "சந்தையில் தேவை நிலையாக உள்ளது. 50% உடனடியாக விற்று பணமாக்கவும், மீதி 50% வார இறுதி பண்டிகை தேவைக்காக விற்கவும்.",
    potentialGainPerQuintal: 120,
    mandis: [
      { name: "Chinnamanur Banana Market", district: "Theni", distanceKm: 18, basePrice: 2350, volatility: 40 },
      { name: "Oddanchatram Central Market", district: "Dindigul", distanceKm: 82, basePrice: 2420, volatility: 50 },
      { name: "Madurai Mattuthavani Central Market", district: "Madurai", distanceKm: 78, basePrice: 2490, volatility: 45 },
      { name: "Tiruchirappalli Gandhi Market", district: "Tiruchirappalli", distanceKm: 165, basePrice: 2510, volatility: 55 },
      { name: "Koyambedu Wholesale Market", district: "Chennai", distanceKm: 460, basePrice: 2780, volatility: 70 }
    ]
  },
  "sugarcane": {
    crop: "Sugarcane",
    mspPerQuintal: 340, // FRP 2024-25 per quintal
    unit: "₹/Quintal",
    trend: "stable",
    recommendation: "SELL_IMMEDIATELY",
    recommendationReason: "Crushing season mill quotas in Erode and Cuddalore are fully active with government SAP incentive support. Direct delivery to designated cooperative sugar mills ensures assured payment.",
    recommendationReasonTamil: "சர்க்கரை ஆலைகளில் அரவை காலம் தீவிரமாக உள்ளதால் அரசு நிர்ணயித்த கூடுதல் விலையில் கூட்டுறவு ஆலைகளுக்கு உடனடியாக வழங்கவும்.",
    potentialGainPerQuintal: 15,
    mandis: [
      { name: "Sakthi Sugars Appakudal Mandi", district: "Erode", distanceKm: 32, basePrice: 355, volatility: 5 },
      { name: "MRK Co-op Sugar Mill Mandi", district: "Cuddalore", distanceKm: 85, basePrice: 350, volatility: 4 },
      { name: "Alanganallur Sugar Mill Center", district: "Madurai", distanceKm: 25, basePrice: 348, volatility: 5 }
    ]
  }
};

export function generateMarketIntelligence(cropName: string, districtName: string): MarketOutput {
  const normalizedCrop = Object.keys(CROP_MARKET_CONFIG).find(key => 
    cropName.toLowerCase().includes(key)
  ) || "paddy";

  const config = CROP_MARKET_CONFIG[normalizedCrop];
  const now = new Date();
  
  // Generate 30-day historical time-series data for each mandi
  const dates: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().slice(5, 10)); // e.g. "09-12"
  }

  const mandisSeries: MandiDataSeries[] = config.mandis.map((mandi, mIdx) => {
    // Generate trend trajectory
    const trendFactor = config.trend === "bullish" ? 1.003 : config.trend === "bearish" ? 0.997 : 1.0005;
    let runningPrice = mandi.basePrice * Math.pow(1 / trendFactor, 30);

    const dataPoints = dates.map((dateStr, dIdx) => {
      // Small realistic sine wave + pseudo-random fluctuation
      const cyclical = Math.sin((dIdx + mIdx * 2) / 3) * (mandi.volatility * 0.6);
      const randomNoise = ((Math.sin(dIdx * 13 + mIdx * 7) + 1) / 2) * mandi.volatility - (mandi.volatility / 2);
      runningPrice = Math.round((runningPrice * trendFactor) + (cyclical * 0.1) + randomNoise);
      
      return {
        date: dateStr,
        pricePerQuintal: runningPrice,
        modalPrice: Math.round(runningPrice * 0.98),
        arrivalsTonnes: Math.round(45 + Math.sin(dIdx + mIdx) * 20 + (dIdx * 0.8))
      };
    });

    const currentPrice = dataPoints[dataPoints.length - 1].pricePerQuintal;
    const sevenDaysAgoPrice = dataPoints[dataPoints.length - 8].pricePerQuintal;
    const sevenDayTrendPercent = Number((((currentPrice - sevenDaysAgoPrice) / sevenDaysAgoPrice) * 100).toFixed(1));

    return {
      mandiName: mandi.name,
      district: mandi.district,
      distanceKm: mandi.distanceKm,
      currentPricePerQuintal: currentPrice,
      sevenDayTrendPercent,
      dataPoints
    };
  });

  // Pivot 30-day data for easy Recharts consumption
  const historical30Days = dates.map((dateStr, dIdx) => {
    const row: { date: string; [key: string]: number | string } = { date: dateStr };
    mandisSeries.forEach(ms => {
      row[ms.mandiName] = ms.dataPoints[dIdx].pricePerQuintal;
    });
    return row;
  });

  // Find best mandi by net price after transportation deduction (~₹1.2 per quintal per km)
  const sortedByNet = [...mandisSeries].sort((a, b) => {
    const netA = a.currentPricePerQuintal - (a.distanceKm * 1.2);
    const netB = b.currentPricePerQuintal - (b.distanceKm * 1.2);
    return netB - netA;
  });

  const bestMandi = sortedByNet[0];
  const mspViolation = mandisSeries.some(m => m.currentPricePerQuintal < config.mspPerQuintal);

  return {
    crop: config.crop,
    mspPerQuintal: config.mspPerQuintal,
    bestMandi: {
      name: bestMandi.mandiName,
      district: bestMandi.district,
      currentPrice: bestMandi.currentPricePerQuintal,
      netBenefitPerQuintal: Math.max(bestMandi.currentPricePerQuintal - config.mspPerQuintal, 40)
    },
    mandis: mandisSeries,
    historical30Days,
    priceOutlook: config.trend,
    recommendation: config.recommendation,
    recommendationReason: config.recommendationReason,
    recommendationReasonTamil: config.recommendationReasonTamil,
    mspViolationDetected: mspViolation,
    mspViolationDetails: mspViolation 
      ? `Alert: Local price dips below statutory MSP floor of ₹${config.mspPerQuintal}/quintal. Consider selling only to Direct Purchase Centers (DPC) / Regulated Mandis.`
      : undefined,
    potentialRevenueGainInr: config.potentialGainPerQuintal * 40 // Assuming average 40 quintals lot
  };
}
