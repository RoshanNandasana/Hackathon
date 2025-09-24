import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MessageCircle, Calendar, Send, AlertCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

// Interface Definitions
interface FeedbackQuestion {
  id: string;
  question: string;
  type: "text" | "radio" | "slider" | "switch" | "select" | "textarea" | "rating";
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

interface PanchakarmaFeedback {
  sessionId: string;
  patientName: string;
  practitioner: string;
  therapy: string;
  date: string;
  rating: string;
  relief: string;
  sideEffects: string;
  agni: string;
  aharaVihara: string;
  satisfaction: string;
  comment: string;
  status: "submitted" | "draft";
  doctorResponse?: string;
  prescriptionChanges?: string; // New field for prescription changes
  customAnswers?: { [key: string]: any };
}

// Initial Data
const initialFeedback: PanchakarmaFeedback[] = [
  {
    sessionId: "1",
    patientName: "Rajesh Kumar",
    practitioner: "Dr. Suresh Kumar",
    therapy: "Shirodhara",
    date: "Sep 22, 2025, 10:00 AM",
    rating: "Excellent",
    relief: "Significant – felt very light and clear-headed.",
    sideEffects: "No",
    agni: "Good – digestion improved compared to last week.",
    aharaVihara: "Fully – followed diet instructions strictly.",
    satisfaction: "Excellent",
    comment: "Session was very smooth and relaxing.",
    status: "submitted",
    doctorResponse: "Glad to hear! Continue with the prescribed diet.",
    prescriptionChanges: "Increased warm water intake to 2 liters daily.",
  },
  {
    sessionId: "2",
    patientName: "Neha Patel",
    practitioner: "Dr. Rekha Sharma",
    therapy: "Abhyanga",
    date: "Sep 17, 2025, 2:00 PM",
    rating: "Good",
    relief: "Slight – mild relaxation but still some stiffness in joints.",
    sideEffects: "Yes – mild nausea after Vamana.",
    agni: "Moderate – appetite is okay but not stable yet.",
    aharaVihara: "Partially – missed evening rest once.",
    satisfaction: "Good",
    comment: "Great treatment, felt much better.",
    status: "submitted",
    doctorResponse: "Noted. Adjust evening rest schedule and monitor nausea.",
    prescriptionChanges: "Added Triphala churna 1 tsp at bedtime.",
  },
  {
    sessionId: "3",
    patientName: "Deepak Shah",
    practitioner: "Dr. Suresh Kumar",
    therapy: "Udvartana",
    date: "Sep 21, 2025, 11:00 AM",
    rating: "Excellent",
    relief: "No change noticed immediately, but feeling calmer overall.",
    sideEffects: "No – session went smoothly without discomfort.",
    agni: "Excellent – digestion feels much stronger after Basti cycle.",
    aharaVihara: "Fully – following all Ahara and Vihara recommendations.",
    satisfaction: "Excellent",
    comment: "Excellent treatment, fully recommended!",
    status: "submitted",
    doctorResponse: "Great progress! Maintain the current regimen.",
    prescriptionChanges: "None",
  },
  {
    sessionId: "4",
    patientName: "Priya Singh",
    practitioner: "Dr. Vikram Singh",
    therapy: "Virechana",
    date: "Sep 19, 2025, 9:00 AM",
    rating: "Good",
    relief: "Moderate relief from digestive issues",
    sideEffects: "Mild cramps",
    agni: "Improved",
    aharaVihara: "Fully",
    satisfaction: "Good",
    comment: "Good cleansing effect",
    status: "submitted",
    doctorResponse: "Cramps noted. Increase hydration and consult if persists.",
    prescriptionChanges: "Increase hydration to 3 liters daily.",
  },
  {
    sessionId: "5",
    patientName: "Amit Patel",
    practitioner: "Dr. Anjali Reddy",
    therapy: "Basti",
    date: "Sep 16, 2025, 3:00 PM",
    rating: "Excellent",
    relief: "Significant relief from joint pain",
    sideEffects: "None",
    agni: "Balanced",
    aharaVihara: "Fully",
    satisfaction: "Excellent",
    comment: "Highly effective for Vata disorders",
    status: "submitted",
    doctorResponse: "Excellent! Continue therapy as planned.",
    prescriptionChanges: "None",
  },
];

const upcomingSession = {
  sessionId: "6",
  therapy: "Shirodhara",
  date: "Sep 25, 2025, 2:00 PM",
  practitioner: "Dr. Suresh Kumar",
};

const feedbackStats = {
  averageRating: "Good",
  totalSessions: 8,
  completedFeedbacks: 6,
};

const PostSessionFeedback = () => {
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState<PanchakarmaFeedback | null>(null);
  const [feedbackHistory, setFeedbackHistory] = useState<PanchakarmaFeedback[]>(initialFeedback);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [activeTab, setActiveTab] = useState("feedback");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [panchakarmaStage, setPanchakarmaStage] = useState("Purvakarma");
  const [customQuestions, setCustomQuestions] = useState<FeedbackQuestion[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});

  // Generate Custom Questions Based on Panchakarma Stage
  useEffect(() => {
    generateCustomQuestions(panchakarmaStage);
  }, [panchakarmaStage]);

  const generateCustomQuestions = (stage: string) => {
    let questions: FeedbackQuestion[] = [
      {
        id: "relief",
        question: "How much relief did you experience from your symptoms?",
        type: "select",
        options: ["Significant", "Moderate", "Slight", "None"],
      },
      {
        id: "sideEffects",
        question: "Did you experience any side effects?",
        type: "radio",
        options: ["Yes", "No"],
      },
      {
        id: "agni",
        question: "How would you describe your Agni (digestive fire) after the session?",
        type: "select",
        options: ["Excellent", "Good", "Moderate", "Poor"],
      },
      {
        id: "aharaVihara",
        question: "Did you comply with Ahara-Vihara (diet and lifestyle) recommendations?",
        type: "select",
        options: ["Fully", "Partially", "Not at all"],
      },
      {
        id: "rating",
        question: "How would you rate the overall session?",
        type: "select",
        options: ["Excellent", "Good", "Fair", "Poor"],
      },
      {
        id: "satisfaction",
        question: "How satisfied are you with the session?",
        type: "select",
        options: ["Excellent", "Good", "Fair", "Poor"],
      },
      {
        id: "sleepQuality",
        question: "How has your sleep quality been since the last session?",
        type: "select",
        options: ["Excellent", "Good", "Average", "Poor"],
      },
      {
        id: "energyLevel",
        question: "How would you rate your energy level post-session?",
        type: "select",
        options: ["Excellent", "Good", "Average", "Poor"],
      },
      {
        id: "mood",
        question: "How would you describe your mood after the session?",
        type: "select",
        options: ["Happy", "Neutral", "Anxious", "Depressed"],
      },
      {
        id: "appetiteChange",
        question: "Has your appetite changed after the session?",
        type: "select",
        options: ["Increased", "Decreased", "No Change"],
      },
      {
        id: "bowelRegularity",
        question: "How regular are your bowel movements post-therapy?",
        type: "select",
        options: ["Daily", "Every other day", "Irregular"],
      },
      {
        id: "urineObservation",
        question: "What is the color or clarity of your urine?",
        type: "select",
        options: ["Clear", "Yellow", "Dark Yellow", "Other"],
      },
      {
        id: "skinHealth",
        question: "Have you noticed any changes in your skin health?",
        type: "textarea",
      },
      {
        id: "jointComfort",
        question: "Have you experienced any improvement in joint comfort?",
        type: "select",
        options: ["Significant", "Moderate", "Slight", "None"],
      },
      {
        id: "headachePresence",
        question: "Did you experience headaches after the session?",
        type: "radio",
        options: ["Yes", "No"],
      },
      {
        id: "fatigueLevel",
        question: "How would you rate your fatigue level?",
        type: "select",
        options: ["None", "Mild", "Moderate", "Severe"],
      },
    ];

    // Add stage-specific questions
    if (stage === "Purvakarma") {
      questions.push(
        {
          id: "oilEffectiveness",
          question: "How effective was the oil application during Snehana?",
          type: "select",
          options: ["Very Effective", "Effective", "Neutral", "Ineffective"],
        },
        {
          id: "sweatExperience",
          question: "Did you experience adequate sweating during Swedana?",
          type: "radio",
          options: ["Yes", "No"],
        },
      );
    } else if (stage === "Pradhanakarma") {
      questions.push(
        {
          id: "vamanaFeedback",
          question: "How did you feel after the Vamana process?",
          type: "textarea",
        },
        {
          id: "virechanaOutcome",
          question: "What was the outcome of the Virechana therapy?",
          type: "select",
          options: ["Effective", "Partially Effective", "Ineffective"],
        },
      );
    } else if (stage === "Paschatkarma") {
      questions.push(
        {
          id: "dietAdherence",
          question: "How well did you adhere to the post-therapy diet?",
          type: "select",
          options: ["Fully", "Partially", "Not at all"],
        },
        {
          id: "rejuvenationFeeling",
          question: "How rejuvenated do you feel after Paschatkarma?",
          type: "select",
          options: ["Very Rejuvenated", "Moderately", "Slightly", "Not at all"],
        },
      );
    }

    setCustomQuestions(questions);
  };

  const handleAnswerChange = (id: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const submitFeedback = async () => {
    if (
      !answers.relief ||
      !answers.agni ||
      !answers.aharaVihara ||
      !answers.rating ||
      !answers.satisfaction
    ) {
      setAlertType("error");
      setAlertMessage("Please fill all required fields.");
      setShowAlert(true);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

      const newFeedback: PanchakarmaFeedback = {
        sessionId: `session-${Date.now()}`,
        patientName: "Current Patient", // Replace with actual user data
        practitioner: upcomingSession.practitioner,
        therapy: upcomingSession.therapy,
        date: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
        rating: answers.rating,
        relief: answers.relief,
        sideEffects: answers.sideEffects || "No",
        agni: answers.agni,
        aharaVihara: answers.aharaVihara,
        satisfaction: answers.satisfaction,
        comment: feedback,
        status: "submitted",
        customAnswers: { ...answers },
      };

      setSubmittedFeedback(newFeedback);
      setFeedbackHistory((prev) => [...prev, newFeedback]);
      setRating("");
      setFeedback("");
      setAnswers({});
      setAlertType("success");
      setAlertMessage("Feedback submitted successfully!");
      setShowAlert(true);
    } catch (err) {
      setError("Failed to submit feedback. Please try again.");
      setAlertType("error");
      setAlertMessage("Submission failed. Please try again.");
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveAsDraft = () => {
    const draft: PanchakarmaFeedback = {
      sessionId: `draft-${Date.now()}`,
      patientName: "Current Patient",
      practitioner: upcomingSession.practitioner,
      therapy: upcomingSession.therapy,
      date: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
      rating: answers.rating || "",
      relief: answers.relief || "",
      sideEffects: answers.sideEffects || "",
      agni: answers.agni || "",
      aharaVihara: answers.aharaVihara || "",
      satisfaction: answers.satisfaction || "",
      comment: feedback,
      status: "draft",
      customAnswers: { ...answers },
    };
    setFeedbackHistory((prev) => [...prev, draft]);
    setRating("");
    setFeedback("");
    setAnswers({});
    setAlertType("success");
    setAlertMessage("Feedback saved as draft.");
    setShowAlert(true);
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Post-Session Feedback</h1>
          <p className="text-muted-foreground">Share your Panchakarma therapy experience</p>
          <p className="text-sm text-muted-foreground">
            Last updated: Wednesday, September 24, 2025, 05:00 PM IST
          </p>
        </div>
      </div>

      {/* Tabs for Feedback, History, and Stats */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="feedback">Submit Feedback</TabsTrigger>
          <TabsTrigger value="history">Feedback History</TabsTrigger>
          <TabsTrigger value="stats">Feedback Stats</TabsTrigger>
        </TabsList>

        {/* Feedback Submission Tab */}
        <TabsContent value="feedback">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Rate Your Session</CardTitle>
              <CardDescription>
                {upcomingSession.therapy} with {upcomingSession.practitioner} - {upcomingSession.date}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>How would you rate this session?</Label>
                <Select value={rating} onValueChange={setRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Excellent">Excellent</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {customQuestions.map((q) => (
                <div key={q.id} className="space-y-2">
                  <Label>{q.question}</Label>
                  {q.type === "textarea" && (
                    <Textarea
                      value={answers[q.id] || ""}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      placeholder={`Enter your ${q.question.toLowerCase()}...`}
                      rows={4}
                    />
                  )}
                  {q.type === "radio" && q.options && (
                    <RadioGroup
                      value={answers[q.id] || ""}
                      onValueChange={(value) => handleAnswerChange(q.id, value)}
                      className="space-y-2"
                    >
                      {q.options.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                          <Label htmlFor={`${q.id}-${option}`}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                  {q.type === "select" && q.options && (
                    <Select
                      value={answers[q.id] || ""}
                      onValueChange={(value) => handleAnswerChange(q.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {q.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {q.type === "slider" && (
                    <Slider
                      min={q.min || 0}
                      max={q.max || 100}
                      step={q.step || 1}
                      value={[answers[q.id] || q.min || 0]}
                      onValueChange={(value) => handleAnswerChange(q.id, value[0])}
                    />
                  )}
                  {q.type === "switch" && (
                    <Switch
                      checked={answers[q.id] || false}
                      onCheckedChange={(checked) => handleAnswerChange(q.id, checked)}
                    />
                  )}
                </div>
              ))}

              <div className="space-y-3">
                <Label htmlFor="comment">Additional Comments</Label>
                <Textarea
                  id="comment"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us about your therapy session..."
                  rows={4}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  className="gap-2"
                  disabled={isSubmitting || !rating}
                  onClick={submitFeedback}
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </Button>
                <Button
                  variant="outline"
                  disabled={isSubmitting}
                  onClick={saveAsDraft}
                >
                  Save as Draft
                </Button>
              </div>

              {showAlert && (
                <Alert variant={alertType === "success" ? "default" : "destructive"}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{alertType === "success" ? "Success" : "Error"}</AlertTitle>
                  <AlertDescription>{alertMessage}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback History Tab */}
        <TabsContent value="history">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Your Previous Feedback</CardTitle>
              <CardDescription>View your therapy session experiences</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Therapy</TableHead>
                    <TableHead>Practitioner</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Satisfaction</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Doctor Response</TableHead>
                    <TableHead>Prescription Changes</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feedbackHistory.map((item) => (
                    <TableRow key={item.sessionId}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.therapy}</TableCell>
                      <TableCell>{item.practitioner}</TableCell>
                      <TableCell>{item.rating}</TableCell>
                      <TableCell>{item.satisfaction}</TableCell>
                      <TableCell>{item.comment}</TableCell>
                      <TableCell>{item.doctorResponse || "Pending"}</TableCell>
                      <TableCell>{item.prescriptionChanges || "None"}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === "submitted" ? "default" : "secondary"}>
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Stats Tab */}
        <TabsContent value="stats">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Feedback Statistics</CardTitle>
                <CardDescription>Overview of your feedback history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-400 rounded-lg p-4">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{feedbackStats.averageRating}</p>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500 rounded-lg p-4">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{feedbackStats.totalSessions}</p>
                    <p className="text-sm text-muted-foreground">Total Sessions</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-green-500 rounded-lg p-4">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {Math.round((feedbackStats.completedFeedbacks / feedbackStats.totalSessions) * 100)}%
                    </p>
                    <p className="text-sm text-muted-foreground">Feedback Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Patient Progress */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle>Patient Progress</CardTitle>
          <CardDescription>Track your Panchakarma journey</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={50} className="w-full" />
          <p className="text-sm text-muted-foreground">
            Sessions completed: 5 of 10
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostSessionFeedback;