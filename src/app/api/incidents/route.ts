import { NextRequest, NextResponse } from 'next/server';
import { mockIncidents } from '@/lib/mockData';
import type { Incident } from '@/types';

// GET /api/incidents - List all incidents
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');
  const risk = searchParams.get('risk');
  const search = searchParams.get('search');

  let filtered = [...mockIncidents];

  if (status && status !== 'all') {
    filtered = filtered.filter(i => i.status === status);
  }

  if (risk && risk !== 'all') {
    filtered = filtered.filter(i => i.risk === risk);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(i =>
      i.title.toLowerCase().includes(searchLower) ||
      i.platform.toLowerCase().includes(searchLower) ||
      i.type.toLowerCase().includes(searchLower)
    );
  }

  return NextResponse.json({
    success: true,
    data: filtered,
  });
}

// POST /api/incidents - Create new incident
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newIncident: Incident = {
      id: `inc-${Date.now()}`,
      title: body.title,
      thumbnail: '/placeholder.jpg',
      platform: body.platform,
      type: body.type,
      risk: 'Medium',
      similarity: Math.floor(Math.random() * 20) + 80,
      status: 'New',
      url: body.url,
      date: new Date().toISOString(),
      userId: 'user-1',
      description: body.description,
    };

    // In real backend, this would be saved to database
    mockIncidents.push(newIncident);

    return NextResponse.json({
      success: true,
      data: newIncident,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create incident' },
      { status: 500 }
    );
  }
}