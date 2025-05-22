
import React from 'react';
import { Github, Twitter, Linkedin, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 pt-12 pb-8" id="resources">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <a href="/" className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient animate-gradient flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <span className="ml-3 text-xl font-bold">AIacademy</span>
            </a>
            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
              Making artificial intelligence accessible to everyone through interactive learning experiences.
              No technical background required.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Learn</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">AI Basics</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">Machine Learning</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">Neural Networks</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">No-Code AI Tools</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">Free AI Tools</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">AI Glossary</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">Blog</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">Community</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300">&copy; {new Date().getFullYear()} AIacademy. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">Privacy</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">Terms</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
