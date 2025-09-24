import { Routes, Route } from 'react-router-dom';
import { ClinicFacility } from '@/components/clinic/ClinicFacility';
import { PractitionerCredentials } from '@/components/clinic/PractitionerCredentials';
import { SessionManagement } from '@/components/clinic/SessionManagement';
import  ClinicPerformanceAnalytics  from '@/components/clinic/ClinicInsights';

export const ClinicDashboard = () => {
  return (
    <div className="p-4 md:p-8 md:ml-0 ml-0">
      <Routes>
        <Route path="/" element={<PractitionerCredentials />} />
        <Route path="/facility" element={<ClinicFacility />} />
        <Route path="/credentials" element={<PractitionerCredentials />} />
        <Route path="/sessions" element={<SessionManagement />} />
        <Route path="/insights" element={<ClinicPerformanceAnalytics />} />
      </Routes>
    </div>
  );
};