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
  User,
  Stethoscope,
  Calendar,
  Star,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  BookOpen,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";

export const PractitionerProfile = () => {
  const { user } = useAuth();

  const practitionerStats = [
    { label: "Active Patients", value: "48", icon: User },
    { label: "Sessions This Month", value: "156", icon: Calendar },
    { label: "Average Rating", value: "4.9", icon: Star },
    { label: "Years Experience", value: "12", icon: Award },
  ];

  const certifications = [
    { name: "Certified Panchakarma Specialist", year: "2018", authority: "Central Council of Indian Medicine" },
    { name: "BAMS (Bachelor of Ayurvedic Medicine & Surgery)", year: "2015", authority: "Ayurveda University, Gujarat" },
    { name: "Diploma in Pulse Diagnosis", year: "2020", authority: "Kerala Ayurveda Academy" },
  ];

  const specializations = [
    "Panchakarma Therapies",
    "Stress Management",
    "Digestive Disorders",
    "Women’s Health",
    "Chronic Pain Management",
  ];

  const upcomingSessions = [
    { patient: "Anjali Sharma", therapy: "Shirodhara", time: "10:00 AM", status: "confirmed" },
    { patient: "Rohit Patel", therapy: "Abhyanga", time: "11:30 AM", status: "confirmed" },
    { patient: "Neha Gupta", therapy: "Consultation", time: "2:00 PM", status: "pending" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="healing-gradient w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{`Welcome, Dr. Suresh Kumar!`}</h1>
            <p className="text-muted-foreground">Your practice dashboard</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {practitionerStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="medical-card hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Professional Information */}
        <Card className="medical-card hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Professional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">dr.suresh.kumar@ayushclinic.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Ayush Wellness Center, Mumbai</span>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">License: AY-67890</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Specializations */}
        <Card className="medical-card hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Specializations
            </CardTitle>
            <CardDescription>Areas of expertise</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {specializations.map((spec, index) => (
                <Badge key={index} variant="secondary" className="mb-2">
                  {spec}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certifications */}
      <Card className="medical-card hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Certifications & Credentials
          </CardTitle>
          <CardDescription>
            Professional qualifications and continuing education
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{cert.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Issued by {cert.authority}
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant="outline">{cert.year}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Schedule */}
      <Card className="medical-card hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Today's Schedule
          </CardTitle>
          <CardDescription>Upcoming patient appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingSessions.map((session, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow transition-shadow duration-200"
              >
                <div className="space-y-1">
                  <p className="font-medium">{session.patient}</p>
                  <p className="text-sm text-muted-foreground">{session.therapy}</p>
                  <p className="text-sm text-muted-foreground">{session.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={session.status === "confirmed" ? "default" : "secondary"}
                    className="capitalize"
                  >
                    {session.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="medical-card hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>This Month's Performance</CardTitle>
          <CardDescription>Your practice metrics and patient satisfaction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Patient Satisfaction</span>
                <span>4.9/5.0</span>
              </div>
              <Progress value={98} className="progress-glow" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Session Completion Rate</span>
                <span>97%</span>
              </div>
              <Progress value={97} className="progress-glow" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
