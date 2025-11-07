'use client'

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Repeat, LogOut, Edit } from 'lucide-react';
import { user, userSubscriptions } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, you'd handle token invalidation etc.
    router.push('/');
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>My Subscriptions</CardTitle>
          <CardDescription>Manage your active and past plans.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
        {userSubscriptions.map((sub) => (
          <div key={sub.id} className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-semibold flex items-center gap-2">
                {sub.planName}
                <Badge variant={sub.status === 'Active' ? 'default' : 'secondary'} className={sub.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ''}>
                  {sub.status}
                </Badge>
              </p>
              <p className="text-sm text-muted-foreground">
                ${sub.price}/month | Renews {sub.nextBillingDate}
              </p>
            </div>
            {sub.status === 'Active' ? (
                <Button variant="outline" size="sm">Manage</Button>
              ) : (
                <Button variant="secondary" size="sm"><Repeat className="mr-2 h-4 w-4" />Renew</Button>
              )}
          </div>
        ))}
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard/plans">
              <PlusCircle className="mr-2 h-4 w-4" /> View All Plans
            </Link>
          </Button>
        </CardFooter>
      </Card>


      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          <Edit className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
        <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-destructive hover:text-destructive">
          <LogOut className="mr-2 h-4 w-4" /> Log Out
        </Button>
      </div>

    </div>
  );
}
