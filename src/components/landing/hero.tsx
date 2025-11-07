import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="relative z-10 p-4 flex flex-col items-center">
        <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 mb-4 animate-fade-in-up">
          <p className="text-sm font-medium text-primary">Your Home, Perfectly Maintained</p>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground mb-4 animate-fade-in-up animation-delay-200">
          Impeccable Clean, Unmatched Convenience.
        </h1>
        <p className="max-w-2xl text-muted-foreground md:text-xl mb-8 animate-fade-in-up animation-delay-400">
          Subscribe to a consistently clean home. Our trusted professionals deliver a spotless space, so you can focus on what truly matters.
        </p>
        <div className="animate-fade-in-up animation-delay-600">
          <Button size="lg" asChild>
            <Link href="#plans">
              View Subscription Plans <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
