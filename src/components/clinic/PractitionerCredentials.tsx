import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  UserCheck,
  Upload,
  CheckCircle,
  AlertTriangle,
  Search,
} from "lucide-react";

export const PractitionerCredentials = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const practitioners = [
    {
      name: "Dr. Suresh Kumar",
      license: "AY-12345",
      status: "verified",
      expiry: "2025-12-01",
      specialization: "Panchakarma",
    },
    {
      name: "Dr. Rajesh Patel",
      license: "AY-67890",
      status: "pending",
      expiry: "2025-10-15",
      specialization: "Ayurvedic Medicine",
    },
    {
      name: "Dr. Meera Shah",
      license: "AY-11111",
      status: "verified",
      expiry: "2025-08-30",
      specialization: "Herbal Medicine",
    },
  ];

  const filteredPractitioners = practitioners.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.license.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="medical-gradient w-14 h-14 flex items-center justify-center rounded-lg shadow-lg">
            <UserCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold leading-tight">
              Practitioner Credentials
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Verify and manage practitioner certifications effectively with
              ease.
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="medical-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
            <div>
              <CardTitle>Credential Verification</CardTitle>
              <CardDescription>
                Manage practitioner licenses and certifications
              </CardDescription>
            </div>
            <div className="mt-4 md:mt-0 w-full md:w-80 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="search"
                placeholder="Search practitioners..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search Practitioners"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {filteredPractitioners.length === 0 ? (
            <p className="text-center py-6 text-muted-foreground text-lg">
              No practitioners found.
            </p>
          ) : (
            <div className="space-y-4">
              {filteredPractitioners.map((practitioner, index) => (
                <div
                  key={index}
                  className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
                >
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-center">
                    <div className="md:col-span-2">
                      <h3 className="text-xl font-semibold text-gray-900 truncate">
                        {practitioner.name}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {practitioner.specialization}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 truncate">
                        License: {practitioner.license}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground truncate">
                        Expires: {practitioner.expiry}
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <Badge
                        variant={
                          practitioner.status === "verified"
                            ? "default"
                            : "secondary"
                        }
                        className="capitalize flex items-center gap-1 px-3 py-1"
                        aria-label={`License ${practitioner.status}`}
                      >
                        {practitioner.status === "verified" ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        )}
                        {practitioner.status}
                      </Badge>
                    </div>
                    <div className="flex gap-3 justify-end md:justify-start">
                      <Button variant="outline" size="sm" aria-label={`View ${practitioner.name}`}>
                        View
                      </Button>
                      <Button variant="secondary" size="sm" aria-label={`Edit ${practitioner.name}`}>
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
