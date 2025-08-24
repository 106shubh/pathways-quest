import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Lightbulb,
  Target,
  Heart,
  Zap
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AptitudeTest = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [testSection, setTestSection] = useState<'intro' | 'test' | 'results'>('intro');
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          navigate("/auth");
          return;
        }

        setUser(session.user);
      } catch (error) {
        console.error("Auth check error:", error);
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerActive && timeLeft > 0 && testSection === 'test') {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            handleTestComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft, testSection]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Sample comprehensive test questions
  const testQuestions = [
    // Logical Reasoning
    {
      id: 1,
      category: "Logical Reasoning",
      type: "logical",
      question: "If all Bloops are Razzles and all Razzles are Lazzles, which statement must be true?",
      options: [
        "All Bloops are Lazzles",
        "All Lazzles are Bloops", 
        "Some Lazzles are not Razzles",
        "No Bloops are Lazzles"
      ],
      correct: 0
    },
    {
      id: 2,
      category: "Logical Reasoning",
      type: "logical",
      question: "Complete the pattern: 2, 6, 12, 20, 30, ?",
      options: ["40", "42", "44", "48"],
      correct: 1
    },
    // Quantitative Aptitude
    {
      id: 3,
      category: "Quantitative Aptitude",
      type: "quantitative",
      question: "A train travels 120 km in 2 hours. At this rate, how far will it travel in 5 hours?",
      options: ["250 km", "280 km", "300 km", "320 km"],
      correct: 2
    },
    {
      id: 4,
      category: "Quantitative Aptitude",
      type: "quantitative",
      question: "If 3x + 7 = 22, what is the value of x?",
      options: ["3", "4", "5", "6"],
      correct: 2
    },
    // Verbal Reasoning
    {
      id: 5,
      category: "Verbal Reasoning",
      type: "verbal",
      question: "Choose the word that best completes the analogy: Book : Author :: Painting : ?",
      options: ["Canvas", "Artist", "Museum", "Frame"],
      correct: 1
    },
    {
      id: 6,
      category: "Verbal Reasoning", 
      type: "verbal",
      question: "Which word does NOT belong with the others?",
      options: ["Honest", "Truthful", "Sincere", "Wealthy"],
      correct: 3
    },
    // Spatial Intelligence
    {
      id: 7,
      category: "Spatial Intelligence",
      type: "spatial",
      question: "How many cubes are there in a 3×3×3 cube structure?",
      options: ["18", "21", "24", "27"],
      correct: 3
    },
    {
      id: 8,
      category: "Spatial Intelligence",
      type: "spatial",
      question: "If you fold a paper in half twice and then cut a triangle, how many triangles will you see when unfolded?",
      options: ["2", "4", "6", "8"],
      correct: 1
    },
    // Interest & Personality
    {
      id: 9,
      category: "Interest Assessment",
      type: "interest",
      question: "Which activity would you most enjoy?",
      options: [
        "Solving complex mathematical problems",
        "Writing creative stories or poems",
        "Building or fixing mechanical devices",
        "Helping people solve their problems"
      ],
      correct: -1 // No correct answer for interest questions
    },
    {
      id: 10,
      category: "Interest Assessment",
      type: "interest",
      question: "In your free time, you prefer to:",
      options: [
        "Read books or research topics online",
        "Create art, music, or crafts",
        "Play sports or outdoor activities", 
        "Socialize with friends and family"
      ],
      correct: -1
    },
    // More questions for comprehensive assessment
    {
      id: 11,
      category: "Logical Reasoning",
      type: "logical",
      question: "In a certain code, COMPUTER is written as RFUVQNPC. How is MACHINE written in that code?",
      options: ["ZNXQMPE", "ZNCHINE", "ANPQMFR", "QNXQMFR"],
      correct: 0
    },
    {
      id: 12,
      category: "Personality",
      type: "personality",
      question: "When working on a group project, you typically:",
      options: [
        "Take charge and delegate tasks",
        "Focus on your individual contribution",
        "Make sure everyone gets along well",
        "Research and provide detailed analysis"
      ],
      correct: -1
    }
  ];

  const startTest = () => {
    setTestSection('test');
    setIsTimerActive(true);
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleTestComplete();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleTestComplete = () => {
    setIsTimerActive(false);
    setTestSection('results');
    
    // Calculate results
    const results = calculateResults();
    
    toast({
      title: "Test Completed!",
      description: "Your results are ready. Check your career recommendations.",
    });
  };

  const calculateResults = () => {
    let logicalScore = 0;
    let quantitativeScore = 0;
    let verbalScore = 0;
    let spatialScore = 0;
    
    const interests: Record<string, number> = {
      technical: 0,
      creative: 0,
      social: 0,
      analytical: 0
    };

    testQuestions.forEach((question, index) => {
      const answer = answers[index];
      if (answer !== undefined) {
        const answerIndex = parseInt(answer);
        
        if (question.type === 'logical' && answerIndex === question.correct) {
          logicalScore++;
        } else if (question.type === 'quantitative' && answerIndex === question.correct) {
          quantitativeScore++;
        } else if (question.type === 'verbal' && answerIndex === question.correct) {
          verbalScore++;
        } else if (question.type === 'spatial' && answerIndex === question.correct) {
          spatialScore++;
        } else if (question.type === 'interest' || question.type === 'personality') {
          // Map interest responses to categories
          if (answerIndex === 0) interests.analytical++;
          else if (answerIndex === 1) interests.creative++;
          else if (answerIndex === 2) interests.technical++;
          else if (answerIndex === 3) interests.social++;
        }
      }
    });

    return {
      logical: (logicalScore / 3) * 100,
      quantitative: (quantitativeScore / 2) * 100,
      verbal: (verbalScore / 2) * 100,
      spatial: (spatialScore / 2) * 100,
      interests
    };
  };

  const getCareerRecommendations = () => {
    const results = calculateResults();
    const recommendations = [];

    if (results.quantitative > 70 && results.logical > 70) {
      recommendations.push({
        title: "Engineering & Technology",
        match: Math.round((results.quantitative + results.logical) / 2),
        description: "Your strong analytical and problem-solving skills make you well-suited for engineering fields.",
        paths: ["Software Engineering", "Mechanical Engineering", "Electrical Engineering"]
      });
    }

    if (results.verbal > 70) {
      recommendations.push({
        title: "Communication & Media",
        match: Math.round(results.verbal),
        description: "Your excellent verbal abilities suggest success in communication-focused careers.",
        paths: ["Journalism", "Content Writing", "Public Relations"]
      });
    }

    if (results.spatial > 70) {
      recommendations.push({
        title: "Design & Architecture",
        match: Math.round(results.spatial),
        description: "Your spatial intelligence indicates potential in design and architectural fields.",
        paths: ["Architecture", "Graphic Design", "Interior Design"]
      });
    }

    // Add more based on interests
    const topInterest = Object.entries(results.interests).sort(([,a], [,b]) => b - a)[0];
    
    if (topInterest[0] === 'social' && topInterest[1] > 1) {
      recommendations.push({
        title: "Healthcare & Social Services",
        match: 85,
        description: "Your people-oriented nature suggests success in helping professions.",
        paths: ["Medicine", "Psychology", "Social Work"]
      });
    }

    return recommendations.slice(0, 3); // Return top 3 recommendations
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading assessment...</p>
        </div>
      </div>
    );
  }

  const currentQ = testQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / testQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} userRole="student" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {testSection === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="p-3 bg-gradient-primary rounded-lg">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold">Comprehensive Career Assessment</h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover your strengths, interests, and ideal career paths through our AI-powered assessment
              </p>
            </div>

            {/* Test Info */}
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle>What to Expect</CardTitle>
                <CardDescription>
                  This comprehensive assessment covers multiple areas to give you personalized career recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-primary-muted rounded-lg">
                        <Lightbulb className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Logical Reasoning</h4>
                        <p className="text-sm text-muted-foreground">Pattern recognition, analytical thinking, problem-solving abilities</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-secondary-muted rounded-lg">
                        <Target className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Quantitative Aptitude</h4>
                        <p className="text-sm text-muted-foreground">Mathematical reasoning, numerical ability, data interpretation</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-accent-muted rounded-lg">
                        <Zap className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Verbal & Spatial</h4>
                        <p className="text-sm text-muted-foreground">Language skills, spatial intelligence, visual processing</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-warning-muted rounded-lg">
                        <Heart className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Interests & Personality</h4>
                        <p className="text-sm text-muted-foreground">Career preferences, work style, motivational factors</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-accent" />
                    <span className="font-medium">Test Details</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <p className="font-medium">30 minutes</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Questions:</span>
                      <p className="font-medium">{testQuestions.length}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Sections:</span>
                      <p className="font-medium">4 areas</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Difficulty:</span>
                      <p className="font-medium">Adaptive</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button onClick={startTest} size="lg" variant="hero" className="px-8">
                    Start Assessment <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    Make sure you have a stable internet connection
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {testSection === 'test' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Test Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Career Assessment</h2>
                <p className="text-muted-foreground">
                  Question {currentQuestion + 1} of {testQuestions.length}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono text-lg">
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Time remaining</p>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 shadow-elegant">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{currentQ.category}</Badge>
                      <div className="text-sm text-muted-foreground">
                        {Object.keys(answers).length}/{testQuestions.length} answered
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-relaxed">
                      {currentQ.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={answers[currentQuestion] || ""}
                      onValueChange={handleAnswerChange}
                      className="space-y-4"
                    >
                      {currentQ.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={goToPreviousQuestion}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="flex space-x-2">
                {currentQuestion === testQuestions.length - 1 ? (
                  <Button
                    onClick={handleTestComplete}
                    disabled={!answers[currentQuestion]}
                    variant="hero"
                  >
                    Complete Test
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={goToNextQuestion}
                    disabled={!answers[currentQuestion]}
                    variant="hero"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {testSection === 'results' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Results Header */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="p-3 bg-gradient-secondary rounded-lg">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold">Assessment Complete!</h1>
              </div>
              <p className="text-xl text-muted-foreground">
                Here are your personalized career recommendations
              </p>
            </div>

            {/* Results Cards */}
            <div className="grid gap-6">
              {getCareerRecommendations().map((recommendation, index) => (
                <Card key={index} className="border-0 shadow-elegant">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary-muted text-primary rounded-full text-sm font-bold">
                          {index + 1}
                        </div>
                        <span>{recommendation.title}</span>
                      </CardTitle>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        {recommendation.match}% Match
                      </Badge>
                    </div>
                    <CardDescription>{recommendation.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Recommended Career Paths:</h4>
                        <div className="flex flex-wrap gap-2">
                          {recommendation.paths.map((path, pathIndex) => (
                            <Badge key={pathIndex} variant="outline">
                              {path}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/careers")} variant="hero" size="lg">
                Explore Career Pathways
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button onClick={() => navigate("/dashboard")} variant="outline" size="lg">
                Back to Dashboard
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AptitudeTest;