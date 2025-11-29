import Link from 'next/link';
import { Icons } from './icons';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function Footer() {
  return (
    <footer className="border-t py-12 sm:py-16">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="mr-6 flex items-center space-x-2 mb-4">
              <Icons.logo className="h-6 w-6 text-primary" />
              <span className="font-bold sm:inline-block">CleanSweep</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Impeccable car washes, unmatched convenience. The best your car can get.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#plans" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
              <li><Link href="#features" className="text-muted-foreground hover:text-foreground">Features</Link></li>
              <li><Link href="#testimonials" className="text-muted-foreground hover:text-foreground">Testimonials</Link></li>
              <li><Link href="#faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-1">
             <h4 className="font-semibold mb-3">Stay Updated</h4>
             <p className="text-muted-foreground text-sm mb-2">Subscribe to our newsletter for the latest news and offers.</p>
             <form className="flex space-x-2">
                <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                <Button type="submit">Subscribe</Button>
             </form>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} CleanSweep Inc. All rights reserved.</p>
            <div className='flex gap-4 mt-4 sm:mt-0'>
                <Link href="#" className="hover:text-foreground">Terms of Service</Link>
                <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
