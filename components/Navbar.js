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
import MobileNav from './layout/MobileNav';
import DesktopNav from './layout/DesktopNav';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/snippets', label: 'Snippets' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold">
              Tipu.Sultan
            </Link>

            {/* Mobile/Tablet Right Section */}
            <div className="lg:hidden flex items-center gap-4">
              <ModeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                    <AvatarImage src="/avatar.jpg" alt="Profile" />
                    <AvatarFallback>TS</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Desktop Navigation */}
            <DesktopNav navItems={navItems} />
          </div>
        </div>
      </nav>

      {/* Mobile/Tablet Bottom Navigation */}
      <MobileNav navItems={navItems} setIsOpen={setIsOpen} />
    </>
  );
}