'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const { toast } = useToast();

  const handleSendOtp = () => {
    // Basic phone number validation
    if (!/^\+[1-9]\d{1,14}$/.test(phone)) {
      toast({
        variant: "destructive",
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number with a country code (e.g., +1234567890).",
      });
      return;
    }
    
    // In a real app, you would call your API here:
    // POST /consumer/login-otp with { phone }
    console.log('Sending OTP to', phone);
    toast({
      title: "OTP Sent",
      description: `A one-time password has been sent to ${phone}.`,
    });
  };

  const handleVerify = () => {
    // In a real app, you would call your API here:
    // POST /consumer/verify-otp with { phone, otp }
    console.log('Verifying OTP', otp, 'for', phone);
    if (otp === '123456') { // Mock verification
        // On success, you'd handle the JWT token and redirect.
        // For now, we'll just link to the dashboard.
    } else {
        toast({
            variant: "destructive",
            title: "Invalid OTP",
            description: "The OTP you entered is incorrect. Please try again.",
        });
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
             <Link href="/" className="flex items-center space-x-2">
                <Icons.logo className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">
                CleanSweep
                </span>
            </Link>
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Enter your phone number to receive a one-time password.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="+1234567890" 
                required 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="otp">One-Time Password</Label>
              <Input 
                id="otp" 
                type="text" 
                placeholder="_ _ _ _ _ _" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <Button type="button" variant="secondary" className="w-full" onClick={handleSendOtp}>Send OTP</Button>
            <Button asChild className="w-full" onClick={handleVerify}>
              <Link href={otp === '123456' ? "/dashboard" : '#'}>Verify & Sign In</Link>
            </Button>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/" className="underline text-primary">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
