# Contributing to Series Tier List & Tracker

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Development Setup

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/series-tier-list-tracker.git
   cd series-tier-list-tracker
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Code Style

- Follow existing code conventions
- Use TypeScript for type safety
- Use NativeWind (Tailwind CSS) for styling
- Keep components small and focused
- Use functional components with hooks

## Project Structure

```
├── components/      # Reusable UI components
├── constants/       # App constants and configurations
├── screens/         # Screen components
├── services/        # API services and external integrations
├── store/           # Zustand state management
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── App.tsx          # Main app entry point
```

## Adding New Features

### 1. Add TypeScript Types

If your feature requires new data structures, add types to `types/index.ts`:

```typescript
export interface YourNewType {
  id: number;
  name: string;
}
```

### 2. Update State Management

If your feature requires state, add to `store/index.ts`:

```typescript
export interface AppState {
  yourNewState: YourNewType[];
  yourNewAction: (data: YourNewType) => void;
}
```

### 3. Create Components

Add reusable components to `components/`:

```typescript
import React from 'react';
import { View } from 'react-native';

export default function YourComponent({ prop }: YourComponentProps) {
  return (
    <View className="bg-gray-900">
      {/* Your component */}
    </View>
  );
}
```

### 4. Create Screens

Add new screens to `screens/`:

```typescript
import React from 'react';
import { View } from 'react-native';

export default function YourScreen() {
  return (
    <View className="flex-1 bg-gray-950">
      {/* Your screen */}
    </View>
  );
}
```

### 5. Add Navigation

Update `App.tsx` to add new screens to the tab navigator:

```typescript
<Tab.Screen name="YourScreen" component={YourScreen} />
```

## Testing

Before submitting a pull request:
- Test on iOS simulator
- Test on Android emulator
- Test on web browser
- Verify Safe Area compliance
- Test both dark and light themes
- Test both English and Turkish languages

## Submitting Changes

1. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

2. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Provide a clear description of your changes

## Commit Messages

Follow conventional commits:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for code style changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

Example:
```
feat: add dark mode toggle in settings

Implemented dark/light theme toggle in Settings screen.
Users can now switch between themes and preference is persisted.
```

## Issues

When creating an issue:
- Use clear and descriptive titles
- Provide detailed reproduction steps
- Include screenshots/videos if applicable
- Specify the platform (iOS/Android/Web)
- Specify the Expo SDK version

## Code Review

- Be respectful and constructive
- Provide clear feedback
- Address review comments promptly
- Test reviewer suggestions

## Questions?

Feel free to open an issue with the "question" label for any questions about contributing.

---

Happy contributing! 🎉
