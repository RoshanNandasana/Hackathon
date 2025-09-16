import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Heart, AlertCircle, Pill, Activity, Edit } from 'lucide-react';

export const MedicalProfile = () => {
  const medicalInfo = {
    conditions: ['Chronic Stress', 'Digestive Issues', 'Sleep Disorders'],
    allergies: ['No known allergies'],
    medications: ['Ashwagandha Herbal Supplement', 'Triphala Digestive Tea'],
    emergencyContact: {
      name: 'Ramesh Kumar',
      relationship: 'Brother',
      phone: '+91 98765 43210'
    }
  };

  const vitalSigns = [
    { label: 'Blood Pressure', value: '120/80 mmHg', status: 'Normal' },
    { label: 'Heart Rate', value: '72 bpm', status: 'Normal' },
    { label: 'Temperature', value: '98.6°F', status: 'Normal' },
    { label: 'Weight', value: '70 kg', status: 'Stable' },
  ];

  const recentTests = [
    { name: 'Prakriti Assessment', date: '1 Nov 2024', result: 'Vata-Pitta Constitution' },
    { name: 'Nadi Pariksha (Pulse Diagnosis)', date: '1 Nov 2024', result: 'Doshas Balanced' },
    { name: 'Jihva Pariksha (Tongue Examination)', date: '1 Nov 2024', result: 'Mild Ama detected' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Medical Profile</h1>
            <p className="text-muted-foreground">Your comprehensive health information</p>
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Edit className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>

      {/* Medical Conditions & Allergies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Medical Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {medicalInfo.conditions.map((condition, index) => (
                <Badge key={index} variant="outline" className="mr-2 mb-2">
                  {condition}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Allergies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {medicalInfo.allergies.map((allergy, index) => (
                <Badge key={index} variant="secondary" className="mr-2 mb-2">
                  {allergy}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Medications */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="w-5 h-5" />
            Current Medications & Supplements
          </CardTitle>
          <CardDescription>Prescribed treatments and supplements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {medicalInfo.medications.map((medication, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span>{medication}</span>
                <Badge variant="outline">Active</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vital Signs */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Vital Signs
          </CardTitle>
          <CardDescription>Latest measurements from your visit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {vitalSigns.map((vital, index) => (
              <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">{vital.label}</p>
                <p className="text-xl font-bold mt-1">{vital.value}</p>
                <Badge variant="secondary" className="mt-2">
                  {vital.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Assessments */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Recent Ayurvedic Assessments</CardTitle>
          <CardDescription>Traditional diagnostic evaluations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTests.map((test, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{test.name}</p>
                  <p className="text-sm text-muted-foreground">{test.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{test.result}</p>
                  <Button variant="ghost" size="sm" className="mt-1">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Emergency Contact</CardTitle>
          <CardDescription>Person to contact in case of emergency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>Name:</strong> {medicalInfo.emergencyContact.name}</p>
            <p><strong>Relationship:</strong> {medicalInfo.emergencyContact.relationship}</p>
            <p><strong>Phone:</strong> {medicalInfo.emergencyContact.phone}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
