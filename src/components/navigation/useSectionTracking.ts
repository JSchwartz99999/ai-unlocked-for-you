
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
        const section = hash.substring(1);
        setActiveSection(section);
        console.log("Active section set from URL hash:", section);
      } else {
        setActiveSection('home');
        console.log("Active section defaulted to home");
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
