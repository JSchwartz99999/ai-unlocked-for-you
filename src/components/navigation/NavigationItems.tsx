
import { LucideIcon } from 'lucide-react';

export interface NavigationLink {
  href: string;
  title: string;
  description?: string;
}

export const learnLinks: NavigationLink[] = [
  { href: "#ai-basics", title: "AI Basics", description: "Learn the fundamental concepts of AI" },
  { href: "#ml-intro", title: "Machine Learning", description: "Understanding how machines learn" },
  { href: "#neural-networks", title: "Neural Networks", description: "The building blocks of AI systems" },
  { href: "#ai-tools", title: "AI Tools", description: "Popular tools for working with AI" },
];

export const buildLinks: NavigationLink[] = [
  { href: "#no-code-ai", title: "No-Code AI", description: "Build AI models without coding" },
  { href: "#ai-templates", title: "AI Templates", description: "Start with pre-built models" },
  { href: "#custom-models", title: "Custom Models", description: "Create AI tailored to your needs" },
];
