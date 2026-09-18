import { NextRequest, NextResponse } from "next/server";
import { runMarketAgent } from "@/lib/agents/marketAgent";
import { IntakeOutput } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const intake = (await req.json()) as IntakeOutput;
    if (!intake || !intake.crop) {
      return NextResponse.json({ error: "Missing crop details in request body" }, { status: 400 });
    }

    const output = await runMarketAgent(intake);
    return NextResponse.json(output);
  } catch (error: any) {
    console.error("Error in /api/agents/market:", error);
    return NextResponse.json({ error: error.message || "Market agent processing failed" }, { status: 500 });
  }
}
