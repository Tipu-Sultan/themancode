'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import MobileNav from './layout/MobileNav';
import DesktopNav from './layout/DesktopNav';
import { signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const handleSignIn = () => {
    router.push(`/login`);
  };

  const isActiveLink = (href) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/snippets', label: 'Snippets' },
    { href: '/videos', label: 'Videos' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="border-b sticky top-0 bg-gray-50/95 backdrop-blur supports-[backdrop-filter]:bg-gray-50/60 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-900">
            RideMarket
          </Link>

          {/* Mobile/Tablet Right Section */}
          <div className="lg:hidden flex items-center gap-4">
            <ModeToggle />
            {status === 'authenticated' ? (
              <>
                {session?.user?.isAdmin && (
                  <Button
                    asChild
                    variant="outline"
                    className={`transition-colors ${
                      isActiveLink('/admin/dashboard')
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-blue-600 hover:text-white'
                    }`}
                  >
                    <Link href="/admin/dashboard">Admin</Link>
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer hover:ring-2 hover:ring-blue-600 transition-all">
                      <AvatarImage
                        src={session?.user?.image || '/avatar.jpg'}
                        alt="Profile"
                      />
                      <AvatarFallback>
                        {session?.user?.name?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setShowSignOutDialog(true)}
                      className="text-red-600 focus:text-red-600"
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button
                onClick={handleSignIn}
                variant="outline"
                className="hover:bg-blue-600 hover:text-white transition-colors"
              >
                Login
              </Button>
            )}
          </div>

          {/* Desktop Navigation */}
          <DesktopNav
            status={status}
            user={session?.user}
            navItems={navItems}
            setShowSignOutDialog={setShowSignOutDialog}
            handleSignIn={handleSignIn}
            isActiveLink={isActiveLink}
          />
        </div>
      </div>

      {/* Mobile/Tablet Bottom Navigation */}
      <MobileNav
        status={status}
        user={session?.user}
        navItems={navItems}
        setIsOpen={setIsOpen}
      />

      {/* Sign Out Confirmation Dialog */}
      <AlertDialog open={showSignOutDialog} onOpenChange={setShowSignOutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be logged out of your account and redirected to the homepage.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700"
            >
              Sign Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </nav>
  );
}