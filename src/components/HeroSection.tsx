import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Target, Users, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-subtle"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-secondary/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="space-y-8 animate-slide-up">
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 bg-primary-muted rounded-full text-sm font-medium text-primary">
              <Zap className="h-4 w-4 mr-2" />
              AI-Powered Career Guidance
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Discover Your
              <span className="bg-gradient-hero bg-clip-text text-transparent"> Perfect Career</span>
              <br />
              Path
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl">
              Personalized career counseling for secondary school students using AI. Take aptitude tests, 
              explore career paths, and get guidance from Classes 9-12 to your dream job.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" className="group">
              Start Free Assessment
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Students Guided</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">200+</div>
              <div className="text-sm text-muted-foreground">Career Paths</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="relative">
            <img 
              src={heroImage} 
              alt="Students using AI career guidance platform"
              className="rounded-2xl shadow-elegant w-full"
            />
            
            {/* Floating cards */}
            <div className="absolute -top-4 -left-4 bg-card p-4 rounded-xl shadow-card animate-float">
              <Brain className="h-6 w-6 text-primary mb-2" />
              <div className="text-sm font-medium">AI Analysis</div>
              <div className="text-xs text-muted-foreground">Smart Recommendations</div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-card p-4 rounded-xl shadow-card animate-float" style={{ animationDelay: '1s' }}>
              <Target className="h-6 w-6 text-secondary mb-2" />
              <div className="text-sm font-medium">Career Match</div>
              <div className="text-xs text-muted-foreground">98% Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};