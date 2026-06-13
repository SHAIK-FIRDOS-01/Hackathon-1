<div align="center">
  <img src="assets/icon.png" alt="App Icon" width="120" />
  <h1>🚀 Hackathon Project</h1>
  <p>A modern, performant, and beautifully designed mobile application built for the hackathon.</p>

  <p>
    <a href="https://reactnative.dev/"><img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" /></a>
    <a href="https://expo.dev/"><img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" /></a>
    <a href="https://supabase.com/"><img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  </p>
</div>

## 📖 Overview

This Hackathon project is a cross-platform mobile application powered by **Expo** and **React Native**. It features a robust authentication flow seamlessly integrated with **Supabase**, intuitive tabbed navigation using **Expo Router**, and a sleek user interface styled with **NativeWind** (Tailwind CSS).

The application currently features a specialized **Automation Dashboard** to track tasks and actions, providing a foundation for scalable, high-performance mobile solutions.

---

## ✨ Features

- **🔐 Secure Authentication:** Complete sign-up, login, and onboarding flows powered by Supabase.
- **🧭 Dynamic Routing:** File-based navigation via Expo Router for a seamless user experience.
- **🎨 Beautiful UI:** Styled with NativeWind, offering a fully customizable and modern aesthetic.
- **⚙️ Automation Tracker:** A dedicated dashboard to monitor and manage automated tasks and completed actions.
- **📱 Cross-Platform:** Write once, deploy anywhere (iOS, Android, and Web).
- **🗂️ State Management:** Efficient global state handling using React Context API.

---

## 🛠️ Tech Stack

- **Framework:** [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/)
- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/)
- **Styling:** [NativeWind](https://www.nativewind.dev/) (Tailwind CSS)
- **Backend as a Service:** [Supabase](https://supabase.com/)
- **Language:** TypeScript

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Expo Go app on your physical device (or an iOS Simulator/Android Emulator)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SHAIK-FIRDOS-01/Hackathon-1.git
   cd Hackathon-1
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the `frontend` folder of your project and add your Supabase credentials:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

### Running the App (Frontend)

1. **Navigate to the frontend folder and install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the Expo development server:**
   ```bash
   npm start
   ```
   This will open the Expo developer tools in your browser. You can then:
   - Scan the QR code with the **Expo Go** app (Android) or the Camera app (iOS) to view it on a device.
   - Press `i` to open in an iOS simulator.
   - Press `a` to open in an Android emulator.
   - Press `w` to open in a web browser.

### Running the Phantom Engine (Backend)

1. **Navigate to the backend folder and install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Run the automation scroller bot:**
   ```bash
   node engine.js
   ```
   This will launch a non-headless mobile browser simulating Instagram explore feed scrolling under your defined algorithmic preferences.

---

## 📂 Project Structure

```text
Hackathon-1/
├── frontend/             # React Native Expo Frontend Application
│   ├── app/              # Expo Router file-based routing
│   │   ├── (auth)/       # Authentication screens (Login, Onboarding)
│   │   ├── (tabs)/       # Main application tabs (Dashboard, Analytics, Settings)
│   │   └── _layout.tsx   # Root layout
│   ├── assets/           # Images, fonts, and icons
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context providers (Auth, Automation)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # External library configurations (e.g., Supabase)
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Helper functions and utilities
└── backend/              # Node.js Puppeteer Automation Backend Engine
    ├── engine.js         # Headless browser scroller automation bot script
    └── package.json      # Backend configuration & Puppeteer dependency
```

---

## 🤝 Contributing

Contributions are always welcome! If you have ideas for improvements, please feel free to fork the repository and submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
