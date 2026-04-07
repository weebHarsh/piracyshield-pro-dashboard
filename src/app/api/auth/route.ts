import { NextResponse } from 'next/server';

// Mock user database
const users = [
  {
    id: 'user-001',
    email: 'admin@piracyshield.com',
    password: 'demo123', // In production, this would be hashed
    name: 'Admin User',
    role: 'admin',
    accountTier: 'enterprise',
  },
];

// POST /api/auth/login
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // In production, you would generate a JWT token here
    const token = `mock-jwt-token-${user.id}-${Date.now()}`;

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          accountTier: user.accountTier,
        },
        token,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

// POST /api/auth/logout
export async function DELETE() {
  return NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });
}