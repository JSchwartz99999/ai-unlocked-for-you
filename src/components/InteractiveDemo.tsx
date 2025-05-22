
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ImageIcon, MessageSquare, Code } from 'lucide-react';

const InteractiveDemo: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Simple mock responses
      if (input.toLowerCase().includes('hello') || input.toLowerCase().includes('hi')) {
        setOutput("Hello! I'm your AI assistant. How can I help you learn about artificial intelligence today?");
      } else if (input.toLowerCase().includes('what is ai')) {
        setOutput("Artificial Intelligence (AI) refers to systems that can perform tasks that typically require human intelligence. These include learning, reasoning, problem-solving, perception, and language understanding.");
      } else if (input.toLowerCase().includes('how to build')) {
        setOutput("Building your first AI model is easier than you think! Start with no-code platforms like Google's Teachable Machine or RunwayML. These tools let you create custom models without writing code.");
      } else {
        setOutput("That's an interesting question about AI. As you continue through our courses, you'll learn more about these concepts in a way that's easy to understand.");
      }
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="py-16 bg-white dark:bg-gray-900" id="build">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Try AI in Action</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience the power of AI first-hand with this interactive demo. See how AI can understand and respond to your inputs.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <Tabs defaultValue="chat" className="w-full">
            <div className="border-b border-gray-200 dark:border-gray-700 px-4">
              <TabsList className="h-14">
                <TabsTrigger value="chat" className="data-[state=active]:text-primary">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat AI
                </TabsTrigger>
                <TabsTrigger value="image" className="data-[state=active]:text-primary">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Image Generation
                </TabsTrigger>
                <TabsTrigger value="code" className="data-[state=active]:text-primary">
                  <Code className="h-4 w-4 mr-2" />
                  Code Assistant
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="p-6">
              <TabsContent value="chat" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                <div className="min-h-[300px] flex flex-col space-y-4">
                  <div className="flex-1 bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-y-auto">
                    {/* Welcome message */}
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                        AI
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[80%]">
                        <p>Hi there! I'm your AI assistant. Ask me anything about AI, machine learning, or how to get started building your own models.</p>
                      </div>
                    </div>
                    
                    {/* User output */}
                    {output && (
                      <>
                        <div className="flex items-start space-x-3 mb-4 justify-end">
                          <div className="bg-primary/10 rounded-lg p-3 max-w-[80%]">
                            <p>{input}</p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            You
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                            AI
                          </div>
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[80%]">
                            <p>{output}</p>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {isLoading && (
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                          AI
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-400"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <form onSubmit={handleSubmit} className="flex space-x-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask something about AI..."
                      className="flex-1"
                    />
                    <Button type="submit" disabled={isLoading}>Send</Button>
                  </form>
                </div>
              </TabsContent>
              
              <TabsContent value="image" className="mt-0 min-h-[300px] flex items-center justify-center">
                <div className="text-center p-6">
                  <ImageIcon className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                  <h3 className="text-xl font-semibold mb-2">Image Generation Coming Soon</h3>
                  <p className="text-gray-600 dark:text-gray-400">Our image generation demo is under development. Check back soon!</p>
                </div>
              </TabsContent>
              
              <TabsContent value="code" className="mt-0 min-h-[300px] flex items-center justify-center">
                <div className="text-center p-6">
                  <Code className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                  <h3 className="text-xl font-semibold mb-2">Code Assistant Coming Soon</h3>
                  <p className="text-gray-600 dark:text-gray-400">Our code assistant feature is under development. Check back soon!</p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;
