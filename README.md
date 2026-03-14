

# 🎬 MovieFlex - Movie Discovery App

Modern web application for discovering and exploring movies.

Browse trending titles, search for specific movies, and view detailed information in a clean, responsive interface.

---

## ✨ Features

- 🔍 Instant search by movie title
- 🔥 Trending movies section (sorted by popularity)
- 📽️ Browse current popular & trending titles
- 🎞️ Fully responsive layout (mobile, tablet, desktop)
- 🌀 Smooth loading indicators
- 🧩 Modular and reusable component structure
- 🌙 Modern dark-themed user interface

---

## 🛠 Tech Stack

- **React.js** + **Vite**
- **Tailwind CSS**
- **Appwrite** (authentication, database, backend services)
- **TMDB API** (movie metadata)
- **react-use** (utility hooks)

---

## 🚀 Quick Start

### Prerequisites

- Git
- Node.js 18 or newer
- npm / pnpm / yarn

### 1. Clone the repository

```bash
git clone [https://github.com/Abdul00YO/movie-app.git](https://github.com/Abdul00YO/movie-app.git)
cd movie-app

```


### 2. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn install

```

### 3. Create `.env.local` in the project root

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id_here
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id_here
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id_here

```

You will need:

* TMDB API key → https://developer.themoviedb.org/docs
* Appwrite project credentials

### 4. Start development server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev

```

Open http://localhost:5173 in your browser.

---

## 📁 Project Structure

```text
movie-app/
├── public/               # static assets
├── src/
│   ├── assets/           # images, icons
│   ├── components/       # reusable UI pieces
│   ├── pages/            # main views
│   ├── services/         # API & backend logic
│   ├── hooks/            # custom hooks
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css         # global styles + Tailwind
├── .env.local.example
├── vite.config.js
├── package.json
└── README.md

```

---

## 📄 License

MIT License

You are free to use, modify, and distribute this project.

```

Would you like any help setting up the `.env.local.example` file to include in your repository so others know which keys are needed?

```
