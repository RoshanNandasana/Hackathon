import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, User, CheckCircle, Clock, Circle } from "lucide-react";

export const TherapyProgressTracker = () => {
  const patients = [
    {
      name: "Rajesh Kumar",
      step: 3,
      total: 5,
      therapy: "Panchakarma Detox",
      progress: 75,
    },
    {
      name: "Neha Patel",
      step: 4,
      total: 5,
      therapy: "Digestive Healing",
      progress: 90,
    },
    {
      name: "Deepak Shah",
      step: 2,
      total: 4,
      therapy: "Stress Relief",
      progress: 55,
    },
  ];

  const steps = [
    "Consultation",
    "Preparation",
    "Main Treatment",
    "Recovery",
    "Follow-up",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center shadow-md">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Therapy Progress Tracker</h1>
          <p className="text-muted-foreground">Monitor patient treatment phases</p>
        </div>
      </div>

      {/* Patients Progress Cards */}
      <div className="grid gap-6">
        {patients.map((patient, i) => (
          <Card key={i} className="medical-card shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                {patient.name}
              </CardTitle>
              <CardDescription>{patient.therapy} Program</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <Progress value={patient.progress} className="progress-glow h-4 rounded" />
                <div className="flex justify-between items-center">
                  {steps.slice(0, patient.total).map((step, idx) => {
                    const isCompleted = idx < patient.step;
                    const isCurrent = idx === patient.step - 1;
                    return (
                      <div key={idx} className="flex flex-col items-center gap-2 min-w-[5rem]">
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : isCurrent ? (
                          <Clock className="w-6 h-6 text-primary" />
                        ) : (
                          <Circle className="w-6 h-6 text-muted-foreground" />
                        )}
                        <span className="text-xs text-center truncate w-full">{step}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
