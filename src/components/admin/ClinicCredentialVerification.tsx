import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Clinic {
  id: number;
  name: string;
  contactPerson?: string;
  industry?: string;
  phone?: string;
  email?: string;
  website?: string;
  status: string;
  country?: string;
  licenseNumber?: string;
  registration?: {
    country: string;
    number: string;
  };
  documents?: Array<{
    label: string;
    submitted: boolean;
    type: string;
    url: string;
  }>;
  submittedAt?: string;
  statusDetailed?: string;
}

const clinicsList: Clinic[] = [
  {
    id: 1,
    name: "Veronica Wellness Center",
    status: "Pending verification",
    contactPerson: "Dr. Anil Mehra",
    industry: "Ayurveda & Wellness",
    phone: "+91 98765 43210",
    email: "contact@veronicawellness.com",
    website: "www.veronicawellness.com",
    country: "India",
    licenseNumber: "AYU-IND-2025",
    registration: { country: "India", number: "AY/BRC/IND/00918" },
    documents: [
      { label: "ID/Passport: Front", submitted: true, type: "ID_FRONT", url: "/docs/id_front.pdf" },
      { label: "ID/Passport: Back", submitted: true, type: "ID_BACK", url: "/docs/id_back.pdf" },
      { label: "Selfie (For Individuals)", submitted: true, type: "SELFIE", url: "/docs/selfie.pdf" },
      { label: "Business License", submitted: true, type: "LICENSE", url: "/docs/business_license.pdf" },
    ],
    submittedAt: "2025-08-20",
    statusDetailed: "Pending",
  },
  {
    id: 2,
    name: "Ayush Wellness Center - Delhi",
    status: "Verified",
  },
  {
    id: 3,
    name: "Herbal Care Clinic - Mumbai",
    status: "Pending verification",
  },
  {
    id: 4,
    name: "Nature’s Heal - Bangalore",
    status: "Verified",
  },
  {
    id: 5,
    name: "Ayurveda Wellness - Pune",
    status: "Pending verification",
  },
  {
    id: 6,
    name: "Healing Touch Clinic - Chennai",
    status: "Verified",
  },
  {
    id: 7,
    name: "Swasthya Kendra - Hyderabad",
    status: "Pending verification",
  },
];

export const ClinicVerificationManager: React.FC = () => {
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [decisionNote, setDecisionNote] = useState("");

  if (selectedClinic) {
    return (
      <div className="flex flex-col lg:flex-row gap-12 p-8 max-w-6xl mx-auto">
        <div className="flex-1 min-w-[370px]">
          <button className="text-sm text-primary mb-4" onClick={() => setSelectedClinic(null)}>
            &larr; Back to Clinics
          </button>
          <h1 className="text-4xl font-bold mb-2">{selectedClinic.name}</h1>
          <div className="text-base grid grid-cols-2 gap-x-8 gap-y-1 mb-4 max-w-xl">
            {selectedClinic.contactPerson && (
              <>
                <span className="font-medium">Contact Person:</span>
                <span>{selectedClinic.contactPerson}</span>
              </>
            )}
            {selectedClinic.industry && (
              <>
                <span className="font-medium">Industry:</span>
                <span>{selectedClinic.industry}</span>
              </>
            )}
            {selectedClinic.phone && (
              <>
                <span className="font-medium">Phone:</span>
                <span>{selectedClinic.phone}</span>
              </>
            )}
            {selectedClinic.email && (
              <>
                <span className="font-medium">Email:</span>
                <span>{selectedClinic.email}</span>
              </>
            )}
            {selectedClinic.website && (
              <>
                <span className="font-medium">Website:</span>
                <span>{selectedClinic.website}</span>
              </>
            )}
            <span className="font-medium">Status:</span>
            <span>{selectedClinic.status}</span>
          </div>

          <Button className="bg-muted text-foreground w-fit my-1">Write a Message</Button>

          <div className="mt-8">
            <div className="flex border-b gap-8">
              <button className="border-b-2 border-primary font-medium pb-1">Documents</button>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Documents</h3>
              <ul className="space-y-1">
                {selectedClinic.documents?.map((doc, idx) => (
                  <li key={idx} className={doc.submitted ? "text-foreground" : "text-muted-foreground"}>
                    {doc.label}
                    {doc.submitted && (
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-primary underline"
                      >
                        View
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              <div className="text-sm text-muted-foreground mt-2">
                Submitted: <span>{selectedClinic.submittedAt}</span><br />
                Status: <span>{selectedClinic.statusDetailed}</span>
              </div>
              <div className="flex gap-4 mt-4 max-w-lg">
                <Button onClick={() => alert(`Approved ${selectedClinic.name}\nNote: ${decisionNote}`)} className="bg-green-600 hover:bg-green-700" variant="default">Approve</Button>
                <Button onClick={() => alert(`Denied ${selectedClinic.name}\nNote: ${decisionNote}`)} className="bg-red-600 hover:bg-red-700" variant="destructive">Deny</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[350px] space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Company Registration Number:</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-y-2">
                <div>
                  <span className="text-muted-foreground">Country:</span>
                  <span className="ml-2">{selectedClinic.registration?.country || "N/A"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">HRB / (VAT):</span>
                  <span className="ml-2">{selectedClinic.registration?.number || "N/A"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 flex flex-col gap-4">
              <textarea
                className="border border-muted w-full min-h-[75px] rounded-lg p-2"
                value={decisionNote}
                onChange={(e) => setDecisionNote(e.target.value)}
                placeholder="Add a note for this verification decision"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Clinics for Verification</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {clinicsList.map((clinic) => (
          <Card
            key={clinic.id}
            className="medical-card hover:shadow-lg cursor-pointer"
            onClick={() => setSelectedClinic(clinic)}
          >
            <CardHeader>
              <CardTitle>{clinic.name}</CardTitle>
              <CardDescription>Status: {clinic.status}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
