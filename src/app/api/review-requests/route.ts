import { NextRequest, NextResponse } from "next/server";
import { getReviewRequests, addReviewRequest } from "@/db";

export async function GET() {
  return NextResponse.json(await getReviewRequests());
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newRequest = addReviewRequest(data);
  return NextResponse.json(newRequest, { status: 201 });
}
