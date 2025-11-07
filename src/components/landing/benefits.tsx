import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
    <section className="py-16 sm:py-24 bg-secondary">
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
              <Card key={index} className="text-center transform hover:-translate-y-2 transition-transform duration-300">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>
                  <CardTitle>{benefit.title}</CardTitle>
                  <CardDescription className="pt-2">{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
