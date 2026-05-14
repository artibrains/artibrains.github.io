# Recovery Guide: Trilogy Homepage and Sidebar

This backup captures the pre-change state where the homepage presents the trilogy and books 2 and 3 are visible in the left sidebar.

Backup date: 2026-05-14

## Files in this backup

- content/_index.en.md.backup
- content/_index.es.md.backup
- content/learning-without-a-teacher/_index.en.md.backup
- content/learning-without-a-teacher/_index.es.md.backup
- content/eyes-and-ears/_index.en.md.backup
- content/eyes-and-ears/_index.es.md.backup

## What changed in production after this backup

1. Homepage now redirects directly to the published book:
   - / -> /how-machines-think/
   - /es/ -> /es/how-machines-think/
2. Books 2 and 3 are hidden from sidebar by setting hidden: true in their section frontmatter.
3. URLs and content pages are preserved.

## How to restore trilogy homepage and sidebar visibility

1. Restore homepage source files:
   - Replace content/_index.en.md with content/_index.en.md.backup
   - Replace content/_index.es.md with content/_index.es.md.backup
2. Restore sidebar visibility for books 2 and 3:
   - Replace content/learning-without-a-teacher/_index.en.md with backup copy
   - Replace content/learning-without-a-teacher/_index.es.md with backup copy
   - Replace content/eyes-and-ears/_index.en.md with backup copy
   - Replace content/eyes-and-ears/_index.es.md with backup copy
3. Build and validate the site:
   - Root homepage shows trilogy landing again
   - Left sidebar shows books 1, 2 and 3 again
   - Book 1 routes remain unchanged

## Optional restore commands (from repository root)

cp backups/trilogy-2026-05-14/content/_index.en.md.backup content/_index.en.md
cp backups/trilogy-2026-05-14/content/_index.es.md.backup content/_index.es.md
cp backups/trilogy-2026-05-14/content/learning-without-a-teacher/_index.en.md.backup content/learning-without-a-teacher/_index.en.md
cp backups/trilogy-2026-05-14/content/learning-without-a-teacher/_index.es.md.backup content/learning-without-a-teacher/_index.es.md
cp backups/trilogy-2026-05-14/content/eyes-and-ears/_index.en.md.backup content/eyes-and-ears/_index.en.md
cp backups/trilogy-2026-05-14/content/eyes-and-ears/_index.es.md.backup content/eyes-and-ears/_index.es.md
