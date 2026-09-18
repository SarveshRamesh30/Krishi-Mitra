import { IntakeOutput, MarketOutput } from "@/types";
import { generateMarketIntelligence } from "@/data/mandiPrices";
import Anthropic from "@anthropic-ai/sdk";

export async function runMarketAgent(intake: IntakeOutput): Promise<MarketOutput> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  // Base market calculation
  const baseIntelligence = generateMarketIntelligence(intake.crop, intake.district);

  if (apiKey && apiKey.startsWith("sk-ant-")) {
    try {
      const anthropic = new Anthropic({ apiKey });
      const prompt = `You are the Market Intelligence Agent in Krishi Mitra for Tamil Nadu APMC mandis.
Given this crop and mandi data, provide an expert economic reasoning and recommendation (SELL_IMMEDIATELY, HOLD_1_WEEK, or SPLIT_LOT_50_50).

Crop: ${intake.crop}
District: ${intake.district}
MSP: ₹${baseIntelligence.mspPerQuintal}/quintal
Mandis: ${JSON.stringify(baseIntelligence.mandis.map(m => ({ name: m.mandiName, price: m.currentPricePerQuintal, trend7d: m.sevenDayTrendPercent })))}

Return ONLY a valid JSON object with:
{
  "recommendation": "SELL_IMMEDIATELY" | "HOLD_1_WEEK" | "SPLIT_LOT_50_50",
  "recommendationReason": "Comprehensive market reasoning in English",
  "recommendationReasonTamil": "சந்தை காரண விளக்கம் தமிழில்",
  "priceOutlook": "bullish" | "bearish" | "stable",
  "potentialRevenueGainInr": number
}`;

      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 800,
        messages: [{ role: "user", content: prompt }],
        system: "You are a senior agricultural economist specializing in Tamil Nadu APMC agricultural markets. Return pure JSON."
      });

      const text = response.content[0].type === "text" ? response.content[0].text : "";
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      return {
        ...baseIntelligence,
        recommendation: parsed.recommendation || baseIntelligence.recommendation,
        recommendationReason: parsed.recommendationReason || baseIntelligence.recommendationReason,
        recommendationReasonTamil: parsed.recommendationReasonTamil || baseIntelligence.recommendationReasonTamil,
        priceOutlook: parsed.priceOutlook || baseIntelligence.priceOutlook,
        potentialRevenueGainInr: parsed.potentialRevenueGainInr || baseIntelligence.potentialRevenueGainInr
      };
    } catch (e) {
      console.warn("Anthropic API fallback to local mandi market engine:", e);
    }
  }

  // Realistic latency for market intelligence aggregation
  await new Promise((resolve) => setTimeout(resolve, 420));
  return baseIntelligence;
}
