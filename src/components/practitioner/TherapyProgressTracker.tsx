import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, CheckCircle, Clock, Circle } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

export const TherapyProgressTracker = () => {
  const patients = [
    {
      name: "Rajesh Kumar",
      age: 50,
      condition: "Chronic Stress",
      therapy: "Panchakarma Detox",
      progress: 75,
      step: 3,
      totalSteps: 5,
      lastVisit: "2 days ago",
      totalSessions: 16,
      sessionsCompleted: 12,
      status: "active",
    },
    {
      name: "Neha Patel",
      age: 38,
      condition: "Digestive Issues",
      therapy: "Digestive Healing",
      progress: 90,
      step: 4,
      totalSteps: 5,
      lastVisit: "1 week ago",
      totalSessions: 20,
      sessionsCompleted: 18,
      status: "active",
    },
    {
      name: "Deepak Shah",
      age: 44,
      condition: "Stress Relief",
      therapy: "Stress Relief",
      progress: 55,
      step: 2,
      totalSteps: 4,
      lastVisit: "3 days ago",
      totalSessions: 14,
      sessionsCompleted: 7,
      status: "active",
    },
    {
      name: "Anjali Sharma",
      age: 29,
      condition: "Women's Health",
      therapy: "Women’s Health Support",
      progress: 62,
      step: 3,
      totalSteps: 5,
      lastVisit: "5 days ago",
      totalSessions: 12,
      sessionsCompleted: 8,
      status: "active",
    },
    {
      name: "Rohit Mehta",
      age: 52,
      condition: "Joint Pain",
      therapy: "Pain Management",
      progress: 80,
      step: 4,
      totalSteps: 6,
      lastVisit: "Yesterday",
      totalSessions: 18,
      sessionsCompleted: 15,
      status: "active",
    },
  ];

  const steps = [
    "Consultation",
    "Preparation",
    "Main Treatment",
    "Recovery",
    "Follow-up",
    "Maintenance",
  ];

  const [selectedPatientIndex, setSelectedPatientIndex] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Therapy Progress Tracker</h1>
          <p className="text-muted-foreground">
            Monitor each patient’s Panchakarma treatment journey
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Patients List */}
        <div className="md:w-1/3 space-y-4">
          <h2 className="text-2xl font-semibold">Patients</h2>
          {patients.map((patient, index) => (
            <Card
              key={index}
              onClick={() =>
                setSelectedPatientIndex(
                  selectedPatientIndex === index ? null : index
                )
              }
              className={`cursor-pointer p-4 transition-colors ${
                selectedPatientIndex === index
                  ? "border-2 border-primary shadow-md"
                  : "border border-muted rounded hover:bg-muted/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <User className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {patient.condition}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Selected Patient Details */}
        <div className="md:w-2/3">
          {selectedPatientIndex !== null ? (
            <>
              <Card className="medical-card shadow-md mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    {patients[selectedPatientIndex].name} –{" "}
                    {patients[selectedPatientIndex].therapy}
                  </CardTitle>
                  <CardDescription>
                    Age: {patients[selectedPatientIndex].age} • Last Visit:{" "}
                    {patients[selectedPatientIndex].lastVisit} • Status:{" "}
                    {patients[selectedPatientIndex].status}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Condition: {patients[selectedPatientIndex].condition}
                  </p>
                  <Progress
                    value={patients[selectedPatientIndex].progress}
                    className="progress-glow h-4 rounded mb-2"
                  />
                  <p className="text-sm mb-4">
                    Progress: {patients[selectedPatientIndex].progress}%
                  </p>
                  <p className="text-sm">
                    Sessions Completed:{" "}
                    {patients[selectedPatientIndex].sessionsCompleted} /{" "}
                    {patients[selectedPatientIndex].totalSessions}
                  </p>
                </CardContent>
              </Card>

              <Card className="medical-card shadow-md">
                <CardHeader>
                  <CardTitle>Treatment Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    {steps
                      .slice(0, patients[selectedPatientIndex].totalSteps)
                      .map((step, idx) => {
                        const isCompleted =
                          idx < patients[selectedPatientIndex].step;
                        const isCurrent =
                          idx === patients[selectedPatientIndex].step - 1;
                        return (
                          <div
                            key={idx}
                            className="flex flex-col items-center gap-2 min-w-[5rem]"
                          >
                            {isCompleted ? (
                              <CheckCircle className="w-6 h-6 text-green-600" />
                            ) : isCurrent ? (
                              <Clock className="w-6 h-6 text-primary" />
                            ) : (
                              <Circle className="w-6 h-6 text-muted-foreground" />
                            )}
                            <span className="text-xs text-center truncate w-full">
                              {step}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <p className="text-muted-foreground">
              Select a patient to view details
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
