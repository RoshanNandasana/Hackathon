import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Clock, AlertTriangle, CheckCircle, Calendar, Pill } from 'lucide-react';

export const TherapyAlerts = () => {
  const alerts = [
    {
      id: 1,
      type: 'appointment',
      title: 'Upcoming Session Reminder',
      message: 'Shirodhara therapy scheduled for tomorrow at 2:00 PM',
      time: '24 hours',
      priority: 'High',
      icon: Calendar,
      color: 'text-primary',
    },
    {
      id: 2,
      type: 'medication',
      title: 'Take Your Supplements',
      message: 'You need to take Ashwagandha this evening',
      time: '6:00 PM Today',
      priority: 'Medium',
      icon: Pill,
      color: 'text-secondary',
    },
    {
      id: 3,
      type: 'preparation',
      title: 'Preparation Reminder Before Session',
      message: 'Remember to take a light meal 2 hours before your session',
      time: 'Tomorrow at 12:00 PM',
      priority: 'Medium',
      icon: AlertTriangle,
      color: 'text-accent',
    },
    {
      id: 4,
      type: 'follow-up',
      title: 'Post-Session Care',
      message: 'Time to drink warm water and rest for 30 minutes',
      time: 'After your next session',
      priority: 'Low',
      icon: CheckCircle,
      color: 'text-muted-foreground',
    },
  ];

  const alertSettings = [
    { name: 'Session Reminders', enabled: true, timing: '24 hours before' },
    { name: 'Medication Instructions', enabled: true, timing: 'At scheduled times' },
    { name: 'Preparation Alerts', enabled: true, timing: '2 hours before' },
    { name: 'Post-Care Notifications', enabled: false, timing: 'After session' },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 border-yellow-200';
      default:
        return 'bg-blue-100 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center">
          <Bell className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Therapy Alerts</h1>
          <p className="text-muted-foreground">Stay on track with your health journey</p>
        </div>
      </div>

      {/* Active Alerts */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
          <CardDescription>Important reminders and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => {
              const IconComponent = alert.icon;
              return (
                <div key={alert.id} className={`p-4 rounded-lg border ${getPriorityColor(alert.priority)}`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full bg-white ${alert.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{alert.title}</h3>
                      
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{alert.time}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Dismiss
                          </Button>
                          <Button size="sm">
                            Accept
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Alert Settings */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Alert Preferences</CardTitle>
          <CardDescription>Customize your notification settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertSettings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{setting.name}</p>
                  <p className="text-sm text-muted-foreground">{setting.timing}</p>
                </div>
                <div className="flex items-center gap-3">
                  
                  <Button variant="outline" size="sm">
                    {setting.enabled ? 'Disable' : 'Enable'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your alerts efficiently</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <CheckCircle className="w-6 h-6" />
              <span>Mark All as Read</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Bell className="w-6 h-6" />
              <span>Check Connection Status</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Clock className="w-6 h-6" />
              <span>Snooze All</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
