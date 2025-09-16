import { Routes, Route } from 'react-router-dom';
import { PatientProfile } from '@/components/patient/PatientProfile';
import { HealthAnalytics } from '@/components/patient/HealthAnalytics';
import { TherapyProgress } from '@/components/patient/TherapyProgress';
import { Messaging } from '@/components/patient/Messaging';
import { MedicalProfile } from '@/components/patient/MedicalProfile';
import { AutoSchedule } from '@/components/patient/AutoSchedule';
import { TherapyAlerts } from '@/components/patient/TherapyAlerts';
import { PostSessionFeedback } from '@/components/patient/PostSessionFeedback';
import { AIChatbot } from '@/components/patient/AIChatbot';

export const PatientDashboard = () => {
  return (
    <div className="p-4 md:p-8 md:ml-0 ml-0">
      <Routes>
        <Route path="/" element={<PatientProfile />} />
        <Route path="/profile" element={<PatientProfile />} />
        <Route path="/analytics" element={<HealthAnalytics />} />
        <Route path="/progress" element={<TherapyProgress />} />
        <Route path="/messaging" element={<Messaging />} />
        <Route path="/medical" element={<MedicalProfile />} />
        <Route path="/schedule" element={<AutoSchedule />} />
        <Route path="/alerts" element={<TherapyAlerts />} />
        <Route path="/feedback" element={<PostSessionFeedback />} />
        <Route path="/chatbot" element={<AIChatbot />} />
      </Routes>
    </div>
  );
};