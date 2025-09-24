import React, { useState } from "react";
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
  CheckCircle,
  AlertTriangle,
  Search,
} from "lucide-react";

interface Practitioner {
  name: string;
  license: string;
  status: string;
  expiry: string;
  specialization: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  website?: string;
  country?: string;
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

const practitionersList: Practitioner[] = [
  {
    name: "Dr. Suresh Kumar",
    license: "AY-12345",
    status: "pending",
    expiry: "2025-12-01",
    specialization: "Panchakarma",
    contactPerson: "Dr. Suresh Kumar",
    phone: "+91 98765 43210",
    email: "suresh.kumar@example.com",
    website: "www.sureshkumar.com",
    country: "India",
    registration: { country: "India", number: "AY/PRC/IND/00123" },
    documents: [
      { label: "Medical License", submitted: true, type: "MED_LICENSE", url: "/docs/medical_license.pdf" },
      { label: "Specialization Certificate", submitted: true, type: "SPEC_CERT", url: "/docs/spec_cert.pdf" },
      { label: "Identity Proof", submitted: true, type: "ID_PROOF", url: "/docs/id_proof.pdf" },
    ],
    submittedAt: "2025-08-20",
    statusDetailed: "Pending",
  },
  {
    name: "Dr. Rajesh Patel",
    license: "AY-67890",
    status: "pending",
    expiry: "2025-10-15",
    specialization: "Ayurvedic Medicine",
    contactPerson: "Dr. Rajesh Patel",
    phone: "+91 87654 32109",
    email: "rajesh.patel@example.com",
    website: "www.rajeshpatel.com",
    country: "India",
    registration: { country: "India", number: "AY/PRC/IND/00456" },
    documents: [
      { label: "Medical License", submitted: true, type: "MED_LICENSE", url: "/docs/medical_license.pdf" },
      { label: "Specialization Certificate", submitted: true, type: "SPEC_CERT", url: "/docs/spec_cert.pdf" },
      { label: "Identity Proof", submitted: true, type: "ID_PROOF", url: "/docs/id_proof.pdf" },
    ],
    submittedAt: "2025-08-15",
    statusDetailed: "Pending",
  },
  {
    name: "Dr. Meera Shah",
    license: "AY-11111",
    status: "verified",
    expiry: "2025-08-30",
    specialization: "Herbal Medicine",
    contactPerson: "Dr. Meera Shah",
    phone: "+91 76543 21098",
    email: "meera.shah@example.com",
    website: "www.meerashah.com",
    country: "India",
    registration: { country: "India", number: "AY/PRC/IND/00789" },
    documents: [
      { label: "Medical License", submitted: true, type: "MED_LICENSE", url: "/docs/medical_license.pdf" },
      { label: "Specialization Certificate", submitted: true, type: "SPEC_CERT", url: "/docs/spec_cert.pdf" },
      { label: "Identity Proof", submitted: true, type: "ID_PROOF", url: "/docs/id_proof.pdf" },
    ],
    submittedAt: "2025-08-10",
    statusDetailed: "Verified",
  },
];

export const PractitionerCredentials = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPractitioner, setSelectedPractitioner] = useState<Practitioner | null>(null);
  const [decisionNote, setDecisionNote] = useState("");
  const [license, setLicense] = useState("");
  const [specializationCert, setSpecializationCert] = useState("");
  const [idProof, setIdProof] = useState("");
  const [result, setResult] = useState<JSX.Element | null>(null);

  const handlePractitionerSelect = (practitioner: Practitioner) => {
    setSelectedPractitioner(practitioner);
    setLicense(practitioner.license || "");
    setSpecializationCert(practitioner.specialization || "");
    setIdProof("");
    setResult(null);
  };

  const checkCompliance = async () => {
    let resultHtml: JSX.Element[] = [<h3 key="title" className="font-semibold mb-2">Compliance Check Results</h3>];

    resultHtml.push(await verifyLicense(license, selectedPractitioner!.name));
    resultHtml.push(await verifySpecializationCert(specializationCert, selectedPractitioner!.name));
    resultHtml.push(await verifyIdProof(idProof, selectedPractitioner!.name));

    setResult(<div>{resultHtml}</div>);
  };

  const verifyLicense = async (licenseNumber: string, name: string): Promise<JSX.Element> => {
    try {
      const response = await mockApiCall('license', { licenseNumber, name });
      return (
        <p key="license">
          Medical License: <span className={response.valid ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{response.valid ? 'Valid' : 'Invalid'}</span> - {response.message}
        </p>
      );
    } catch (error) {
      return (
        <p key="license-error">
          Medical License: <span className="text-red-600 font-bold">Error</span> - Unable to verify: {(error as Error).message}
        </p>
      );
    }
  };

  const verifySpecializationCert = async (cert: string, name: string): Promise<JSX.Element> => {
    try {
      const response = await mockApiCall('specialization', { cert, name });
      return (
        <p key="specialization">
          Specialization Certificate: <span className={response.valid ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{response.valid ? 'Valid' : 'Invalid'}</span> - {response.message}
        </p>
      );
    } catch (error) {
      return (
        <p key="specialization-error">
          Specialization Certificate: <span className="text-red-600 font-bold">Error</span> - Unable to verify: {(error as Error).message}
        </p>
      );
    }
  };

  const verifyIdProof = async (idProof: string, name: string): Promise<JSX.Element> => {
    try {
      const response = await mockApiCall('id_proof', { idProof, name });
      return (
        <p key="id-proof">
          Identity Proof: <span className={response.valid ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{response.valid ? 'Valid' : 'Invalid'}</span> - {response.message}
        </p>
      );
    } catch (error) {
      return (
        <p key="id-proof-error">
          Identity Proof: <span className="text-red-600 font-bold">Error</span> - Unable to verify: {(error as Error).message}
        </p>
      );
    }
  };

  const mockApiCall = async (
    type: string,
    data: { [key: string]: string }
  ): Promise<{ valid: boolean; message: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      valid: Object.values(data).every(value => !!value),
      message: Object.values(data).every(value => !!value) ? 'Verified' : 'Invalid or missing information',
    };
  };

  const filteredPractitioners = practitionersList.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.license.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedPractitioner) {
    return (
      <div className="space-y-6 p-4 max-w-7xl mx-auto">
        <button className="text-sm text-primary mb-4" onClick={() => setSelectedPractitioner(null)}>
          &larr; Back to Practitioners
        </button>
        <Card className="medical-card">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-3xl font-bold text-foreground">{selectedPractitioner.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Practitioner Details and Verification Status
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                {/* Placeholder for alignment */}
              </div>
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <div className="space-y-6">
              <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold text-gray-900 truncate">{selectedPractitioner.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{selectedPractitioner.specialization || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 truncate">Contact: {selectedPractitioner.contactPerson || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground truncate">Phone: {selectedPractitioner.phone || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground truncate">Email: {selectedPractitioner.email || "N/A"}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <Badge
                      variant={selectedPractitioner.status === "verified" ? "default" : "secondary"}
                      className="capitalize flex items-center gap-1 px-3 py-1"
                      aria-label={`Status ${selectedPractitioner.status}`}
                    >
                      {selectedPractitioner.status === "verified" ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      )}
                      {selectedPractitioner.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
                <h3 className="font-semibold mb-2">Documents</h3>
                <ul className="space-y-2">
                  {selectedPractitioner.documents?.map((doc, idx) => (
                    <li key={idx} className={doc.submitted ? "text-foreground" : "text-muted-foreground"}>
                      {doc.label}
                      {doc.submitted && (
                        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-primary underline">
                          View
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="text-sm text-muted-foreground mt-2">
                  Submitted: <span>{selectedPractitioner.submittedAt || "N/A"}</span><br />
                  Status: <span className={selectedPractitioner.statusDetailed === "Pending" ? "text-yellow-600" : "text-green-600"}>{selectedPractitioner.statusDetailed || "N/A"}</span>
                </div>
                <div className="flex gap-4 mt-4">
                  <Button
                    onClick={() => alert(`Approved ${selectedPractitioner.name}\nNote: ${decisionNote}`)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    variant="default"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => alert(`Denied ${selectedPractitioner.name}\nNote: ${decisionNote}`)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                    variant="destructive"
                  >
                    Deny
                  </Button>
                </div>
              </div>

              <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
                <h3 className="font-semibold mb-2">Compliance Verification</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">License: {license || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Specialization Certificate: {specializationCert || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Identity Proof: {idProof || "N/A"}</p>
                  </div>
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={checkCompliance}
                  >
                    Verify Compliance
                  </Button>
                  <div className="border border-gray-200 rounded-lg p-4">{result}</div>
                </div>
              </div>

              <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
                <h3 className="font-semibold mb-2">Registration Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Country: {selectedPractitioner.registration?.country || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Registration Number: {selectedPractitioner.registration?.number || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
                <h3 className="font-semibold mb-2">Verification Note</h3>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={decisionNote}
                  onChange={(e) => setDecisionNote(e.target.value)}
                  placeholder="Add a note for this verification decision"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 w-12 h-12 rounded-lg flex items-center justify-center">
            <UserCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Practitioner Credentials</h1>
            <p className="text-muted-foreground">Verify and manage practitioner certifications effectively</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-[180px] relative">
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
      </div>

      {/* Practitioner List */}
      <Card className="medical-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Credential Verification</CardTitle>
              <CardDescription>
                Manage practitioner licenses and certifications
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {filteredPractitioners.length === 0 ? (
            <p className="text-center py-6 text-muted-foreground">
              No practitioners found.
            </p>
          ) : (
            <div className="space-y-4">
              {filteredPractitioners.map((practitioner, index) => (
                <div
                  key={index}
                  className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
                  onClick={() => handlePractitionerSelect(practitioner)}
                >
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-center cursor-pointer">
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