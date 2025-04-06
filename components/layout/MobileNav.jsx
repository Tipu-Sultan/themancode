// components/MobileNav.jsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Folder, Book, Code, Mail, Menu, User, Shield, MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function MobileNav({ navItems, setIsOpen, user }) {
  const iconMap = {
    Home: <Home className="h-5 w-5" />,
    Projects: <Folder className="h-5 w-5" />,
    Blog: <Book className="h-5 w-5" />,
    Snippets: <Code className="h-5 w-5" />,
    Contact: <Mail className="h-5 w-5" />,
  };

  // Animation variants for sheet items
  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t z-50">
      <div className="flex justify-around items-center py-3">
        {/* Main Navigation Items */}
        {navItems.slice(0, 5).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2"
          >
            {iconMap[item.label]}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}

        {/* Conditional User/Admin Button */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="flex flex-col items-center text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2"
              onClick={() => setIsOpen(true)}
            >
              {user && user.isAdmin ? (
                <Shield className="h-5 w-5" />
              ) : (
                <Avatar className="h-6 w-6">
                  <AvatarImage src={user?.image || ''} alt={user?.name || 'User'} />
                  <AvatarFallback>
                    <MenuIcon className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              <span className="text-xs mt-1">{user && user.isAdmin ? 'Admin' : 'Menu'}</span>
            </button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white dark:bg-gray-900">
            <div className="py-6 space-y-6">
              {/* User Info */}
              <div className="flex items-center gap-3 px-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.image || ''} alt={user?.name || 'User'} />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {user?.name || 'Guest'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email || ''}</p>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <motion.div key={item.href} variants={itemVariants} initial="hidden" animate="visible">
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-md transition-colors flex items-center gap-3"
                      onClick={() => setIsOpen(false)}
                    >
                      {iconMap[item.label]}
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Admin Button (if isAdmin) */}
                {user && user.isAdmin && (
                  <motion.div variants={itemVariants} initial="hidden" animate="visible">
                    <Link
                      href="/admin/dashboard"
                      className="block px-4 py-3 text-lg font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 rounded-md transition-colors flex items-center gap-3"
                      onClick={() => setIsOpen(false)}
                    >
                      <Shield className="h-5 w-5" />
                      Admin Dashboard
                    </Link>
                  </motion.div>
                )}
              </div>

              {/* Contact Button */}
              <div className="pt-4 border-t">
                <Button
                  variant="outline"
                  className="w-full text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-700 hover:bg-indigo-100 dark:hover:bg-indigo-900"
                  asChild
                >
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    Get in Touch
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}