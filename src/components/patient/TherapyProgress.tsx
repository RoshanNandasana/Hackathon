import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, Clock, TrendingUp, Calendar } from 'lucide-react';

export const TherapyProgress = () => {
  const therapySteps = [
    { id: 1, name: 'Consultation & Assessment', status: 'completed', date: '1 Nov' },
    { id: 2, name: 'Preparatory Treatments', status: 'completed', date: '5 Nov' },
    { id: 3, name: 'Main Panchakarma Therapies', status: 'in-progress', date: '10 Nov - 25 Nov' },
    { id: 4, name: 'Post-Treatment Care', status: 'upcoming', date: '26 Nov - 10 Dec' },
    { id: 5, name: 'Follow-up & Maintenance', status: 'upcoming', date: '11 Dec+' },
  ];

  const nextSession = {
    therapy: 'Shirodhara',
    date: 'Tomorrow, 2:00 PM',
    practitioner: 'Dr. Suresh Kumar',
    duration: '60 minutes',
    room: 'Chikitsa Kaksh 3',
  };

  const getStepIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-primary" />;
      default:
        return <Circle className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 border-green-200';
      case 'in-progress':
        return 'bg-primary/10 border-primary/20';
      default:
        return 'bg-muted/50 border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Therapy Progress</h1>
          <p className="text-muted-foreground">Track your healing journey step by step</p>
        </div>
      </div>

      {/* Overall Progress */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Overall Treatment Progress</CardTitle>
          <CardDescription>You've completed 60% of your Panchakarma program</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={60} className="progress-glow h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Started: 1 Nov, 2024</span>
              <span>Expected completion: 10 Dec, 2024</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Therapy Steps */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Treatment Phases</CardTitle>
          <CardDescription>Your complete Panchakarma journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {therapySteps.map((step, index) => (
              <div key={step.id} className={`p-4 rounded-lg border ${getStepColor(step.status)}`}>
                <div className="flex items-center gap-4">
                  {getStepIcon(step.status)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{step.name}</h3>
                      <Badge variant={step.status === 'completed' ? 'default' : 'secondary'}>
                        {step.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{step.date}</p>
                  </div>
                </div>
                {index < therapySteps.length - 1 && <div className="ml-3 mt-4 h-8 w-px bg-border" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Session */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Next Session
          </CardTitle>
          <CardDescription>Your upcoming therapy appointment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-primary/5 border border-primary/10 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold text-lg">{nextSession.therapy}</h3>
                  <p className="text-muted-foreground">{nextSession.date}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong>Practitioner:</strong> {nextSession.practitioner}</p>
                  <p><strong>Duration:</strong> {nextSession.duration}</p>
                  <p><strong>Location:</strong> {nextSession.room}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">Reschedule</Button>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
