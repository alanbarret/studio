import Link from 'next/link';
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
import { PlusCircle, Repeat } from 'lucide-react';
import { userSubscriptions } from '@/lib/data';

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manage Subscriptions</h1>
        <Button asChild>
          <Link href="/">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Plan
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {userSubscriptions.map((sub) => (
          <Card key={sub.id}>
            <CardHeader className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                <CardTitle className="flex items-center gap-2">
                  {sub.planName} 
                  <Badge variant={sub.status === 'Active' ? 'default' : 'secondary'} className={sub.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ''}>
                    {sub.status}
                  </Badge>
                </CardTitle>
                <CardDescription>Subscription ID: {sub.id}</CardDescription>
              </div>
              <div className="text-left md:text-right">
                <p className="text-2xl font-bold">${sub.price}<span className="text-sm font-normal text-muted-foreground">/month</span></p>
              </div>
            </CardHeader>
            <CardContent>
              {sub.status === 'Active' ? (
                <p className="text-sm text-muted-foreground">
                  Your plan will automatically renew on {sub.nextBillingDate}.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  This plan was cancelled on {sub.cancellationDate}.
                </p>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              {sub.status === 'Active' ? (
                <>
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="destructive">Cancel Subscription</Button>
                </>
              ) : (
                <Button variant="secondary"><Repeat className="mr-2 h-4 w-4" />Renew Plan</Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
