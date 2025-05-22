import React from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import AIPath from '@/components/AIPath';
import InteractiveDemo from '@/components/InteractiveDemo';
import Footer from '@/components/Footer';
import { 
  Brain, 
  Code, 
  Lightbulb, 
  Users, 
  Puzzle, 
  Bot, 
  Database,
  Sparkles,
  LineChart,
  BookOpen,
  Star 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Features Section */}
        <section id="ai-basics" data-section="ai-basics" className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <span>Key Features</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Learn AI With Us?</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our interactive approach makes complex AI concepts easy to understand and apply, 
                without requiring advanced technical skills.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                title="Beginner-Friendly Learning" 
                description="No coding experience or technical background required. We explain everything in clear, simple terms."
                icon={Brain}
              />
              
              <FeatureCard 
                title="Interactive Examples" 
                description="Don't just read about AI - interact with models and see AI in action through hands-on exercises."
                icon={Puzzle}
              />
              
              <FeatureCard 
                title="Build Real AI Projects" 
                description="Create your own AI models that solve real problems, even without any coding knowledge."
                icon={Code}
              />
              
              <FeatureCard 
                title="Learn at Your Pace" 
                description="Flexible learning paths allow you to progress at whatever speed works for you."
                icon={Users}
              />
              
              <FeatureCard 
                title="Practical Applications" 
                description="Discover how to apply AI in your daily life and work to save time and increase productivity."
                icon={Lightbulb}
              />
              
              <FeatureCard 
                title="Stay Current" 
                description="Keep up with the rapidly evolving AI landscape with our regularly updated content."
                icon={Bot}
              />
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section id="ml-intro" data-section="ml-intro" className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-6">
                <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">50K+</h3>
                <p className="text-gray-600 dark:text-gray-300">Active Learners</p>
              </div>
              
              <div className="p-6">
                <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-secondary/10">
                  <BookOpen className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">200+</h3>
                <p className="text-gray-600 dark:text-gray-300">Lessons & Tutorials</p>
              </div>
              
              <div className="p-6">
                <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">100+</h3>
                <p className="text-gray-600 dark:text-gray-300">AI Projects</p>
              </div>
              
              <div className="p-6">
                <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-secondary/10">
                  <Star className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">4.9</h3>
                <p className="text-gray-600 dark:text-gray-300">User Rating</p>
              </div>
            </div>
          </div>
        </section>
        
        <AIPath />
        
        <InteractiveDemo />
        
        {/* Testimonials Section */}
        <section id="neural-networks" data-section="neural-networks" className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <span>Testimonials</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Students Say</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Read about the experiences of people who have transformed their understanding of AI through our platform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient text-white flex items-center justify-center font-bold">KL</div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Karen L.</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Marketing Manager</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "I was intimidated by AI before, but this platform made it so approachable! Now I use AI tools daily in my marketing strategy with confidence."
                </p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient text-white flex items-center justify-center font-bold">JS</div>
                  <div className="ml-4">
                    <h4 className="font-semibold">James S.</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Small Business Owner</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "The no-code AI project builder was a game-changer for my business. I created a customer service bot that saves me hours every week!"
                </p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient text-white flex items-center justify-center font-bold">MT</div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Maria T.</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Teacher</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "I'm using what I learned to teach my students about AI in a way that's fun and accessible. The interactive demos are perfect for classroom use!"
                </p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* No-Code AI Section */}
        <section id="no-code-ai" data-section="no-code-ai" className="py-16 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <span>No-Code AI</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Build AI Without Writing Code</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our platform makes it easy to create powerful AI solutions without any programming knowledge.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Drag-and-Drop AI Builder</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  With our intuitive interface, you can create custom AI models by simply dragging and dropping components.
                  No technical expertise required.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="mr-2 bg-primary/10 p-1 rounded-full">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <span>Visual workflow editor</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 bg-primary/10 p-1 rounded-full">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <span>Pre-built components</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 bg-primary/10 p-1 rounded-full">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <span>One-click deployment</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                  <Database className="h-16 w-16 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Interactive demo placeholder - No-Code AI Builder
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* AI Templates Section */}
        <section id="ai-templates" data-section="ai-templates" className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <span>AI Templates</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready-to-Use AI Templates</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Get started quickly with our collection of pre-built AI solutions for common use cases.
              </p>
            </div>
          </div>
        </section>
        
        {/* Custom Models Section */}
        <section id="custom-models" data-section="custom-models" className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <span>Custom Models</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Build Custom AI Solutions</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Create AI models tailored to your specific needs with our advanced customization tools.
              </p>
            </div>
          </div>
        </section>
        
        {/* AI Tools Section */}
        <section id="ai-tools" data-section="ai-tools" className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <span>AI Tools</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Essential AI Tools</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Discover the tools that make building and using AI accessible to everyone.
              </p>
            </div>
          </div>
        </section>
        
        {/* Resources Section */}
        <section id="resources" data-section="resources" className="py-16 relative overflow-hidden bg-gray-50 dark:bg-gray-800">
          {/* Background decorations */}
          <div aria-hidden="true" className="absolute inset-0">
            <div className="absolute top-0 left-0 -translate-y-12 translate-x-12 blur-3xl opacity-20 w-96 h-96 bg-gradient"></div>
            <div className="absolute bottom-0 right-0 translate-y-12 -translate-x-12 blur-3xl opacity-20 w-96 h-96 bg-gradient"></div>
          </div>
          
          <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
            <div className="inline-flex items-center mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Get Started Today</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your AI Journey?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of non-technical learners who are successfully building and using AI.
              Your journey to AI literacy starts here.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-gradient hover:opacity-90 text-base"
              >
                Get Started for Free
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base"
              >
                View Course Catalog
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
