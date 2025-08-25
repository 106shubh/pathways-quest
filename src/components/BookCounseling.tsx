import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { 
  Calendar as CalendarIcon,
  Clock,
  Video,
  Phone,
  MessageSquare,
  User,
  Star,
  Award,
  CheckCircle,
  ArrowRight,
  Target,
  BookOpen,
  GraduationCap
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface BookCounselingProps {
  onClose?: () => void;
}

const BookCounseling = ({ onClose }: BookCounselingProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCounselor, setSelectedCounselor] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    concerns: "",
    preferences: ""
  });
  const [step, setStep] = useState<'counselor' | 'datetime' | 'details' | 'confirmation'>('counselor');
  
  const { toast } = useToast();

  const counselors = [
    {
      id: "dr-sharma",
      name: "Dr. Priya Sharma",
      specialty: "Career Psychology",
      experience: "15+ years",
      rating: 4.9,
      avatar: "👩‍⚕️",
      description: "Specializes in career transitions and academic planning for STEM fields",
      availableSlots: ["09:00", "11:00", "14:00", "16:00"],
      languages: ["English", "Hindi"],
      price: "₹1,500"
    },
    {
      id: "prof-kumar",
      name: "Prof. Raj Kumar",
      specialty: "Educational Guidance",
      experience: "20+ years",
      rating: 4.8,
      avatar: "👨‍🏫",
      description: "Expert in engineering and technology career paths, former IIT professor",
      availableSlots: ["10:00", "13:00", "15:00", "17:00"],
      languages: ["English", "Hindi", "Tamil"],
      price: "₹2,000"
    },
    {
      id: "dr-patel",
      name: "Dr. Anjali Patel",
      specialty: "Creative Arts Counseling",
      experience: "12+ years",
      rating: 4.7,
      avatar: "👩‍🎨",
      description: "Focuses on creative fields, design, and media career guidance",
      availableSlots: ["11:00", "14:00", "16:00", "18:00"],
      languages: ["English", "Hindi", "Gujarati"],
      price: "₹1,200"
    }
  ];

  const sessionTypes = [
    {
      id: "career-exploration",
      title: "Career Exploration",
      description: "Discover career options based on your interests and strengths",
      duration: "60 minutes",
      icon: Target
    },
    {
      id: "academic-planning",
      title: "Academic Planning",
      description: "Plan your subjects and entrance exam preparation strategy",
      duration: "45 minutes",
      icon: BookOpen
    },
    {
      id: "skill-development",
      title: "Skill Development",
      description: "Identify and develop skills for your chosen career path",
      duration: "45 minutes",
      icon: Award
    },
    {
      id: "college-selection",
      title: "College Selection",
      description: "Choose the right colleges and courses for your goals",
      duration: "60 minutes",
      icon: GraduationCap
    }
  ];

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const handleBooking = () => {
    const selectedCounselorData = counselors.find(c => c.id === selectedCounselor);
    
    toast({
      title: "Booking Confirmed!",
      description: `Your session with ${selectedCounselorData?.name} is scheduled for ${selectedDate ? format(selectedDate, 'PPP') : ''} at ${selectedTime}`,
    });
    
    setStep('confirmation');
  };

  const renderCounselorSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">Choose Your Counselor</h3>
        <p className="text-muted-foreground">Select a counselor based on your needs and preferences</p>
      </div>
      
      <div className="space-y-4">
        {counselors.map((counselor) => (
          <motion.div
            key={counselor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className={`cursor-pointer transition-all ${
                selectedCounselor === counselor.id 
                  ? 'ring-2 ring-primary shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedCounselor(counselor.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{counselor.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{counselor.name}</h4>
                        <p className="text-primary font-medium">{counselor.specialty}</p>
                        <p className="text-sm text-muted-foreground mt-1">{counselor.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{counselor.price}</div>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="h-4 w-4 fill-warning text-warning" />
                          <span className="text-sm font-medium">{counselor.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-3">
                      <Badge variant="secondary">{counselor.experience}</Badge>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-muted-foreground">Languages:</span>
                        <span className="text-sm">{counselor.languages.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <Button 
        onClick={() => setStep('datetime')} 
        disabled={!selectedCounselor}
        className="w-full"
        variant="hero"
      >
        Continue <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );

  const renderDateTimeSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">Select Date & Time</h3>
        <p className="text-muted-foreground">Choose your preferred date and time slot</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="text-base font-medium">Select Date</Label>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date() || date.getDay() === 0}
            className="rounded-md border mt-2"
          />
        </div>
        
        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">Session Type</Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Choose session type" />
              </SelectTrigger>
              <SelectContent>
                {sessionTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    <div>
                      <div className="font-medium">{type.title}</div>
                      <div className="text-sm text-muted-foreground">{type.duration}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-base font-medium">Available Time Slots</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {counselors.find(c => c.id === selectedCounselor)?.availableSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTime(time)}
                  className="justify-center"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-3">
        <Button variant="outline" onClick={() => setStep('counselor')} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={() => setStep('details')} 
          disabled={!selectedDate || !selectedTime || !selectedType}
          className="flex-1"
          variant="hero"
        >
          Continue <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderDetailsForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">Your Details</h3>
        <p className="text-muted-foreground">Help us prepare for your session</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Enter your email"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          placeholder="Enter your phone number"
        />
      </div>
      
      <div>
        <Label htmlFor="concerns">Main Concerns/Questions</Label>
        <Textarea
          id="concerns"
          value={formData.concerns}
          onChange={(e) => setFormData(prev => ({ ...prev, concerns: e.target.value }))}
          placeholder="What specific areas would you like to discuss?"
          rows={3}
        />
      </div>
      
      <div>
        <Label htmlFor="preferences">Additional Preferences</Label>
        <Textarea
          id="preferences"
          value={formData.preferences}
          onChange={(e) => setFormData(prev => ({ ...prev, preferences: e.target.value }))}
          placeholder="Any specific preferences or requirements?"
          rows={2}
        />
      </div>
      
      <div className="flex space-x-3">
        <Button variant="outline" onClick={() => setStep('datetime')} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={handleBooking}
          disabled={!formData.name || !formData.email || !formData.phone}
          className="flex-1"
          variant="hero"
        >
          Book Session
        </Button>
      </div>
    </div>
  );

  const renderConfirmation = () => {
    const selectedCounselorData = counselors.find(c => c.id === selectedCounselor);
    const selectedSessionData = sessionTypes.find(t => t.id === selectedType);
    
    return (
      <div className="space-y-6 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-secondary">Booking Confirmed!</h3>
        <p className="text-muted-foreground">Your counseling session has been successfully booked</p>
        
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Counselor:</span>
                <span className="font-medium">{selectedCounselorData?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Session Type:</span>
                <span className="font-medium">{selectedSessionData?.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{selectedDate ? format(selectedDate, 'PPP') : ''}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium">{selectedSessionData?.duration}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="text-sm">
            <CheckCircle className="h-4 w-4 inline mr-2 text-secondary" />
            A confirmation email has been sent to {formData.email}
          </p>
        </div>
        
        <Button onClick={onClose} variant="hero" className="w-full">
          Done
        </Button>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-6 w-6" />
          <span>Book Career Counseling</span>
        </CardTitle>
        <CardDescription>
          Connect with expert career counselors for personalized guidance
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 'counselor' && renderCounselorSelection()}
        {step === 'datetime' && renderDateTimeSelection()}
        {step === 'details' && renderDetailsForm()}
        {step === 'confirmation' && renderConfirmation()}
      </CardContent>
    </Card>
  );
};

export default BookCounseling;