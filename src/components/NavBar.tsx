
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
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
        <div className="hidden md:flex md:items-center md:space-x-8">
          <a href="#learn" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Learn</a>
          <a href="#build" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Build</a>
          <a href="#resources" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Resources</a>
          <Button variant="outline" className="ml-4">Sign Up</Button>
          <Button className="ml-2 bg-gradient hover:opacity-90">Get Started</Button>
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
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg">
          <div className="px-4 py-2 space-y-3">
            <a href="#learn" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-primary">Learn</a>
            <a href="#build" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-primary">Build</a>
            <a href="#resources" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-primary">Resources</a>
            <Button variant="outline" className="w-full mb-2">Sign Up</Button>
            <Button className="w-full bg-gradient hover:opacity-90">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
