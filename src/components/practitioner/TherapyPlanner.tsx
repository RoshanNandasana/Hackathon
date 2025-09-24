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
import { Send, ClipboardList } from "lucide-react";

type Therapy = {
  id: string;
  name: string;
  description: string;
  prerequisites?: string[];
};

const therapiesList: Therapy[] = [
  { id: "abhyanga", name: "Abhyanga Massage", description: "Full body oil massage" },
  { id: "shirodhara", name: "Shirodhara", description: "Oil pouring on forehead", prerequisites: ["abhyanga"] },
  { id: "udvartana", name: "Udvartana", description: "Herbal powder massage" },
  { id: "nasya", name: "Nasya", description: "Nasal administration", prerequisites: ["shirodhara"] },
  { id: "basti", name: "Basti", description: "Medicated enema", prerequisites: ["nasya"] },
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
  const [submissionStatus, setSubmissionStatus] =
    useState<"idle" | "submitting" | "success" | "error">("idle");

  const [activeTherapyId, setActiveTherapyId] = useState<string | null>(null);

  // initialize schedule + notifications
  useEffect(() => {
    const initDates: Record<string, string> = {};
    const initNotifs: Record<string, boolean> = {};
    therapiesList.forEach((t) => {
      initDates[t.id] = "";
      initNotifs[t.id] = true;
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
    if (selectedTherapies.length === 0) errors.selectedTherapies = "Select at least one therapy.";
    if (!consentGiven) errors.consent = "Consent is required.";

    selectedTherapies.forEach((id) => {
      const therapy = therapiesList.find((t) => t.id === id);
      therapy?.prerequisites?.forEach((p) => {
        if (!selectedTherapies.includes(p)) {
          errors.selectedTherapies = `Prerequisite "${therapiesList.find(t => t.id === p)?.name}" must be selected before "${therapy.name}".`;
        }
      });
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const toggleTherapySelection = (id: string) => {
    setSelectedTherapies((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const onScheduleDateChange = (id: string, date: string) =>
    setScheduleDates((prev) => ({ ...prev, [id]: date }));

  const toggleNotification = (id: string) =>
    setNotificationSettings((prev) => ({ ...prev, [id]: !prev[id] }));

  const submitPlan = () => {
    if (!validateForm()) return;
    setSubmissionStatus("submitting");
    setTimeout(() => setSubmissionStatus("success"), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center">
          <ClipboardList className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Therapy Planner</h1>
          <p className="text-muted-foreground">Create and schedule custom treatment plans</p>
        </div>
      </div>

      {/* Two-panel layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: therapy list */}
        <div className="md:w-1/3 space-y-4">
          <h2 className="text-2xl font-semibold">Therapies</h2>
          {therapiesList.map((therapy) => (
            <Card
              key={therapy.id}
              onClick={() =>
                setActiveTherapyId(activeTherapyId === therapy.id ? null : therapy.id)
              }
              className={`cursor-pointer p-4 transition-colors ${
                activeTherapyId === therapy.id
                  ? "border-2 border-primary shadow-md"
                  : "border border-muted rounded hover:bg-muted/30"
              }`}
            >
              <div className="flex flex-col">
                <p className="font-medium">{therapy.name}</p>
                <p className="text-xs text-muted-foreground">{therapy.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Right: planner form */}
        <div className="md:w-2/3">
          {activeTherapyId ? (
            <Card className="medical-card shadow-md">
              <CardHeader>
                <CardTitle>
                  Plan for {therapiesList.find((t) => t.id === activeTherapyId)?.name}
                </CardTitle>
                <CardDescription>
                  Fill patient details and schedule selected therapies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Patient info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="patientName">Patient Name</Label>
                    <Input
                      id="patientName"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Enter patient name"
                    />
                    {formErrors.patientName && (
                      <p className="text-red-600">{formErrors.patientName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="contactNumber">Contact Number</Label>
                    <Input
                      id="contactNumber"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      placeholder="10-digit mobile number"
                    />
                    {formErrors.contactNumber && (
                      <p className="text-red-600">{formErrors.contactNumber}</p>
                    )}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <Label htmlFor="therapyDuration">Treatment Duration</Label>
                  <Input
                    id="therapyDuration"
                    value={therapyDuration}
                    onChange={(e) => setTherapyDuration(e.target.value)}
                    placeholder="e.g., 2 weeks"
                  />
                  {formErrors.therapyDuration && (
                    <p className="text-red-600">{formErrors.therapyDuration}</p>
                  )}
                </div>

                {/* Multi-therapy selection */}
                <div>
                  <Label>Select Therapies</Label>
                  {formErrors.selectedTherapies && (
                    <p className="text-red-600">{formErrors.selectedTherapies}</p>
                  )}
                  <div className="space-y-3 mt-2">
                    {therapiesList.map((therapy) => (
                      <div
                        key={therapy.id}
                        className="flex items-center p-3 space-x-4 border rounded-lg"
                      >
                        <Checkbox
                          id={therapy.id}
                          checked={selectedTherapies.includes(therapy.id)}
                          onCheckedChange={() => toggleTherapySelection(therapy.id)}
                        />
                        <label htmlFor={therapy.id} className="grow cursor-pointer">
                          <p className="font-semibold">{therapy.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {therapy.description}
                          </p>
                        </label>
                        {selectedTherapies.includes(therapy.id) && (
                          <>
                            <input
                              type="date"
                              value={scheduleDates[therapy.id] || ""}
                              onChange={(e) =>
                                onScheduleDateChange(therapy.id, e.target.value)
                              }
                              className="border rounded p-1 w-36"
                            />
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`notify-${therapy.id}`}
                                checked={notificationSettings[therapy.id]}
                                onCheckedChange={() => toggleNotification(therapy.id)}
                              />
                              <label
                                htmlFor={`notify-${therapy.id}`}
                                className="text-xs"
                              >
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
                    onCheckedChange={(c) => setConsentGiven(Boolean(c))}
                  />
                  <label htmlFor="consent" className="ml-2 select-none">
                    I understand and consent to this treatment plan.
                  </label>
                  {formErrors.consent && (
                    <p className="text-red-600">{formErrors.consent}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    disabled={submissionStatus === "submitting"}
                    onClick={submitPlan}
                    className="flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {submissionStatus === "submitting"
                      ? "Submitting..."
                      : "Create Plan"}
                  </Button>
                  <Button
                    disabled={submissionStatus === "submitting"}
                    variant="outline"
                  >
                    Save Draft
                  </Button>
                </div>
                {submissionStatus === "success" && (
                  <p className="text-green-600 mt-4">
                    Plan created successfully!
                  </p>
                )}
              </CardContent>
            </Card>
          ) : (
            <p className="text-muted-foreground">
              Select a therapy from the left to start planning
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
