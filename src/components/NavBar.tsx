
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const learnLinks = [
    { href: "#ai-basics", title: "AI Basics", description: "Learn the fundamental concepts of AI" },
    { href: "#ml-intro", title: "Machine Learning", description: "Understanding how machines learn" },
    { href: "#neural-networks", title: "Neural Networks", description: "The building blocks of AI systems" },
    { href: "#ai-tools", title: "AI Tools", description: "Popular tools for working with AI" },
  ];

  const buildLinks = [
    { href: "#no-code-ai", title: "No-Code AI", description: "Build AI models without coding" },
    { href: "#ai-templates", title: "AI Templates", description: "Start with pre-built models" },
    { href: "#custom-models", title: "Custom Models", description: "Create AI tailored to your needs" },
  ];

  return (
    <nav 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "backdrop-blur-md bg-white/90 dark:bg-gray-900/90 shadow-sm border-b border-gray-200 dark:border-gray-800" 
          : "bg-white/80 dark:bg-gray-900/80"
      )}
    >
      <div className="container px-4 py-3 mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient animate-gradient flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">AIacademy</span>
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-4 md:grid-cols-2 lg:w-[500px]">
                    <ul className="grid gap-3 p-4">
                      {learnLinks.map((link) => (
                        <li key={link.href} className="row-span-1">
                          <NavigationMenuLink asChild>
                            <a
                              href={link.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{link.title}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {link.description}
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Build</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-4">
                    <ul className="grid gap-3 p-4">
                      {buildLinks.map((link) => (
                        <li key={link.href} className="row-span-1">
                          <NavigationMenuLink asChild>
                            <a
                              href={link.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{link.title}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {link.description}
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a href="#resources" className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}>
                  Resources
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">Sign Up</Button>
            <Button size="sm" className="bg-gradient hover:opacity-90">Get Started</Button>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            className="p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && isMobile && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg z-50">
          <div className="px-4 py-2 space-y-1">
            <div className="py-2">
              <div 
                className="flex justify-between items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => document.querySelector('#mobile-learn')?.classList.toggle('hidden')}
              >
                <span className="font-medium">Learn</span>
                <ChevronDown size={18} />
              </div>
              <div id="mobile-learn" className="hidden ml-4 mt-1 space-y-1">
                {learnLinks.map(link => (
                  <a 
                    key={link.href}
                    href={link.href} 
                    className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="py-2">
              <div 
                className="flex justify-between items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => document.querySelector('#mobile-build')?.classList.toggle('hidden')}
              >
                <span className="font-medium">Build</span>
                <ChevronDown size={18} />
              </div>
              <div id="mobile-build" className="hidden ml-4 mt-1 space-y-1">
                {buildLinks.map(link => (
                  <a 
                    key={link.href}
                    href={link.href} 
                    className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
            
            <a 
              href="#resources" 
              className="block p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Resources
            </a>
            
            <div className="pt-2 pb-3 space-y-2">
              <Button variant="outline" className="w-full">Sign Up</Button>
              <Button className="w-full bg-gradient hover:opacity-90">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
