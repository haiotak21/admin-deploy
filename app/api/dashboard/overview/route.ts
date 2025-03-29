import { apiClient } from "@/lib/api-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await apiClient.get("/api/dashboard/overview");
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
