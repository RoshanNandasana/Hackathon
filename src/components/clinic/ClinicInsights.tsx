import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, Users, Calendar, DollarSign, Activity } from 'lucide-react';

export const ClinicInsights = () => {
  const metrics = [
    { label: 'Total Patients', value: '148', change: '+12%', icon: Users },
    { label: 'Monthly Sessions', value: '324', change: '+8%', icon: Calendar },
    { label: 'Revenue', value: '$45.2K', change: '+15%', icon: DollarSign },
    { label: 'Occupancy Rate', value: '87%', change: '+3%', icon: Activity }
  ];

  const therapyPopularity = [
    { name: 'Panchakarma Detox', sessions: 85, percentage: 26 },
    { name: 'Abhyanga Massage', sessions: 72, percentage: 22 },
    { name: 'Shirodhara', sessions: 68, percentage: 21 },
    { name: 'Consultations', sessions: 54, percentage: 17 },
    { name: 'Other Therapies', sessions: 45, percentage: 14 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Clinic Insights</h1>
          <p className="text-muted-foreground">Analytics and performance metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="medical-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                  </div>
                  <div className="text-right">
                    <IconComponent className="w-8 h-8 text-primary mb-2" />
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">{metric.change}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Analytics Overview</CardTitle>
          <CardDescription>Key performance indicators and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">Interactive Analytics Dashboard</p>
              <p className="text-sm text-muted-foreground">Charts and insights coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Therapy Popularity</CardTitle>
          <CardDescription>Most requested treatments this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {therapyPopularity.map((therapy, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{therapy.name}</span>
                  <span>{therapy.sessions} sessions ({therapy.percentage}%)</span>
                </div>
                <Progress value={therapy.percentage} className="progress-glow" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};