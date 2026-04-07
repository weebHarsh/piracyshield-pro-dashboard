# How to Use API Client (When Ready to Connect to Real Backend)

## Current Setup

The application currently uses Zustand for client-side state management with mock data. An API client has been created at `/src/lib/api.ts` that can be used to connect to a real backend.

## Migration Steps

### 1. Update Hooks to Use API Client

**Before (using Zustand):**
```typescript
// src/lib/hooks.ts
export function useIncidents() {
  const incidents = useAppStore((state) => state.data.incidents);
  const addIncident = useAppStore((state) => state.addIncident);
  // ...
}
```

**After (using API client):**
```typescript
// src/lib/hooks.ts
import { api } from '@/lib/api';

export function useIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchIncidents() {
      setIsLoading(true);
      const result = await api.getIncidents();
      if (result.success && result.data) {
        setIncidents(result.data);
      }
      setIsLoading(false);
    }
    fetchIncidents();
  }, []);

  async function createIncident(data: Partial<Incident>) {
    const result = await api.createIncident(data);
    if (result.success) {
      // Refresh incidents
      fetchIncidents();
      return true;
    }
    return false;
  }

  return { incidents, isLoading, createIncident };
}
```

### 2. Replace Mock Data in API Routes

**Before (mock data):**
```typescript
// src/app/api/incidents/route.ts
import { mockIncidents } from '@/lib/mockData';
```

**After (real database):**
```typescript
// src/app/api/incidents/route.ts
import { db } from '@/lib/database';

export async function GET(request: NextRequest) {
  const incidents = await db.incidents.findMany();
  return NextResponse.json({ success: true, data: incidents });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const incident = await db.incidents.create({ data: body });
  return NextResponse.json({ success: true, data: incident });
}
```

### 3. Add Environment Variables

Create `.env.local`:
```bash
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=/api
```

### 4. Connect Real Database

Install Prisma (or your ORM of choice):
```bash
npm install prisma @prisma/client
npx prisma init
```

Define schema in `prisma/schema.prisma`:
```prisma
model Incident {
  id          String   @id @default(cuid())
  title       String
  platform    String
  type        String
  risk        String
  similarity  Int
  status      String
  url         String
  date        DateTime
  userId      String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### 5. Implement Real Authentication

Replace mock auth with real JWT:

```typescript
// src/lib/auth.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function validateLogin(email: string, password: string) {
  const user = await db.user.findUnique({ where: { email } });
  
  if (!user || !await bcrypt.compare(password, user.password)) {
    return null;
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '24h' }
  );

  return { user, token };
}
```

## Gradual Migration

You can migrate gradually by:

1. **Keep using Zustand for now**
   - Current setup works perfectly
   - No urgency to change

2. **Swap one module at a time**
   - Start with less critical features
   - e.g., migrate Keywords first, then Users

3. **Use React Query for caching**
   ```bash
   npm install @tanstack/react-query
   ```

   ```typescript
   // Replace Zustand hook with React Query
   import { useQuery, useMutation } from '@tanstack/react-query';

   export function useIncidents() {
     const { data: incidents, isLoading } = useQuery({
       queryKey: ['incidents'],
       queryFn: () => api.getIncidents(),
     });

     const createMutation = useMutation({
       mutationFn: api.createIncident,
       onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['incidents'] });
       },
     });

     return {
       incidents: incidents?.data ?? [],
       isLoading,
       createIncident: createMutation.mutate,
     };
   }
   ```

4. **Keep Zustand for UI state**
   - Form inputs
   - Modal state
   - Sidebar collapsed state
   - Use React Query for server state

## Testing the Transition

```typescript
// Test API client works
import { api } from '@/lib/api';

async function testAPI() {
  // Test GET
  const incidents = await api.getIncidents();
  console.log('Incidents:', incidents);

  // Test POST
  const newIncident = await api.createIncident({
    title: 'Test',
    platform: 'Netflix',
    type: 'Movie',
  });
  console.log('Created:', newIncident);
}
```

## When to Migrate

- **Now**: If you need persistence or multi-user support
- **Later**: If this is a demo/prototype
- **Never**: If happy with client-side state for this use case

The choice depends on your requirements!