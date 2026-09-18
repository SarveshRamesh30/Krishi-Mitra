import { NextRequest, NextResponse } from "next/server";
import { runOrchestrator } from "@/lib/agents/orchestrator";
import { FarmerQuery } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as FarmerQuery;
    if (!body || !body.rawText) {
      return NextResponse.json({ error: "Missing rawText in request body" }, { status: 400 });
    }

    const output = await runOrchestrator(body);
    return NextResponse.json(output);
  } catch (error: any) {
    console.error("Error in /api/agents/orchestrate:", error);
    return NextResponse.json({ error: error.message || "Master orchestrator failed" }, { status: 500 });
  }
}
