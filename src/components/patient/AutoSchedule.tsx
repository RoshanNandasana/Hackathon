import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, MapPin, CheckCircle, X } from 'lucide-react';

export const AutoSchedule = () => {
  const suggestedSlots = [
    {
      id: 1,
      therapy: 'Abhyanga Massage',
      date: 'Tomorrow',
      time: '10:00 AM - 11:00 AM',
      practitioner: 'Dr. Smith',
      room: 'Treatment Room 1',
      match: 95
    },
    {
      id: 2,
      therapy: 'Shirodhara',
      date: 'Nov 22',
      time: '2:00 PM - 3:00 PM',
      practitioner: 'Dr. Johnson',
      room: 'Treatment Room 3',
      match: 88
    },
    {
      id: 3,
      therapy: 'Udvartana',
      date: 'Nov 24',
      time: '11:00 AM - 12:00 PM',
      practitioner: 'Dr. Smith',
      room: 'Treatment Room 2',
      match: 92
    }
  ];

  const upcomingAppointments = [
    {
      therapy: 'Panchakarma Consultation',
      date: 'Today',
      time: '3:00 PM',
      status: 'confirmed'
    },
    {
      therapy: 'Abhyanga Massage',
      date: 'Nov 21',
      time: '10:00 AM',
      status: 'confirmed'
    }
  ];

  const preferences = {
    preferredTime: 'Morning (9 AM - 12 PM)',
    preferredDays: ['Monday', 'Wednesday', 'Friday'],
    preferredPractitioner: 'Dr. Smith',
    duration: '60 minutes'
  };
return (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center gap-3">
      <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center">
        <Calendar className="w-6 h-6 text-white" />
      </div>
      <div>
        <h1 className="text-3xl font-bold">AyurSutra स्वतः नियोजन</h1>
        <p className="text-muted-foreground">AI-समर्थित पंचकर्म अपॉइंटमेंट योजना</p>
      </div>
    </div>

    {/* Smart Suggestions */}
    <Card className="medical-card">
      <CardHeader>
        <CardTitle>अनुशंसित उपचार सत्र</CardTitle>
        <CardDescription>आपकी प्राथमिकताओं और उपचार योजना के आधार पर</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestedSlots.map((slot) => (
            <div key={slot.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{slot.therapy}</h3>
                    <Badge variant="secondary">{slot.match}% मेल</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{slot.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{slot.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{slot.practitioner}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{slot.room}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button size="sm" className="gap-2">
                    <CheckCircle className="w-4 h-4" />
                    बुक करें
                  </Button>
                  <Button variant="outline" size="sm">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Current Appointments */}
    <Card className="medical-card">
      <CardHeader>
        <CardTitle>आगामी सत्र</CardTitle>
        <CardDescription>आपके पुष्टि किए गए सत्र</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {upcomingAppointments.map((appointment, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-primary/5 border border-primary/10 rounded-lg"
            >
              <div>
                <p className="font-medium">{appointment.therapy}</p>
                <p className="text-sm text-muted-foreground">{appointment.date} को {appointment.time}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">{appointment.status}</Badge>
                <Button variant="outline" size="sm">
                  पुनर्नियोजित करें
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Scheduling Preferences */}
    <Card className="medical-card">
      <CardHeader>
        <CardTitle>आपकी प्राथमिकताएं</CardTitle>
        <CardDescription>अपनी योजना प्राथमिकताएं सेट करें</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="font-medium">पसंदीदा समय</p>
              <p className="text-sm text-muted-foreground">{preferences.preferredTime}</p>
            </div>
            <div>
              <p className="font-medium">पसंदीदा दिन</p>
              <div className="flex gap-2 mt-1">
                {preferences.preferredDays.map((day) => (
                  <Badge key={day} variant="outline">
                    {day}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="font-medium">पसंदीदा चिकित्सक</p>
              <p className="text-sm text-muted-foreground">{preferences.preferredPractitioner}</p>
            </div>
            <div>
              <p className="font-medium">सेशन की अवधि</p>
              <p className="text-sm text-muted-foreground">{preferences.duration}</p>
            </div>
          </div>
        </div>
        <Button variant="outline" className="mt-4">
          प्राथमिकताएं अपडेट करें
        </Button>
      </CardContent>
    </Card>
  </div>
);
                }