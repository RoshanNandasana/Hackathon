import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const clinics = [
  {
    id: 1,
    name: "Ayush Wellness Center - Delhi",
    licenseNumber: "AY-DEL-234",
    verified: true,
    verificationDate: "2024-11-10",
    documents: ["License.pdf", "SafetyCert.pdf"],
  },
  {
    id: 2,
    name: "Herbal Care Clinic - Mumbai",
    licenseNumber: "AY-MUM-198",
    verified: false,
    verificationDate: null,
    documents: ["License.pdf"],
  },
];

export const ClinicVerification = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-semibold">Clinic Credential Verification</h2>
    <div className="grid md:grid-cols-2 gap-6">
      {clinics.map((clinic) => (
        <Card key={clinic.id} className="medical-card hover:shadow-lg">
          <CardHeader>
            <CardTitle>{clinic.name}</CardTitle>
            <CardDescription>License No: {clinic.licenseNumber}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Status:{" "}
              {clinic.verified ? (
                <Badge variant="default">Verified</Badge>
              ) : (
                <Badge variant="destructive">Not Verified</Badge>
              )}
            </p>
            {clinic.verificationDate && (
              <p>Verified on: {clinic.verificationDate}</p>
            )}
            <p className="mt-2 font-semibold">Documents:</p>
            <ul className="list-disc list-inside">
              {clinic.documents.map((doc, idx) => (
                <li key={idx}>
                  <a href={`/${doc}`} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                    {doc}
                  </a>
                </li>
              ))}
            </ul>
            {!clinic.verified && (
              <Button variant="outline" className="mt-4">
                Verify Now
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
