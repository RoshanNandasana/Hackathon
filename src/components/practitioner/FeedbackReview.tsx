import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MessageCircle, Star, TrendingUp } from "lucide-react";

export const FeedbackReview: React.FC = () => {
  const feedbacks = [
    {
      patient: "Rajesh Kumar",
      rating: 5,
      comment: "Session was very smooth and relaxing.",
      date: "2 days ago",
    },
    {
      patient: "Neha Patel",
      rating: 4,
      comment: "Great treatment, felt much better.",
      date: "1 week ago",
    },
    {
      patient: "Deepak Shah",
      rating: 5,
      comment: "Excellent treatment, fully recommended!",
      date: "3 days ago",
    },
  ];

  const averageRating = 4.8;
  const totalReviews = 24;
  const satisfactionRate = 92; // %

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="medical-gradient w-14 h-14 rounded-lg flex items-center justify-center shadow-lg">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold leading-tight">Feedback Review</h1>
          <p className="text-lg text-muted-foreground max-w-md">
            View patient session reviews and ratings.
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="medical-card hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex items-center gap-4">
            <div className="bg-yellow-400 rounded-lg p-4 flex items-center justify-center shadow-md">
              <Star className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900">{averageRating}</p>
              <p className="text-sm">Average Rating</p>
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex items-center gap-4">
            <div className="healing-gradient rounded-lg p-4 flex items-center justify-center shadow-md">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900">{totalReviews}</p>
              <p className="text-sm">Total Reviews</p>
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex items-center gap-4">
            <div className="bg-primary rounded-lg p-4 flex items-center justify-center shadow-md">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900">{satisfactionRate}%</p>
              <p className="text-sm">Satisfaction Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Individual Feedback */}
      <Card className="medical-card hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
          <CardDescription>Latest patient reviews and comments</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {feedbacks.map((fb, idx) => (
              <div
                key={idx}
                className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold truncate">{fb.patient}</h3>
                  <div className="flex space-x-1">
                    {Array.from({ length: fb.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-800 mb-2">{fb.comment}</p>
                <p className="text-sm text-muted-foreground">{fb.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
