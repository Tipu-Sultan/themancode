import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import ClientProvider from './ClientProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Portfolio - Full Stack Developer',
  description: 'Full Stack Developer Portfolio showcasing expertise in Next.js, MERN, PHP, Laravel, and MySQL',
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
          <ClientProvider>
           <Toaster/>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          </ClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}