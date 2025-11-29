import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { benefits } from '@/lib/data';
import { Sparkles, ShieldCheck, Car, CalendarClock } from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  Sparkles,
  ShieldCheck,
  Car,
  CalendarClock,
};

export default function Benefits() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">The CleanSweep Advantage</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Experience the difference of a subscription-based car wash service.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
                const Icon = iconMap[benefit.icon];
                return (
                    <div key={index} className="flex items-start">
                        <div className="mr-4 mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                          {Icon && <Icon className="h-6 w-6" />}
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">{benefit.title}</h3>
                            <p className="text-muted-foreground text-sm">{benefit.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    </section>
  );
}
