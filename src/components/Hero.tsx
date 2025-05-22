
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Code, Users } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-900 py-16 md:py-24">
      {/* Background decorations */}
      <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20">
        <div className="h-56 bg-gradient blur-[106px] dark:bg-purple-800"></div>
        <div className="h-32 bg-gradient blur-[106px] dark:bg-indigo-800"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between">
          {/* Left content */}
          <div className="w-full md:w-1/2 pt-12 md:pt-0 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Demystifying <span className="text-gradient">AI</span> for Everyone
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto md:mx-0">
              Learn how AI works, build your own models, and incorporate AI into your life - 
              no technical background required.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Button size="lg" className="bg-gradient hover:opacity-90">
                Start Learning <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Explore Resources
              </Button>
            </div>
          </div>
          
          {/* Right content - Floating icons */}
          <div className="w-full md:w-1/2 relative">
            <div className="h-64 md:h-80 lg:h-96 relative">
              {/* Brain Icon */}
              <div className="absolute top-0 left-1/4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl animate-float">
                <Brain className="h-12 w-12 text-primary" />
              </div>
              
              {/* Code Icon */}
              <div className="absolute bottom-0 left-1/3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl animate-float animation-delay-2000">
                <Code className="h-12 w-12 text-secondary" />
              </div>
              
              {/* Users Icon */}
              <div className="absolute top-1/3 right-1/4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl animate-float animation-delay-4000">
                <Users className="h-12 w-12 text-primary" />
              </div>
              
              {/* Central Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient animate-gradient flex items-center justify-center">
                <span className="text-white text-3xl md:text-4xl font-bold">AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
