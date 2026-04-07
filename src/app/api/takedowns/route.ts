import { NextRequest, NextResponse } from 'next/server';

// Mock takedowns data
const mockTakedowns = [
  {
    id: 'tk-001',
    incidentId: '1',
    userId: 'user-1',
    platform: 'Netflix',
    status: 'Completed',
    submittedAt: '2025-04-01T10:30:00Z',
    completedAt: '2025-04-02T14:00:00Z',
    reason: 'Copyright infringement - CAM recording',
    notes: 'Successfully removed from platform within 24 hours',
  },
  {
    id: 'tk-002',
    incidentId: '2',
    userId: 'user-1',
    platform: 'YouTube',
    status: 'Submitted',
    submittedAt: '2025-04-02T14:20:00Z',
    reason: 'Music album copyright violation',
    notes: 'Awaiting platform response',
  },
  {
    id: 'tk-003',
    incidentId: '3',
    userId: 'user-1',
    platform: 'Twitter',
    status: 'Pending',
    submittedAt: '2025-04-03T09:15:00Z',
    reason: 'Software crack distribution',
    notes: 'Processing DMCA request',
  },
];

// GET /api/takedowns
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');

  let filtered = [...mockTakedowns];

  if (status && status !== 'all') {
    filtered = filtered.filter(t => t.status === status);
  }

  return NextResponse.json({
    success: true,
    data: filtered,
  });
}

// POST /api/takedowns
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newTakedown = {
      id: `tk-${Date.now()}`,
      incidentId: body.incidentId || null,
      userId: 'user-1',
      platform: body.platform,
      status: 'Pending',
      submittedAt: new Date().toISOString(),
      reason: body.reason,
      notes: body.notes || '',
    };

    mockTakedowns.push(newTakedown);

    return NextResponse.json({
      success: true,
      data: newTakedown,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create takedown' },
      { status: 500 }
    );
  }
}