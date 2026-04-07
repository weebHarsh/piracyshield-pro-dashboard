import { NextRequest, NextResponse } from 'next/server';
import { mockBlacklist } from '../whitelist/route';

// GET /api/content/blacklist
export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockBlacklist,
  });
}

// POST /api/content/blacklist
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newEntry = {
      id: `bl-${Date.now()}`,
      keyword: body.keyword,
      type: body.type,
      addedBy: 'Admin',
      addedAt: new Date().toISOString(),
      severity: body.severity || 'high',
    };

    mockBlacklist.push(newEntry);

    return NextResponse.json({
      success: true,
      data: newEntry,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to add to blacklist' },
      { status: 500 }
    );
  }
}