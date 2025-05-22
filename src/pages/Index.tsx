
import React from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import AIPath from '@/components/AIPath';
import InteractiveDemo from '@/components/InteractiveDemo';
import Footer from '@/components/Footer';
import { Brain, Code, Lightbulb, Users, Puzzle, Bot, Database } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
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
        
        <AIPath />
        
        <InteractiveDemo />
        
        {/* Call to Action */}
        <section className="py-16 relative overflow-hidden">
          {/* Background decorations */}
          <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-10">
            <div className="h-56 bg-gradient blur-[106px] dark:bg-purple-800"></div>
            <div className="h-32 bg-gradient blur-[106px] dark:bg-indigo-800"></div>
          </div>
          
          <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your AI Journey?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of non-technical learners who are successfully building and using AI.
              Your journey to AI literacy starts here.
            </p>
            <a 
              href="#"
              className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-gradient hover:opacity-90 transition-all"
            >
              Get Started for Free
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
