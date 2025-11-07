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

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const { toast } = useToast();
  const router = useRouter();

  const handleSendOtp = () => {
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
    setStep('otp');
  };

  const handleVerify = () => {
    // In a real app, you would call your API here:
    // POST /consumer/verify-otp with { phone, otp }
    console.log('Verifying OTP', otp, 'for', phone);
    if (otp === '123456') { // Mock verification
        toast({
            title: "Success!",
            description: "You've been signed in.",
        });
        router.push('/dashboard');
    } else {
        toast({
            variant: "destructive",
            title: "Invalid OTP",
            description: "The OTP you entered is incorrect. Please try again.",
        });
    }
  };

  const handleBack = () => {
    setOtp('');
    setStep('phone');
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
          <CardDescription>
            {step === 'phone' 
                ? 'Enter your phone number to receive a one-time password.'
                : 'Enter the OTP sent to your phone.'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
            {step === 'phone' ? (
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
                <Button type="button" className="w-full" onClick={handleSendOtp}>Send OTP</Button>
              </div>
            ) : (
                <div className="space-y-4">
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
                    <Button type="button" className="w-full" onClick={handleVerify}>Verify & Sign In</Button>
                    <Button type="button" variant="outline" className="w-full" onClick={handleBack}>Back</Button>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
