#!/bin/bash

# Script to fetch all .md files from all repositories in ahmedgfathy GitHub account
# Created: October 28, 2025

echo "🚀 Starting to fetch all .md files from ahmedgfathy repositories..."
echo ""

# Set the GitHub username
GITHUB_USER="ahmedgfathy"

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Create a temporary directory for cloning
TEMP_DIR="temp_repos"
mkdir -p "$TEMP_DIR"

echo "📋 Fetching list of repositories..."

# Get all repository names (requires GitHub CLI)
# If you don't have gh CLI, install it: brew install gh
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed!"
    echo "📥 Install it with: brew install gh"
    echo "🔐 Then login with: gh auth login"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub CLI"
    echo "🔐 Please run: gh auth login"
    exit 1
fi

# Fetch all repository names
REPOS=$(gh repo list "$GITHUB_USER" --limit 100 --json name --jq '.[].name')

if [ -z "$REPOS" ]; then
    echo "❌ No repositories found or unable to fetch repositories"
    exit 1
fi

REPO_COUNT=$(echo "$REPOS" | wc -l | tr -d ' ')
echo "✅ Found $REPO_COUNT repositories"
echo ""

CURRENT=0
TOTAL_MD_FILES=0

# Process each repository
while IFS= read -r repo; do
    CURRENT=$((CURRENT + 1))
    echo "[$CURRENT/$REPO_COUNT] 📦 Processing: $repo"
    
    # Create directory for this repo's markdown files
    REPO_DIR="${repo}_md"
    mkdir -p "$REPO_DIR"
    
    # Clone the repository (shallow clone to save time and space)
    CLONE_PATH="$TEMP_DIR/$repo"
    
    if gh repo clone "$GITHUB_USER/$repo" "$CLONE_PATH" -- --depth 1 --quiet 2>/dev/null; then
        # Find and copy all .md files
        MD_COUNT=0
        
        # Find all .md files (excluding node_modules and common ignore patterns)
        while IFS= read -r md_file; do
            if [ -f "$md_file" ]; then
                # Get relative path from repo root
                REL_PATH="${md_file#$CLONE_PATH/}"
                
                # Create subdirectory structure if needed
                FILE_DIR=$(dirname "$REL_PATH")
                if [ "$FILE_DIR" != "." ]; then
                    mkdir -p "$REPO_DIR/$FILE_DIR"
                fi
                
                # Copy the file
                cp "$md_file" "$REPO_DIR/$REL_PATH"
                MD_COUNT=$((MD_COUNT + 1))
            fi
        done < <(find "$CLONE_PATH" -name "*.md" -type f \
                 ! -path "*/node_modules/*" \
                 ! -path "*/.git/*" \
                 ! -path "*/vendor/*" \
                 ! -path "*/dist/*" \
                 ! -path "*/build/*")
        
        if [ $MD_COUNT -gt 0 ]; then
            echo "   ✅ Found $MD_COUNT .md file(s)"
            TOTAL_MD_FILES=$((TOTAL_MD_FILES + MD_COUNT))
        else
            echo "   ⚠️  No .md files found"
            # Remove empty directory
            rm -rf "$REPO_DIR"
        fi
        
        # Clean up cloned repo
        rm -rf "$CLONE_PATH"
    else
        echo "   ❌ Failed to clone (might be private or doesn't exist)"
    fi
    
    echo ""
done <<< "$REPOS"

# Clean up temporary directory
rm -rf "$TEMP_DIR"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Complete!"
echo "📊 Summary:"
echo "   • Repositories processed: $REPO_COUNT"
echo "   • Total .md files found: $TOTAL_MD_FILES"
echo "   • Location: $SCRIPT_DIR"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 Tip: Each repository's .md files are in separate folders named '{repo_name}_md'"
