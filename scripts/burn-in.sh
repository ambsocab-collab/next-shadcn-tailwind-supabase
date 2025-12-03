#!/bin/bash
# Burn-in testing script - Detect flaky tests
# Usage: ./scripts/burn-in.sh [iterations] [test-pattern]

set -e

# Default values
ITERATIONS=${1:-10}
TEST_PATTERN=${2:-""}

echo "🔥 Burn-in Testing Script"
echo "Running $ITERATIONS iterations"
if [ -n "$TEST_PATTERN" ]; then
    echo "Test pattern: $TEST_PATTERN"
fi

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

FAILED_ITERATIONS=0

# Run burn-in loop
for i in $(seq 1 $ITERATIONS); do
    echo -e "${YELLOW}=== Burn-in iteration $i/$ITERATIONS ===${NC}"

    # Build test command
    TEST_CMD="pnpm test:e2e"

    if [ -n "$TEST_PATTERN" ]; then
        TEST_CMD="$TEST_CMD --grep=\"$TEST_PATTERN\""
    fi

    # Run tests
    if eval "$TEST_CMD"; then
        echo -e "${GREEN}✅ Iteration $i passed${NC}"
    else
        echo -e "${RED}❌ Iteration $i FAILED${NC}"
        FAILED_ITERATIONS=$((FAILED_ITERATIONS + 1))

        # Ask if user wants to continue
        if [ $i -lt $ITERATIONS ]; then
            read -p "Continue with next iteration? (y/n): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                echo "Burn-in stopped by user"
                exit 1
            fi
        fi
    fi
done

# Summary
echo ""
echo "📊 Burn-in Summary:"
echo "  Total iterations: $ITERATIONS"
echo "  Failed iterations: $FAILED_ITERATIONS"
echo "  Success rate: $(( (ITERATIONS - FAILED_ITERATIONS) * 100 / ITERATIONS ))%"

if [ $FAILED_ITERATIONS -eq 0 ]; then
    echo -e "${GREEN}🎉 All burn-in iterations passed!${NC}"
    echo "Tests appear to be stable - no flakiness detected"
    exit 0
elif [ $FAILED_ITERATIONS -le $(( ITERATIONS / 10 )) ]; then
    echo -e "${YELLOW}⚠️  Some flakiness detected ($FAILED_ITERATIONS/$ITERATIONS)${NC}"
    echo "Consider investigating the failures, but may be acceptable"
    exit 1
else
    echo -e "${RED}🚨 High flakiness detected!${NC}"
    echo "Tests are unreliable - fix before merging"
    exit 1
fi