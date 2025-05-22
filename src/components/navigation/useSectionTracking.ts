
import { useState, useEffect } from 'react';

export const useSectionTracking = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect and section tracking
  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled state based on scroll position
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Get all sections for intersection checking
      const sections = document.querySelectorAll('section[id], [data-section]');
      const scrollPosition = window.scrollY + 100; // Offset for better UX
      
      // Find the current section based on scroll position
      let currentSection = null;
      
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionBottom = sectionTop + section.getBoundingClientRect().height;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          currentSection = section.id || section.getAttribute('data-section');
        }
      });
      
      // Set active section based on intersection or URL hash
      const hash = window.location.hash;
      if (hash && hash !== '#') {
        const hashSection = hash.substring(1);
        setActiveSection(hashSection);
        console.log("Active section set from URL hash:", hashSection);
      } else if (currentSection) {
        setActiveSection(currentSection);
        console.log("Active section set from scroll position:", currentSection);
      } else {
        // Default to home if no section is active
        setActiveSection('home');
        console.log("Active section defaulted to home");
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initialize active section
    handleScroll();
    
    // Handle initial hash in URL
    const initialHash = window.location.hash;
    if (initialHash && initialHash !== '#') {
      const section = initialHash.substring(1);
      setActiveSection(section);
      
      // Smooth scroll to the section after a short delay to ensure DOM is loaded
      setTimeout(() => {
        const element = document.getElementById(section) || document.querySelector(`[data-section="${section}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { activeSection, setActiveSection, scrolled };
};
