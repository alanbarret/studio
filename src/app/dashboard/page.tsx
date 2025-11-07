import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, CreditCard, Repeat } from 'lucide-react';
import { user, userSubscriptions, bookingHistory } from '@/lib/data';

export default function DashboardOverview() {
  const activeSubscription = userSubscriptions.find(sub => sub.status === 'Active');
  const latestBooking = bookingHistory[0];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Welcome, {user.name.split(' ')[0]}!</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Current Plan <Repeat className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
            {activeSubscription ? (
                <CardDescription>Your {activeSubscription.planName} subscription.</CardDescription>
            ) : (
                <CardDescription>You have no active subscriptions.</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {activeSubscription ? (
                <>
                    <div className="text-2xl font-bold">${activeSubscription.price}/month</div>
                    <p className="text-xs text-muted-foreground">
                        Next billing on {activeSubscription.nextBillingDate}
                    </p>
                    <Button asChild size="sm" className="mt-4">
                        <Link href="/dashboard/subscriptions">Manage Plan <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </>
            ) : (
                <Button asChild size="sm" className="mt-4">
                    <Link href="/">View Plans <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Next Wash <Calendar className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
            <CardDescription>Your upcoming appointment.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">July 29, 2024</div>
             <p className="text-xs text-muted-foreground">
                Between 10:00 AM - 12:00 PM
             </p>
             <Button asChild variant="outline" size="sm" className="mt-4">
                <Link href="/dashboard/history">View Schedule</Link>
             </Button>
          </CardContent>
        </Card>

         <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>A look at your most recent washes.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {bookingHistory.slice(0, 3).map(booking => (
                  <li key={booking.id} className="flex items-center justify-between">
                      <div>
                          <p className="font-medium">{booking.service}</p>
                          <p className="text-sm text-muted-foreground">{booking.date}</p>
                      </div>
                      <div className="text-right">
                           <p className="font-medium">${booking.amount}</p>
                           <Badge variant={booking.status === 'Completed' ? 'default' : 'secondary'} className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">{booking.status}</Badge>
                      </div>
                  </li>
              ))}
            </ul>
            <Button asChild variant="link" className="px-0 mt-2">
              <Link href="/dashboard/history">View all activity</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
