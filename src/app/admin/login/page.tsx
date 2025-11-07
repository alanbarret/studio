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
      const response = await fetch('https://maison-saner-roni.ngrok-free.dev/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Assuming the API returns a token, which you might want to store later
        // const data = await response.json(); 
        toast({
          title: 'Login Successful',
          description: "Welcome back! You're being redirected to the dashboard.",
        });
        router.push('/admin/dashboard');
      } else {
        const errorData = await response.json();
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: errorData.message?.message || 'Invalid credentials. Please try again.',
        });
      }
    } catch (error) {
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
