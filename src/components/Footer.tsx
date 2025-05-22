
import React from 'react';
import { Github, Twitter, Linkedin, Youtube, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900" id="resources">
      <div className="mx-auto container">
        {/* Newsletter Section */}
        <div className="px-6 md:px-12 py-12 bg-gray-100 dark:bg-gray-800 rounded-xl my-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient blur-3xl"></div>
          </div>
          
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay updated with AI trends</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-0">
                Get the latest AI news, tutorials, and resources delivered straight to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 flex-1 focus:outline-none focus:ring-2 focus:ring-primary" 
              />
              <Button className="bg-gradient hover:opacity-90 gap-1">
                Subscribe <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-12 py-12">
          <div className="md:col-span-2">
            <a href="/" className="flex items-center mb-5">
              <div className="w-10 h-10 rounded-full bg-gradient animate-gradient flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <span className="ml-3 text-xl font-bold">AIacademy</span>
            </a>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
              Making artificial intelligence accessible to everyone through interactive learning experiences.
              No technical background required.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Learn</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">AI Basics</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Machine Learning</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Neural Networks</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">No-Code AI Tools</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">AI Ethics</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Case Studies</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Free AI Tools</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">AI Glossary</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Community</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Newsletter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="px-6 md:px-12 py-6 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} AIacademy. All rights reserved.</p>
          <div className="flex flex-wrap space-x-6 justify-center">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm">Terms of Service</a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm">Cookie Policy</a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
