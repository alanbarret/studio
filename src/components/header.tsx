
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Menu, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#plans', text: 'Pricing' },
    { href: '/login', text: 'Sign In' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">CleanSweep</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
             <Link href="#features" className="text-foreground/60 transition-colors hover:text-foreground/80">Features</Link>
             <Link href="#plans" className="text-foreground/60 transition-colors hover:text-foreground/80">Pricing</Link>
             <Link href="#testimonials" className="text-foreground/60 transition-colors hover:text-foreground/80">Testimonials</Link>
             <Link href="#faq" className="text-foreground/60 transition-colors hover:text-foreground/80">FAQ</Link>
        </nav>
        <div className="hidden flex-1 items-center justify-end space-x-2 md:flex">
          <Button asChild variant="ghost">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <SheetHeader>
                <SheetTitle>
                   <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Icons.logo className="h-6 w-6 text-primary" />
                        <span className="font-bold sm:inline-block">CleanSweep</span>
                    </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="p-4">
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary"
                    >
                      {link.text}
                    </Link>
                  ))}
                  <Link
                      href="/admin/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary"
                    >
                      Admin Login
                    </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
