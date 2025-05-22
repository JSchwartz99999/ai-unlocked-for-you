
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Sparkles, 
  Image, 
  BookOpen, 
  FileText, 
  Code, 
  BarChart, 
  MusicNote, 
  Video 
} from 'lucide-react';

interface ToolCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  isPopular?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon: Icon, title, description, isPopular }) => {
  return (
    <div className="group relative bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800 hover:border-primary/40 dark:hover:border-primary/40">
      {isPopular && (
        <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient text-white text-xs font-medium rounded-full">
          Popular
        </div>
      )}
      <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <Button variant="outline" size="sm" className="group-hover:border-primary group-hover:text-primary transition-colors">
        Try Now
      </Button>
    </div>
  );
};

const AIToolsSection: React.FC = () => {
  const tools = [
    {
      icon: MessageSquare,
      title: "AI Chatbot Builder",
      description: "Create custom chatbots for customer service, lead generation, or information retrieval.",
      isPopular: true
    },
    {
      icon: Image,
      title: "Image Generator",
      description: "Generate custom images from text descriptions for marketing, design, and content creation.",
      isPopular: true
    },
    {
      icon: FileText,
      title: "Document Analysis",
      description: "Extract information, summarize content, and analyze documents automatically."
    },
    {
      icon: BarChart,
      title: "Data Visualization",
      description: "Transform complex data into insightful visualizations without coding or design skills."
    },
    {
      icon: BookOpen,
      title: "Content Generator",
      description: "Create blog posts, product descriptions, and marketing copy with AI assistance."
    },
    {
      icon: Code,
      title: "Code Assistant",
      description: "Get help with coding tasks, debugging, and code optimization from AI."
    },
    {
      icon: Video,
      title: "Video Creator",
      description: "Create and edit videos with AI-powered tools that simplify the production process."
    },
    {
      icon: MusicNote,
      title: "Audio Generator",
      description: "Generate voiceovers, sound effects, and background music for your content."
    }
  ];

  return (
    <section id="ai-tools" data-section="ai-tools" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4 mr-2" />
            <span>AI Tools</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Essential AI Tools</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the tools that make building and using AI accessible to everyone.
            No technical expertise required.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <ToolCard 
              key={index}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              isPopular={tool.isPopular}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            All tools include free starter plans with upgrade options for professional use
          </p>
          <Button className="bg-gradient hover:opacity-90">
            Explore All Tools
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AIToolsSection;
