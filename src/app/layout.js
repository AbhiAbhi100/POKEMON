import { Inter } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from "@/store/favorites";
import { Header } from "@/components/layout/header";
import { AuthProvider } from "@/components/layout/auth-provider";
import { PageTransition } from "@/components/ui/page-transition";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pokedex Lite",
  description: "A premium, responsive Pokedex application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0a0a0a] min-h-screen flex flex-col text-white antialiased selection:bg-purple-500/30 selection:text-white overflow-x-hidden`}>
        <AuthProvider>
          <FavoritesProvider>
            <Header />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] pointer-events-none"></div>
              <div className="relative z-10">
                <PageTransition>{children}</PageTransition>
              </div>
            </main>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
