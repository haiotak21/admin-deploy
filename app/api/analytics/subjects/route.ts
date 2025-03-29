import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '5';
    
    const { data } = await apiClient.get(`/api/analytics/subjects?limit=${limit}`);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch subject data' },
      { status: 500 }
    );
  }
}