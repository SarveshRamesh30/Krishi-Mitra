import { NextRequest, NextResponse } from "next/server";
import { runIntakeAgent } from "@/lib/agents/intakeAgent";
import { FarmerQuery } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as FarmerQuery;
    if (!body || !body.rawText) {
      return NextResponse.json({ error: "Missing rawText in request body" }, { status: 400 });
    }

    const output = await runIntakeAgent(body);
    return NextResponse.json(output);
  } catch (error: any) {
    console.error("Error in /api/agents/intake:", error);
    return NextResponse.json({ error: error.message || "Intake agent processing failed" }, { status: 500 });
  }
}
