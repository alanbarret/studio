import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

export function Features() {
  const featureImage = PlaceHolderImages.find((img) => img.id === 'benefit-1');
  
  const featuresList = [
      "Exterior Hand Wash & Dry",
      "Interior Vacuum & Wipe Down",
      "Tire Shine & Rim Cleaning",
      "Window & Mirror Cleaning",
      "Flexible Scheduling via App",
      "Eco-Friendly Products"
  ];

  return (
    <section id="features" className="w-full py-16 sm:py-24">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="text-sm font-semibold uppercase text-primary">Why Choose Us</span>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                A Level of Clean You Can Feel
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We don't just wash your car, we care for it. Our subscription service is designed for those who value quality, convenience, and a persistently pristine vehicle.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuresList.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        <span className="font-medium">{feature}</span>
                    </div>
                ))}
            </div>
          </div>
          <div className="flex justify-center">
            {featureImage && (
              <Image
                src={featureImage.imageUrl}
                alt={featureImage.description}
                width={550}
                height={550}
                className="rounded-xl shadow-2xl object-cover"
                data-ai-hint={featureImage.imageHint}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
