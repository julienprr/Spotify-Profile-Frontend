# 🎵 Spotify Profile

➡️  🇬🇧 [Version anglaise](#-english)

Spotify Profile est une application web qui permet de gérer et d'organiser vos playlists Spotify de manière avancée. Elle vous offre une interface moderne et intuitive pour visualiser vos playlists, vos titres préférés et vos artistes, tout en vous donnant la possibilité de personnaliser votre expérience d'écoute.

🌐 **Lien vers l’application en production :**
[https://play-manager.julienprr.com](https://play-manager.julienprr.com)

---

## 🚀 Démarrage rapide

### Prérequis
- Node.js >= 20.x
- npm >= 8.x
- Docker (optionnel pour la conteneurisation)

### Installation
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/julienprr/spotify-profile-frontend.git
   cd spotify-profile-frontend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez l’application en mode développement :
   ```bash
   npm run dev
   ```
4. Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

### Build pour production
```bash
npm run build
npm run preview
```

### Avec Docker
```bash
docker build -t spotify-profile-frontend .
docker run -p 80:80 spotify-profile-frontend
```

---

## 📖 Manuel d’utilisation

### 🔑 Connexion
- Lors de la première visite, cliquez sur **“Se connecter avec Spotify”**.
- Vous serez redirigé vers Spotify pour autoriser l’application à accéder à vos playlists et titres.
- Une fois connecté, vous serez automatiquement redirigé vers l’accueil de Spotify Profile.

### 🎵 Navigation
- **Profile** : Affiche vos titres et artistes les plus écoutés.
- **Top Tracks** : Affiche vos morceaux favoris sur 3, 6 ou 12 mois
- **Top Artists** :Visualisez vos artistes favoris et accédez à leurs informations.
- **Playlists** : Liste toutes vos playlists et accédez a leurs détails.
- **Détails Playlist** : Permet de trier, copier ou vider une playlist, et d’activer/désactiver le tri automatique.

### ❤️ Favoris
- Ajoutez ou supprimez des playlists de vos favoris grâce au bouton cœur.
- Les playlists favorites apparaissent en haut de la liste.

### 🔄 Tri automatique
- Activez le tri automatique pour garder votre playlist toujours à jour.
- Désactivez-le à tout moment dans la page de détails ou via le menu contextuel.

### 🚪 Déconnexion
- Cliquez sur le bouton **“Logout”** dans le menu pour changer de compte ou vous déconnecter.

---

## ✨ Fonctionnalités principales

- ✅ Connexion sécurisée avec Spotify (OAuth2)
- ✅ Visualisation des playlists, titres et artistes favoris
- ✅ Tri automatique des playlists par date de sortie ou aléatoire
- ✅ Ajout et suppression de playlists des favoris
- ✅ Copie et nettoyage des playlists

---

## ⚙️ Fonctionnalités techniques

- Frontend **React + Vite** avec **TypeScript**
- UI moderne avec **TailwindCSS** et **Radix UI**
- Gestion d’état avec **Redux Toolkit**
- Communication avec l’API backend sécurisée via JWT
- Conteneurisation avec **Docker** et déploiement sur VPS
- Support responsive (mobile et desktop)

---

## 📖 Documentation

Pour plus de détails sur l’API backend et la structure globale du projet, consultez [play-manager-backend](https://github.com/julienprr/play-manager-backend).

---

## 👨‍💻 Auteur

Développé par [julienprr](https://github.com/julienprr)

---

## 📜 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.
