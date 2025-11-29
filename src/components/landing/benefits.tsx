import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { benefits } from '@/lib/data';
import { Sparkles, ShieldCheck, Car, CalendarClock } from 'lucide-react';
import { Check } from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  Sparkles,
  ShieldCheck,
  Car,
  CalendarClock,
};

export default function Benefits() {
  return (
    <section className="py-16 sm:py-24 bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">The CleanSweep Advantage</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Experience the difference of a subscription-based car wash service.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
            <Card className="flex flex-col justify-center">
                <CardHeader>
                    <CardTitle>Everything you need</CardTitle>
                    <CardDescription>All plans include the following benefits to keep your car looking its best.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {benefits.slice(0,2).map((benefit, index) => {
                            const Icon = iconMap[benefit.icon];
                            return (
                                <li key={index} className="flex items-start">
                                    <div className="mr-4 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                                      {Icon && <Icon className="h-5 w-5" />}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{benefit.title}</h3>
                                        <p className="text-muted-foreground text-sm">{benefit.description}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </CardContent>
            </Card>
            <Card className="flex flex-col justify-center">
                 <CardHeader>
                    <CardTitle>And so much more</CardTitle>
                    <CardDescription>Enjoy premium features that make car care effortless and rewarding.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                       {benefits.slice(2,4).map((benefit, index) => {
                            const Icon = iconMap[benefit.icon];
                            return (
                                <li key={index} className="flex items-start">
                                    <div className="mr-4 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                                      {Icon && <Icon className="h-5 w-5" />}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{benefit.title}</h3>
                                        <p className="text-muted-foreground text-sm">{benefit.description}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
