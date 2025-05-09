import { NextRequest, NextResponse } from "next/server";
import { getReviewRequests, addReviewRequest } from "@/data/sample-data";

export async function GET() {
  return NextResponse.json(getReviewRequests());
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newRequest = addReviewRequest(data);
  return NextResponse.json(newRequest, { status: 201 });
}
