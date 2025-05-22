
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NavigationLink } from './NavigationItems';

interface MobileNavbarProps {
  isOpen: boolean;
  activeSection: string | null;
  learnLinks: NavigationLink[];
  buildLinks: NavigationLink[];
  handleNavClick: (section: string) => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  isOpen,
  activeSection,
  learnLinks,
  buildLinks,
  handleNavClick
}) => {
  const isActive = (section: string) => {
    return activeSection === section;
  };
  
  if (!isOpen) return null;

  return (
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
  );
};

export default MobileNavbar;
