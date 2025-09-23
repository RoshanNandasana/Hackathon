import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Heart, 
  Calendar, 
  Activity, 
  MapPin, 
  Phone, 
  Mail,
  Clock
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const PatientProfile = () => {
  const { user } = useAuth();

  const upcomingSessions = [
    { therapy: 'Abhyanga Massage', date: 'Tomorrow, 10:00 AM', practitioner: 'Dr. Suresh Kumar' },
    { therapy: 'Shirodhara', date: 'Nov 20, 2:00 PM', practitioner: 'Dr. Rekha Sharma' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="medical-gradient w-16 h-16 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'Guest'}!</h1>
            <p className="text-muted-foreground">Your healing journey continues</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="healing-gradient w-12 h-12 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Sessions Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-accent to-secondary w-12 h-12 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{upcomingSessions.length}</p>
                <p className="text-sm text-muted-foreground">Upcoming Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-primary to-primary-glow w-12 h-12 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">75%</p>
                <p className="text-sm text-muted-foreground">Treatment Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">patient.india@example.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Mumbai, Maharashtra</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Age: 34</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Treatment Progress */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Treatment Progress
            </CardTitle>
            <CardDescription>Your overall healing journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Detoxification Phase</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="progress-glow" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Panchakarma</Badge>
              <Badge variant="outline">Detox Program</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Sessions */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Upcoming Sessions
          </CardTitle>
          <CardDescription>Your scheduled therapy appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{session.therapy}</p>
                  <p className="text-sm text-muted-foreground">{session.date}</p>
                  <p className="text-sm text-muted-foreground">With {session.practitioner}</p>
                </div>
                <Button variant="outline" size="sm">
                  Reschedule
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
