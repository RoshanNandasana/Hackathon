import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

import { PatientSidebar } from '@/components/PatientSidebar';
import { PractitionerSidebar } from '@/components/PractitionerSidebar';
import { ClinicSidebar } from '@/components/ClinicSidebar';
import { AdminSidebar } from '@/components/AdminSidebar';

import { PatientDashboard } from '@/components/dashboards/PatientDashboard';
import { PractitionerDashboard } from '@/components/dashboards/PractitionerDashboard';
import { ClinicDashboard } from '@/components/dashboards/ClinicDashboard';
import { AdminDashboard } from '@/components/dashboards/AdminDashboard';


const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const renderSidebar = () => {
    switch (user.role) {
      case 'admin':
        return <AdminSidebar />;
      case 'patient':
        return <PatientSidebar />;
      case 'practitioner':
        return <PractitionerSidebar />;
      case 'clinic':
        return <ClinicSidebar />;
      default:
        return null;
    }
  };

  const renderDashboard = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'patient':
        return <PatientDashboard />;
      case 'practitioner':
        return <PractitionerDashboard />;
      case 'clinic':
        return <ClinicDashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {renderSidebar()}
      <main className="flex-1 overflow-auto">
        {renderDashboard()}
      </main>
    </div>
  );
};

export default Dashboard;
