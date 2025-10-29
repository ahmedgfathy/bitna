#!/bin/bash

# Script to organize documentation - keep real estate related, move others to ignored_docs
# Created: October 28, 2025

echo "🔍 Analyzing all markdown files for real estate content..."
echo ""

TECH_DOC_DIR="/Users/ahmedgomaa/bitna/tech_doc"
IGNORED_DIR="/Users/ahmedgomaa/bitna/ignored_docs"

cd "$TECH_DOC_DIR"

# Real estate related keywords (case insensitive)
KEYWORDS=(
    "property" "properties"
    "unit" "units"
    "lead" "leads"
    "opportunity" "opportunities"
    "real estate" "realestate"
    "listing" "listings"
    "compound" "compounds"
    "apartment" "apartments"
    "villa" "villas"
    "office" "offices"
    "commercial"
    "residential"
    "rent" "rental"
    "sale" "sales"
    "buyer" "buyers"
    "seller" "sellers"
    "agent" "agents"
    "broker"
    "crm"
)

KEPT_COUNT=0
MOVED_COUNT=0

# Find all .md files
while IFS= read -r file; do
    # Skip the script files themselves
    if [[ "$file" == *"fetch_all_md_files"* ]] || [[ "$file" == *"README_FETCH_SCRIPT"* ]] || [[ "$file" == *"organize_docs"* ]]; then
        continue
    fi
    
    SHOULD_KEEP=false
    
    # Check filename first
    filename=$(basename "$file")
    filename_lower=$(echo "$filename" | tr '[:upper:]' '[:lower:]')
    
    for keyword in "${KEYWORDS[@]}"; do
        keyword_lower=$(echo "$keyword" | tr '[:upper:]' '[:lower:]')
        if [[ "$filename_lower" == *"$keyword_lower"* ]]; then
            SHOULD_KEEP=true
            break
        fi
    done
    
    # If not found in filename, check content
    if [ "$SHOULD_KEEP" = false ]; then
        content=$(cat "$file" | tr '[:upper:]' '[:lower:]')
        
        for keyword in "${KEYWORDS[@]}"; do
            keyword_lower=$(echo "$keyword" | tr '[:upper:]' '[:lower:]')
            if echo "$content" | grep -q "$keyword_lower"; then
                SHOULD_KEEP=true
                break
            fi
        done
    fi
    
    if [ "$SHOULD_KEEP" = true ]; then
        echo "✅ KEEP: $file"
        KEPT_COUNT=$((KEPT_COUNT + 1))
    else
        echo "📦 MOVE: $file"
        
        # Get the relative path
        rel_path="${file#./}"
        
        # Create directory structure in ignored_docs
        target_dir="$IGNORED_DIR/$(dirname "$rel_path")"
        mkdir -p "$target_dir"
        
        # Move the file
        mv "$file" "$IGNORED_DIR/$rel_path"
        MOVED_COUNT=$((MOVED_COUNT + 1))
    fi
    
done < <(find . -name "*.md" -type f)

# Clean up empty directories in tech_doc
find . -type d -empty -delete 2>/dev/null

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Organization Complete!"
echo "📊 Summary:"
echo "   • Files kept in tech_doc: $KEPT_COUNT"
echo "   • Files moved to ignored_docs: $MOVED_COUNT"
echo "   • Total processed: $((KEPT_COUNT + MOVED_COUNT))"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📁 Locations:"
echo "   • Real estate docs: $TECH_DOC_DIR"
echo "   • Other docs: $IGNORED_DIR"
