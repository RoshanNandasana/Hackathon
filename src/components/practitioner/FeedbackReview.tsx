
import React, { useState } from "react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MessageCircle, Calendar, Send, AlertCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Interface Definitions (reused from patient side)
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

// Initial Data (reused from patient side, grouped by patient)
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

// Group feedbacks by patient
const groupFeedbacksByPatient = (feedbacks: PanchakarmaFeedback[]) => {
  return feedbacks.reduce((acc: { [patient: string]: PanchakarmaFeedback[] }, feedback) => {
    if (!acc[feedback.patientName]) {
      acc[feedback.patientName] = [];
    }
    acc[feedback.patientName].push(feedback);
    return acc;
  }, {});
};

const DoctorFeedbackReview: React.FC = () => {
  const [feedbackHistory, setFeedbackHistory] = useState<PanchakarmaFeedback[]>(initialFeedback);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(null);
  const [doctorReply, setDoctorReply] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const groupedFeedbacks = groupFeedbacksByPatient(feedbackHistory);

  const handleSelectPatient = (patient: string) => {
    setSelectedPatient(patient);
    setSelectedFeedbackId(null);
    setDoctorReply("");
  };

  const handleSelectFeedback = (sessionId: string) => {
    setSelectedFeedbackId(sessionId);
    const feedback = feedbackHistory.find((f) => f.sessionId === sessionId);
    setDoctorReply(feedback?.doctorResponse || "");
  };

  const submitReply = async (sessionId: string) => {
    if (!doctorReply.trim()) {
      setAlertType("error");
      setAlertMessage("Please enter a reply before submitting.");
      setShowAlert(true);
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      setFeedbackHistory((prev) =>
        prev.map((f) =>
          f.sessionId === sessionId ? { ...f, doctorResponse: doctorReply } : f
        )
      );

      setAlertType("success");
      setAlertMessage("Reply submitted successfully!");
      setShowAlert(true);
      setSelectedFeedbackId(null);
      setDoctorReply("");
    } catch (err) {
      setAlertType("error");
      setAlertMessage("Failed to submit reply. Please try again.");
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patient Feedback Review</h1>
          <p className="text-muted-foreground">Review patient feedbacks and provide responses</p>
          <p className="text-sm text-muted-foreground">
            Last updated: Wednesday, September 24, 2025, 04:44 PM IST
          </p>
        </div>
      </div>

      {selectedPatient ? (
        <Card className="border-none shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{selectedPatient}'s Feedback History</CardTitle>
              <Button variant="outline" onClick={() => setSelectedPatient(null)}>
                Back to Patients
              </Button>
            </div>
            <CardDescription>View and respond to feedbacks</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Therapy</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Satisfaction</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Relief</TableHead>
                  <TableHead>Side Effects</TableHead>
                  <TableHead>Agni</TableHead>
                  <TableHead>Ahara-Vihara</TableHead>
                  <TableHead>Prescription Changes</TableHead>
                  <TableHead>Doctor Response</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupedFeedbacks[selectedPatient].map((item) => (
                  <TableRow key={item.sessionId}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.therapy}</TableCell>
                    <TableCell>{item.rating}</TableCell>
                    <TableCell>{item.satisfaction}</TableCell>
                    <TableCell>{item.comment}</TableCell>
                    <TableCell>{item.relief}</TableCell>
                    <TableCell>{item.sideEffects}</TableCell>
                    <TableCell>{item.agni}</TableCell>
                    <TableCell>{item.aharaVihara}</TableCell>
                    <TableCell>{item.prescriptionChanges || "None"}</TableCell>
                    <TableCell>{item.doctorResponse || "No response yet"}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSelectFeedback(item.sessionId)}
                      >
                        {item.doctorResponse ? "Edit Reply" : "Add Reply"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {selectedFeedbackId && (
              <div className="mt-6 space-y-4">
                <Label htmlFor="doctorReply">Your Response</Label>
                <Textarea
                  id="doctorReply"
                  value={doctorReply}
                  onChange={(e) => setDoctorReply(e.target.value)}
                  placeholder="Enter your response to the patient..."
                  rows={4}
                />
                <div className="flex gap-3">
                  <Button
                    className="gap-2"
                    disabled={isSubmitting}
                    onClick={() => submitReply(selectedFeedbackId)}
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? "Submitting..." : "Submit Reply"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedFeedbackId(null);
                      setDoctorReply("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {showAlert && (
              <Alert variant={alertType === "success" ? "default" : "destructive"} className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{alertType === "success" ? "Success" : "Error"}</AlertTitle>
                <AlertDescription>{alertMessage}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Patient List</CardTitle>
            <CardDescription>Select a patient to view their feedback</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.keys(groupedFeedbacks).map((patient) => (
              <div
                key={patient}
                className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                onClick={() => handleSelectPatient(patient)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{patient}</h3>
                  <Badge variant="secondary">{groupedFeedbacks[patient].length} Feedbacks</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Last feedback: {groupedFeedbacks[patient][0].date}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DoctorFeedbackReview;
