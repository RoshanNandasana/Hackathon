import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users } from "lucide-react";

const clinicPerformanceData = [
  {
    id: 1,
    name: "Ayush Wellness Center - Delhi",
    activePatients: 150,
    sessionsPerMonth: 320,
    patientSatisfaction: 94,
  },
  {
    id: 2,
    name: "Herbal Care Clinic - Mumbai",
    activePatients: 120,
    sessionsPerMonth: 280,
    patientSatisfaction: 89,
  },
];

export const ClinicPerformanceAnalytics = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-semibold">Clinic Performance Analytics</h2>
    <div className="grid md:grid-cols-2 gap-6">
      {clinicPerformanceData.map((clinic) => (
        <Card key={clinic.id} className="medical-card hover:shadow-lg">
          <CardHeader>
            <CardTitle>{clinic.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-6 h-6 text-primary" />
              <p>{clinic.activePatients} Active Patients</p>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <p>{clinic.sessionsPerMonth} Sessions / Month</p>
            </div>
            <p className="font-semibold mb-1">Patient Satisfaction</p>
            <Progress value={clinic.patientSatisfaction} className="h-3" />
            <p className="mt-1">{clinic.patientSatisfaction}%</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
