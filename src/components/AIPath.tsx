
import React from 'react';
import { Brain, Layers, Code, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PathStepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const PathStep: React.FC<PathStepProps> = ({ number, title, description, icon }) => (
  <div className="flex items-start space-x-4 relative z-10">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient text-white font-bold text-lg shadow-md">
        {number}
      </div>
    </div>
    <div className="flex-1 bg-[var(--surface-2)] rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center space-x-3 mb-3">
        <div className="p-2 rounded-lg bg-[var(--accent-bg)] flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-[var(--text-secondary)]">{description}</p>
    </div>
  </div>
);

const AIPath: React.FC = () => {
  return (
    <div className="relative bg-gray-50 dark:bg-gray-900 py-20" id="learn">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 -translate-y-12 translate-x-12 blur-3xl opacity-10 w-96 h-96 bg-gradient"></div>
        <div className="absolute top-0 right-0 translate-y-12 -translate-x-12 blur-3xl opacity-10 w-96 h-96 bg-gradient"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center mb-3 px-3 py-1 rounded-full bg-[var(--accent-bg)] text-[var(--accent-default)] text-sm font-medium">
            <span>Learning Journey</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Path to AI Mastery</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Follow this step-by-step learning path to go from AI beginner to confidently building your own AI models.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-12 relative">
          {/* Connecting line */}
          <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary" />
          
          <PathStep 
            number={1}
            title="Understand the Basics"
            description="Learn the fundamental concepts of AI without the technical jargon. Understand how machines learn and how AI is changing our world."
            icon={<Brain className="h-5 w-5 text-[var(--accent-default)]" />}
          />
          
          <PathStep 
            number={2}
            title="Explore AI Models"
            description="Discover the different types of AI models and how they work. Get to know neural networks, machine learning, and deep learning in simple terms."
            icon={<Layers className="h-5 w-5 text-[var(--accent-default)]" />}
          />
          
          <PathStep 
            number={3}
            title="Build Simple Models"
            description="Start creating your own AI models with no-code tools. See immediate results and gain confidence in working with AI technologies."
            icon={<Code className="h-5 w-5 text-[var(--accent-default)]" />}
          />
          
          <PathStep 
            number={4}
            title="Apply AI in Real Life"
            description="Learn how to incorporate AI into your daily life and work. Discover practical applications that solve real problems you face."
            icon={<Lightbulb className="h-5 w-5 text-[var(--accent-default)]" />}
          />
          
          <div className="flex justify-center pt-10 relative z-10">
            <Button
              size="lg"
              className="bg-gradient hover:opacity-90 text-base"
              onClick={() => document.getElementById('ai-basics')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Begin Your Journey
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPath;
