import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  Target, 
  BookOpen, 
  TrendingUp, 
  Star, 
  Clock, 
  Award,
  User,
  BarChart3,
  Calendar,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  GraduationCap
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import BookCounseling from "@/components/BookCounseling";
import UserProfile from "@/components/UserProfile";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showCounseling, setShowCounseling] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
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

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        description: "Come back soon to continue your career journey!",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Sample data - in real app this would come from your database
  const studentData = {
    name: user?.user_metadata?.name || "Student",
    class: "Class 11",
    stream: "Science",
    completedTests: 2,
    totalTests: 5,
    careerMatches: [
      { title: "Software Engineer", match: 92, trend: "up" },
      { title: "Data Scientist", match: 87, trend: "up" },
      { title: "Biomedical Engineer", match: 82, trend: "stable" }
    ],
    recentActivities: [
      { title: "Completed Aptitude Test", date: "2 days ago", status: "completed" },
      { title: "Explored Engineering Pathways", date: "1 week ago", status: "completed" },
      { title: "Logical Reasoning Test", date: "Pending", status: "pending" }
    ],
    nextSteps: [
      { title: "Complete Personality Assessment", urgent: true },
      { title: "Explore JEE Preparation Guide", urgent: false },
      { title: "Book Career Counseling Session", urgent: false }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} userRole="student" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {studentData.name}! 👋
              </h1>
              <p className="text-muted-foreground mt-2">
                {studentData.class} • {studentData.stream} Stream • Ready to explore your future?
              </p>
            </div>
            <div className="flex space-x-2">
              <Dialog open={showProfile} onOpenChange={setShowProfile}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <UserProfile user={user} onClose={() => setShowProfile(false)} />
                </DialogContent>
              </Dialog>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary-muted rounded-lg">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tests Completed</p>
                  <p className="text-2xl font-bold">{studentData.completedTests}/{studentData.totalTests}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-secondary-muted rounded-lg">
                  <Target className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Career Matches</p>
                  <p className="text-2xl font-bold">{studentData.careerMatches.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-accent-muted rounded-lg">
                  <Award className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Top Match</p>
                  <p className="text-2xl font-bold">{studentData.careerMatches[0]?.match}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-warning-muted rounded-lg">
                  <TrendingUp className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <p className="text-2xl font-bold">{Math.round((studentData.completedTests / studentData.totalTests) * 100)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Assessment Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Assessment Progress</span>
                </CardTitle>
                <CardDescription>
                  Complete all assessments to get personalized career recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {studentData.completedTests}/{studentData.totalTests} completed
                    </span>
                  </div>
                  <Progress value={(studentData.completedTests / studentData.totalTests) * 100} className="h-2" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-secondary" />
                      <span className="text-sm">Aptitude Test</span>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-secondary" />
                      <span className="text-sm">Interest Assessment</span>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-warning" />
                      <span className="text-sm">Personality Test</span>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-warning" />
                      <span className="text-sm">Logical Reasoning</span>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-warning" />
                      <span className="text-sm">Career Values</span>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                  </div>
                </div>

                <Button onClick={() => navigate("/test")} className="w-full" variant="hero">
                  Continue Assessment <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Career Matches */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Your Top Career Matches</span>
                </CardTitle>
                <CardDescription>
                  Based on your completed assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentData.careerMatches.map((career, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary-muted text-primary rounded-full text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{career.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-muted-foreground">{career.match}% match</span>
                            <TrendingUp className={`h-3 w-3 ${career.trend === 'up' ? 'text-secondary' : 'text-muted-foreground'}`} />
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => navigate("/careers")}>
                        Explore <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4" onClick={() => navigate("/careers")}>
                  View All Career Pathways
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Next Steps</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentData.nextSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${step.urgent ? 'bg-warning' : 'bg-muted-foreground'}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{step.title}</p>
                        {step.urgent && (
                          <Badge variant="outline" className="mt-1 text-xs">
                            Recommended
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentData.recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.status === 'completed' ? 'bg-secondary' : 'bg-warning'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/test")}>
                  <Brain className="h-4 w-4 mr-2" />
                  Take Assessment
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/careers")}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Explore Careers
                </Button>
                <Dialog open={showCounseling} onOpenChange={setShowCounseling}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <User className="h-4 w-4 mr-2" />
                      Book Counseling
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <BookCounseling onClose={() => setShowCounseling(false)} />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;