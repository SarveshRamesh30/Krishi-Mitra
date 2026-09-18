import { FarmerProfile, IntakeOutput, SchemeMatchingOutput, MatchedScheme } from "@/types";
import { TN_GOVT_SCHEMES } from "@/data/schemes";
import Anthropic from "@anthropic-ai/sdk";

export async function runSchemesAgent(
  farmer: FarmerProfile,
  intake: IntakeOutput
): Promise<SchemeMatchingOutput> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (apiKey && apiKey.startsWith("sk-ant-")) {
    try {
      const anthropic = new Anthropic({ apiKey });
      const prompt = `You are the Government Scheme Matching Agent in Krishi Mitra for Tamil Nadu.
Given the Farmer Profile and Intake data, evaluate eligibility against schemes like PM-KISAN, PMFBY Crop Insurance, TN Micro Irrigation 100% subsidy, KCC loan, Kalaignar scheme, and Soil Health Card.

Farmer: ${JSON.stringify(farmer)}
Intake: ${JSON.stringify(intake)}

Return ONLY a valid JSON object matching SchemeMatchingOutput:
{
  "totalEstimatedBenefitInr": number,
  "matchedSchemes": [
    {
      "id": "string",
      "name": "Scheme Name",
      "nameTamil": "திட்ட பெயர்",
      "provider": "Central Govt" | "Tamil Nadu State Govt" | "NABARD",
      "category": "string",
      "eligibilityScore": number (0-100),
      "isEligible": boolean,
      "estimatedBenefitInr": number,
      "benefitDescription": "string",
      "benefitDescriptionTamil": "string",
      "matchReasons": ["reason1", "reason2"],
      "requiredDocuments": ["doc1", "doc2"],
      "applicationSteps": ["step1", "step2"],
      "portalUrl": "string",
      "helpline": "string"
    }
  ],
  "topRecommendationId": "string",
  "immediateActionRequired": "string",
  "summaryNote": "string",
  "summaryNoteTamil": "string"
}`;

      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
        system: "You are an expert Tamil Nadu Department of Agriculture welfare consultant. Output pure JSON."
      });

      const text = response.content[0].type === "text" ? response.content[0].text : "";
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned) as SchemeMatchingOutput;
      return parsed;
    } catch (e) {
      console.warn("Anthropic API fallback to autonomous local schemes engine:", e);
    }
  }

  // Autonomous Scheme Rule Evaluation Engine with realistic latency
  await new Promise((resolve) => setTimeout(resolve, 480));

  let totalBenefit = 0;
  const matchedList: MatchedScheme[] = [];

  for (const scheme of TN_GOVT_SCHEMES) {
    const { eligible, score, matchReasons } = scheme.eligibilityCheck(farmer);
    if (eligible) {
      const benefitAmount = scheme.benefitCalculation(
        farmer, 
        intake.financialSignals?.estimatedCropLossPercent || 35
      );
      totalBenefit += benefitAmount;

      matchedList.push({
        id: scheme.id,
        name: scheme.name,
        nameTamil: scheme.nameTamil,
        provider: scheme.provider,
        category: scheme.category,
        eligibilityScore: score,
        isEligible: true,
        estimatedBenefitInr: benefitAmount,
        benefitDescription: `Eligible for ₹${benefitAmount.toLocaleString('en-IN')} assistance based on ${farmer.landSizeAcres} acres landholding in ${farmer.district}.`,
        benefitDescriptionTamil: `${farmer.district} மாவட்டத்தில் உள்ள உங்கள் ${farmer.landSizeAcres} ஏக்கர் நிலத்திற்கு ₹${benefitAmount.toLocaleString('en-IN')} வரை பலன் பெறலாம்.`,
        matchReasons,
        requiredDocuments: scheme.requiredDocuments,
        applicationSteps: [
          `Step 1: Collect your ${scheme.requiredDocuments[0]} and Aadhaar card.`,
          `Step 2: Submit online via ${scheme.applicationPortal} or visit local Block Agriculture Office / PACCS.`,
          `Step 3: Verification by VAO / Horticultural Officer within ${scheme.turnaroundDays} working days.`
        ],
        portalUrl: scheme.applicationPortal,
        helpline: scheme.helpline
      });
    }
  }

  // Sort by highest benefit amount & score
  matchedList.sort((a, b) => b.estimatedBenefitInr - a.estimatedBenefitInr);

  const topScheme = matchedList[0] || {
    id: "pm-kisan",
    name: "PM-KISAN",
    estimatedBenefitInr: 6000
  };

  return {
    totalEstimatedBenefitInr: totalBenefit,
    matchedSchemes: matchedList,
    topRecommendationId: topScheme.id,
    immediateActionRequired: `Submit application for ${topScheme.name} to claim up to ₹${topScheme.estimatedBenefitInr.toLocaleString('en-IN')} immediate assistance.`,
    summaryNote: `Matched ${matchedList.length} Central & Tamil Nadu government schemes for ${farmer.name || 'Farmer'} unlocking up to ₹${totalBenefit.toLocaleString('en-IN')} in direct subsidies, insurance coverage, and credit.`,
    summaryNoteTamil: `உங்கள் நில விவரங்களின்படி ${matchedList.length} அரசு திட்டங்கள் மூலம் மொத்தம் ₹${totalBenefit.toLocaleString('en-IN')} வரை நேரடி மானியங்கள் மற்றும் நிவாரண உதவிகள் பெற வாய்ப்புள்ளது.`
  };
}
