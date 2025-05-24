import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ClientProvider from "./ClientProvider";
import FooterWithRouteCheck from "./FooterWithRouteCheck";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tipu-Sultan - Full Stack Developer",
  description:
    "As Full Stack Developer Portfolio showcasing expertise in Next.js, MERN, PHP, Laravel, and MySQL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Analytics/>
          <ClientProvider>
            <Toaster />
            <Navbar />
            <main className="min-h-screen">{children}</main>
          </ClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
