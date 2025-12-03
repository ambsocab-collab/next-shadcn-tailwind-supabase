#!/bin/bash
# Local CI mirror script - Debug CI failures locally
# Usage: ./scripts/ci-local.sh

set -e

echo "🔍 Running CI pipeline locally..."
echo "This mirrors the GitHub Actions workflow for debugging"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Lint (matches CI)
echo -e "${YELLOW}📝 Step 1: Running lint checks${NC}"
if ! npm run lint; then
    echo -e "${RED}❌ Linting failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Linting passed${NC}"

# Step 2: Install dependencies (fresh install like CI)
echo -e "${YELLOW}📦 Step 2: Installing dependencies${NC}"
rm -rf node_modules
pnpm install --frozen-lockfile

# Step 3: Install Playwright browsers
echo -e "${YELLOW}🎭 Step 3: Installing Playwright browsers${NC}"
pnpm exec playwright install --with-deps

# Step 4: Run tests (mirrors CI)
echo -e "${YELLOW}🧪 Step 4: Running tests${NC}"

# Test environment setup
export BASE_URL=${BASE_URL:-"http://localhost:3000"}
export API_URL=${API_URL:-"http://localhost:3000/api"}

echo "Using BASE_URL: $BASE_URL"
echo "Using API_URL: $API_URL"

# Run smoke tests first
echo -e "${YELLOW}  Running smoke tests...${NC}"
if ! pnpm test:e2e --grep "smoke" --reporter=list; then
    echo -e "${RED}❌ Smoke tests failed${NC}"
    exit 1
fi
echo -e "${GREEN}  ✅ Smoke tests passed${NC}"

# Step 5: Local burn-in (reduced iterations for speed)
echo -e "${YELLOW}🔥 Step 5: Local burn-in (3 iterations)${NC}"
for i in {1..3}; do
    echo -e "${YELLOW}    Burn-in iteration $i/3${NC}"
    if ! pnpm test:e2e --grep "smoke" --reporter=list; then
        echo -e "${RED}❌ Burn-in failed at iteration $i${NC}"
        echo "This indicates flaky tests - fix before pushing"
        exit 1
    fi
done
echo -e "${GREEN}  ✅ Burn-in completed${NC}"

# Step 6: Performance tests (optional)
if [ "$1" = "--include-performance" ]; then
    echo -e "${YELLOW}⚡ Step 6: Running performance tests${NC}"
    if ! pnpm test:e2e --grep "performance"; then
        echo -e "${RED}❌ Performance tests failed${NC}"
        exit 1
    fi
    echo -e "${GREEN}  ✅ Performance tests passed${NC}"
fi

echo -e "${GREEN}🎉 Local CI pipeline completed successfully!${NC}"
echo -e "${GREEN}   Ready to push to remote${NC}"
echo ""
echo "💡 Tips:"
echo "   - Use '--include-performance' to also run performance tests"
echo "   - This script runs a subset of the full CI for speed"
echo "   - CI runs more iterations for burn-in and full test suite"