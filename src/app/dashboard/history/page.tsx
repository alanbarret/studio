
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import type { Booking } from '@/lib/data';


export default function HistoryPage() {
  const [bookingHistory, setBookingHistory] = useState<Booking[]>([]);
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

    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://maison-saner-roni.ngrok-free.dev/consumer/bookings', {
          headers: getAuthHeaders(),
        });
        
        if (response.status === 401) {
          toast({ variant: 'destructive', title: 'Authentication Failed', description: 'Please log in again.' });
          router.push('/login');
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setBookingHistory(data);
        } else {
          toast({ variant: 'destructive', title: 'Could not fetch history.' });
        }
      } catch (error) {
        toast({ variant: 'destructive', title: 'An error occurred.' });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHistory();
  }, [router, toast]);


  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Booking History</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Past Washes</CardTitle>
          <CardDescription>Review your complete service history with CleanSweep.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Service</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={4} className="text-center">Loading...</TableCell></TableRow>
              ) : bookingHistory.length > 0 ? (
                bookingHistory.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="font-medium">{new Date(booking.date).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                      <div className="text-xs text-muted-foreground">{new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </TableCell>
                    <TableCell>{booking.service}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant={booking.status === 'Completed' ? 'default' : 'secondary'} className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">${booking.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={4} className="text-center">No booking history found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
