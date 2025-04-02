import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Folder, Book, Code, Mail, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function MobileNav({ navItems, setIsOpen }) {
  const iconMap = {
    Home: <Home className="h-6 w-6" />,
    Projects: <Folder className="h-6 w-6" />,
    Blog: <Book className="h-6 w-6" />,
    Snippets: <Code className="h-6 w-6" />,
    Contact: <Mail className="h-6 w-6" />,
  };

  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t z-50">
        <div className="flex justify-around items-center py-2">
          {navItems.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors p-2"
            >
              {iconMap[item.label]}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors p-2"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="h-6 w-6" />
                <span className="text-xs mt-1">More</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="py-6 space-y-6">
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        className="block px-4 py-3 text-lg font-medium hover:bg-accent rounded-md transition-colors flex items-center gap-3"
                        onClick={() => setIsOpen(false)}
                      >
                        {iconMap[item.label]}
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}