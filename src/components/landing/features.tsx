import { CheckCircle } from 'lucide-react';

export function Features() {
  const featuresList = [
    'Exterior Hand Wash & Dry',
    'Interior Vacuum & Wipe Down',
    'Tire Shine & Rim Cleaning',
    'Window & Mirror Cleaning',
    'Flexible Scheduling via App',
    'Eco-Friendly Products',
  ];

  return (
    <section id="features" className="w-full py-16 sm:py-24 bg-secondary">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="space-y-3">
            <span className="text-sm font-semibold uppercase text-primary">
              Why Choose Us
            </span>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              A Level of Clean You Can Feel
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              We don't just wash your car, we care for it. Our subscription
              service is designed for those who value quality, convenience, and a
              persistently pristine vehicle.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {featuresList.map((feature, index) => (
              <div key={index} className="flex items-center justify-center sm:justify-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="font-medium text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
