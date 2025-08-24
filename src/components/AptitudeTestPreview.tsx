import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Clock, Target, CheckCircle, ArrowRight } from "lucide-react";

const sampleQuestions = [
  {
    id: 1,
    type: "personality",
    question: "When working on a group project, you prefer to:",
    options: [
      "Take the lead and organize the team",
      "Contribute ideas and support others",
      "Focus on specific tasks independently",
      "Ensure everyone's opinions are heard"
    ]
  },
  {
    id: 2,
    type: "aptitude",
    question: "If a sequence goes 2, 6, 12, 20, 30, what comes next?",
    options: ["40", "42", "44", "46"]
  },
  {
    id: 3,
    type: "interest",
    question: "Which activity interests you most?",
    options: [
      "Conducting scientific experiments",
      "Creating artistic designs",
      "Solving complex mathematical problems",
      "Helping people with their problems"
    ]
  }
];

export const AptitudeTestPreview = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

  if (showResults) {
    return (
      <Card className="p-8 max-w-2xl mx-auto">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-2">Sample Assessment Complete!</h3>
            <p className="text-muted-foreground">
              This was just a preview. The full assessment includes 50+ questions covering:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-left">
            <div className="bg-primary-muted p-4 rounded-lg">
              <Brain className="h-6 w-6 text-primary mb-2" />
              <div className="font-medium text-primary">Personality Analysis</div>
              <div className="text-sm text-muted-foreground">MBTI-style assessment</div>
            </div>
            <div className="bg-secondary-muted p-4 rounded-lg">
              <Target className="h-6 w-6 text-secondary mb-2" />
              <div className="font-medium text-secondary">Aptitude Testing</div>
              <div className="text-sm text-muted-foreground">Logical & analytical skills</div>
            </div>
            <div className="bg-accent-muted p-4 rounded-lg">
              <Clock className="h-6 w-6 text-accent mb-2" />
              <div className="font-medium text-accent">Interest Mapping</div>
              <div className="text-sm text-muted-foreground">Career preferences</div>
            </div>
          </div>

          <Button variant="hero" size="lg" className="group">
            Take Full Assessment
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </Card>
    );
  }

  const question = sampleQuestions[currentQuestion];

  return (
    <Card className="p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-muted-foreground">
            Question {currentQuestion + 1} of {sampleQuestions.length}
          </div>
          <div className="text-sm font-medium text-primary">
            Sample Assessment
          </div>
        </div>
        
        <Progress value={progress} className="mb-4" />
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Brain className="h-4 w-4" />
          <span className="capitalize">{question.type} Question</span>
        </div>
      </div>

      {/* Question */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold leading-relaxed">
          {question.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(question.id, index)}
              className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                selectedAnswers[question.id] === index
                  ? 'border-primary bg-primary-muted text-primary shadow-card'
                  : 'border-border hover:border-primary/50 hover:bg-accent/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswers[question.id] === index
                    ? 'border-primary bg-primary'
                    : 'border-border'
                }`}>
                  {selectedAnswers[question.id] === index && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Next Button */}
        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleNext}
            disabled={selectedAnswers[question.id] === undefined}
            variant="default"
            className="group"
          >
            {currentQuestion < sampleQuestions.length - 1 ? 'Next Question' : 'View Results'}
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </Card>
  );
};