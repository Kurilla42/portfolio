import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Packages', href: '#packages' },
    { name: 'Process', href: '#process' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container-custom flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">J</span>
            <span className="hidden sm:inline-block">Anton Kolesnikov</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div>
          <Button asChild variant="default" className="bg-primary text-white hover:bg-primary/90 rounded-full px-6">
            <Link href="#contact">Book Strategy Call</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}