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
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { bookingHistory } from '@/lib/data';

export default function HistoryPage() {
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
              {bookingHistory.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div className="font-medium">{booking.date.split(',')[0]}</div>
                    <div className="text-xs text-muted-foreground">{booking.date.split(',')[1]}</div>
                  </TableCell>
                  <TableCell>{booking.service}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant={booking.status === 'Completed' ? 'default' : 'secondary'} className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">${booking.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
