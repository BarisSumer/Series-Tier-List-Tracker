# Assets Required

This project requires the following assets in the `assets/` directory:

## Icon Files

1. **icon.png** - App icon (1024x1024 recommended)
2. **splash.png** - Splash screen image
3. **adaptive-icon.png** - Android adaptive icon
4. **favicon.png** - Web favicon

## Font Files (Optional)

If you want to use custom fonts, add them to `assets/fonts/`:

- SpaceGrotesk-Bold.ttf
- SpaceGrotesk-Medium.ttf
- SpaceGrotesk-Regular.ttf

**Note:** You can use any fonts you prefer. Update the `app.json` file accordingly.

## Quick Setup

You can use placeholder images for development:

1. Create an `assets/` folder in the project root
2. Add any 1024x1024 PNG image as `icon.png`
3. Use the same image for `splash.png`, `adaptive-icon.png`, and `favicon.png`
4. Remove or comment out the fonts section in `app.json` if not using custom fonts

## Removing Font Plugin

If you don't want to use custom fonts, remove the plugins section from `app.json`:

```json
{
  "expo": {
    "plugins": []
  }
}
```
