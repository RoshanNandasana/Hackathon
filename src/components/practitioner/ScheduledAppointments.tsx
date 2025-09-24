import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, MapPin } from "lucide-react";

export const ScheduledAppointments = () => {
  const appointments = [
    {
      patient: "Rajesh Kumar",
      therapy: "Shirodhara",
      date: "Today",
      time: "10:00 AM",
      room: "Room 1",
      status: "confirmed",
    },
    {
      patient: "Neha Patel",
      therapy: "Abhyanga",
      date: "Today",
      time: "11:30 AM",
      room: "Room 2",
      status: "confirmed",
    },
    {
      patient: "Deepak Shah",
      therapy: "Consultation",
      date: "Tomorrow",
      time: "9:00 AM",
      room: "Office",
      status: "pending",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Scheduled Appointments</h1>
          <p className="text-muted-foreground">
            Manage and review your upcoming patient sessions efficiently
          </p>
        </div>
      </div>

      {/* Appointments List */}
      <Card className="medical-card shadow-md">
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>
            Your scheduled patient sessions and their details
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {appointments.map((apt, idx) => (
              <div
                key={idx}
                className="p-4 border border-muted rounded-lg flex flex-col md:grid md:grid-cols-6 md:items-center gap-4 hover:bg-muted/30 transition-colors"
              >
                {/* Patient */}
                <div className="md:col-span-2 flex items-center gap-3">
                  <User className="w-5 h-5 text-primary" />
                  <span className="font-medium">{apt.patient}</span>
                </div>

                {/* Therapy */}
                <div className="text-sm text-gray-700">{apt.therapy}</div>

                {/* Date & Time */}
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>
                    {apt.date} {apt.time}
                  </span>
                </div>

                {/* Room */}
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{apt.room}</span>
                </div>

                {/* Status & Action */}
                <div className="flex items-center justify-end space-x-2">
                  <Badge
                    variant={
                      apt.status === "confirmed"
                        ? "default"
                        : apt.status === "pending"
                        ? "secondary"
                        : "outline"
                    }
                    className="capitalize"
                  >
                    {apt.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
