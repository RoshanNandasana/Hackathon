import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Heart, BarChart3, Table } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Feedback data (basis for analytics)
const feedbacks = [
  {
    date: "Sep 22, 2025, 10:00 AM",
    rating: "Excellent",
    relief: "Significant",
    agni: "Good",
    satisfaction: "Excellent",
    therapy: "Shirodhara",
    improvement: "+15%", // Calculated based on metrics improvement
  },
  {
    date: "Sep 21, 2025, 11:00 AM",
    rating: "Excellent",
    relief: "No change",
    agni: "Excellent",
    satisfaction: "Excellent",
    therapy: "Udvartana",
    improvement: "+12%",
  },
  {
    date: "Sep 19, 2025, 9:00 AM",
    rating: "Good",
    relief: "Moderate",
    agni: "Improved",
    satisfaction: "Good",
    therapy: "Virechana",
    improvement: "+10%",
  },
  {
    date: "Sep 17, 2025, 2:00 PM",
    rating: "Good",
    relief: "Slight",
    agni: "Moderate",
    satisfaction: "Good",
    therapy: "Abhyanga",
    improvement: "+8%",
  },
  {
    date: "Sep 16, 2025, 3:00 PM",
    rating: "Excellent",
    relief: "Significant",
    agni: "Balanced",
    satisfaction: "Excellent",
    therapy: "Basti",
    improvement: "+18%",
  },
];

export const HealthAnalytics = () => {
  const [sortedFeedbacks, setSortedFeedbacks] = useState(feedbacks);
  const [avgRating, setAvgRating] = useState(0);
  const [avgRelief, setAvgRelief] = useState(0);
  const [avgAgni, setAvgAgni] = useState(0);
  const [avgSatisfaction, setAvgSatisfaction] = useState(0);
  const [overallRecovery, setOverallRecovery] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Mapping strings to numerical values for analytics
    const ratingMap = {
      'Excellent': 5,
      'Good': 4,
      'Fair': 3,
      'Poor': 2,
    };

    const reliefMap = {
      'Significant': 5,
      'Moderate': 4,
      'Slight': 3,
      'No change': 2,
      'None': 1,
    };

    const agniMap = {
      'Excellent': 5,
      'Good': 4,
      'Improved': 4,
      'Moderate': 3,
      'Balanced': 3,
      'Poor': 1,
    };

    // Sort feedbacks by date
    const sorted = [...feedbacks].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setSortedFeedbacks(sorted);

    // Compute averages
    const ratings = sorted.map(f => ratingMap[f.rating] || 0);
    const reliefs = sorted.map(f => reliefMap[f.relief] || 0);
    const agnis = sorted.map(f => agniMap[f.agni] || 0);
    const satisfactions = sorted.map(f => ratingMap[f.satisfaction] || 0);

    const avgR = ratings.reduce((sum, val) => sum + val, 0) / ratings.length || 0;
    const avgRel = reliefs.reduce((sum, val) => sum + val, 0) / reliefs.length || 0;
    const avgA = agnis.reduce((sum, val) => sum + val, 0) / agnis.length || 0;
    const avgS = satisfactions.reduce((sum, val) => sum + val, 0) / satisfactions.length || 0;

    setAvgRating(Math.round(avgR * 10) / 10);
    setAvgRelief(Math.round(avgRel * 10) / 10);
    setAvgAgni(Math.round(avgA * 10) / 10);
    setAvgSatisfaction(Math.round(avgS * 10) / 10);

    // Overall recovery as average of all metrics, scaled to percentage
    const overall = ((avgR + avgRel + avgA + avgS) / 4 / 5) * 100;
    setOverallRecovery(Math.round(overall * 10) / 10);

    // Chart data for rating trend
    setChartData({
      labels: sorted.map(f => f.date.split(', ')[0]), // e.g., "Sep 16"
      datasets: [
        {
          label: "Rating Trend",
          data: ratings,
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          fill: true,
        },
      ],
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Health Analytics</h1>
          <p className="text-muted-foreground">Your recovery progress in Panchakarma treatment based on feedback</p>
        </div>
      </div>

      {/* Overall Recovery Progress */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Overall Recovery Progress
          </CardTitle>
          <CardDescription>Based on average of rating, relief, agni, and satisfaction from feedbacks</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={overallRecovery} className="w-full h-4" />
          <p className="mt-2 text-center text-lg font-semibold">{overallRecovery}% Recovery Achieved</p>
          <p className="text-sm text-muted-foreground text-center">Calculated from {feedbacks.length} feedback sessions</p>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="medical-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRating}/5</div>
            <p className="text-xs text-muted-foreground">Overall session quality</p>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Relief</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRelief}/5</div>
            <p className="text-xs text-muted-foreground">Symptom improvement</p>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Agni</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgAgni}/5</div>
            <p className="text-xs text-muted-foreground">Digestive fire strength</p>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSatisfaction}/5</div>
            <p className="text-xs text-muted-foreground">Overall contentment</p>
          </CardContent>
        </Card>
      </div>

      {/* Wellness Trend Chart */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Wellness Trend
          </CardTitle>
          <CardDescription>Rating progression over treatment sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 5,
                    title: { display: true, text: "Rating (1-5)" },
                  },
                  x: {
                    title: { display: true, text: "Session Date" },
                  },
                },
                plugins: {
                  legend: { display: true },
                  tooltip: { enabled: true },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Recent Session Impact */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Recent Session Impact
          </CardTitle>
          <CardDescription>How each therapy session contributed to your recovery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedFeedbacks.slice(0, 3).map((session, index) => (  // Show last 3 for recency
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div>
                    <p className="font-medium">{session.therapy}</p>
                    <p className="text-sm text-muted-foreground">{session.date}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {session.improvement}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

     
    </div>
  );
};