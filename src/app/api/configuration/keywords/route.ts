import { NextRequest, NextResponse } from 'next/server';

const mockKeywords = [
  { id: 'kw-001', keyword: 'CAM Rip', category: 'Movie', addedBy: 'Admin', addedAt: '2025-03-01T00:00:00Z' },
  { id: 'kw-002', keyword: 'Cracked', category: 'Software', addedBy: 'Admin', addedAt: '2025-03-02T00:00:00Z' },
  { id: 'kw-003', keyword: 'Full Album', category: 'Music', addedBy: 'Admin', addedAt: '2025-03-03T00:00:00Z' },
];

// GET /api/configuration/keywords
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search');

  let filtered = [...mockKeywords];

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(k => 
      k.keyword.toLowerCase().includes(searchLower) ||
      k.category.toLowerCase().includes(searchLower)
    );
  }

  return NextResponse.json({
    success: true,
    data: filtered,
  });
}

// POST /api/configuration/keywords
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newKeyword = {
      id: `kw-${Date.now()}`,
      keyword: body.keyword,
      category: body.category,
      addedBy: 'Admin',
      addedAt: new Date().toISOString(),
    };

    mockKeywords.push(newKeyword);

    return NextResponse.json({
      success: true,
      data: newKeyword,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to add keyword' },
      { status: 500 }
    );
  }
}

// DELETE /api/configuration/keywords
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Keyword ID required' },
        { status: 400 }
      );
    }

    const index = mockKeywords.findIndex(k => k.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Keyword not found' },
        { status: 404 }
      );
    }

    mockKeywords.splice(index, 1);

    return NextResponse.json({
      success: true,
      message: 'Keyword deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete keyword' },
      { status: 500 }
    );
  }
}