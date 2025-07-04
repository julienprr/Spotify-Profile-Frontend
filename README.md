# 🎵 Spotify Profile

➡️ 🇫🇷 [French version](README.fr.md)

Spotify Profile is a web application that allows you to manage and organize your Spotify playlists in an advanced way. It provides a modern and intuitive interface to view your playlists, favorite tracks, and artists, while giving you the ability to customize your listening experience.

🌐 **Live application link:**
[https://play-manager.julienprr.com](https://play-manager.julienprr.com)

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 20.x
- npm >= 8.x
- Docker (optional for containerization)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/julienprr/spotify-profile-frontend.git
   cd spotify-profile-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application in development mode:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production
```bash
npm run build
npm run preview
```

### Using Docker
```bash
docker build -t spotify-profile-frontend .
docker run -p 80:80 spotify-profile-frontend
```

---

## 📖 User Guide

### 🔑 Login
- On your first visit, click **“Login with Spotify”**.
- You will be redirected to Spotify to authorize the app to access your playlists and tracks.
- Once authenticated, you’ll automatically be redirected to the Spotify Profile home page.

### 🎵 Navigation
- **Profile**: Displays your most-listened tracks and artists.
- **Top Tracks**: Shows your favorite songs over 3, 6, or 12 months.
- **Top Artists**: View your favorite artists and access their details.
- **Playlists**: Lists all your playlists and allows you to access their details.
- **Playlist Details**: Lets you sort, copy, or clear a playlist, and enable/disable auto-sorting.

### ❤️ Favorites
- Add or remove playlists from your favorites using the heart button.
- Favorite playlists appear at the top of the list.

### 🔄 Auto-Sorting
- Enable auto-sorting to keep your playlist updated daily.
- Disable it anytime from the details page or via the context menu.

### 🚪 Logout
- Click **“Logout”** in the menu to switch accounts or disconnect.

---

## ✨ Main Features

- ✅ Secure login with Spotify (OAuth2)
- ✅ View playlists, favorite tracks, and favorite artists
- ✅ Automatically sort playlists by release date or shuffle
- ✅ Add or remove playlists from favorites
- ✅ Copy and clear playlists

---

## ⚙️ Technical Features

- Frontend **React + Vite** with **TypeScript**
- Modern UI with **TailwindCSS** and **Radix UI**
- State management using **Redux Toolkit**
- Communication with a backend API secured with JWT
- Containerization with **Docker** and deployment on VPS
- Responsive design (mobile and desktop)

---

## 📖 Documentation

For more details on the backend API and overall project structure, see [play-manager-backend](https://github.com/julienprr/play-manager-backend).

---

## 👨‍💻 Author

Developed by [julienprr](https://github.com/julienprr)

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
