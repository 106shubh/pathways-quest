import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { 
  Search,
  Filter,
  Brain,
  Users,
  BookOpen,
  Briefcase,
  TrendingUp,
  DollarSign,
  Clock,
  MapPin,
  Star,
  ArrowRight,
  GraduationCap,
  Award,
  Target,
  Zap,
  Heart,
  Code,
  Stethoscope,
  Palette,
  Building,
  Gavel,
  Camera
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const CareerPaths = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCareer, setSelectedCareer] = useState<any>(null);
  
  const navigate = useNavigate();

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

  // Comprehensive career data
  const careerCategories = [
    { id: "all", name: "All Careers", icon: Target },
    { id: "engineering", name: "Engineering & Tech", icon: Code },
    { id: "healthcare", name: "Healthcare", icon: Stethoscope },
    { id: "creative", name: "Creative Arts", icon: Palette },
    { id: "business", name: "Business & Finance", icon: Building },
    { id: "law", name: "Law & Governance", icon: Gavel },
    { id: "media", name: "Media & Communication", icon: Camera }
  ];

  const careers = [
    // Engineering & Technology
    {
      id: 1,
      title: "Software Engineer",
      category: "engineering",
      icon: Code,
      description: "Design, develop, and maintain software applications and systems",
      demand: "Very High",
      demandColor: "secondary",
      salaryRange: "₹6-25 LPA",
      experience: "0-10+ years",
      skills: ["Programming", "Problem Solving", "System Design", "Testing"],
      education: "B.Tech/B.E. in CS/IT",
      examRequired: ["JEE Main", "JEE Advanced", "BITSAT"],
      topColleges: ["IIT Delhi", "IIT Bombay", "IIIT Hyderabad", "NIT Trichy"],
      workEnvironment: "Office/Remote",
      jobGrowth: "+22%",
      personalityFit: "Analytical, Detail-oriented, Creative",
      dayInLife: [
        "Review code and plan development tasks",
        "Write and debug software code",
        "Collaborate with team members",
        "Test and deploy applications",
        "Document technical specifications"
      ],
      careerProgression: [
        "Junior Developer (0-2 years)",
        "Software Engineer (2-4 years)", 
        "Senior Engineer (4-7 years)",
        "Tech Lead (7-10 years)",
        "Engineering Manager (10+ years)"
      ],
      scholarships: ["Google Developer Scholarship", "Microsoft Imagine Cup", "TCS Scholarship"],
      courses: ["Data Structures & Algorithms", "Web Development", "Mobile App Development"],
      futureScope: "AI/ML integration, Cloud computing, IoT development"
    },
    {
      id: 2,
      title: "Data Scientist",
      category: "engineering",
      icon: Brain,
      description: "Analyze complex data to help organizations make informed decisions",
      demand: "Very High",
      demandColor: "secondary",
      salaryRange: "₹8-30 LPA",
      experience: "0-8+ years",
      skills: ["Statistics", "Python/R", "Machine Learning", "Data Visualization"],
      education: "B.Tech/B.Sc. in CS/Stats/Math",
      examRequired: ["JEE Main", "GATE", "University Entrance"],
      topColleges: ["ISI Kolkata", "IIT KGP", "IISc Bangalore", "CMI Chennai"],
      workEnvironment: "Office/Remote",
      jobGrowth: "+35%",
      personalityFit: "Analytical, Curious, Detail-oriented",
      dayInLife: [
        "Explore and clean datasets",
        "Build predictive models",
        "Create data visualizations",
        "Present insights to stakeholders",
        "Collaborate with business teams"
      ],
      careerProgression: [
        "Junior Data Scientist (0-2 years)",
        "Data Scientist (2-5 years)",
        "Senior Data Scientist (5-8 years)",
        "Principal Data Scientist (8+ years)",
        "Chief Data Officer (10+ years)"
      ],
      scholarships: ["IBM AI Scholarship", "Coursera Data Science", "Kaggle Learn"],
      courses: ["Machine Learning", "Deep Learning", "Statistical Analysis"],
      futureScope: "AI/ML advancement, Big Data analytics, Automated insights"
    },
    // Healthcare
    {
      id: 3,
      title: "Doctor (MBBS)",
      category: "healthcare",
      icon: Stethoscope,
      description: "Diagnose and treat patients, promote health and prevent disease",
      demand: "Very High",
      demandColor: "secondary",
      salaryRange: "₹8-50+ LPA",
      experience: "5.5+ years",
      skills: ["Medical Knowledge", "Communication", "Empathy", "Critical Thinking"],
      education: "MBBS (5.5 years)",
      examRequired: ["NEET UG", "NEET PG (for specialization)"],
      topColleges: ["AIIMS Delhi", "AFMC Pune", "CMC Vellore", "KGMU Lucknow"],
      workEnvironment: "Hospitals/Clinics",
      jobGrowth: "+18%",
      personalityFit: "Compassionate, Detail-oriented, Resilient",
      dayInLife: [
        "Examine and diagnose patients",
        "Prescribe treatments and medications",
        "Perform medical procedures",
        "Maintain patient records",
        "Consult with other healthcare professionals"
      ],
      careerProgression: [
        "Medical Student (5.5 years)",
        "Intern (1 year)",
        "Resident Doctor (3 years)",
        "Specialist/Consultant (ongoing)",
        "Department Head/Private Practice"
      ],
      scholarships: ["Central Sector Scholarship", "State Medical Scholarships", "Merit Scholarships"],
      courses: ["Anatomy", "Physiology", "Pathology", "Pharmacology"],
      futureScope: "Telemedicine, AI diagnostics, Precision medicine"
    },
    // Creative Arts
    {
      id: 4,
      title: "UI/UX Designer",
      category: "creative",
      icon: Palette,
      description: "Create intuitive and visually appealing user interfaces and experiences",
      demand: "High",
      demandColor: "warning",
      salaryRange: "₹4-20 LPA",
      experience: "0-8+ years",
      skills: ["Design Thinking", "Prototyping", "User Research", "Visual Design"],
      education: "B.Des/BFA/B.Tech in Design",
      examRequired: ["NID Entrance", "UCEED", "CEED"],
      topColleges: ["NID Ahmedabad", "IIITD Delhi", "Srishti Bangalore", "Pearl Academy"],
      workEnvironment: "Office/Remote",
      jobGrowth: "+24%",
      personalityFit: "Creative, Empathetic, Problem-solver",
      dayInLife: [
        "Research user needs and behaviors",
        "Create wireframes and prototypes",
        "Design user interfaces",
        "Conduct usability testing",
        "Collaborate with developers"
      ],
      careerProgression: [
        "Junior Designer (0-2 years)",
        "UI/UX Designer (2-4 years)",
        "Senior Designer (4-7 years)",
        "Design Lead (7-10 years)",
        "Design Director (10+ years)"
      ],
      scholarships: ["Adobe Scholarship", "Design Excellence Awards", "Creative Scholarships"],
      courses: ["Figma/Sketch", "User Research", "Interaction Design"],
      futureScope: "VR/AR interfaces, Voice UI, AI-powered design"
    },
    // Business & Finance
    {
      id: 5,
      title: "Investment Banker",
      category: "business",
      icon: Building,
      description: "Help companies raise capital and provide financial advisory services",
      demand: "High",
      demandColor: "warning",
      salaryRange: "₹15-80+ LPA",
      experience: "0-15+ years",
      skills: ["Financial Analysis", "Communication", "Networking", "Analytical Skills"],
      education: "BBA/B.Com/Economics/MBA",
      examRequired: ["CAT", "XAT", "GMAT", "CFA"],
      topColleges: ["IIM Ahmedabad", "ISB Hyderabad", "FMS Delhi", "XLRI Jamshedpur"],
      workEnvironment: "Office (Long hours)",
      jobGrowth: "+10%",
      personalityFit: "Ambitious, Analytical, High-pressure tolerance",
      dayInLife: [
        "Analyze financial statements",
        "Create investment presentations",
        "Meet with clients",
        "Structure financial deals",
        "Monitor market trends"
      ],
      careerProgression: [
        "Analyst (0-2 years)",
        "Associate (2-4 years)",
        "Vice President (4-8 years)",
        "Director (8-12 years)",
        "Managing Director (12+ years)"
      ],
      scholarships: ["Merit-based MBA Scholarships", "CFA Institute Scholarships"],
      courses: ["Financial Modeling", "Investment Banking", "Capital Markets"],
      futureScope: "Fintech integration, Sustainable finance, Digital banking"
    },
    // Law & Governance
    {
      id: 6,
      title: "Lawyer",
      category: "law",
      icon: Gavel,
      description: "Represent clients and provide legal advice in various areas of law",
      demand: "Growing",
      demandColor: "accent",
      salaryRange: "₹3-50+ LPA",
      experience: "0-20+ years",
      skills: ["Legal Research", "Communication", "Critical Thinking", "Negotiation"],
      education: "LLB (3 years) / BA LLB (5 years)",
      examRequired: ["CLAT", "AILET", "LSAT India"],
      topColleges: ["NLSIU Bangalore", "NALSAR Hyderabad", "NLU Delhi", "BHU Law"],
      workEnvironment: "Law Firms/Courts",
      jobGrowth: "+9%",
      personalityFit: "Argumentative, Detail-oriented, Ethical",
      dayInLife: [
        "Research legal precedents",
        "Draft legal documents", 
        "Meet with clients",
        "Appear in court hearings",
        "Negotiate settlements"
      ],
      careerProgression: [
        "Junior Associate (0-3 years)",
        "Associate (3-6 years)",
        "Senior Associate (6-10 years)",
        "Partner Track (10+ years)",
        "Independent Practice/Judge"
      ],
      scholarships: ["Bar Council Scholarships", "Legal Aid Scholarships"],
      courses: ["Constitutional Law", "Corporate Law", "Criminal Law"],
      futureScope: "Legal Tech, AI in law, International arbitration"
    }
  ];

  const filteredCareers = careers.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || career.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading career pathways...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} userRole="student" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Explore 
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Career Pathways</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover detailed information about different careers, from education requirements to future prospects
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Search Careers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Search by career, skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Categories</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {careerCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <category.icon className="h-4 w-4 mr-2" />
                      {category.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Career Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{filteredCareers.length}</div>
                  <div className="text-sm text-muted-foreground">Available Careers</div>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>High Demand:</span>
                    <span className="font-medium">{filteredCareers.filter(c => c.demand === "Very High").length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Growing:</span>
                    <span className="font-medium">{filteredCareers.filter(c => c.demand === "High").length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emerging:</span>
                    <span className="font-medium">{filteredCareers.filter(c => c.demand === "Growing").length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {!selectedCareer ? (
              /* Career Grid */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {selectedCategory === "all" ? "All Careers" : 
                     careerCategories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                  <div className="text-sm text-muted-foreground">
                    {filteredCareers.length} career{filteredCareers.length !== 1 ? 's' : ''} found
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCareers.map((career) => (
                    <motion.div
                      key={career.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="h-full hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                            onClick={() => setSelectedCareer(career)}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-primary-muted rounded-lg">
                                <career.icon className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{career.title}</CardTitle>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge 
                                    variant={career.demandColor as any}
                                    className="text-xs"
                                  >
                                    {career.demand} Demand
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <CardDescription className="mt-2">
                            {career.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div className="flex items-center space-x-2">
                                <DollarSign className="h-3 w-3 text-muted-foreground" />
                                <span>{career.salaryRange}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <TrendingUp className="h-3 w-3 text-muted-foreground" />
                                <span>{career.jobGrowth}</span>
                              </div>
                            </div>
                            
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Key Skills:</div>
                              <div className="flex flex-wrap gap-1">
                                {career.skills.slice(0, 3).map((skill, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                                {career.skills.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{career.skills.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {filteredCareers.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-muted-foreground">
                      <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">No careers found matching your criteria</p>
                      <p className="text-sm">Try adjusting your search or category filter</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Career Detail View */
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Back Button */}
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedCareer(null)}
                  className="mb-4"
                >
                  ← Back to Careers
                </Button>

                {/* Career Header */}
                <Card className="border-0 shadow-elegant">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-primary rounded-lg">
                          <selectedCareer.icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h1 className="text-3xl font-bold">{selectedCareer.title}</h1>
                          <p className="text-lg text-muted-foreground mt-1">{selectedCareer.description}</p>
                          <div className="flex items-center space-x-4 mt-3">
                            <Badge variant={selectedCareer.demandColor as any}>
                              {selectedCareer.demand} Demand
                            </Badge>
                            <div className="flex items-center space-x-1 text-sm">
                              <TrendingUp className="h-4 w-4 text-secondary" />
                              <span>{selectedCareer.jobGrowth} growth</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Career Details Tabs */}
                <Tabs defaultValue="overview" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="growth">Growth</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Quick Facts */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Quick Facts</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Salary Range</span>
                              </div>
                              <p className="text-lg font-bold">{selectedCareer.salaryRange}</p>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Experience</span>
                              </div>
                              <p className="text-lg font-bold">{selectedCareer.experience}</p>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Work Environment</span>
                              </div>
                              <p className="text-lg font-bold">{selectedCareer.workEnvironment}</p>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <Brain className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Personality Fit</span>
                              </div>
                              <p className="text-sm">{selectedCareer.personalityFit}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Skills Required */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Key Skills Required</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {selectedCareer.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Day in the Life */}
                    <Card>
                      <CardHeader>
                        <CardTitle>A Day in the Life</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedCareer.dayInLife.map((activity, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-primary-muted rounded-full flex items-center justify-center text-xs font-bold text-primary">
                                {index + 1}
                              </div>
                              <p className="text-sm">{activity}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="education" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Education Requirements */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <GraduationCap className="h-5 w-5" />
                            <span>Education Requirements</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Minimum Education:</h4>
                            <p className="text-sm bg-primary-muted p-3 rounded-lg">{selectedCareer.education}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Entrance Exams:</h4>
                            <div className="space-y-2">
                              {selectedCareer.examRequired.map((exam, index) => (
                                <Badge key={index} variant="outline">
                                  {exam}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Top Colleges */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Top Colleges</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {selectedCareer.topColleges.map((college, index) => (
                              <div key={index} className="flex items-center space-x-3 p-2 border rounded-lg">
                                <div className="w-6 h-6 bg-secondary-muted rounded-full flex items-center justify-center text-xs font-bold text-secondary">
                                  {index + 1}
                                </div>
                                <span className="font-medium">{college}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Scholarships */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Award className="h-5 w-5" />
                          <span>Scholarships & Financial Aid</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {selectedCareer.scholarships.map((scholarship, index) => (
                            <div key={index} className="p-3 border rounded-lg">
                              <h4 className="font-medium text-sm">{scholarship}</h4>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="growth" className="space-y-6">
                    {/* Career Progression */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Career Progression Path</CardTitle>
                        <CardDescription>Typical career advancement timeline</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedCareer.careerProgression.map((stage, index) => (
                            <div key={index} className="flex items-start space-x-4">
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                                  {index + 1}
                                </div>
                                {index < selectedCareer.careerProgression.length - 1 && (
                                  <div className="w-0.5 h-8 bg-border mt-2"></div>
                                )}
                              </div>
                              <div className="flex-1 pb-4">
                                <h4 className="font-medium">{stage}</h4>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Future Scope */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Zap className="h-5 w-5" />
                          <span>Future Scope & Trends</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{selectedCareer.futureScope}</p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="resources" className="space-y-6">
                    {/* Recommended Courses */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Recommended Courses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {selectedCareer.courses.map((course, index) => (
                            <div key={index} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                              <h4 className="font-medium">{course}</h4>
                              <p className="text-xs text-muted-foreground mt-1">Online Course</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button variant="hero" size="lg" onClick={() => navigate("/test")}>
                        Take Aptitude Test
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                      <Button variant="outline" size="lg">
                        Book Career Counseling
                      </Button>
                      <Button variant="outline" size="lg">
                        Download Career Guide
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPaths;