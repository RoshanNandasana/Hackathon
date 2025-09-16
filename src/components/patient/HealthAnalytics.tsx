import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Activity, Heart, TrendingUp, BarChart3 } from 'lucide-react';

export const HealthAnalytics = () => {
  const healthMetrics = [
    { name: 'Stress Level', value: 35, target: 20, status: 'improving' },
    { name: 'Sleep Quality', value: 78, target: 85, status: 'good' },
    { name: 'Energy Level', value: 82, target: 90, status: 'excellent' },
    { name: 'Digestive Health', value: 65, target: 80, status: 'improving' },
  ];

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
          <p className="text-muted-foreground">Track your wellness journey</p>
        </div>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {healthMetrics.map((metric) => (
          <Card key={metric.name} className="medical-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                {metric.name}
                <Badge variant={metric.status === 'excellent' ? 'default' : 'secondary'}>
                  {metric.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Current: {metric.value}%</span>
                  <span>Target: {metric.target}%</span>
                </div>
                <Progress value={metric.value} className="progress-glow" />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  <span>Trending upward</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Chart Placeholder */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Wellness Trends
          </CardTitle>
          <CardDescription>Your health improvements over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">Interactive Chart Coming Soon</p>
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