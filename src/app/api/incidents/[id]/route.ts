import { NextRequest, NextResponse } from 'next/server';
import { mockIncidents } from '@/lib/mockData';

// GET /api/incidents/[id] - Get single incident
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const incident = mockIncidents.find(i => i.id === id);

  if (!incident) {
    return NextResponse.json(
      { success: false, error: 'Incident not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: incident,
  });
}

// PATCH /api/incidents/[id] - Update incident
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const index = mockIncidents.findIndex(i => i.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Incident not found' },
        { status: 404 }
      );
    }

    mockIncidents[index] = {
      ...mockIncidents[index],
      ...body,
    };

    return NextResponse.json({
      success: true,
      data: mockIncidents[index],
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update incident' },
      { status: 500 }
    );
  }
}

// DELETE /api/incidents/[id] - Delete incident
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const index = mockIncidents.findIndex(i => i.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Incident not found' },
        { status: 404 }
      );
    }

    mockIncidents.splice(index, 1);

    return NextResponse.json({
      success: true,
      message: 'Incident deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete incident' },
      { status: 500 }
    );
  }
}