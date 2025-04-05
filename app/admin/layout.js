'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  Code2, 
  Video, 
  Settings,
  Menu,
  X,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  if(!session && session?.user?.isAdmin !== true) {
    router.push('/');
  }

  // Loading state with skeleton
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background">
        {/* Skeleton for Sidebar */}
        <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-card border-r">
          <div className="p-4 py-16">
            {/* Skeleton for Title */}
            <div className="h-8 w-3/4 bg-muted rounded mb-8 animate-pulse" />
            {/* Skeleton for Menu Items */}
            <nav className="space-y-2">
              {[...Array(7)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-muted animate-pulse"
                >
                  <div className="w-5 h-5 bg-gray-300 rounded-full" />
                  <div className="h-4 w-2/3 bg-gray-300 rounded" />
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Skeleton for Main Content */}
        <main className="md:ml-64 p-8 pt-20">
          <div className="space-y-4">
            <div className="h-10 w-1/3 bg-muted rounded animate-pulse" />
            <div className="h-64 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
          </div>
        </main>
      </div>
    );
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: User, label: 'Users', href: '/admin/users' },
    { icon: FileText, label: 'Blog Posts', href: '/admin/blogs' },
    { icon: FileText, label: 'Projects', href: '/admin/projects' },
    { icon: Code2, label: 'Code Snippets', href: '/admin/snippets' },
    { icon: Video, label: 'Videos', href: '/admin/videos' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-4 py-10 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-card border-r",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-4 py-16">
          <h1 className="text-2xl font-bold p-4">Admin Panel</h1>
          <DropdownMenuSeparator />
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  )}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "transition-all duration-300",
          "md:ml-64 p-8 pt-20" // Added pt-20 (80px) to clear navbar
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}