import { NextRequest, NextResponse } from 'next/server';

// Mock whitelist data
const mockWhitelist = [
  {
    id: 'wl-001',
    title: 'The Avengers (Official)',
    type: 'Movie',
    author: 'Marvel Studios',
    platform: 'Netflix',
    addedBy: 'Admin',
    addedAt: '2025-03-01T00:00:00Z',
    reason: 'Official distributor license',
  },
  {
    id: 'wl-002',
    title: 'Taylor Swift - Albums',
    type: 'Music',
    author: 'Taylor Swift',
    platform: 'Spotify',
    addedBy: 'Admin',
    addedAt: '2025-03-05T00:00:00Z',
    reason: 'Licensed content',
  },
];

// Mock blacklist data
const mockBlacklist = [
  {
    id: 'bl-001',
    keyword: 'CAM Rip',
    type: 'Movie',
    addedBy: 'Admin',
    addedAt: '2025-03-01T00:00:00Z',
    severity: 'high',
  },
  {
    id: 'bl-002',
    keyword: 'Cracked Software',
    type: 'Software',
    addedBy: 'Admin',
    addedAt: '2025-03-02T00:00:00Z',
    severity: 'critical',
  },
];

// GET /api/content/whitelist
export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockWhitelist,
  });
}

// POST /api/content/whitelist
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newEntry = {
      id: `wl-${Date.now()}`,
      title: body.title,
      type: body.type,
      author: body.author,
      platform: body.platform,
      addedBy: 'Admin',
      addedAt: new Date().toISOString(),
      reason: body.reason || '',
    };

    mockWhitelist.push(newEntry);

    return NextResponse.json({
      success: true,
      data: newEntry,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to add to whitelist' },
      { status: 500 }
    );
  }
}

// Export blacklist for other route
export { mockBlacklist };