import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { 
  User,
  Settings,
  Bell,
  Shield,
  Download,
  Upload,
  Eye,
  EyeOff,
  Save,
  Edit3,
  Calendar,
  MapPin,
  Phone,
  Mail,
  BookOpen,
  Target,
  Award,
  TrendingUp
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UserProfileProps {
  user: any;
  onClose?: () => void;
}

const UserProfile = ({ user, onClose }: UserProfileProps) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.user_metadata?.name || "",
    email: user?.email || "",
    phone: "",
    dateOfBirth: "",
    class: "",
    stream: "",
    school: "",
    city: "",
    state: "",
    interests: [] as string[],
    bio: "",
    goals: ""
  });
  
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    careerAlerts: true,
    language: "en",
    theme: "system"
  });

  const [testResults, setTestResults] = useState([
    {
      id: 1,
      name: "Career Aptitude Assessment",
      date: "2024-01-15",
      status: "Completed",
      score: 85,
      categories: {
        logical: 78,
        quantitative: 92,
        verbal: 80,
        spatial: 90
      }
    },
    {
      id: 2,
      name: "Personality Assessment",
      date: "2024-01-10",
      status: "Completed", 
      score: 88,
      categories: {
        analytical: 85,
        creative: 90,
        social: 80,
        technical: 95
      }
    }
  ]);

  const { toast } = useToast();

  const classOptions = [
    "Class 9", "Class 10", "Class 11", "Class 12", "Undergraduate", "Postgraduate"
  ];

  const streamOptions = [
    "Science (PCM)", "Science (PCB)", "Commerce", "Humanities", "Arts", "Vocational"
  ];

  const stateOptions = [
    "Andhra Pradesh", "Assam", "Bihar", "Delhi", "Gujarat", "Karnataka", 
    "Kerala", "Maharashtra", "Punjab", "Rajasthan", "Tamil Nadu", "Uttar Pradesh",
    "West Bengal", "Other"
  ];

  const interestOptions = [
    "Technology", "Medicine", "Engineering", "Arts", "Sports", "Music",
    "Business", "Science", "Literature", "Social Work", "Environment", "Design"
  ];

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // Here you would typically save to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Preferences Updated",
        description: "Your preferences have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to update preferences.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadTestReport = (testId: number) => {
    toast({
      title: "Downloading Report",
      description: "Your test report will be downloaded shortly.",
    });
  };

  const toggleInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-6 w-6" />
            <span>User Profile</span>
          </CardTitle>
          <CardDescription>
            Manage your personal information and account settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="results">Test Results</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={profile.dateOfBirth}
                      onChange={(e) => setProfile(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profile.city}
                      onChange={(e) => setProfile(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Enter your city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select value={profile.state} onValueChange={(value) => setProfile(prev => ({ ...prev, state: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        {stateOptions.map((state) => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself"
                    rows={3}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Interests</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {interestOptions.map((interest) => (
                    <Button
                      key={interest}
                      variant={profile.interests.includes(interest) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleInterest(interest)}
                      className="justify-start"
                    >
                      {interest}
                    </Button>
                  ))}
                </div>
              </div>

              <Button onClick={handleSaveProfile} disabled={loading} className="w-full" variant="hero">
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Saving..." : "Save Profile"}
              </Button>
            </TabsContent>

            <TabsContent value="academic" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Academic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="class">Current Class</Label>
                    <Select value={profile.class} onValueChange={(value) => setProfile(prev => ({ ...prev, class: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classOptions.map((cls) => (
                          <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="stream">Stream</Label>
                    <Select value={profile.stream} onValueChange={(value) => setProfile(prev => ({ ...prev, stream: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your stream" />
                      </SelectTrigger>
                      <SelectContent>
                        {streamOptions.map((stream) => (
                          <SelectItem key={stream} value={stream}>{stream}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="school">School/College</Label>
                  <Input
                    id="school"
                    value={profile.school}
                    onChange={(e) => setProfile(prev => ({ ...prev, school: e.target.value }))}
                    placeholder="Enter your school/college name"
                  />
                </div>

                <div>
                  <Label htmlFor="goals">Career Goals</Label>
                  <Textarea
                    id="goals"
                    value={profile.goals}
                    onChange={(e) => setProfile(prev => ({ ...prev, goals: e.target.value }))}
                    placeholder="What are your career aspirations?"
                    rows={3}
                  />
                </div>
              </div>

              <Button onClick={handleSaveProfile} disabled={loading} className="w-full" variant="hero">
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Saving..." : "Save Academic Info"}
              </Button>
            </TabsContent>

            <TabsContent value="results" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Test Results History</h3>
                
                {testResults.map((result) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-semibold text-lg">{result.name}</h4>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {result.date}
                              </span>
                              <Badge variant="secondary">{result.status}</Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">{result.score}%</div>
                            <div className="text-sm text-muted-foreground">Overall Score</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          {Object.entries(result.categories).map(([category, score]) => (
                            <div key={category} className="text-center">
                              <div className="text-lg font-semibold">{score}%</div>
                              <div className="text-xs text-muted-foreground capitalize">{category}</div>
                            </div>
                          ))}
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => downloadTestReport(result.id)}
                          className="w-full"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Report
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 mt-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={preferences.emailNotifications}
                        onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, emailNotifications: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive updates via SMS</p>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={preferences.smsNotifications}
                        onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, smsNotifications: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="weekly-reports">Weekly Reports</Label>
                        <p className="text-sm text-muted-foreground">Get weekly progress reports</p>
                      </div>
                      <Switch
                        id="weekly-reports"
                        checked={preferences.weeklyReports}
                        onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, weeklyReports: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="career-alerts">Career Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get notified about new career opportunities</p>
                      </div>
                      <Switch
                        id="career-alerts"
                        checked={preferences.careerAlerts}
                        onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, careerAlerts: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">App Preferences</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <Select value={preferences.language} onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                          <SelectItem value="ta">Tamil</SelectItem>
                          <SelectItem value="te">Telugu</SelectItem>
                          <SelectItem value="gu">Gujarati</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="theme">Theme</Label>
                      <Select value={preferences.theme} onValueChange={(value) => setPreferences(prev => ({ ...prev, theme: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleSavePreferences} disabled={loading} className="w-full" variant="hero">
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Saving..." : "Save Settings"}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;