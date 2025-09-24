import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, AlertCircle } from "lucide-react";

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
  gmpCert?: string;
  nabhAccred?: string;
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
    gmpCert: "GMP-12345",
    nabhAccred: "NABH-67890",
    registration: { country: "India", number: "AY/BRC/IND/00918" },
    documents: [
      { label: "AYUSH License", submitted: true, type: "AYUSH_LICENSE", url: "/docs/ayush_license.pdf" },
      { label: "GMP Certification", submitted: true, type: "GMP_CERT", url: "/docs/gmp_cert.pdf" },
      { label: "NABH Accreditation", submitted: true, type: "NABH_ACCRED", url: "/docs/nabh_accred.pdf" },
      { label: "Business License", submitted: true, type: "LICENSE", url: "/docs/business_license.pdf" },
    ],
    submittedAt: "2025-08-20",
    statusDetailed: "Pending",
  },
  { id: 2, name: "Ayush Wellness Center - Delhi", status: "Verified" },
  { id: 3, name: "Herbal Care Clinic - Mumbai", status: "Pending verification" },
  { id: 4, name: "Nature’s Heal - Bangalore", status: "Verified" },
  { id: 5, name: "Ayurveda Wellness - Pune", status: "Pending verification" },
  { id: 6, name: "Healing Touch Clinic - Chennai", status: "Verified" },
  { id: 7, name: "Swasthya Kendra - Hyderabad", status: "Pending verification" },
];

// Progress Component
const Progress: React.FC<{ value: number; className?: string }> = ({ value, className }) => (
  <div className={`w-full bg-gray-200 rounded-full h-3 ${className}`}>
    <div
      className="bg-green-600 h-3 rounded-full"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

export const ClinicVerificationManager: React.FC = () => {
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [decisionNote, setDecisionNote] = useState("");
  const [ayushLicense, setAyushLicense] = useState("");
  const [gmpCert, setGmpCert] = useState("");
  const [nabhAccred, setNabhAccred] = useState("");
  const [branchUrl, setBranchUrl] = useState("");
  const [result, setResult] = useState<JSX.Element | null>(null);
  const [filter, setFilter] = useState("All");

  const handleClinicSelect = (clinic: Clinic) => {
    setSelectedClinic(clinic);
    setAyushLicense(clinic.licenseNumber || "");
    setGmpCert(clinic.gmpCert || "");
    setNabhAccred(clinic.nabhAccred || "");
    setBranchUrl(clinic.website || "");
    setResult(null);
  };

  const checkCompliance = async () => {
    let resultHtml: JSX.Element[] = [
      <h3 key="title" className="font-semibold mb-2">
        Compliance Check Results
      </h3>,
    ];
    resultHtml.push(await verifyAyushLicense(ayushLicense, selectedClinic!.name));
    resultHtml.push(await verifyGmpCertification(gmpCert, selectedClinic!.name));
    resultHtml.push(await verifyNabhAccreditation(nabhAccred, selectedClinic!.name));
    if (branchUrl) {
      resultHtml.push(await verifyBranchClinic(branchUrl, selectedClinic!.name));
    } else {
      resultHtml.push(
        <p key="branch-skip">
          Branch Clinic Verification:{" "}
          <span className="text-green-600 font-bold">Skipped (No URL provided)</span>
        </p>
      );
    }
    setResult(<div>{resultHtml}</div>);
  };

  const verifyAyushLicense = async (licenseNumber: string, clinicName: string) => {
    await new Promise((r) => setTimeout(r, 1000));
    return (
      <p key="ayush">
        AYUSH License:{" "}
        <span className={licenseNumber ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
          {licenseNumber ? "Valid" : "Invalid"}
        </span>
      </p>
    );
  };
  const verifyGmpCertification = async (certId: string, clinicName: string) => {
    await new Promise((r) => setTimeout(r, 1000));
    return (
      <p key="gmp">
        GMP Certification:{" "}
        <span className={certId ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
          {certId ? "Valid" : "Invalid"}
        </span>
      </p>
    );
  };
  const verifyNabhAccreditation = async (accredId: string, clinicName: string) => {
    await new Promise((r) => setTimeout(r, 1000));
    return (
      <p key="nabh">
        NABH/AYUSH Accreditation:{" "}
        <span className={accredId ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
          {accredId ? "Valid" : "Invalid"}
        </span>
      </p>
    );
  };
  const verifyBranchClinic = async (url: string, clinicName: string) => {
    await new Promise((r) => setTimeout(r, 1000));
    return (
      <p key="branch">
        Branch Clinic Verification:{" "}
        <span className={url.includes("vaidyasala") ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
          {url.includes("vaidyasala") ? "Valid" : "Invalid"}
        </span>
      </p>
    );
  };

  if (selectedClinic) {
    return (
      <div className="space-y-6 p-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{selectedClinic.name}</h1>
            <p className="text-muted-foreground">
              Detailed verification and compliance review
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel */}
          <div className="flex-1 space-y-6">
            <button
              className="text-sm text-primary hover:underline"
              onClick={() => setSelectedClinic(null)}
            >
              &larr; Back to Clinics
            </button>

            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Clinic Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                {selectedClinic.contactPerson && (
                  <>
                    <span className="font-medium">Contact:</span>
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
                <span
                  className={
                    selectedClinic.status === "Verified"
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {selectedClinic.status}
                </span>
              </CardContent>
            </Card>

            {/* Certificates */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  Certificates
                </CardTitle>
                <CardDescription>Submitted compliance documents</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
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
                <p className="text-xs text-muted-foreground mt-2">
                  Submitted: {selectedClinic.submittedAt || "N/A"} <br />
                  Status:{" "}
                  <span
                    className={
                      selectedClinic.statusDetailed === "Pending"
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {selectedClinic.statusDetailed}
                  </span>
                </p>
              </CardContent>
            </Card>

            {/* Compliance */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-xl">Compliance Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <label className="font-medium block mb-1">AYUSH License Number</label>
                  <p className="border border-muted w-full rounded-lg p-2 bg-muted">
                    {ayushLicense || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="font-medium block mb-1">GMP Certification ID</label>
                  <p className="border border-muted w-full rounded-lg p-2 bg-muted">
                    {gmpCert || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="font-medium block mb-1">NABH/AYUSH Accreditation ID</label>
                  <p className="border border-muted w-full rounded-lg p-2 bg-muted">
                    {nabhAccred || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="font-medium block mb-1">Branch Clinic Website</label>
                  <p className="border border-muted w-full rounded-lg p-2 bg-muted">
                    {branchUrl || "N/A"}
                  </p>
                </div>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={checkCompliance}
                >
                  Verify Compliance
                </Button>
                <div className="border border-muted rounded-lg p-4">{result}</div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel */}
          <div className="w-full lg:w-[350px] space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Clinic Registration Number</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Country:</span>
                  <span className="ml-2">{selectedClinic.registration?.country || "N/A"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">HRB / VAT:</span>
                  <span className="ml-2">{selectedClinic.registration?.number || "N/A"}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="medical-card">
              <CardContent className="pt-4">
                <textarea
                  className="border border-muted w-full min-h-[75px] rounded-lg p-2 text-sm"
                  value={decisionNote}
                  onChange={(e) => setDecisionNote(e.target.value)}
                  placeholder="Add a note for this verification decision"
                />
                <div className="flex gap-4 mt-4">
                  <Button
                    onClick={() => alert(`Approved ${selectedClinic.name}\nNote: ${decisionNote}`)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => alert(`Denied ${selectedClinic.name}\nNote: ${decisionNote}`)}
                    className="bg-red-600 hover:bg-red-700"
                    variant="destructive"
                  >
                    Deny
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const filteredClinics = clinicsList.filter((clinic) => {
    if (filter === "All") return true;
    if (filter === "Verified") return clinic.status === "Verified";
    if (filter === "Unverified") return clinic.status === "Pending verification";
    return true;
  });

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Clinics for Verification</h1>
          <p className="text-muted-foreground">Manage and verify Ayurveda clinics</p>
        </div>
      </div>

      <div className="flex justify-end">
        <select
          className="p-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Verified">Verified</option>
          <option value="Unverified">Unverified</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredClinics.length > 0 ? (
          filteredClinics.map((clinic) => (
            <Card
              key={clinic.id}
              className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
              onClick={() => handleClinicSelect(clinic)}
            >
              <CardContent className="p-4 flex-1">
                <h3 className="text-lg font-semibold mb-2">{clinic.name}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {clinic.status === "Verified"
                    ? "Successfully verified clinic"
                    : "Awaiting verification process"}
                </p>
              </CardContent>
              <div
                className={`p-2 text-white text-sm font-medium flex items-center gap-2 ${
                  clinic.status === "Verified"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {clinic.status === "Verified" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span>{clinic.status}</span>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-600">No clinics found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};