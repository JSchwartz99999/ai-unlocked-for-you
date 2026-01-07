
import React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigation } from './navigation/useNavigation';
import { learnLinks, buildLinks } from './navigation/NavigationItems';
import Brand from './navigation/Brand';
import DesktopNavbar from './navigation/DesktopNavbar';
import MobileNavbar from './navigation/MobileNavbar';

const NavBar: React.FC = () => {
  const { scrolled, isOpen, setIsOpen, activeSection, handleNavClick } = useNavigation();
  const isMobile = useIsMobile();

  return (
    <nav 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "backdrop-blur-md glass-effect shadow-sm border-b border-[var(--border-default)]" 
          : "bg-[var(--surface-0)]/80"
      )}
    >
      <div className="container px-4 py-3 mx-auto flex items-center justify-between">
        <Brand />
        
        {/* Desktop Navigation */}
        <DesktopNavbar
          activeSection={activeSection}
          learnLinks={learnLinks}
          buildLinks={buildLinks}
          handleNavClick={handleNavClick}
        />
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            className="p-2 rounded-md text-[var(--text-secondary)] hover:text-accent hover:bg-[var(--surface-3)]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobile && (
        <MobileNavbar
          isOpen={isOpen}
          activeSection={activeSection}
          learnLinks={learnLinks}
          buildLinks={buildLinks}
          handleNavClick={handleNavClick}
        />
      )}
    </nav>
  );
};

export default NavBar;
