import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Activity, 
  Search,
  Filter,
  Eye,
  FileText
} from 'lucide-react';

export const PatientRecordsAnalytics = () => {
  const overallMetrics = [
    { label: 'Total Patients', value: '48', change: '+12%', trend: 'up' },
    { label: 'Active Treatments', value: '32', change: '+8%', trend: 'up' },
    { label: 'Completed Programs', value: '16', change: '+25%', trend: 'up' },
    { label: 'Average Progress', value: '78%', change: '+5%', trend: 'up' },
  ];

  const patientData = [
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 34,
      condition: 'Chronic Stress',
      program: 'Panchakarma Detox',
      progress: 85,
      lastVisit: '2 days ago',
      status: 'active',
      sessions: 12
    },
    {
      id: 2,
      name: 'Michael Chen',
      age: 42,
      condition: 'Digestive Issues',
      program: 'Digestive Healing',
      progress: 92,
      lastVisit: '1 week ago',
      status: 'completing',
      sessions: 8
    },
    {
      id: 3,
      name: 'Emily Davis',
      age: 28,
      condition: 'Sleep Disorders',
      program: 'Stress Relief',
      progress: 65,
      lastVisit: '3 days ago',
      status: 'active',
      sessions: 6
    },
    {
      id: 4,
      name: 'Robert Wilson',
      age: 56,
      condition: 'Joint Pain',
      program: 'Pain Management',
      progress: 78,
      lastVisit: '1 day ago',
      status: 'active',
      sessions: 10
    }
  ];

  const treatmentTypes = [
    { name: 'Panchakarma Detox', patients: 18, percentage: 37.5 },
    { name: 'Stress Relief', patients: 12, percentage: 25 },
    { name: 'Digestive Healing', patients: 8, percentage: 16.7 },
    { name: 'Pain Management', patients: 6, percentage: 12.5 },
    { name: 'Women\'s Health', patients: 4, percentage: 8.3 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completing':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Patient Records Analytics</h1>
            <p className="text-muted-foreground">Comprehensive patient data insights</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button className="gap-2">
            <FileText className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overallMetrics.map((metric, index) => (
          <Card key={index} className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">{metric.change}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Chart Placeholder */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Patient Progress Trends</CardTitle>
          <CardDescription>Recovery rates and treatment effectiveness over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">Interactive Analytics Chart</p>
              <p className="text-sm text-muted-foreground">Patient progress visualization coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Distribution */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Treatment Program Distribution</CardTitle>
          <CardDescription>Breakdown of active treatment programs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {treatmentTypes.map((treatment, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{treatment.name}</span>
                  <span>{treatment.patients} patients ({treatment.percentage}%)</span>
                </div>
                <Progress value={treatment.percentage} className="progress-glow" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Patient Records Table */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Active Patient Records</CardTitle>
          <CardDescription>Current patient status and progress overview</CardDescription>
          <div className="flex gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search patients..." className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="space-y-4">
              {patientData.map((patient) => (
                <div key={patient.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-3">
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">Age: {patient.age}</p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium">{patient.condition}</p>
                      <p className="text-xs text-muted-foreground">{patient.sessions} sessions</p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <p className="text-sm">{patient.program}</p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{patient.progress}%</span>
                        </div>
                        <Progress value={patient.progress} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <Badge className={getStatusColor(patient.status)}>
                        {patient.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{patient.lastVisit}</p>
                    </div>
                    
                    <div className="md:col-span-1">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};