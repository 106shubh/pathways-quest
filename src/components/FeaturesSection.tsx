import { Brain, Target, Users, BookOpen, Globe, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Assessment",
    description: "Advanced psychometric tests with MBTI-like personality analysis and logical reasoning evaluation.",
    color: "primary"
  },
  {
    icon: Target,
    title: "Personalized Recommendations",
    description: "Get top 3-5 career matches with confidence scores based on your interests and aptitudes.",
    color: "secondary"
  },
  {
    icon: BookOpen,
    title: "Detailed Career Pathways",
    description: "Complete roadmaps from Class 9-12 including subjects, entrance exams, and top colleges.",
    color: "accent"
  },
  {
    icon: Users,
    title: "Multi-User Dashboard",
    description: "Separate dashboards for students, parents, teachers, and counselors with role-based access.",
    color: "warning"
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description: "Available in English, Hindi, and 10+ regional languages with text-to-speech capabilities.",
    color: "primary"
  },
  {
    icon: Award,
    title: "Scholarship Discovery",
    description: "Find relevant government schemes and scholarships based on your career path and profile.",
    color: "secondary"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent-muted rounded-full text-sm font-medium text-accent">
            ✨ Platform Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Everything You Need for
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Career Success</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive AI-driven platform provides all the tools and guidance needed to help students 
            make informed career decisions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const colorMap = {
              primary: "bg-primary-muted text-primary",
              secondary: "bg-secondary-muted text-secondary", 
              accent: "bg-accent-muted text-accent",
              warning: "bg-warning-muted text-warning"
            };

            return (
              <div 
                key={index}
                className="group bg-card p-6 rounded-xl shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`inline-flex p-3 rounded-lg ${colorMap[feature.color as keyof typeof colorMap]} mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button variant="hero" size="lg" className="group">
            Explore All Features
            <Brain className="h-5 w-5 ml-2 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};