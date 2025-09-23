import { Routes, Route } from "react-router-dom";
import { AdminSidebar } from "../AdminSidebar";
import { ClinicVerification } from "../admin/ClinicCredentialVerification";
import { ClinicPerformanceAnalytics } from "../admin/ClinicPerformanceAnalytics";
import { SitePerformanceAnalytics } from "../admin/SitePerformanceAnalytics";


export const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      <main className="flex-grow p-6 overflow-y-auto">
        <Routes>
          <Route path="/home" element={<ClinicVerification/>} />
          <Route path="/credentials" element={<ClinicVerification />} />
          <Route path="/clinic-analytics" element={<ClinicPerformanceAnalytics />} />
          <Route path="/site-analytics" element={<SitePerformanceAnalytics />} />
        </Routes>
      </main>
    </div>
  );
};
