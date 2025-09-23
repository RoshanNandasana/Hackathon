import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, ClipboardList, Calendar, User, Bell } from "lucide-react";

type Therapy = {
  id: string;
  name: string;
  description: string;
  prerequisites?: string[];
};

const therapiesList: Therapy[] = [
  {
    id: "abhyanga",
    name: "Abhyanga Massage",
    description: "Full body oil massage",
  },
  {
    id: "shirodhara",
    name: "Shirodhara",
    description: "Oil pouring on forehead",
    prerequisites: ["abhyanga"],
  },
  {
    id: "udvartana",
    name: "Udvartana",
    description: "Herbal powder massage",
  },
  {
    id: "nasya",
    name: "Nasya",
    description: "Nasal administration",
    prerequisites: ["shirodhara"],
  },
  {
    id: "basti",
    name: "Basti",
    description: "Medicated enema",
    prerequisites: ["nasya"],
  },
];

export const TherapyPlanner: React.FC = () => {
  const [patientName, setPatientName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [therapyDuration, setTherapyDuration] = useState("");
  const [selectedTherapies, setSelectedTherapies] = useState<string[]>([]);
  const [scheduleDates, setScheduleDates] = useState<Record<string, string>>({});
  const [notificationSettings, setNotificationSettings] = useState<Record<string, boolean>>({});
  const [consentGiven, setConsentGiven] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    const initDates: Record<string, string> = {};
    const initNotifs: Record<string, boolean> = {};
    therapiesList.forEach((therapy) => {
      initDates[therapy.id] = "";
      initNotifs[therapy.id] = true;
    });
    setScheduleDates(initDates);
    setNotificationSettings(initNotifs);
  }, []);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!patientName.trim()) errors.patientName = "Patient name is required.";
    if (!contactNumber.trim()) errors.contactNumber = "Contact number is required.";
    else if (!/^\d{10}$/.test(contactNumber.trim()))
      errors.contactNumber = "Contact number must be 10 digits.";
    if (!therapyDuration.trim()) errors.therapyDuration = "Therapy duration is required.";
    if (selectedTherapies.length === 0) errors.selectedTherapies = "At least one therapy must be selected.";
    if (!consentGiven) errors.consent = "Consent is required.";

    selectedTherapies.forEach((id) => {
      const therapy = therapiesList.find((t) => t.id === id);
      if (therapy?.prerequisites) {
        therapy.prerequisites.forEach((preReq) => {
          if (!selectedTherapies.includes(preReq)) {
            errors.selectedTherapies = `Prerequisite "${therapiesList.find(t => t.id === preReq)?.name}" must be selected before "${therapy.name}".`;
          }
        });
      }
    });

    setFormErrors(errors);
    return !Object.keys(errors).length;
  };

  const toggleTherapySelection = (id: string) => {
    setSelectedTherapies((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const onScheduleDateChange = (id: string, date: string) => {
    setScheduleDates((prev) => ({ ...prev, [id]: date }));
  };

  const toggleNotification = (id: string) => {
    setNotificationSettings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const submitPlan = () => {
    if (!validateForm()) return;
    setSubmissionStatus("submitting");
    setTimeout(() => {
      setSubmissionStatus("success");
      // Here you can integrate backend APIs and AI feedback triggers
    }, 1500);
  };

  return (
    <div className="space-y-6 p-6 max-w-full">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center">
          <ClipboardList className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Therapy Planner</h1>
          <p className="text-muted-foreground">Create customized treatment plans</p>
        </div>
      </div>

      {/* Treatment Plan Creation Form */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>New Treatment Plan</CardTitle>
          <CardDescription>Select therapies and schedule dates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Patient Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="patientName">Patient Name</Label>
              <Input
                id="patientName"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter patient name"
                aria-invalid={!!formErrors.patientName}
              />
              {formErrors.patientName && <p className="text-red-600">{formErrors.patientName}</p>}
            </div>
            <div>
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="10-digit mobile number"
                aria-invalid={!!formErrors.contactNumber}
              />
              {formErrors.contactNumber && <p className="text-red-600">{formErrors.contactNumber}</p>}
            </div>
          </div>

          {/* Therapy Duration */}
          <div>
            <Label htmlFor="therapyDuration">Treatment Duration</Label>
            <Input
              id="therapyDuration"
              value={therapyDuration}
              onChange={(e) => setTherapyDuration(e.target.value)}
              placeholder="e.g., 2 weeks"
              aria-invalid={!!formErrors.therapyDuration}
            />
            {formErrors.therapyDuration && <p className="text-red-600">{formErrors.therapyDuration}</p>}
          </div>

          {/* Therapies Selection */}
          <div>
            <Label>Select Therapies</Label>
            {formErrors.selectedTherapies && <p className="text-red-600">{formErrors.selectedTherapies}</p>}
            <div className="space-y-3 mt-2">
              {therapiesList.map((therapy) => (
                <div key={therapy.id} className="flex items-center p-3 space-x-4 border rounded-lg cursor-pointer">
                  <Checkbox
                    id={therapy.id}
                    checked={selectedTherapies.includes(therapy.id)}
                    onCheckedChange={() => toggleTherapySelection(therapy.id)}
                  />
                  <label htmlFor={therapy.id} className="grow cursor-pointer">
                    <p className="font-semibold">{therapy.name}</p>
                    <p className="text-xs text-muted-foreground">{therapy.description}</p>
                  </label>
                  {selectedTherapies.includes(therapy.id) && (
                    <>
                      <input
                        type="date"
                        value={scheduleDates[therapy.id] || ""}
                        onChange={(e) => onScheduleDateChange(therapy.id, e.target.value)}
                        className="border rounded p-1 w-36"
                        aria-label={`Schedule date for ${therapy.name}`}
                      />
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`notify-${therapy.id}`}
                          checked={notificationSettings[therapy.id]}
                          onCheckedChange={() => toggleNotification(therapy.id)}
                        />
                        <label htmlFor={`notify-${therapy.id}`} className="text-xs select-none">
                          Notify
                        </label>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Consent */}
          <div>
            <Checkbox
              id="consent"
              checked={consentGiven}
              onCheckedChange={(checked) => setConsentGiven(Boolean(checked))}
            />
            <label htmlFor="consent" className="ml-2 select-none">
              I understand and consent to this treatment plan.
            </label>
            {formErrors.consent && <p className="text-red-600">{formErrors.consent}</p>}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button disabled={submissionStatus === "submitting"} onClick={submitPlan} className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              {submissionStatus === "submitting" ? "Submitting..." : "Create Plan"}
            </Button>
            <Button disabled={submissionStatus === "submitting"} variant="outline">
              Save Draft
            </Button>
          </div>
          {submissionStatus === "success" && <p className="text-green-600 mt-4">Plan created successfully!</p>}
        </CardContent>
      </Card>

      {/* Placeholder for future analytics or interactive chart components */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription>Track patient outcomes and therapy effectiveness</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 rounded-lg bg-muted/30 flex items-center justify-center">
            <p className="text-muted-foreground text-center">
              Analytics charts & AI insights will be integrated here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
