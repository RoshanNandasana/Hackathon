import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle, Star } from "lucide-react";

export const FeedbackReview: React.FC = () => {
  const feedbacks = [
    {
      patient: "Rajesh Kumar",
      relief: "Yes, Significant – felt very light and clear-headed after Swedana.",
      sideEffects: "No",
      agni: "Good – digestion improved compared to last week.",
      aharaVihara: "Fully – followed diet instructions strictly.",
      satisfaction: 5,
      date: "2 days ago",
    },
    {
      patient: "Neha Patel",
      relief: "Slight – mild relaxation but still some stiffness in joints.",
      sideEffects: "Yes – mild nausea after Vamana.",
      agni: "Moderate – appetite is okay but not stable yet.",
      aharaVihara: "Partially – missed evening rest once.",
      satisfaction: 4,
      date: "1 week ago",
    },
    {
      patient: "Deepak Shah",
      relief: "No change noticed immediately, but feeling calmer overall.",
      sideEffects: "No – session went smoothly without discomfort.",
      agni: "Excellent – digestion feels much stronger after Basti cycle.",
      aharaVihara: "Fully – following all Ahara and Vihara recommendations.",
      satisfaction: 5,
      date: "3 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="medical-gradient w-14 h-14 rounded-lg flex items-center justify-center shadow-lg">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold leading-tight">
            Patient Feedback
          </h1>
          <p className="text-md text-muted-foreground max-w-md">
            Post-session responses collected after Panchakarma therapies.
          </p>
        </div>
      </div>

      {/* Feedback Cards */}
      <div className="space-y-6">
        {feedbacks.map((fb, idx) => (
          <Card
            key={idx}
            className="medical-card hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">
                  {fb.patient}
                </CardTitle>
                <span className="text-sm text-muted-foreground">{fb.date}</span>
              </div>
              <CardDescription>
                Panchakarma session feedback summary
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg bg-gray-50">
                <strong>Relief:</strong> {fb.relief}
              </div>

              <div className="p-3 rounded-lg bg-gray-50">
                <strong>Side Effects:</strong> {fb.sideEffects}
              </div>

              <div className="p-3 rounded-lg bg-gray-50">
                <strong>Agni (Energy & Digestion):</strong> {fb.agni}
              </div>

              <div className="p-3 rounded-lg bg-gray-50">
                <strong>Ahara–Vihara Compliance:</strong> {fb.aharaVihara}
              </div>

              <div className="p-3 rounded-lg bg-gray-50 flex items-center justify-between">
                <strong>Satisfaction:</strong>
                <div className="flex space-x-1">
                  {Array.from({ length: fb.satisfaction }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5"
                      fill="#FACC15" // solid yellow
                      stroke="#FACC15" // matches fill so border disappears
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
