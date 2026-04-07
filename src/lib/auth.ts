import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory session store (in production, use Redis or database)
const sessions = new Map<string, { userId: string; expires: number }>();

export function authMiddleware(request: NextRequest) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');

  // Public endpoints that don't require auth
  const publicPaths = ['/api/auth/login', '/api/auth/logout'];
  
  if (publicPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check if token is valid
  if (!token) {
    return NextResponse.json(
      { success: false, error: 'Authentication required' },
      { status: 401 }
    );
  }

  const session = sessions.get(token);

  if (!session || session.expires < Date.now()) {
    return NextResponse.json(
      { success: false, error: 'Invalid or expired token' },
      { status: 401 }
    );
  }

  // Add user info to request headers
  const response = NextResponse.next();
  response.headers.set('x-user-id', session.userId);

  return response;
}

// Helper to create sessions (used in login)
export function createSession(userId: string): string {
  const token = `token-${userId}-${Date.now()}`;
  sessions.set(token, {
    userId,
    expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  });
  return token;
}

// Helper to delete sessions (used in logout)
export function deleteSession(token: string): void {
  sessions.delete(token);
}

// Helper to validate sessions
export function validateSession(token: string): string | null {
  const session = sessions.get(token);
  if (!session || session.expires < Date.now()) {
    return null;
  }
  return session.userId;
}

// Cleanup expired sessions (run periodically)
export function cleanupSessions(): void {
  const now = Date.now();
  for (const [token, session] of sessions.entries()) {
    if (session.expires < now) {
      sessions.delete(token);
    }
  }
}

// Export session store for use in auth route
export { sessions };