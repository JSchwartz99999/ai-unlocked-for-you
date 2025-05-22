
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
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg">
        {number}
      </div>
    </div>
    <div className="flex-1">
      <div className="flex items-center space-x-2 mb-2">
        <div className="p-2 rounded-lg bg-primary/10">
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  </div>
);

const AIPath: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-16" id="learn">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Path to AI Mastery</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Follow this step-by-step learning path to go from AI beginner to confidently building your own AI models.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-16 relative">
          {/* Connecting line */}
          <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary" />
          
          <PathStep 
            number={1}
            title="Understand the Basics"
            description="Learn the fundamental concepts of AI without the technical jargon. Understand how machines learn and how AI is changing our world."
            icon={<Brain className="h-5 w-5 text-primary" />}
          />
          
          <PathStep 
            number={2}
            title="Explore AI Models"
            description="Discover the different types of AI models and how they work. Get to know neural networks, machine learning, and deep learning in simple terms."
            icon={<Layers className="h-5 w-5 text-primary" />}
          />
          
          <PathStep 
            number={3}
            title="Build Simple Models"
            description="Start creating your own AI models with no-code tools. See immediate results and gain confidence in working with AI technologies."
            icon={<Code className="h-5 w-5 text-primary" />}
          />
          
          <PathStep 
            number={4}
            title="Apply AI in Real Life"
            description="Learn how to incorporate AI into your daily life and work. Discover practical applications that solve real problems you face."
            icon={<Lightbulb className="h-5 w-5 text-primary" />}
          />
          
          <div className="flex justify-center pt-6">
            <Button size="lg" className="bg-gradient hover:opacity-90">
              Begin Your Journey
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPath;
