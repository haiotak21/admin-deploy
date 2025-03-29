import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';

export async function GET(
  request: Request,
  { params }: { params: { type: string } }
) {
  try {
    const { data } = await apiClient.get(`/api/content/sets?type=${params.type}`);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch content data' },
      { status: 500 }
    );
  }
}