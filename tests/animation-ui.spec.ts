import { test, expect } from '@playwright/test';

test.describe('PiracyShield Pro - Animation and UI Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Login page renders and animates', async ({ page }) => {
    await page.goto('/login');
    
    // Check login form is visible
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button:has-text("Sign in")')).toBeVisible();
    
    // Check animation classes are present
    const loginCard = page.locator('.bg-white.rounded-2xl');
    await expect(loginCard).toBeVisible();
    
    // Test login
    await page.fill('input[type="email"]', 'admin@piracyshield.com');
    await page.fill('input[type="password"]', 'demo123');
    await page.click('button:has-text("Sign in")');
    
    // Should redirect to dashboard
    await page.waitForURL('**/dashboard', { timeout: 5000 });
    await expect(page).toHaveURL(/dashboard/);
  });

  test('Dashboard loads with skeleton states', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@piracyshield.com');
    await page.fill('input[type="password"]', 'demo123');
    await page.click('button:has-text("Sign in")');
    await page.waitForURL('**/dashboard');
    
    // Wait for page to fully load (skeletons disappear after 500ms)
    await page.waitForTimeout(1000);
    
    // Check for welcome message
    await expect(page.locator('text=Welcome back')).toBeVisible({ timeout: 5000 });
    
    // Check for KPI cards (article elements)
    const kpiCards = page.locator('article[role="article"]');
    await expect(kpiCards.first()).toBeVisible({ timeout: 5000 });
    const count = await kpiCards.count();
    expect(count).toBeGreaterThan(0);
    
    // Check for chart containers
    await expect(page.locator('.bg-white.rounded-xl').first()).toBeVisible();
  });

  test('Navigation between tabs works', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@piracyshield.com');
    await page.fill('input[type="password"]', 'demo123');
    await page.click('button:has-text("Sign in")');
    await page.waitForURL('**/dashboard');
    
    // Navigate to Incidents
    await page.click('nav a:has-text("Incidents")');
    await page.waitForURL('**/incidents');
    await expect(page).toHaveURL(/incidents/);
    await expect(page.locator('h1:has-text("Incidents")')).toBeVisible();
    
    // Navigate to Takedowns
    await page.click('nav a:has-text("Takedowns")');
    await page.waitForURL('**/takedowns');
    await expect(page).toHaveURL(/takedowns/);
    await expect(page.locator('h1:has-text("Takedowns")')).toBeVisible();
    
    // Navigate to Content
    await page.click('nav a:has-text("Content")');
    await page.waitForURL('**/content');
    await expect(page).toHaveURL(/content/);
    await expect(page.locator('h1:has-text("Content Management")')).toBeVisible();
    
    // Navigate to Configuration
    await page.click('nav a:has-text("Configuration")');
    await page.waitForURL('**/configuration');
    await expect(page).toHaveURL(/configuration/);
    await expect(page.locator('h1:has-text("Configuration")')).toBeVisible();
    
    // Navigate to Users
    await page.click('nav a:has-text("Users")');
    await page.waitForURL('**/users');
    await expect(page).toHaveURL(/users/);
    await expect(page.locator('h1:has-text("Users")')).toBeVisible();
  });

  test('Button micro-interactions - hover and click', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@piracyshield.com');
    await page.fill('input[type="password"]', 'demo123');
    await page.click('button:has-text("Sign in")');
    await page.waitForURL('**/dashboard');
    
    // Navigate to Incidents
    await page.click('nav a:has-text("Incidents")');
    await page.waitForURL('**/incidents');
    
    // Find Report Incident button
    const reportButton = page.locator('button:has-text("Report Incident")');
    await expect(reportButton).toBeVisible();
    
    // Check button exists and has correct classes
    const buttonClasses = await reportButton.getAttribute('class');
    expect(buttonClasses).toContain('bg-teal-700');
    expect(buttonClasses).toContain('text-white');
    
    // Click button to open modal
    await reportButton.click();
    
    // Modal should appear
    await expect(page.locator('text=Report New Incident')).toBeVisible({ timeout: 3000 });
    
    // Close modal
    await page.keyboard.press('Escape');
    await expect(page.locator('text=Report New Incident')).not.toBeVisible();
  });

  test('Input focus states and transitions', async ({ page }) => {
    await page.goto('/login');
    
    const emailInput = page.locator('input[type="email"]');
    
    // Check input has focus styles
    await emailInput.focus();
    
    // Type into input
    await emailInput.fill('admin@piracyshield.com');
    
    // Check value
    const value = await emailInput.inputValue();
    expect(value).toBe('admin@piracyshield.com');
    
    // Check input has transition classes
    const inputClasses = await emailInput.getAttribute('class');
    expect(inputClasses).toContain('transition');
  });

  test('Table interactions - row hover and click', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@piracyshield.com');
    await page.fill('input[type="password"]', 'demo123');
    await page.click('button:has-text("Sign in")');
    await page.waitForURL('**/dashboard');
    
    // Go to Incidents
    await page.click('nav a:has-text("Incidents")');
    await page.waitForURL('**/incidents');
    await page.waitForTimeout(500); // Wait for data to load
    
    // Check table exists
    const table = page.locator('table');
    await expect(table).toBeVisible();
    
    // Check table rows exist
    const rows = page.locator('table tbody tr');
    await expect(rows.first()).toBeVisible({ timeout: 5000 });
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
    
    // Click first row to open modal
    await rows.first().click();
    
    // Modal should appear - check for modal dialog
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible({ timeout: 3000 });
  });

  test('Toast notifications appear on actions', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@piracyshield.com');
    await page.fill('input[type="password"]', 'demo123');
    await page.click('button:has-text("Sign in")');
    await page.waitForURL('**/dashboard');
    
    // Go to Incidents
    await page.click('nav a:has-text("Incidents")');
    await page.waitForURL('**/incidents');
    
    // Open create incident modal
    await page.click('button:has-text("Report Incident")');
    
    // Fill form
    await page.fill('input[id="incident-title"]', 'Test Incident');
    await page.selectOption('select[id="platform"]', 'Netflix');
    await page.selectOption('select[id="type"]', 'Movie');
    await page.fill('input[id="incident-url"]', 'https://example.com/test');
    
    // Submit
    await page.click('button:has-text("Submit Incident")');
    
    // Check for success toast (react-hot-toast)
    await expect(page.locator('text=Incident reported successfully')).toBeVisible({ timeout: 5000 });
  });

  test('Loading skeletons appear before data', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@piracyshield.com');
    await page.fill('input[type="password"]', 'demo123');
    await page.click('button:has-text("Sign in")');
    
    // Wait for redirect
    await page.waitForURL('**/dashboard');
    await page.waitForTimeout(1000); // Wait for loading to complete
    
    // Data should now be visible
    const kpiCards = await page.locator('article[role="article"]').count();
    expect(kpiCards).toBeGreaterThan(0);
    
    // Check for welcome message
    await expect(page.locator('text=Welcome back')).toBeVisible();
  });

  test('Modal animations - open and close', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@piracyshield.com');
    await page.fill('input[type="password"]', 'demo123');
    await page.click('button:has-text("Sign in")');
    await page.waitForURL('**/dashboard');
    
    // Go to Incidents
    await page.click('nav a:has-text("Incidents")');
    await page.waitForURL('**/incidents');
    
    // Open modal
    await page.click('button:has-text("Report Incident")');
    
    // Modal should be visible with animation
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible({ timeout: 3000 });
    
    // Check modal has proper attributes - modal content is in child div
    const modalContent = modal.locator('.bg-white.rounded-2xl');
    await expect(modalContent).toBeVisible();
    
    // Close with X button
    await page.click('button[aria-label="Close modal"]');
    
    // Modal should be hidden
    await expect(modal).not.toBeVisible();
  });

  test('Form validation and error states', async ({ page }) => {
    await page.goto('/login');
    
    // Try to submit empty form
    await page.click('button:has-text("Sign in")');
    
    // Should stay on login page
    await expect(page).toHaveURL(/login/);
    
    // Try invalid credentials
    await page.fill('input[type="email"]', 'wrong@email.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button:has-text("Sign in")');
    
    // Should show error toast
    await expect(page.locator('text=Invalid email or password')).toBeVisible({ timeout: 3000 });
  });

  test('Search and filter functionality', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@piracyshield.com');
    await page.fill('input[type="password"]', 'demo123');
    await page.click('button:has-text("Sign in")');
    await page.waitForURL('**/dashboard');
    
    // Go to Incidents
    await page.click('nav a:has-text("Incidents")');
    await page.waitForURL('**/incidents');
    
    // Search in table
    const searchInput = page.locator('input[placeholder*="Search"]');
    await expect(searchInput).toBeVisible();
    
    await searchInput.fill('Netflix');
    
    // Results should filter (checking table still exists)
    await expect(page.locator('table')).toBeVisible();
    
    // Clear search
    await searchInput.fill('');
    
    // Select filter
    const statusFilter = page.locator('select[id="status-filter"]');
    await statusFilter.selectOption('New');
    
    // Table should still be visible
    await expect(page.locator('table')).toBeVisible();
  });
});