import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    const { data } = await apiClient.get(`/api/dashboard/trends?type=${type}`);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch trend data' },
      { status: 500 }
    );
  }
}