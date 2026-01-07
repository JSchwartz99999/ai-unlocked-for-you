
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Code, MessageSquare, BrainCircuit, Bot, Database } from 'lucide-react';

interface TemplateCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  difficulty: string;
  category: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  difficulty, 
  category 
}) => {
  return (
    <Card className="p-6 hover-lift border border-gray-200 dark:border-gray-800 h-full flex flex-col">
      <div className="mb-4 p-3 rounded-full bg-[var(--accent-bg)] w-fit">
        <Icon className="h-6 w-6 text-[var(--accent-default)]" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-[var(--text-secondary)] mb-4 flex-grow">{description}</p>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
            difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {difficulty}
          </span>
          <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 text-xs font-medium">
            {category}
          </span>
        </div>
        <Button variant="ghost" size="sm">
          Use Template
        </Button>
      </div>
    </Card>
  );
};

const AITemplatesSection: React.FC = () => {
  const templates = [
    {
      title: "Customer Support Bot",
      description: "A ready-to-use chatbot that handles customer inquiries and support requests.",
      icon: MessageSquare,
      difficulty: "Beginner",
      category: "Business"
    },
    {
      title: "Content Generator",
      description: "Automatically generate blog posts, product descriptions, and social media content.",
      icon: BookOpen,
      difficulty: "Intermediate",
      category: "Marketing"
    },
    {
      title: "Data Analysis Assistant",
      description: "Analyze and visualize data without writing complex queries or code.",
      icon: Database,
      difficulty: "Intermediate",
      category: "Analytics"
    },
    {
      title: "Image Classifier",
      description: "Identify objects, people, and scenes in images with pre-trained models.",
      icon: BrainCircuit,
      difficulty: "Beginner",
      category: "Computer Vision"
    },
    {
      title: "Document Parser",
      description: "Extract structured data from invoices, receipts, and other documents.",
      icon: Code,
      difficulty: "Advanced",
      category: "Document Processing"
    },
    {
      title: "Sentiment Analyzer",
      description: "Analyze customer reviews and social media mentions for sentiment and insights.",
      icon: Bot,
      difficulty: "Beginner",
      category: "Natural Language"
    }
  ];

  return (
    <section id="ai-templates" data-section="ai-templates" className="py-16 bg-[var(--surface-0)]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center mb-3 px-3 py-1 rounded-full bg-[var(--accent-bg)] text-[var(--accent-default)] text-sm font-medium">
            <span>AI Templates</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready-to-Use AI Templates</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Get started quickly with our collection of pre-built AI solutions for common use cases.
            Just choose a template and customize it to your needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <TemplateCard 
              key={index}
              title={template.title}
              description={template.description}
              icon={template.icon}
              difficulty={template.difficulty}
              category={template.category}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button className="bg-gradient hover:opacity-90">
            Browse All Templates
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AITemplatesSection;
