
import { useState, useEffect } from 'react';

export const useSectionTracking = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

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

  return { activeSection, setActiveSection, scrolled };
};
