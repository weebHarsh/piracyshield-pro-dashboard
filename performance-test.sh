#!/bin/bash

# Performance Testing Script for PiracyShield Pro Landing Page
# Run this script to check performance, accessibility, and bundle size

echo "🚀 PiracyShield Pro - Performance Testing Script"
echo "================================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
    else
        echo -e "${RED}✗${NC} $2"
    fi
}

# Check if npm is installed
echo "📦 Checking dependencies..."
if command -v npm &> /dev/null; then
    print_status 0 "npm is installed"
else
    print_status 1 "npm is not installed. Please install Node.js first."
    exit 1
fi

# Check if lighthouse is installed
echo ""
echo "💡 Checking Lighthouse..."
if command -v lighthouse &> /dev/null; then
    print_status 0 "Lighthouse is installed"
else
    echo -e "${YELLOW}!${NC} Lighthouse not found. Installing..."
    npm install -g lighthouse
    print_status $?"Lighthouse installed"
fi

# Build the project
echo ""
echo "🔨 Building production bundle..."
npm run build > /dev/null 2>&1
print_status $?"Production build completed"

# Check bundle size
echo ""
echo "📏 Checking bundle size..."
BUNDLE_SIZE=$(du -sh .next/static 2>/dev/null | cut -f1)
echo -e "   Bundle size: ${YELLOW}${BUNDLE_SIZE}${NC}"

# List large chunks
echo ""
echo "📊 Largest JavaScript chunks:"
find .next/static/chunks -name "*.js" -exec du -h {} \; 2>/dev/null | sort -rh | head -10

# Start dev server for testing
echo ""
echo "🌐 Starting development server..."
npm run dev > /dev/null 2>&1 &
DEV_PID=$!
sleep 5

# Check if server is running
if curl -s http://localhost:3000 > /dev/null; then
    print_status 0 "Development server is running"
else
    print_status 1 "Failed to start development server"
    exit 1
fi

# Run Lighthouse audit
echo ""
echo "💡 Running Lighthouse audit (this may take a minute)..."
lighthouse http://localhost:3000 \
  --output=json \
  --output-path=./lighthouse-report.json \
  --only-categories=performance,accessibility,best-practices,seo \
  --chrome-flags="--headless" \
  --quiet \
  > /dev/null 2>&1

if [ $? -eq 0 ]; then
    print_status 0 "Lighthouse audit completed"
    
    # Extract scores from report
    if [ -f lighthouse-report.json ]; then
        echo ""
        echo "📊 Lighthouse Scores:"
        echo "==================="
        
        # Use node to parse JSON (works on macOS and Linux)
        node -e "
            const report = require('./lighthouse-report.json');
            const scores = {
                'Performance': report.categories.performance.score * 100,
                'Accessibility': report.categories.accessibility.score * 100,
                'Best Practices': report.categories['best-practices'].score * 100,
                'SEO': report.categories.seo.score * 100
            };
            
            Object.entries(scores).forEach(([name, score]) => {
                const emoji = score >= 90 ? '🟢' : score >= 50 ? '🟡' : '🔴';
                console.log(\`   \${emoji} \${name}: \${score.toFixed(0)}/100\`);
            });
        "
    fi
else
    print_status 1 "Lighthouse audit failed"
fi

# Check TypeScript
echo ""
echo "📝 Checking TypeScript..."
npm run lint > /dev/null 2>&1
if [ $? -eq 0 ]; then
    print_status 0 "No TypeScript errors"
else
    print_status 1 "TypeScript errors found"
    npm run lint
fi

# Performance recommendations
echo ""
echo "✨ Performance Recommendations:"
echo "================================"
echo "   1. Run Lighthouse in Chrome DevTools for detailed metrics"
echo "   2. Use React DevTools Profiler to identify slow components"
echo "   3. Check Network tab for large assets"
echo "   4. Test with 3G throttling (Chrome DevTools > Network > Throttling)"
echo "   5. Test on mobile devices (Chrome DevTools > Device Mode)"
echo "   6. Use 'npm run analyze' to inspect bundle composition"
echo ""

# Clean up
echo "🧹 Cleaning up..."
kill $DEV_PID 2>/dev/null
rm -f lighthouse-report.json

echo ""
echo "✅ Performance testing complete!"
echo "   Review the results above and optimize as needed."
echo ""

# Summary
echo "📋 Next Steps:"
echo "============="
echo "   • If any scores are below 90, review Lighthouse recommendations"
echo "   • Run 'npm run analyze' for detailed bundle analysis"
echo "   • Test on real mobile devices for accurate performance"
echo "   • Monitor Web Vitals in production"
echo ""