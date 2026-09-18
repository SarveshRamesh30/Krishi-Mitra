import { NextRequest, NextResponse } from "next/server";
import { runDiagnosisAgent } from "@/lib/agents/diagnosisAgent";
import { IntakeOutput } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const intake = (await req.json()) as IntakeOutput;
    if (!intake || !intake.crop) {
      return NextResponse.json({ error: "Missing structured intake in request body" }, { status: 400 });
    }

    const output = await runDiagnosisAgent(intake);
    return NextResponse.json(output);
  } catch (error: any) {
    console.error("Error in /api/agents/diagnose:", error);
    return NextResponse.json({ error: error.message || "Diagnosis agent processing failed" }, { status: 500 });
  }
}
