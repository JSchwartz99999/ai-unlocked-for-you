
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
    
    // Then handle the scrolling separately with a longer delay to ensure the DOM is ready
    setTimeout(() => {
      // Try to find element directly by ID
      let element = document.getElementById(section);
      
      // If not found, try to find it via a data attribute
      if (!element) {
        element = document.querySelector(`[data-section="${section}"]`);
      }
      
      console.log("Looking for section:", section);
      console.log("Element found:", !!element);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.error("Navigation target not found:", section);
        // Fallback: look for sections dynamically
        const sections = document.querySelectorAll('section');
        console.log("Available sections on page:", sections.length);
        Array.from(sections).forEach((s, i) => {
          console.log(`Section ${i}:`, s.id || 'no-id');
        });
      }
    }, 100); // Increased timeout to ensure DOM is ready
  };

  return {
    activeSection,
    scrolled,
    isOpen,
    setIsOpen,
    handleNavClick
  };
};
