
'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { User, UserSubscription } from '@/lib/data';

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('user-token');
    router.push('/');
  };
  
  useEffect(() => {
    const token = localStorage.getItem('user-token');
    if (!token) {
      router.push('/login');
      return;
    }
    
    const getAuthHeaders = () => {
      return new Headers({
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
        'Authorization': `Bearer ${token}`,
      });
    };

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [profileRes, subsRes] = await Promise.all([
          fetch('https://maison-saner-roni.ngrok-free.dev/consumer/profile', { headers: getAuthHeaders() }),
          fetch('https://maison-saner-roni.ngrok-free.dev/consumer/subscriptions', { headers: getAuthHeaders() }),
        ]);

        if (profileRes.status === 401 || subsRes.status === 401) {
          toast({ variant: 'destructive', title: 'Authentication Failed', description: 'Please log in again.' });
          router.push('/login');
          return;
        }

        const profileData = await profileRes.json();
        const subsData = await subsRes.json();

        setUser(profileData);
        setSubscriptions(subsData);

      } catch (error) {
        toast({ variant: 'destructive', title: 'An error occurred.', description: 'Could not fetch your data.' });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [router, toast]);

  if (isLoading) {
    return <div className="p-6">Loading profile...</div>;
  }

  if (!user) {
    return (
      <div className="p-6">
        Could not load profile. Please try logging in again.
        <Button onClick={handleLogout} className="mt-4">Login</Button>
      </div>
    );
  }


  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name ? user.name.charAt(0) : 'U'}</AvatarFallback>
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
        {subscriptions.length > 0 ? (
          subscriptions.map((sub) => (
            <div key={sub.id} className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <div className="font-semibold flex items-center gap-2">
                  {sub.planName}
                  <Badge variant={sub.status === 'Active' ? 'default' : 'secondary'} className={sub.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ''}>
                    {sub.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  ${sub.price}/month | Renews {new Date(sub.nextBillingDate).toLocaleDateString()}
                </p>
              </div>
              {sub.status === 'Active' ? (
                  <Button variant="outline" size="sm">Manage</Button>
                ) : (
                  <Button variant="secondary" size="sm"><Repeat className="mr-2 h-4 w-4" />Renew</Button>
                )}
            </div>
          ))
        ) : (
          <p>No subscriptions found.</p>
        )}
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
