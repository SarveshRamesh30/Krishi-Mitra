import { NextRequest, NextResponse } from "next/server";
import { runSchemesAgent } from "@/lib/agents/schemesAgent";
import { FarmerProfile, IntakeOutput } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const farmer = body.farmerProfile as FarmerProfile;
    const intake = body.intake as IntakeOutput;

    if (!farmer) {
      return NextResponse.json({ error: "Missing farmerProfile in request body" }, { status: 400 });
    }

    const output = await runSchemesAgent(farmer, intake || {
      crop: farmer.crop,
      district: farmer.district,
      acreage: farmer.landSizeAcres,
      symptoms: [],
      durationDays: 3,
      urgency: "moderate",
      urgencyReason: "",
      financialSignals: { estimatedCropLossPercent: 30, hasLoan: false, seekingDripSubsidy: true },
      structuredSummary: "",
      confidenceScore: 90
    });

    return NextResponse.json(output);
  } catch (error: any) {
    console.error("Error in /api/agents/schemes:", error);
    return NextResponse.json({ error: error.message || "Schemes agent processing failed" }, { status: 500 });
  }
}
