
'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, CreditCard, MoreVertical, Trash2, Star } from 'lucide-react';
import type { PaymentMethod } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

function getCardIcon(brand: string) {
    // In a real app, you would have different icons for different card brands
    return <CreditCard className="h-8 w-8 text-muted-foreground" />;
}

export default function PaymentsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [methodToDelete, setMethodToDelete] = useState<PaymentMethod | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const getAuthHeaders = () => {
    const token = localStorage.getItem('user-token');
    return new Headers({
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '69420',
      'Authorization': `Bearer ${token}`,
    });
  };
  
  const fetchPaymentMethods = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('user-token');
      if (!token) {
        router.push('/login');
        return;
      }
      
      const response = await fetch('https://maison-saner-roni.ngrok-free.dev/stripe/method/getPaymentMethods', {
        headers: getAuthHeaders()
      });

      if (response.status === 401) {
        toast({ variant: 'destructive', title: 'Authentication Failed', description: 'Please log in again.' });
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

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const handleSetDefault = async (methodId: string) => {
    try {
      const response = await fetch(`https://maison-saner-roni.ngrok-free.dev/stripe/method/setDefaultPayment/${methodId}`, {
        method: 'POST',
        headers: getAuthHeaders()
      });

      if (response.status === 401) {
        toast({ variant: 'destructive', title: 'Authentication Failed', description: 'Your session may have expired.' });
        return;
      }

      if (response.ok) {
        toast({ title: 'Default payment method updated.' });
        fetchPaymentMethods();
      } else {
        toast({ variant: 'destructive', title: 'Failed to set default method.' });
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'An error occurred.' });
    }
  };

  const handleDelete = async () => {
    if (!methodToDelete) return;
    try {
      const response = await fetch(`https://maison-saner-roni.ngrok-free.dev/stripe/method/removePaymentMethod/${methodToDelete.id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (response.status === 401) {
        toast({ variant: 'destructive', title: 'Authentication Failed', description: 'Your session may have expired.' });
        setIsDeleting(false);
        setMethodToDelete(null);
        return;
      }

      if (response.ok) {
        toast({ title: 'Payment method removed.' });
        fetchPaymentMethods();
      } else {
        toast({ variant: 'destructive', title: 'Failed to remove method.' });
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'An error occurred.' });
    } finally {
      setMethodToDelete(null);
      setIsDeleting(false);
    }
  };

  const openDeleteDialog = (method: PaymentMethod) => {
    setMethodToDelete(method);
    setIsDeleting(true);
  };


  return (
    <>
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
                    {getCardIcon(method.brand)}
                    <div>
                      <div className="font-medium flex items-center gap-2">
                          <span className="capitalize">{method.brand}</span> •••• {method.last4}
                          {method.isDefault && <Badge variant="secondary">Default</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">Expires {String(method.exp_month).padStart(2, '0')}/{method.exp_year}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {!method.isDefault && (
                        <DropdownMenuItem onClick={() => handleSetDefault(method.id)}>
                          <Star className="mr-2 h-4 w-4" />
                          Set as default
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => openDeleteDialog(method)} className="text-destructive">
                         <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No payment methods found.</p>
              <Button size="sm" className="mt-4">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Payment Method
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <AlertDialog open={isDeleting} onOpenChange={setIsDeleting}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently remove your card ending in {methodToDelete?.last4}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
