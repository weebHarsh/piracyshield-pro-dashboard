import { NextResponse } from 'next/server';

const mockUsers: Array<{
  id: string;
  email: string;
  name: string;
  role: string;
  accountTier: string;
  createdAt: string;
  lastLogin: string | null;
}> = [
  {
    id: 'user-001',
    email: 'admin@piracyshield.com',
    name: 'Admin User',
    role: 'admin',
    accountTier: 'enterprise',
    createdAt: '2025-01-01T00:00:00Z',
    lastLogin: '2025-04-07T10:30:00Z',
  },
  {
    id: 'user-002',
    email: 'john@example.com',
    name: 'John Smith',
    role: 'moderator',
    accountTier: 'pro',
    createdAt: '2025-02-15T00:00:00Z',
    lastLogin: '2025-04-06T14:20:00Z',
  },
  {
    id: 'user-003',
    email: 'jane@example.com',
    name: 'Jane Doe',
    role: 'viewer',
    accountTier: 'starter',
    createdAt: '2025-03-10T00:00:00Z',
    lastLogin: '2025-04-05T09:15:00Z',
  },
];

// GET /api/users
export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockUsers,
  });
}

// POST /api/users
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newUser = {
      id: `user-${Date.now()}`,
      email: body.email,
      name: `${body.firstName} ${body.lastName}`,
      role: body.role,
      accountTier: body.plan,
      createdAt: new Date().toISOString(),
      lastLogin: null,
    };

    mockUsers.push(newUser);

    return NextResponse.json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 }
    );
  }
}