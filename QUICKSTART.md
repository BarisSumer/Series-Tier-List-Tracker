# Quick Start Guide

## 1. Install Dependencies

```bash
cd series-tier-list-tracker
npm install
```

## 2. Add Required Assets

Before running the app, you need to add the required assets:

```bash
# Create assets directory
mkdir -p assets
mkdir -p assets/fonts
```

**Option 1: Use Placeholder Images**
- Add any 1024x1024 PNG image as `assets/icon.png`
- Copy it to `assets/splash.png`
- Copy it to `assets/adaptive-icon.png`
- Copy it to `assets/favicon.png`

**Option 2: Use Expo Assets**
- Run `npx expo install expo-image-picker` to add image picker
- Use the Expo asset creation tools

## 3. Remove Fonts (Optional)

If you don't have custom fonts, edit `app.json` and remove the `plugins` section:

```json
{
  "expo": {
    "plugins": []
  }
}
```

## 4. Start the Development Server

```bash
npm start
```

Then press:
- `i` to run on iOS simulator
- `a` to run on Android emulator
- `w` to run in web browser

## 5. Using the App

### Adding Shows to Tier List
1. Go to the **Home** screen
2. Use the search bar to find shows
3. Select a show to add it to the **Unranked** pool
4. Tap any show to open the **Edit Modal**
5. Move it to your desired tier (S, A, B, C, D, F)
6. Use ⬅️ / ➡️ to reorder within the tier

### Adding Shows to Watchlist
1. Go to the **Watchlist** screen
2. Use the search bar to find shows
3. Select a show to add it to your watchlist

### Getting Smart Recommendations
1. Add some shows to **S-Tier** or **A-Tier**
2. Tap the **"✨ Suggest Me a Show"** button
3. Browse recommendations based on your favorites
4. Tap **"Add to Watchlist"** on any show you like

### Analyzing Shows
1. Go to the **Analysis** screen
2. Search for any TV show
3. View the episode rating heatmap
4. Green squares = high rated episodes
5. Red squares = low rated episodes

### Sharing Your Tier List
1. Go to the **Home** screen
2. Tap the **"Share"** button
3. The app will capture your list as an image
4. Share it with friends!

### Changing Theme
1. Go to **Settings**
2. Toggle between **Dark** and **Light** mode

### Changing Language
1. Go to **Settings**
2. Toggle between **English (EN)** and **Türkçe (TR)**

### Clearing All Data
1. Go to **Settings**
2. Tap **"Clear All Data"**
3. This will remove all shows from your tier list and watchlist

## Troubleshooting

### "Cannot resolve module '@/*'"
- Make sure `tsconfig.json` has the paths configuration
- Restart the Metro bundler: `npm start -- --clear`

### TMDB API Errors
- Check your internet connection
- The API key is included in the code
- Rate limiting may occur (max 40 requests per 10 seconds)

### Build Errors on iOS
- Run: `cd ios && pod install`
- Then: `cd .. && npm run ios`

### Build Errors on Android
- Make sure you have Android Studio installed
- Create an AVD (Android Virtual Device)
- Run: `npm run android`

## Features Available

✅ Tier List with S, A, B, C, D, F ranks
✅ Unranked pool section
✅ Tap-to-edit modal (no drag-and-drop)
✅ Smart recommendation engine
✅ Share functionality (view-shot)
✅ Watchlist with grid view
✅ Episode rating heatmap
✅ Dark/Light theme toggle
✅ English/Turkish language support
✅ Safe Area compliance
✅ Persistent data (AsyncStorage)
✅ Modern, premium UI

Enjoy using the Series Tier List & Tracker!
