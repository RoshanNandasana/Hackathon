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
        <div className="medical-gradient w-14 h-14 rounded-lg flex items-center justify-center shadow-lg">
          <Calendar className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold leading-tight text-gray-900">
            Scheduled Appointments
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            Manage and review your upcoming patient sessions efficiently.
          </p>
        </div>
      </div>

      {/* Appointments List */}
      <Card className="medical-card shadow-md hover:shadow-lg transition-shadow duration-300">
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
                className="p-6 border border-gray-200 rounded-lg flex flex-col md:grid md:grid-cols-6 md:items-center gap-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="md:col-span-2 flex items-center gap-3">
                  <User className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-gray-900 truncate">
                    {apt.patient}
                  </span>
                </div>

                <div className="text-gray-700 truncate">
                  <span>{apt.therapy}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>
                    {apt.date} {apt.time}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{apt.room}</span>
                </div>

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
