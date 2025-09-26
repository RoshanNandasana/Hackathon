// ayur-suite-main/src/components/DoctorFeedbackReview.tsx
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MessageCircle, Send, AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  suggestedTreatment?: string;
  suggestedMedicine?: string;
}

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

const groupFeedbacksByPatient = (feedbacks: PanchakarmaFeedback[]) => {
  return feedbacks.reduce((acc: { [patient: string]: PanchakarmaFeedback[] }, f) => {
    if (!acc[f.patientName]) acc[f.patientName] = [];
    acc[f.patientName].push(f);
    return acc;
  }, {});
};

const getAIsuggestions = (feedback: PanchakarmaFeedback): { suggestedTreatment: string; suggestedMedicine: string } => {
  const suggestions = {
    suggestedTreatment: "",
    suggestedMedicine: "",
  };

  if (feedback.relief.includes("Significant") && !feedback.sideEffects.includes("Yes")) {
    suggestions.suggestedTreatment = "Continue current therapy with increased frequency.";
    suggestions.suggestedMedicine = "Maintain current dosage.";
  } else if (feedback.relief.includes("Slight") || feedback.relief.includes("None")) {
    suggestions.suggestedTreatment = "Consider adjusting therapy (e.g., combine with Abhyanga).";
    suggestions.suggestedMedicine = "Add Ashwagandha 500mg daily if Vata imbalance suspected.";
  }
  if (feedback.sideEffects.includes("Yes")) {
    suggestions.suggestedTreatment += " Monitor side effects closely; adjust intensity if needed.";
    suggestions.suggestedMedicine += " Include Triphala 1 tsp at bedtime for detoxification.";
  }
  if (feedback.agni.includes("Poor") || feedback.agni.includes("Moderate")) {
    suggestions.suggestedTreatment += " Focus on Agni-balancing therapies (e.g., Virechana).";
    suggestions.suggestedMedicine += " Add Agnitundi Vati 1 tablet twice daily.";
  }
  if (feedback.aharaVihara.includes("Partially") || feedback.aharaVihara.includes("Not at all")) {
    suggestions.suggestedTreatment += " Reinforce Ahara-Vihara compliance with counseling.";
    suggestions.suggestedMedicine = "None (focus on lifestyle adherence).";
  }

  return suggestions;
};

const DoctorFeedbackReview: React.FC = () => {
  const [feedbackHistory, setFeedbackHistory] = useState(initialFeedback);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(null);
  const [doctorReply, setDoctorReply] = useState("");
  const [suggestedTreatment, setSuggestedTreatment] = useState("");
  const [suggestedMedicine, setSuggestedMedicine] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const groupedFeedbacks = groupFeedbacksByPatient(feedbackHistory);

  useEffect(() => {
    if (selectedFeedbackId) {
      const feedback = feedbackHistory.find((f) => f.sessionId === selectedFeedbackId);
      if (feedback) {
        const { suggestedTreatment, suggestedMedicine } = getAIsuggestions(feedback);
        setSuggestedTreatment(suggestedTreatment || "No specific treatment suggested.");
        setSuggestedMedicine(suggestedMedicine || "No specific medicine suggested.");
        setDoctorReply(feedback.doctorResponse || "");
      }
    }
  }, [selectedFeedbackId, feedbackHistory]);

  const handleSelectPatient = (p: string) => {
    setSelectedPatient(p);
    setSelectedFeedbackId(null);
    setDoctorReply("");
    setSuggestedTreatment("");
    setSuggestedMedicine("");
  };

  const handleSelectFeedback = (id: string) => {
    setSelectedFeedbackId(id);
    const fb = feedbackHistory.find((f) => f.sessionId === id);
    if (fb) {
      setDoctorReply(fb.doctorResponse || "");
      const { suggestedTreatment, suggestedMedicine } = getAIsuggestions(fb);
      setSuggestedTreatment(suggestedTreatment || "No specific treatment suggested.");
      setSuggestedMedicine(suggestedMedicine || "No specific medicine suggested.");
    }
  };

  const submitReply = async (id: string) => {
    if (!doctorReply.trim()) {
      setAlertType("error");
      setAlertMessage("Please enter a reply before submitting.");
      setShowAlert(true);
      return;
    }
    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      setFeedbackHistory((prev) =>
        prev.map((f) =>
          f.sessionId === id
            ? {
                ...f,
                doctorResponse: doctorReply,
                suggestedTreatment: suggestedTreatment,
                suggestedMedicine: suggestedMedicine,
              }
            : f
        )
      );
      setAlertType("success");
      setAlertMessage("Reply and suggestions submitted successfully!");
      setShowAlert(true);
      setSelectedFeedbackId(null);
      setDoctorReply("");
      setSuggestedTreatment("");
      setSuggestedMedicine("");
    } catch {
      setAlertType("error");
      setAlertMessage("Failed to submit reply. Please try again.");
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md">
        <div className="bg-gradient-to-br from-green-500 to-teal-600 w-14 h-14 rounded-lg flex items-center justify-center">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Patient Feedback Review</h1>
          <p className="text-gray-600">Review patient feedbacks and provide responses</p>
          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            IST
          </p>
        </div>
      </div>

      {selectedPatient ? (
        <Card className="medical-card bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-100 to-teal-100 p-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-semibold text-gray-800">
                {selectedPatient}'s Feedback History
              </CardTitle>
              <Button
                variant="outline"
                className="border-green-500 text-green-700 hover:bg-green-50"
                onClick={() => setSelectedPatient(null)}
              >
                Back to Patients
              </Button>
            </div>
            <CardDescription className="text-gray-600">View and respond to feedbacks</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Table className="w-full border-collapse">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="p-3 text-left text-gray-700 font-medium">Date</TableHead>
                  <TableHead className="p-3 text-left text-gray-700 font-medium">Therapy</TableHead>
                  <TableHead className="p-3 text-left text-gray-700 font-medium">Rating</TableHead>
                  <TableHead className="p-3 text-left text-gray-700 font-medium">Satisfaction</TableHead>
                  <TableHead className="p-3 text-left text-gray-700 font-medium">Comment</TableHead>
                  <TableHead className="p-3 text-left text-gray-700 font-medium">Relief</TableHead>
                  <TableHead className="p-3 text-left text-gray-700 font-medium">Side Effects</TableHead>
                  <TableHead className="p-3 text-left text-gray-700 font-medium">Agni</TableHead>
                  <TableHead className="p-3 text-left text-gray-700 font-medium">Ahara-Vihara</TableHead>
                  <TableHead className="p-3 text-left text-gray-700 font-medium">Prescription Changes</TableHead>
                  <TableHead className="p-3 text-left text-gray-700 font-medium">Doctor Response</TableHead>
                  <TableHead className="p-3 text-left text-gray-700 font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupedFeedbacks[selectedPatient].map((item) => (
                  <TableRow
                    key={item.sessionId}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="p-3 border-b">{item.date}</TableCell>
                    <TableCell className="p-3 border-b">{item.therapy}</TableCell>
                    <TableCell className="p-3 border-b">{item.rating}</TableCell>
                    <TableCell className="p-3 border-b">{item.satisfaction}</TableCell>
                    <TableCell className="p-3 border-b">{item.comment}</TableCell>
                    <TableCell className="p-3 border-b">{item.relief}</TableCell>
                    <TableCell className="p-3 border-b">{item.sideEffects}</TableCell>
                    <TableCell className="p-3 border-b">{item.agni}</TableCell>
                    <TableCell className="p-3 border-b">{item.aharaVihara}</TableCell>
                    <TableCell className="p-3 border-b">{item.prescriptionChanges || "None"}</TableCell>
                    <TableCell className="p-3 border-b">{item.doctorResponse || "No response yet"}</TableCell>
                    <TableCell className="p-3 border-b">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-500 text-green-700 hover:bg-green-50"
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
              <div className="mt-6 space-y-6">
                {/* AI Suggested Treatment */}
                <Card className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-lg shadow-md">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      AI Suggested Treatment
                    </CardTitle>
                    <Badge className="bg-blue-500 text-white">AI-Prescribed</Badge>
                  </div>
                  <Textarea
                    value={suggestedTreatment}
                    onChange={(e) => setSuggestedTreatment(e.target.value)}
                    placeholder="Suggested treatment based on feedback..."
                    rows={3}
                    className="mt-2 bg-white border-gray-300 focus:border-blue-500"
                    disabled
                  />
                </Card>

                {/* AI Suggested Medicine */}
                <Card className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-lg shadow-md">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      AI Suggested Medicine
                    </CardTitle>
                    <Badge className="bg-blue-500 text-white">AI-Prescribed</Badge>
                  </div>
                  <Textarea
                    value={suggestedMedicine}
                    onChange={(e) => setSuggestedMedicine(e.target.value)}
                    placeholder="Suggested medicine based on feedback..."
                    rows={3}
                    className="mt-2 bg-white border-gray-300 focus:border-blue-500"
                    disabled
                  />
                </Card>

                {/* Doctor Response */}
                <Card className="bg-white p-4 rounded-lg shadow-md">
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    Your Response
                  </CardTitle>
                  <Textarea
                    value={doctorReply}
                    onChange={(e) => setDoctorReply(e.target.value)}
                    placeholder="Enter your response to the patient..."
                    rows={4}
                    className="mt-2 bg-white border-gray-300 focus:border-green-500"
                  />
                </Card>

                <div className="flex gap-4">
                  <Button
                    className="bg-green-600 text-white hover:bg-green-700 gap-2 w-full md:w-auto"
                    disabled={isSubmitting}
                    onClick={() => submitReply(selectedFeedbackId)}
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? "Submitting..." : "Submit Reply"}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 w-full md:w-auto"
                    onClick={() => {
                      setSelectedFeedbackId(null);
                      setDoctorReply("");
                      setSuggestedTreatment("");
                      setSuggestedMedicine("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {showAlert && (
              <Alert
                variant={alertType === "success" ? "default" : "destructive"}
                className="mt-4"
              >
                <AlertCircle className="h-5 w-5" />
                <AlertTitle className="text-lg">
                  {alertType === "success" ? "Success" : "Error"}
                </AlertTitle>
                <AlertDescription className="text-gray-600">
                  {alertMessage}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="medical-card bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-100 to-teal-100 p-6">
            <CardTitle className="text-2xl font-semibold text-gray-800">Patient List</CardTitle>
            <CardDescription className="text-gray-600">Select a patient to view their feedback</CardDescription>
          </CardHeader>
          <CardContent className="p-6 grid gap-4">
            {Object.keys(groupedFeedbacks).map((patient) => (
              <div
                key={patient}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-between"
                onClick={() => handleSelectPatient(patient)}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{patient}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Last feedback: {groupedFeedbacks[patient][0].date}
                  </p>
                </div>
                <Badge className="bg-teal-500 text-white">
                  {groupedFeedbacks[patient].length} Feedbacks
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DoctorFeedbackReview;