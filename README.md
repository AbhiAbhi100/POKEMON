# Pokédex Lite ⚡

A highly polished, recruiter-ready web application built to explore the Pokémon universe. This project was developed to fulfill the "Pokédex Lite" assignment, successfully completing **100% of all Mandatory and Bonus Requirements**.

## 🌟 Live Demo
[https://pokemon-pearl-kappa.vercel.app/](https://pokemon-pearl-kappa.vercel.app/)

---

## ✨ Features Implemented

### 🎯 Mandatory Requirements
- **Data Fetching**: Fully integrated with the public **PokéAPI**. Features robust loading skeletons, error handling, and parallel fetching to ensure a snappy user experience.
- **Listing & UI**: A fully responsive (Mobile, Tablet, Desktop) premium grid layout featuring sleek glassmorphism design and custom `CometCards`.
- **Real-time Search**: Includes a debounced search input that instantly filters through a locally cached list of 1300+ Pokémon to support *partial text matching* (overcoming PokeAPI's exact-match limitation).
- **Dynamic Type Filtering**: A custom-built, responsive "Mega Menu" dropdown that allows users to filter the Pokédex by specific elemental types (Fire, Water, Ghost, etc.).
- **Pagination**: Implemented Next/Previous pagination orchestration that flawlessly syncs with both Type Filtering and standard API limits.
- **Persistent Favorites**: Users can favorite Pokémon directly from the grid or details page. Favorites are persisted in `localStorage` and tied directly to the user's authentication profile.
- **Detail View**: A dedicated, detailed page route showing large official artwork, ID, dimensions, and type badges.

### 🚀 Bonus Requirements (Fully Completed)
- **User Authentication (OAuth)**: Integrated `NextAuth.js` with **Google OAuth**. The application allows public access to the main Pokédex while protecting local storage `favorites` behind an authenticated user session.
- **High-Fidelity Animations**: Integrated `Framer Motion` and custom CSS physics for page-level transitions, hover scaling, glow effects, and a stunning `CanvasText` hero landing page.
- **Server-Side Rendering (SSR)**: The application utilizes **Next.js 16 (App Router)**. The detailed Pokémon pages (`/pokemon/[name]`) are explicitly Server-Rendered components, automatically generating dynamic SEO metadata (`generateMetadata`) to ensure lightning-fast initial loads and top-tier indexing.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js (App Router)](https://nextjs.org/) - Chosen for its native support for Server-Side Rendering (SSR), seamless API routes, and file-based routing.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Chosen for rapid, utility-first UI development allowing for highly custom glassmorphism and modern gradient designs.
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) - Simplifies the complex OAuth flow into a few lines of configuration.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & Aceternity UI principles - Chosen to elevate the UX from a standard project to a premium, production-level product.

---


## 💻 Running Locally

### Prerequisites
- Node.js (v18 or higher)
- A Google Cloud Console project (for OAuth Credentials)

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd pokedex-lite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   GOOGLE_ID=your_google_client_id
   GOOGLE_SECRET=your_google_client_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=a_random_secure_string_for_encryption
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```

5. **Explore:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.
