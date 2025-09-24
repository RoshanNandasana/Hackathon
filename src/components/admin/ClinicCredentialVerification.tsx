import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
    let resultHtml: JSX.Element[] = [<h3 key="title" className="font-semibold mb-2">Compliance Check Results</h3>];

    resultHtml.push(await verifyAyushLicense(ayushLicense, selectedClinic!.name));
    resultHtml.push(await verifyGmpCertification(gmpCert, selectedClinic!.name));
    resultHtml.push(await verifyNabhAccreditation(nabhAccred, selectedClinic!.name));

    if (branchUrl) {
      resultHtml.push(await verifyBranchClinic(branchUrl, selectedClinic!.name));
    } else {
      resultHtml.push(
        <p key="branch-skip">
          Branch Clinic Verification: <span className="text-green-600 font-bold">Skipped (No URL provided)</span>
        </p>
      );
    }

    setResult(<div>{resultHtml}</div>);
  };

  const verifyAyushLicense = async (licenseNumber: string, clinicName: string): Promise<JSX.Element> => {
    try {
      const response = await mockApiCall('ayush', { licenseNumber, clinicName });
      return (
        <p key="ayush">
          AYUSH License: <span className={response.valid ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{response.valid ? 'Valid' : 'Invalid'}</span> - {response.message}
        </p>
      );
    } catch (error) {
      return (
        <p key="ayush-error">
          AYUSH License: <span className="text-red-600 font-bold">Error</span> - Unable to verify: {(error as Error).message}
        </p>
      );
    }
  };

  const verifyGmpCertification = async (certId: string, clinicName: string): Promise<JSX.Element> => {
    try {
      const response = await mockApiCall('gmp', { certId, clinicName });
      return (
        <p key="gmp">
          GMP Certification: <span className={response.valid ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{response.valid ? 'Valid' : 'Invalid'}</span> - {response.message}
        </p>
      );
    } catch (error) {
      return (
        <p key="gmp-error">
          GMP Certification: <span className="text-red-600 font-bold">Error</span> - Unable to verify: {(error as Error).message}
        </p>
      );
    }
  };

  const verifyNabhAccreditation = async (accredId: string, clinicName: string): Promise<JSX.Element> => {
    try {
      const response = await mockApiCall('nabh', { accredId, clinicName });
      return (
        <p key="nabh">
          NABH/AYUSH Accreditation: <span className={response.valid ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{response.valid ? 'Valid' : 'Invalid'}</span> - {response.message}
        </p>
      );
    } catch (error) {
      return (
        <p key="nabh-error">
          NABH/AYUSH Accreditation: <span className="text-red-600 font-bold">Error</span> - Unable to verify: {(error as Error).message}
        </p>
      );
    }
  };

  const verifyBranchClinic = async (url: string, clinicName: string): Promise<JSX.Element> => {
    try {
      const response = await mockApiCall('branch', { url, clinicName });
      return (
        <p key="branch">
          Branch Clinic Verification: <span className={response.valid ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{response.valid ? 'Valid' : 'Invalid'}</span> - {response.message}
        </p>
      );
    } catch (error) {
      return (
        <p key="branch-error">
          Branch Clinic Verification: <span className="text-red-600 font-bold">Error</span> - Unable to verify: {(error as Error).message}
        </p>
      );
    }
  };

  const mockApiCall = async (
    type: string,
    data: { [key: string]: string }
  ): Promise<{ valid: boolean; message: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    switch (type) {
      case 'ayush':
        return {
          valid: !!data.licenseNumber && !!data.clinicName,
          message: data.licenseNumber && data.clinicName
            ? 'Verified with Ministry of AYUSH database'
            : 'Invalid or missing license number',
        };
      case 'gmp':
        return {
          valid: !!data.certId && !!data.clinicName,
          message: data.certId && data.clinicName
            ? 'Verified with QCI/FSSAI standards'
            : 'Invalid or missing GMP certification ID',
        };
      case 'nabh':
        return {
          valid: !!data.accredId && !!data.clinicName,
          message: data.accredId && data.clinicName
            ? 'Verified with NABH portal'
            : 'Invalid or missing accreditation ID',
        };
      case 'branch':
        return {
          valid: !!data.url && !!data.clinicName && data.url.includes('vaidyasala'),
          message: data.url && data.clinicName && data.url.includes('vaidyasala')
            ? 'Verified as authorized branch (e.g., Arya Vaidya Sala)'
            : 'Invalid or unauthorized branch',
        };
      default:
        throw new Error('Unknown verification type');
    }
  };

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
            <span className={selectedClinic.status === "Verified" ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
              {selectedClinic.status}
            </span>
          </div>

          <Button className="bg-muted text-foreground w-fit my-1">Write a Message</Button>

          <div className="mt-8">
            <div className="flex border-b gap-8">
              <button className="border-b-2 border-primary font-medium pb-1">Certificates</button>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Certificates</h3>
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
                Status: <span className={selectedClinic.statusDetailed === "Pending" ? "text-red-600" : "text-green-600"}>{selectedClinic.statusDetailed}</span>
              </div>
              <div className="flex gap-4 mt-4 max-w-lg">
                <Button
                  onClick={() => alert(`Approved ${selectedClinic.name}\nNote: ${decisionNote}`)}
                  className="bg-green-600 hover:bg-green-700"
                  variant="default"
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
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold mb-2">Compliance Verification</h3>
            <div className="space-y-4">
              <div>
                <label className="font-medium block mb-1">AYUSH License Number</label>
                <p className="border border-muted w-full rounded-lg p-2 bg-muted">{ayushLicense || "N/A"}</p>
              </div>
              <div>
                <label className="font-medium block mb-1">GMP Certification ID</label>
                <p className="border border-muted w-full rounded-lg p-2 bg-muted">{gmpCert || "N/A"}</p>
              </div>
              <div>
                <label className="font-medium block mb-1">NABH/AYUSH Accreditation ID</label>
                <p className="border border-muted w-full rounded-lg p-2 bg-muted">{nabhAccred || "N/A"}</p>
              </div>
              <div>
                <label className="font-medium block mb-1">Branch Clinic Official Website (if applicable)</label>
                <p className="border border-muted w-full rounded-lg p-2 bg-muted">{branchUrl || "N/A"}</p>
              </div>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={checkCompliance}
              >
                Verify Compliance
              </Button>
              <div className="border border-muted rounded-lg p-4">{result}</div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[350px] space-y-6">
          <Card className="shadow-md bg-gray-100">
            <CardHeader>
              <CardTitle>Clinic Registration Number:</CardTitle>
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

          <Card className="bg-gray-100">
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

  const filteredClinics = clinicsList.filter(clinic => {
    if (filter === "All") return true;
    if (filter === "Verified") return clinic.status === "Verified";
    if (filter === "Unverified") return clinic.status === "Pending verification";
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-semibold mb-4 text-gray-800">Clinics for Verification</h1>
      <div className="mb-4">
        <select
          className="p-2 border border-gray-300 rounded-1g bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Verified">Verified</option>
          <option value="Unverified">Unverified</option>
        </select>
      </div>
      <div className="flex flex-col gap-6">
        {filteredClinics.map((clinic) => (
          <Card
            key={clinic.id}
            className={`medical-card hover:shadow-lg cursor-pointer w-full ${clinic.status === "Verified" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
            onClick={() => handleClinicSelect(clinic)}
          >
            <CardHeader>
              <CardTitle className="text-gray-800">{clinic.name}</CardTitle>
              <CardDescription className={clinic.status === "Verified" ? "text-green-600" : "text-red-600"}>
                Status: {clinic.status}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};