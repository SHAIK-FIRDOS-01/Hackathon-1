# FeedFlow 🌊

> A lightweight React Native mobile application that helps users personalize their Instagram experience by running an automated background system that reinforces content preferences.

---

## ✨ Overview

FeedFlow is a premium mobile app built with **Expo**, **Expo Router**, **NativeWind (Tailwind CSS)**, and **Supabase**. The app allows users to define content preferences and runs a smart automation layer in the background to continuously curate and reinforce those preferences on Instagram.

---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| [Expo SDK 56](https://docs.expo.dev/versions/v56.0.0/) | React Native framework & tooling |
| [Expo Router v4](https://docs.expo.dev/router/introduction/) | File-based navigation |
| [NativeWind v4](https://www.nativewind.dev/) | Tailwind CSS for React Native |
| [Supabase](https://supabase.com/) | Backend-as-a-Service (Auth, DB, Realtime) |
| [TypeScript](https://www.typescriptlang.org/) | Strict type safety |
| [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) | Smooth animations |

---

## 📁 Project Architecture

```
.
├── app/                          # Expo Router file-based navigation
│   ├── _layout.tsx               # Root layout — wraps all global providers
│   ├── (auth)/                   # Authentication flow (unauthenticated users)
│   │   ├── _layout.tsx
│   │   ├── login.tsx             # Login screen
│   │   └── onboarding.tsx        # Onboarding screen
│   └── (tabs)/                   # Main tab navigation (authenticated users)
│       ├── _layout.tsx
│       ├── index.tsx             # Dashboard / Automation Status
│       ├── preferences.tsx       # User content preferences
│       ├── analytics.tsx         # Automation analytics
│       └── settings.tsx          # App settings
│
├── components/                   # Reusable UI components
│   ├── ui/
│   │   ├── Button.tsx            # Styled button atom
│   │   ├── Card.tsx              # Card container atom
│   │   ├── Input.tsx             # Text input atom
│   │   └── Text.tsx              # Themed text atom
│   └── CustomBottomSheet.tsx     # Reusable bottom sheet molecule
│
├── context/                      # Global state via React Context API
│   ├── AuthContext.tsx           # Auth state synced to Supabase session
│   └── AutomationContext.tsx     # Automation engine state & controls
│
├── hooks/                        # Custom React hooks
│   ├── useSupabase.ts            # Hook to access auth context/session
│   └── useHaptics.ts             # Haptic feedback abstraction
│
├── lib/                          # Third-party service clients
│   └── supabase.ts               # Supabase JS client (with AsyncStorage)
│
├── types/                        # Shared TypeScript interfaces
│   └── index.ts
│
├── utils/                        # Shared helper functions
│   └── helpers.ts
│
├── tailwind.config.js            # NativeWind / Tailwind configuration
├── metro.config.js               # Metro bundler with NativeWind plugin
├── global.css                    # Tailwind directive entrypoint
└── nativewind-env.d.ts           # TypeScript declarations for className props
```

---

## 🎨 Design System

The app uses a **dark-mode-first** color palette built on deep neutral tones with sleek blue and violet accents.

| Token | Color | Hex |
|---|---|---|
| `background` | Zinc 950 | `#09090b` |
| `foreground` | Zinc 50 | `#fafafa` |
| `card` | Zinc 900 | `#18181b` |
| `secondary` | Zinc 800 | `#27272a` |
| `primary` | Blue 500 | `#3b82f6` |
| `accent` | Violet 500 | `#8b5cf6` |

---

## 🔑 TypeScript Types

All core domain models are declared in [`types/index.ts`](./types/index.ts):

```ts
// Connection status for the Instagram integration
type InstagramConnectionStatus = 'connected' | 'disconnected' | 'processing';

// User's defined content preferences
interface UserPreference {
  id: string;
  user_id: string;
  keywords: string[];
  target_sentiment: 'positive' | 'neutral' | 'any';
  updated_at: string;
}

// Log entry for each automation action performed
interface AutomationLog {
  id: string;
  user_id: string;
  action_type: 'like' | 'comment' | 'follow' | 'unfollow';
  target_url?: string;
  status: 'success' | 'failure' | 'pending';
  timestamp: string;
}
```

---

## ⚙️ Global State

### `AuthContext`
- Listens to `supabase.auth.onAuthStateChange` on mount.
- Exposes `session`, `user`, and `loading` state.
- Accessed via the `useSupabase()` hook.

### `AutomationContext`
- Manages `isActive`, `lastSyncTime`, `completedActionsCount`.
- Provides `toggleAutomation()` and `triggerMockTask()` methods.
- Designed for easy extension into a real background task system.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your device or an Android/iOS simulator

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/SHAIK-FIRDOS-01/Hackathon-1.git
cd Hackathon-1

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Set up environment variables
# Create a .env file in the root directory:
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 4. Start the development server
npx expo start
```

### Running on Device

```bash
# Android
npx expo start --android

# iOS
npx expo start --ios

# Web (development preview)
npx expo start --web
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root. These are read by Expo at build time:

```env
EXPO_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

> **Note:** Never commit your `.env` file. It is already included in `.gitignore`.

---

## 📦 Key Dependencies

```json
{
  "expo": "~56.0.11",
  "expo-router": "~56.2.10",
  "nativewind": "^4.2.5",
  "tailwindcss": "^3.4.19",
  "@supabase/supabase-js": "^2.108.1",
  "@react-native-async-storage/async-storage": "^2.2.0",
  "react-native-reanimated": "^4.3.1",
  "react-native-safe-area-context": "~5.7.0",
  "react-native-screens": "^4.25.2"
}
```

---

## 🧪 Type Checking

```bash
npx tsc --noEmit
```

The project is configured with strict TypeScript and passes type checking with zero errors.

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.
