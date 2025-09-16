import { Routes, Route } from 'react-router-dom';
import { PractitionerProfile } from '@/components/practitioner/PractitionerProfile';
import { PatientRecordsAnalytics } from '@/components/practitioner/PatientRecordsAnalytics';
import { TherapyProgressTracker } from '@/components/practitioner/TherapyProgressTracker';
import { ScheduledAppointments } from '@/components/practitioner/ScheduledAppointments';
import { TherapyPlanner } from '@/components/practitioner/TherapyPlanner';
import { FeedbackReview } from '@/components/practitioner/FeedbackReview';

export const PractitionerDashboard = () => {
  return (
    <div className="p-4 md:p-8 md:ml-0 ml-0">
      <Routes>
        <Route path="/" element={<PractitionerProfile />} />
        <Route path="/profile" element={<PractitionerProfile />} />
        <Route path="/analytics" element={<PatientRecordsAnalytics />} />
        <Route path="/progress" element={<TherapyProgressTracker />} />
        <Route path="/appointments" element={<ScheduledAppointments />} />
        <Route path="/planner" element={<TherapyPlanner />} />
        <Route path="/feedback" element={<FeedbackReview />} />
      </Routes>
    </div>
  );
};