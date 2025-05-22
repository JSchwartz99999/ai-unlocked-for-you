
import { useState } from 'react';
import { useSectionTracking } from './useSectionTracking';

export const useNavigation = () => {
  const { activeSection, setActiveSection, scrolled } = useSectionTracking();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (section: string) => {
    console.log("Navigation clicked for section:", section);
    setActiveSection(section);
    setIsOpen(false); // Close mobile menu when clicking a nav item
    
    // First update the URL hash without scrolling
    const currentLocation = window.location.href.split('#')[0];
    window.history.pushState(null, '', `${currentLocation}#${section}`);
    
    // Then handle the scrolling separately with a small delay
    setTimeout(() => {
      const element = document.getElementById(section);
      console.log("Looking for element with ID:", section);
      console.log("Element found:", !!element);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.log("Element not found for section:", section);
      }
    }, 50);
  };

  return {
    activeSection,
    scrolled,
    isOpen,
    setIsOpen,
    handleNavClick
  };
};
