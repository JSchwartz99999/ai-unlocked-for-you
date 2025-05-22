
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon: Icon,
  className
}) => {
  return (
    <div className={cn(
      "relative group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1",
      "border border-gray-100 dark:border-gray-700 overflow-hidden",
      className
    )}>
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 flex-grow">{description}</p>
        
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <a href="#" className="inline-flex items-center text-sm text-primary font-medium hover:underline">
            Learn more
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
