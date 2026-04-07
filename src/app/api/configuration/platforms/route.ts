import { NextResponse } from 'next/server';

const mockPlatforms = [
  { id: 'pf-001', name: 'Netflix', enabled: true, scanFrequency: 'Daily' },
  { id: 'pf-002', name: 'YouTube', enabled: true, scanFrequency: 'Daily' },
  { id: 'pf-003', name: 'Twitter', enabled: true, scanFrequency: 'Daily' },
  { id: 'pf-004', name: 'Facebook', enabled: false, scanFrequency: 'Weekly' },
  { id: 'pf-005', name: 'Instagram', enabled: true, scanFrequency: 'Daily' },
];

// GET /api/configuration/platforms
export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockPlatforms,
  });
}