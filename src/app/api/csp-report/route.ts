import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.warn("[CSP Violation]", JSON.stringify(body));
  } catch {
    // ignore malformed reports
  }
  return new NextResponse(null, { status: 204 });
}
