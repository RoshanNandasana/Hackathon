import { Building2, MapPin, Phone, Mail, Users, Bed } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ClinicFacility = () => {
  const facilityInfo = {
    name: "Panchakarma Wellness Center",
    address: "Opp Mn School near VIP Circle,Utran,Surat",
    phone: "+91 98765 43210",
    email: "info@pancharmacare.in",
    capacity: 50,
    rooms: 8,
    practitioners: 6,
  };

  const facilities = [
    { name: "Treatment Rooms", count: 8, status: "operational" },
    { name: "Consultation Rooms", count: 3, status: "operational" },
    { name: "Meditation Hall", count: 1, status: "operational" },
    { name: "Herbal Pharmacy", count: 1, status: "operational" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Clinic Facility</h1>
          <p className="text-muted-foreground">Facility information and status</p>
        </div>
      </div>

      {/* Facility Info */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Facility Information</CardTitle>
          <CardDescription>Basic clinic details and contact information</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-muted-foreground" />
                <span>{facilityInfo.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">{facilityInfo.address}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">{facilityInfo.phone}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">{facilityInfo.email}</span>
              </div>
            </section>

            <section className="grid grid-cols-3 gap-4">
              <div className="text-center bg-muted/30 rounded-lg p-4">
                <Users className="mx-auto mb-3 h-8 w-8 text-primary" />
                <p className="mb-1 text-2xl font-bold">{facilityInfo.practitioners}</p>
                <p className="text-sm">Practitioners</p>
              </div>

              <div className="text-center bg-muted/30 rounded-lg p-4">
                <Bed className="mx-auto mb-3 h-8 w-8 text-secondary" />
                <p className="mb-1 text-2xl font-bold">{facilityInfo.rooms}</p>
                <p className="text-sm">Treatment Rooms</p>
              </div>

              <div className="text-center bg-muted/30 rounded-lg p-4">
                <Building2 className="mx-auto mb-3 h-8 w-8 text-accent" />
                <p className="mb-1 text-2xl font-bold">{facilityInfo.capacity}</p>
                <p className="text-sm">Daily Capacity</p>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>

      {/* Facility Status */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Facility Status</CardTitle>
          <CardDescription>Current operational status of facility areas</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {facilities.map((facility, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">{facility.name}</p>
                  <p className="text-sm">Count: {facility.count}</p>
                </div>

                <Badge variant="default" className="bg-green-100 text-green-800">
                  {facility.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

