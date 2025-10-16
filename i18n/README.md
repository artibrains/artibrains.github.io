# Translation Architecture

This project uses Hugo's native i18n system for multilingual support. This is a robust, scalable, and maintainable approach that ensures consistency across all components.

## Structure

### Translation Files

All translations are centrally managed in TOML files in the `i18n/` directory:

- **`i18n/es.toml`** - Spanish translations (all components)
- **`i18n/en.toml`** - English translations (all components)

Each file is organized by component with clear section headers for easy navigation.

### Component Organization

The translation files are organized into logical sections:

1. **Main Page** (`hero_title`, `hero_subtitle`, etc.) - Landing page translations
2. **Medical Context** (`medical_context_*`) - Medical scenario components
3. **Demo/Context Intro** (`demo_*`) - Interactive demo introductions
4. **Terminal** (`terminal_*`) - Terminal component
5. **AI Timeline** (`timeline_*`) - Timeline visualization component

### Usage in Templates

**Never use embedded translation dictionaries in shortcodes.** Always use Hugo's `i18n` function:

```hugo
{{ i18n "hero_title" }}
{{ i18n "demo_medical_context" }}
{{ i18n "timeline_references" }}
```

This approach:
- ✅ Centralizes all translations in one place
- ✅ Makes it easy to find and update translations
- ✅ Prevents duplication and inconsistencies
- ✅ Supports Hugo's language switching automatically
- ✅ Scales well as the project grows

## Adding New Translations

### For New Text Strings

1. Choose a descriptive key name following the naming convention:
   - Use component prefix (e.g., `demo_`, `timeline_`, `medical_context_`)
   - Use snake_case for the key name
   - Be descriptive but concise

2. Add the translation to both language files:

   **In `i18n/es.toml`:**
   ```toml
   [component_new_key]
   other = "Texto en español"
   ```

   **In `i18n/en.toml`:**
   ```toml
   [component_new_key]
   other = "Text in English"
   ```

3. Use in your shortcode or template:
   ```hugo
   {{ i18n "component_new_key" }}
   ```

### For New Components

1. Add a section header comment in both files:
   ```toml
   # English/Spanish translations for [component_name] shortcode
   ```

2. Add all translations for that component below the header

3. Update this README with the new component section

## Migration Notes

All shortcodes have been migrated to use the centralized i18n system:
- ✅ `main_page.html` - Landing page
- ✅ `medical-context.html` - Medical contexts
- ✅ `context-intro.html` - Demo introductions
- ✅ `demo-intro.html` - Alternative demo intro
- ✅ `terminal.html` - Terminal component
- ✅ `ai-timeline.html` - Timeline visualization

Old backup files and embedded translation dictionaries have been removed.