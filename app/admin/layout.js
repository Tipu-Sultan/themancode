"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Code2,
  Video,
  Settings,
  Menu,
  X,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // ShadCN Skeleton
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect if not authenticated or not an admin
  useEffect(() => {
    if (status === "unauthenticated" || (session && !session?.user?.isAdmin)) {
      router.push("/");
    }
  }, [status, session, router]);

  // Loading state with ShadCN Skeleton
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background">
        {/* Skeleton for Sidebar */}
        <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-card border-r">
          <div className="p-4 py-16">
            <Skeleton className="h-8 w-3/4 mb-8" />
            <nav className="space-y-2">
              {[...Array(7)].map((_, index) => (
                <Skeleton key={index} className="h-10 w-full" />
              ))}
            </nav>
          </div>
        </aside>

        {/* Skeleton for Main Content */}
        <main className="md:ml-64 p-8 pt-20">
          <div className="space-y-4">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </main>
      </div>
    );
  }

  // If not admin or unauthenticated, return null (handled by useEffect)
  if (status === "unauthenticated" || (session && !session?.user?.isAdmin)) {
    return null;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: User, label: "Users", href: "/admin/users" },
    { icon: FileText, label: "Blog Posts", href: "/admin/blogs" },
    { icon: FileText, label: "Projects", href: "/admin/projects" },
    { icon: Code2, label: "Code Snippets", href: "/admin/snippets" },
    { icon: Video, label: "Videos", href: "/admin/videos" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen pb-16 lg:pb-0 bg-background">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-20 left-4 z-50">
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
        <div className="p-4 pt-20"> {/* Adjusted padding for DesktopNav */}
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
          "md:ml-64 p-8 pt-20" // pt-20 clears DesktopNav (h-16 + some spacing)
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