import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Heart, BarChart3 } from 'lucide-react';

export const HealthAnalytics = () => {
  const recentSessions = [
    { date: 'Nov 15', therapy: 'Abhyanga', improvement: '+12%' },
    { date: 'Nov 12', therapy: 'Shirodhara', improvement: '+8%' },
    { date: 'Nov 10', therapy: 'Udvartana', improvement: '+15%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Health Analytics</h1>
          <p className="text-muted-foreground">Data will be available after AI model training</p>
        </div>
      </div>

      {/* Model Training Status Card */}
      <Card className="medical-card">
        <CardContent className="text-center space-y-4 p-10">
          <Heart className="mx-auto w-14 h-14 text-muted-foreground" />
          <p className="text-lg font-semibold">
            Health analytics and insights will be displayed here once the AI-powered feedback model has been trained and validated.
          </p>
          <p className="text-sm text-muted-foreground italic">
            This AI model uses patient feedback and session data to provide personalized wellness insights.
          </p>
        </CardContent>
      </Card>

      {/* Placeholder for future charts */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Wellness Trends (Coming Soon)
          </CardTitle>
          <CardDescription>Your personalized health improvement data over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">Interactive charts will appear here after model deployment.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Session Impact */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Recent Session Impact
          </CardTitle>
          <CardDescription>How each therapy session improved your wellbeing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div>
                    <p className="font-medium">{session.therapy}</p>
                    <p className="text-sm text-muted-foreground">{session.date}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {session.improvement}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
