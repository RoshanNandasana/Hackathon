import React, { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Activity,
  Download,
} from "lucide-react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Type definitions
interface Metric {
  label: string;
  value: number | string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Therapy {
  name: string;
  sessions: number;
  percentage: number;
}

interface Demographic {
  group: string;
  percentage: number;
}

interface Therapist {
  name: string;
  sessions: number;
  revenue: string;
  rating: number;
}

const ClinicPerformanceAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const metrics: Metric[] = [
    { label: "Total Patients", value: 148, change: "+12%", icon: Users },
    { label: "Monthly Sessions", value: 324, change: "+8%", icon: Calendar },
    { label: "Revenue", value: "₹45.2K", change: "+15%", icon: DollarSign },
    { label: "Occupancy Rate", value: 87, change: "+3%", icon: Activity },
  ];

  const therapyPopularity: Therapy[] = [
    { name: "Panchakarma Detox", sessions: 85, percentage: 26 },
    { name: "Abhyanga Massage", sessions: 72, percentage: 22 },
    { name: "Shirodhara", sessions: 68, percentage: 21 },
    { name: "Consultations", sessions: 54, percentage: 17 },
    { name: "Other Therapies", sessions: 45, percentage: 14 },
  ];

  const patientDemographics: Demographic[] = [
    { group: "18-25", percentage: 15 },
    { group: "26-35", percentage: 35 },
    { group: "36-45", percentage: 30 },
    { group: "46-60", percentage: 15 },
    { group: "60+", percentage: 5 },
  ];

  const topTherapists: Therapist[] = [
    { name: "Dr. Suresh Kumar", sessions: 120, revenue: "₹18K", rating: 4.8 },
    { name: "Dr. Rekha Sharma", sessions: 95, revenue: "₹14K", rating: 4.6 },
    { name: "Dr. Vikram Singh", sessions: 80, revenue: "₹12K", rating: 4.7 },
    { name: "Dr. Anjali Reddy", sessions: 70, revenue: "₹10K", rating: 4.5 },
  ];

  const visitorTrend = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Sessions",
        data: [200, 250, 300, 280, 320, 340, 360, 380, 324],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const therapyData = {
    labels: therapyPopularity.map((t) => t.name),
    datasets: [
      {
        data: therapyPopularity.map((t) => t.percentage),
        backgroundColor: ["#4ade80", "#60a5fa", "#facc15", "#f87171", "#a855f7"],
        borderWidth: 1,
        borderColor: "#ffffff",
      },
    ],
  };

  const demographicsData = {
    labels: patientDemographics.map((d) => d.group),
    datasets: [
      {
        label: "Patient Demographics %",
        data: patientDemographics.map((d) => d.percentage),
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
        borderColor: "#ffffff",
        borderWidth: 1,
      },
    ],
  };

  const handleExport = () => {
    const csvContent = [
      "data:text/csv;charset=utf-8,",
      "Metric,Value",
      ...metrics.map((m) => `${m.label},${typeof m.value === "number" ? m.value : m.value.replace("₹", "")}`),
    ].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "clinic_insights.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-12 h-12 rounded-lg flex items-center justify-center">
    <BarChart3 className="w-6 h-6 text-white" />
  </div>
  <div>
    <h1 className="text-3xl font-bold text-foreground">Clinic Performance Analytics</h1>
    <p className="text-sm text-muted-foreground">
      Last updated: Wednesday, September 24, 2025, 03:30 PM IST
    </p>
  </div>
</div>

          <div className="flex items-center gap-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExport} variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="therapy">Therapy Insights</TabsTrigger>
            <TabsTrigger value="patients">Patient Insights</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="shadow-xl border-none overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle>Clinic Metrics</CardTitle>
                <CardDescription>Key metrics at a glance</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                  {metrics.map((metric, index) => {
                    const IconComponent = metric.icon;
                    return (
                      <div key={index} className="space-y-2">
                        <IconComponent className="mx-auto text-blue-600 w-8 h-8" />
                        <p className="text-3xl font-bold">
                          {typeof metric.value === "number" ? metric.value : metric.value}
                        </p>
                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                        <div className="flex items-center justify-center gap-1 text-green-600">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-sm font-medium">{metric.change}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-none overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle>Session Trend</CardTitle>
                <CardDescription>Sessions over time</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[400px]">
                  <Line
                    data={visitorTrend}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: { y: { beginAtZero: true, title: { display: true, text: "Sessions" } } },
                      plugins: { legend: { display: true, position: "top" } },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="therapy" className="space-y-6">
            <Card className="shadow-xl border-none overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle>Therapy Popularity</CardTitle>
                <CardDescription>Most requested treatments this month</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-[300px]">
                    <Pie
                      data={therapyData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { position: "right" } },
                      }}
                    />
                  </div>
                  <div className="space-y-4">
                    {therapyPopularity.map((therapy, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="font-medium">{therapy.name}</span>
                        <span>{therapy.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <Card className="shadow-xl border-none overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50">
                <CardTitle>Patient Demographics</CardTitle>
                <CardDescription>Age group distribution</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[400px]">
                  <Bar
                    data={demographicsData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: { y: { beginAtZero: true, title: { display: true, text: "Percentage" } } },
                      plugins: { legend: { display: true, position: "top" } },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="shadow-xl border-none overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                <CardTitle>Top Performing Therapists</CardTitle>
                <CardDescription>Most active therapists and metrics</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Therapist</TableHead>
                      <TableHead>Sessions</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Rating</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topTherapists.map((therapist, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{therapist.name}</TableCell>
                        <TableCell>{therapist.sessions}</TableCell>
                        <TableCell>{therapist.revenue}</TableCell>
                        <TableCell>{therapist.rating} ★</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-none overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                <CardTitle>Clinic Performance</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Occupancy Rate</span>
                    <span>{metrics[3].value}%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Avg Session Duration</span>
                    <span>45 min</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Patient Satisfaction</span>
                    <span>92%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClinicPerformanceAnalytics;