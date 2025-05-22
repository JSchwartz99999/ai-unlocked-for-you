
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
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const isMobile = useIsMobile();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Set active section based on URL hash
      const hash = window.location.hash;
      if (hash) {
        setActiveSection(hash.substring(1));
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initialize active section
    handleScroll();
    
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

  const isActive = (section: string) => {
    return activeSection === section;
  };

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setIsOpen(false); // Close mobile menu when clicking a nav item
    
    // Smooth scroll to section if it exists
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
                <NavigationMenuTrigger 
                  className={cn(
                    isActive('ai-basics') || isActive('ml-intro') || 
                    isActive('neural-networks') || isActive('ai-tools')
                      ? "navigation-active" : ""
                  )}
                >
                  Learn
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-4 md:grid-cols-2 lg:w-[500px]">
                    <ul className="grid gap-3 p-4">
                      {learnLinks.map((link) => {
                        const section = link.href.substring(1);
                        return (
                          <li key={link.href} className="row-span-1">
                            <NavigationMenuLink asChild>
                              <a
                                href={link.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleNavClick(section);
                                }}
                                className={cn(
                                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent",
                                  isActive(section) ? "navigation-active" : ""
                                )}
                              >
                                <div className="text-sm font-medium leading-none">{link.title}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {link.description}
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={cn(
                    isActive('no-code-ai') || isActive('ai-templates') || isActive('custom-models') 
                      ? "navigation-active" : ""
                  )}
                >
                  Build
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-4">
                    <ul className="grid gap-3 p-4">
                      {buildLinks.map((link) => {
                        const section = link.href.substring(1);
                        return (
                          <li key={link.href} className="row-span-1">
                            <NavigationMenuLink asChild>
                              <a
                                href={link.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleNavClick(section);
                                }}
                                className={cn(
                                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent",
                                  isActive(section) ? "navigation-active" : ""
                                )}
                              >
                                <div className="text-sm font-medium leading-none">{link.title}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {link.description}
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a 
                  href="#resources" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('resources');
                  }}
                  className={cn(
                    navigationMenuTriggerStyle(), 
                    "cursor-pointer navigation-item",
                    isActive('resources') ? "navigation-active" : ""
                  )}
                >
                  Resources
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.href = "/signup"}
            >
              Sign Up
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient hover:opacity-90"
              onClick={() => handleNavClick('ai-basics')}
            >
              Get Started
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            className="p-2 rounded-md text-gray-600 hover:text-accent hover:bg-gray-100"
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
                className={cn(
                  "flex justify-between items-center p-3 rounded-md cursor-pointer",
                  (isActive('ai-basics') || isActive('ml-intro') || 
                   isActive('neural-networks') || isActive('ai-tools')) 
                    ? "navigation-active" : "hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                onClick={() => document.querySelector('#mobile-learn')?.classList.toggle('hidden')}
              >
                <span className="font-medium">Learn</span>
                <ChevronDown size={18} />
              </div>
              <div id="mobile-learn" className="hidden ml-4 mt-1 space-y-1">
                {learnLinks.map(link => {
                  const section = link.href.substring(1);
                  return (
                    <a 
                      key={link.href}
                      href={link.href} 
                      className={cn(
                        "block p-2 rounded-md",
                        isActive(section) 
                          ? "navigation-active" 
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(section);
                      }}
                    >
                      {link.title}
                    </a>
                  );
                })}
              </div>
            </div>
            
            <div className="py-2">
              <div 
                className={cn(
                  "flex justify-between items-center p-3 rounded-md cursor-pointer",
                  (isActive('no-code-ai') || isActive('ai-templates') || isActive('custom-models'))
                    ? "navigation-active" : "hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                onClick={() => document.querySelector('#mobile-build')?.classList.toggle('hidden')}
              >
                <span className="font-medium">Build</span>
                <ChevronDown size={18} />
              </div>
              <div id="mobile-build" className="hidden ml-4 mt-1 space-y-1">
                {buildLinks.map(link => {
                  const section = link.href.substring(1);
                  return (
                    <a 
                      key={link.href}
                      href={link.href} 
                      className={cn(
                        "block p-2 rounded-md",
                        isActive(section) 
                          ? "navigation-active" 
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(section);
                      }}
                    >
                      {link.title}
                    </a>
                  );
                })}
              </div>
            </div>
            
            <a 
              href="#resources" 
              className={cn(
                "block p-3 rounded-md",
                isActive('resources') 
                  ? "navigation-active" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('resources');
              }}
            >
              Resources
            </a>
            
            <div className="pt-2 pb-3 space-y-2">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.location.href = "/signup"}
              >
                Sign Up
              </Button>
              <Button 
                className="w-full bg-gradient hover:opacity-90"
                onClick={() => {
                  handleNavClick('ai-basics');
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
