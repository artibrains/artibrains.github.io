# Scripts Directory

This directory contains utility scripts for maintaining the Hugo site.

## Available Scripts

### `check-links.sh` - Internal Link Validator

Validates that all internal links in the Hugo site are working correctly.

**What it checks:**
- ✅ Cross-language link issues (e.g., `.es.md` links in English files)
- ✅ Broken `relref` links
- ✅ Hugo build errors related to references

**Usage:**
```bash
./scripts/check-links.sh
```

**When to use:**
- Before committing changes that modify chapter index files
- After adding new content pages
- When restructuring content directories
- As part of CI/CD validation

**Exit codes:**
- `0` - All links are valid
- `1` - Issues found (see output for details)

## Best Practices

1. **Run before committing**: Always run `check-links.sh` before pushing changes that involve internal links
2. **Keep links language-specific**: English index files should link to `.en.md` files, Spanish to `.es.md`
3. **Use `relref` for internal links**: This ensures Hugo validates links at build time
4. **Test locally**: Build and test locally before deploying

## Hugo Link Syntax

### Correct usage:
```markdown
<!-- Spanish index -->
[Link text]({{% relref "path/to/file.es.md" %}})

<!-- English index -->
[Link text]({{% relref "path/to/file.en.md" %}})
```

### Common mistakes to avoid:
```markdown
<!-- ❌ Wrong: Spanish link in English file -->
[Link text]({{% relref "path/to/file.es.md" %}}) <!-- In _index.en.md -->

<!-- ❌ Wrong: English link in Spanish file -->
[Link text]({{% relref "path/to/file.en.md" %}}) <!-- In _index.es.md -->
```

## Adding New Scripts

When adding new utility scripts:
1. Make them executable: `chmod +x scripts/your-script.sh`
2. Add usage documentation to this README
3. Include error handling and clear output messages
4. Use consistent exit codes (0 for success, non-zero for errors)
