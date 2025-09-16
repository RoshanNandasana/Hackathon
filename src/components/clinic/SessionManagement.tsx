import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Plus,
  MapPin,
  User,
  Clock,
} from "lucide-react";

export const SessionManagement = () => {
  const sessions = [
    {
      id: 1,
      patient: "Sarah Johnson",
      practitioner: "Dr. Suresh Kumar",
      therapy: "Shirodhara",
      room: "Room 1",
      time: "10:00 AM",
      status: "active",
    },
    {
      id: 2,
      patient: "Michael Chen",
      practitioner: "Dr. Rekha Sharma",
      therapy: "Abhyanga",
      room: "Room 2",
      time: "11:30 AM",
      status: "scheduled",
    },
    {
      id: 3,
      patient: "Emily Davis",
      practitioner: "Dr. Suresh Kumar",
      therapy: "Consultation",
      room: "Office 1",
      time: "2:00 PM",
      status: "completed",
    },
  ];

  const roomAvailability = [
    { room: "Treatment Room 1", status: "occupied", nextAvailable: "11:00 AM" },
    { room: "Treatment Room 2", status: "available", nextAvailable: "Now" },
    { room: "Treatment Room 3", status: "maintenance", nextAvailable: "2:00 PM" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center shadow-md">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
              Session Management
            </h1>
            <p className="text-muted-foreground text-base max-w-lg">
              Manage therapy sessions and room allocation efficiently
            </p>
          </div>
        </div>

      </div>

      {/* Sessions and Room Availability Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Sessions */}
        <Card className="medical-card lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle>Today's Sessions</CardTitle>
            <CardDescription>Current and scheduled therapy sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow hover:border-primary transition-all duration-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-gray-900 truncate">
                          {session.patient}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{session.therapy}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">Dr: {session.practitioner}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm">{session.room}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm">{session.time}</span>
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Badge
                        variant={
                          session.status === "active"
                            ? "default"
                            : session.status === "completed"
                            ? "secondary"
                            : "outline"
                        }
                        className="capitalize px-3 py-1 text-sm"
                      >
                        {session.status}
                      </Badge>
                    
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Room Availability */}
        <Card className="medical-card shadow-lg">
          <CardHeader>
            <CardTitle>Room Availability</CardTitle>
            <CardDescription>Current status of treatment rooms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roomAvailability.map((room, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg flex items-center justify-between space-x-4 hover:shadow transition-shadow duration-200"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{room.room}</p>
                    <p className="text-sm text-muted-foreground">Next available: {room.nextAvailable}</p>
                  </div>
                  <Badge
                    variant={
                      room.status === "available"
                        ? "default"
                        : room.status === "occupied"
                        ? "secondary"
                        : "destructive"
                    }
                    className="uppercase px-3 py-1 text-xs"
                  >
                    {room.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
