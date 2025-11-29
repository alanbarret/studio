import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { getSubscriptionPlans } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

export default async function Plans() {
  const subscriptionPlans = await getSubscriptionPlans();

  return (
    <section id="plans" className="py-16 sm:py-24 bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Flexible Plans for Every Vehicle</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Choose the perfect subscription to keep your car sparkling.
          </p>
          <div className="flex items-center justify-center space-x-2 mt-6">
            <Label htmlFor="billing-switch">Monthly</Label>
            <Switch id="billing-switch" />
            <Label htmlFor="billing-switch">Yearly</Label>
            <Badge variant="secondary" className='ml-2'>2 months free</Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {subscriptionPlans.map((plan) => (
            <Card key={plan.name} className={cn('flex flex-col border', plan.isPopular ? 'border-primary shadow-lg' : 'shadow-md')}>
              {plan.isPopular && (
                <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-sm font-semibold">Most Popular</Badge>
              )}
              <CardHeader className='pt-10'>
                <CardTitle className='text-2xl'>{plan.name}</CardTitle>
                 <CardDescription className="pb-4">For {plan.carType} owners looking for the best.</CardDescription>
                <div className='flex items-baseline'>
                    <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                    <span className='text-muted-foreground'>/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <ul className="space-y-3">
                  {plan.benefits.map((feature) => (
                    <li key={feature.title} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span className='text-sm text-muted-foreground'>{feature.title}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant={plan.isPopular ? 'default' : 'outline'}>
                  <Link href="/login">Choose Plan</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
