import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { StatsSection } from "@/components/StatsSection";
import { AptitudeTestPreview } from "@/components/AptitudeTestPreview";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Users, BookOpen, Globe, Award, ArrowRight, Play, Star } from "lucide-react";

const Index = () => {
  const [showTestPreview, setShowTestPreview] = useState(false);

  const careerPaths = [
    {
      title: "Engineering & Technology",
      description: "AI, Robotics, Computer Science, Electrical Engineering",
      icon: Brain,
      color: "primary",
      demand: "High",
      examples: ["Software Engineer", "AI Specialist", "Robotics Engineer"]
    },
    {
      title: "Healthcare & Medicine",
      description: "Medicine, Nursing, Biotechnology, Public Health",
      icon: Users,
      color: "secondary", 
      demand: "Very High",
      examples: ["Doctor", "Nurse", "Biotech Researcher"]
    },
    {
      title: "Creative Arts & Design",
      description: "Graphic Design, Animation, Music, Fine Arts",
      icon: BookOpen,
      color: "accent",
      demand: "Growing",
      examples: ["UI/UX Designer", "Animator", "Digital Artist"]
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Class 12 Student",
      location: "Mumbai",
      content: "PathwaysQuest helped me discover my passion for biotechnology. Now I'm preparing for NEET with confidence!",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "Parent",
      location: "Delhi",
      content: "Amazing platform! My son found his career direction in AI engineering. The guidance is very detailed.",
      rating: 5
    },
    {
      name: "Anita Devi",
      role: "Career Counselor",
      location: "Pune",
      content: "I recommend this platform to all my students. The AI recommendations are surprisingly accurate.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Interactive Demo Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Try Our
              <span className="bg-gradient-hero bg-clip-text text-transparent"> AI Assessment</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience our intelligent career assessment with this interactive demo. 
              See how our AI analyzes your responses to provide personalized recommendations.
            </p>
          </div>

          {!showTestPreview ? (
            <div className="text-center">
              <Card className="p-12 max-w-2xl mx-auto">
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <Play className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Interactive Demo Available</h3>
                    <p className="text-muted-foreground">
                      Take a sample assessment to see how our AI-powered career counseling works. 
                      This demo includes personality, aptitude, and interest questions.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      variant="hero" 
                      size="lg" 
                      onClick={() => window.location.href = "/auth"}
                      className="group"
                    >
                      Start Free Assessment
                      <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => window.location.href = "/demo"}>
                      Watch Interactive Demo
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <AptitudeTestPreview />
          )}
        </div>
      </section>

      {/* Career Paths Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Explore
              <span className="bg-gradient-hero bg-clip-text text-transparent"> Career Pathways</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From traditional careers to emerging fields, discover detailed pathways with entrance exams, 
              colleges, and skill requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {careerPaths.map((path, index) => {
              const colorMap = {
                primary: "bg-primary-muted text-primary border-primary/20",
                secondary: "bg-secondary-muted text-secondary border-secondary/20",
                accent: "bg-accent-muted text-accent border-accent/20"
              };

              return (
                <Card key={index} className="p-6 hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`inline-flex p-3 rounded-lg ${colorMap[path.color as keyof typeof colorMap]}`}>
                        <path.icon className="h-6 w-6" />
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        path.demand === 'Very High' ? 'bg-secondary-muted text-secondary' :
                        path.demand === 'High' ? 'bg-warning-muted text-warning' :
                        'bg-accent-muted text-accent'
                      }`}>
                        {path.demand} Demand
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{path.title}</h3>
                      <p className="text-muted-foreground">{path.description}</p>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">Popular Careers:</div>
                      <div className="space-y-1">
                        {path.examples.map((example, i) => (
                          <div key={i} className="text-sm text-muted-foreground">• {example}</div>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" className="w-full group" onClick={() => window.location.href = "/careers"}>
                      Explore Pathway
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              What Students & Parents
              <span className="bg-gradient-hero bg-clip-text text-transparent"> Say About Us</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real testimonials from students who discovered their career paths using our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  
                  <div className="border-t pt-4">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role} • {testimonial.location}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ready to Discover Your Perfect Career Path?
          </h2>
          <p className="text-xl opacity-90">
            Join thousands of students who have found their calling with our AI-powered career guidance platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="group" onClick={() => window.location.href = "/auth"}>
              Start Free Assessment
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              Talk to Counselor
            </Button>
          </div>
          
          <div className="pt-8 text-sm opacity-75">
            ✓ Free to start  ✓ No credit card required  ✓ Available in 12 languages
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-hero p-2 rounded-lg">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-lg">PathwaysQuest</span>
              </div>
              <p className="text-muted-foreground">
                AI-powered career guidance for secondary school students across India.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Aptitude Tests</div>
                <div>Career Paths</div>
                <div>College Guidance</div>
                <div>Scholarship Info</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Help Center</div>
                <div>Documentation</div>
                <div>Contact Us</div>
                <div>Privacy Policy</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Languages</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>🇮🇳 Hindi</div>
                <div>🇬🇧 English</div>
                <div>🇮🇳 Tamil</div>
                <div>🇮🇳 +9 More</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 PathwaysQuest. Made with ❤️ for Indian students. Aligned with NEP 2020.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
