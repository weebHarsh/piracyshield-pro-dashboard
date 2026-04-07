# PiracyShield Pro - Testing Guide

## Test Suite

### Unit Tests (Jest + React Testing Library)

#### Run Tests
```bash
npm test
npm run test:watch
npm run test:coverage
```

#### Test Structure
```
__tests__/
├── components/
│   ├── Button.test.tsx
│   ├── Input.test.tsx
│   ├── Modal.test.tsx
│   └── Table.test.tsx
├── hooks/
│   ├── useIncidents.test.ts
│   ├── useTakedowns.test.ts
│   └── useContent.test.ts
├── utils/
│   └── api.test.ts
└── integration/
    └── login.test.tsx
```

### E2E Tests (Playwright)

#### Run Tests
```bash
# All tests
npx playwright test

# Specific browser
npx playwright test --project=chromium

# Debug mode
npx playwright test --debug

# Generate code
npx playwright codegen
```

#### Test Coverage
- ✅ Login authentication
- ✅ Dashboard loading
- ✅ Navigation (all 6 tabs)
- ✅ Button interactions
- ✅ Input focus states
- ✅ Table row clicks
- ✅ Loading skeletons
- ✅ Modal animations
- ✅ Toast notifications
- ✅ Form validation
- ✅ Search/filter

### API Tests

#### Test API Endpoints
```bash
# Test incidents endpoint
curl http://localhost:3000/api/incidents

# Test takedowns endpoint
curl http://localhost:3000/api/takedowns

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@piracyshield.com","password":"demo123"}'
```

## Pre-Deployment Checklist

### Build Verification
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes
- [ ] TypeScript compilation successful
- [ ] No console errors in browser

### Functionality Tests
- [ ] Login with demo credentials works
- [ ] All 6 navigation tabs work
- [ ] Create incident → shows toast
- [ ] Table row click → opens modal
- [ ] Search/filter works
- [ ] Pagination works (if applicable)
- [ ] Responsive design works

### Accessibility Tests
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators visible
- [ ] Skip links work

### Performance Tests
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Lighthouse score > 90
- [ ] No memory leaks
- [ ] Images optimized

## Running Tests

### Quick Test (Development)
```bash
# Run Playwright tests
npm run test:e2e

# Run Jest tests
npm test
```

### Full Test Suite (CI/CD)
```bash
# Lint
npm run lint

# Type check
npm run type-check

# Unit tests
npm test -- --coverage

# E2E tests
npx playwright test --reporter=html

# Build
npm run build
```

## Test Reports

### Playwright Report
After running tests, open:
```
test-results/index.html
```

### Coverage Report
After Jest tests with coverage:
```
coverage/lcov-report/index.html
```

## Debugging Tests

### Debug Playwright Test
```bash
# Run in debug mode
npx playwright test --debug

# Or use Playwright Inspector
npx playwright test --ui
```

### Debug Jest Test
```bash
# Run specific test
npm test -- Button.test.tsx --verbose

# Update snapshots
npm test -- -u
```

## Continuous Integration

Tests run automatically on:
- Every commit (lint + unit tests)
- Pull requests (full test suite)
- Pre-deployment (all checks)

## Manual Testing Checklist

### Authentication
- [ ] Login with valid credentials
- [ ] Login with invalid credentials shows error
- [ ] Logout clears session

### Dashboard
- [ ] KPI cards display correct data
- [ ] Charts render correctly
- [ ] Recent incidents table loads
- [ ] Date filters work

### Incidents
- [ ] Table displays all incidents
- [ ] Search filters incidents
- [ ] Status filter works
- [ ] Risk filter works
- [ ] Row click opens modal
- [ ] Create incident form validates
- [ ] Create incident shows success toast

### Takedowns
- [ ] Table displays all takedowns
- [ ] Status filter works
- [ ] Create takedown works
- [ ] Bulk operations work

### Content Management
- [ ] Whitelist tab displays entries
- [ ] Blacklist tab displays entries
- [ ] Add entry works
- [ ] Delete entry works
- [ ] Search filters entries

### Configuration
- [ ] Keywords tab displays keywords
- [ ] Add keyword works
- [ ] Delete keyword works
- [ ] Platform toggles update
- [ ] Search filters keywords

### Users
- [ ] User table displays all users
- [ ] Row click opens modal
- [ ] Create user form validates
- [ ] Create user shows success toast

### Responsive Design
- [ ] Mobile (320px-480px)
- [ ] Tablet (481px-1024px)
- [ ] Desktop (1025px+)
- [ ] Navigation adapts
- [ ] Tables scroll horizontally
- [ ] Modals fit viewport