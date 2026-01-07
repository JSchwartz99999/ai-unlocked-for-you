
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Play, Bot, Code } from 'lucide-react';

const InteractiveDemo: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState('chat');

  return (
    <section className="py-16 bg-[var(--surface-0)]" id="build">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Try AI in Action</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Experience how AI works with these interactive examples. No coding required.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="chat" className="w-full" onValueChange={setActiveDemo}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                AI Chat
              </TabsTrigger>
              <TabsTrigger value="generate" className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                Text Generator
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Code Assistant
              </TabsTrigger>
            </TabsList>
            
            <div className="bg-[var(--surface-2)] rounded-lg shadow-lg border border-[var(--border-default)] overflow-hidden">
              <TabsContent value="chat" className="m-0">
                <Card className="border-0 shadow-none">
                  <CardHeader>
                    <CardTitle>Chat with AI</CardTitle>
                    <CardDescription>
                      Ask questions and get intelligent responses in real-time.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                      <div className="flex gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-gray-200 dark:bg-gray-800 p-3 rounded-lg max-w-[80%]">
                          <p className="text-sm">Hello! How can I help you learn about AI today?</p>
                        </div>
                      </div>
                      <div className="flex gap-3 mb-4 justify-end">
                        <div className="bg-[var(--accent-bg)] p-3 rounded-lg max-w-[80%]">
                          <p className="text-sm">Can you explain how neural networks work in simple terms?</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-xs">You</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-gray-200 dark:bg-gray-800 p-3 rounded-lg max-w-[80%]">
                          <p className="text-sm">Think of neural networks like your brain! They have layers of connected "neurons" that pass information to each other. Each connection has a "weight" that strengthens or weakens based on learning. When you show the network examples, it adjusts these weights to recognize patterns - just like how you learn from experience!</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <input 
                        type="text" 
                        placeholder="Type your question about AI..." 
                        className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-primary" 
                      />
                      <Button className="rounded-l-none">
                        Send
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="generate" className="m-0">
                <Card className="border-0 shadow-none">
                  <CardHeader>
                    <CardTitle>Generate Text</CardTitle>
                    <CardDescription>
                      Create AI-generated text based on your prompt.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Enter a prompt:</label>
                      <textarea 
                        rows={3} 
                        placeholder="Write a short story about a robot learning to paint..." 
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-primary" 
                      />
                    </div>
                    <Button className="w-full flex items-center justify-center gap-2">
                      <Play className="h-4 w-4" />
                      Generate Text
                    </Button>
                    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg min-h-[100px]">
                      <p className="text-[var(--text-tertiary)] text-sm italic">Generated text will appear here...</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="code" className="m-0">
                <Card className="border-0 shadow-none">
                  <CardHeader>
                    <CardTitle>Code Assistant</CardTitle>
                    <CardDescription>
                      Get help with coding questions or generate simple code examples.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">What code do you need help with?</label>
                      <textarea 
                        rows={3} 
                        placeholder="How do I create a function to calculate the average of an array in JavaScript?" 
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-primary" 
                      />
                    </div>
                    <Button className="w-full">
                      Get Code Solution
                    </Button>
                    <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm text-gray-300">
                      <p className="text-gray-500 italic">Code solution will appear here...</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
