import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Box, Sphere, Torus } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX,
  Brain,
  Target,
  Lightbulb,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// 3D Scene Component
const InteractiveScene = ({ isPlaying }: { isPlaying: boolean }) => {
  return (
    <>
      {/* Ambient and directional lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Main brain-like structure */}
      <group rotation={isPlaying ? [0, Date.now() * 0.001, 0] : [0, 0, 0]}>
        {/* Central sphere representing the brain */}
        <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#6366f1" transparent opacity={0.8} />
        </Sphere>
        
        {/* Orbiting elements representing different aptitudes */}
        <group rotation={[0, Date.now() * 0.002, 0]}>
          <Box args={[0.3, 0.3, 0.3]} position={[2, 0, 0]}>
            <meshStandardMaterial color="#f59e0b" />
          </Box>
          <Text
            position={[2, -0.5, 0]}
            fontSize={0.2}
            color="#f59e0b"
            anchorX="center"
            anchorY="middle"
          >
            Logic
          </Text>
        </group>
        
        <group rotation={[0, Date.now() * 0.002 + Math.PI / 2, 0]}>
          <Torus args={[0.3, 0.1, 8, 16]} position={[2, 0, 0]}>
            <meshStandardMaterial color="#10b981" />
          </Torus>
          <Text
            position={[2, -0.5, 0]}
            fontSize={0.2}
            color="#10b981"
            anchorX="center"
            anchorY="middle"
          >
            Creative
          </Text>
        </group>
        
        <group rotation={[0, Date.now() * 0.002 + Math.PI, 0]}>
          <Box args={[0.2, 0.6, 0.2]} position={[2, 0, 0]}>
            <meshStandardMaterial color="#ef4444" />
          </Box>
          <Text
            position={[2, -0.5, 0]}
            fontSize={0.2}
            color="#ef4444"
            anchorX="center"
            anchorY="middle"
          >
            Social
          </Text>
        </group>
        
        <group rotation={[0, Date.now() * 0.002 + (3 * Math.PI) / 2, 0]}>
          <Sphere args={[0.25, 16, 16]} position={[2, 0, 0]}>
            <meshStandardMaterial color="#8b5cf6" />
          </Sphere>
          <Text
            position={[2, -0.5, 0]}
            fontSize={0.2}
            color="#8b5cf6"
            anchorX="center"
            anchorY="middle"
          >
            Analytical
          </Text>
        </group>
      </group>
      
      {/* Central text */}
      <Text
        position={[0, 0, 0]}
        fontSize={0.3}
        color="#1f2937"
        anchorX="center"
        anchorY="middle"
      >
        AI Assessment
      </Text>
    </>
  );
};

const Demo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentDemo, setCurrentDemo] = useState<'overview' | 'assessment' | 'results'>('overview');
  const [hasAudio, setHasAudio] = useState(true);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentDemo === 'assessment') {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentDemo('results');
            setIsPlaying(false);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentDemo]);

  const startDemo = () => {
    setCurrentDemo('assessment');
    setIsPlaying(true);
    setProgress(0);
  };

  const resetDemo = () => {
    setCurrentDemo('overview');
    setIsPlaying(false);
    setProgress(0);
  };

  const demoFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Our advanced AI analyzes your responses across multiple dimensions to create a comprehensive profile.",
      highlight: "95% accuracy in career matching"
    },
    {
      icon: Target,
      title: "Personalized Recommendations",
      description: "Get tailored career suggestions based on your unique combination of skills, interests, and personality.",
      highlight: "3-5 career matches per student"
    },
    {
      icon: Lightbulb,
      title: "Interactive Assessment",
      description: "Engaging questions that adapt to your responses, making the experience both fun and insightful.",
      highlight: "12-15 minutes completion time"
    },
    {
      icon: TrendingUp,
      title: "Growth Insights",
      description: "Understand your potential for growth in different career paths with detailed progression roadmaps.",
      highlight: "Future skills recommendations"
    }
  ];

  const sampleResults = [
    {
      career: "Software Engineer",
      match: 92,
      reasons: ["Strong logical reasoning", "High problem-solving skills", "Interest in technology"]
    },
    {
      career: "Data Scientist", 
      match: 87,
      reasons: ["Excellent analytical thinking", "Mathematical aptitude", "Pattern recognition skills"]
    },
    {
      career: "UX Designer",
      match: 78,
      reasons: ["Creative thinking", "Empathy for users", "Visual-spatial intelligence"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Interactive
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Demo Experience</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience our AI-powered career assessment platform with this interactive demonstration
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* 3D Interactive Demo */}
          <div className="space-y-6">
            <Card className="border-0 shadow-elegant overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>3D Assessment Visualization</CardTitle>
                    <CardDescription>
                      Watch how our AI analyzes different aspects of your personality and skills
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setHasAudio(!hasAudio)}
                    >
                      {hasAudio ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-primary-muted via-background to-secondary-muted rounded-lg overflow-hidden">
                  <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                    <InteractiveScene isPlaying={isPlaying} />
                    <OrbitControls enableZoom={true} enablePan={false} />
                  </Canvas>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={isPlaying ? "secondary" : "hero"}
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                      {isPlaying ? "Pause" : "Play"} Demo
                    </Button>
                    <Button variant="outline" onClick={resetDemo}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Drag to rotate • Scroll to zoom
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Demo Progress */}
            <AnimatePresence mode="wait">
              {currentDemo === 'assessment' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Clock className="h-5 w-5" />
                        <span>Assessment in Progress</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>Analyzing responses...</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div className={`flex items-center space-x-2 ${progress > 25 ? 'text-secondary' : 'text-muted-foreground'}`}>
                            <CheckCircle className="h-3 w-3" />
                            <span>Logical Reasoning</span>
                          </div>
                          <div className={`flex items-center space-x-2 ${progress > 50 ? 'text-secondary' : 'text-muted-foreground'}`}>
                            <CheckCircle className="h-3 w-3" />
                            <span>Personality Traits</span>
                          </div>
                          <div className={`flex items-center space-x-2 ${progress > 75 ? 'text-secondary' : 'text-muted-foreground'}`}>
                            <CheckCircle className="h-3 w-3" />
                            <span>Interest Mapping</span>
                          </div>
                          <div className={`flex items-center space-x-2 ${progress > 90 ? 'text-secondary' : 'text-muted-foreground'}`}>
                            <CheckCircle className="h-3 w-3" />
                            <span>Career Matching</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {currentDemo === 'results' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-warning" />
                        <span>Your Top Career Matches</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {sampleResults.map((result, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {index + 1}
                              </div>
                              <div>
                                <h4 className="font-medium">{result.career}</h4>
                                <p className="text-xs text-muted-foreground">
                                  {result.reasons.join(" • ")}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-secondary">{result.match}%</div>
                              <div className="text-xs text-muted-foreground">Match</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="text-center">
                    <Button onClick={() => navigate("/auth")} variant="hero" size="lg">
                      Take Real Assessment
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Features & Information */}
          <div className="space-y-8">
            {/* Demo Controls */}
            <Card>
              <CardHeader>
                <CardTitle>Demo Controls</CardTitle>
                <CardDescription>
                  Experience different parts of our assessment process
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={startDemo}
                  disabled={isPlaying}
                  variant="hero"
                  className="w-full"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Interactive Demo
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => navigate("/auth")}
                  >
                    Take Real Test
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate("/careers")}
                  >
                    Explore Careers
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Key Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Why Our Assessment Works</h3>
              
              {demoFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-primary-muted rounded-lg">
                          <feature.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{feature.description}</p>
                          <Badge variant="secondary" className="text-xs">
                            {feature.highlight}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Demo Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">15K+</div>
                    <div className="text-sm text-muted-foreground">Students Assessed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">95%</div>
                    <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">4.8/5</div>
                    <div className="text-sm text-muted-foreground">User Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">12 min</div>
                    <div className="text-sm text-muted-foreground">Avg. Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm italic mb-2">
                      "The 3D visualization helped me understand how the AI was analyzing my responses. 
                      It made the whole process transparent and engaging!"
                    </p>
                    <div className="text-xs text-muted-foreground">
                      - Priya S., Class 12 Student
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;