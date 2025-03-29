import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'current_month';
    
    const { data } = await apiClient.get(`/api/revenue/transactions?period=${period}`);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}