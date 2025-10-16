# Translation Architecture

This project uses Hugo's native i18n system for multilingual support. This is a robust, scalable, and maintainable approach.

## Structure

### Translation Files

Translations are stored in TOML format in the `i18n/` directory:

- `i18n/es.toml` - Spanish translations
- `i18n/en.toml` - English translations

### Usage in Templates

Instead of using a large dictionary embedded in templates, use Hugo's `i18n` function:

{{ i18n "hero_title" }}
```

## Adding New Translations

1. Open the appropriate language file (`i18n/es.toml` or `i18n/en.toml`)
2. Add a new entry:
   ```toml
   [new_key]
   other = "Translation text here"
   ```
3. Use it in your template:
   ```hugo
   {{ i18n "new_key" }}
   ```