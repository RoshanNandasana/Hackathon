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

// ---------- Types ----------
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
  prescriptionChanges?: string;
  customAnswers?: { [key: string]: any };
}

// ---------- Demo Data ----------
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

// ---------- Component ----------
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
  const [panchakarmaStage, setPanchakarmaStage] = useState("Purvakarma");
  const [customQuestions, setCustomQuestions] = useState<FeedbackQuestion[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});

  // Generate stage-specific questions
  useEffect(() => {
    generateCustomQuestions(panchakarmaStage);
  }, [panchakarmaStage]);

  const generateCustomQuestions = (stage: string) => {
    let questions: FeedbackQuestion[] = [
      { id: "relief", question: "How much relief did you experience?", type: "select", options: ["Significant", "Moderate", "Slight", "None"] },
      { id: "sideEffects", question: "Any side effects?", type: "radio", options: ["Yes", "No"] },
      { id: "agni", question: "How is your Agni (digestive fire)?", type: "select", options: ["Excellent", "Good", "Moderate", "Poor"] },
      { id: "aharaVihara", question: "Did you follow Ahara-Vihara recommendations?", type: "select", options: ["Fully", "Partially", "Not at all"] },
      { id: "rating", question: "Overall session rating?", type: "select", options: ["Excellent", "Good", "Fair", "Poor"] },
      { id: "satisfaction", question: "Overall satisfaction?", type: "select", options: ["Excellent", "Good", "Fair", "Poor"] },
    ];
    if (stage === "Purvakarma") {
      questions.push(
        { id: "oilEffectiveness", question: "Effectiveness of oil application?", type: "select", options: ["Very Effective", "Effective", "Neutral", "Ineffective"] },
        { id: "sweatExperience", question: "Adequate sweating during Swedana?", type: "radio", options: ["Yes", "No"] }
      );
    }
    setCustomQuestions(questions);
  };

  const handleAnswerChange = (id: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const submitFeedback = async () => {
    if (!answers.relief || !answers.agni || !answers.aharaVihara || !answers.rating || !answers.satisfaction) {
      setAlertType("error");
      setAlertMessage("Please fill all required fields.");
      setShowAlert(true);
      return;
    }
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1200));
    const newFeedback: PanchakarmaFeedback = {
      sessionId: `session-${Date.now()}`,
      patientName: "Current Patient",
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
    setFeedbackHistory((p) => [...p, newFeedback]);
    setRating("");
    setFeedback("");
    setAnswers({});
    setIsSubmitting(false);
    setAlertType("success");
    setAlertMessage("Feedback submitted successfully!");
    setShowAlert(true);
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
    setFeedbackHistory((p) => [...p, draft]);
    setRating("");
    setFeedback("");
    setAnswers({});
    setAlertType("success");
    setAlertMessage("Feedback saved as draft.");
    setShowAlert(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Post-Session Feedback</h1>
          <p className="text-muted-foreground">Share your Panchakarma therapy experience</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="feedback">Submit Feedback</TabsTrigger>
          <TabsTrigger value="history">Feedback History</TabsTrigger>
          <TabsTrigger value="stats">Feedback Stats</TabsTrigger>
        </TabsList>

        {/* Feedback Form */}
        <TabsContent value="feedback">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle>Rate Your Session</CardTitle>
              <CardDescription>
                {upcomingSession.therapy} with {upcomingSession.practitioner} - {upcomingSession.date}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Session Rating</Label>
                <Select value={rating} onValueChange={setRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Excellent", "Good", "Fair", "Poor"].map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {customQuestions.map((q) => (
                <div key={q.id} className="space-y-2">
                  <Label>{q.question}</Label>
                  {q.type === "textarea" && (
                    <Textarea value={answers[q.id] || ""} onChange={(e) => handleAnswerChange(q.id, e.target.value)} rows={4} />
                  )}
                  {q.type === "radio" && q.options && (
                    <RadioGroup value={answers[q.id] || ""} onValueChange={(v) => handleAnswerChange(q.id, v)}>
                      {q.options.map((o) => (
                        <div key={o} className="flex items-center space-x-2">
                          <RadioGroupItem value={o} id={`${q.id}-${o}`} />
                          <Label htmlFor={`${q.id}-${o}`}>{o}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                  {q.type === "select" && q.options && (
                    <Select value={answers[q.id] || ""} onValueChange={(v) => handleAnswerChange(q.id, v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {q.options.map((o) => (
                          <SelectItem key={o} value={o}>{o}</SelectItem>
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
                      onValueChange={(val) => handleAnswerChange(q.id, val[0])}
                    />
                  )}
                  {q.type === "switch" && (
                    <Switch checked={answers[q.id] || false} onCheckedChange={(c) => handleAnswerChange(q.id, c)} />
                  )}
                </div>
              ))}

              <div className="space-y-3">
                <Label htmlFor="comment">Additional Comments</Label>
                <Textarea id="comment" value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={4} />
              </div>

              <div className="flex gap-3">
                <Button className="gap-2" disabled={isSubmitting || !rating} onClick={submitFeedback}>
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </Button>
                <Button variant="outline" disabled={isSubmitting} onClick={saveAsDraft}>
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

        {/* Feedback History */}
        <TabsContent value="history">
          <Card className="medical-card">
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

        {/* Stats */}
        <TabsContent value="stats">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="medical-card">
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
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Patient Progress</CardTitle>
          <CardDescription>Track your Panchakarma journey</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={50} className="w-full" />
          <p className="text-sm text-muted-foreground">Sessions completed: 5 of 10</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostSessionFeedback;
