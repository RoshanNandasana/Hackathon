import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ClipboardList } from 'lucide-react';

export const TherapyPlanner = () => {
  const therapies = [
    { id: 'abhyanga', name: 'Abhyanga Massage', description: 'Full body oil massage' },
    { id: 'shirodhara', name: 'Shirodhara', description: 'Oil pouring on forehead' },
    { id: 'udvartana', name: 'Udvartana', description: 'Herbal powder massage' },
    { id: 'nasya', name: 'Nasya', description: 'Nasal administration' },
    { id: 'basti', name: 'Basti', description: 'Medicated enema' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center">
          <ClipboardList className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Therapy Planner</h1>
          <p className="text-muted-foreground">Create customized treatment plans</p>
        </div>
      </div>

      <Card className="medical-card">
        <CardHeader>
          <CardTitle>New Treatment Plan</CardTitle>
          <CardDescription>Select therapies for your patient</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patient">Patient Name</Label>
              <Input id="patient" placeholder="Enter patient name" />
            </div>
            <div>
              <Label htmlFor="duration">Treatment Duration</Label>
              <Input id="duration" placeholder="e.g., 2 weeks" />
            </div>
          </div>

          <div>
            <Label className="text-base font-medium">Select Therapies</Label>
            <div className="space-y-4 mt-4">
              {therapies.map((therapy) => (
                <div key={therapy.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Checkbox id={therapy.id} />
                  <div className="grid gap-1.5 leading-none flex-1">
                    <label
                      htmlFor={therapy.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {therapy.name}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {therapy.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button>Create Plan</Button>
            <Button variant="outline">Save Draft</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};