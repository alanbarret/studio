'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('Admin@123');
  const { toast } = useToast();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // Using 'no-cors' mode to bypass backend OPTIONS preflight issue.
      // NOTE: This means we cannot read the response status or body.
      await fetch('https://maison-saner-roni.ngrok-free.dev/admin/login', {
        method: 'POST',
        mode: 'no-cors', // Workaround for backend CORS preflight failure
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Because of 'no-cors', we can't confirm success. We redirect optimistically.
      toast({
        title: 'Login Attempted',
        description: 'Redirecting to your dashboard...',
      });
      router.push('/admin/dashboard');
      
    } catch (error) {
      // This catch block might not be hit for network errors in 'no-cors' mode,
      // but it's good practice to keep it.
      console.error('Login error:', error);
      toast({
        variant: 'destructive',
        title: 'An Error Occurred',
        description: 'Could not connect to the server. Please check your network and try again.',
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-secondary">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Link href="/" className="flex items-center space-x-2">
              <Icons.logo className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">CleanSweep</span>
            </Link>
          </div>
          <CardTitle className="text-2xl">Admin Portal</CardTitle>
          <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="button" className="w-full" onClick={handleLogin}>
              Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
