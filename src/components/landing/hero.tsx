import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <section className="relative w-full pt-20 pb-12 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl xl:text-7xl">
              Impeccable Shine, Unmatched Convenience.
            </h1>
            <p className="max-w-2xl text-muted-foreground md:text-xl">
              Subscribe to a consistently clean car. Our trusted professionals deliver a spotless finish, so you can focus on the drive.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button size="lg" asChild>
                <Link href="#plans">
                  View Subscription Plans <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                    <AvatarFallback>U1</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarImage src="https://i.pravatar.cc/150?img=2" />
                    <AvatarFallback>U2</AvatarFallback>
                  </Avatar>
                   <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarImage src="https://i.pravatar.cc/150?img=3" />
                    <AvatarFallback>U3</AvatarFallback>
                  </Avatar>
                </div>
                <div className='flex flex-col items-start'>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </div>
                  <p className="text-xs text-muted-foreground">Trusted by 5,000+ customers</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
