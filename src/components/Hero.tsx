
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Code, Users, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden  pt-20 pb-32">
      {/* Background decorations */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 overflow-hidden">
          <div className="h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20 w-96 h-96 bg-gradient"></div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 blur-3xl opacity-20 w-96 h-96 bg-gradient"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left content */}
          <div className="w-full md:w-1/2 pt-12 md:pt-0 text-center md:text-left">
            <div className="inline-flex items-center mb-6 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 mr-2 text-[var(--accent-default)]" />
              <span className="text-sm font-medium">No technical background required</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Demystifying <span className="text-gradient">AI</span> for Everyone
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-[var(--accent-hover)])] mb-8 max-w-lg mx-auto md:mx-0">
              Learn how AI works, build your own models, and incorporate AI into your life - 
              no technical background required.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Button size="lg" className="bg-gradient hover:opacity-90 gap-2 text-base">
                Start Learning <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-base">
                Explore Resources
              </Button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 hidden md:flex flex-wrap gap-6 justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[var(--accent-bg)] flex items-center justify-center">
                  <span className="font-bold text-[var(--accent-default)]">50K+</span>
                </div>
                <p className="text-sm text-[var(--text-tertiary)]">Active Learners</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[var(--accent-bg)] flex items-center justify-center">
                  <span className="font-bold text-[var(--accent-hover)]">100+</span>
                </div>
                <p className="text-sm text-[var(--text-tertiary)]">AI Projects</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[var(--accent-bg)] flex items-center justify-center">
                  <span className="font-bold text-[var(--accent-default)]">4.9</span>
                </div>
                <p className="text-sm text-[var(--text-tertiary)]">User Rating</p>
              </div>
            </div>
          </div>
          
          {/* Right content - Floating icons with more visual appeal */}
          <div className="w-full md:w-1/2 relative mt-12 md:mt-0">
            <div className="h-64 md:h-96 relative">
              {/* Brain Icon */}
              <div className="absolute top-0 left-1/4 p-4 bg-[var(--surface-2)] rounded-xl shadow-xl animate-float border border-[var(--border-default)]">
                <div className="relative">
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></div>
                  <Brain className="h-10 w-10 text-[var(--accent-default)]" />
                </div>
              </div>
              
              {/* Code Icon */}
              <div className="absolute bottom-0 left-1/3 p-4 bg-[var(--surface-2)] rounded-xl shadow-xl animate-float animation-delay-2000 border border-[var(--border-default)]">
                <Code className="h-10 w-10 text-[var(--accent-hover)]" />
              </div>
              
              {/* Users Icon */}
              <div className="absolute top-1/3 right-1/4 p-4 bg-[var(--surface-2)] rounded-xl shadow-xl animate-float animation-delay-4000 border border-[var(--border-default)]">
                <Users className="h-10 w-10 text-[var(--accent-default)]" />
              </div>
              
              {/* Central Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient animate-gradient flex items-center justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <span className="text-white text-3xl md:text-4xl font-bold">AI</span>
                </div>
              </div>

              {/* Particle effects */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-1/3 w-2 h-2 rounded-full bg-primary animate-pulse-slow"></div>
                <div className="absolute top-1/2 left-1/4 w-3 h-3 rounded-full bg-secondary animate-pulse-slow animation-delay-2000"></div>
                <div className="absolute bottom-1/4 right-1/2 w-2 h-2 rounded-full bg-primary animate-pulse-slow animation-delay-4000"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
