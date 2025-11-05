#!/bin/bash

# Script to check for broken internal links in Hugo site
# Usage: ./scripts/check-links.sh

set -e

echo "🔍 Checking for broken internal links in Hugo site..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

cd "$PROJECT_ROOT"

# Build the site first
echo "📦 Building Hugo site..."
hugo --gc --quiet

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Hugo build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Hugo build successful${NC}"
echo ""

# Check for common relref issues
echo "🔎 Checking for cross-language link issues..."
echo ""

ISSUES_FOUND=0

# Check for .es.md links in English index files
ES_IN_EN=$(grep -r "relref.*\.es\.md" content/**/_index.en.md 2>/dev/null || true)
if [ ! -z "$ES_IN_EN" ]; then
    echo -e "${RED}❌ Found Spanish (.es.md) links in English index files:${NC}"
    echo "$ES_IN_EN"
    echo ""
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
fi

# Check for .en.md links in Spanish index files
EN_IN_ES=$(grep -r "relref.*\.en\.md" content/**/_index.es.md 2>/dev/null || true)
if [ ! -z "$EN_IN_ES" ]; then
    echo -e "${RED}❌ Found English (.en.md) links in Spanish index files:${NC}"
    echo "$EN_IN_ES"
    echo ""
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
fi

if [ $ISSUES_FOUND -eq 0 ]; then
    echo -e "${GREEN}✅ No cross-language link issues found${NC}"
fi

echo ""
echo "🔗 Checking for broken relref links..."
echo ""

# Check if Hugo reported any relref errors during build
hugo --gc 2>&1 | grep -i "REF_NOT_FOUND\|failed to resolve" > /tmp/hugo_errors.txt || true

if [ -s /tmp/hugo_errors.txt ]; then
    echo -e "${RED}❌ Found broken relref links:${NC}"
    cat /tmp/hugo_errors.txt
    echo ""
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
else
    echo -e "${GREEN}✅ No broken relref links found${NC}"
fi

rm -f /tmp/hugo_errors.txt

echo ""
echo "📊 Summary:"
echo "─────────────────────────────────────"

if [ $ISSUES_FOUND -eq 0 ]; then
    echo -e "${GREEN}✅ All internal links are valid!${NC}"
    exit 0
else
    echo -e "${RED}❌ Found $ISSUES_FOUND issue(s) with internal links${NC}"
    echo ""
    echo "Please fix the issues above and run this script again."
    exit 1
fi
