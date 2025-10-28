# Fetch All Markdown Files from GitHub Repositories

This script fetches all `.md` files from all repositories in the `ahmedgfathy` GitHub account.

## Prerequisites

1. **Install GitHub CLI** (if not already installed):
   ```bash
   brew install gh
   ```

2. **Authenticate with GitHub**:
   ```bash
   gh auth login
   ```
   Follow the prompts to authenticate.

## Usage

### Quick Start

```bash
cd /Users/ahmedgomaa/bitna/tech_doc
./fetch_all_md_files.sh
```

### What It Does

1. ✅ Fetches list of all your repositories (up to 100)
2. 🔄 Clones each repository (shallow clone)
3. 📄 Finds all `.md` files (excluding node_modules, .git, etc.)
4. 📁 Organizes them by repository in separate folders
5. 🧹 Cleans up temporary files

### Output Structure

After running, you'll have folders like:
```
tech_doc/
├── bitna_md/
│   ├── README.md
│   ├── docs/
│   │   ├── API_REFERENCE.md
│   │   └── SETUP_COMPLETE.md
│   └── ...
├── another-repo_md/
│   └── README.md
├── third-repo_md/
│   ├── README.md
│   └── docs/
│       └── guide.md
└── ...
```

### Options

- The script processes **all public repositories** by default
- It automatically skips:
  - `node_modules/` directories
  - `.git/` directories  
  - `vendor/` directories
  - `dist/` and `build/` directories

### Filtering Specific Repos

If you only want specific repositories, edit the script and add a filter:

```bash
# Example: Only fetch from repos starting with "project-"
REPOS=$(gh repo list "$GITHUB_USER" --limit 100 --json name --jq '.[].name' | grep "^project-")
```

## Troubleshooting

### "gh: command not found"
Install GitHub CLI:
```bash
brew install gh
```

### "Not authenticated with GitHub CLI"
Login:
```bash
gh auth login
```

### "Failed to clone"
- Repository might be private (requires authentication)
- Repository might have been deleted
- Network issues

### Script Takes Too Long
- The script uses `--depth 1` for shallow clones (fast)
- For many large repos, it may still take a few minutes
- Consider filtering to specific repos if needed

## Advanced Usage

### Fetch Only Certain Repos

Create a file `repos.txt` with one repo name per line:
```
bitna
my-project
another-project
```

Then modify the script to use:
```bash
REPOS=$(cat repos.txt)
```

### Include Private Repos

The script already includes private repos if you're authenticated with `gh auth login`.

### Save to Different Location

Change the `SCRIPT_DIR` in the script or run it from a different directory.

## Summary Stats

The script shows:
- Total repositories processed
- Total `.md` files found
- Location of collected files

Example output:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ Complete!
📊 Summary:
   • Repositories processed: 50
   • Total .md files found: 237
   • Location: /Users/ahmedgomaa/bitna/tech_doc
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Notes

- Each repository's markdown files maintain their original folder structure
- Empty repositories (no `.md` files) won't create folders
- The script is safe to run multiple times (overwrites existing folders)
