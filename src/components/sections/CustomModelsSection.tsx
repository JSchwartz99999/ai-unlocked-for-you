
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { ArrowRight, Wand2, Settings, Database, BarChart, Puzzle, Code } from 'lucide-react';

const CustomModelsSection: React.FC = () => {
  return (
    <section id="custom-models" data-section="custom-models" className="py-16 bg-[var(--surface-1)]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center mb-3 px-3 py-1 rounded-full bg-[var(--accent-bg)] text-[var(--accent-default)] text-sm font-medium">
            <span>Custom Models</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Build Custom AI Solutions</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Create AI models tailored to your specific needs with our advanced customization tools.
            No coding required.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="visual" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="visual">Visual Builder</TabsTrigger>
              <TabsTrigger value="data">Data Integration</TabsTrigger>
              <TabsTrigger value="deploy">Deployment</TabsTrigger>
            </TabsList>
            
            <TabsContent value="visual" className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-[var(--surface-0)]">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center mb-4 p-3 rounded-full bg-[var(--accent-bg)]">
                    <Wand2 className="h-6 w-6 text-[var(--accent-default)]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Visual Model Builder</h3>
                  <p className="text-[var(--text-secondary)] mb-6">
                    Our intuitive visual interface lets you design AI models by simply connecting blocks and configuring parameters.
                    Perfect for those without programming experience.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-[var(--accent-default)]">•</div>
                      <span>Drag-and-drop AI components</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-[var(--accent-default)]">•</div>
                      <span>Visual workflow configuration</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-[var(--accent-default)]">•</div>
                      <span>Real-time preview and testing</span>
                    </li>
                  </ul>
                  <Button className="bg-gradient hover:opacity-90">
                    Start Building <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="bg-[var(--surface-2)] rounded-lg aspect-video flex items-center justify-center">
                  <Puzzle className="h-16 w-16 text-gray-400" />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="data" className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-[var(--surface-0)]">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center mb-4 p-3 rounded-full bg-[var(--accent-bg)]">
                    <Database className="h-6 w-6 text-[var(--accent-default)]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Connect Your Data</h3>
                  <p className="text-[var(--text-secondary)] mb-6">
                    Easily integrate data from various sources to train and improve your AI models.
                    Support for spreadsheets, databases, APIs, and more.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-[var(--accent-default)]">•</div>
                      <span>Simple data import tools</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-[var(--accent-default)]">•</div>
                      <span>Automatic data cleaning</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-[var(--accent-default)]">•</div>
                      <span>Secure data handling</span>
                    </li>
                  </ul>
                  <Button className="bg-gradient hover:opacity-90">
                    Connect Data <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="bg-[var(--surface-2)] rounded-lg aspect-video flex items-center justify-center">
                  <Database className="h-16 w-16 text-gray-400" />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="deploy" className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-[var(--surface-0)]">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center mb-4 p-3 rounded-full bg-[var(--accent-bg)]">
                    <Settings className="h-6 w-6 text-[var(--accent-default)]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">One-Click Deployment</h3>
                  <p className="text-[var(--text-secondary)] mb-6">
                    Deploy your AI model with a single click. Get an API endpoint, embed code, or standalone application.
                    No server configuration needed.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-[var(--accent-default)]">•</div>
                      <span>Instant cloud deployment</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-[var(--accent-default)]">•</div>
                      <span>Scalable infrastructure</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-[var(--accent-default)]">•</div>
                      <span>Performance monitoring</span>
                    </li>
                  </ul>
                  <Button className="bg-gradient hover:opacity-90">
                    Deploy Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="bg-[var(--surface-2)] rounded-lg aspect-video flex items-center justify-center">
                  <Code className="h-16 w-16 text-gray-400" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default CustomModelsSection;
