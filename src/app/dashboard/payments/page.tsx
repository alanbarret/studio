
'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, CreditCard } from 'lucide-react';
import type { PaymentMethod } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

function getCardIcon(type: string) {
    return <CreditCard className="h-8 w-8 text-muted-foreground" />;
}

export default function PaymentsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  
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

    const fetchPaymentMethods = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://maison-saner-roni.ngrok-free.dev/consumer/payment-methods', {
          headers: getAuthHeaders()
        });

        if (response.status === 401) {
          toast({ variant: 'destructive', title: 'Authentication Failed', description: 'Please log in again.' });
          router.push('/login');
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setPaymentMethods(data);
        } else {
          toast({ variant: 'destructive', title: 'Could not fetch payment methods.' });
        }
      } catch (error) {
         toast({ variant: 'destructive', title: 'An error occurred.' });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPaymentMethods();
  }, [router, toast]);


  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Payment Methods</h1>
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" /> Add
        </Button>
      </div>
      <div className="space-y-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : paymentMethods.length > 0 ? (
          paymentMethods.map((method) => (
            <Card key={method.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getCardIcon(method.type)}
                  <div>
                    <div className="font-medium flex items-center gap-2">
                        {method.type} •••• {method.last4}
                        {method.isDefault && <Badge variant="secondary">Default</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                  </div>
                </div>
                {!method.isDefault && <Button variant="ghost" size="sm">Set default</Button>}
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No payment methods found.</p>
        )}
      </div>
    </div>
  );
}
