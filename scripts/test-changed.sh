#!/bin/bash
# Test changed files script - CI optimization
# Usage: ./scripts/test-changed.sh

set -e

echo "🔍 Detecting changed files and running affected tests..."

# Get changed files compared to main branch
CHANGED_FILES=$(git diff --name-only origin/main...HEAD)

if [ -z "$CHANGED_FILES" ]; then
    echo "📝 No changes detected compared to main branch"
    exit 0
fi

echo "📋 Changed files:"
echo "$CHANGED_FILES"

# Check if any test files changed
TEST_FILES_CHANGED=$(echo "$CHANGED_FILES" | grep -E '\.(spec|test)\.(ts|js|tsx|jsx)$' || echo "")

if [ -n "$TEST_FILES_CHANGED" ]; then
    echo "🧪 Test files changed:"
    echo "$TEST_FILES_CHANGED"

    echo "🚀 Running changed test files..."
    for test_file in $TEST_FILES_CHANGED; do
        if [ -f "$test_file" ]; then
            echo "  Running: $test_file"
            pnpm test:e2e "$test_file" || exit 1
        fi
    done
else
    echo "✅ No test files directly changed"
fi

# Check if source files changed that might affect tests
SOURCE_FILES_CHANGED=$(echo "$CHANGED_FILES" | grep -E '^src/.*\.(ts|tsx|js|jsx)$' || echo "")

if [ -n "$SOURCE_FILES_CHANGED" ]; then
    echo "🔧 Source files changed, running smoke tests..."
    echo "Source files:"
    echo "$SOURCE_FILES_CHANGED"

    # Run smoke tests as minimum verification
    pnpm test:e2e --grep "smoke" || exit 1
else
    echo "✅ No source files changed"
fi

# Check configuration changes
CONFIG_CHANGED=$(echo "$CHANGED_FILES" | grep -E '(\.json$|\.config\.(js|ts)$|\.env|playwright\.config)' || echo "")

if [ -n "$CONFIG_CHANGED" ]; then
    echo "⚙️ Configuration files changed:"
    echo "$CONFIG_CHANGED"
    echo "🔄 Running full test suite due to config changes..."
    pnpm test:e2e || exit 1
else
    echo "✅ No configuration changes detected"
fi

echo "🎉 Selective testing completed successfully!"