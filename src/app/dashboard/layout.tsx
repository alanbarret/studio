'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, History, CreditCard, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

const dashboardNavItems = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/dashboard/history', label: 'History', icon: History },
    { href: '/dashboard/payments', label: 'Payments', icon: CreditCard },
    { href: '/dashboard/subscriptions', label: 'Profile', icon: User },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
           <Link href="/dashboard" className="flex items-center space-x-2">
              <Icons.logo className="h-6 w-6 text-primary" />
              <span className="font-bold sm:inline-block">
                CleanSweep
              </span>
          </Link>
          {/* You can add settings or notification icons here later */}
        </div>
      </header>
      <main className="flex-1 pb-24">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-around">
          {dashboardNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary',
                  isActive && 'text-primary'
                )}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
