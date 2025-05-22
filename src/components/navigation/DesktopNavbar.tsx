
import React from 'react';
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
import { NavigationLink } from './NavigationItems';

interface DesktopNavbarProps {
  activeSection: string | null;
  learnLinks: NavigationLink[];
  buildLinks: NavigationLink[];
  handleNavClick: (section: string) => void;
}

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  activeSection,
  learnLinks,
  buildLinks,
  handleNavClick
}) => {
  const isActive = (section: string) => {
    return activeSection === section;
  };

  return (
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
  );
};

export default DesktopNavbar;
