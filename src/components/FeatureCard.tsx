
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
      "relative group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300",
      "border border-gray-200 dark:border-gray-700 overflow-hidden",
      className
    )}>
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
