import React, { useState } from "react";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  Clock,
  Bell,
  Smartphone,
  Globe,
  BarChart2,
  Download,
  Calendar,
} from "lucide-react";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const SitePerformanceAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
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
    pageViews: 125678,
    conversionRate: 4.5,
  });

  const [demographics] = useState([
    { group: "18-25", percentage: 20 },
    { group: "26-35", percentage: 37 },
    { group: "36-45", percentage: 25 },
    { group: "46-60", percentage: 15 },
    { group: "60+", percentage: 3 },
  ]);

  const [deviceBreakdown] = useState([
    { device: "Mobile", percentage: 60 },
    { device: "Desktop", percentage: 30 },
    { device: "Tablet", percentage: 10 },
  ]);

  const [topCountries] = useState([
    { country: "India", percentage: 50 },
    { country: "USA", percentage: 20 },
    { country: "UK", percentage: 10 },
    { country: "Canada", percentage: 8 },
    { country: "Others", percentage: 12 },
  ]);

  const [topPages] = useState([
    { page: "/", views: 45000, unique: 32000, bounceRate: 18 },
    { page: "/services", views: 28000, unique: 21000, bounceRate: 25 },
    { page: "/blog", views: 15000, unique: 12000, bounceRate: 30 },
    { page: "/contact", views: 12000, unique: 9000, bounceRate: 15 },
    { page: "/about", views: 10000, unique: 8000, bounceRate: 20 },
  ]);

  const [visitorTrend] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Visitors",
        data: [10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
      },
    ],
  });

  const trafficData = {
    labels: trafficSources.map((t) => t.source),
    datasets: [
      {
        data: trafficSources.map((t) => t.percentage),
        backgroundColor: ["#4ade80", "#60a5fa", "#facc15", "#f87171"],
      },
    ],
  };

  const demographicsData = {
    labels: demographics.map((d) => d.group),
    datasets: [
      {
        label: "User Demographics %",
        data: demographics.map((d) => d.percentage),
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],
        borderColor: "#ffffff",
        borderWidth: 1,
      },
    ],
  };

  const deviceData = {
    labels: deviceBreakdown.map((d) => d.device),
    datasets: [
      {
        data: deviceBreakdown.map((d) => d.percentage),
        backgroundColor: ["#6366f1", "#ec4899", "#14b8a6"],
      },
    ],
  };

  const countriesData = {
    labels: topCountries.map((c) => c.country),
    datasets: [
      {
        label: "Visitors by Country %",
        data: topCountries.map((c) => c.percentage),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const handleExport = () => {
    // Simulate CSV export
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Metric,Value\n" +
      `Monthly Visitors,${visitorMetrics.monthlyVisitors}\n` +
      `Avg Engagement,${visitorMetrics.avgEngagement}%\n` +
      // Add more data...
      "";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "site_analytics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 w-12 h-12 rounded-lg flex items-center justify-center">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Site Performance Analytics</h1>
          <p className="text-muted-foreground">Monitor and analyze website performance metrics</p>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4">
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

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Visitor Metrics Summary */}
          <Card className="shadow-xl border-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle>Total Visitors & Engagement</CardTitle>
              <CardDescription>Key metrics at a glance</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
                <div className="space-y-2">
                  <Users className="mx-auto text-blue-600 w-8 h-8" />
                  <p className="text-3xl font-bold">{visitorMetrics.monthlyVisitors.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Monthly Visitors</p>
                </div>
                <div className="space-y-2">
                  <TrendingUp className="mx-auto text-green-600 w-8 h-8" />
                  <p className="text-3xl font-bold">{visitorMetrics.avgEngagement}%</p>
                  <p className="text-sm text-muted-foreground">Avg Engagement</p>
                </div>
                <div className="space-y-2">
                  <Clock className="mx-auto text-yellow-600 w-8 h-8" />
                  <p className="text-3xl font-bold">
                    {Math.floor(visitorMetrics.sessionDuration / 60)}m {visitorMetrics.sessionDuration % 60}s
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Session</p>
                </div>
                <div className="space-y-2">
                  <Bell className="mx-auto text-red-600 w-8 h-8" />
                  <p className="text-3xl font-bold">{visitorMetrics.bounceRate}%</p>
                  <p className="text-sm text-muted-foreground">Bounce Rate</p>
                </div>
                <div className="space-y-2">
                  <BarChart2 className="mx-auto text-purple-600 w-8 h-8" />
                  <p className="text-3xl font-bold">{visitorMetrics.pageViews.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Page Views</p>
                </div>
                <div className="space-y-2">
                  <TrendingUp className="mx-auto text-indigo-600 w-8 h-8" />
                  <p className="text-3xl font-bold">{visitorMetrics.conversionRate}%</p>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visitor Trend */}
          <Card className="shadow-xl border-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle>Visitor Trend</CardTitle>
              <CardDescription>Visitors over time</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[400px]">
                <Line
                  data={visitorTrend}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: { y: { beginAtZero: true } },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          {/* Traffic Sources */}
          <Card className="shadow-xl border-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>How visitors find your site</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[300px]">
                  <Pie
                    data={trafficData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { position: "right" } },
                    }}
                  />
                </div>
                <div className="space-y-4">
                  {trafficSources.map((source, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="font-medium">{source.source}</span>
                      <Progress value={source.percentage} className="w-1/2" />
                      <span>{source.percentage}%</span>
                    </div>
                  ))}
                </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Countries */}
            <Card className="shadow-xl border-none overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle>Visitors by Country</CardTitle>
                <CardDescription>Geographic distribution</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[400px]">
                  <Bar
                    data={countriesData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: { y: { beginAtZero: true } },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            {/* User Demographics */}
            <Card className="shadow-xl border-none overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50">
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>Age group distribution</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[400px]">
                  <Bar
                    data={demographicsData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: { y: { beginAtZero: true } },
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Device Breakdown */}
            <Card className="shadow-xl border-none overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50">
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>Visitor devices</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-[300px]">
                    <Doughnut
                      data={deviceData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { position: "right" } },
                      }}
                    />
                  </div>
                  <div className="space-y-4">
                    {deviceBreakdown.map((device, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-muted-foreground" />
                        <span className="flex-1">{device.device}</span>
                        <span className="font-medium">{device.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* Top Pages */}
            <Card className="shadow-xl border-none overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                <CardTitle>Top Performing Pages</CardTitle>
                <CardDescription>Most visited pages and metrics</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Page</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Unique Visitors</TableHead>
                      <TableHead>Bounce Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topPages.map((page, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{page.page}</TableCell>
                        <TableCell>{page.views.toLocaleString()}</TableCell>
                        <TableCell>{page.unique.toLocaleString()}</TableCell>
                        <TableCell>{page.bounceRate}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="shadow-xl border-none overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                <CardTitle>Site Performance</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Bounce Rate</span>
                    <span>{visitorMetrics.bounceRate}%</span>
                  </div>
                  <Progress value={visitorMetrics.bounceRate} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Conversion Rate</span>
                    <span>{visitorMetrics.conversionRate}%</span>
                  </div>
                  <Progress value={visitorMetrics.conversionRate * 10} className="h-2" /> {/* Scaled for visibility */}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Avg Engagement</span>
                    <span>{visitorMetrics.avgEngagement}%</span>
                  </div>
                  <Progress value={visitorMetrics.avgEngagement} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
};

export default SitePerformanceAnalytics;