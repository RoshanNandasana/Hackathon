import React, { useState } from 'react';
import { Star, Users, MessageCircle, UserCheck } from 'lucide-react';

// Interfaces for type safety
interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
}

interface Patient {
  id: number;
  name: string;
  age: number;
  treatment: string;
}

interface Review {
  id: number;
  patient: string;
  rating: number;
  comment: string;
}

interface Clinic {
  id: number;
  name: string;
  rating: number;
  activePatients: number;
  interactions: number;
  doctors: number;
  satisfactionRate: number;
  description: string;
  status: 'Operational' | 'Under Maintenance' | 'Closed';
  address: string;
  contact: string;
  doctorsList: Doctor[];
  patientsList: Patient[];
  reviews: Review[];
}

// Mock data
const clinicsData: Clinic[] = [
  {
    id: 1,
    name: 'Ayush Wellness Center - Delhi',
    rating: 4.8,
    activePatients: 150,
    interactions: 320,
    doctors: 20,
    satisfactionRate: 94,
    description: 'A premier wellness center offering comprehensive ayurvedic treatments.',
    status: 'Operational',
    address: '123 Health Street, Delhi',
    contact: '+91-11-12345678',
    doctorsList: [
      { id: 1, name: 'Dr. Anjali Sharma', specialty: 'Ayurvedic Medicine', experience: '15 years' },
      { id: 2, name: 'Dr. Vikram Singh', specialty: 'Panchakarma', experience: '12 years' },
      { id: 3, name: 'Dr. Priya Gupta', specialty: 'Herbal Therapy', experience: '10 years' },
    ],
    patientsList: [
      { id: 1, name: 'Rohan Kumar', age: 34, treatment: 'Stress Management' },
      { id: 2, name: 'Anita Verma', age: 45, treatment: 'Joint Pain Relief' },
      { id: 3, name: 'Suresh Patel', age: 28, treatment: 'Digestive Care' },
    ],
    reviews: [
      { id: 1, patient: 'Rohan Kumar', rating: 5, comment: 'Excellent care and professional staff!' },
      { id: 2, patient: 'Anita Verma', rating: 4, comment: 'Very good experience, highly recommend.' },
    ],
  },
  {
    id: 2,
    name: 'Herbal Care Clinic - Mumbai',
    rating: 4.5,
    activePatients: 120,
    interactions: 280,
    doctors: 15,
    satisfactionRate: 89,
    description: 'Specialized in herbal treatments and holistic care.',
    status: 'Operational',
    address: '456 Wellness Road, Mumbai',
    contact: '+91-22-98765432',
    doctorsList: [
      { id: 4, name: 'Dr. Sameer Joshi', specialty: 'Herbal Medicine', experience: '8 years' },
      { id: 5, name: 'Dr. Neha Patel', specialty: 'Ayurvedic Nutrition', experience: '10 years' },
    ],
    patientsList: [
      { id: 4, name: 'Meena Desai', age: 50, treatment: 'Skin Care' },
      { id: 5, name: 'Vikram Rao', age: 39, treatment: 'Weight Management' },
    ],
    reviews: [
      { id: 3, patient: 'Meena Desai', rating: 4, comment: 'Good facilities, caring staff.' },
    ],
  },
  {
    id: 3,
    name: 'Nature’s Heal - Bangalore',
    rating: 4.9,
    activePatients: 90,
    interactions: 250,
    doctors: 12,
    satisfactionRate: 95,
    description: 'Focused on natural healing and wellness.',
    status: 'Operational',
    address: '789 Green Avenue, Bangalore',
    contact: '+91-80-45678901',
    doctorsList: [
      { id: 6, name: 'Dr. Kavita Reddy', specialty: 'Ayurvedic Therapy', experience: '14 years' },
    ],
    patientsList: [
      { id: 6, name: 'Arjun Menon', age: 42, treatment: 'Chronic Pain' },
    ],
    reviews: [
      { id: 4, patient: 'Arjun Menon', rating: 5, comment: 'Best clinic for holistic care!' },
    ],
  },
  {
    id: 4,
    name: 'Ayurveda Wellness - Pune',
    rating: 4.7,
    activePatients: 110,
    interactions: 260,
    doctors: 14,
    satisfactionRate: 92,
    description: 'Comprehensive ayurvedic care with modern facilities.',
    status: 'Operational',
    address: '101 Harmony Lane, Pune',
    contact: '+91-20-23456789',
    doctorsList: [
      { id: 7, name: 'Dr. Rohan Kulkarni', specialty: 'Panchakarma', experience: '11 years' },
    ],
    patientsList: [
      { id: 7, name: 'Sneha Patil', age: 36, treatment: 'Detox Therapy' },
    ],
    reviews: [
      { id: 5, patient: 'Sneha Patil', rating: 4, comment: 'Very professional service.' },
    ],
  },
  {
    id: 5,
    name: 'Healing Touch Clinic - Chennai',
    rating: 4.6,
    activePatients: 130,
    interactions: 300,
    doctors: 18,
    satisfactionRate: 90,
    description: 'Holistic healing with a patient-centric approach.',
    status: 'Operational',
    address: '202 Serenity Road, Chennai',
    contact: '+91-44-67890123',
    doctorsList: [
      { id: 8, name: 'Dr. Lakshmi Nair', specialty: 'Ayurvedic Medicine', experience: '13 years' },
    ],
    patientsList: [
      { id: 8, name: 'Karthik Raj', age: 29, treatment: 'Stress Relief' },
    ],
    reviews: [
      { id: 6, patient: 'Karthik Raj', rating: 5, comment: 'Highly satisfied with the treatment.' },
    ],
  },
  {
    id: 6,
    name: 'Swasthya Kendra - Hyderabad',
    rating: 4.4,
    activePatients: 100,
    interactions: 240,
    doctors: 13,
    satisfactionRate: 88,
    description: 'Traditional ayurvedic treatments with modern amenities.',
    status: 'Operational',
    address: '303 Peace Avenue, Hyderabad',
    contact: '+91-40-34567890',
    doctorsList: [
      { id: 9, name: 'Dr. Sumanth Rao', specialty: 'Herbal Therapy', experience: '9 years' },
    ],
    patientsList: [
      { id: 9, name: 'Priya Reddy', age: 31, treatment: 'Digestive Health' },
    ],
    reviews: [
      { id: 7, patient: 'Priya Reddy', rating: 4, comment: 'Good experience overall.' },
    ],
  },
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

// Card Components
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Card: React.FC<CardProps> = ({ children, className, onClick, ...props }) => (
  <div
    className={`bg-white shadow-md rounded-lg ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </div>
);

const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-4 border-b">{children}</div>
);

const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-xl font-semibold">{children}</h3>
);

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

// Clinic Detail Component
const ClinicDetail: React.FC<{ clinic: Clinic; onBack: () => void }> = ({ clinic, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'doctors' | 'patients' | 'reviews'>('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Description</p>
              <p>{clinic.description}</p>
            </div>
            <div>
              <p className="font-semibold">Status</p>
              <p
                className={`inline-block px-2 py-1 rounded ${
                  clinic.status === 'Operational'
                    ? 'bg-green-100 text-green-800'
                    : clinic.status === 'Under Maintenance'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {clinic.status}
              </p>
            </div>
            <div>
              <p className="font-semibold">Address</p>
              <p>{clinic.address}</p>
            </div>
            <div>
              <p className="font-semibold">Contact</p>
              <p>{clinic.contact}</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Patient Satisfaction</p>
              <Progress value={clinic.satisfactionRate} className="h-3" />
              <p className="mt-1">{clinic.satisfactionRate}%</p>
            </div>
          </div>
        );
      case 'doctors':
        return (
          <div className="space-y-4">
            {clinic.doctorsList.length > 0 ? (
              clinic.doctorsList.map((doctor) => (
                <Card key={doctor.id} className="p-4">
                  <p className="font-semibold">{doctor.name}</p>
                  <p>Specialty: {doctor.specialty}</p>
                  <p>Experience: {doctor.experience}</p>
                </Card>
              ))
            ) : (
              <p>No doctors available.</p>
            )}
          </div>
        );
      case 'patients':
        return (
          <div className="space-y-4">
            {clinic.patientsList.length > 0 ? (
              clinic.patientsList.map((patient) => (
                <Card key={patient.id} className="p-4">
                  <p className="font-semibold">{patient.name}</p>
                  <p>Age: {patient.age}</p>
                  <p>Treatment: {patient.treatment}</p>
                </Card>
              ))
            ) : (
              <p>No patients available.</p>
            )}
          </div>
        );
      case 'reviews':
        return (
          <div className="space-y-4">
            {clinic.reviews.length > 0 ? (
              clinic.reviews.map((review) => (
                <Card key={review.id} className="p-4">
                  <p className="font-semibold">{review.patient}</p>
                  <p>Rating: {'★'.repeat(review.rating)}</p>
                  <p>{review.comment}</p>
                </Card>
              ))
            ) : (
              <p>No reviews available.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Back to Clinics
      </button>
      <Card>
        <CardHeader>
          <CardTitle>{clinic.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            {(['overview', 'doctors', 'patients', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded ${
                  activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          {renderTabContent()}
        </CardContent>
      </Card>
    </div>
  );
};

// Main Clinic Performance Analytics Component
const ClinicPerformanceAnalytics: React.FC = () => {
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  if (selectedClinic) {
    return <ClinicDetail clinic={selectedClinic} onBack={() => setSelectedClinic(null)} />;
  }

  const filteredClinics = clinicsData.filter(clinic => 
    clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedStatus === 'All' || clinic.status === selectedStatus)
  );

  return (
    <div className="space-y-8 p-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold">Clinic Performance Analytics</h2>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium mb-1">Search by Name</label>
          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clinics..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="status" className="block text-sm font-medium mb-1">Filter by Status</label>
          <select
            id="status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Operational">Operational</option>
            <option value="Under Maintenance">Under Maintenance</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {filteredClinics.length > 0 ? (
          filteredClinics.map((clinic) => (
            <Card
              key={clinic.id}
              className="medical-card hover:shadow-lg cursor-pointer transition-shadow"
              onClick={() => setSelectedClinic(clinic)}
            >
              <CardHeader>
                <CardTitle>{clinic.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <p className="text-lg font-semibold">{clinic.rating} Rating</p>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-blue-600" />
                  <p>{clinic.activePatients} Active Patients</p>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-indigo-600" />
                  <p>{clinic.interactions} Interactions / Month</p>
                </div>
                <div className="flex items-center gap-3">
                  <UserCheck className="w-6 h-6 text-green-600" />
                  <p>{clinic.doctors} Doctors</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Patient Satisfaction</p>
                  <Progress value={clinic.satisfactionRate} className="h-3" />
                  <p className="mt-1">{clinic.satisfactionRate}%</p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-600">No clinics found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default ClinicPerformanceAnalytics;