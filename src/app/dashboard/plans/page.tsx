
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { subscriptionPlans } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function PlansPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Our Plans</h1>
        <p className="mt-2 max-w-2xl mx-auto text-lg text-muted-foreground">
          Choose the perfect subscription to keep your car sparkling.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {subscriptionPlans.map((plan) => (
          <Card key={plan.name} className={cn('flex flex-col', plan.isPopular && 'border-primary ring-2 ring-primary relative')}>
            {plan.isPopular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold text-foreground">${plan.price}</span>
                /month
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant={plan.isPopular ? 'default' : 'secondary'}>
                <Link href="/dashboard/payments">Choose Plan</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
