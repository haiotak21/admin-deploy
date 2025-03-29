import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30';
    
    const { data } = await apiClient.get(`/api/analytics/engagement?period=${period}`);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch engagement data' },
      { status: 500 }
    );
  }
}