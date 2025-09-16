import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Clock, AlertTriangle, CheckCircle, Calendar, Pill } from 'lucide-react';

export const TherapyAlerts = () => {
  const alerts = [
    {
      id: 1,
      type: 'appointment',
      title: 'આગામી સત્રની યાદગીરી',
      message: 'શિરોધારા થેરાપી આવતીકાલે 2:00 વાગ્યે નિર્ધારિત છે',
      time: '24 કલાક',
      priority: 'ઉચ્ચ',
      icon: Calendar,
      color: 'text-primary'
    },
    {
      id: 2,
      type: 'medication',
      title: 'તમારા સાપલમેન્ટ્સ લો',
      message: 'આજ સાંજે તમને આશ્વગંધા લેવાનું છે',
      time: '6:00 વાગ્યે આજે',
      priority: 'મધ્યમ',
      icon: Pill,
      color: 'text-secondary'
    },
    {
      id: 3,
      type: 'preparation',
      title: 'ચારથી પહેલાં તૈયારીની યાદ',
      message: 'તમારા સત્ર પહેલા 2 કલાક પહેલા હલકો ભોજન લેવા યાદ રાખો',
      time: 'આવતીકાલે 12:00 વાગ્યે',
      priority: 'મધ્યમ',
      icon: AlertTriangle,
      color: 'text-accent'
    },
    {
      id: 4,
      type: 'follow-up',
      title: 'સત્ર પછીની કાળજી',
      message: 'ગરમ પાણી પીવાની અને 30 મિનિટ આરામ કરવાની વખત છે',
      time: 'તમારા આગામી સત્ર પછી',
      priority: 'ઓછો',
      icon: CheckCircle,
      color: 'text-muted-foreground'
    }
  ];

  const alertSettings = [
    { name: 'સત્રની યાદીઓ', enabled: true, timing: '24 કલાક પહેલા' },
    { name: 'દવા માટે સૂચનાઓ', enabled: true, timing: 'નિયમિત સમય પર' },
    { name: 'તૈયારી યાદીઓ', enabled: true, timing: '2 કલાક પહેલા' },
    { name: 'પોસ્ટ-કાળજી સૂચનાઓ', enabled: false, timing: 'સત્ર પછી' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'ઉચ્ચ':
        return 'bg-red-100 border-red-200';
      case 'મધ્યમ':
        return 'bg-yellow-100 border-yellow-200';
      default:
        return 'bg-blue-100 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* હેડર */}
      <div className="flex items-center gap-3">
        <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center">
          <Bell className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">થેરાપી એલર્ટ્સ</h1>
          <p className="text-muted-foreground">તમારી આરોગ્ય યાત્રા પર રહો</p>
        </div>
      </div>

      {/* સક્રિય એલર્ટ્સ */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>સક્રિય એલર્ટ્સ</CardTitle>
          <CardDescription>મહત્વપૂર્ણ યાદીઓ અને સૂચનાઓ</CardDescription>
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
                        <Badge variant={alert.priority === 'ઉચ્ચ' ? 'destructive' : 'secondary'}>
                          {alert.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{alert.time}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                          બરતરફ
                          </Button>
                          <Button size="sm">
                          સ્વીકારો
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

      {/* એલર્ટ સેટિંગ્સ */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>એલર્ટ પ્રાધાન્યતાઓ</CardTitle>
          <CardDescription>તમારા સૂચના સેટિંગ્સને કસ્ટમાઇઝ કરો</CardDescription>
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
                  <Badge variant={setting.enabled ? 'default' : 'secondary'}>
                    {setting.enabled ? 'સક્રિય' : 'નલ્ગા'}
                  </Badge>
                  <Button variant="outline" size="sm">
                    {setting.enabled ? 'નિવારણ કરો' : 'સક્રિય કરો'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ઝડપી ક્રિયાઓ */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>ઝડપી ક્રિયાઓ</CardTitle>
          <CardDescription>તમારા એલર્ટ્સને અસરકારક રીતે મેનેજ કરો</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <CheckCircle className="w-6 h-6" />
              <span>બધા વાંચાયા તરીકે ચિહ્નિત કરો</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Bell className="w-6 h-6" />
              <span>જોડાણ સૂચનાઓ તપાસો</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Clock className="w-6 h-6" />
              <span>બધા સ્નૂઝ કરો</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
