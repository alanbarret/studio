import { Icons } from './icons';

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex items-center justify-center">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icons.logo className="h-5 w-5" />
          <span>
            © {new Date().getFullYear()} CleanSweep Inc. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
