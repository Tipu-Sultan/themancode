'use client';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ModeToggle } from '../mode-toggle';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';

export default function DesktopNav({ navItems,user,status,handleSignIn,setShowSignOutDialog,isActiveLink }) {
  const isAdmin = user?.isAdmin;

  return (
    <div className="hidden lg:flex items-center w-full justify-between">
      <div className="flex-1"></div>

      <div className="flex items-center justify-center">
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative group transition-colors ${
                isActiveLink(item.href)
                  ? 'text-foreground font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all ${
                  isActiveLink(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-end gap-4">
        {status === 'authenticated' ? (
          <>
            <ModeToggle />
            {isAdmin && (
              <Button
                asChild
                variant="outline"
                className={`transition-colors ${
                  isActiveLink('/admin/dashboard')
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                <Link href="/admin/dashboard">Admin</Link>
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                  <AvatarImage 
                    src={user?.image || '/avatar.jpg'} 
                    alt="Profile" 
                  />
                  <AvatarFallback>
                    {user?.name?.[0]?.toUpperCase() || 'U'}
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
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
}