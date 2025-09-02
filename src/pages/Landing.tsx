import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Code, Sparkles, Users, BookOpen, Briefcase, GraduationCap, Eye, Play, Zap, Shield, Palette, ChevronRight, Star } from 'lucide-react';

export default function Landing() {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Visual Programming",
      description: "Drag and drop code blocks to create programs without typing syntax"
    },
    {
      icon: <Play className="w-8 h-8" />,
      title: "Multi-Language Support",
      description: "Support for C, Python, and Java with proper syntax templates"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Execution",
      description: "Compile and run your code instantly with live output"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Environment",
      description: "Safe code execution in isolated sandbox environments"
    }
  ];

  const useCases = [
    {
      icon: <GraduationCap className="w-12 h-12 text-blue-400" />,
      title: "Students",
      description: "Learn programming concepts without syntax barriers",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: <BookOpen className="w-12 h-12 text-green-400" />,
      title: "Teachers",
      description: "Teach programming logic visually and interactively",
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: <Briefcase className="w-12 h-12 text-purple-400" />,
      title: "Professionals",
      description: "Rapid prototyping and algorithm visualization",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: <Eye className="w-12 h-12 text-yellow-400" />,
      title: "Visitors",
      description: "Explore programming concepts without commitment",
      color: "from-yellow-500/20 to-orange-500/20"
    }
  ];

  const faqs = [
    {
      question: "What is ZEROCODES?",
      answer: "ZEROCODES is a visual programming platform that allows you to create programs by dragging and dropping code blocks instead of typing syntax. It supports C, Python, and Java programming languages."
    },
    {
      question: "Who can use ZEROCODES?",
      answer: "ZEROCODES is designed for students learning programming, teachers wanting to demonstrate concepts visually, working professionals for rapid prototyping, and curious visitors exploring programming."
    },
    {
      question: "Do I need programming experience?",
      answer: "No! ZEROCODES is designed to be beginner-friendly. The visual interface helps you understand programming logic without getting caught up in syntax details."
    },
    {
      question: "What programming languages are supported?",
      answer: "Currently, ZEROCODES supports C, Python, and Java. Each language has proper syntax templates and main function structures built-in."
    },
    {
      question: "Can I run my code in ZEROCODES?",
      answer: "Yes! Registered users can compile and execute their code directly in the platform with real-time output. Guest users can explore the interface but need to sign up to run code."
    },
    {
      question: "Is ZEROCODES free to use?",
      answer: "Yes, ZEROCODES is free to use. Simply sign up to start creating and running your visual programs."
    },
    {
      question: "Can I export my visual programs to text code?",
      answer: "Yes! ZEROCODES automatically generates the corresponding text code as you build with blocks, so you can see both visual and textual representations."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-6 py-8">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Code className="w-10 h-10 text-purple-400" />
                <Sparkles className="w-5 h-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <h1 className="text-3xl font-bold text-purple-400">
                ZEROCODES
              </h1>
            </div>
            <div className="flex gap-4">
              <Link to="/auth">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Sign In
                </Button>
              </Link>
              <Link to="/app">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Try Now
                </Button>
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl font-bold text-white mb-6 leading-tight">
              Visual Programming
              <span className="block text-purple-400">
                Made Simple
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Create programs by dragging and dropping code blocks. No syntax errors, no frustration - 
              just pure programming logic in a beautiful visual interface.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/app">
                <Button 
                  size="lg" 
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 text-lg"
                >
                  Start Creating <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 text-lg"
                >
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-6 py-20">
          <h3 className="text-4xl font-bold text-white text-center mb-16">
            Why Choose <span className="text-purple-400">ZEROCODES</span>?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="glass-effect border-white/20 hover:border-purple-400/50 transition-all duration-300 group cursor-pointer"
                onMouseEnter={() => setIsHovered(`feature-${index}`)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <CardHeader className="text-center">
                  <div className={`mx-auto text-purple-400 group-hover:text-pink-400 transition-colors duration-300 ${isHovered === `feature-${index}` ? 'animate-pulse' : ''}`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="container mx-auto px-6 py-20">
          <h3 className="text-4xl font-bold text-white text-center mb-16">
            Perfect For <span className="text-pink-400">Everyone</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <Card 
                key={index}
                className="glass-effect border-white/20 hover:border-purple-400/50 transition-all duration-300 group cursor-pointer bg-slate-800/50"
                onMouseEnter={() => setIsHovered(`usecase-${index}`)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <CardHeader className="text-center">
                  <div className={`mx-auto transition-transform duration-300 ${isHovered === `usecase-${index}` ? 'scale-110' : ''}`}>
                    {useCase.icon}
                  </div>
                  <CardTitle className="text-white text-xl">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-center">
                    {useCase.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-6 py-20">
          <h3 className="text-4xl font-bold text-white text-center mb-16">
            Frequently Asked <span className="text-yellow-400">Questions</span>
          </h3>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="glass-effect border-white/20 rounded-lg px-6"
                >
                  <AccordionTrigger className="text-white hover:text-purple-400 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-2xl mx-auto glass-effect border-white/20 rounded-2xl p-12">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your <span className="text-purple-400">Visual Programming</span> Journey?
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Join thousands of students, teachers, and professionals who are already creating amazing programs with ZEROCODES.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/auth">
                <Button 
                  size="lg" 
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 text-lg"
                >
                  Get Started Free <Star className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 border-t border-white/10">
          <div className="flex items-center justify-center gap-3 text-gray-400">
            <Code className="w-6 h-6 text-purple-400" />
            <span>© 2024 ZEROCODES. Made with love for visual programming.</span>
          </div>
        </footer>
      </div>
    </div>
  );
}