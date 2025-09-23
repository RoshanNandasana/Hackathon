import React, { useState } from "react";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  Users,
  Clock,
  Bell,
} from "lucide-react";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SitePerformanceAnalytics: React.FC = () => {
  const [trafficSources] = useState([
    { source: "Organic", percentage: 45 },
    { source: "Direct", percentage: 30 },
    { source: "Referral", percentage: 15 },
    { source: "Paid", percentage: 10 },
  ]);

  const [visitorMetrics] = useState({
    monthlyVisitors: 50234,
    avgEngagement: 78,
    bounceRate: 22,
    sessionDuration: 320,
  });

  const [demographics] = useState([
    { group: "18-25", percentage: 20 },
    { group: "26-35", percentage: 37 },
    { group: "36-45", percentage: 25 },
    { group: "46-60", percentage: 15 },
    { group: "60+", percentage: 3 },
  ]);

  const trafficData = {
    labels: trafficSources.map((t) => t.source),
    datasets: [
      {
        label: "Traffic Sources",
        data: trafficSources.map((t) => t.percentage),
        backgroundColor: ["#4ade80", "#60a5fa", "#facc15", "#f87171"],
        hoverOffset: 30,
      },
    ],
  };

  const demographicsData = {
    labels: demographics.map((d) => d.group),
    datasets: [
      {
        label: "User Demographics %",
        data: demographics.map((d) => d.percentage),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold">Site Performance Analytics</h2>

      {/* Visitor Metrics Summary */}
      <Card className="medical-card hover:shadow-lg">
        <CardHeader>
          <CardTitle>Total Visitors & Engagement</CardTitle>
          <CardDescription>Overview of site traffic and engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center">
            <div>
              <Users className="mx-auto text-primary w-12 h-12" />
              <p className="text-4xl font-bold">{visitorMetrics.monthlyVisitors.toLocaleString()}</p>
              <p className="text-muted-foreground">Monthly Visitors</p>
            </div>
            <div>
              <TrendingUp className="mx-auto text-green-600 w-12 h-12" />
              <p className="text-4xl font-bold">{visitorMetrics.avgEngagement}%</p>
              <p className="text-muted-foreground">Average Engagement</p>
            </div>
            <div>
              <Clock className="mx-auto text-yellow-500 w-12 h-12" />
              <p className="text-4xl font-bold">{Math.floor(visitorMetrics.sessionDuration / 60)}m {visitorMetrics.sessionDuration % 60}s</p>
              <p className="text-muted-foreground">Average Session Duration</p>
            </div>
            <div>
              <Bell className="mx-auto text-red-500 w-12 h-12" />
              <p className="text-4xl font-bold">{visitorMetrics.bounceRate}%</p>
              <p className="text-muted-foreground">Bounce Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Traffic Sources Pie Chart */}
      <Card className="medical-card hover:shadow-lg h-[400px]">
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
          <CardDescription>How visitors find the site</CardDescription>
        </CardHeader>
        <CardContent>
          <Pie data={trafficData} options={{responsive:true, maintainAspectRatio:false}} />
        </CardContent>
      </Card>

      {/* User Demographics Bar Chart */}
      <Card className="medical-card hover:shadow-lg h-[400px]">
        <CardHeader>
          <CardTitle>User Demographics</CardTitle>
          <CardDescription>Visitors age groups</CardDescription>
        </CardHeader>
        <CardContent>
          <Bar data={demographicsData} options={{responsive:true, maintainAspectRatio:false}} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SitePerformanceAnalytics;
