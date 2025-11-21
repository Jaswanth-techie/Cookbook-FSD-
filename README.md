# CookBook 👨‍🍳

A premium, responsive recipe manager application built with React, Vite, and Tailwind CSS.

## ✨ Features

-   **Authentication System**: Sign Up, Login, and Profile management with persistent user sessions.
-   **Recipe Management**: Create, Read, Update, and Delete (CRUD) recipes with ease.
-   **Advanced Search & Filter**: Real-time search by title/ingredients and filtering by cuisine.
-   **Favorites System**: Save your best-loved recipes to your personal collection.
-   **Dark Mode**: Fully supported dark theme for comfortable night-time browsing.
-   **Responsive Design**: A "wow" factor UI that works beautifully on mobile, tablet, and desktop.
-   **Interactive UI**: Glassmorphism effects, smooth animations (Framer Motion), and interactive components.
-   **Team Section**: Animated "Meet the Team" section with custom tooltips.

## 🚀 Setup Instructions

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start the Backend (JSON-Server)**:
    Open a terminal and run:
    ```bash
    npx json-server --watch db.json --port 3000
    ```

3.  **Start the Frontend**:
    Open a new terminal and run:
    ```bash
    npm run dev
    ```

4.  **Open the App**:
    Visit `http://localhost:5173` in your browser.

## 🛠️ Technologies Used

-   **Frontend**: React (Vite), Tailwind CSS
-   **Animations**: Framer Motion, GSAP
-   **State Management**: React Context API (Auth, Theme)
-   **Routing**: React Router DOM
-   **Forms**: React Hook Form
-   **Icons**: Lucide React
-   **Backend (Mock)**: JSON-Server
-   **Notifications**: React Hot Toast

## 👤 User Guide

-   **Sign Up**: Create a new account to start saving favorites.
-   **Profile**: View your stats and update your display name in Settings.
-   **Add Recipe**: Share your culinary creations with the community.
-   **Theme**: Toggle between Light and Dark mode using the sun/moon icon.

---
*Built with ❤️ by the CookBook Team*
